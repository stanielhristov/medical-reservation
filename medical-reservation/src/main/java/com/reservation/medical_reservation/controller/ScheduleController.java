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

    @GetMapping("/test-endpoint")
    public ResponseEntity<String> testEndpoint() {
        System.out.println("Test endpoint called successfully!");
        return ResponseEntity.ok("Test endpoint working");
    }

    @GetMapping("/test-delete")
    public ResponseEntity<String> testDelete() {
        System.out.println("Test delete endpoint called!");
        return ResponseEntity.ok("Test delete endpoint working");
    }

    @PostMapping("/delete-multiple")
    // @PreAuthorize("hasRole('DOCTOR') or hasRole('ADMIN')") // Temporarily disabled for testing
    public ResponseEntity<Void> deleteMultipleSchedules(@RequestBody BulkDeleteRequest request) {
        try {
            System.out.println("Received bulk delete request for schedule IDs: " + request.getScheduleIds());
            scheduleService.deleteMultipleSchedules(request.getScheduleIds());
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            System.err.println("Error in bulk delete: " + e.getMessage());
            e.printStackTrace();
            throw e;
        }
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

    @PostMapping("/doctor/{doctorId}/generate-from-availability")
    @PreAuthorize("hasRole('DOCTOR') or hasRole('ADMIN')")
    public ResponseEntity<Void> generateScheduleFromAvailability(
            @PathVariable Long doctorId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
        scheduleService.generateScheduleFromAvailability(doctorId, startDate, endDate);
        return ResponseEntity.ok().build();
    }

}
