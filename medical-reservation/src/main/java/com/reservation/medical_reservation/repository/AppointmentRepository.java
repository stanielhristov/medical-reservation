package com.reservation.medical_reservation.repository;

import com.reservation.medical_reservation.model.entity.AppointmentEntity;
import com.reservation.medical_reservation.model.entity.DoctorEntity;
import com.reservation.medical_reservation.model.entity.UserEntity;
import com.reservation.medical_reservation.model.enums.AppointmentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface AppointmentRepository extends JpaRepository<AppointmentEntity, Long> {
    List<AppointmentEntity> findByPatientOrderByAppointmentTimeDesc(UserEntity patient);
    List<AppointmentEntity> findByDoctorOrderByAppointmentTimeDesc(DoctorEntity doctor);
    List<AppointmentEntity> findByPatientAndStatusOrderByAppointmentTimeDesc(UserEntity patient, AppointmentStatus status);
    List<AppointmentEntity> findByDoctorAndStatusOrderByAppointmentTimeDesc(DoctorEntity doctor, AppointmentStatus status);
    boolean existsByPatientId(Long patientId);
    
    @Query("SELECT a FROM AppointmentEntity a WHERE a.patient = :patient AND a.appointmentTime > :now ORDER BY a.appointmentTime ASC")
    List<AppointmentEntity> findUpcomingAppointmentsByPatient(@Param("patient") UserEntity patient, @Param("now") LocalDateTime now);
    
    @Query("SELECT a FROM AppointmentEntity a WHERE a.doctor = :doctor AND a.appointmentTime > :now ORDER BY a.appointmentTime ASC")
    List<AppointmentEntity> findUpcomingAppointmentsByDoctor(@Param("doctor") DoctorEntity doctor, @Param("now") LocalDateTime now);
    
    @Query("SELECT a FROM AppointmentEntity a WHERE a.patient = :patient AND a.appointmentTime > :now AND a.status = :status ORDER BY a.appointmentTime ASC LIMIT 1")
    Optional<AppointmentEntity> findNextAppointmentByPatient(@Param("patient") UserEntity patient, @Param("now") LocalDateTime now, @Param("status") AppointmentStatus status);
    
    @Query("SELECT a FROM AppointmentEntity a WHERE a.doctor = :doctor AND DATE(a.appointmentTime) = DATE(:date) ORDER BY a.appointmentTime")
    List<AppointmentEntity> findByDoctorAndDate(@Param("doctor") DoctorEntity doctor, @Param("date") LocalDateTime date);
    
    @Query("SELECT a FROM AppointmentEntity a WHERE a.doctor = :doctor AND a.appointmentTime >= :startTime AND a.appointmentTime < :endTime")
    List<AppointmentEntity> findConflictingAppointments(@Param("doctor") DoctorEntity doctor, @Param("startTime") LocalDateTime startTime, @Param("endTime") LocalDateTime endTime);
    
    @Query("SELECT a FROM AppointmentEntity a WHERE a.doctor = :doctor AND DATE(a.appointmentTime) = DATE(:today) ORDER BY a.appointmentTime ASC")
    List<AppointmentEntity> findDoctorAppointmentsForToday(@Param("doctor") DoctorEntity doctor, @Param("today") LocalDateTime today);
    
    @Query("SELECT a FROM AppointmentEntity a WHERE a.patient = :patient AND DATE(a.appointmentTime) = DATE(:today) ORDER BY a.appointmentTime ASC")
    List<AppointmentEntity> findPatientAppointmentsForToday(@Param("patient") UserEntity patient, @Param("today") LocalDateTime today);
    
    @Query("SELECT COUNT(a) FROM AppointmentEntity a WHERE a.patient = :patient AND a.status = :status")
    long countPatientAppointmentsByStatus(@Param("patient") UserEntity patient, @Param("status") AppointmentStatus status);
    
    @Query("SELECT COUNT(a) FROM AppointmentEntity a WHERE a.doctor = :doctor AND a.status = :status")
    long countDoctorAppointmentsByStatus(@Param("doctor") DoctorEntity doctor, @Param("status") AppointmentStatus status);
    
    @Query("SELECT DISTINCT a.patient FROM AppointmentEntity a WHERE a.doctor = :doctor ORDER BY a.patient.fullName")
    List<UserEntity> findDoctorPatients(@Param("doctor") DoctorEntity doctor);
    
    @Query("SELECT COUNT(a) FROM AppointmentEntity a WHERE a.patient.id = :patientId")
    long countByPatientId(@Param("patientId") Long patientId);
}
