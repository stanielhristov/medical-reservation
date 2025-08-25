package com.reservation.medical_reservation.service;

import com.reservation.medical_reservation.model.dto.AppointmentDTO;
import com.reservation.medical_reservation.model.enums.AppointmentStatus;

import java.time.LocalDateTime;
import java.util.List;

public interface AppointmentService {
    AppointmentDTO createAppointment(AppointmentDTO appointmentDTO);
    List<AppointmentDTO> getPatientAppointments(Long patientId);
    List<AppointmentDTO> getDoctorAppointments(Long doctorId);
    List<AppointmentDTO> getUpcomingAppointmentsByPatient(Long patientId);
    List<AppointmentDTO> getUpcomingAppointmentsByDoctor(Long doctorId);
    AppointmentDTO getNextAppointmentByPatient(Long patientId);
    AppointmentDTO getAppointmentById(Long appointmentId);
    AppointmentDTO updateAppointmentStatus(Long appointmentId, AppointmentStatus status, String reason);
    AppointmentDTO rescheduleAppointment(Long appointmentId, LocalDateTime newDateTime);
    void cancelAppointment(Long appointmentId, String reason);
    List<AppointmentDTO> getDoctorAppointmentsByDate(Long doctorId, LocalDateTime date);
    boolean isSlotAvailable(Long doctorId, LocalDateTime startTime, LocalDateTime endTime);
}
