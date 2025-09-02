package com.reservation.medical_reservation.service;

import com.reservation.medical_reservation.model.dto.AuthResponseDTO;
import com.reservation.medical_reservation.model.dto.ForgotPasswordDTO;
import com.reservation.medical_reservation.model.dto.LoginDTO;
import com.reservation.medical_reservation.model.dto.ResetPasswordDTO;

public interface AuthService {
    AuthResponseDTO login(LoginDTO loginDTO);
    void forgotPassword(ForgotPasswordDTO forgotPasswordDTO);
    void resetPassword(ResetPasswordDTO resetPasswordDTO);
}
