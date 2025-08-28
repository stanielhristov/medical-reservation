package com.reservation.medical_reservation.controller;

import com.reservation.medical_reservation.model.dto.MedicalHistoryDTO;
import com.reservation.medical_reservation.service.MedicalHistoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/medical-history")
public class MedicalHistoryController {

    private final MedicalHistoryService medicalHistoryService;

    public MedicalHistoryController(MedicalHistoryService medicalHistoryService) {
        this.medicalHistoryService = medicalHistoryService;
    }

    @PostMapping
    @PreAuthorize("hasRole('DOCTOR') or hasRole('ADMIN')")
    public ResponseEntity<MedicalHistoryDTO> createMedicalHistory(@Valid @RequestBody MedicalHistoryDTO medicalHistoryDTO) {
        MedicalHistoryDTO created = medicalHistoryService.createMedicalHistory(medicalHistoryDTO);
        return ResponseEntity.ok(created);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('DOCTOR') or hasRole('ADMIN')")
    public ResponseEntity<MedicalHistoryDTO> getMedicalHistoryById(@PathVariable Long id) {
        MedicalHistoryDTO medicalHistory = medicalHistoryService.getMedicalHistoryById(id);
        return ResponseEntity.ok(medicalHistory);
    }

    @GetMapping("/patient/{patientId}")
    @PreAuthorize("hasRole('USER') or hasRole('DOCTOR') or hasRole('ADMIN')")
    public ResponseEntity<List<MedicalHistoryDTO>> getPatientMedicalHistory(@PathVariable Long patientId) {
        List<MedicalHistoryDTO> medicalHistory = medicalHistoryService.getPatientMedicalHistory(patientId);
        return ResponseEntity.ok(medicalHistory);
    }

    @GetMapping("/doctor/{doctorId}")
    @PreAuthorize("hasRole('DOCTOR') or hasRole('ADMIN')")
    public ResponseEntity<List<MedicalHistoryDTO>> getDoctorMedicalRecords(@PathVariable Long doctorId) {
        List<MedicalHistoryDTO> medicalRecords = medicalHistoryService.getDoctorMedicalRecords(doctorId);
        return ResponseEntity.ok(medicalRecords);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('DOCTOR') or hasRole('ADMIN')")
    public ResponseEntity<MedicalHistoryDTO> updateMedicalHistory(
            @PathVariable Long id,
            @Valid @RequestBody MedicalHistoryDTO medicalHistoryDTO) {
        MedicalHistoryDTO updated = medicalHistoryService.updateMedicalHistory(id, medicalHistoryDTO);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('DOCTOR') or hasRole('ADMIN')")
    public ResponseEntity<Void> deleteMedicalHistory(@PathVariable Long id) {
        medicalHistoryService.deleteMedicalHistory(id);
        return ResponseEntity.noContent().build();
    }
}
