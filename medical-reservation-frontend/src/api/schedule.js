import api from './axios.js';

export const getDoctorSchedule = async (doctorId) => {
    try {
        const response = await api.get(`/schedules/doctor/${doctorId}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data || error.message);
    }
};

export const getAvailableSlots = async (doctorId, startDate, endDate) => {
    try {
        const response = await api.get(`/schedules/available/${doctorId}`, {
            params: {
                startDate: startDate.toISOString(),
                endDate: endDate.toISOString()
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data || error.message);
    }
};

export const createSchedule = async (scheduleData) => {
    try {
        const response = await api.post('/schedules', scheduleData);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data || error.message);
    }
};

export const updateSchedule = async (scheduleId, scheduleData) => {
    try {
        const response = await api.put(`/schedules/${scheduleId}`, scheduleData);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data || error.message);
    }
};

export const deleteSchedule = async (scheduleId) => {
    try {
        await api.delete(`/schedules/${scheduleId}`);
        return true;
    } catch (error) {
        throw new Error(error.response?.data || error.message);
    }
};

export const markSlotUnavailable = async (scheduleId) => {
    try {
        const response = await api.patch(`/schedules/${scheduleId}/unavailable`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data || error.message);
    }
};

export const markSlotAvailable = async (scheduleId) => {
    try {
        const response = await api.patch(`/schedules/${scheduleId}/available`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data || error.message);
    }
};

export const getDoctorScheduleWithStatus = async (doctorId, startDate, endDate) => {
    try {
        const response = await api.get(`/schedules/doctor/${doctorId}/with-status`, {
            params: {
                startDate: startDate,
                endDate: endDate
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data || error.message);
    }
};

export const getDoctorScheduleWithStatusForDoctor = async (doctorId, startDate, endDate) => {
    try {
        const response = await api.get(`/schedules/doctor/${doctorId}/with-status-for-doctor`, {
            params: {
                startDate: startDate,
                endDate: endDate
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data || error.message);
    }
};

export const generateScheduleFromAvailability = async (doctorId, startDate, endDate) => {
    try {
        await api.post(`/schedules/doctor/${doctorId}/generate-from-availability`, null, {
            params: {
                startDate: startDate,
                endDate: endDate
            }
        });
    } catch (error) {
        throw new Error(error.response?.data || error.message);
    }
};

export const deleteMultipleSchedules = async (scheduleIds) => {
    try {
        console.log('Deleting schedule IDs:', scheduleIds);
        console.log('Request URL:', '/schedules/delete-multiple');
        console.log('Request payload:', { scheduleIds });
        
        const response = await api.post('/schedules/delete-multiple', { scheduleIds });
        console.log('Delete response:', response);
        return true;
    } catch (error) {
        console.error('Full error object:', error);
        console.error('Error response:', error.response);
        console.error('Error status:', error.response?.status);
        console.error('Error data:', error.response?.data);
        console.error('Error message:', error.message);
        
        const errorMessage = error.response?.data?.message || 
                           error.response?.data || 
                           error.message || 
                           'Unknown error occurred';
        
        throw new Error(errorMessage);
    }
};
