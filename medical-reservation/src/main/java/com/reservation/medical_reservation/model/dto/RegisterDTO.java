package com.reservation.medical_reservation.model.dto;

import com.reservation.medical_reservation.model.enums.GenderEnum;
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

    @NotNull(message = "Gender is required")
    private GenderEnum gender;

    private LocalDate dateOfBirth;
    private String address;
    private String emergencyPhone; 

    private String specialization;
    private String bio;
    private String licenseNumber;
    private String education;
    private String experience;
}
