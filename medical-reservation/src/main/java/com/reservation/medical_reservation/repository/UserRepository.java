package com.reservation.medical_reservation.repository;

import com.reservation.medical_reservation.model.entity.RoleEntity;
import com.reservation.medical_reservation.model.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {
    Optional<UserEntity> findByEmail(String email);
    boolean existsByEmail(String email);
    List<UserEntity> findByRoleOrderByCreatedAtDesc(RoleEntity role);
    List<UserEntity> findByIsActiveTrueOrderByCreatedAtDesc();
    long countByRole(RoleEntity role);
    
    @Query("SELECT COUNT(u) FROM UserEntity u WHERE u.role.name = 'USER' AND u.isActive = true")
    long countActivePatients();
    
    @Query("SELECT COUNT(u) FROM UserEntity u WHERE u.isActive = true")
    long countActiveUsers();
}