package com.reservation.medical_reservation.controller;

import com.reservation.medical_reservation.model.dto.AppointmentDTO;
import com.reservation.medical_reservation.model.dto.DoctorRequestDTO;
import com.reservation.medical_reservation.model.dto.DoctorRatingDTO;
import com.reservation.medical_reservation.model.dto.UserDTO;
import com.reservation.medical_reservation.service.AdminService;
import com.reservation.medical_reservation.service.DoctorRatingService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    private final AdminService adminService;
    private final DoctorRatingService doctorRatingService;

    public AdminController(AdminService adminService, DoctorRatingService doctorRatingService) {
        this.adminService = adminService;
        this.doctorRatingService = doctorRatingService;
    }

    @GetMapping("/users")
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        List<UserDTO> users = adminService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/users/{userId}")
    public ResponseEntity<UserDTO> getUserById(@PathVariable Long userId) {
        UserDTO user = adminService.getUserById(userId);
        return ResponseEntity.ok(user);
    }

    @PatchMapping("/users/{userId}/role")
    public ResponseEntity<UserDTO> updateUserRole(
            @PathVariable Long userId,
            @RequestParam String roleName) {
        UserDTO updated = adminService.updateUserRole(userId, roleName);
        return ResponseEntity.ok(updated);
    }

    @PatchMapping("/users/{userId}/deactivate")
    public ResponseEntity<Void> deactivateUser(@PathVariable Long userId) {
        adminService.deactivateUser(userId);
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/users/{userId}/activate")
    public ResponseEntity<Void> activateUser(@PathVariable Long userId) {
        adminService.activateUser(userId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/users/{userId}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long userId) {
        adminService.deleteUser(userId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/doctor-requests")
    public ResponseEntity<List<DoctorRequestDTO>> getAllDoctorRequests() {
        List<DoctorRequestDTO> requests = adminService.getAllDoctorRequests();
        return ResponseEntity.ok(requests);
    }

    @GetMapping("/doctor-requests/pending")
    public ResponseEntity<List<DoctorRequestDTO>> getPendingDoctorRequests() {
        List<DoctorRequestDTO> requests = adminService.getPendingDoctorRequests();
        return ResponseEntity.ok(requests);
    }

    @PatchMapping("/doctor-requests/{requestId}/approve")
    public ResponseEntity<DoctorRequestDTO> approveDoctorRequest(
            @PathVariable Long requestId,
            @RequestParam Long adminId) {
        DoctorRequestDTO updated = adminService.approveDoctorRequest(requestId, adminId);
        return ResponseEntity.ok(updated);
    }

    @PatchMapping("/doctor-requests/{requestId}/reject")
    public ResponseEntity<DoctorRequestDTO> rejectDoctorRequest(
            @PathVariable Long requestId,
            @RequestParam Long adminId,
            @RequestParam String reason) {
        DoctorRequestDTO updated = adminService.rejectDoctorRequest(requestId, adminId, reason);
        return ResponseEntity.ok(updated);
    }

    @GetMapping("/appointments")
    public ResponseEntity<List<AppointmentDTO>> getAllAppointments() {
        List<AppointmentDTO> appointments = adminService.getAllAppointments();
        return ResponseEntity.ok(appointments);
    }

    @GetMapping("/statistics")
    public ResponseEntity<Map<String, Long>> getStatistics() {
        Map<String, Long> stats = new HashMap<>();
        stats.put("totalUsers", adminService.getTotalUsers());
        stats.put("totalPatients", adminService.getTotalPatients());
        stats.put("totalDoctors", adminService.getTotalDoctors());
        stats.put("totalAppointments", adminService.getTotalAppointments());
        return ResponseEntity.ok(stats);
    }

    @GetMapping("/statistics/users")
    public ResponseEntity<Long> getTotalUsers() {
        long count = adminService.getTotalUsers();
        return ResponseEntity.ok(count);
    }

    @GetMapping("/statistics/patients")
    public ResponseEntity<Long> getTotalPatients() {
        long count = adminService.getTotalPatients();
        return ResponseEntity.ok(count);
    }

    @GetMapping("/statistics/doctors")
    public ResponseEntity<Long> getTotalDoctors() {
        long count = adminService.getTotalDoctors();
        return ResponseEntity.ok(count);
    }

    @GetMapping("/statistics/appointments")
    public ResponseEntity<Long> getTotalAppointments() {
        long count = adminService.getTotalAppointments();
        return ResponseEntity.ok(count);
    }

    @GetMapping("/ratings")
    public ResponseEntity<Page<DoctorRatingDTO>> getAllRatings(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<DoctorRatingDTO> ratings = doctorRatingService.getAllRatings(pageable);
        return ResponseEntity.ok(ratings);
    }

    @DeleteMapping("/ratings/{ratingId}")
    public ResponseEntity<Void> deleteRating(@PathVariable Long ratingId) {
        try {
            doctorRatingService.adminDeleteRating(ratingId);
            return ResponseEntity.noContent().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
}
