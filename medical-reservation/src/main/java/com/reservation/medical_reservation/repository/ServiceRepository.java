package com.reservation.medical_reservation.repository;

import com.reservation.medical_reservation.model.entity.ServiceEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ServiceRepository extends JpaRepository<ServiceEntity, Long> {
    List<ServiceEntity> findByNameContainingIgnoreCase(String name);
    List<ServiceEntity> findAllByOrderByNameAsc();
}
