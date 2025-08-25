package com.reservation.medical_reservation.model.entity;

import com.reservation.medical_reservation.model.enums.DoctorRequestStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "doctor_requests")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DoctorRequestEntity extends BaseEntity {
    
    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity user;
    
    @Column(nullable = false)
    private String specialization;
    
    @Column(length = 1000)
    private String bio;
    
    @Column(nullable = false)
    private String licenseNumber;
    
    @Column(length = 500)
    private String education;
    
    @Column(length = 500)
    private String experience;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private DoctorRequestStatus status = DoctorRequestStatus.PENDING;
    
    @Column(length = 500)
    private String rejectionReason;
    
    @ManyToOne
    @JoinColumn(name = "reviewed_by")
    private UserEntity reviewedBy;
    
    @Column
    private LocalDateTime reviewedAt;
    
    @Column(nullable = false)
    private LocalDateTime createdAt;
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
