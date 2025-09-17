package com.reservation.medical_reservation.service.Impl;

import com.reservation.medical_reservation.model.dto.AppointmentDTO;
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
    private final NotificationRepository notificationRepository;
    private final NotificationService notificationService;
    private final ModelMapper modelMapper;

    public AdminServiceImpl(UserRepository userRepository,
                          DoctorRepository doctorRepository,
                          DoctorRequestRepository doctorRequestRepository,
                          AppointmentRepository appointmentRepository,
                          RoleRepository roleRepository,
                          NotificationRepository notificationRepository,
                          NotificationService notificationService,
                          ModelMapper modelMapper) {
        this.userRepository = userRepository;
        this.doctorRepository = doctorRepository;
        this.doctorRequestRepository = doctorRequestRepository;
        this.appointmentRepository = appointmentRepository;
        this.roleRepository = roleRepository;
        this.notificationRepository = notificationRepository;
        this.notificationService = notificationService;
        this.modelMapper = modelMapper;
    }

    @Override
    public List<UserDTO> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(this::convertUserToDTO)
                .toList();
    }

    @Override
    public UserDTO getUserById(Long userId) {
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        return convertUserToDTO(user);
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

        notificationService.createNotification(
                user,
                "Role Updated",
                "Your role has been updated to " + roleName,
                NotificationType.SYSTEM_NOTIFICATION
        );

        return convertUserToDTO(updated);
    }

    @Override
    @Transactional
    public void deactivateUser(Long userId) {
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        
        if (!user.getIsActive()) {
            throw new IllegalArgumentException("User is already deactivated");
        }
        
        user.setIsActive(false);
        userRepository.save(user);

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
        
        if (user.getIsActive()) {
            throw new IllegalArgumentException("User is already active");
        }
        
        user.setIsActive(true);
        userRepository.save(user);

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

        if (user.getRole().getName().toString().equals("ADMIN")) {
            throw new IllegalArgumentException("Cannot delete admin users. Please deactivate instead.");
        }

        long patientAppointmentCount = appointmentRepository.countByPatientId(userId);
        if (patientAppointmentCount > 0) {
            throw new IllegalArgumentException("Cannot delete user with existing appointments. Please deactivate instead.");
        }

        doctorRepository.findByUserId(userId).ifPresent(doctor -> {
            long doctorAppointmentCount = appointmentRepository.findByDoctorOrderByAppointmentTimeDesc(doctor).size();
            if (doctorAppointmentCount > 0) {
                throw new IllegalArgumentException("Cannot delete doctor with existing appointments. Please deactivate instead.");
            }
            doctorRepository.delete(doctor);
        });

        doctorRequestRepository.findByUser(user).ifPresent(doctorRequestRepository::delete);

        List<DoctorRequestEntity> reviewedRequests = doctorRequestRepository.findByReviewedBy(user);
        for (DoctorRequestEntity request : reviewedRequests) {
            request.setReviewedBy(null);
            doctorRequestRepository.save(request);
        }

        List<NotificationEntity> userNotifications = notificationRepository.findByUserOrderByCreatedAtDesc(user);
        notificationRepository.deleteAll(userNotifications);

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
        // Fetch entities
        DoctorRequestEntity request = doctorRequestRepository.findById(requestId)
                .orElseThrow(() -> new IllegalArgumentException("Doctor request not found"));

        UserEntity admin = userRepository.findById(adminId)
                .orElseThrow(() -> new IllegalArgumentException("Admin not found"));

        if (request.getStatus() != DoctorRequestStatus.PENDING) {
            throw new IllegalArgumentException("Request has already been processed");
        }

        // Get user ID to avoid potential lazy loading issues
        Long userId = request.getUser().getId();
        
        // Update doctor entity first
        DoctorEntity doctor = doctorRepository.findByUserId(userId)
                .orElseThrow(() -> new IllegalStateException("Doctor entity not found for user"));

        doctor.setSpecialization(request.getSpecialization());
        doctor.setBio(request.getBio());
        doctor.setLicenseNumber(request.getLicenseNumber());
        doctor.setEducation(request.getEducation());
        doctor.setExperience(request.getExperience());
        doctor.setIsActive(true);

        // Save doctor entity
        doctorRepository.save(doctor);

        // Update request status
        request.setStatus(DoctorRequestStatus.APPROVED);
        request.setReviewedBy(admin);
        request.setReviewedAt(LocalDateTime.now());

        // Save updated request
        DoctorRequestEntity updated = doctorRequestRepository.save(request);

        // Create notification using fresh user reference
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalStateException("User not found"));
        
        notificationService.createNotification(
                user,
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

        // Get user ID to avoid potential lazy loading issues
        Long userId = request.getUser().getId();

        request.setStatus(DoctorRequestStatus.REJECTED);
        request.setRejectionReason(reason);
        request.setReviewedBy(admin);
        request.setReviewedAt(LocalDateTime.now());

        DoctorRequestEntity updated = doctorRequestRepository.save(request);

        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalStateException("User not found"));

        notificationService.createNotification(
                user,
                "Doctor Application Rejected",
                "Your doctor application has been rejected. Reason: " + reason,
                NotificationType.SYSTEM_NOTIFICATION
        );

        return convertToDTO(updated);
    }

    @Override
    public List<AppointmentDTO> getAllAppointments() {
        return appointmentRepository.findAllByOrderByAppointmentTimeDesc()
                .stream()
                .map(this::convertAppointmentToDTO)
                .toList();
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
    
    private UserDTO convertUserToDTO(UserEntity user) {
        UserDTO dto = modelMapper.map(user, UserDTO.class);

        dto.setRole(user.getRole().getName().toString());
        dto.setIsActive(user.getIsActive());
        
        return dto;
    }

    private AppointmentDTO convertAppointmentToDTO(AppointmentEntity appointment) {
        AppointmentDTO dto = modelMapper.map(appointment, AppointmentDTO.class);
        dto.setPatientId(appointment.getPatient().getId());
        dto.setPatientName(appointment.getPatient().getFullName());
        dto.setDoctorId(appointment.getDoctor().getId());
        dto.setDoctorName(appointment.getDoctor().getUser().getFullName());
        dto.setDoctorSpecialization(appointment.getDoctor().getSpecialization());
        
        if (appointment.getService() != null) {
            dto.setServiceId(appointment.getService().getId());
            dto.setServiceName(appointment.getService().getName());
        }
        
        return dto;
    }
}
