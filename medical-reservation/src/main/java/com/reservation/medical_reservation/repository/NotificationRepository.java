package com.reservation.medical_reservation.repository;

import com.reservation.medical_reservation.model.entity.NotificationEntity;
import com.reservation.medical_reservation.model.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<NotificationEntity, Long> {
    List<NotificationEntity> findByUserOrderByCreatedAtDesc(UserEntity user);
    List<NotificationEntity> findByUserAndIsReadFalseOrderByCreatedAtDesc(UserEntity user);
    long countByUserAndIsReadFalse(UserEntity user);
}
