package com.reservation.medical_reservation.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DoctorDTO {
    private Long id;
    private Long userId;
    private String fullName;
    private String email;
    private String phoneNumber;
    private String specialization;
    private String bio;
    private String licenseNumber;
    private String education;
    private String experience;
    private Double rating;
    private Integer totalRatings;
    private Boolean isActive;
    private Integer price;
    private String location;
}
