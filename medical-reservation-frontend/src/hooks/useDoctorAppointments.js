import { useState, useEffect, useCallback, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { getDoctorAppointments, updateAppointmentStatus as updateAppointmentStatusAPI } from '../api/appointments';
import { getDoctorByUserId } from '../api/doctors';

export const useDoctorAppointments = () => {
    const [loading, setLoading] = useState(true);
    const [selectedView, setSelectedView] = useState('today');
    const [appointments, setAppointments] = useState([]);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [showNotes, setShowNotes] = useState(false);
    const [notes, setNotes] = useState('');
    const { user } = useAuth();

    useEffect(() => {
        if (user?.id && user?.role === 'DOCTOR') {
            fetchAppointments();
        }
    }, [user?.id, user?.role]);

    const fetchAppointments = async () => {
        try {
            setLoading(true);
            
            const doctorProfile = await getDoctorByUserId(user.id);
            
            if (!doctorProfile?.id) {
                console.error('Doctor profile not found for user');
                setAppointments([]);
                return;
            }
            
            const response = await getDoctorAppointments(doctorProfile.id);
            const transformedAppointments = response.map(appointment => ({
                id: appointment.id,
                patientName: appointment.patientName || 'Unknown Patient',
                patientAge: null, 
                patientPhone: 'N/A', 
                patientEmail: 'N/A', 
                appointmentDate: new Date(appointment.appointmentTime),
                duration: "60 minutes", 
                status: appointment.status?.toLowerCase() || 'pending',
                type: 'Consultation', 
                reason: appointment.notes || 'No reason provided', 
                notes: appointment.notes || '',
                medicalHistory: [],
                lastVisit: null,
                isEmergency: false,
                consultationFee: '$150'
            }));
            setAppointments(transformedAppointments);
        } catch (error) {
            console.error('Error fetching appointments:', error);
            setAppointments([]);
        } finally {
            setLoading(false);
        }
    };

    const getFilteredAppointments = useCallback(() => {
        const today = new Date();
        const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const endOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);

        switch (selectedView) {
            case 'today':
                return appointments.filter(apt => 
                    new Date(apt.appointmentDate) >= startOfToday && new Date(apt.appointmentDate) < endOfToday
                );
            case 'upcoming':
                return appointments.filter(apt => 
                    new Date(apt.appointmentDate) >= endOfToday && apt.status !== 'completed'
                );
            case 'pending':
                return appointments.filter(apt => apt.status === 'pending');
            case 'completed':
                return appointments.filter(apt => apt.status === 'completed');
            default:
                return appointments;
        }
    }, [appointments, selectedView]);

    const getStatusColor = useCallback((status) => {
        switch (status) {
            case 'confirmed':
                return { bg: 'rgba(34, 197, 94, 0.1)', color: '#16a34a', border: 'rgba(34, 197, 94, 0.2)' };
            case 'pending':
                return { bg: 'rgba(251, 191, 36, 0.1)', color: '#d97706', border: 'rgba(251, 191, 36, 0.2)' };
            case 'rescheduled':
                return { bg: 'rgba(59, 130, 246, 0.1)', color: '#2563eb', border: 'rgba(59, 130, 246, 0.2)' };
            case 'cancelled':
                return { bg: 'rgba(239, 68, 68, 0.1)', color: '#dc2626', border: 'rgba(239, 68, 68, 0.2)' };
            default:
                return { bg: 'rgba(107, 114, 128, 0.1)', color: '#374151', border: 'rgba(107, 114, 128, 0.2)' };
        }
    }, []);

    const updateAppointmentStatus = useCallback(async (appointmentId, newStatus) => {
        try {
            await updateAppointmentStatusAPI(appointmentId, newStatus.toUpperCase());
            setAppointments(prev => 
                prev.map(apt => 
                    apt.id === appointmentId 
                        ? { ...apt, status: newStatus.toLowerCase() }
                        : apt
                )
            );
        } catch (error) {
            console.error('Error updating appointment status:', error);
            throw error;
        }
    }, []);

    const addNotes = useCallback((appointmentId, newNotes) => {
        setAppointments(prev => 
            prev.map(apt => 
                apt.id === appointmentId 
                    ? { ...apt, notes: apt.notes ? `${apt.notes}\n\n${newNotes}` : newNotes }
                    : apt
            )
        );
        setShowNotes(false);
        setNotes('');
    }, []);

    const formatTime = useCallback((date) => {
        return new Date(date).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    }, []);

    const formatDate = useCallback((date) => {
        return new Date(date).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }, []);

    const filteredAppointments = useMemo(() => getFilteredAppointments(), [getFilteredAppointments]);

    return {
        loading,
        selectedView,
        setSelectedView,
        appointments,
        selectedAppointment,
        setSelectedAppointment,
        showNotes,
        setShowNotes,
        notes,
        setNotes,
        filteredAppointments,
        getStatusColor,
        updateAppointmentStatus,
        addNotes,
        formatTime,
        formatDate
    };
};
