package com.reservation.medical_reservation.service.Impl;

import com.reservation.medical_reservation.model.dto.RescheduleRequestDTO;
import com.reservation.medical_reservation.model.entity.AppointmentEntity;
import com.reservation.medical_reservation.model.entity.DoctorEntity;
import com.reservation.medical_reservation.model.entity.RescheduleRequestEntity;
import com.reservation.medical_reservation.model.entity.UserEntity;
import com.reservation.medical_reservation.model.enums.RescheduleRequestStatus;
import com.reservation.medical_reservation.repository.AppointmentRepository;
import com.reservation.medical_reservation.repository.DoctorRepository;
import com.reservation.medical_reservation.repository.RescheduleRequestRepository;
import com.reservation.medical_reservation.repository.UserRepository;
import com.reservation.medical_reservation.service.AppointmentService;
import com.reservation.medical_reservation.service.RescheduleRequestService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class RescheduleRequestServiceImpl implements RescheduleRequestService {
    
    private final RescheduleRequestRepository rescheduleRequestRepository;
    private final AppointmentRepository appointmentRepository;
    private final UserRepository userRepository;
    private final DoctorRepository doctorRepository;
    private final AppointmentService appointmentService;
    private final ModelMapper modelMapper;
    
    public RescheduleRequestServiceImpl(RescheduleRequestRepository rescheduleRequestRepository,
                                      AppointmentRepository appointmentRepository,
                                      UserRepository userRepository,
                                      DoctorRepository doctorRepository,
                                      AppointmentService appointmentService,
                                      ModelMapper modelMapper) {
        this.rescheduleRequestRepository = rescheduleRequestRepository;
        this.appointmentRepository = appointmentRepository;
        this.userRepository = userRepository;
        this.doctorRepository = doctorRepository;
        this.appointmentService = appointmentService;
        this.modelMapper = modelMapper;
    }
    
    @Override
    public RescheduleRequestDTO createRescheduleRequest(Long appointmentId, LocalDateTime requestedDateTime, 
                                                       LocalDateTime requestedEndTime, String patientReason) {
        AppointmentEntity appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new IllegalArgumentException("Appointment not found"));
        
        // Check if there's already a pending reschedule request for this appointment
        rescheduleRequestRepository.findByAppointmentAndStatus(appointment, RescheduleRequestStatus.PENDING)
                .ifPresent(existing -> {
                    throw new IllegalStateException("There is already a pending reschedule request for this appointment");
                });
        
        // Validate that the requested time is in the future
        if (requestedDateTime.isBefore(LocalDateTime.now())) {
            throw new IllegalArgumentException("Requested time must be in the future");
        }
        
        // Check if the requested slot is available
        boolean isAvailable = appointmentService.isSlotAvailable(
                appointment.getDoctor().getId(), 
                requestedDateTime, 
                requestedEndTime
        );
        
        if (!isAvailable) {
            throw new IllegalArgumentException("The requested time slot is not available");
        }
        
        RescheduleRequestEntity rescheduleRequest = new RescheduleRequestEntity();
        rescheduleRequest.setAppointment(appointment);
        rescheduleRequest.setOriginalDateTime(appointment.getAppointmentTime());
        rescheduleRequest.setRequestedDateTime(requestedDateTime);
        rescheduleRequest.setRequestedEndTime(requestedEndTime);
        rescheduleRequest.setPatientReason(patientReason);
        rescheduleRequest.setStatus(RescheduleRequestStatus.PENDING);
        
        RescheduleRequestEntity saved = rescheduleRequestRepository.save(rescheduleRequest);
        return mapToDTO(saved);
    }
    
    @Override
    public List<RescheduleRequestDTO> getPatientRescheduleRequests(Long patientId) {
        UserEntity patient = userRepository.findById(patientId)
                .orElseThrow(() -> new IllegalArgumentException("Patient not found"));
        
        return rescheduleRequestRepository.findByAppointmentPatientOrderByCreatedAtDesc(patient)
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }
    
    @Override
    public List<RescheduleRequestDTO> getDoctorRescheduleRequests(Long doctorId) {
        DoctorEntity doctor = doctorRepository.findById(doctorId)
                .orElseThrow(() -> new IllegalArgumentException("Doctor not found"));
        
        return rescheduleRequestRepository.findByDoctorOrderByCreatedAtDesc(doctor)
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }
    
    @Override
    public List<RescheduleRequestDTO> getPendingRescheduleRequestsForDoctor(Long doctorId) {
        DoctorEntity doctor = doctorRepository.findById(doctorId)
                .orElseThrow(() -> new IllegalArgumentException("Doctor not found"));
        
        return rescheduleRequestRepository.findByDoctorAndStatusOrderByCreatedAtDesc(doctor, RescheduleRequestStatus.PENDING)
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }
    
    @Override
    public RescheduleRequestDTO respondToRescheduleRequest(Long requestId, RescheduleRequestStatus status, String doctorResponse) {
        RescheduleRequestEntity request = rescheduleRequestRepository.findById(requestId)
                .orElseThrow(() -> new IllegalArgumentException("Reschedule request not found"));
        
        if (request.getStatus() != RescheduleRequestStatus.PENDING) {
            throw new IllegalStateException("This reschedule request has already been responded to");
        }
        
        request.setStatus(status);
        request.setDoctorResponse(doctorResponse);
        
        // If approved, update the appointment
        if (status == RescheduleRequestStatus.APPROVED) {
            AppointmentEntity appointment = request.getAppointment();
            appointment.setAppointmentTime(request.getRequestedDateTime());
            appointment.setEndTime(request.getRequestedEndTime());
            appointmentRepository.save(appointment);
        }
        
        RescheduleRequestEntity saved = rescheduleRequestRepository.save(request);
        return mapToDTO(saved);
    }
    
    @Override
    public RescheduleRequestDTO getRescheduleRequestById(Long requestId) {
        RescheduleRequestEntity request = rescheduleRequestRepository.findById(requestId)
                .orElseThrow(() -> new IllegalArgumentException("Reschedule request not found"));
        return mapToDTO(request);
    }
    
    @Override
    public void cancelRescheduleRequest(Long requestId) {
        RescheduleRequestEntity request = rescheduleRequestRepository.findById(requestId)
                .orElseThrow(() -> new IllegalArgumentException("Reschedule request not found"));
        
        if (request.getStatus() != RescheduleRequestStatus.PENDING) {
            throw new IllegalStateException("Only pending reschedule requests can be cancelled");
        }
        
        rescheduleRequestRepository.delete(request);
    }
    
    @Override
    public long countPendingRequestsForDoctor(Long doctorId) {
        DoctorEntity doctor = doctorRepository.findById(doctorId)
                .orElseThrow(() -> new IllegalArgumentException("Doctor not found"));
        
        return rescheduleRequestRepository.countByDoctorAndStatus(doctor, RescheduleRequestStatus.PENDING);
    }
    
    private RescheduleRequestDTO mapToDTO(RescheduleRequestEntity entity) {
        RescheduleRequestDTO dto = modelMapper.map(entity, RescheduleRequestDTO.class);
        dto.setAppointmentId(entity.getAppointment().getId());
        dto.setPatientName(entity.getAppointment().getPatient().getFullName());
        dto.setDoctorName(entity.getAppointment().getDoctor().getUser().getFullName());
        dto.setServiceName(entity.getAppointment().getService() != null ? 
                          entity.getAppointment().getService().getName() : "Consultation");
        return dto;
    }
}
