package com.reservation.medical_reservation.model.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.EqualsAndHashCode;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Data
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
    
    @Column
    private String address;
    
    @Column
    private String emergencyPhone;
    
    @Column
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
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}


