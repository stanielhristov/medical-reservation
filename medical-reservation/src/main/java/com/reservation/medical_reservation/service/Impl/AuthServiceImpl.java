package com.reservation.medical_reservation.service.Impl;

import com.reservation.medical_reservation.model.dto.AuthResponseDTO;
import com.reservation.medical_reservation.model.dto.ForgotPasswordDTO;
import com.reservation.medical_reservation.model.dto.LoginDTO;
import com.reservation.medical_reservation.model.dto.ResetPasswordDTO;
import com.reservation.medical_reservation.model.entity.UserEntity;
import com.reservation.medical_reservation.repository.UserRepository;
import com.reservation.medical_reservation.security.JwtTokenProvider;
import com.reservation.medical_reservation.service.AuthService;
import com.reservation.medical_reservation.service.EmailService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final EmailService emailService;
    
    @Value("${password.reset.token.expiration}")
    private long tokenExpirationTime;

    public AuthServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder, 
                          JwtTokenProvider jwtTokenProvider, EmailService emailService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtTokenProvider = jwtTokenProvider;
        this.emailService = emailService;
    }

    @Override
    public AuthResponseDTO login(LoginDTO loginDTO) {
        UserEntity user = userRepository.findByEmail(loginDTO.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("Invalid email or password"));

        if (!passwordEncoder.matches(loginDTO.getPassword(), user.getPassword())) {
            throw new IllegalArgumentException("Invalid email or password");
        }

        String token = jwtTokenProvider.generateToken(
                user.getEmail(),
                user.getRole().getName().toString(),
                user.getId()
        );

        return new AuthResponseDTO(
                token,
                user.getEmail(),
                user.getFullName(),
                user.getRole().getName().toString(),
                user.getId()
        );
    }

    @Override
    public void forgotPassword(ForgotPasswordDTO forgotPasswordDTO) {
        UserEntity user = userRepository.findByEmail(forgotPasswordDTO.getEmail()).orElse(null);

        if (user != null) {
            String resetToken = UUID.randomUUID().toString();
            LocalDateTime expirationTime = LocalDateTime.now().plusSeconds(tokenExpirationTime / 1000);

            user.setPasswordResetToken(resetToken);
            user.setPasswordResetTokenExpiration(expirationTime);
            userRepository.save(user);

            try {
                emailService.sendPasswordResetEmail(user.getEmail(), resetToken, user.getFullName());
                System.out.println("✅ Password reset process completed for email: " + forgotPasswordDTO.getEmail());
            } catch (Exception e) {
                System.err.println("❌ Failed to send reset email for: " + forgotPasswordDTO.getEmail());
                System.err.println("Error: " + e.getMessage());

                user.setPasswordResetToken(null);
                user.setPasswordResetTokenExpiration(null);
                userRepository.save(user);
                throw new RuntimeException("Failed to send password reset email. Please try again later.");
            }
        } else {
            System.out.println("⚠️ Password reset requested for non-existent email: " + forgotPasswordDTO.getEmail());
//
//             throw new IllegalArgumentException("Email address not found");
        }

    }

    @Override
    public void resetPassword(ResetPasswordDTO resetPasswordDTO) {
        if (!resetPasswordDTO.getNewPassword().equals(resetPasswordDTO.getConfirmPassword())) {
            throw new IllegalArgumentException("Passwords do not match");
        }

        UserEntity user = userRepository.findByPasswordResetToken(resetPasswordDTO.getToken())
                .orElseThrow(() -> new IllegalArgumentException("Invalid reset token"));

        if (user.getPasswordResetTokenExpiration().isBefore(LocalDateTime.now())) {
            throw new IllegalArgumentException("Reset token has expired");
        }

        if (passwordEncoder.matches(resetPasswordDTO.getNewPassword(), user.getPassword())) {
            throw new IllegalArgumentException("New password must be different from current password");
        }

        user.setPassword(passwordEncoder.encode(resetPasswordDTO.getNewPassword()));
        user.setPasswordResetToken(null);
        user.setPasswordResetTokenExpiration(null);
        userRepository.save(user);

        emailService.sendPasswordResetConfirmationEmail(user.getEmail(), user.getFullName());
    }
}
