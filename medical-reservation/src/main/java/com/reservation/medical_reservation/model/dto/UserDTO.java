package com.reservation.medical_reservation.model.dto;

import lombok.*;


@Data
@AllArgsConstructor
@NoArgsConstructor

public class UserDTO {

    private Long id;
    private String email;
    private String fullName;
    private String role;


}
