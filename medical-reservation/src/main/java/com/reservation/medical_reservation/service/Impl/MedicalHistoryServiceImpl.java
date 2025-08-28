package com.reservation.medical_reservation.service.Impl;

import com.reservation.medical_reservation.model.dto.MedicalHistoryDTO;
import com.reservation.medical_reservation.model.entity.MedicalHistoryEntity;
import com.reservation.medical_reservation.model.entity.UserEntity;
import com.reservation.medical_reservation.model.entity.DoctorEntity;
import com.reservation.medical_reservation.model.entity.AppointmentEntity;
import com.reservation.medical_reservation.repository.MedicalHistoryRepository;
import com.reservation.medical_reservation.repository.UserRepository;
import com.reservation.medical_reservation.repository.DoctorRepository;
import com.reservation.medical_reservation.repository.AppointmentRepository;
import com.reservation.medical_reservation.service.MedicalHistoryService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class MedicalHistoryServiceImpl implements MedicalHistoryService {

    private final MedicalHistoryRepository medicalHistoryRepository;
    private final UserRepository userRepository;
    private final DoctorRepository doctorRepository;
    private final AppointmentRepository appointmentRepository;
    private final ModelMapper modelMapper;

    public MedicalHistoryServiceImpl(MedicalHistoryRepository medicalHistoryRepository,
                                   UserRepository userRepository,
                                   DoctorRepository doctorRepository,
                                   AppointmentRepository appointmentRepository,
                                   ModelMapper modelMapper) {
        this.medicalHistoryRepository = medicalHistoryRepository;
        this.userRepository = userRepository;
        this.doctorRepository = doctorRepository;
        this.appointmentRepository = appointmentRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public MedicalHistoryDTO createMedicalHistory(MedicalHistoryDTO medicalHistoryDTO) {
        MedicalHistoryEntity entity = new MedicalHistoryEntity();
        
        // Set patient
        UserEntity patient = userRepository.findById(medicalHistoryDTO.getPatientId())
                .orElseThrow(() -> new RuntimeException("Patient not found with id: " + medicalHistoryDTO.getPatientId()));
        entity.setPatient(patient);
        
        // Set doctor
        DoctorEntity doctor = doctorRepository.findById(medicalHistoryDTO.getDoctorId())
                .orElseThrow(() -> new RuntimeException("Doctor not found with id: " + medicalHistoryDTO.getDoctorId()));
        entity.setDoctor(doctor);
        
        // Set appointment if provided
        if (medicalHistoryDTO.getAppointmentId() != null) {
            AppointmentEntity appointment = appointmentRepository.findById(medicalHistoryDTO.getAppointmentId())
                    .orElseThrow(() -> new RuntimeException("Appointment not found with id: " + medicalHistoryDTO.getAppointmentId()));
            entity.setAppointment(appointment);
        }
        
        // Set other fields
        entity.setTitle(medicalHistoryDTO.getTitle());
        entity.setDescription(medicalHistoryDTO.getDescription());
        entity.setDiagnosis(medicalHistoryDTO.getDiagnosis());
        entity.setTreatment(medicalHistoryDTO.getTreatment());
        entity.setMedications(medicalHistoryDTO.getMedications());
        entity.setAttachmentUrl(medicalHistoryDTO.getAttachmentUrl());
        
        MedicalHistoryEntity saved = medicalHistoryRepository.save(entity);
        return convertToDTO(saved);
    }

    @Override
    public List<MedicalHistoryDTO> getPatientMedicalHistory(Long patientId) {
        UserEntity patient = userRepository.findById(patientId)
                .orElseThrow(() -> new RuntimeException("Patient not found with id: " + patientId));
        
        return medicalHistoryRepository.findByPatientOrderByCreatedAtDesc(patient)
                .stream()
                .map(this::convertToDTO)
                .toList();
    }

    @Override
    public List<MedicalHistoryDTO> getDoctorMedicalRecords(Long doctorId) {
        DoctorEntity doctor = doctorRepository.findById(doctorId)
                .orElseThrow(() -> new RuntimeException("Doctor not found with id: " + doctorId));
        
        return medicalHistoryRepository.findByDoctorOrderByCreatedAtDesc(doctor)
                .stream()
                .map(this::convertToDTO)
                .toList();
    }

    @Override
    public MedicalHistoryDTO getMedicalHistoryById(Long id) {
        MedicalHistoryEntity entity = medicalHistoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Medical history not found with id: " + id));
        return convertToDTO(entity);
    }

    @Override
    public MedicalHistoryDTO updateMedicalHistory(Long id, MedicalHistoryDTO medicalHistoryDTO) {
        MedicalHistoryEntity entity = medicalHistoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Medical history not found with id: " + id));
        
        // Update fields
        entity.setTitle(medicalHistoryDTO.getTitle());
        entity.setDescription(medicalHistoryDTO.getDescription());
        entity.setDiagnosis(medicalHistoryDTO.getDiagnosis());
        entity.setTreatment(medicalHistoryDTO.getTreatment());
        entity.setMedications(medicalHistoryDTO.getMedications());
        entity.setAttachmentUrl(medicalHistoryDTO.getAttachmentUrl());
        
        MedicalHistoryEntity updated = medicalHistoryRepository.save(entity);
        return convertToDTO(updated);
    }

    @Override
    public void deleteMedicalHistory(Long id) {
        if (!medicalHistoryRepository.existsById(id)) {
            throw new RuntimeException("Medical history not found with id: " + id);
        }
        medicalHistoryRepository.deleteById(id);
    }

    private MedicalHistoryDTO convertToDTO(MedicalHistoryEntity entity) {
        MedicalHistoryDTO dto = modelMapper.map(entity, MedicalHistoryDTO.class);
        
        // Set additional fields
        dto.setPatientId(entity.getPatient().getId());
        dto.setPatientName(entity.getPatient().getFullName());
        dto.setDoctorId(entity.getDoctor().getId());
        dto.setDoctorName(entity.getDoctor().getUser().getFullName());
        dto.setDoctorSpecialization(entity.getDoctor().getSpecialization());
        
        if (entity.getAppointment() != null) {
            dto.setAppointmentId(entity.getAppointment().getId());
        }
        
        return dto;
    }
}
