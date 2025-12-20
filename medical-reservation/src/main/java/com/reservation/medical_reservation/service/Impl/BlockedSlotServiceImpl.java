package com.reservation.medical_reservation.service.Impl;

import com.reservation.medical_reservation.model.dto.BlockedSlotDTO;
import com.reservation.medical_reservation.model.entity.BlockedSlotEntity;
import com.reservation.medical_reservation.model.entity.DoctorEntity;
import com.reservation.medical_reservation.repository.BlockedSlotRepository;
import com.reservation.medical_reservation.repository.DoctorRepository;
import com.reservation.medical_reservation.service.BlockedSlotService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class BlockedSlotServiceImpl implements BlockedSlotService {
    
    private final BlockedSlotRepository blockedSlotRepository;
    private final DoctorRepository doctorRepository;
    private final ModelMapper modelMapper;
    
    public BlockedSlotServiceImpl(BlockedSlotRepository blockedSlotRepository,
                                DoctorRepository doctorRepository,
                                ModelMapper modelMapper) {
        this.blockedSlotRepository = blockedSlotRepository;
        this.doctorRepository = doctorRepository;
        this.modelMapper = modelMapper;
    }
    
    @Override
    @Transactional
    public BlockedSlotDTO createBlockedSlot(BlockedSlotDTO blockedSlotDTO) {
        DoctorEntity doctor = doctorRepository.findById(blockedSlotDTO.getDoctorId())
                .orElseThrow(() -> new IllegalArgumentException("Doctor not found"));

        if (!blockedSlotDTO.getStartTime().isBefore(blockedSlotDTO.getEndTime())) {
            throw new IllegalArgumentException("Start time must be before end time");
        }
        
        BlockedSlotEntity blockedSlot = new BlockedSlotEntity();
        blockedSlot.setDoctor(doctor);
        blockedSlot.setStartTime(blockedSlotDTO.getStartTime());
        blockedSlot.setEndTime(blockedSlotDTO.getEndTime());
        blockedSlot.setReason(blockedSlotDTO.getReason());
        
        BlockedSlotEntity saved = blockedSlotRepository.save(blockedSlot);
        
        BlockedSlotDTO result = modelMapper.map(saved, BlockedSlotDTO.class);
        result.setDoctorId(doctor.getId());
        result.setDoctorName(doctor.getUser().getFullName());
        
        return result;
    }
    
    @Override
    public List<BlockedSlotDTO> getDoctorBlockedSlots(Long doctorId) {
        DoctorEntity doctor = doctorRepository.findById(doctorId)
                .orElseThrow(() -> new IllegalArgumentException("Doctor not found"));
        
        return blockedSlotRepository.findByDoctorOrderByStartTime(doctor)
                .stream()
                .map(blockedSlot -> {
                    BlockedSlotDTO dto = modelMapper.map(blockedSlot, BlockedSlotDTO.class);
                    dto.setDoctorId(doctor.getId());
                    dto.setDoctorName(doctor.getUser().getFullName());
                    return dto;
                })
                .toList();
    }
    
    @Override
    public List<BlockedSlotDTO> getDoctorBlockedSlotsInRange(Long doctorId, LocalDateTime startTime, LocalDateTime endTime) {
        DoctorEntity doctor = doctorRepository.findById(doctorId)
                .orElseThrow(() -> new IllegalArgumentException("Doctor not found"));
        
        return blockedSlotRepository.findByDoctorAndDateRange(doctor, startTime, endTime)
                .stream()
                .map(blockedSlot -> {
                    BlockedSlotDTO dto = modelMapper.map(blockedSlot, BlockedSlotDTO.class);
                    dto.setDoctorId(doctor.getId());
                    dto.setDoctorName(doctor.getUser().getFullName());
                    return dto;
                })
                .toList();
    }
    
    @Override
    @Transactional
    public BlockedSlotDTO updateBlockedSlot(Long blockedSlotId, BlockedSlotDTO blockedSlotDTO) {
        BlockedSlotEntity blockedSlot = blockedSlotRepository.findById(blockedSlotId)
                .orElseThrow(() -> new IllegalArgumentException("Blocked slot not found"));

        if (!blockedSlotDTO.getStartTime().isBefore(blockedSlotDTO.getEndTime())) {
            throw new IllegalArgumentException("Start time must be before end time");
        }
        
        blockedSlot.setStartTime(blockedSlotDTO.getStartTime());
        blockedSlot.setEndTime(blockedSlotDTO.getEndTime());
        blockedSlot.setReason(blockedSlotDTO.getReason());
        
        BlockedSlotEntity updated = blockedSlotRepository.save(blockedSlot);
        
        BlockedSlotDTO result = modelMapper.map(updated, BlockedSlotDTO.class);
        result.setDoctorId(blockedSlot.getDoctor().getId());
        result.setDoctorName(blockedSlot.getDoctor().getUser().getFullName());
        
        return result;
    }
    
    @Override
    @Transactional
    public void deleteBlockedSlot(Long blockedSlotId) {
        if (!blockedSlotRepository.existsById(blockedSlotId)) {
            throw new IllegalArgumentException("Blocked slot not found");
        }
        blockedSlotRepository.deleteById(blockedSlotId);
    }
    
    @Override
    public boolean isSlotBlocked(Long doctorId, LocalDateTime startTime, LocalDateTime endTime) {
        DoctorEntity doctor = doctorRepository.findById(doctorId)
                .orElseThrow(() -> new IllegalArgumentException("Doctor not found"));
        
        List<BlockedSlotEntity> blockedSlots = blockedSlotRepository.findByDoctorAndDateRange(doctor, startTime, endTime);
        
        return !blockedSlots.isEmpty();
    }
}
