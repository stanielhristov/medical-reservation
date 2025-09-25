import axiosInstance from './axios';

export const createDoctorAvailability = async (availabilityData) => {
    const response = await axiosInstance.post('/doctor-availability', availabilityData);
    return response.data;
};

export const getDoctorAvailability = async (doctorId) => {
    const response = await axiosInstance.get(`/doctor-availability/doctor/${doctorId}`);
    return response.data;
};

export const getDoctorAvailabilityForDay = async (doctorId, dayOfWeek) => {
    const response = await axiosInstance.get(`/doctor-availability/doctor/${doctorId}/day/${dayOfWeek}`);
    return response.data;
};

export const updateDoctorAvailability = async (availabilityId, availabilityData) => {
    const response = await axiosInstance.put(`/doctor-availability/${availabilityId}`, availabilityData);
    return response.data;
};

export const deleteDoctorAvailability = async (availabilityId) => {
    await axiosInstance.delete(`/doctor-availability/${availabilityId}`);
};

export const deleteDoctorAvailabilityForDay = async (doctorId, dayOfWeek) => {
    await axiosInstance.delete(`/doctor-availability/doctor/${doctorId}/day/${dayOfWeek}`);
};

export const generateSlotsFromAvailability = async (doctorId, startDate, endDate) => {
    const response = await axiosInstance.post(
        `/doctor-availability/doctor/${doctorId}/generate-slots`,
        null,
        {
            params: {
                startDate: startDate,
                endDate: endDate
            }
        }
    );
    return response.data;
};
