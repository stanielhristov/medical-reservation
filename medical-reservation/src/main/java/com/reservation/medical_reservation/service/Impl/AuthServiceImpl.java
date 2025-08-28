package com.reservation.medical_reservation.service.Impl;

import com.reservation.medical_reservation.model.dto.AuthResponseDTO;
import com.reservation.medical_reservation.model.dto.LoginDTO;
import com.reservation.medical_reservation.model.entity.UserEntity;
import com.reservation.medical_reservation.repository.UserRepository;
import com.reservation.medical_reservation.security.JwtTokenProvider;
import com.reservation.medical_reservation.service.AuthService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    public AuthServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtTokenProvider jwtTokenProvider) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtTokenProvider = jwtTokenProvider;
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

}
