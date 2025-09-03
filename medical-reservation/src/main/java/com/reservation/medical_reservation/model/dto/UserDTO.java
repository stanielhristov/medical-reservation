package com.reservation.medical_reservation.model.dto;

import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {

    private Long id;
    private String email;
    private String fullName;
    private String phoneNumber;
    private LocalDate dateOfBirth;
    private String address;
    private String emergencyPhone;
    private String emergencyContact; 
    private Boolean isActive;
    private LocalDateTime lastLogin;
    private LocalDateTime createdAt;
    private String role;
    private String phone; 
}
