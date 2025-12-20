import api from './axios.js';

const toLocalISOString = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
};

export const createAppointment = async (appointmentData) => {
    try {
        const response = await api.post('/appointments', appointmentData);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data || error.message);
    }
};

export const getPatientAppointments = async (patientId) => {
    try {
        const response = await api.get(`/appointments/patient/${patientId}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data || error.message);
    }
};

export const getUpcomingPatientAppointments = async (patientId) => {
    try {
        const response = await api.get(`/appointments/patient/${patientId}/upcoming`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data || error.message);
    }
};

export const getNextPatientAppointment = async (patientId) => {
    try {
        const response = await api.get(`/appointments/patient/${patientId}/next`);
        return response.data;
    } catch (error) {
        if (error.response?.status === 204) {
            return null; 
        }
        throw new Error(error.response?.data || error.message);
    }
};

export const getDoctorAppointments = async (doctorId) => {
    try {
        const response = await api.get(`/appointments/doctor/${doctorId}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data || error.message);
    }
};

export const getUpcomingDoctorAppointments = async (doctorId) => {
    try {
        const response = await api.get(`/appointments/doctor/${doctorId}/upcoming`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data || error.message);
    }
};

export const updateAppointmentStatus = async (appointmentId, status, reason = null) => {
    try {
        const params = new URLSearchParams({ status });
        if (reason) params.append('reason', reason);
        
        const response = await api.patch(`/appointments/${appointmentId}/status?${params}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data || error.message);
    }
};

export const cancelAppointment = async (appointmentId, reason = null) => {
    try {
        const params = reason ? `?reason=${encodeURIComponent(reason)}` : '';
        await api.delete(`/appointments/${appointmentId}${params}`);
        return true;
    } catch (error) {
        throw new Error(error.response?.data || error.message);
    }
};

export const checkSlotAvailability = async (doctorId, startTime, endTime) => {
    try {
        const params = new URLSearchParams({
            doctorId,
            startTime: toLocalISOString(startTime),
            endTime: toLocalISOString(endTime)
        });
        
        const response = await api.get(`/appointments/availability/check?${params}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data || error.message);
    }
};
