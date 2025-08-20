package com.reservation.medical_reservation.model.dto;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RegisterDTO {
    private String fullName;
    private String email;
    private String phoneNumber;
    private String password;
    private String role;
}
