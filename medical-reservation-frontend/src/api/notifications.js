import api from './axios.js';

export const getUserNotifications = async (userId) => {
    try {
        const response = await api.get(`/patient/${userId}/notifications`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data || error.message);
    }
};

export const getUnreadNotifications = async (userId) => {
    try {
        const response = await api.get(`/patient/${userId}/notifications/unread`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data || error.message);
    }
};

export const getUnreadNotificationCount = async (userId) => {
    try {
        const response = await api.get(`/notifications/user/${userId}/count`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data || error.message);
    }
};

export const markNotificationAsRead = async (notificationId) => {
    try {
        await api.patch(`/notifications/${notificationId}/read`);
        return true;
    } catch (error) {
        throw new Error(error.response?.data || error.message);
    }
};

export const markAllNotificationsAsRead = async (userId) => {
    try {
        await api.patch(`/notifications/user/${userId}/mark-all-read`);
        return true;
    } catch (error) {
        throw new Error(error.response?.data || error.message);
    }
};
