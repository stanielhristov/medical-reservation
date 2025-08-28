package com.reservation.medical_reservation.service;

import com.reservation.medical_reservation.model.dto.DoctorDTO;

import java.util.List;

public interface DoctorService {
    List<DoctorDTO> getAllDoctors();
    List<DoctorDTO> getActiveDoctors();
    DoctorDTO getDoctorById(Long id);
    DoctorDTO getDoctorByUserId(Long userId);
    List<DoctorDTO> getDoctorsBySpecialization(String specialization);
    DoctorDTO updateDoctor(Long id, DoctorDTO doctorDTO);
    void activateDoctor(Long id);
    void deactivateDoctor(Long id);

    List<DoctorDTO> searchDoctors(String searchTerm);
    List<DoctorDTO> searchDoctorsWithSpecialization(String searchTerm, String specialization);

    // Get available specializations
    List<String> getAvailableSpecializations();

    // Patient management
    List<com.reservation.medical_reservation.model.dto.UserDTO> getDoctorPatients(Long doctorId);
}
