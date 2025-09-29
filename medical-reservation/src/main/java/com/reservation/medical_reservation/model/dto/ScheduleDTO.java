package com.reservation.medical_reservation.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ScheduleDTO {
    private Long id;
    private Long doctorId;
    private String doctorName;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private boolean available;
    private String status; 
    private String blockedReason; 
    private Long appointmentId; 
    private String patientName; // Name of the patient who booked the slot
    private Long patientId; // ID of the patient who booked the slot
}
