package com.reservation.medical_reservation.service.Impl;

import com.reservation.medical_reservation.model.dto.DoctorDTO;
import com.reservation.medical_reservation.model.dto.DoctorPatientDTO;
import com.reservation.medical_reservation.model.dto.UserDTO;
import com.reservation.medical_reservation.model.entity.DoctorEntity;
import com.reservation.medical_reservation.model.entity.UserEntity;
import com.reservation.medical_reservation.model.entity.AppointmentEntity;
import com.reservation.medical_reservation.model.entity.PatientProfileEntity;
import com.reservation.medical_reservation.model.enums.AppointmentStatus;
import com.reservation.medical_reservation.repository.DoctorRepository;
import com.reservation.medical_reservation.repository.AppointmentRepository;
import com.reservation.medical_reservation.service.DoctorService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.Period;
import java.util.List;
import java.util.Arrays;

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
        
        String location = doctorDTO.getLocation();
        doctor.setLocation(location != null && !location.trim().isEmpty() ? location.trim() : null);
        
        doctor.setPrice(doctorDTO.getPrice());

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
            return List.of();
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
            return List.of();
        }
    }

    @Override
    public List<String> getAvailableSpecializations() {
        try {
            return doctorRepository.findAllActiveSpecializations();
        } catch (Exception e) {
            System.err.println("Error getting available specializations: " + e.getMessage());
            return List.of();
        }
    }

    @Override
    public List<DoctorPatientDTO> getDoctorPatients(Long doctorId) {
        DoctorEntity doctor = doctorRepository.findById(doctorId)
                .orElseThrow(() -> new IllegalArgumentException("Doctor not found"));
        
        return appointmentRepository.findDoctorPatients(doctor)
                .stream()
                .map(patient -> convertToDoctorPatientDTO(patient, doctor))
                .toList();
    }
    
    private DoctorPatientDTO convertToDoctorPatientDTO(UserEntity patient, DoctorEntity doctor) {
        DoctorPatientDTO dto = modelMapper.map(patient, DoctorPatientDTO.class);
        
        if (patient.getDateOfBirth() != null) {
            dto.setAge(Period.between(patient.getDateOfBirth(), java.time.LocalDate.now()).getYears());
        }
        
        // Extract comprehensive medical information from patient profile
        PatientProfileEntity profile = patient.getPatientProfile();
        if (profile != null) {
            dto.setGender(profile.getGender() != null ? profile.getGender().name() : "Not specified");
            dto.setBloodType(profile.getBloodType() != null ? profile.getBloodType().getDisplayName() : null);
            dto.setEmergencyContactName(profile.getEmergencyContactName());
            dto.setEmergencyContactRelationship(profile.getEmergencyContactRelationship());
            dto.setChronicConditions(profile.getChronicConditions());
            dto.setCurrentMedications(profile.getCurrentMedications());
            dto.setPastSurgeries(profile.getPastSurgeries());
            dto.setFamilyMedicalHistory(profile.getFamilyMedicalHistory());
            dto.setHeight(profile.getHeight());
            dto.setWeight(profile.getWeight());
            dto.setBmi(profile.getBmi());
            
            // Parse allergies and conditions from text fields
            if (profile.getAllergies() != null && !profile.getAllergies().trim().isEmpty()) {
                dto.setAllergies(Arrays.asList(profile.getAllergies().split(",\\s*")));
            } else {
                dto.setAllergies(Arrays.asList("None known"));
            }
            
            if (profile.getChronicConditions() != null && !profile.getChronicConditions().trim().isEmpty()) {
                dto.setConditions(Arrays.asList(profile.getChronicConditions().split(",\\s*")));
            } else {
                dto.setConditions(Arrays.asList());
            }
        } else {
            dto.setGender("Not specified");
            dto.setBloodType(null);
            dto.setAllergies(Arrays.asList("None known"));
            dto.setConditions(Arrays.asList());
        }
        
        List<AppointmentEntity> patientAppointments = appointmentRepository.findByPatientOrderByAppointmentTimeDesc(patient);
        LocalDateTime lastVisit = patientAppointments.stream()
                .filter(apt -> apt.getDoctor().equals(doctor) && apt.getStatus() == AppointmentStatus.COMPLETED)
                .map(AppointmentEntity::getAppointmentTime)
                .findFirst()
                .orElse(null);
        dto.setLastVisit(lastVisit);
        
        LocalDateTime nextAppointment = patientAppointments.stream()
                .filter(apt -> apt.getDoctor().equals(doctor) && 
                             apt.getAppointmentTime().isAfter(LocalDateTime.now()) &&
                             (apt.getStatus() == AppointmentStatus.CONFIRMED || apt.getStatus() == AppointmentStatus.PENDING))
                .map(AppointmentEntity::getAppointmentTime)
                .findFirst()
                .orElse(null);
        dto.setNextAppointment(nextAppointment);
        
        long visitCount = appointmentRepository.countByPatientId(patient.getId());
        dto.setVisitCount(visitCount);
        
        if (lastVisit != null && lastVisit.isAfter(LocalDateTime.now().minusDays(30))) {
            dto.setStatus("active");
        } else if (nextAppointment != null) {
            dto.setStatus("followup");
        } else {
            dto.setStatus("inactive");
        }
        
        return dto;
    }

    private DoctorDTO convertToDTO(DoctorEntity doctor) {
        DoctorDTO dto = modelMapper.map(doctor, DoctorDTO.class);
        dto.setUserId(doctor.getUser().getId());
        dto.setFullName(doctor.getUser().getFullName());
        dto.setEmail(doctor.getUser().getEmail());
        dto.setPhoneNumber(doctor.getUser().getPhoneNumber());
        return dto;
    }
}
