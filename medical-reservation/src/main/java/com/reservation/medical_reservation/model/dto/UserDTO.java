package com.reservation.medical_reservation.model.dto;

import com.reservation.medical_reservation.model.enums.BloodType;
import com.reservation.medical_reservation.model.enums.GenderEnum;
import lombok.*;

import java.math.BigDecimal;
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
    private BloodType bloodType; 
    private GenderEnum gender;
    private String emergencyContactName;
    private String emergencyContactRelationship;
    private String chronicConditions;
    private String allergies;
    private String currentMedications;
    private String pastSurgeries;
    private String familyMedicalHistory;
    private BigDecimal height; 
    private BigDecimal weight; 
    private BigDecimal bmi;
}
