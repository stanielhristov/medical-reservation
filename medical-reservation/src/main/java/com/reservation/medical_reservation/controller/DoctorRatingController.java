package com.reservation.medical_reservation.controller;

import com.reservation.medical_reservation.model.dto.*;
import com.reservation.medical_reservation.security.UserPrincipal;
import com.reservation.medical_reservation.service.DoctorRatingService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ratings")
public class DoctorRatingController {

    private final DoctorRatingService doctorRatingService;

    public DoctorRatingController(DoctorRatingService doctorRatingService) {
        this.doctorRatingService = doctorRatingService;
    }

    @PostMapping
    public ResponseEntity<DoctorRatingDTO> createRating(@Valid @RequestBody CreateRatingDTO createRatingDTO) {
        Long userId = getCurrentUserId();
        DoctorRatingDTO rating = doctorRatingService.createRating(createRatingDTO, userId);
        return ResponseEntity.status(HttpStatus.CREATED).body(rating);
    }

    @PutMapping("/{ratingId}")
    public ResponseEntity<DoctorRatingDTO> updateRating(
            @PathVariable Long ratingId,
            @Valid @RequestBody UpdateRatingDTO updateRatingDTO) {
        Long userId = getCurrentUserId();
        DoctorRatingDTO rating = doctorRatingService.updateRating(ratingId, updateRatingDTO, userId);
        return ResponseEntity.ok(rating);
    }

    @DeleteMapping("/{ratingId}")
    public ResponseEntity<Void> deleteRating(@PathVariable Long ratingId) {
        Long userId = getCurrentUserId();
        doctorRatingService.deleteRating(ratingId, userId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/doctor/{doctorId}")
    public ResponseEntity<List<DoctorRatingDTO>> getDoctorRatings(@PathVariable Long doctorId) {
        List<DoctorRatingDTO> ratings = doctorRatingService.getDoctorRatings(doctorId);
        return ResponseEntity.ok(ratings);
    }

    @GetMapping("/doctor/{doctorId}/stats")
    public ResponseEntity<DoctorRatingStatsDTO> getDoctorRatingStats(@PathVariable Long doctorId) {
        Long userId = getCurrentUserIdOrNull();
        DoctorRatingStatsDTO stats = doctorRatingService.getDoctorRatingStats(doctorId, userId);
        return ResponseEntity.ok(stats);
    }

    @GetMapping("/doctor/{doctorId}/my-rating")
    public ResponseEntity<DoctorRatingDTO> getMyRatingForDoctor(@PathVariable Long doctorId) {
        Long userId = getCurrentUserId();
        DoctorRatingDTO rating = doctorRatingService.getUserRatingForDoctor(doctorId, userId);
        if (rating != null) {
            return ResponseEntity.ok(rating);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/my-ratings")
    public ResponseEntity<List<DoctorRatingDTO>> getMyRatings() {
        Long userId = getCurrentUserId();
        List<DoctorRatingDTO> ratings = doctorRatingService.getUserRatings(userId);
        return ResponseEntity.ok(ratings);
    }

    private Long getCurrentUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getPrincipal() instanceof UserPrincipal) {
            UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
            return userPrincipal.getId();
        }
        throw new IllegalStateException("User not authenticated");
    }
    
    private Long getCurrentUserIdOrNull() {
        try {
            return getCurrentUserId();
        } catch (IllegalStateException e) {
            return null;
        }
    }
}
