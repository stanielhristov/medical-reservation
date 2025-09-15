import api from './axios.js';

export const getPatientDashboard = async (patientId) => {
    try {
        const response = await api.get(`/patient/${patientId}/dashboard`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data || error.message);
    }
};

export const getPatientAppointments = async (patientId) => {
    try {
        const response = await api.get(`/patient/${patientId}/appointments`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data || error.message);
    }
};

export const getUpcomingPatientAppointments = async (patientId) => {
    try {
        const response = await api.get(`/patient/${patientId}/appointments/upcoming`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data || error.message);
    }
};

export const getNextPatientAppointment = async (patientId) => {
    try {
        const response = await api.get(`/patient/${patientId}/appointments/next`);
        return response.data;
    } catch (error) {
        if (error.response?.status === 204) {
            return null; // No content - no next appointment
        }
        throw new Error(error.response?.data || error.message);
    }
};

export const getAvailableDoctors = async () => {
    try {
        const response = await api.get('/patient/doctors');
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data || error.message);
    }
};

export const searchDoctorsForPatients = async (searchTerm = '', specialization = '') => {
    try {
        const params = new URLSearchParams();
        if (searchTerm) params.append('searchTerm', searchTerm);
        if (specialization) params.append('specialization', specialization);
        
        const response = await api.get(`/patient/doctors/search?${params}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data || error.message);
    }
};

export const getAvailableSpecializationsForPatients = async () => {
    try {
        const response = await api.get('/patient/doctors/specializations');
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data || error.message);
    }
};

export const getDoctorsBySpecializationForPatients = async (specialization) => {
    try {
        const response = await api.get(`/patient/doctors/specialization/${specialization}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data || error.message);
    }
};
