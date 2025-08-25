package com.reservation.medical_reservation.controller;

import com.reservation.medical_reservation.model.dto.AppointmentDTO;
import com.reservation.medical_reservation.model.dto.DoctorDTO;
import com.reservation.medical_reservation.model.dto.NotificationDTO;
import com.reservation.medical_reservation.service.AppointmentService;
import com.reservation.medical_reservation.service.DoctorService;
import com.reservation.medical_reservation.service.NotificationService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/patient")
@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
public class PatientController {

    private final DoctorService doctorService;
    private final AppointmentService appointmentService;
    private final NotificationService notificationService;

    public PatientController(DoctorService doctorService, 
                           AppointmentService appointmentService,
                           NotificationService notificationService) {
        this.doctorService = doctorService;
        this.appointmentService = appointmentService;
        this.notificationService = notificationService;
    }

    @GetMapping("/doctors")
    public ResponseEntity<List<DoctorDTO>> getAvailableDoctors() {
        List<DoctorDTO> doctors = doctorService.getActiveDoctors();
        return ResponseEntity.ok(doctors);
    }

    @GetMapping("/doctors/specialization/{specialization}")
    public ResponseEntity<List<DoctorDTO>> getDoctorsBySpecialization(@PathVariable String specialization) {
        List<DoctorDTO> doctors = doctorService.getDoctorsBySpecialization(specialization);
        return ResponseEntity.ok(doctors);
    }

    @GetMapping("/{patientId}/appointments")
    public ResponseEntity<List<AppointmentDTO>> getPatientAppointments(@PathVariable Long patientId) {
        List<AppointmentDTO> appointments = appointmentService.getPatientAppointments(patientId);
        return ResponseEntity.ok(appointments);
    }

    @GetMapping("/{patientId}/appointments/upcoming")
    public ResponseEntity<List<AppointmentDTO>> getUpcomingAppointments(@PathVariable Long patientId) {
        List<AppointmentDTO> appointments = appointmentService.getUpcomingAppointmentsByPatient(patientId);
        return ResponseEntity.ok(appointments);
    }

    @GetMapping("/{patientId}/appointments/next")
    public ResponseEntity<AppointmentDTO> getNextAppointment(@PathVariable Long patientId) {
        AppointmentDTO appointment = appointmentService.getNextAppointmentByPatient(patientId);
        if (appointment != null) {
            return ResponseEntity.ok(appointment);
        } else {
            return ResponseEntity.noContent().build();
        }
    }

    @GetMapping("/{patientId}/notifications")
    public ResponseEntity<List<NotificationDTO>> getPatientNotifications(@PathVariable Long patientId) {
        List<NotificationDTO> notifications = notificationService.getUserNotifications(patientId);
        return ResponseEntity.ok(notifications);
    }

    @GetMapping("/{patientId}/notifications/unread")
    public ResponseEntity<List<NotificationDTO>> getUnreadNotifications(@PathVariable Long patientId) {
        List<NotificationDTO> notifications = notificationService.getUnreadNotifications(patientId);
        return ResponseEntity.ok(notifications);
    }

    @PatchMapping("/notifications/{notificationId}/read")
    public ResponseEntity<Void> markNotificationAsRead(@PathVariable Long notificationId) {
        notificationService.markAsRead(notificationId);
        return ResponseEntity.ok().build();
    }
}
