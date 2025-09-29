package com.reservation.medical_reservation.service;

import com.reservation.medical_reservation.model.dto.RescheduleRequestDTO;
import com.reservation.medical_reservation.model.enums.RescheduleRequestStatus;

import java.time.LocalDateTime;
import java.util.List;

public interface RescheduleRequestService {
    RescheduleRequestDTO createRescheduleRequest(Long appointmentId, LocalDateTime requestedDateTime, LocalDateTime requestedEndTime, String patientReason);
    List<RescheduleRequestDTO> getPatientRescheduleRequests(Long patientId);
    List<RescheduleRequestDTO> getDoctorRescheduleRequests(Long doctorId);
    List<RescheduleRequestDTO> getPendingRescheduleRequestsForDoctor(Long doctorId);
    RescheduleRequestDTO respondToRescheduleRequest(Long requestId, RescheduleRequestStatus status, String doctorResponse);
    RescheduleRequestDTO getRescheduleRequestById(Long requestId);
    void cancelRescheduleRequest(Long requestId);
    long countPendingRequestsForDoctor(Long doctorId);
}
