import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getPatientAppointments, updateAppointmentStatus as updateAppointmentStatusAPI, cancelAppointment as cancelAppointmentAPI } from '../api/appointments';

export const useAppointments = () => {
    const [loading, setLoading] = useState(true);
    const [appointments, setAppointments] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        if (user?.id) {
            fetchAppointments();
        }
    }, [user?.id]);

    const fetchAppointments = async () => {
        try {
            setLoading(true);
            const response = await getPatientAppointments(user.id);
            const transformedAppointments = response.map(appointment => ({
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
                consultationFee: appointment.consultationFee ? `$${appointment.consultationFee}` : '$150',
                bookingDate: new Date(appointment.createdAt || appointment.appointmentTime)
            }));
            setAppointments(transformedAppointments);
        } catch (error) {
            console.error('Error fetching appointments:', error);
            setAppointments([]); 
        } finally {
            setLoading(false);
        }
    };

    const getFilteredAppointments = (selectedTab) => {
        const now = new Date();
        switch (selectedTab) {
            case 'upcoming':
                return appointments.filter(apt => 
                    apt.date > now && apt.status !== 'cancelled'
                );
            case 'past':
                return appointments.filter(apt => 
                    apt.date <= now && apt.status !== 'cancelled'
                );
            case 'cancelled':
                return appointments.filter(apt => apt.status === 'cancelled');
            default:
                return appointments;
        }
    };

    const handleCancelAppointment = async (appointment, reason = null) => {
        try {
            await cancelAppointmentAPI(appointment.id, reason);
            setAppointments(prev => 
                prev.map(apt => 
                    apt.id === appointment.id 
                        ? { ...apt, status: 'cancelled' } 
                        : apt
                )
            );
        } catch (error) {
            console.error('Error cancelling appointment:', error);
            throw error;
        }
    };

    const handleRescheduleAppointment = async (appointmentId, newDate) => {
        try {
        
            await updateAppointmentStatusAPI(appointmentId, 'SCHEDULED');
            setAppointments(prev => 
                prev.map(apt => 
                    apt.id === appointmentId 
                        ? { ...apt, date: newDate, status: 'confirmed' } 
                        : apt
                )
            );
        } catch (error) {
            console.error('Error rescheduling appointment:', error);
            throw error;
        }
    };

    return {
        loading,
        appointments,
        getFilteredAppointments,
        handleCancelAppointment,
        handleRescheduleAppointment
    };
};
