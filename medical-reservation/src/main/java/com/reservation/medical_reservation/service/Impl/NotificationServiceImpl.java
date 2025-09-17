package com.reservation.medical_reservation.service.Impl;

import com.reservation.medical_reservation.model.dto.NotificationDTO;
import com.reservation.medical_reservation.model.entity.NotificationEntity;
import com.reservation.medical_reservation.model.entity.UserEntity;
import com.reservation.medical_reservation.model.enums.NotificationType;
import com.reservation.medical_reservation.repository.NotificationRepository;
import com.reservation.medical_reservation.repository.UserRepository;
import com.reservation.medical_reservation.service.NotificationService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class NotificationServiceImpl implements NotificationService {

    private final NotificationRepository notificationRepository;
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;

    public NotificationServiceImpl(NotificationRepository notificationRepository, 
                                 UserRepository userRepository, 
                                 ModelMapper modelMapper) {
        this.notificationRepository = notificationRepository;
        this.userRepository = userRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    @Transactional
    public void createNotification(UserEntity user, String title, String message, NotificationType type) {
        NotificationEntity notification = new NotificationEntity();
        notification.setUser(user);
        notification.setTitle(title);
        notification.setMessage(message);
        notification.setType(type);
        notification.setRead(false);
        
        notificationRepository.save(notification);
    }

    @Override
    public List<NotificationDTO> getNotificationsByUser(Long userId) {
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        
        return notificationRepository.findByUserOrderByCreatedAtDesc(user)
                .stream()
                .map(notification -> modelMapper.map(notification, NotificationDTO.class))
                .toList();
    }

    @Override
    public List<NotificationDTO> getUnreadNotificationsByUser(Long userId) {
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        
        return notificationRepository.findByUserAndReadFalseOrderByCreatedAtDesc(user)
                .stream()
                .map(notification -> modelMapper.map(notification, NotificationDTO.class))
                .toList();
    }

    @Override
    @Transactional
    public void markAsRead(Long notificationId, Long userId) {
        NotificationEntity notification = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new IllegalArgumentException("Notification not found"));
        
        if (!notification.getUser().getId().equals(userId)) {
            throw new IllegalArgumentException("Unauthorized access to notification");
        }
        
        notification.setRead(true);
        notificationRepository.save(notification);
    }

    @Override
    @Transactional
    public void markAllAsRead(Long userId) {
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        
        List<NotificationEntity> unreadNotifications = notificationRepository.findByUserAndReadFalseOrderByCreatedAtDesc(user);
        unreadNotifications.forEach(notification -> notification.setRead(true));
        notificationRepository.saveAll(unreadNotifications);
    }

    @Override
    public long getUnreadCount(Long userId) {
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        
        return notificationRepository.countByUserAndReadFalse(user);
    }

    @Override
    public List<NotificationDTO> getUserNotifications(Long userId) {
        return getNotificationsByUser(userId);
    }

    @Override
    public List<NotificationDTO> getUnreadNotifications(Long userId) {
        return getUnreadNotificationsByUser(userId);
    }

    @Override
    @Transactional
    public void markAsRead(Long notificationId) {
        NotificationEntity notification = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new IllegalArgumentException("Notification not found"));
        
        notification.setRead(true);
        notificationRepository.save(notification);
    }

    @Override
    @Transactional
    public void deleteNotification(Long notificationId) {
        NotificationEntity notification = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new IllegalArgumentException("Notification not found"));
        
        notificationRepository.delete(notification);
    }

    @Override
    @Transactional
    public void deleteNotification(Long notificationId, Long userId) {
        NotificationEntity notification = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new IllegalArgumentException("Notification not found"));
        
        if (!notification.getUser().getId().equals(userId)) {
            throw new IllegalArgumentException("Unauthorized access to notification");
        }
        
        notificationRepository.delete(notification);
    }
}
