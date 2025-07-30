package com.reservation.medical_reservation.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AppointmentDTO {
    private Long id;
    private Long patientId;
    private Long doctorId;
    private Long serviceId;
    private LocalDateTime appointmentTime;
    private String status;
}
