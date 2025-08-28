package com.reservation.medical_reservation.controller;

import com.reservation.medical_reservation.model.dto.DoctorDTO;
import com.reservation.medical_reservation.model.dto.AppointmentDTO;
import com.reservation.medical_reservation.model.dto.UserDTO;
import com.reservation.medical_reservation.model.dto.MedicalHistoryDTO;
import com.reservation.medical_reservation.model.enums.AppointmentStatus;
import com.reservation.medical_reservation.service.DoctorService;
import com.reservation.medical_reservation.service.AppointmentService;
import com.reservation.medical_reservation.service.MedicalHistoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;
import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/api/doctors")
public class DoctorController {

    private final DoctorService doctorService;
    private final AppointmentService appointmentService;
    private final MedicalHistoryService medicalHistoryService;

    public DoctorController(DoctorService doctorService, AppointmentService appointmentService, MedicalHistoryService medicalHistoryService) {
        this.doctorService = doctorService;
        this.appointmentService = appointmentService;
        this.medicalHistoryService = medicalHistoryService;
    }

    @GetMapping
    public ResponseEntity<List<DoctorDTO>> getAllDoctors() {
        List<DoctorDTO> doctors = doctorService.getActiveDoctors();
        return ResponseEntity.ok(doctors != null ? doctors : List.of());
    }

    @GetMapping("/all")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<DoctorDTO>> getAllDoctorsForAdmin() {
        List<DoctorDTO> doctors = doctorService.getAllDoctors();
        return ResponseEntity.ok(doctors != null ? doctors : List.of());
    }

    @GetMapping("/{id}")
    public ResponseEntity<DoctorDTO> getDoctorById(@PathVariable Long id) {
        DoctorDTO doctor = doctorService.getDoctorById(id);
        return ResponseEntity.ok(doctor);
    }

    @GetMapping("/user/{userId}")
    @PreAuthorize("hasRole('DOCTOR') or hasRole('ADMIN')")
    public ResponseEntity<DoctorDTO> getDoctorByUserId(@PathVariable Long userId) {
        DoctorDTO doctor = doctorService.getDoctorByUserId(userId);
        return ResponseEntity.ok(doctor);
    }

    @GetMapping("/specialization/{specialization}")
    public ResponseEntity<List<DoctorDTO>> getDoctorsBySpecialization(@PathVariable String specialization) {
        if (specialization == null || specialization.trim().isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        List<DoctorDTO> doctors = doctorService.getDoctorsBySpecialization(specialization);
        return ResponseEntity.ok(doctors != null ? doctors : List.of());
    }

    @GetMapping("/specializations")
    public ResponseEntity<List<String>> getAvailableSpecializations() {
        List<String> specializations = doctorService.getAvailableSpecializations();
        return ResponseEntity.ok(specializations != null ? specializations : List.of());
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('DOCTOR') or hasRole('ADMIN')")
    public ResponseEntity<DoctorDTO> updateDoctor(
            @PathVariable Long id,
            @Valid @RequestBody DoctorDTO doctorDTO) {
        DoctorDTO updated = doctorService.updateDoctor(id, doctorDTO);
        return ResponseEntity.ok(updated);
    }

    @PatchMapping("/{id}/activate")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> activateDoctor(@PathVariable Long id) {
        doctorService.activateDoctor(id);
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/{id}/deactivate")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deactivateDoctor(@PathVariable Long id) {
        doctorService.deactivateDoctor(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/search")
    public ResponseEntity<List<DoctorDTO>> searchDoctors(
            @RequestParam(required = false) String searchTerm,
            @RequestParam(required = false) String specialization) {
        try {
            List<DoctorDTO> doctors;
            
            if (specialization != null && !specialization.trim().isEmpty()) {
                doctors = doctorService.searchDoctorsWithSpecialization(searchTerm, specialization);
            } else {
                doctors = doctorService.searchDoctors(searchTerm);
            }
            
            return ResponseEntity.ok(doctors != null ? doctors : List.of());
        } catch (Exception e) {
            System.err.println("Error searching doctors: " + e.getMessage());
            return ResponseEntity.ok(List.of()); // Return empty list on error
        }
    }

    @GetMapping("/{doctorId}/dashboard")
    @PreAuthorize("hasRole('DOCTOR') or hasRole('ADMIN')")
    public ResponseEntity<Map<String, Object>> getDoctorDashboard(@PathVariable Long doctorId) {
        Map<String, Object> dashboard = new HashMap<>();
        
        // Today's appointments
        List<AppointmentDTO> todayAppointments = appointmentService.getDoctorAppointmentsForToday(doctorId);
        dashboard.put("todayAppointments", todayAppointments);
        
        // Upcoming appointments
        List<AppointmentDTO> upcomingAppointments = appointmentService.getUpcomingAppointmentsByDoctor(doctorId);
        dashboard.put("upcomingAppointments", upcomingAppointments);
        
        // Statistics
        Map<String, Object> stats = new HashMap<>();
        stats.put("todayAppointmentsCount", todayAppointments.size());
        stats.put("upcomingPatientsCount", upcomingAppointments.size());
        stats.put("confirmedAppointments", appointmentService.countDoctorAppointmentsByStatus(doctorId, AppointmentStatus.CONFIRMED));
        stats.put("pendingAppointments", appointmentService.countDoctorAppointmentsByStatus(doctorId, AppointmentStatus.PENDING));
        
        dashboard.put("statistics", stats);
        
        return ResponseEntity.ok(dashboard);
    }

    @GetMapping("/{doctorId}/patients")
    @PreAuthorize("hasRole('DOCTOR') or hasRole('ADMIN')")
    public ResponseEntity<List<UserDTO>> getDoctorPatients(@PathVariable Long doctorId) {
        List<UserDTO> patients = doctorService.getDoctorPatients(doctorId);
        return ResponseEntity.ok(patients);
    }

    @GetMapping("/{doctorId}/patients/{patientId}/medical-history")
    @PreAuthorize("hasRole('DOCTOR') or hasRole('ADMIN')")
    public ResponseEntity<List<MedicalHistoryDTO>> getPatientMedicalHistory(
            @PathVariable Long doctorId, 
            @PathVariable Long patientId) {
        // Get patient medical history records created by this doctor
        List<MedicalHistoryDTO> medicalHistory = medicalHistoryService.getPatientMedicalHistory(patientId);
        return ResponseEntity.ok(medicalHistory);
    }

    @PostMapping("/{doctorId}/patients/{patientId}/medical-history")
    @PreAuthorize("hasRole('DOCTOR') or hasRole('ADMIN')")
    public ResponseEntity<MedicalHistoryDTO> createMedicalHistoryRecord(
            @PathVariable Long doctorId,
            @PathVariable Long patientId,
            @Valid @RequestBody MedicalHistoryDTO medicalHistoryDTO) {
        medicalHistoryDTO.setDoctorId(doctorId);
        medicalHistoryDTO.setPatientId(patientId);
        MedicalHistoryDTO created = medicalHistoryService.createMedicalHistory(medicalHistoryDTO);
        return ResponseEntity.ok(created);
    }
}
