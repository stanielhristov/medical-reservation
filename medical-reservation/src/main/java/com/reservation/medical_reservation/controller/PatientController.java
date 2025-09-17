package com.reservation.medical_reservation.controller;

import com.reservation.medical_reservation.model.dto.AppointmentDTO;
import com.reservation.medical_reservation.model.dto.DoctorDTO;
import com.reservation.medical_reservation.model.dto.NotificationDTO;
import com.reservation.medical_reservation.model.enums.AppointmentStatus;
import com.reservation.medical_reservation.service.AppointmentService;
import com.reservation.medical_reservation.service.DoctorService;
import com.reservation.medical_reservation.service.NotificationService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.HashMap;

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
        return ResponseEntity.ok(doctors != null ? doctors : List.of());
    }

    @GetMapping("/doctors/specialization/{specialization}")
    public ResponseEntity<List<DoctorDTO>> getDoctorsBySpecialization(@PathVariable String specialization) {
        if (specialization == null || specialization.trim().isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        List<DoctorDTO> doctors = doctorService.getDoctorsBySpecialization(specialization);
        return ResponseEntity.ok(doctors != null ? doctors : List.of());
    }

    @GetMapping("/doctors/specializations")
    public ResponseEntity<List<String>> getAvailableSpecializations() {
        List<String> specializations = doctorService.getAvailableSpecializations();
        return ResponseEntity.ok(specializations != null ? specializations : List.of());
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

    @DeleteMapping("/notifications/{notificationId}")
    public ResponseEntity<Void> deleteNotification(@PathVariable Long notificationId) {
        notificationService.deleteNotification(notificationId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{patientId}/dashboard")
    public ResponseEntity<Map<String, Object>> getPatientDashboard(@PathVariable Long patientId) {
        Map<String, Object> dashboard = new HashMap<>();
        
        // Next appointment
        AppointmentDTO nextAppointment = appointmentService.getNextAppointmentByPatient(patientId);
        dashboard.put("nextAppointment", nextAppointment);
        
        // Recent appointments (completed)
        List<AppointmentDTO> recentAppointments = appointmentService.getPatientAppointments(patientId)
                .stream()
                .filter(apt -> apt.getStatus() == AppointmentStatus.COMPLETED)
                .limit(5)
                .toList();
        dashboard.put("recentAppointments", recentAppointments);
        
        // Today's appointments
        List<AppointmentDTO> todayAppointments = appointmentService.getPatientAppointmentsForToday(patientId);
        dashboard.put("todayAppointments", todayAppointments);
        
        // Statistics
        Map<String, Object> stats = new HashMap<>();
        stats.put("completedAppointments", appointmentService.countPatientAppointmentsByStatus(patientId, AppointmentStatus.COMPLETED));
        stats.put("upcomingAppointments", appointmentService.getUpcomingAppointmentsByPatient(patientId).size());
        stats.put("pendingAppointments", appointmentService.countPatientAppointmentsByStatus(patientId, AppointmentStatus.PENDING));
        stats.put("unreadNotifications", notificationService.getUnreadNotifications(patientId).size());
        
        dashboard.put("statistics", stats);
        
        return ResponseEntity.ok(dashboard);
    }

    @GetMapping("/doctors/search")
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
            return ResponseEntity.ok(List.of());
        }
    }
}
