package com.reservation.medical_reservation.service;

import com.reservation.medical_reservation.model.dto.ScheduleDTO;

import java.time.LocalDateTime;
import java.util.List;

public interface ScheduleService {
    ScheduleDTO createSchedule(ScheduleDTO scheduleDTO);
    List<ScheduleDTO> getDoctorSchedule(Long doctorId);
    List<ScheduleDTO> getAvailableSlots(Long doctorId, LocalDateTime startDate, LocalDateTime endDate);
    ScheduleDTO updateSchedule(Long scheduleId, ScheduleDTO scheduleDTO);
    void deleteSchedule(Long scheduleId);
    void markSlotUnavailable(Long scheduleId);
    void markSlotAvailable(Long scheduleId);
}
