package com.reservation.medical_reservation.controller;

import com.reservation.medical_reservation.model.dto.RescheduleRequestDTO;
import com.reservation.medical_reservation.model.enums.RescheduleRequestStatus;
import com.reservation.medical_reservation.service.RescheduleRequestService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/reschedule-requests")
public class RescheduleRequestController {
    
    private final RescheduleRequestService rescheduleRequestService;
    
    public RescheduleRequestController(RescheduleRequestService rescheduleRequestService) {
        this.rescheduleRequestService = rescheduleRequestService;
    }
    
    @PostMapping
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<RescheduleRequestDTO> createRescheduleRequest(
            @RequestParam Long appointmentId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime requestedDateTime,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime requestedEndTime,
            @RequestParam(required = false) String patientReason) {
        
        RescheduleRequestDTO created = rescheduleRequestService.createRescheduleRequest(
                appointmentId, requestedDateTime, requestedEndTime, patientReason);
        return ResponseEntity.ok(created);
    }
    
    @GetMapping("/patient/{patientId}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<List<RescheduleRequestDTO>> getPatientRescheduleRequests(@PathVariable Long patientId) {
        List<RescheduleRequestDTO> requests = rescheduleRequestService.getPatientRescheduleRequests(patientId);
        return ResponseEntity.ok(requests);
    }
    
    @GetMapping("/doctor/{doctorId}")
    @PreAuthorize("hasRole('DOCTOR') or hasRole('ADMIN')")
    public ResponseEntity<List<RescheduleRequestDTO>> getDoctorRescheduleRequests(@PathVariable Long doctorId) {
        List<RescheduleRequestDTO> requests = rescheduleRequestService.getDoctorRescheduleRequests(doctorId);
        return ResponseEntity.ok(requests);
    }
    
    @GetMapping("/doctor/{doctorId}/pending")
    @PreAuthorize("hasRole('DOCTOR') or hasRole('ADMIN')")
    public ResponseEntity<List<RescheduleRequestDTO>> getPendingRescheduleRequestsForDoctor(@PathVariable Long doctorId) {
        List<RescheduleRequestDTO> requests = rescheduleRequestService.getPendingRescheduleRequestsForDoctor(doctorId);
        return ResponseEntity.ok(requests);
    }
    
    @PatchMapping("/{requestId}/respond")
    @PreAuthorize("hasRole('DOCTOR') or hasRole('ADMIN')")
    public ResponseEntity<RescheduleRequestDTO> respondToRescheduleRequest(
            @PathVariable Long requestId,
            @RequestParam RescheduleRequestStatus status,
            @RequestParam(required = false) String doctorResponse) {
        
        RescheduleRequestDTO updated = rescheduleRequestService.respondToRescheduleRequest(requestId, status, doctorResponse);
        return ResponseEntity.ok(updated);
    }
    
    @GetMapping("/{requestId}")
    @PreAuthorize("hasRole('USER') or hasRole('DOCTOR') or hasRole('ADMIN')")
    public ResponseEntity<RescheduleRequestDTO> getRescheduleRequestById(@PathVariable Long requestId) {
        RescheduleRequestDTO request = rescheduleRequestService.getRescheduleRequestById(requestId);
        return ResponseEntity.ok(request);
    }
    
    @DeleteMapping("/{requestId}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<Void> cancelRescheduleRequest(@PathVariable Long requestId) {
        rescheduleRequestService.cancelRescheduleRequest(requestId);
        return ResponseEntity.noContent().build();
    }
    
    @GetMapping("/doctor/{doctorId}/pending/count")
    @PreAuthorize("hasRole('DOCTOR') or hasRole('ADMIN')")
    public ResponseEntity<Long> countPendingRequestsForDoctor(@PathVariable Long doctorId) {
        long count = rescheduleRequestService.countPendingRequestsForDoctor(doctorId);
        return ResponseEntity.ok(count);
    }
}
