import api from './axios.js';

export const getPatientMedicalHistory = async (patientId) => {
    try {
        const response = await api.get(`/medical-history/patient/${patientId}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data || error.message);
    }
};

export const getMedicalHistoryById = async (id) => {
    try {
        const response = await api.get(`/medical-history/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data || error.message);
    }
};

export const createMedicalHistory = async (medicalHistoryData) => {
    try {
        const response = await api.post('/medical-history', medicalHistoryData);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data || error.message);
    }
};

export const updateMedicalHistory = async (id, medicalHistoryData) => {
    try {
        const response = await api.put(`/medical-history/${id}`, medicalHistoryData);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data || error.message);
    }
};

export const deleteMedicalHistory = async (id) => {
    try {
        await api.delete(`/medical-history/${id}`);
        return true;
    } catch (error) {
        throw new Error(error.response?.data || error.message);
    }
};

export const getDoctorMedicalRecords = async (doctorId) => {
    try {
        const response = await api.get(`/medical-history/doctor/${doctorId}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data || error.message);
    }
};
