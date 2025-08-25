package com.reservation.medical_reservation.service;

import com.reservation.medical_reservation.model.dto.AuthResponseDTO;
import com.reservation.medical_reservation.model.dto.LoginDTO;

public interface AuthService {
    AuthResponseDTO login(LoginDTO loginDTO);
}
