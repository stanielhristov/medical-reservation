package com.reservation.medical_reservation.service;

import com.reservation.medical_reservation.model.dto.*;

import java.util.List;

public interface DoctorRatingService {
    
    DoctorRatingDTO createRating(CreateRatingDTO createRatingDTO, Long userId);
    
    DoctorRatingDTO updateRating(Long ratingId, UpdateRatingDTO updateRatingDTO, Long userId);
    
    void deleteRating(Long ratingId, Long userId);
    
    List<DoctorRatingDTO> getDoctorRatings(Long doctorId);
    
    DoctorRatingStatsDTO getDoctorRatingStats(Long doctorId, Long userId);
    
    DoctorRatingDTO getUserRatingForDoctor(Long doctorId, Long userId);
    
    List<DoctorRatingDTO> getUserRatings(Long userId);
}
