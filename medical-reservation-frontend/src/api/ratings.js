import axiosInstance from './axios';

export const createRating = async (ratingData) => {
    try {
        const response = await axiosInstance.post('/ratings', ratingData);
        return response.data;
    } catch (error) {
        console.error('Error creating rating:', error);
        throw error;
    }
};

export const updateRating = async (ratingId, ratingData) => {
    try {
        const response = await axiosInstance.put(`/ratings/${ratingId}`, ratingData);
        return response.data;
    } catch (error) {
        console.error('Error updating rating:', error);
        throw error;
    }
};

export const deleteRating = async (ratingId) => {
    try {
        await axiosInstance.delete(`/ratings/${ratingId}`);
    } catch (error) {
        console.error('Error deleting rating:', error);
        throw error;
    }
};

export const getDoctorRatings = async (doctorId) => {
    try {
        const response = await axiosInstance.get(`/ratings/doctor/${doctorId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching doctor ratings:', error);
        throw error;
    }
};

export const getDoctorRatingStats = async (doctorId) => {
    try {
        const response = await axiosInstance.get(`/ratings/doctor/${doctorId}/stats`);
        return response.data;
    } catch (error) {
        console.error('Error fetching doctor rating stats:', error);
        throw error;
    }
};

export const getMyRatingForDoctor = async (doctorId) => {
    try {
        const response = await axiosInstance.get(`/ratings/doctor/${doctorId}/my-rating`);
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 404) {
            return null; // User hasn't rated this doctor yet
        }
        console.error('Error fetching my rating for doctor:', error);
        throw error;
    }
};

export const getMyRatings = async () => {
    try {
        const response = await axiosInstance.get('/ratings/my-ratings');
        return response.data;
    } catch (error) {
        console.error('Error fetching my ratings:', error);
        throw error;
    }
};
