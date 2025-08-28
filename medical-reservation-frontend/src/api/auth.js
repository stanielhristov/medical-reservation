import api from './axios.js';

export const login = async (credentials) => {
    try {
        const response = await api.post('/auth/login', credentials);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data || error.message);
    }
};

export const logout = async () => {
    try {
        const response = await api.post('/auth/logout');
        return response.data;
    } catch (error) {
        // Even if the logout call fails, we should still clear local state
        console.warn('Logout API call failed, but continuing with local logout:', error);
        return { success: true };
    }
};