package com.reservation.medical_reservation.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BlockedSlotDTO {
    private Long id;
    private Long doctorId;
    private String doctorName;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private String reason;
}
