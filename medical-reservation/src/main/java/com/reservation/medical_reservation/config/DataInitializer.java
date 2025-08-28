package com.reservation.medical_reservation.config;

import com.reservation.medical_reservation.model.entity.RoleEntity;
import com.reservation.medical_reservation.model.entity.UserEntity;
import com.reservation.medical_reservation.model.enums.RoleName;
import com.reservation.medical_reservation.repository.RoleRepository;
import com.reservation.medical_reservation.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Component
public class DataInitializer implements CommandLineRunner {

    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(RoleRepository roleRepository, 
                          UserRepository userRepository,
                          PasswordEncoder passwordEncoder) {
        this.roleRepository = roleRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {
        initializeRoles();
        initializeAdminUser();
    }

    private void initializeRoles() {
        for (RoleName roleName : RoleName.values()) {
            if (!roleRepository.findByName(roleName).isPresent()) {
                RoleEntity role = new RoleEntity();
                role.setName(roleName);
                roleRepository.save(role);
                System.out.println("Created role: " + roleName.name());
            }
        }
    }

    private void initializeAdminUser() {

        if (!userRepository.findByEmail("admin@medicalreservation.com").isPresent()) {
            RoleEntity adminRole = roleRepository.findByName(RoleName.ADMIN)
                    .orElseThrow(() -> new RuntimeException("Admin role not found"));

            UserEntity admin = new UserEntity();
            admin.setFullName("System Administrator");
            admin.setEmail("admin@medicalreservation.com");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setPhoneNumber("+1-555-0001");
            admin.setDateOfBirth(LocalDate.of(1985, 1, 15));
            admin.setAddress("123 Admin Street, Medical City, MC 12345");
            admin.setIsActive(true);
            admin.setRole(adminRole);
            admin.setCreatedAt(LocalDateTime.now());
            userRepository.save(admin);
            System.out.println("Created admin user: admin@medicalreservation.com");
            System.out.println("Default admin password: admin123");
        }
    }
} 