package com.reservation.medical_reservation.service.Impl;

import com.reservation.medical_reservation.model.dto.ChangePasswordDTO;
import com.reservation.medical_reservation.model.dto.DoctorDTO;
import com.reservation.medical_reservation.model.dto.RegisterDTO;
import com.reservation.medical_reservation.model.dto.UserDTO;
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

    @Override
    public UserDTO getUserData(String email) {
        UserEntity user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User with this email does not exist" + email));

        UserDTO userDTO = new UserDTO();

        userDTO.setFullName(user.getFullName());
        userDTO.setEmail(user.getEmail());
        userDTO.setPhoneNumber(user.getPhoneNumber());
        userDTO.setDateOfBirth(user.getDateOfBirth());
        userDTO.setAddress(user.getAddress());

        return userDTO;
    }

    @Override
    public DoctorDTO getDoctorData(String email) {
        UserEntity user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User with this email does not exist: " + email));
        
        DoctorEntity doctor = doctorRepository.findByUserId(user.getId())
                .orElseThrow(() -> new IllegalArgumentException("Doctor profile not found for user: " + email));

        DoctorDTO doctorDTO = new DoctorDTO();
        doctorDTO.setId(doctor.getId());
        doctorDTO.setUserId(doctor.getUser().getId());
        doctorDTO.setSpecialization(doctor.getSpecialization());
        doctorDTO.setBio(doctor.getBio());
        doctorDTO.setLicenseNumber(doctor.getLicenseNumber());
        doctorDTO.setEducation(doctor.getEducation());
        doctorDTO.setExperience(doctor.getExperience());
        doctorDTO.setIsActive(doctor.getIsActive());
        
        // Set user information
        doctorDTO.setFullName(user.getFullName());
        doctorDTO.setEmail(user.getEmail());
        doctorDTO.setPhoneNumber(user.getPhoneNumber());
        
        return doctorDTO;
    }

    @Override
    public UserDTO getUserProfile(Long userId) {
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with ID: " + userId));
        
        return convertToUserDTO(user);
    }

    @Override
    @Transactional
    public UserDTO updateUserProfile(Long userId, UserDTO userDTO) {
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with ID: " + userId));
        
        // Update user fields
        user.setFullName(userDTO.getFullName());
        user.setEmail(userDTO.getEmail());
        
        // Handle phone field mapping - frontend sends 'phone', backend uses 'phoneNumber'
        if (userDTO.getPhone() != null) {
            user.setPhoneNumber(userDTO.getPhone());
        } else if (userDTO.getPhoneNumber() != null) {
            user.setPhoneNumber(userDTO.getPhoneNumber());
        }
        
        user.setDateOfBirth(userDTO.getDateOfBirth());
        user.setAddress(userDTO.getAddress());
        
        // Handle emergency contact - frontend sends 'emergencyContact', backend uses 'emergencyPhone'
        if (userDTO.getEmergencyContact() != null) {
            user.setEmergencyPhone(userDTO.getEmergencyContact());
        } else if (userDTO.getEmergencyPhone() != null) {
            user.setEmergencyPhone(userDTO.getEmergencyPhone());
        }
        
        UserEntity savedUser = userRepository.save(user);
        return convertToUserDTO(savedUser);
    }

    @Override
    @Transactional
    public void changePassword(Long userId, ChangePasswordDTO changePasswordDTO) {
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with ID: " + userId));
        
        // Verify current password
        if (!passwordEncoder.matches(changePasswordDTO.getCurrentPassword(), user.getPassword())) {
            throw new IllegalArgumentException("Current password is incorrect");
        }
        
        // Check if new password is different from current password
        if (passwordEncoder.matches(changePasswordDTO.getNewPassword(), user.getPassword())) {
            throw new IllegalArgumentException("New password must be different from current password");
        }
        
        // Encode and set new password
        String encodedNewPassword = passwordEncoder.encode(changePasswordDTO.getNewPassword());
        user.setPassword(encodedNewPassword);
        
        userRepository.save(user);
    }

    @Override
    public UserDTO getUserById(Long userId) {
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with ID: " + userId));
        
        return convertToUserDTO(user);
    }

    private UserDTO convertToUserDTO(UserEntity user) {
        UserDTO userDTO = new UserDTO();
        userDTO.setId(user.getId());
        userDTO.setFullName(user.getFullName());
        userDTO.setEmail(user.getEmail());
        userDTO.setPhoneNumber(user.getPhoneNumber());
        userDTO.setPhone(user.getPhoneNumber()); // For frontend compatibility
        userDTO.setDateOfBirth(user.getDateOfBirth());
        userDTO.setAddress(user.getAddress());
        userDTO.setEmergencyPhone(user.getEmergencyPhone());
        userDTO.setEmergencyContact(user.getEmergencyPhone()); // For frontend compatibility
        userDTO.setIsActive(user.getIsActive());
        userDTO.setLastLogin(user.getLastLogin());
        userDTO.setCreatedAt(user.getCreatedAt());
        userDTO.setRole(user.getRole().getName().toString());
        
        return userDTO;
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
