package com.reservation.medical_reservation.controller;

import com.reservation.medical_reservation.model.dto.AuthResponseDTO;
import com.reservation.medical_reservation.model.dto.LoginDTO;
import com.reservation.medical_reservation.model.dto.RegisterDTO;
import com.reservation.medical_reservation.service.AuthService;
import com.reservation.medical_reservation.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class AuthController {

    private final AuthService authService;
    private final UserService userService;

    public AuthController(AuthService authService, UserService userService) {
        this.authService = authService;
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> login(@Valid @RequestBody LoginDTO loginDTO) {
        AuthResponseDTO response = authService.login(loginDTO);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@Valid @RequestBody RegisterDTO registerDTO) {
        userService.registerUser(registerDTO);
        return ResponseEntity.ok("User registered successfully");
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout() {
        // With JWT, logout is handled on the client side by removing the token
        return ResponseEntity.ok("Logged out successfully");
    }
}
