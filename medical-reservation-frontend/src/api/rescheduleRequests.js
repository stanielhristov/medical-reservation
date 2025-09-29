import api from './axios.js';

export const createRescheduleRequest = async (appointmentId, requestedDateTime, requestedEndTime, patientReason = null) => {
    try {
        const params = new URLSearchParams({
            appointmentId: appointmentId.toString(),
            requestedDateTime: requestedDateTime.toISOString(),
            requestedEndTime: requestedEndTime.toISOString()
        });
        
        if (patientReason) {
            params.append('patientReason', patientReason);
        }
        
        const response = await api.post(`/reschedule-requests?${params}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data || error.message);
    }
};

export const getPatientRescheduleRequests = async (patientId) => {
    try {
        const response = await api.get(`/reschedule-requests/patient/${patientId}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data || error.message);
    }
};

export const getDoctorRescheduleRequests = async (doctorId) => {
    try {
        const response = await api.get(`/reschedule-requests/doctor/${doctorId}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data || error.message);
    }
};

export const getPendingRescheduleRequestsForDoctor = async (doctorId) => {
    try {
        const response = await api.get(`/reschedule-requests/doctor/${doctorId}/pending`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data || error.message);
    }
};

export const respondToRescheduleRequest = async (requestId, status, doctorResponse = null) => {
    try {
        const params = new URLSearchParams({ status });
        if (doctorResponse) {
            params.append('doctorResponse', doctorResponse);
        }
        
        const response = await api.patch(`/reschedule-requests/${requestId}/respond?${params}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data || error.message);
    }
};

export const getRescheduleRequestById = async (requestId) => {
    try {
        const response = await api.get(`/reschedule-requests/${requestId}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data || error.message);
    }
};

export const cancelRescheduleRequest = async (requestId) => {
    try {
        await api.delete(`/reschedule-requests/${requestId}`);
        return true;
    } catch (error) {
        throw new Error(error.response?.data || error.message);
    }
};

export const countPendingRequestsForDoctor = async (doctorId) => {
    try {
        const response = await api.get(`/reschedule-requests/doctor/${doctorId}/pending/count`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data || error.message);
    }
};
