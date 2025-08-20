package com.reservation.medical_reservation.repository;

import com.reservation.medical_reservation.model.entity.RoleEntity;
import com.reservation.medical_reservation.model.enums.RoleName;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<RoleEntity, Long> {
    Optional<RoleEntity> findByName(RoleName role);
}
