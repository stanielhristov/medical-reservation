import axiosInstance from './axios';

export const createBlockedSlot = async (blockedSlotData) => {
    const response = await axiosInstance.post('/blocked-slots', blockedSlotData);
    return response.data;
};

export const getDoctorBlockedSlots = async (doctorId) => {
    const response = await axiosInstance.get(`/blocked-slots/doctor/${doctorId}`);
    return response.data;
};

export const getDoctorBlockedSlotsInRange = async (doctorId, startTime, endTime) => {
    const response = await axiosInstance.get(`/blocked-slots/doctor/${doctorId}/range`, {
        params: {
            startTime: startTime,
            endTime: endTime
        }
    });
    return response.data;
};

export const updateBlockedSlot = async (blockedSlotId, blockedSlotData) => {
    const response = await axiosInstance.put(`/blocked-slots/${blockedSlotId}`, blockedSlotData);
    return response.data;
};

export const deleteBlockedSlot = async (blockedSlotId) => {
    await axiosInstance.delete(`/blocked-slots/${blockedSlotId}`);
};

export const isSlotBlocked = async (doctorId, startTime, endTime) => {
    const response = await axiosInstance.get(`/blocked-slots/doctor/${doctorId}/check-blocked`, {
        params: {
            startTime: startTime,
            endTime: endTime
        }
    });
    return response.data;
};
