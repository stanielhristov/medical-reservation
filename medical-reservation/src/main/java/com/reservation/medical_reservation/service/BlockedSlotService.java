package com.reservation.medical_reservation.service;

import com.reservation.medical_reservation.model.dto.BlockedSlotDTO;

import java.time.LocalDateTime;
import java.util.List;

public interface BlockedSlotService {
    BlockedSlotDTO createBlockedSlot(BlockedSlotDTO blockedSlotDTO);
    
    List<BlockedSlotDTO> getDoctorBlockedSlots(Long doctorId);
    
    List<BlockedSlotDTO> getDoctorBlockedSlotsInRange(Long doctorId, LocalDateTime startTime, LocalDateTime endTime);
    
    BlockedSlotDTO updateBlockedSlot(Long blockedSlotId, BlockedSlotDTO blockedSlotDTO);
    
    void deleteBlockedSlot(Long blockedSlotId);
    
    boolean isSlotBlocked(Long doctorId, LocalDateTime startTime, LocalDateTime endTime);
}
