package com.reservation.medical_reservation.model.entity;

import com.reservation.medical_reservation.model.enums.BloodType;
import com.reservation.medical_reservation.model.enums.GenderEnum;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "patient_profiles")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PatientProfileEntity {
    
    @Id
    private Long id;
    
    @OneToOne
    @MapsId
    @JoinColumn(name = "user_id")
    private UserEntity user;

    @Column
    private LocalDate dateOfBirth;

    @Enumerated(EnumType.STRING)
    @Column
    private GenderEnum gender;
    
    @Column
    private String address;
    
    @Column
    private String emergencyPhone;

    @Enumerated(EnumType.STRING)
    @Column(name = "blood_type")
    private BloodType bloodType;

    @Column
    private String emergencyContactName;
    
    @Column
    private String emergencyContactRelationship;
    
    @Column(columnDefinition = "TEXT")
    private String chronicConditions;
    
    @Column(columnDefinition = "TEXT")
    private String allergies;
    
    @Column(columnDefinition = "TEXT")
    private String currentMedications;
    
    @Column(columnDefinition = "TEXT")
    private String pastSurgeries;
    
    @Column(columnDefinition = "TEXT")
    private String familyMedicalHistory;
    
    @Column(precision = 5, scale = 2)
    private BigDecimal height;
    
    @Column(precision = 5, scale = 2)
    private BigDecimal weight; 
    
    @Column(precision = 4, scale = 2)
    private BigDecimal bmi;
    
    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }
    
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
