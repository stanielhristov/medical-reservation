import { useState, useEffect, useCallback } from 'react';
import { getDoctorDashboard, getDoctorByUserId } from '../api/doctors';

export const useDoctorDashboard = (user) => {
    const [loading, setLoading] = useState(true);
    const [todayAppointments, setTodayAppointments] = useState([]);
    const [upcomingAppointments, setUpcomingAppointments] = useState([]);
    const [dashboardStats, setDashboardStats] = useState({});

    const fetchDashboardData = useCallback(async () => {
        try {
            if (!user?.id) {
                console.error('User ID not available');
                return;
            }

            const doctorProfile = await getDoctorByUserId(user.id);
            
            if (!doctorProfile?.id) {
                console.error('Doctor profile not found');
                return;
            }

            const dashboardData = await getDoctorDashboard(doctorProfile.id);
            
            setTodayAppointments(dashboardData.todayAppointments || []);
            setUpcomingAppointments(dashboardData.upcomingAppointments || []);
            
            const stats = dashboardData.statistics || {};
            setDashboardStats(stats);
            
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            setTodayAppointments([]);
            setUpcomingAppointments([]);
            setDashboardStats({});
        } finally {
            setLoading(false);
        }
    }, [user?.id]);

    useEffect(() => {
        fetchDashboardData();
    }, [fetchDashboardData]);

    const formatTime = useCallback((dateString) => {
        if (!dateString) return '';
        return new Date(dateString).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    }, []);

    const formatDate = useCallback((dateString) => {
        if (!dateString) return '';
        return new Date(dateString).toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'short',
            day: 'numeric'
        });
    }, []);

    const getStatusColor = useCallback((status) => {
        switch (status?.toLowerCase()) {
            case 'confirmed':
                return { bg: 'rgba(34, 197, 94, 0.1)', color: '#16a34a', border: 'rgba(34, 197, 94, 0.2)' };
            case 'pending':
                return { bg: 'rgba(251, 191, 36, 0.1)', color: '#d97706', border: 'rgba(251, 191, 36, 0.2)' };
            case 'completed':
                return { bg: 'rgba(59, 130, 246, 0.1)', color: '#2563eb', border: 'rgba(59, 130, 246, 0.2)' };
            default:
                return { bg: 'rgba(107, 114, 128, 0.1)', color: '#374151', border: 'rgba(107, 114, 128, 0.2)' };
        }
    }, []);

    return {
        loading,
        todayAppointments,
        upcomingAppointments,
        dashboardStats,
        formatTime,
        formatDate,
        getStatusColor,
        refetchData: fetchDashboardData
    };
};
