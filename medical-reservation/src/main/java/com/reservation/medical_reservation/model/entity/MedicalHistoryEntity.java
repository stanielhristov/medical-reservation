package com.reservation.medical_reservation.model.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "medical_history")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MedicalHistoryEntity extends BaseEntity {
    
    @ManyToOne
    @JoinColumn(name = "patient_id", nullable = false)
    private UserEntity patient;
    
    @ManyToOne
    @JoinColumn(name = "doctor_id", nullable = false)
    private DoctorEntity doctor;
    
    @ManyToOne
    @JoinColumn(name = "appointment_id")
    private AppointmentEntity appointment;
    
    @Column(nullable = false)
    private String title;
    
    @Column(length = 2000)
    private String description;
    
    @Column(length = 1000)
    private String diagnosis;
    
    @Column(length = 1000)
    private String treatment;
    
    @Column(length = 500)
    private String medications;
    
    @Column(length = 100)
    private String recordType;
    
    @Column
    private String attachmentUrl;
    
    @Column(nullable = false)
    private LocalDateTime createdAt;
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
