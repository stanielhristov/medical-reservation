package com.reservation.medical_reservation.service.Impl;

import com.reservation.medical_reservation.model.dto.AppointmentDTO;
import com.reservation.medical_reservation.model.entity.AppointmentEntity;
import com.reservation.medical_reservation.model.entity.DoctorEntity;
import com.reservation.medical_reservation.model.entity.ServiceEntity;
import com.reservation.medical_reservation.model.entity.UserEntity;
import com.reservation.medical_reservation.model.enums.AppointmentStatus;
import com.reservation.medical_reservation.model.enums.NotificationType;
import com.reservation.medical_reservation.repository.AppointmentRepository;
import com.reservation.medical_reservation.repository.DoctorRepository;
import com.reservation.medical_reservation.repository.ServiceRepository;
import com.reservation.medical_reservation.repository.UserRepository;
import com.reservation.medical_reservation.service.AppointmentService;
import com.reservation.medical_reservation.service.NotificationService;
import com.reservation.medical_reservation.util.DateFormatterUtil;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class AppointmentServiceImpl implements AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final UserRepository userRepository;
    private final DoctorRepository doctorRepository;
    private final ServiceRepository serviceRepository;
    private final NotificationService notificationService;
    private final ModelMapper modelMapper;

    public AppointmentServiceImpl(AppointmentRepository appointmentRepository,
                                UserRepository userRepository,
                                DoctorRepository doctorRepository,
                                ServiceRepository serviceRepository,
                                NotificationService notificationService,
                                ModelMapper modelMapper) {
        this.appointmentRepository = appointmentRepository;
        this.userRepository = userRepository;
        this.doctorRepository = doctorRepository;
        this.serviceRepository = serviceRepository;
        this.notificationService = notificationService;
        this.modelMapper = modelMapper;
    }

    @Override
    @Transactional
    public AppointmentDTO createAppointment(AppointmentDTO appointmentDTO) {
        UserEntity patient = userRepository.findById(appointmentDTO.getPatientId())
                .orElseThrow(() -> new IllegalArgumentException("Patient not found"));
        
        DoctorEntity doctor = doctorRepository.findById(appointmentDTO.getDoctorId())
                .orElseThrow(() -> new IllegalArgumentException("Doctor not found"));

        if (!isSlotAvailable(appointmentDTO.getDoctorId(), 
                           appointmentDTO.getAppointmentTime(), 
                           appointmentDTO.getEndTime())) {
            throw new IllegalArgumentException("Time slot is not available");
        }

        AppointmentEntity appointment = new AppointmentEntity();
        appointment.setPatient(patient);
        appointment.setDoctor(doctor);
        appointment.setAppointmentTime(appointmentDTO.getAppointmentTime());
        appointment.setEndTime(appointmentDTO.getEndTime());
        appointment.setStatus(AppointmentStatus.PENDING);
        appointment.setNotes(appointmentDTO.getNotes());

        if (appointmentDTO.getServiceId() != null) {
            ServiceEntity service = serviceRepository.findById(appointmentDTO.getServiceId())
                    .orElseThrow(() -> new IllegalArgumentException("Service not found"));
            appointment.setService(service);
        }

        AppointmentEntity saved = appointmentRepository.save(appointment);

        notificationService.createNotification(
                patient,
                "Appointment Requested",
                "Your appointment request for " + DateFormatterUtil.formatForNotification(saved.getAppointmentTime()) + 
                " has been submitted and is pending confirmation.",
                NotificationType.APPOINTMENT_CONFIRMATION
        );

        notificationService.createNotification(
                doctor.getUser(),
                "New Appointment Request",
                "You have a new appointment request from " + patient.getFullName() + 
                " for " + DateFormatterUtil.formatForNotification(saved.getAppointmentTime()),
                NotificationType.APPOINTMENT_CONFIRMATION
        );

        return convertToDTO(saved);
    }

    @Override
    public List<AppointmentDTO> getPatientAppointments(Long patientId) {
        UserEntity patient = userRepository.findById(patientId)
                .orElseThrow(() -> new IllegalArgumentException("Patient not found"));
        
        return appointmentRepository.findByPatientOrderByAppointmentTimeDesc(patient)
                .stream()
                .map(this::convertToDTO)
                .toList();
    }

    @Override
    public List<AppointmentDTO> getDoctorAppointments(Long doctorId) {
        DoctorEntity doctor = doctorRepository.findById(doctorId)
                .orElseThrow(() -> new IllegalArgumentException("Doctor not found"));
        
        return appointmentRepository.findByDoctorOrderByAppointmentTimeDesc(doctor)
                .stream()
                .map(this::convertToDTO)
                .toList();
    }

    @Override
    public List<AppointmentDTO> getUpcomingAppointmentsByPatient(Long patientId) {
        UserEntity patient = userRepository.findById(patientId)
                .orElseThrow(() -> new IllegalArgumentException("Patient not found"));
        
        return appointmentRepository.findUpcomingAppointmentsByPatient(patient, LocalDateTime.now())
                .stream()
                .map(this::convertToDTO)
                .toList();
    }

    @Override
    public List<AppointmentDTO> getUpcomingAppointmentsByDoctor(Long doctorId) {
        DoctorEntity doctor = doctorRepository.findById(doctorId)
                .orElseThrow(() -> new IllegalArgumentException("Doctor not found"));
        
        return appointmentRepository.findUpcomingAppointmentsByDoctor(doctor, LocalDateTime.now())
                .stream()
                .map(this::convertToDTO)
                .toList();
    }

    @Override
    public AppointmentDTO getNextAppointmentByPatient(Long patientId) {
        UserEntity patient = userRepository.findById(patientId)
                .orElseThrow(() -> new IllegalArgumentException("Patient not found"));
        
        return appointmentRepository.findNextAppointmentByPatient(patient, LocalDateTime.now(), AppointmentStatus.CONFIRMED)
                .map(this::convertToDTO)
                .orElse(null);
    }

    @Override
    public AppointmentDTO getAppointmentById(Long appointmentId) {
        AppointmentEntity appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new IllegalArgumentException("Appointment not found"));
        
        return convertToDTO(appointment);
    }

    @Override
    @Transactional
    public AppointmentDTO updateAppointmentStatus(Long appointmentId, AppointmentStatus status, String reason) {
        AppointmentEntity appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new IllegalArgumentException("Appointment not found"));
        
        AppointmentStatus oldStatus = appointment.getStatus();
        appointment.setStatus(status);
        
        if (status == AppointmentStatus.CANCELLED && reason != null) {
            appointment.setCancellationReason(reason);
        }
        
        AppointmentEntity updated = appointmentRepository.save(appointment);

        if (status == AppointmentStatus.CONFIRMED && oldStatus == AppointmentStatus.PENDING) {
            notificationService.createNotification(
                    appointment.getPatient(),
                    "Appointment Confirmed",
                    "Your appointment has been confirmed for " + DateFormatterUtil.formatForNotification(appointment.getAppointmentTime()),
                    NotificationType.APPOINTMENT_CONFIRMATION
            );
        } else if (status == AppointmentStatus.CANCELLED) {
            notificationService.createNotification(
                    appointment.getPatient(),
                    "Appointment Cancelled",
                    "Your appointment scheduled for " + DateFormatterUtil.formatForNotification(appointment.getAppointmentTime()) + 
                    " has been cancelled. " + (reason != null ? "Reason: " + reason : ""),
                    NotificationType.APPOINTMENT_CANCELLATION
            );
        }

        return convertToDTO(updated);
    }

    @Override
    @Transactional
    public AppointmentDTO rescheduleAppointment(Long appointmentId, LocalDateTime newDateTime) {
        AppointmentEntity appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new IllegalArgumentException("Appointment not found"));

        LocalDateTime newEndTime = newDateTime.plusHours(1);

        if (!isSlotAvailable(appointment.getDoctor().getId(), newDateTime, newEndTime)) {
            throw new IllegalArgumentException("New time slot is not available");
        }
        
        appointment.setAppointmentTime(newDateTime);
        appointment.setEndTime(newEndTime);
        appointment.setStatus(AppointmentStatus.PENDING);
        
        AppointmentEntity updated = appointmentRepository.save(appointment);

        notificationService.createNotification(
                appointment.getPatient(),
                "Appointment Rescheduled",
                "Your appointment has been rescheduled to " + DateFormatterUtil.formatForNotification(newDateTime),
                NotificationType.APPOINTMENT_RESCHEDULED
        );

        return convertToDTO(updated);
    }

    @Override
    @Transactional
    public void cancelAppointment(Long appointmentId, String reason) {
        updateAppointmentStatus(appointmentId, AppointmentStatus.CANCELLED, reason);
    }

    @Override
    public List<AppointmentDTO> getDoctorAppointmentsByDate(Long doctorId, LocalDateTime date) {
        DoctorEntity doctor = doctorRepository.findById(doctorId)
                .orElseThrow(() -> new IllegalArgumentException("Doctor not found"));
        
        return appointmentRepository.findByDoctorAndDate(doctor, date)
                .stream()
                .map(this::convertToDTO)
                .toList();
    }

    @Override
    public boolean isSlotAvailable(Long doctorId, LocalDateTime startTime, LocalDateTime endTime) {
        DoctorEntity doctor = doctorRepository.findById(doctorId)
                .orElseThrow(() -> new IllegalArgumentException("Doctor not found"));
        
        List<AppointmentEntity> conflictingAppointments = appointmentRepository
                .findConflictingAppointments(doctor, startTime, endTime);
        
        return conflictingAppointments.isEmpty();
    }

    @Override
    public List<AppointmentDTO> getDoctorAppointmentsForToday(Long doctorId) {
        DoctorEntity doctor = doctorRepository.findById(doctorId)
                .orElseThrow(() -> new IllegalArgumentException("Doctor not found"));
        
        return appointmentRepository.findDoctorAppointmentsForToday(doctor, LocalDateTime.now())
                .stream()
                .map(this::convertToDTO)
                .toList();
    }

    @Override
    public List<AppointmentDTO> getPatientAppointmentsForToday(Long patientId) {
        UserEntity patient = userRepository.findById(patientId)
                .orElseThrow(() -> new IllegalArgumentException("Patient not found"));
        
        return appointmentRepository.findPatientAppointmentsForToday(patient, LocalDateTime.now())
                .stream()
                .map(this::convertToDTO)
                .toList();
    }

    @Override
    public long countDoctorAppointmentsByStatus(Long doctorId, AppointmentStatus status) {
        DoctorEntity doctor = doctorRepository.findById(doctorId)
                .orElseThrow(() -> new IllegalArgumentException("Doctor not found"));
        
        return appointmentRepository.countDoctorAppointmentsByStatus(doctor, status);
    }

    @Override
    public long countPatientAppointmentsByStatus(Long patientId, AppointmentStatus status) {
        UserEntity patient = userRepository.findById(patientId)
                .orElseThrow(() -> new IllegalArgumentException("Patient not found"));
        
        return appointmentRepository.countPatientAppointmentsByStatus(patient, status);
    }

    private AppointmentDTO convertToDTO(AppointmentEntity appointment) {
        AppointmentDTO dto = modelMapper.map(appointment, AppointmentDTO.class);
        dto.setPatientId(appointment.getPatient().getId());
        dto.setPatientName(appointment.getPatient().getFullName());
        dto.setDoctorId(appointment.getDoctor().getId());
        dto.setDoctorName(appointment.getDoctor().getUser().getFullName());
        dto.setDoctorSpecialization(appointment.getDoctor().getSpecialization());
        dto.setDoctorLocation(appointment.getDoctor().getLocation());
        dto.setConsultationFee(appointment.getDoctor().getPrice());
        
        if (appointment.getService() != null) {
            dto.setServiceId(appointment.getService().getId());
            dto.setServiceName(appointment.getService().getName());
        }
        
        return dto;
    }
}
