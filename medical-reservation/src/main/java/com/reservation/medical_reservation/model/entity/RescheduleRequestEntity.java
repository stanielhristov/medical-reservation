package com.reservation.medical_reservation.model.entity;

import com.reservation.medical_reservation.model.enums.RescheduleRequestStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "reschedule_requests")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RescheduleRequestEntity extends BaseEntity {
    
    @ManyToOne
    @JoinColumn(name = "appointment_id", nullable = false)
    private AppointmentEntity appointment;
    
    @Column(nullable = false)
    private LocalDateTime originalDateTime;
    
    @Column(nullable = false)
    private LocalDateTime requestedDateTime;
    
    @Column(nullable = false)
    private LocalDateTime requestedEndTime;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private RescheduleRequestStatus status = RescheduleRequestStatus.PENDING;
    
    @Column(length = 1000)
    private String patientReason;
    
    @Column(length = 1000)
    private String doctorResponse;
    
    @Column(nullable = false)
    private LocalDateTime createdAt;
    
    @Column
    private LocalDateTime respondedAt;
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
    
    @PreUpdate
    protected void onUpdate() {
        if (status != RescheduleRequestStatus.PENDING && respondedAt == null) {
            respondedAt = LocalDateTime.now();
        }
    }
}
