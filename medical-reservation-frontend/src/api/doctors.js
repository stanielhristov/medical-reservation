import api from './axios.js';

// Get all active doctors
export const getActiveDoctors = async () => {
    try {
        const response = await api.get('/doctors');
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data || error.message);
    }
};

// Get doctor by ID
export const getDoctorById = async (doctorId) => {
    try {
        const response = await api.get(`/doctors/${doctorId}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data || error.message);
    }
};

// Get doctor by user ID
export const getDoctorByUserId = async (userId) => {
    try {
        const response = await api.get(`/doctors/user/${userId}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data || error.message);
    }
};

// Search doctors
export const searchDoctors = async (searchTerm = '', specialization = '') => {
    try {
        const params = new URLSearchParams();
        if (searchTerm) params.append('searchTerm', searchTerm);
        if (specialization) params.append('specialization', specialization);
        
        const response = await api.get(`/doctors/search?${params}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data || error.message);
    }
};

// Get doctors by specialization
export const getDoctorsBySpecialization = async (specialization) => {
    try {
        const response = await api.get(`/doctors/specialization/${specialization}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data || error.message);
    }
};

// Get available specializations
export const getAvailableSpecializations = async () => {
    try {
        const response = await api.get('/doctors/specializations');
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data || error.message);
    }
};

// Get doctor dashboard data
export const getDoctorDashboard = async (doctorId) => {
    try {
        const response = await api.get(`/doctors/${doctorId}/dashboard`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data || error.message);
    }
};

// Get doctor patients
export const getDoctorPatients = async (doctorId) => {
    try {
        const response = await api.get(`/doctors/${doctorId}/patients`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data || error.message);
    }
};

// Update doctor profile
export const updateDoctor = async (doctorId, doctorData) => {
    try {
        const response = await api.put(`/doctors/${doctorId}`, doctorData);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data || error.message);
    }
};
