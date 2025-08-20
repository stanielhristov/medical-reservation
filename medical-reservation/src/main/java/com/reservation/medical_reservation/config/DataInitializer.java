package com.reservation.medical_reservation.config;

import com.reservation.medical_reservation.model.entity.RoleEntity;
import com.reservation.medical_reservation.model.enums.RoleName;
import com.reservation.medical_reservation.repository.RoleRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    private final RoleRepository roleRepository;

    public DataInitializer(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        for (RoleName roleName : RoleName.values()) {
            if (!roleRepository.findByName(roleName).isPresent()) {
                RoleEntity role = new RoleEntity();
                role.setName(roleName);
                roleRepository.save(role);
                System.out.println("Created role: " + roleName.name());
            }
        }
    }
} 