package com.reservation.medical_reservation.repository;

import com.reservation.medical_reservation.model.entity.BlockedSlotEntity;
import com.reservation.medical_reservation.model.entity.DoctorEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface BlockedSlotRepository extends JpaRepository<BlockedSlotEntity, Long> {
    List<BlockedSlotEntity> findByDoctorOrderByStartTime(DoctorEntity doctor);
    
    @Query("SELECT b FROM BlockedSlotEntity b WHERE b.doctor = :doctor AND " +
           "((b.startTime <= :endTime AND b.endTime >= :startTime))")
    List<BlockedSlotEntity> findByDoctorAndDateRange(
            @Param("doctor") DoctorEntity doctor,
            @Param("startTime") LocalDateTime startTime,
            @Param("endTime") LocalDateTime endTime);
            
    @Query("SELECT b FROM BlockedSlotEntity b WHERE b.doctor = :doctor AND " +
           "b.startTime >= :startDate AND b.startTime < :endDate ORDER BY b.startTime")
    List<BlockedSlotEntity> findByDoctorAndStartTimeBetween(
            @Param("doctor") DoctorEntity doctor,
            @Param("startDate") LocalDateTime startDate,
            @Param("endDate") LocalDateTime endDate);
    
    void deleteByDoctor(DoctorEntity doctor);
}
