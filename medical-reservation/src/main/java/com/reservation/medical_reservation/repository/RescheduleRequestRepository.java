package com.reservation.medical_reservation.repository;

import com.reservation.medical_reservation.model.entity.AppointmentEntity;
import com.reservation.medical_reservation.model.entity.DoctorEntity;
import com.reservation.medical_reservation.model.entity.RescheduleRequestEntity;
import com.reservation.medical_reservation.model.entity.UserEntity;
import com.reservation.medical_reservation.model.enums.RescheduleRequestStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RescheduleRequestRepository extends JpaRepository<RescheduleRequestEntity, Long> {
    
    List<RescheduleRequestEntity> findByAppointmentPatientOrderByCreatedAtDesc(UserEntity patient);
    
    @Query("SELECT r FROM RescheduleRequestEntity r WHERE r.appointment.doctor = :doctor ORDER BY r.createdAt DESC")
    List<RescheduleRequestEntity> findByDoctorOrderByCreatedAtDesc(@Param("doctor") DoctorEntity doctor);
    
    List<RescheduleRequestEntity> findByStatusOrderByCreatedAtDesc(RescheduleRequestStatus status);
    
    @Query("SELECT r FROM RescheduleRequestEntity r WHERE r.appointment.doctor = :doctor AND r.status = :status ORDER BY r.createdAt DESC")
    List<RescheduleRequestEntity> findByDoctorAndStatusOrderByCreatedAtDesc(@Param("doctor") DoctorEntity doctor, @Param("status") RescheduleRequestStatus status);
    
    Optional<RescheduleRequestEntity> findByAppointmentAndStatus(AppointmentEntity appointment, RescheduleRequestStatus status);
    
    @Query("SELECT COUNT(r) FROM RescheduleRequestEntity r WHERE r.appointment.doctor = :doctor AND r.status = :status")
    long countByDoctorAndStatus(@Param("doctor") DoctorEntity doctor, @Param("status") RescheduleRequestStatus status);
}
