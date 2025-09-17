package com.reservation.medical_reservation.service;

import com.reservation.medical_reservation.model.dto.AppointmentDTO;
import com.reservation.medical_reservation.model.dto.DoctorRequestDTO;
import com.reservation.medical_reservation.model.dto.UserDTO;

import java.util.List;

public interface AdminService {
    // User Management
    List<UserDTO> getAllUsers();
    UserDTO getUserById(Long userId);
    UserDTO updateUserRole(Long userId, String roleName);
    void deactivateUser(Long userId);
    void activateUser(Long userId);
    void deleteUser(Long userId);
    
    // Doctor Request Management
    List<DoctorRequestDTO> getAllDoctorRequests();
    List<DoctorRequestDTO> getPendingDoctorRequests();
    DoctorRequestDTO approveDoctorRequest(Long requestId, Long adminId);
    DoctorRequestDTO rejectDoctorRequest(Long requestId, Long adminId, String reason);
    
    // Appointment Management
    List<AppointmentDTO> getAllAppointments();
    
    // Statistics
    long getTotalUsers();
    long getTotalPatients();
    long getTotalDoctors();
    long getTotalAppointments();
}
