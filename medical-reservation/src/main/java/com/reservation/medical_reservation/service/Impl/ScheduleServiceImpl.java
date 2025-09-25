package com.reservation.medical_reservation.service.Impl;

import com.reservation.medical_reservation.model.dto.ScheduleDTO;
import com.reservation.medical_reservation.model.entity.DoctorEntity;
import com.reservation.medical_reservation.model.entity.ScheduleEntity;
import com.reservation.medical_reservation.model.entity.BlockedSlotEntity;
import com.reservation.medical_reservation.model.entity.AppointmentEntity;
import com.reservation.medical_reservation.repository.DoctorRepository;
import com.reservation.medical_reservation.repository.ScheduleRepository;
import com.reservation.medical_reservation.repository.BlockedSlotRepository;
import com.reservation.medical_reservation.repository.AppointmentRepository;
import com.reservation.medical_reservation.service.ScheduleService;
import com.reservation.medical_reservation.service.DoctorAvailabilityService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.ArrayList;

@Service
public class ScheduleServiceImpl implements ScheduleService {

    private final ScheduleRepository scheduleRepository;
    private final DoctorRepository doctorRepository;
    private final BlockedSlotRepository blockedSlotRepository;
    private final AppointmentRepository appointmentRepository;
    private final DoctorAvailabilityService availabilityService;
    private final ModelMapper modelMapper;

    public ScheduleServiceImpl(ScheduleRepository scheduleRepository, 
                             DoctorRepository doctorRepository,
                             BlockedSlotRepository blockedSlotRepository,
                             AppointmentRepository appointmentRepository,
                             DoctorAvailabilityService availabilityService,
                             ModelMapper modelMapper) {
        this.scheduleRepository = scheduleRepository;
        this.doctorRepository = doctorRepository;
        this.blockedSlotRepository = blockedSlotRepository;
        this.appointmentRepository = appointmentRepository;
        this.availabilityService = availabilityService;
        this.modelMapper = modelMapper;
    }

    @Override
    @Transactional
    public ScheduleDTO createSchedule(ScheduleDTO scheduleDTO) {
        DoctorEntity doctor = doctorRepository.findById(scheduleDTO.getDoctorId())
                .orElseThrow(() -> new IllegalArgumentException("Doctor not found"));

        ScheduleEntity schedule = new ScheduleEntity();
        schedule.setDoctor(doctor);
        schedule.setStartTime(scheduleDTO.getStartTime());
        schedule.setEndTime(scheduleDTO.getEndTime());
        schedule.setAvailable(true);

        ScheduleEntity saved = scheduleRepository.save(schedule);
        return modelMapper.map(saved, ScheduleDTO.class);
    }

    @Override
    public List<ScheduleDTO> getDoctorSchedule(Long doctorId) {
        DoctorEntity doctor = doctorRepository.findById(doctorId)
                .orElseThrow(() -> new IllegalArgumentException("Doctor not found"));

        return scheduleRepository.findByDoctorOrderByStartTime(doctor)
                .stream()
                .map(schedule -> {
                    ScheduleDTO dto = modelMapper.map(schedule, ScheduleDTO.class);
                    dto.setDoctorId(doctor.getId());
                    dto.setDoctorName(doctor.getUser().getFullName());
                    return dto;
                })
                .toList();
    }

    @Override
    public List<ScheduleDTO> getAvailableSlots(Long doctorId, LocalDateTime startDate, LocalDateTime endDate) {
        DoctorEntity doctor = doctorRepository.findById(doctorId)
                .orElseThrow(() -> new IllegalArgumentException("Doctor not found"));

        return scheduleRepository.findAvailableSlots(doctor, startDate, endDate)
                .stream()
                .map(schedule -> {
                    ScheduleDTO dto = modelMapper.map(schedule, ScheduleDTO.class);
                    dto.setDoctorId(doctor.getId());
                    dto.setDoctorName(doctor.getUser().getFullName());
                    return dto;
                })
                .toList();
    }

    @Override
    @Transactional
    public ScheduleDTO updateSchedule(Long scheduleId, ScheduleDTO scheduleDTO) {
        ScheduleEntity schedule = scheduleRepository.findById(scheduleId)
                .orElseThrow(() -> new IllegalArgumentException("Schedule not found"));

        schedule.setStartTime(scheduleDTO.getStartTime());
        schedule.setEndTime(scheduleDTO.getEndTime());
        schedule.setAvailable(scheduleDTO.isAvailable());

        ScheduleEntity updated = scheduleRepository.save(schedule);
        return modelMapper.map(updated, ScheduleDTO.class);
    }

    @Override
    @Transactional
    public void deleteSchedule(Long scheduleId) {
        scheduleRepository.deleteById(scheduleId);
    }

    @Override
    @Transactional
    public void markSlotUnavailable(Long scheduleId) {
        ScheduleEntity schedule = scheduleRepository.findById(scheduleId)
                .orElseThrow(() -> new IllegalArgumentException("Schedule not found"));
        schedule.setAvailable(false);
        scheduleRepository.save(schedule);
    }

    @Override
    @Transactional
    public void markSlotAvailable(Long scheduleId) {
        ScheduleEntity schedule = scheduleRepository.findById(scheduleId)
                .orElseThrow(() -> new IllegalArgumentException("Schedule not found"));
        schedule.setAvailable(true);
        scheduleRepository.save(schedule);
    }

    @Override
    public List<ScheduleDTO> getDoctorScheduleWithStatus(Long doctorId, LocalDateTime startDate, LocalDateTime endDate) {
        DoctorEntity doctor = doctorRepository.findById(doctorId)
                .orElseThrow(() -> new IllegalArgumentException("Doctor not found"));

        List<ScheduleEntity> schedules = scheduleRepository.findByDoctorAndDateRange(doctor, startDate, endDate);
        List<BlockedSlotEntity> blockedSlots = blockedSlotRepository.findByDoctorAndDateRange(doctor, startDate, endDate);
        List<AppointmentEntity> appointments = appointmentRepository.findByDoctorAndDateRange(doctor, startDate, endDate);

        List<ScheduleDTO> result = new ArrayList<>();

        for (ScheduleEntity schedule : schedules) {
            ScheduleDTO dto = modelMapper.map(schedule, ScheduleDTO.class);
            dto.setDoctorId(doctor.getId());
            dto.setDoctorName(doctor.getUser().getFullName());

            boolean isBlocked = blockedSlots.stream().anyMatch(blocked -> 
                isTimeOverlapping(schedule.getStartTime(), schedule.getEndTime(), 
                                blocked.getStartTime(), blocked.getEndTime()));

            if (isBlocked) {
                BlockedSlotEntity blockingSlot = blockedSlots.stream()
                    .filter(blocked -> isTimeOverlapping(schedule.getStartTime(), schedule.getEndTime(), 
                                                       blocked.getStartTime(), blocked.getEndTime()))
                    .findFirst().orElse(null);
                dto.setStatus("BLOCKED");
                dto.setBlockedReason(blockingSlot != null ? blockingSlot.getReason() : "Unavailable");
                dto.setAvailable(false);
            } else {
                AppointmentEntity appointment = appointments.stream()
                    .filter(apt -> isTimeOverlapping(schedule.getStartTime(), schedule.getEndTime(), 
                                                   apt.getAppointmentTime(), apt.getEndTime()))
                    .findFirst().orElse(null);

                if (appointment != null) {
                    dto.setStatus("BOOKED");
                    dto.setAppointmentId(appointment.getId());
                    dto.setAvailable(false);
                } else {
                    dto.setStatus("FREE");
                    dto.setAvailable(true);
                }
            }

            result.add(dto);
        }

        return result;
    }

    @Override
    @Transactional
    public ScheduleDTO createScheduleFromAvailability(ScheduleDTO scheduleDTO) {
        return createSchedule(scheduleDTO);
    }

    @Override
    @Transactional
    public void generateScheduleFromAvailability(Long doctorId, LocalDate startDate, LocalDate endDate) {
        List<ScheduleDTO> generatedSlots = availabilityService.generateSlotsFromAvailability(doctorId, startDate, endDate);
        
        for (ScheduleDTO slot : generatedSlots) {
            ScheduleEntity schedule = new ScheduleEntity();
            schedule.setDoctor(doctorRepository.findById(doctorId).orElseThrow());
            schedule.setStartTime(slot.getStartTime());
            schedule.setEndTime(slot.getEndTime());
            schedule.setAvailable(true);
            
            scheduleRepository.save(schedule);
        }
    }

    @Override
    @Transactional
    public void deleteMultipleSchedules(List<Long> scheduleIds) {
        if (scheduleIds == null || scheduleIds.isEmpty()) {
            return;
        }
        
        List<ScheduleEntity> schedulesToDelete = scheduleRepository.findAllById(scheduleIds);
        for (ScheduleEntity schedule : schedulesToDelete) {
            List<AppointmentEntity> appointments = appointmentRepository.findConflictingAppointments(
                schedule.getDoctor(), 
                schedule.getStartTime(), 
                schedule.getEndTime()
            );
            if (!appointments.isEmpty()) {
                throw new RuntimeException("Cannot delete schedule with ID " + schedule.getId() + 
                    " because it has existing appointments. Please cancel the appointments first.");
            }
        }
        
        scheduleRepository.deleteAllById(scheduleIds);
    }

    private boolean isTimeOverlapping(LocalDateTime start1, LocalDateTime end1, LocalDateTime start2, LocalDateTime end2) {
        return start1.isBefore(end2) && start2.isBefore(end1);
    }
}