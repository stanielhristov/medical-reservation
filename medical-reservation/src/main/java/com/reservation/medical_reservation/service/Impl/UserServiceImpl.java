package com.reservation.medical_reservation.service.Impl;

import com.reservation.medical_reservation.model.dto.RegisterDTO;
import com.reservation.medical_reservation.model.entity.DoctorEntity;
import com.reservation.medical_reservation.model.entity.DoctorRequestEntity;
import com.reservation.medical_reservation.model.entity.RoleEntity;
import com.reservation.medical_reservation.model.entity.UserEntity;
import com.reservation.medical_reservation.model.enums.DoctorRequestStatus;
import com.reservation.medical_reservation.model.enums.RoleName;
import com.reservation.medical_reservation.repository.DoctorRepository;
import com.reservation.medical_reservation.repository.DoctorRequestRepository;
import com.reservation.medical_reservation.repository.RoleRepository;
import com.reservation.medical_reservation.repository.UserRepository;
import com.reservation.medical_reservation.service.UserService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.Set;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final DoctorRequestRepository doctorRequestRepository;
    private final DoctorRepository doctorRepository;

    public UserServiceImpl(UserRepository userRepository, RoleRepository roleRepository, 
                          PasswordEncoder passwordEncoder, DoctorRequestRepository doctorRequestRepository,
                          DoctorRepository doctorRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.doctorRequestRepository = doctorRequestRepository;
        this.doctorRepository = doctorRepository;
    }


    @Override
    @Transactional
    public void registerUser(RegisterDTO registerDTO) {
        Optional<UserEntity> existingUser = userRepository.findByEmail(registerDTO.getEmail());
        if (existingUser.isPresent()) {
            throw new IllegalArgumentException("User with this email already exists");
        }

        UserEntity user = new UserEntity();
        user.setFullName(registerDTO.getFullName());
        user.setEmail(registerDTO.getEmail());
        user.setPhoneNumber(registerDTO.getPhoneNumber());
        user.setDateOfBirth(registerDTO.getDateOfBirth());
        user.setAddress(registerDTO.getAddress());

        String encodedPassword = passwordEncoder.encode(registerDTO.getPassword());
        user.setPassword(encodedPassword);

        RoleName roleName = RoleName.valueOf(registerDTO.getRole());
        RoleEntity role = roleRepository.findByName(roleName)
                .orElseThrow(() -> new IllegalStateException("Role " + roleName + " not found"));

        user.setRole(role);

        if ("DOCTOR".equals(registerDTO.getRole())) {
            user.setEmergencyPhone(registerDTO.getEmergencyPhone());

        }

        UserEntity savedUser = userRepository.save(user);

        if ("DOCTOR".equals(registerDTO.getRole())) {
            createDoctorEntity(savedUser, registerDTO);
            createDoctorRequest(savedUser, registerDTO);
        }
    }

    private void createDoctorRequest(UserEntity user, RegisterDTO registerDTO) {
        if (registerDTO.getSpecialization() == null || registerDTO.getSpecialization().trim().isEmpty()) {
            throw new IllegalArgumentException("Specialization is required for doctor registration");
        }
        if (registerDTO.getLicenseNumber() == null || registerDTO.getLicenseNumber().trim().isEmpty()) {
            throw new IllegalArgumentException("License number is required for doctor registration");
        }

        DoctorRequestEntity doctorRequest = new DoctorRequestEntity();
        doctorRequest.setUser(user);
        doctorRequest.setSpecialization(registerDTO.getSpecialization());
        doctorRequest.setBio(registerDTO.getBio());
        doctorRequest.setLicenseNumber(registerDTO.getLicenseNumber());
        doctorRequest.setEducation(registerDTO.getEducation());
        doctorRequest.setExperience(registerDTO.getExperience());
        doctorRequest.setStatus(DoctorRequestStatus.PENDING);

        doctorRequestRepository.save(doctorRequest);
    }

    private void createDoctorEntity(UserEntity user, RegisterDTO registerDTO) {
        if (registerDTO.getSpecialization() == null || registerDTO.getSpecialization().trim().isEmpty()) {
            throw new IllegalArgumentException("Specialization is required for doctor registration");
        }
        if (registerDTO.getLicenseNumber() == null || registerDTO.getLicenseNumber().trim().isEmpty()) {
            throw new IllegalArgumentException("License number is required for doctor registration");
        }

        DoctorEntity doctor = new DoctorEntity();
        doctor.setUser(user);
        doctor.setSpecialization(registerDTO.getSpecialization());
        doctor.setBio(registerDTO.getBio());
        doctor.setLicenseNumber(registerDTO.getLicenseNumber());
        doctor.setEducation(registerDTO.getEducation());
        doctor.setExperience(registerDTO.getExperience());
        doctor.setIsActive(false);

        doctorRepository.save(doctor);
    }

}
