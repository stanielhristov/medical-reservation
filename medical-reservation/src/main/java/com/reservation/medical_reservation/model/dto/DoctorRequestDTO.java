package com.reservation.medical_reservation.model.dto;

import com.reservation.medical_reservation.model.enums.DoctorRequestStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.validation.constraints.NotBlank;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DoctorRequestDTO {
    private Long id;
    
    @NotBlank(message = "Specialization is required")
    private String specialization;
    
    private String bio;
    
    @NotBlank(message = "License number is required")
    private String licenseNumber;
    
    private String education;
    private String experience;
    private DoctorRequestStatus status;
    private String rejectionReason;
    private String reviewedByName;
    private LocalDateTime reviewedAt;
    private LocalDateTime createdAt;
    
    // For request submission
    private Long userId;
    private String userName;
    private String userEmail;
}
