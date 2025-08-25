package com.reservation.medical_reservation.repository;

import com.reservation.medical_reservation.model.entity.DoctorEntity;
import com.reservation.medical_reservation.model.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DoctorRepository extends JpaRepository<DoctorEntity, Long> {
    Optional<DoctorEntity> findByUser(UserEntity user);
    Optional<DoctorEntity> findByUserId(Long userId);
    List<DoctorEntity> findByIsActiveTrue();
    List<DoctorEntity> findBySpecializationAndIsActiveTrue(String specialization);
    List<DoctorEntity> findBySpecializationContainingIgnoreCaseAndIsActiveTrue(String specialization);
    List<DoctorEntity> findByIsActiveTrueOrderByRatingDesc();
    List<DoctorEntity> findByIsActiveTrueOrderByCreatedAtDesc();
    
    @Query("SELECT d FROM DoctorEntity d WHERE d.isActive = true AND (:specialization IS NULL OR LOWER(d.specialization) LIKE LOWER(CONCAT('%', :specialization, '%')))")
    List<DoctorEntity> findActiveBySpecialization(@Param("specialization") String specialization);
    
    @Query("SELECT COUNT(d) FROM DoctorEntity d WHERE d.isActive = true")
    long countActiveDoctors();
}
