package com.reservation.medical_reservation.service;

import com.reservation.medical_reservation.model.dto.NotificationDTO;
import com.reservation.medical_reservation.model.entity.UserEntity;
import com.reservation.medical_reservation.model.enums.NotificationType;

import java.util.List;

public interface NotificationService {
    void createNotification(UserEntity user, String title, String message, NotificationType type);
    List<NotificationDTO> getNotificationsByUser(Long userId);
    List<NotificationDTO> getUserNotifications(Long userId);
    List<NotificationDTO> getUnreadNotificationsByUser(Long userId);
    List<NotificationDTO> getUnreadNotifications(Long userId);
    void markAsRead(Long notificationId, Long userId);
    void markAsRead(Long notificationId);
    void markAllAsRead(Long userId);
    long getUnreadCount(Long userId);
    void deleteNotification(Long notificationId);
    void deleteNotification(Long notificationId, Long userId);
}
