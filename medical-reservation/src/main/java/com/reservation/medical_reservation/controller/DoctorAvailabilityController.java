package com.reservation.medical_reservation.controller;

import com.reservation.medical_reservation.model.dto.DoctorAvailabilityDTO;
import com.reservation.medical_reservation.model.dto.ScheduleDTO;
import com.reservation.medical_reservation.service.DoctorAvailabilityService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/doctor-availability")
public class DoctorAvailabilityController {
    
    private final DoctorAvailabilityService availabilityService;
    
    public DoctorAvailabilityController(DoctorAvailabilityService availabilityService) {
        this.availabilityService = availabilityService;
    }
    
    @PostMapping
    @PreAuthorize("hasRole('DOCTOR') or hasRole('ADMIN')")
    public ResponseEntity<DoctorAvailabilityDTO> setDoctorAvailability(@Valid @RequestBody DoctorAvailabilityDTO availabilityDTO) {
        DoctorAvailabilityDTO created = availabilityService.setDoctorAvailability(availabilityDTO);
        return ResponseEntity.ok(created);
    }
    
    @GetMapping("/doctor/{doctorId}")
    public ResponseEntity<List<DoctorAvailabilityDTO>> getDoctorAvailability(@PathVariable Long doctorId) {
        List<DoctorAvailabilityDTO> availability = availabilityService.getDoctorAvailability(doctorId);
        return ResponseEntity.ok(availability);
    }
    
    @GetMapping("/doctor/{doctorId}/day/{dayOfWeek}")
    public ResponseEntity<DoctorAvailabilityDTO> getDoctorAvailabilityForDay(
            @PathVariable Long doctorId,
            @PathVariable DayOfWeek dayOfWeek) {
        DoctorAvailabilityDTO availability = availabilityService.getDoctorAvailabilityForDay(doctorId, dayOfWeek);
        if (availability != null) {
            return ResponseEntity.ok(availability);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    @PutMapping("/{availabilityId}")
    @PreAuthorize("hasRole('DOCTOR') or hasRole('ADMIN')")
    public ResponseEntity<DoctorAvailabilityDTO> updateDoctorAvailability(
            @PathVariable Long availabilityId,
            @Valid @RequestBody DoctorAvailabilityDTO availabilityDTO) {
        DoctorAvailabilityDTO updated = availabilityService.updateDoctorAvailability(availabilityId, availabilityDTO);
        return ResponseEntity.ok(updated);
    }
    
    @DeleteMapping("/{availabilityId}")
    @PreAuthorize("hasRole('DOCTOR') or hasRole('ADMIN')")
    public ResponseEntity<Void> deleteDoctorAvailability(@PathVariable Long availabilityId) {
        availabilityService.deleteDoctorAvailability(availabilityId);
        return ResponseEntity.noContent().build();
    }
    
    @DeleteMapping("/doctor/{doctorId}/day/{dayOfWeek}")
    @PreAuthorize("hasRole('DOCTOR') or hasRole('ADMIN')")
    public ResponseEntity<Void> deleteDoctorAvailabilityForDay(
            @PathVariable Long doctorId,
            @PathVariable DayOfWeek dayOfWeek) {
        availabilityService.deleteDoctorAvailabilityForDay(doctorId, dayOfWeek);
        return ResponseEntity.noContent().build();
    }
    
    @PostMapping("/doctor/{doctorId}/generate-slots")
    @PreAuthorize("hasRole('DOCTOR') or hasRole('ADMIN')")
    public ResponseEntity<List<ScheduleDTO>> generateSlotsFromAvailability(
            @PathVariable Long doctorId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
        List<ScheduleDTO> generatedSlots = availabilityService.generateSlotsFromAvailability(doctorId, startDate, endDate);
        return ResponseEntity.ok(generatedSlots);
    }
}
