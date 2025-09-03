import api from './axios.js';

export const getUserProfile = async (userId) => {
    try {
        const response = await api.get(`/users/${userId}/profile`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || error.message);
    }
};

export const updateUserProfile = async (userId, profileData) => {
    try {
        const response = await api.put(`/users/${userId}/profile`, profileData);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || error.message);
    }
};

export const changePassword = async (userId, passwordData) => {
    try {
        const response = await api.put(`/users/${userId}/change-password`, passwordData);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || error.message);
    }
};
