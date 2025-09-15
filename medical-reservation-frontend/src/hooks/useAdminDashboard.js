import { useState, useEffect, useCallback } from 'react';
import { adminAPI } from '../api/admin';

export const useAdminDashboard = () => {
    const [statistics, setStatistics] = useState({
        totalUsers: 0,
        totalPatients: 0,
        totalDoctors: 0,
        totalAppointments: 0
    });
    const [recentUsers, setRecentUsers] = useState([]);
    const [pendingDoctorRequests, setPendingDoctorRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadDashboardData = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            
            const statsResponse = await adminAPI.getStatistics();
            setStatistics(statsResponse.data);

            const usersResponse = await adminAPI.getAllUsers();
            const sortedUsers = usersResponse.data
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .slice(0, 5);
            setRecentUsers(sortedUsers);

            const doctorRequestsResponse = await adminAPI.getPendingDoctorRequests();
            setPendingDoctorRequests(doctorRequestsResponse.data);

        } catch (err) {
            console.error('Error loading dashboard data:', err);
            setError('Failed to load dashboard data');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadDashboardData();
    }, [loadDashboardData]);

    const formatDate = useCallback((dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }, []);

    const getRoleColor = useCallback((role) => {
        switch (role?.toLowerCase()) {
            case 'doctor':
                return { bg: 'rgba(59, 130, 246, 0.1)', color: '#2563eb', border: 'rgba(59, 130, 246, 0.2)' };
            case 'patient':
                return { bg: 'rgba(34, 197, 94, 0.1)', color: '#16a34a', border: 'rgba(34, 197, 94, 0.2)' };
            case 'admin':
                return { bg: 'rgba(168, 85, 247, 0.1)', color: '#7c3aed', border: 'rgba(168, 85, 247, 0.2)' };
            default:
                return { bg: 'rgba(107, 114, 128, 0.1)', color: '#374151', border: 'rgba(107, 114, 128, 0.2)' };
        }
    }, []);

    const getStatusColor = useCallback((status) => {
        switch (status?.toLowerCase()) {
            case 'active':
                return { bg: 'rgba(34, 197, 94, 0.1)', color: '#16a34a', border: 'rgba(34, 197, 94, 0.2)' };
            case 'pending':
                return { bg: 'rgba(251, 191, 36, 0.1)', color: '#d97706', border: 'rgba(251, 191, 36, 0.2)' };
            case 'inactive':
                return { bg: 'rgba(239, 68, 68, 0.1)', color: '#dc2626', border: 'rgba(239, 68, 68, 0.2)' };
            default:
                return { bg: 'rgba(107, 114, 128, 0.1)', color: '#374151', border: 'rgba(107, 114, 128, 0.2)' };
        }
    }, []);

    return {
        statistics,
        recentUsers,
        pendingDoctorRequests,
        loading,
        error,
        loadDashboardData,
        formatDate,
        getRoleColor,
        getStatusColor
    };
};
