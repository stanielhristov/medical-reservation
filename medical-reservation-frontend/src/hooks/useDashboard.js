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
            
            const transformedNextAppointment = dashboardData.nextAppointment ? {
                id: dashboardData.nextAppointment.id,
                doctorName: dashboardData.nextAppointment.doctorName || 'Unknown Doctor',
                specialization: dashboardData.nextAppointment.doctorSpecialization || 'General Practice',
                date: new Date(dashboardData.nextAppointment.appointmentTime),
                duration: dashboardData.nextAppointment.duration || "30 minutes",
                status: dashboardData.nextAppointment.status?.toLowerCase() || 'pending',
                type: dashboardData.nextAppointment.serviceName || 'Consultation',
                location: dashboardData.nextAppointment.doctorLocation || 'Medical Center',
                notes: dashboardData.nextAppointment.notes || '',
                doctorImage: "👨‍⚕️",
                consultationFee: dashboardData.nextAppointment.consultationFee ? `$${dashboardData.nextAppointment.consultationFee}` : '$150'
            } : null;

            const transformedRecentAppointments = (dashboardData.recentAppointments || []).map(appointment => ({
                id: appointment.id,
                doctorName: appointment.doctorName || 'Unknown Doctor',
                specialization: appointment.doctorSpecialization || 'General Practice',
                date: new Date(appointment.appointmentTime),
                duration: appointment.duration || "30 minutes",
                status: appointment.status?.toLowerCase() || 'pending',
                type: appointment.serviceName || 'Consultation',
                location: appointment.doctorLocation || 'Medical Center',
                notes: appointment.notes || '',
                doctorImage: "👨‍⚕️",
                consultationFee: appointment.consultationFee ? `$${appointment.consultationFee}` : '$150'
            }));
            
            setNextAppointment(transformedNextAppointment);
            setRecentAppointments(transformedRecentAppointments);
            
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
