package com.reservation.medical_reservation.repository;

import com.reservation.medical_reservation.model.entity.DoctorAvailabilityEntity;
import com.reservation.medical_reservation.model.entity.DoctorEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.DayOfWeek;
import java.util.List;
import java.util.Optional;

@Repository
public interface DoctorAvailabilityRepository extends JpaRepository<DoctorAvailabilityEntity, Long> {
    List<DoctorAvailabilityEntity> findByDoctorOrderByDayOfWeek(DoctorEntity doctor);
    
    Optional<DoctorAvailabilityEntity> findByDoctorAndDayOfWeek(DoctorEntity doctor, DayOfWeek dayOfWeek);
    
    void deleteByDoctorAndDayOfWeek(DoctorEntity doctor, DayOfWeek dayOfWeek);
    
    boolean existsByDoctorAndDayOfWeek(DoctorEntity doctor, DayOfWeek dayOfWeek);
}
