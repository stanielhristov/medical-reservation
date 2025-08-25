package com.reservation.medical_reservation.model.dto;

import lombok.*;
import jakarta.validation.constraints.*;
import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RegisterDTO {
    @NotBlank(message = "Full name is required")
    private String fullName;
    
    @NotBlank(message = "Email is required")
    @Email(message = "Please provide a valid email address")
    private String email;
    
    @NotBlank(message = "Phone number is required")
    private String phoneNumber;
    
    @NotBlank(message = "Password is required")
    @Size(min = 6, message = "Password must be at least 6 characters long")
    private String password;
    
    @NotBlank(message = "Role is required")
    private String role;
    
    // Common user fields
    private LocalDate dateOfBirth;
    private String address;
    private String emergencyContact;
    private String emergencyPhone; // Only for doctors
    
    // Doctor-specific fields (validation handled in service layer based on role)
    private String specialization;
    private String bio;
    private String licenseNumber;
    private String education;
    private String experience;
}
