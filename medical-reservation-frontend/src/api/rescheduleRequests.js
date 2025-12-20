import api from './axios.js';

const handleApiError = (error) => {
    console.error('API Error:', error.response?.data || error.message);
    
    if (error.response?.data) {
        if (typeof error.response.data === 'string') {
            return error.response.data;
        } else if (error.response.data.message) {
            return error.response.data.message;
        } else if (error.response.data.error) {
            return error.response.data.error;
        } else {
            return JSON.stringify(error.response.data);
        }
    }
    
    return error.message || 'An unexpected error occurred';
};

const toLocalISOString = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
};

export const createRescheduleRequest = async (appointmentId, requestedDateTime, requestedEndTime, patientReason = null) => {
    try {
        
        const localStartTime = toLocalISOString(requestedDateTime);
        const localEndTime = toLocalISOString(requestedEndTime);
        
        console.log('API call parameters:', {
            appointmentId,
            requestedDateTime: localStartTime,
            requestedEndTime: localEndTime,
            patientReason
        });
        
        const token = localStorage.getItem('token');
        console.log('Auth token exists:', !!token);
        
        const params = new URLSearchParams({
            appointmentId: appointmentId.toString(),
            requestedDateTime: localStartTime,
            requestedEndTime: localEndTime
        });
        
        if (patientReason) {
            params.append('patientReason', patientReason);
        }
        
        console.log('Making API call to:', `/reschedule-requests?${params}`);
        const response = await api.post(`/reschedule-requests?${params}`);
        return response.data;
    } catch (error) {
        throw new Error(handleApiError(error));
    }
};

export const getPatientRescheduleRequests = async (patientId) => {
    try {
        const response = await api.get(`/reschedule-requests/patient/${patientId}`);
        return response.data;
    } catch (error) {
        throw new Error(handleApiError(error));
    }
};

export const getDoctorRescheduleRequests = async (doctorId) => {
    try {
        const response = await api.get(`/reschedule-requests/doctor/${doctorId}`);
        return response.data;
    } catch (error) {
        throw new Error(handleApiError(error));
    }
};

export const getPendingRescheduleRequestsForDoctor = async (doctorId) => {
    try {
        const response = await api.get(`/reschedule-requests/doctor/${doctorId}/pending`);
        return response.data;
    } catch (error) {
        throw new Error(handleApiError(error));
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
        throw new Error(handleApiError(error));
    }
};

export const getRescheduleRequestById = async (requestId) => {
    try {
        const response = await api.get(`/reschedule-requests/${requestId}`);
        return response.data;
    } catch (error) {
        throw new Error(handleApiError(error));
    }
};

export const cancelRescheduleRequest = async (requestId) => {
    try {
        await api.delete(`/reschedule-requests/${requestId}`);
        return true;
    } catch (error) {
        throw new Error(handleApiError(error));
    }
};

export const countPendingRequestsForDoctor = async (doctorId) => {
    try {
        const response = await api.get(`/reschedule-requests/doctor/${doctorId}/pending/count`);
        return response.data;
    } catch (error) {
        throw new Error(handleApiError(error));
    }
};
