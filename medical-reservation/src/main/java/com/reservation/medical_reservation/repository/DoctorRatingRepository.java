package com.reservation.medical_reservation.repository;

import com.reservation.medical_reservation.model.entity.DoctorRatingEntity;
import com.reservation.medical_reservation.model.entity.DoctorEntity;
import com.reservation.medical_reservation.model.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DoctorRatingRepository extends JpaRepository<DoctorRatingEntity, Long> {
    
    Optional<DoctorRatingEntity> findByDoctorAndUser(DoctorEntity doctor, UserEntity user);
    
    Optional<DoctorRatingEntity> findByDoctorIdAndUserId(Long doctorId, Long userId);

    List<DoctorRatingEntity> findByDoctorIdOrderByCreatedAtDesc(Long doctorId);
    
    List<DoctorRatingEntity> findByUserOrderByCreatedAtDesc(UserEntity user);
    
    @Query("SELECT AVG(r.rating) FROM DoctorRatingEntity r WHERE r.doctor.id = :doctorId")
    Double findAverageRatingByDoctorId(@Param("doctorId") Long doctorId);
    
    @Query("SELECT COUNT(r) FROM DoctorRatingEntity r WHERE r.doctor.id = :doctorId")
    Long countRatingsByDoctorId(@Param("doctorId") Long doctorId);
    
    boolean existsByDoctorIdAndUserId(Long doctorId, Long userId);
}
