package com.reservation.medical_reservation.model.dto;

import com.reservation.medical_reservation.model.enums.AppointmentStatus;
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
    private String patientName;
    private String patientEmail;
    private String patientPhone;
    private Integer patientAge;
    private Long doctorId;
    private String doctorName;
    private String doctorSpecialization;
    private Long serviceId;
    private String serviceName;
    private LocalDateTime appointmentTime;
    private LocalDateTime endTime;
    private AppointmentStatus status;
    private String notes;
    private String cancellationReason;
    private String doctorLocation;
    private Integer consultationFee;
}
