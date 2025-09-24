package com.reservation.medical_reservation.service.Impl;

import com.reservation.medical_reservation.model.dto.AuthResponseDTO;
import com.reservation.medical_reservation.model.dto.ForgotPasswordDTO;
import com.reservation.medical_reservation.model.dto.LoginDTO;
import com.reservation.medical_reservation.model.dto.ResetPasswordDTO;
import com.reservation.medical_reservation.model.entity.UserEntity;
import com.reservation.medical_reservation.model.enums.DeactivationType;
import com.reservation.medical_reservation.model.enums.NotificationType;
import com.reservation.medical_reservation.repository.UserRepository;
import com.reservation.medical_reservation.security.JwtTokenProvider;
import com.reservation.medical_reservation.service.AuthService;
import com.reservation.medical_reservation.service.EmailService;
import com.reservation.medical_reservation.service.NotificationService;
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
    private final NotificationService notificationService;
    
    @Value("${password.reset.token.expiration}")
    private long tokenExpirationTime;

    public AuthServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder, 
                          JwtTokenProvider jwtTokenProvider, EmailService emailService,
                          NotificationService notificationService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtTokenProvider = jwtTokenProvider;
        this.emailService = emailService;
        this.notificationService = notificationService;
    }

    @Override
    public AuthResponseDTO login(LoginDTO loginDTO) {
        UserEntity user = userRepository.findByEmail(loginDTO.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("Invalid email or password"));

        if (!passwordEncoder.matches(loginDTO.getPassword(), user.getPassword())) {
            throw new IllegalArgumentException("Invalid email or password");
        }

        // Check if user account is active
        if (!user.getIsActive()) {
            // Only auto-reactivate if it was self-deactivated
            if (user.getDeactivationType() == DeactivationType.SELF_DEACTIVATED) {
                // Auto-reactivate the account on login (for self-deactivated accounts only)
                user.setIsActive(true);
                user.setDeactivationType(null); // Clear deactivation type
                userRepository.save(user);
                
                // Create notification for successful reactivation
                notificationService.createNotification(
                        user,
                        "Account Reactivated",
                        "Welcome back! Your account has been automatically reactivated.",
                        NotificationType.SYSTEM_NOTIFICATION
                );
            } else {
                // Admin deactivated - require admin to reactivate
                throw new IllegalArgumentException("Your account has been deactivated by an administrator. Please contact support for assistance.");
            }
        }

        // Update last login timestamp
        user.setLastLogin(LocalDateTime.now());
        userRepository.save(user);

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

    public void deactivateUser(UserEntity user) {
        if (!user.getIsActive()) {
            throw new IllegalArgumentException("User is not active");
        }

        user.setIsActive(false);
        userRepository.save(user);
    }
}
