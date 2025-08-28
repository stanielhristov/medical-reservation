package com.reservation.medical_reservation.service.Impl;

import com.reservation.medical_reservation.model.dto.DoctorDTO;
import com.reservation.medical_reservation.model.dto.UserDTO;
import com.reservation.medical_reservation.model.entity.DoctorEntity;
import com.reservation.medical_reservation.repository.DoctorRepository;
import com.reservation.medical_reservation.repository.AppointmentRepository;
import com.reservation.medical_reservation.service.DoctorService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class DoctorServiceImpl implements DoctorService {

    private final DoctorRepository doctorRepository;
    private final AppointmentRepository appointmentRepository;
    private final ModelMapper modelMapper;

    public DoctorServiceImpl(DoctorRepository doctorRepository, AppointmentRepository appointmentRepository, ModelMapper modelMapper) {
        this.doctorRepository = doctorRepository;
        this.appointmentRepository = appointmentRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public List<DoctorDTO> getAllDoctors() {
        return doctorRepository.findAll()
                .stream()
                .map(this::convertToDTO)
                .toList();
    }

    @Override
    public List<DoctorDTO> getActiveDoctors() {
        return doctorRepository.findByIsActiveTrue()
                .stream()
                .map(this::convertToDTO)
                .toList();
    }

    @Override
    public DoctorDTO getDoctorById(Long id) {
        DoctorEntity doctor = doctorRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Doctor not found"));
        return convertToDTO(doctor);
    }

    @Override
    public DoctorDTO getDoctorByUserId(Long userId) {
        DoctorEntity doctor = doctorRepository.findByUserId(userId)
                .orElseThrow(() -> new IllegalArgumentException("Doctor not found for user"));
        return convertToDTO(doctor);
    }

    @Override
    public List<DoctorDTO> getDoctorsBySpecialization(String specialization) {
        return doctorRepository.findBySpecializationAndIsActiveTrue(specialization)
                .stream()
                .map(this::convertToDTO)
                .toList();
    }

    @Override
    @Transactional
    public DoctorDTO updateDoctor(Long id, DoctorDTO doctorDTO) {
        DoctorEntity doctor = doctorRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Doctor not found"));

        doctor.setSpecialization(doctorDTO.getSpecialization());
        doctor.setBio(doctorDTO.getBio());
        doctor.setLicenseNumber(doctorDTO.getLicenseNumber());
        doctor.setEducation(doctorDTO.getEducation());
        doctor.setExperience(doctorDTO.getExperience());

        DoctorEntity updated = doctorRepository.save(doctor);
        return convertToDTO(updated);
    }

    @Override
    @Transactional
    public void activateDoctor(Long id) {
        DoctorEntity doctor = doctorRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Doctor not found"));
        doctor.setIsActive(true);
        doctorRepository.save(doctor);
    }

    @Override
    @Transactional
    public void deactivateDoctor(Long id) {
        DoctorEntity doctor = doctorRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Doctor not found"));
        doctor.setIsActive(false);
        doctorRepository.save(doctor);
    }

    @Override
    public List<DoctorDTO> searchDoctors(String searchTerm) {
        try {
            if (searchTerm == null || searchTerm.trim().isEmpty()) {
                return getActiveDoctors();
            }
            
            List<DoctorEntity> doctors = doctorRepository.searchDoctors(searchTerm.trim());
            return doctors.stream()
                    .map(this::convertToDTO)
                    .toList();
        } catch (Exception e) {
            System.err.println("Error searching doctors: " + e.getMessage());
            return List.of(); // Return empty list on error
        }
    }

    @Override
    public List<DoctorDTO> searchDoctorsWithSpecialization(String searchTerm, String specialization) {
        try {
            if (searchTerm == null || searchTerm.trim().isEmpty()) {
                if (specialization == null || specialization.trim().isEmpty()) {
                    return getActiveDoctors();
                } else {
                    return getDoctorsBySpecialization(specialization);
                }
            }
            
            List<DoctorEntity> doctors = doctorRepository.searchDoctorsWithSpecialization(
                    searchTerm.trim(), 
                    specialization != null && !specialization.trim().isEmpty() ? specialization.trim() : null
            );
            return doctors.stream()
                    .map(this::convertToDTO)
                    .toList();
        } catch (Exception e) {
            System.err.println("Error searching doctors with specialization: " + e.getMessage());
            return List.of(); // Return empty list on error
        }
    }

    @Override
    public List<String> getAvailableSpecializations() {
        try {
            return doctorRepository.findAllActiveSpecializations();
        } catch (Exception e) {
            System.err.println("Error getting available specializations: " + e.getMessage());
            return List.of(); // Return empty list on error
        }
    }

    @Override
    public List<UserDTO> getDoctorPatients(Long doctorId) {
        DoctorEntity doctor = doctorRepository.findById(doctorId)
                .orElseThrow(() -> new IllegalArgumentException("Doctor not found"));
        
        return appointmentRepository.findDoctorPatients(doctor)
                .stream()
                .map(patient -> modelMapper.map(patient, UserDTO.class))
                .toList();
    }

    private DoctorDTO convertToDTO(DoctorEntity doctor) {
        DoctorDTO dto = modelMapper.map(doctor, DoctorDTO.class);
        dto.setUserId(doctor.getUser().getId());
        dto.setFullName(doctor.getUser().getFullName());
        dto.setEmail(doctor.getUser().getEmail());
        return dto;
    }
}
