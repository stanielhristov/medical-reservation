package com.reservation.medical_reservation.service.Impl;

import com.reservation.medical_reservation.model.dto.ScheduleDTO;
import com.reservation.medical_reservation.model.entity.DoctorEntity;
import com.reservation.medical_reservation.model.entity.ScheduleEntity;
import com.reservation.medical_reservation.repository.DoctorRepository;
import com.reservation.medical_reservation.repository.ScheduleRepository;
import com.reservation.medical_reservation.service.ScheduleService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ScheduleServiceImpl implements ScheduleService {

    private final ScheduleRepository scheduleRepository;
    private final DoctorRepository doctorRepository;
    private final ModelMapper modelMapper;

    public ScheduleServiceImpl(ScheduleRepository scheduleRepository, 
                             DoctorRepository doctorRepository, 
                             ModelMapper modelMapper) {
        this.scheduleRepository = scheduleRepository;
        this.doctorRepository = doctorRepository;
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
}