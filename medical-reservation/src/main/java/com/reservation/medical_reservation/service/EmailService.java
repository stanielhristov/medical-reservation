package com.reservation.medical_reservation.service;

public interface EmailService {
    void sendPasswordResetEmail(String toEmail, String resetToken, String userFullName);
    void sendPasswordResetConfirmationEmail(String toEmail, String userFullName);
}
