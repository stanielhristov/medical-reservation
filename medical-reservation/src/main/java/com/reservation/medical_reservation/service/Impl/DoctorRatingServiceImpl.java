package com.reservation.medical_reservation.service.Impl;

import com.reservation.medical_reservation.model.dto.*;
import com.reservation.medical_reservation.model.entity.DoctorEntity;
import com.reservation.medical_reservation.model.entity.DoctorRatingEntity;
import com.reservation.medical_reservation.model.entity.UserEntity;
import com.reservation.medical_reservation.repository.DoctorRatingRepository;
import com.reservation.medical_reservation.repository.DoctorRepository;
import com.reservation.medical_reservation.repository.UserRepository;
import com.reservation.medical_reservation.service.DoctorRatingService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class DoctorRatingServiceImpl implements DoctorRatingService {

    private final DoctorRatingRepository doctorRatingRepository;
    private final DoctorRepository doctorRepository;
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;

    public DoctorRatingServiceImpl(DoctorRatingRepository doctorRatingRepository,
                                 DoctorRepository doctorRepository,
                                 UserRepository userRepository,
                                 ModelMapper modelMapper) {
        this.doctorRatingRepository = doctorRatingRepository;
        this.doctorRepository = doctorRepository;
        this.userRepository = userRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public DoctorRatingDTO createRating(CreateRatingDTO createRatingDTO, Long userId) {
        DoctorEntity doctor = doctorRepository.findById(createRatingDTO.getDoctorId())
                .orElseThrow(() -> new IllegalArgumentException("Doctor not found"));
        
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        Optional<DoctorRatingEntity> existingRating = doctorRatingRepository.findByDoctorAndUser(doctor, user);
        if (existingRating.isPresent()) {
            throw new IllegalArgumentException("You have already rated this doctor. Use update instead.");
        }

        DoctorRatingEntity rating = new DoctorRatingEntity();
        rating.setDoctor(doctor);
        rating.setUser(user);
        rating.setRating(createRatingDTO.getRating());
        rating.setComment(createRatingDTO.getComment());

        DoctorRatingEntity savedRating = doctorRatingRepository.save(rating);

        updateDoctorRatingStats(doctor);

        return convertToDTO(savedRating);
    }

    @Override
    public DoctorRatingDTO updateRating(Long ratingId, UpdateRatingDTO updateRatingDTO, Long userId) {
        DoctorRatingEntity rating = doctorRatingRepository.findById(ratingId)
                .orElseThrow(() -> new IllegalArgumentException("Rating not found"));

        if (!rating.getUser().getId().equals(userId)) {
            throw new SecurityException("You can only update your own ratings");
        }

        rating.setRating(updateRatingDTO.getRating());
        rating.setComment(updateRatingDTO.getComment());

        DoctorRatingEntity savedRating = doctorRatingRepository.save(rating);

        updateDoctorRatingStats(rating.getDoctor());

        return convertToDTO(savedRating);
    }

    @Override
    public void deleteRating(Long ratingId, Long userId) {
        DoctorRatingEntity rating = doctorRatingRepository.findById(ratingId)
                .orElseThrow(() -> new IllegalArgumentException("Rating not found"));

        if (!rating.getUser().getId().equals(userId)) {
            throw new SecurityException("You can only delete your own ratings");
        }

        DoctorEntity doctor = rating.getDoctor();
        doctorRatingRepository.delete(rating);

        updateDoctorRatingStats(doctor);
    }

    @Override
    @Transactional(readOnly = true)
    public List<DoctorRatingDTO> getDoctorRatings(Long doctorId) {
        List<DoctorRatingEntity> ratings = doctorRatingRepository.findByDoctorIdOrderByCreatedAtDesc(doctorId);
        return ratings.stream()
                .map(this::convertToDTO)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public DoctorRatingStatsDTO getDoctorRatingStats(Long doctorId, Long userId) {
        Double averageRating = doctorRatingRepository.findAverageRatingByDoctorId(doctorId);
        Long totalRatings = doctorRatingRepository.countRatingsByDoctorId(doctorId);
        
        DoctorRatingStatsDTO stats = new DoctorRatingStatsDTO();
        stats.setAverageRating(averageRating != null ? averageRating : 0.0);
        stats.setTotalRatings(totalRatings != null ? totalRatings : 0L);

        if (userId != null) {
            Optional<DoctorRatingEntity> userRating = doctorRatingRepository.findByDoctorIdAndUserId(doctorId, userId);
            stats.setUserHasRated(userRating.isPresent());
            if (userRating.isPresent()) {
                stats.setUserRating(convertToDTO(userRating.get()));
            }
        } else {
            stats.setUserHasRated(false);
        }

        return stats;
    }

    @Override
    @Transactional(readOnly = true)
    public DoctorRatingDTO getUserRatingForDoctor(Long doctorId, Long userId) {
        Optional<DoctorRatingEntity> rating = doctorRatingRepository.findByDoctorIdAndUserId(doctorId, userId);
        return rating.map(this::convertToDTO).orElse(null);
    }

    @Override
    @Transactional(readOnly = true)
    public List<DoctorRatingDTO> getUserRatings(Long userId) {
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        
        List<DoctorRatingEntity> ratings = doctorRatingRepository.findByUserOrderByCreatedAtDesc(user);
        return ratings.stream()
                .map(this::convertToDTO)
                .toList();
    }

    private void updateDoctorRatingStats(DoctorEntity doctor) {
        Double averageRating = doctorRatingRepository.findAverageRatingByDoctorId(doctor.getId());
        Long totalRatings = doctorRatingRepository.countRatingsByDoctorId(doctor.getId());
        
        doctor.setRating(averageRating != null ? averageRating : 0.0);
        doctor.setTotalRatings(totalRatings != null ? totalRatings.intValue() : 0);
        
        doctorRepository.save(doctor);
    }

    private DoctorRatingDTO convertToDTO(DoctorRatingEntity rating) {
        DoctorRatingDTO dto = modelMapper.map(rating, DoctorRatingDTO.class);
        dto.setDoctorId(rating.getDoctor().getId());
        dto.setUserId(rating.getUser().getId());
        dto.setUserFullName(rating.getUser().getFullName());
        return dto;
    }
}
