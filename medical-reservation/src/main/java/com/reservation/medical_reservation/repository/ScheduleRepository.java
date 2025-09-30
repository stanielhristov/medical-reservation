package com.reservation.medical_reservation.repository;

import com.reservation.medical_reservation.model.entity.DoctorEntity;
import com.reservation.medical_reservation.model.entity.ScheduleEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ScheduleRepository extends JpaRepository<ScheduleEntity, Long> {
    List<ScheduleEntity> findByDoctorAndAvailableTrueAndStartTimeAfterOrderByStartTime(
            DoctorEntity doctor, LocalDateTime startTime);
    
    List<ScheduleEntity> findByDoctorOrderByStartTime(DoctorEntity doctor);
    
    @Query("SELECT s FROM ScheduleEntity s WHERE s.doctor = :doctor AND " +
           "((s.startTime <= :endDate AND s.endTime >= :startDate)) ORDER BY s.startTime")
    List<ScheduleEntity> findByDoctorAndDateRange(
            @Param("doctor") DoctorEntity doctor,
            @Param("startDate") LocalDateTime startDate,
            @Param("endDate") LocalDateTime endDate);
    
    @Query("SELECT s FROM ScheduleEntity s WHERE s.doctor = :doctor AND s.available = true AND s.startTime >= :startTime AND s.startTime <= :endTime ORDER BY s.startTime")
    List<ScheduleEntity> findAvailableSlots(
            @Param("doctor") DoctorEntity doctor,
            @Param("startTime") LocalDateTime startTime,
            @Param("endTime") LocalDateTime endTime);
    
    @Query("SELECT s FROM ScheduleEntity s WHERE s.doctor = :doctor AND s.startTime >= :startDate AND s.endTime <= :endDate AND s.startTime > :currentTime ORDER BY s.startTime")
    List<ScheduleEntity> findFutureSlotsByDoctorAndDateRange(
            @Param("doctor") DoctorEntity doctor,
            @Param("startDate") LocalDateTime startDate,
            @Param("endDate") LocalDateTime endDate,
            @Param("currentTime") LocalDateTime currentTime);
}
