package com.reservation.medical_reservation.repository;

import com.reservation.medical_reservation.model.entity.DoctorRequestEntity;
import com.reservation.medical_reservation.model.entity.UserEntity;
import com.reservation.medical_reservation.model.enums.DoctorRequestStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DoctorRequestRepository extends JpaRepository<DoctorRequestEntity, Long> {
    Optional<DoctorRequestEntity> findByUser(UserEntity user);
    List<DoctorRequestEntity> findByStatusOrderByCreatedAtDesc(DoctorRequestStatus status);
    List<DoctorRequestEntity> findAllByOrderByCreatedAtDesc();
    boolean existsByUser(UserEntity user);
    List<DoctorRequestEntity> findByReviewedBy(UserEntity reviewedBy);
}
