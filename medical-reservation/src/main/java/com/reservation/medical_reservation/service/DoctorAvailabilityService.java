package com.reservation.medical_reservation.service;

import com.reservation.medical_reservation.model.dto.DoctorAvailabilityDTO;
import com.reservation.medical_reservation.model.dto.ScheduleDTO;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.List;

public interface DoctorAvailabilityService {
    DoctorAvailabilityDTO setDoctorAvailability(DoctorAvailabilityDTO availabilityDTO);
    
    List<DoctorAvailabilityDTO> getDoctorAvailability(Long doctorId);
    
    DoctorAvailabilityDTO getDoctorAvailabilityForDay(Long doctorId, DayOfWeek dayOfWeek);
    
    DoctorAvailabilityDTO updateDoctorAvailability(Long availabilityId, DoctorAvailabilityDTO availabilityDTO);
    
    void deleteDoctorAvailability(Long availabilityId);
    
    void deleteDoctorAvailabilityForDay(Long doctorId, DayOfWeek dayOfWeek);
    
    List<ScheduleDTO> generateSlotsFromAvailability(Long doctorId, LocalDate startDate, LocalDate endDate);
}
