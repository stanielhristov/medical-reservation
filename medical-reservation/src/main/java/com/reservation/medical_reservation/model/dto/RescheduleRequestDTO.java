package com.reservation.medical_reservation.model.dto;

import com.reservation.medical_reservation.model.enums.RescheduleRequestStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RescheduleRequestDTO {
    private Long id;
    private Long appointmentId;
    private String patientName;
    private String doctorName;
    private String serviceName;
    private LocalDateTime originalDateTime;
    private LocalDateTime requestedDateTime;
    private LocalDateTime requestedEndTime;
    private RescheduleRequestStatus status;
    private String patientReason;
    private String doctorResponse;
    private LocalDateTime createdAt;
    private LocalDateTime respondedAt;
}
