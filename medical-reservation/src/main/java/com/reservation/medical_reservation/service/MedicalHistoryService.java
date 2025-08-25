package com.reservation.medical_reservation.service;

import com.reservation.medical_reservation.model.dto.MedicalHistoryDTO;

import java.util.List;

public interface MedicalHistoryService {
    MedicalHistoryDTO createMedicalHistory(MedicalHistoryDTO medicalHistoryDTO);
    List<MedicalHistoryDTO> getPatientMedicalHistory(Long patientId);
    List<MedicalHistoryDTO> getDoctorMedicalRecords(Long doctorId);
    MedicalHistoryDTO getMedicalHistoryById(Long id);
    MedicalHistoryDTO updateMedicalHistory(Long id, MedicalHistoryDTO medicalHistoryDTO);
    void deleteMedicalHistory(Long id);
}
