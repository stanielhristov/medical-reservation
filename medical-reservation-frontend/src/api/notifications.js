import api from './axios.js';

// Get user notifications
export const getUserNotifications = async (userId) => {
    try {
        const response = await api.get(`/patient/${userId}/notifications`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data || error.message);
    }
};

// Get unread notifications
export const getUnreadNotifications = async (userId) => {
    try {
        const response = await api.get(`/patient/${userId}/notifications/unread`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data || error.message);
    }
};

// Get unread notification count
export const getUnreadNotificationCount = async (userId) => {
    try {
        const response = await api.get(`/notifications/user/${userId}/count`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data || error.message);
    }
};

// Mark notification as read
export const markNotificationAsRead = async (notificationId) => {
    try {
        await api.patch(`/notifications/${notificationId}/read`);
        return true;
    } catch (error) {
        throw new Error(error.response?.data || error.message);
    }
};

// Mark all notifications as read
export const markAllNotificationsAsRead = async (userId) => {
    try {
        await api.patch(`/notifications/user/${userId}/mark-all-read`);
        return true;
    } catch (error) {
        throw new Error(error.response?.data || error.message);
    }
};
