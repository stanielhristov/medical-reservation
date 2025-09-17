package com.reservation.medical_reservation.model.dto;

import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DoctorPatientDTO {
    
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
    
    // Additional fields for doctor patient view
    private Integer age;
    private String gender;
    private String bloodType;
    private List<String> allergies;
    private List<String> conditions;
    private LocalDateTime lastVisit;
    private LocalDateTime nextAppointment;
    private Long visitCount;
    private String status;
}
