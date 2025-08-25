package com.reservation.medical_reservation.service.Impl;

import com.reservation.medical_reservation.model.dto.DoctorRequestDTO;
import com.reservation.medical_reservation.model.dto.UserDTO;
import com.reservation.medical_reservation.model.entity.*;
import com.reservation.medical_reservation.model.enums.DoctorRequestStatus;
import com.reservation.medical_reservation.model.enums.NotificationType;
import com.reservation.medical_reservation.model.enums.RoleName;
import com.reservation.medical_reservation.repository.*;
import com.reservation.medical_reservation.service.AdminService;
import com.reservation.medical_reservation.service.NotificationService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class AdminServiceImpl implements AdminService {

    private final UserRepository userRepository;
    private final DoctorRepository doctorRepository;
    private final DoctorRequestRepository doctorRequestRepository;
    private final AppointmentRepository appointmentRepository;
    private final RoleRepository roleRepository;
    private final NotificationService notificationService;
    private final ModelMapper modelMapper;

    public AdminServiceImpl(UserRepository userRepository,
                          DoctorRepository doctorRepository,
                          DoctorRequestRepository doctorRequestRepository,
                          AppointmentRepository appointmentRepository,
                          RoleRepository roleRepository,
                          NotificationService notificationService,
                          ModelMapper modelMapper) {
        this.userRepository = userRepository;
        this.doctorRepository = doctorRepository;
        this.doctorRequestRepository = doctorRequestRepository;
        this.appointmentRepository = appointmentRepository;
        this.roleRepository = roleRepository;
        this.notificationService = notificationService;
        this.modelMapper = modelMapper;
    }

    @Override
    public List<UserDTO> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(user -> modelMapper.map(user, UserDTO.class))
                .toList();
    }

    @Override
    public UserDTO getUserById(Long userId) {
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        return modelMapper.map(user, UserDTO.class);
    }

    @Override
    @Transactional
    public UserDTO updateUserRole(Long userId, String roleName) {
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        RoleEntity role = roleRepository.findByName(RoleName.valueOf(roleName))
                .orElseThrow(() -> new IllegalArgumentException("Role not found"));

        user.setRole(role);
        UserEntity updated = userRepository.save(user);

        // Send notification to user
        notificationService.createNotification(
                user,
                "Role Updated",
                "Your role has been updated to " + roleName,
                NotificationType.SYSTEM_NOTIFICATION
        );

        return modelMapper.map(updated, UserDTO.class);
    }

    @Override
    @Transactional
    public void deactivateUser(Long userId) {
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        
        user.setIsActive(false);
        userRepository.save(user);

        // Send notification
        notificationService.createNotification(
                user,
                "Account Deactivated",
                "Your account has been deactivated. Contact support for more information.",
                NotificationType.SYSTEM_NOTIFICATION
        );
    }

    @Override
    @Transactional
    public void activateUser(Long userId) {
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        
        user.setIsActive(true);
        userRepository.save(user);

        // Send notification
        notificationService.createNotification(
                user,
                "Account Activated",
                "Your account has been activated. You can now access all features.",
                NotificationType.SYSTEM_NOTIFICATION
        );
    }

    @Override
    @Transactional
    public void deleteUser(Long userId) {
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        
        // Note: In a real application, you might want to soft delete and handle related data properly
        userRepository.delete(user);
    }

    @Override
    public List<DoctorRequestDTO> getAllDoctorRequests() {
        return doctorRequestRepository.findAllByOrderByCreatedAtDesc()
                .stream()
                .map(this::convertToDTO)
                .toList();
    }

    @Override
    public List<DoctorRequestDTO> getPendingDoctorRequests() {
        return doctorRequestRepository.findByStatusOrderByCreatedAtDesc(DoctorRequestStatus.PENDING)
                .stream()
                .map(this::convertToDTO)
                .toList();
    }

    @Override
    @Transactional
    public DoctorRequestDTO approveDoctorRequest(Long requestId, Long adminId) {
        DoctorRequestEntity request = doctorRequestRepository.findById(requestId)
                .orElseThrow(() -> new IllegalArgumentException("Doctor request not found"));

        UserEntity admin = userRepository.findById(adminId)
                .orElseThrow(() -> new IllegalArgumentException("Admin not found"));

        if (request.getStatus() != DoctorRequestStatus.PENDING) {
            throw new IllegalArgumentException("Request has already been processed");
        }

        // Update request status
        request.setStatus(DoctorRequestStatus.APPROVED);
        request.setReviewedBy(admin);
        request.setReviewedAt(LocalDateTime.now());

        // Create doctor entity
        DoctorEntity doctor = new DoctorEntity();
        doctor.setUser(request.getUser());
        doctor.setSpecialization(request.getSpecialization());
        doctor.setBio(request.getBio());
        doctor.setLicenseNumber(request.getLicenseNumber());
        doctor.setEducation(request.getEducation());
        doctor.setExperience(request.getExperience());
        doctor.setIsActive(true);

        doctorRepository.save(doctor);

        // Update user role to DOCTOR
        RoleEntity doctorRole = roleRepository.findByName(RoleName.DOCTOR)
                .orElseThrow(() -> new IllegalArgumentException("Doctor role not found"));
        request.getUser().setRole(doctorRole);
        userRepository.save(request.getUser());

        // Save updated request
        DoctorRequestEntity updated = doctorRequestRepository.save(request);

        // Send notification to user
        notificationService.createNotification(
                request.getUser(),
                "Doctor Application Approved",
                "Congratulations! Your doctor application has been approved. You can now access the doctor dashboard.",
                NotificationType.SYSTEM_NOTIFICATION
        );

        return convertToDTO(updated);
    }

    @Override
    @Transactional
    public DoctorRequestDTO rejectDoctorRequest(Long requestId, Long adminId, String reason) {
        DoctorRequestEntity request = doctorRequestRepository.findById(requestId)
                .orElseThrow(() -> new IllegalArgumentException("Doctor request not found"));

        UserEntity admin = userRepository.findById(adminId)
                .orElseThrow(() -> new IllegalArgumentException("Admin not found"));

        if (request.getStatus() != DoctorRequestStatus.PENDING) {
            throw new IllegalArgumentException("Request has already been processed");
        }

        // Update request status
        request.setStatus(DoctorRequestStatus.REJECTED);
        request.setRejectionReason(reason);
        request.setReviewedBy(admin);
        request.setReviewedAt(LocalDateTime.now());

        DoctorRequestEntity updated = doctorRequestRepository.save(request);

        // Send notification to user
        notificationService.createNotification(
                request.getUser(),
                "Doctor Application Rejected",
                "Your doctor application has been rejected. Reason: " + reason,
                NotificationType.SYSTEM_NOTIFICATION
        );

        return convertToDTO(updated);
    }

    @Override
    public long getTotalUsers() {
        return userRepository.count();
    }

    @Override
    public long getTotalPatients() {
        RoleEntity userRole = roleRepository.findByName(RoleName.USER)
                .orElse(null);
        return userRole != null ? userRepository.countByRole(userRole) : 0;
    }

    @Override
    public long getTotalDoctors() {
        return doctorRepository.countActiveDoctors();
    }

    @Override
    public long getTotalAppointments() {
        return appointmentRepository.count();
    }

    private DoctorRequestDTO convertToDTO(DoctorRequestEntity request) {
        DoctorRequestDTO dto = modelMapper.map(request, DoctorRequestDTO.class);
        dto.setUserId(request.getUser().getId());
        dto.setUserName(request.getUser().getFullName());
        dto.setUserEmail(request.getUser().getEmail());
        
        if (request.getReviewedBy() != null) {
            dto.setReviewedByName(request.getReviewedBy().getFullName());
        }
        
        return dto;
    }
}
