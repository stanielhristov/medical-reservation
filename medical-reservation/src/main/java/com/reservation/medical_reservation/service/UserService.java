package com.reservation.medical_reservation.service;

import com.reservation.medical_reservation.model.dto.ChangePasswordDTO;
import com.reservation.medical_reservation.model.dto.DoctorDTO;
import com.reservation.medical_reservation.model.dto.RegisterDTO;
import com.reservation.medical_reservation.model.dto.UserDTO;

public interface UserService {

    void registerUser(RegisterDTO registerDTO);
    UserDTO getUserData(String email);
    DoctorDTO getDoctorData(String email);
    UserDTO getUserProfile(Long userId);
    UserDTO updateUserProfile(Long userId, UserDTO userDTO);
    void changePassword(Long userId, ChangePasswordDTO changePasswordDTO);
    UserDTO getUserById(Long userId);
}
