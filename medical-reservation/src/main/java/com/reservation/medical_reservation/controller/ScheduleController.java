package com.reservation.medical_reservation.controller;

import com.reservation.medical_reservation.model.dto.ScheduleDTO;
import com.reservation.medical_reservation.model.dto.BulkDeleteRequest;
import com.reservation.medical_reservation.service.ScheduleService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/schedules")
public class ScheduleController {

    private final ScheduleService scheduleService;

    public ScheduleController(ScheduleService scheduleService) {
        this.scheduleService = scheduleService;
    }

    @PostMapping
    @PreAuthorize("hasRole('DOCTOR') or hasRole('ADMIN')")
    public ResponseEntity<ScheduleDTO> createSchedule(@Valid @RequestBody ScheduleDTO scheduleDTO) {
        ScheduleDTO created = scheduleService.createSchedule(scheduleDTO);
        return ResponseEntity.ok(created);
    }

    @GetMapping("/doctor/{doctorId}")
    public ResponseEntity<List<ScheduleDTO>> getDoctorSchedule(@PathVariable Long doctorId) {
        List<ScheduleDTO> schedules = scheduleService.getDoctorSchedule(doctorId);
        return ResponseEntity.ok(schedules);
    }

    @GetMapping("/available/{doctorId}")
    public ResponseEntity<List<ScheduleDTO>> getAvailableSlots(
            @PathVariable Long doctorId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate) {
        List<ScheduleDTO> availableSlots = scheduleService.getAvailableSlots(doctorId, startDate, endDate);
        return ResponseEntity.ok(availableSlots);
    }

    @PutMapping("/{scheduleId}")
    @PreAuthorize("hasRole('DOCTOR') or hasRole('ADMIN')")
    public ResponseEntity<ScheduleDTO> updateSchedule(
            @PathVariable Long scheduleId,
            @Valid @RequestBody ScheduleDTO scheduleDTO) {
        ScheduleDTO updated = scheduleService.updateSchedule(scheduleId, scheduleDTO);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{scheduleId}")
    @PreAuthorize("hasRole('DOCTOR') or hasRole('ADMIN')")
    public ResponseEntity<Void> deleteSchedule(@PathVariable Long scheduleId) {
        scheduleService.deleteSchedule(scheduleId);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{scheduleId}/unavailable")
    @PreAuthorize("hasRole('DOCTOR') or hasRole('ADMIN')")
    public ResponseEntity<Void> markSlotUnavailable(@PathVariable Long scheduleId) {
        scheduleService.markSlotUnavailable(scheduleId);
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/{scheduleId}/available")
    @PreAuthorize("hasRole('DOCTOR') or hasRole('ADMIN')")
    public ResponseEntity<Void> markSlotAvailable(@PathVariable Long scheduleId) {
        scheduleService.markSlotAvailable(scheduleId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/doctor/{doctorId}/with-status")
    public ResponseEntity<List<ScheduleDTO>> getDoctorScheduleWithStatus(
            @PathVariable Long doctorId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate) {
        List<ScheduleDTO> schedules = scheduleService.getDoctorScheduleWithStatus(doctorId, startDate, endDate);
        return ResponseEntity.ok(schedules);
    }

    @GetMapping("/doctor/{doctorId}/with-status-for-doctor")
    @PreAuthorize("hasRole('DOCTOR') or hasRole('ADMIN')")
    public ResponseEntity<List<ScheduleDTO>> getDoctorScheduleWithStatusForDoctor(
            @PathVariable Long doctorId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate) {
        List<ScheduleDTO> schedules = scheduleService.getDoctorScheduleWithStatusForDoctor(doctorId, startDate, endDate);
        return ResponseEntity.ok(schedules);
    }

    @PostMapping("/doctor/{doctorId}/generate-from-availability")
    @PreAuthorize("hasRole('DOCTOR') or hasRole('ADMIN')")
    public ResponseEntity<Void> generateScheduleFromAvailability(
            @PathVariable Long doctorId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
        scheduleService.generateScheduleFromAvailability(doctorId, startDate, endDate);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/delete-multiple")
    @PreAuthorize("hasRole('DOCTOR') or hasRole('ADMIN')")
    public ResponseEntity<Void> deleteMultipleSchedules(@Valid @RequestBody BulkDeleteRequest request) {
        scheduleService.deleteMultipleSchedules(request.getScheduleIds());
        return ResponseEntity.ok().build();
    }

}
