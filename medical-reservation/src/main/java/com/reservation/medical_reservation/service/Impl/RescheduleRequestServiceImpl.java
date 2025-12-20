package com.reservation.medical_reservation.service.Impl;

import com.reservation.medical_reservation.model.dto.RescheduleRequestDTO;
import com.reservation.medical_reservation.model.dto.ScheduleDTO;
import com.reservation.medical_reservation.model.entity.AppointmentEntity;
import com.reservation.medical_reservation.model.entity.DoctorEntity;
import com.reservation.medical_reservation.model.entity.RescheduleRequestEntity;
import com.reservation.medical_reservation.model.entity.ScheduleEntity;
import com.reservation.medical_reservation.model.entity.UserEntity;
import com.reservation.medical_reservation.model.enums.NotificationType;
import com.reservation.medical_reservation.model.enums.RescheduleRequestStatus;
import com.reservation.medical_reservation.repository.AppointmentRepository;
import com.reservation.medical_reservation.repository.DoctorRepository;
import com.reservation.medical_reservation.repository.RescheduleRequestRepository;
import com.reservation.medical_reservation.repository.ScheduleRepository;
import com.reservation.medical_reservation.repository.UserRepository;
import com.reservation.medical_reservation.service.AppointmentService;
import com.reservation.medical_reservation.service.NotificationService;
import com.reservation.medical_reservation.service.RescheduleRequestService;
import com.reservation.medical_reservation.service.ScheduleService;
import com.reservation.medical_reservation.util.DateFormatterUtil;
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
    private final ScheduleRepository scheduleRepository;
    private final AppointmentService appointmentService;
    private final NotificationService notificationService;
    private final ScheduleService scheduleService;
    private final ModelMapper modelMapper;
    
    public RescheduleRequestServiceImpl(RescheduleRequestRepository rescheduleRequestRepository,
                                      AppointmentRepository appointmentRepository,
                                      UserRepository userRepository,
                                      DoctorRepository doctorRepository,
                                      ScheduleRepository scheduleRepository,
                                      AppointmentService appointmentService,
                                      NotificationService notificationService,
                                      ScheduleService scheduleService,
                                      ModelMapper modelMapper) {
        this.rescheduleRequestRepository = rescheduleRequestRepository;
        this.appointmentRepository = appointmentRepository;
        this.userRepository = userRepository;
        this.doctorRepository = doctorRepository;
        this.scheduleRepository = scheduleRepository;
        this.appointmentService = appointmentService;
        this.notificationService = notificationService;
        this.scheduleService = scheduleService;
        this.modelMapper = modelMapper;
    }
    
    @Override
    public RescheduleRequestDTO createRescheduleRequest(Long appointmentId, LocalDateTime requestedDateTime, 
                                                       LocalDateTime requestedEndTime, String patientReason) {
        AppointmentEntity appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new IllegalArgumentException("Appointment not found"));
        
        rescheduleRequestRepository.findByAppointmentAndStatus(appointment, RescheduleRequestStatus.PENDING)
                .ifPresent(existing -> {
                    throw new IllegalStateException("There is already a pending reschedule request for this appointment");
                });
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime nowMinusTolerance = now.minusMinutes(5); 
        
        System.out.println("Backend validation - Current time: " + now);
        System.out.println("Backend validation - Requested time: " + requestedDateTime);
        System.out.println("Backend validation - Now minus tolerance: " + nowMinusTolerance);
        System.out.println("Backend validation - Is requested time before tolerance? " + requestedDateTime.isBefore(nowMinusTolerance));
        
        if (requestedDateTime.isBefore(nowMinusTolerance)) {
            throw new IllegalArgumentException("Requested time must be in the future. Current: " + now + ", Requested: " + requestedDateTime);
        }
        
        boolean isAvailable = appointmentService.isSlotAvailableForReschedule(
                appointment.getDoctor().getId(), 
                requestedDateTime, 
                requestedEndTime,
                appointmentId
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
        
        notificationService.createNotification(
                appointment.getDoctor().getUser(),
                "New Reschedule Request",
                "You have a new reschedule request from " + appointment.getPatient().getFullName() + 
                " for the appointment on " + DateFormatterUtil.formatForNotification(appointment.getAppointmentTime()) + 
                ". They want to reschedule to " + DateFormatterUtil.formatForNotification(requestedDateTime) + ".",
                NotificationType.SYSTEM_NOTIFICATION
        );
        
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
        
        if (status == RescheduleRequestStatus.APPROVED) {
            AppointmentEntity appointment = request.getAppointment();
            
            boolean isStillAvailable = appointmentService.isSlotAvailableForReschedule(
                    appointment.getDoctor().getId(),
                    request.getRequestedDateTime(),
                    request.getRequestedEndTime(),
                    appointment.getId()
            );
            
            if (!isStillAvailable) {
                throw new IllegalStateException("The requested time slot is no longer available");
            }
            
            LocalDateTime originalTime = appointment.getAppointmentTime();
            LocalDateTime originalEndTime = appointment.getEndTime();
            
            System.out.println("=== RESCHEDULE APPROVAL DEBUG ===");
            System.out.println("Original appointment time: " + originalTime + " to " + originalEndTime);
            System.out.println("Requested new time: " + request.getRequestedDateTime() + " to " + request.getRequestedEndTime());
            System.out.println("Appointment ID: " + appointment.getId());
            System.out.println("Doctor ID: " + appointment.getDoctor().getId());
            
            handleScheduleSlotRescheduling(
                appointment.getDoctor(),
                originalTime,
                originalEndTime,
                request.getRequestedDateTime(),
                request.getRequestedEndTime()
            );
            
            appointment.setAppointmentTime(request.getRequestedDateTime());
            appointment.setEndTime(request.getRequestedEndTime());
            appointmentRepository.save(appointment);
            
            System.out.println("Appointment " + appointment.getId() + " successfully rescheduled from " + 
                             originalTime + " to " + request.getRequestedDateTime());
            System.out.println("=== END RESCHEDULE DEBUG ===");
            
            notificationService.createNotification(
                    appointment.getPatient(),
                    "Reschedule Request Approved",
                    "Your reschedule request has been approved! Your appointment has been moved to " + 
                    DateFormatterUtil.formatForNotification(request.getRequestedDateTime()) + 
                    (doctorResponse != null ? ". Doctor's note: " + doctorResponse : "."),
                    NotificationType.APPOINTMENT_RESCHEDULED
            );
        } else if (status == RescheduleRequestStatus.REJECTED) {
            AppointmentEntity appointment = request.getAppointment();
            notificationService.createNotification(
                    appointment.getPatient(),
                    "Reschedule Request Rejected",
                    "Your reschedule request has been rejected. Your original appointment on " + 
                    DateFormatterUtil.formatForNotification(appointment.getAppointmentTime()) + " remains scheduled." +
                    (doctorResponse != null ? " Reason: " + doctorResponse : ""),
                    NotificationType.SYSTEM_NOTIFICATION
            );
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
    
    private void handleScheduleSlotRescheduling(DoctorEntity doctor, 
                                               LocalDateTime originalStartTime, 
                                               LocalDateTime originalEndTime,
                                               LocalDateTime newStartTime, 
                                               LocalDateTime newEndTime) {
        
        System.out.println("Handling schedule slot rescheduling for doctor " + doctor.getId());
        System.out.println("Original slot: " + originalStartTime + " to " + originalEndTime);
        System.out.println("New slot: " + newStartTime + " to " + newEndTime);
        
        freeOriginalScheduleSlot(doctor, originalStartTime, originalEndTime);
        
        reserveNewScheduleSlot(doctor, newStartTime, newEndTime);
    }

    private void freeOriginalScheduleSlot(DoctorEntity doctor, 
                                         LocalDateTime startTime, 
                                         LocalDateTime endTime) {
    
        List<ScheduleEntity> overlappingSlots = scheduleRepository.findByDoctorAndDateRange(
            doctor, startTime, endTime);
        
        System.out.println("Looking for slots to free between " + startTime + " and " + endTime);
        System.out.println("Found " + overlappingSlots.size() + " overlapping slots");
        
        for (ScheduleEntity slot : overlappingSlots) {
            System.out.println("Checking slot: " + slot.getStartTime() + " to " + slot.getEndTime() + " (available: " + slot.isAvailable() + ")");
            
            if (slot.getStartTime().equals(startTime) && slot.getEndTime().equals(endTime)) {
                slot.setAvailable(true);
                scheduleRepository.save(slot);
                System.out.println("Freed exact matching schedule slot: " + slot.getStartTime() + " to " + slot.getEndTime());
                return; 
            }
            else if (isTimeOverlapping(slot.getStartTime(), slot.getEndTime(), startTime, endTime) && !slot.isAvailable()) {
                slot.setAvailable(true);
                scheduleRepository.save(slot);
                System.out.println("Freed overlapping schedule slot: " + slot.getStartTime() + " to " + slot.getEndTime());
            }
        }
    }
    
    private void reserveNewScheduleSlot(DoctorEntity doctor, 
                                       LocalDateTime startTime, 
                                       LocalDateTime endTime) {
        
        List<ScheduleEntity> overlappingSlots = scheduleRepository.findByDoctorAndDateRange(
            doctor, startTime, endTime);
        
        System.out.println("Looking for slots to reserve between " + startTime + " and " + endTime);
        System.out.println("Found " + overlappingSlots.size() + " overlapping slots");
        
        boolean slotFound = false;
        for (ScheduleEntity slot : overlappingSlots) {
            System.out.println("Checking slot: " + slot.getStartTime() + " to " + slot.getEndTime() + " (available: " + slot.isAvailable() + ")");
            
            if (slot.getStartTime().equals(startTime) && slot.getEndTime().equals(endTime)) {
                slot.setAvailable(false);
                scheduleRepository.save(slot);

                System.out.println("Reserved exact matching schedule slot: " + slot.getStartTime() + " to " + slot.getEndTime());
                slotFound = true;
                break; 
            }

            else if (isTimeOverlapping(slot.getStartTime(), slot.getEndTime(), startTime, endTime) && slot.isAvailable()) {
                slot.setAvailable(false);
                scheduleRepository.save(slot);
                System.out.println("Reserved overlapping schedule slot: " + slot.getStartTime() + " to " + slot.getEndTime());
                slotFound = true;
                break;
            }
        }
        
        if (!slotFound) {
            ScheduleEntity newSlot = new ScheduleEntity();
            newSlot.setDoctor(doctor);
            newSlot.setStartTime(startTime);
            newSlot.setEndTime(endTime);
            newSlot.setAvailable(false); 
            scheduleRepository.save(newSlot);
            System.out.println("Created new reserved schedule slot: " + startTime + " to " + endTime);
        }
    }
    
    private boolean isTimeOverlapping(LocalDateTime start1, LocalDateTime end1, 
                                     LocalDateTime start2, LocalDateTime end2) {
        return start1.isBefore(end2) && start2.isBefore(end1);
    }
}
