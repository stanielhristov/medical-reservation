import axios from './axios';

export const adminAPI = {
    getAllUsers: () => axios.get('/admin/users'),
    getUserById: (userId) => axios.get(`/admin/users/${userId}`),
    updateUserRole: (userId, roleName) => 
        axios.patch(`/admin/users/${userId}/role?roleName=${roleName}`),
    deactivateUser: (userId) => axios.patch(`/admin/users/${userId}/deactivate`),
    activateUser: (userId) => axios.patch(`/admin/users/${userId}/activate`),
    deleteUser: (userId) => axios.delete(`/admin/users/${userId}`),

    getAllDoctorRequests: () => axios.get('/admin/doctor-requests'),
    getPendingDoctorRequests: () => axios.get('/admin/doctor-requests/pending'),
    approveDoctorRequest: (requestId, adminId) => 
        axios.patch(`/admin/doctor-requests/${requestId}/approve?adminId=${adminId}`),
    rejectDoctorRequest: (requestId, adminId, reason) => 
        axios.patch(`/admin/doctor-requests/${requestId}/reject?adminId=${adminId}&reason=${encodeURIComponent(reason)}`),

    getStatistics: () => axios.get('/admin/statistics'),
    getTotalUsers: () => axios.get('/admin/statistics/users'),
    getTotalPatients: () => axios.get('/admin/statistics/patients'),
    getTotalDoctors: () => axios.get('/admin/statistics/doctors'),
    getTotalAppointments: () => axios.get('/admin/statistics/appointments'),
    getAllAppointments: () => axios.get('/admin/appointments'),

    getAllRatings: (page = 0, size = 10) => 
        axios.get(`/admin/ratings?page=${page}&size=${size}`),
    deleteRating: (ratingId) => axios.delete(`/admin/ratings/${ratingId}`),
};
