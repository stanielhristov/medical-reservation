import api from './axios.js';

// Get doctor's schedule
export const getDoctorSchedule = async (doctorId) => {
    try {
        const response = await api.get(`/schedules/doctor/${doctorId}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data || error.message);
    }
};

// Get available slots for a doctor within a date range
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

// Create new schedule slot
export const createSchedule = async (scheduleData) => {
    try {
        const response = await api.post('/schedules', scheduleData);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data || error.message);
    }
};

// Update existing schedule slot
export const updateSchedule = async (scheduleId, scheduleData) => {
    try {
        const response = await api.put(`/schedules/${scheduleId}`, scheduleData);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data || error.message);
    }
};

// Delete schedule slot
export const deleteSchedule = async (scheduleId) => {
    try {
        await api.delete(`/schedules/${scheduleId}`);
        return true;
    } catch (error) {
        throw new Error(error.response?.data || error.message);
    }
};

// Mark slot as unavailable
export const markSlotUnavailable = async (scheduleId) => {
    try {
        const response = await api.patch(`/schedules/${scheduleId}/unavailable`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data || error.message);
    }
};

// Mark slot as available
export const markSlotAvailable = async (scheduleId) => {
    try {
        const response = await api.patch(`/schedules/${scheduleId}/available`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data || error.message);
    }
};
