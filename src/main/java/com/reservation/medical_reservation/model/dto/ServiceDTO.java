package com.reservation.medical_reservation.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor

public class ServiceDTO {
    private Long id;
    private String name;
    private String description;
    private Double price;
}
