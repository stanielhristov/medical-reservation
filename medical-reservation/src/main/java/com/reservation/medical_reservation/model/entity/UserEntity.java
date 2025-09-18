package com.reservation.medical_reservation.model.entity;

import com.reservation.medical_reservation.model.enums.BloodType;
import com.reservation.medical_reservation.model.enums.GenderEnum;
import jakarta.persistence.*;
import lombok.*;
import lombok.EqualsAndHashCode;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Getter
@Setter
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
public class UserEntity extends BaseEntity {
    @Column(nullable = false)
    private String fullName;
    
    @Column(nullable = false, unique = true)
    private String email;
    
    @Column
    private String phoneNumber;
    
    @Column(nullable = false)
    private String password;
    
    @Column
    private LocalDate dateOfBirth;

    @Enumerated(EnumType.STRING)
    @Column
    private GenderEnum gender;
    
    @Column
    private String address;
    
    @Column
    private String emergencyPhone;

    @Column(nullable = false)
    private Boolean isActive = true;
    
    @Column
    private LocalDateTime lastLogin;
    
    @Column(nullable = false)
    private LocalDateTime createdAt;
    
    @Column
    private String passwordResetToken;
    
    @Column
    private LocalDateTime passwordResetTokenExpiration;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "role_id", nullable = false)
    private RoleEntity role;

    @Enumerated(EnumType.STRING)
    @Column(name = "blood_type")
    private BloodType bloodType;


    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}


