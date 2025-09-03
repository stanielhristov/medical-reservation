package com.reservation.medical_reservation.controller;

import com.reservation.medical_reservation.model.dto.UserDTO;
import com.reservation.medical_reservation.model.dto.ChangePasswordDTO;
import com.reservation.medical_reservation.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/{userId}/profile")
    @PreAuthorize("hasRole('ADMIN') or #userId == authentication.principal.id")
    public ResponseEntity<UserDTO> getUserProfile(@PathVariable Long userId) {
        UserDTO userProfile = userService.getUserProfile(userId);
        return ResponseEntity.ok(userProfile);
    }

    @PutMapping("/{userId}/profile")
    @PreAuthorize("hasRole('ADMIN') or #userId == authentication.principal.id")
    public ResponseEntity<UserDTO> updateUserProfile(
            @PathVariable Long userId,
            @Valid @RequestBody UserDTO userDTO) {
        UserDTO updatedProfile = userService.updateUserProfile(userId, userDTO);
        return ResponseEntity.ok(updatedProfile);
    }

    @PutMapping("/{userId}/change-password")
    @PreAuthorize("hasRole('ADMIN') or #userId == authentication.principal.id")
    public ResponseEntity<String> changePassword(
            @PathVariable Long userId,
            @Valid @RequestBody ChangePasswordDTO changePasswordDTO) {
        userService.changePassword(userId, changePasswordDTO);
        return ResponseEntity.ok("Password changed successfully");
    }

    @GetMapping("/{userId}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('DOCTOR') or #userId == authentication.principal.id")
    public ResponseEntity<UserDTO> getUserById(@PathVariable Long userId) {
        UserDTO user = userService.getUserById(userId);
        return ResponseEntity.ok(user);
    }
}
