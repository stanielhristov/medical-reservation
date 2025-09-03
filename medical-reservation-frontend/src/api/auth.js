import api from './axios.js';

export const login = async (credentials) => {
    try {
        const response = await api.post('/auth/login', credentials);
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || error.response?.data || error.message;
        throw new Error(errorMessage);
    }
};

export const logout = async () => {
    try {
        const response = await api.post('/auth/logout');
        return response.data;
    } catch (error) {
        console.warn('Logout API call failed, but continuing with local logout:', error);
        return { success: true };
    }
};

export const forgotPassword = async (email) => {
    try {
        const response = await api.post('/auth/forgot-password', { email });
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || error.response?.data || error.message;
        throw new Error(errorMessage);
    }
};

export const resetPassword = async (token, newPassword, confirmPassword) => {
    try {
        const response = await api.post('/auth/reset-password', {
            token,
            newPassword,
            confirmPassword
        });
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || error.response?.data || error.message;
        throw new Error(errorMessage);
    }
};