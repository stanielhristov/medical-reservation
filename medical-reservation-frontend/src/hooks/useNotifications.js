import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
    getUserNotifications, 
    markNotificationAsRead as markAsReadAPI, 
    markAllNotificationsAsRead as markAllAsReadAPI 
} from '../api/notifications';

export const useNotifications = () => {
    const [loading, setLoading] = useState(true);
    const [notifications, setNotifications] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        if (user?.id) {
            fetchNotifications();
        }
    }, [user?.id]);

    const fetchNotifications = async () => {
        try {
            setLoading(true);
            const response = await getUserNotifications(user.id);
            // Transform backend data to match frontend structure
            const transformedNotifications = response.map(notification => ({
                id: notification.id,
                title: notification.title || notification.subject || 'Notification',
                message: notification.message || notification.content || '',
                category: mapCategoryFromBackend(notification.type),
                type: notification.type?.toLowerCase() || 'update',
                priority: notification.priority?.toLowerCase() || 'medium',
                isRead: notification.isRead || false,
                timestamp: new Date(notification.createdAt || notification.timestamp),
                actionRequired: notification.actionRequired || false,
                actionText: notification.actionText || null,
                details: notification.details || {}
            }));
            setNotifications(transformedNotifications);
        } catch (error) {
            console.error('Error fetching notifications:', error);
            setNotifications([]);
        } finally {
            setLoading(false);
        }
    };

    // Helper function to map backend types to frontend categories
    const mapCategoryFromBackend = (backendType) => {
        switch (backendType?.toLowerCase()) {
            case 'appointment_reminder':
            case 'appointment_confirmation':
            case 'appointment_cancellation':
                return 'appointments';
            case 'test_result':
            case 'lab_result':
            case 'medical_update':
                return 'health';
            case 'prescription_reminder':
            case 'medication_reminder':
            case 'checkup_reminder':
                return 'reminders';
            case 'system_alert':
            case 'maintenance':
                return 'system';
            default:
                return 'general';
        }
    };

    const markAsRead = async (notificationId) => {
        try {
            await markAsReadAPI(notificationId);
            setNotifications(prev =>
                prev.map(notification =>
                    notification.id === notificationId
                        ? { ...notification, isRead: true }
                        : notification
                )
            );
        } catch (error) {
            console.error('Error marking notification as read:', error);
            throw error;
        }
    };

    const markAllAsRead = async () => {
        try {
            await markAllAsReadAPI(user.id);
            setNotifications(prev =>
                prev.map(notification => ({ ...notification, isRead: true }))
            );
        } catch (error) {
            console.error('Error marking all notifications as read:', error);
            throw error;
        }
    };

    const deleteNotification = (notificationId) => {
        // Note: This would need a delete notification API endpoint
        // For now, we'll just remove it locally
        setNotifications(prev =>
            prev.filter(notification => notification.id !== notificationId)
        );
    };

    const getFilteredNotifications = (selectedCategory) => {
        if (selectedCategory === 'all') return notifications;
        return notifications.filter(notification => notification.category === selectedCategory);
    };

    return {
        loading,
        notifications,
        markAsRead,
        markAllAsRead,
        deleteNotification,
        getFilteredNotifications,
        refetchNotifications: fetchNotifications
    };
};
