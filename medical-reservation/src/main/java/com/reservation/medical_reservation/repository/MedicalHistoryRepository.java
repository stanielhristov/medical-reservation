package com.reservation.medical_reservation.repository;

import com.reservation.medical_reservation.model.entity.DoctorEntity;
import com.reservation.medical_reservation.model.entity.MedicalHistoryEntity;
import com.reservation.medical_reservation.model.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MedicalHistoryRepository extends JpaRepository<MedicalHistoryEntity, Long> {
    List<MedicalHistoryEntity> findByPatientOrderByCreatedAtDesc(UserEntity patient);
    List<MedicalHistoryEntity> findByDoctorOrderByCreatedAtDesc(DoctorEntity doctor);
    List<MedicalHistoryEntity> findByPatientAndDoctorOrderByCreatedAtDesc(UserEntity patient, DoctorEntity doctor);
}
