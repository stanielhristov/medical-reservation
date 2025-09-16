package com.reservation.medical_reservation.model.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "doctors")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DoctorEntity extends BaseEntity {
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

    @Column
    private Double rating = 0.0;

    @Column
    private Integer totalRatings = 0;

    @Column
    private Boolean isActive = true;

    @Column
    private LocalDateTime createdAt;

    @Column
    private Integer price;

    @Column
    private String location;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
