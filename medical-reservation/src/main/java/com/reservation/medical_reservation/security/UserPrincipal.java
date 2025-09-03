package com.reservation.medical_reservation.security;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserPrincipal {
    private Long id;
    private String username;
    private String role;
}
