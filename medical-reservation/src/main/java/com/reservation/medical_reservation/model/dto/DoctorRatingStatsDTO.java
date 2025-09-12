package com.reservation.medical_reservation.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DoctorRatingStatsDTO {
    private Double averageRating;
    private Long totalRatings;
    private boolean userHasRated;
    private DoctorRatingDTO userRating;
}
