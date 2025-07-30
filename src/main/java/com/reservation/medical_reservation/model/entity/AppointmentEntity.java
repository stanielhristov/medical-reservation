package com.reservation.medical_reservation.model.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "appointments")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AppointmentEntity extends BaseEntity{
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity patient;

    @ManyToOne
    @JoinColumn(name = "doctor_id", nullable = false)
    private DoctorEntity doctor;

    @Column(nullable = false)
    private LocalDateTime appointmentTime;

    @Column(nullable = false)
    private String status; // Example: SCHEDULED, CANCELLED, COMPLETED
}
