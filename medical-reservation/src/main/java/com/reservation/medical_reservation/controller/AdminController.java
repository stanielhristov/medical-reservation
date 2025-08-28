package com.reservation.medical_reservation.controller;

import com.reservation.medical_reservation.model.dto.DoctorRequestDTO;
import com.reservation.medical_reservation.model.dto.UserDTO;
import com.reservation.medical_reservation.service.AdminService;
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

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
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
}
