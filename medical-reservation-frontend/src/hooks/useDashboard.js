import { useState, useEffect } from 'react';
import { getPatientDashboard } from '../api/patients';

export const useDashboard = (user) => {
    const [loading, setLoading] = useState(true);
    const [nextAppointment, setNextAppointment] = useState(null);
    const [recentAppointments, setRecentAppointments] = useState([]);

    useEffect(() => {
        fetchDashboardData();
    }, [user]);

    const fetchDashboardData = async () => {
        try {
            if (!user?.id) {
                console.error('User ID not available');
                return;
            }

            const dashboardData = await getPatientDashboard(user.id);
            
            setNextAppointment(dashboardData.nextAppointment || null);
            setRecentAppointments(dashboardData.recentAppointments || []);
            
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            setNextAppointment(null);
            setRecentAppointments([]);
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        nextAppointment,
        recentAppointments,
        refreshData: fetchDashboardData
    };
};
