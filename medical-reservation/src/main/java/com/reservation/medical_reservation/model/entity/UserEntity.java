package com.reservation.medical_reservation.model.entity;

import com.reservation.medical_reservation.model.enums.BloodType;
import com.reservation.medical_reservation.model.enums.DeactivationType;
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

    @Column(nullable = false)
    private Boolean isActive = true;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "deactivation_type")
    private DeactivationType deactivationType;
    
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

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private PatientProfileEntity patientProfile;


    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
    
    public LocalDate getDateOfBirth() {
        return patientProfile != null ? patientProfile.getDateOfBirth() : null;
    }
    
    public void setDateOfBirth(LocalDate dateOfBirth) {
        if (patientProfile == null) {
            patientProfile = new PatientProfileEntity();
            patientProfile.setUser(this);
        }
        patientProfile.setDateOfBirth(dateOfBirth);
    }
    
    public GenderEnum getGender() {
        return patientProfile != null ? patientProfile.getGender() : null;
    }
    
    public void setGender(GenderEnum gender) {
        if (patientProfile == null) {
            patientProfile = new PatientProfileEntity();
            patientProfile.setUser(this);
        }
        patientProfile.setGender(gender);
    }
    
    public String getAddress() {
        return patientProfile != null ? patientProfile.getAddress() : null;
    }
    
    public void setAddress(String address) {
        if (patientProfile == null) {
            patientProfile = new PatientProfileEntity();
            patientProfile.setUser(this);
        }
        patientProfile.setAddress(address);
    }
    
    public String getEmergencyPhone() {
        return patientProfile != null ? patientProfile.getEmergencyPhone() : null;
    }
    
    public void setEmergencyPhone(String emergencyPhone) {
        if (patientProfile == null) {
            patientProfile = new PatientProfileEntity();
            patientProfile.setUser(this);
        }
        patientProfile.setEmergencyPhone(emergencyPhone);
    }
    
    public BloodType getBloodType() {
        return patientProfile != null ? patientProfile.getBloodType() : null;
    }
    
    public void setBloodType(BloodType bloodType) {
        if (patientProfile == null) {
            patientProfile = new PatientProfileEntity();
            patientProfile.setUser(this);
        }
        patientProfile.setBloodType(bloodType);
    }
}


