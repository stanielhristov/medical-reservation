package com.reservation.medical_reservation.controller;

import com.reservation.medical_reservation.model.dto.BlockedSlotDTO;
import com.reservation.medical_reservation.service.BlockedSlotService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/blocked-slots")
public class BlockedSlotController {
    
    private final BlockedSlotService blockedSlotService;
    
    public BlockedSlotController(BlockedSlotService blockedSlotService) {
        this.blockedSlotService = blockedSlotService;
    }
    
    @PostMapping
    @PreAuthorize("hasRole('DOCTOR') or hasRole('ADMIN')")
    public ResponseEntity<BlockedSlotDTO> createBlockedSlot(@Valid @RequestBody BlockedSlotDTO blockedSlotDTO) {
        BlockedSlotDTO created = blockedSlotService.createBlockedSlot(blockedSlotDTO);
        return ResponseEntity.ok(created);
    }
    
    @GetMapping("/doctor/{doctorId}")
    public ResponseEntity<List<BlockedSlotDTO>> getDoctorBlockedSlots(@PathVariable Long doctorId) {
        List<BlockedSlotDTO> blockedSlots = blockedSlotService.getDoctorBlockedSlots(doctorId);
        return ResponseEntity.ok(blockedSlots);
    }
    
    @GetMapping("/doctor/{doctorId}/range")
    public ResponseEntity<List<BlockedSlotDTO>> getDoctorBlockedSlotsInRange(
            @PathVariable Long doctorId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startTime,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endTime) {
        List<BlockedSlotDTO> blockedSlots = blockedSlotService.getDoctorBlockedSlotsInRange(doctorId, startTime, endTime);
        return ResponseEntity.ok(blockedSlots);
    }
    
    @PutMapping("/{blockedSlotId}")
    @PreAuthorize("hasRole('DOCTOR') or hasRole('ADMIN')")
    public ResponseEntity<BlockedSlotDTO> updateBlockedSlot(
            @PathVariable Long blockedSlotId,
            @Valid @RequestBody BlockedSlotDTO blockedSlotDTO) {
        BlockedSlotDTO updated = blockedSlotService.updateBlockedSlot(blockedSlotId, blockedSlotDTO);
        return ResponseEntity.ok(updated);
    }
    
    @DeleteMapping("/{blockedSlotId}")
    @PreAuthorize("hasRole('DOCTOR') or hasRole('ADMIN')")
    public ResponseEntity<Void> deleteBlockedSlot(@PathVariable Long blockedSlotId) {
        blockedSlotService.deleteBlockedSlot(blockedSlotId);
        return ResponseEntity.noContent().build();
    }
    
    @GetMapping("/doctor/{doctorId}/check-blocked")
    public ResponseEntity<Boolean> isSlotBlocked(
            @PathVariable Long doctorId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startTime,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endTime) {
        boolean isBlocked = blockedSlotService.isSlotBlocked(doctorId, startTime, endTime);
        return ResponseEntity.ok(isBlocked);
    }
}
