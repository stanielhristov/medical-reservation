package com.reservation.medical_reservation.service.Impl;

import com.reservation.medical_reservation.model.dto.DoctorAvailabilityDTO;
import com.reservation.medical_reservation.model.dto.ScheduleDTO;
import com.reservation.medical_reservation.model.entity.DoctorAvailabilityEntity;
import com.reservation.medical_reservation.model.entity.DoctorEntity;
import com.reservation.medical_reservation.model.entity.ScheduleEntity;
import com.reservation.medical_reservation.repository.DoctorAvailabilityRepository;
import com.reservation.medical_reservation.repository.DoctorRepository;
import com.reservation.medical_reservation.repository.ScheduleRepository;
import com.reservation.medical_reservation.service.DoctorAvailabilityService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class DoctorAvailabilityServiceImpl implements DoctorAvailabilityService {
    
    private final DoctorAvailabilityRepository availabilityRepository;
    private final DoctorRepository doctorRepository;
    private final ScheduleRepository scheduleRepository;
    private final ModelMapper modelMapper;
    
    public DoctorAvailabilityServiceImpl(DoctorAvailabilityRepository availabilityRepository,
                                       DoctorRepository doctorRepository,
                                       ScheduleRepository scheduleRepository,
                                       ModelMapper modelMapper) {
        this.availabilityRepository = availabilityRepository;
        this.doctorRepository = doctorRepository;
        this.scheduleRepository = scheduleRepository;
        this.modelMapper = modelMapper;
    }
    
    @Override
    @Transactional
    public DoctorAvailabilityDTO setDoctorAvailability(DoctorAvailabilityDTO availabilityDTO) {
        DoctorEntity doctor = doctorRepository.findById(availabilityDTO.getDoctorId())
                .orElseThrow(() -> new IllegalArgumentException("Doctor not found"));

        var existingAvailability = availabilityRepository.findByDoctorAndDayOfWeek(
                doctor, availabilityDTO.getDayOfWeek());

        DoctorAvailabilityEntity availability = getDoctorAvailabilityEntity(availabilityDTO, existingAvailability, doctor);

        DoctorAvailabilityEntity saved = availabilityRepository.save(availability);
        
        DoctorAvailabilityDTO result = modelMapper.map(saved, DoctorAvailabilityDTO.class);
        result.setDoctorId(doctor.getId());
        result.setDoctorName(doctor.getUser().getFullName());
        
        return result;
    }

    private static DoctorAvailabilityEntity getDoctorAvailabilityEntity(DoctorAvailabilityDTO availabilityDTO, Optional<DoctorAvailabilityEntity> existingAvailability, DoctorEntity doctor) {
        DoctorAvailabilityEntity availability;
        if (existingAvailability.isPresent()) {
            availability = existingAvailability.get();
            availability.setStartTime(availabilityDTO.getStartTime());
            availability.setEndTime(availabilityDTO.getEndTime());
            availability.setSlotDuration(availabilityDTO.getSlotDuration());
        } else {
            availability = new DoctorAvailabilityEntity();
            availability.setDoctor(doctor);
            availability.setDayOfWeek(availabilityDTO.getDayOfWeek());
            availability.setStartTime(availabilityDTO.getStartTime());
            availability.setEndTime(availabilityDTO.getEndTime());
            availability.setSlotDuration(availabilityDTO.getSlotDuration());
        }
        return availability;
    }

    @Override
    public List<DoctorAvailabilityDTO> getDoctorAvailability(Long doctorId) {
        DoctorEntity doctor = doctorRepository.findById(doctorId)
                .orElseThrow(() -> new IllegalArgumentException("Doctor not found"));
        
        return availabilityRepository.findByDoctorOrderByDayOfWeek(doctor)
                .stream()
                .map(availability -> {
                    DoctorAvailabilityDTO dto = modelMapper.map(availability, DoctorAvailabilityDTO.class);
                    dto.setDoctorId(doctor.getId());
                    dto.setDoctorName(doctor.getUser().getFullName());
                    return dto;
                })
                .toList();
    }
    
    @Override
    public DoctorAvailabilityDTO getDoctorAvailabilityForDay(Long doctorId, DayOfWeek dayOfWeek) {
        DoctorEntity doctor = doctorRepository.findById(doctorId)
                .orElseThrow(() -> new IllegalArgumentException("Doctor not found"));
        
        return availabilityRepository.findByDoctorAndDayOfWeek(doctor, dayOfWeek)
                .map(availability -> {
                    DoctorAvailabilityDTO dto = modelMapper.map(availability, DoctorAvailabilityDTO.class);
                    dto.setDoctorId(doctor.getId());
                    dto.setDoctorName(doctor.getUser().getFullName());
                    return dto;
                })
                .orElse(null);
    }
    
    @Override
    @Transactional
    public DoctorAvailabilityDTO updateDoctorAvailability(Long availabilityId, DoctorAvailabilityDTO availabilityDTO) {
        DoctorAvailabilityEntity availability = availabilityRepository.findById(availabilityId)
                .orElseThrow(() -> new IllegalArgumentException("Availability not found"));
        
        availability.setDayOfWeek(availabilityDTO.getDayOfWeek());
        availability.setStartTime(availabilityDTO.getStartTime());
        availability.setEndTime(availabilityDTO.getEndTime());
        availability.setSlotDuration(availabilityDTO.getSlotDuration());
        
        DoctorAvailabilityEntity updated = availabilityRepository.save(availability);
        
        DoctorAvailabilityDTO result = modelMapper.map(updated, DoctorAvailabilityDTO.class);
        result.setDoctorId(availability.getDoctor().getId());
        result.setDoctorName(availability.getDoctor().getUser().getFullName());
        
        return result;
    }
    
    @Override
    @Transactional
    public void deleteDoctorAvailability(Long availabilityId) {
        if (!availabilityRepository.existsById(availabilityId)) {
            throw new IllegalArgumentException("Availability not found");
        }
        availabilityRepository.deleteById(availabilityId);
    }
    
    @Override
    @Transactional
    public void deleteDoctorAvailabilityForDay(Long doctorId, DayOfWeek dayOfWeek) {
        DoctorEntity doctor = doctorRepository.findById(doctorId)
                .orElseThrow(() -> new IllegalArgumentException("Doctor not found"));
        
        availabilityRepository.deleteByDoctorAndDayOfWeek(doctor, dayOfWeek);
    }
    
    @Override
    public List<ScheduleDTO> generateSlotsFromAvailability(Long doctorId, LocalDate startDate, LocalDate endDate) {
        DoctorEntity doctor = doctorRepository.findById(doctorId)
                .orElseThrow(() -> new IllegalArgumentException("Doctor not found"));
        
        List<DoctorAvailabilityEntity> availabilities = availabilityRepository.findByDoctorOrderByDayOfWeek(doctor);
        List<ScheduleDTO> generatedSlots = new ArrayList<>();
        
        LocalDate currentDate = startDate;
        while (!currentDate.isAfter(endDate)) {
            DayOfWeek dayOfWeek = currentDate.getDayOfWeek();

            LocalDate finalCurrentDate = currentDate;
            availabilities.stream()
                    .filter(availability -> availability.getDayOfWeek().equals(dayOfWeek))
                    .findFirst()
                    .ifPresent(availability -> {
                        List<ScheduleDTO> daySlots = generateSlotsForDay(doctor, availability, finalCurrentDate);
                        generatedSlots.addAll(daySlots);
                    });
            
            currentDate = currentDate.plusDays(1);
        }
        
        return generatedSlots;
    }
    
    private List<ScheduleDTO> generateSlotsForDay(DoctorEntity doctor, DoctorAvailabilityEntity availability, LocalDate date) {
        List<ScheduleDTO> slots = new ArrayList<>();
        
        LocalTime currentTime = availability.getStartTime();
        LocalTime endTime = availability.getEndTime();
        int slotDuration = availability.getSlotDuration();
        
        while (currentTime.isBefore(endTime)) {
            LocalTime slotEndTime = currentTime.plusMinutes(slotDuration);

            if (slotEndTime.isAfter(endTime)) {
                break;
            }
            
            LocalDateTime slotStart = LocalDateTime.of(date, currentTime);
            LocalDateTime slotEnd = LocalDateTime.of(date, slotEndTime);

            boolean slotExists = scheduleRepository.findByDoctorAndDateRange(doctor, slotStart, slotEnd)
                    .stream()
                    .anyMatch(schedule -> 
                        schedule.getStartTime().equals(slotStart) && 
                        schedule.getEndTime().equals(slotEnd));
            
            if (!slotExists) {
                ScheduleDTO slot = new ScheduleDTO();
                slot.setDoctorId(doctor.getId());
                slot.setDoctorName(doctor.getUser().getFullName());
                slot.setStartTime(slotStart);
                slot.setEndTime(slotEnd);
                slot.setAvailable(true);
                
                slots.add(slot);
            }
            
            currentTime = slotEndTime;
        }
        
        return slots;
    }
}
