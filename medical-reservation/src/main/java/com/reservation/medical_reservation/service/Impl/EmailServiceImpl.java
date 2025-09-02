package com.reservation.medical_reservation.service.Impl;

import com.reservation.medical_reservation.service.EmailService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailServiceImpl implements EmailService {

    private final JavaMailSender mailSender;
    
    @Value("${app.frontend.url}")
    private String frontendUrl;
    
    @Value("${spring.mail.username}")
    private String fromEmail;

    public EmailServiceImpl(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    @Override
    public void sendPasswordResetEmail(String toEmail, String resetToken, String userFullName) {
        String resetUrl = frontendUrl + "/reset-password?token=" + resetToken;
        
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(fromEmail);
        message.setTo(toEmail);
        message.setSubject("Password Reset Request - Medical Reservation Portal");
        
        String emailContent = String.format(
            "Dear %s,\n\n" +
            "We received a request to reset your password for your Medical Reservation Portal account.\n\n" +
            "To reset your password, please click the link below:\n" +
            "%s\n\n" +
            "This link will expire in 1 hour for security reasons.\n\n" +
            "If you did not request this password reset, please ignore this email. " +
            "Your password will remain unchanged.\n\n" +
            "For security reasons, do not share this link with anyone.\n\n" +
            "Best regards,\n" +
            "Medical Reservation Portal Team",
            userFullName,
            resetUrl
        );
        
        message.setText(emailContent);
        
        try {
            mailSender.send(message);
            System.out.println("✅ Password reset email sent successfully to: " + toEmail);
        } catch (Exception e) {
            System.err.println("❌ Failed to send password reset email to: " + toEmail);
            System.err.println("Error: " + e.getMessage());
            throw new RuntimeException("Failed to send password reset email", e);
        }
    }

    @Override
    public void sendPasswordResetConfirmationEmail(String toEmail, String userFullName) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(fromEmail);
        message.setTo(toEmail);
        message.setSubject("Password Reset Successful - Medical Reservation Portal");
        
        String emailContent = String.format(
            "Dear %s,\n\n" +
            "Your password has been successfully reset for your Medical Reservation Portal account.\n\n" +
            "If you did not make this change, please contact our support team immediately.\n\n" +
            "For your security:\n" +
            "- Never share your password with anyone\n" +
            "- Use a strong, unique password\n" +
            "- Log out from shared devices\n\n" +
            "You can now log in with your new password at: %s/login\n\n" +
            "Best regards,\n" +
            "Medical Reservation Portal Team",
            userFullName,
            frontendUrl
        );
        
        message.setText(emailContent);
        
        try {
            mailSender.send(message);
            System.out.println("✅ Password reset confirmation email sent successfully to: " + toEmail);
        } catch (Exception e) {
            System.err.println("❌ Failed to send password reset confirmation email to: " + toEmail);
            System.err.println("Error: " + e.getMessage());

            System.err.println("Warning: Password was reset successfully but confirmation email failed");
        }
    }
}
