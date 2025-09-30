import { useState, useEffect, useCallback, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { getDoctorAppointments, updateAppointmentStatus as updateAppointmentStatusAPI, cancelAppointment as cancelAppointmentAPI } from '../api/appointments';
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
            const transformedAppointments = response.map(appointment => {
                // Calculate actual duration from appointmentTime and endTime
                const startTime = new Date(appointment.appointmentTime);
                const endTime = new Date(appointment.endTime);
                const durationMinutes = Math.round((endTime - startTime) / (1000 * 60));
                
                // Parse the notes to separate reason from additional notes
                const parseNotes = (notesText) => {
                    console.log('Parsing notes:', notesText);
                    if (!notesText) return { reason: 'No reason provided', additionalNotes: null };
                    
                    // Split by " | Additional notes: " or similar patterns
                    const parts = notesText.split(/\s*\|\s*Additional notes?:\s*/i);
                    console.log('Split parts:', parts);
                    
                    if (parts.length === 2) {
                        const result = {
                            reason: parts[0].trim() || 'No reason provided',
                            additionalNotes: parts[1].trim() || null
                        };
                        console.log('Parsed result:', result);
                        return result;
                    }
                    
                    // If no additional notes pattern found, treat everything as reason
                    const result = {
                        reason: notesText.trim() || 'No reason provided',
                        additionalNotes: null
                    };
                    console.log('Single reason result:', result);
                    return result;
                };
                
                const { reason, additionalNotes } = parseNotes(appointment.notes);
                
                return {
                    id: appointment.id,
                    patientName: appointment.patientName || 'Unknown Patient',
                    patientAge: appointment.patientAge || null, 
                    patientPhone: appointment.patientPhone || appointment.phone || 'Not provided', 
                    patientEmail: appointment.patientEmail || appointment.email || 'Not provided', 
                    appointmentDate: new Date(appointment.appointmentTime),
                    endTime: new Date(appointment.endTime),
                    duration: `${durationMinutes} minutes`, 
                    status: appointment.status?.toLowerCase() || 'pending',
                    type: appointment.serviceName || 'Consultation', 
                    reason: reason,
                    additionalNotes: additionalNotes,
                    notes: appointment.notes || '',
                    doctorNotes: null, // Doctor's notes are separate from the initial reason
                    medicalHistory: [],
                    lastVisit: null,
                    isEmergency: false,
                    consultationFee: appointment.consultationFee ? `$${appointment.consultationFee}` : '$150'
                };
            });
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

    const cancelAppointment = useCallback(async (appointmentId, reason = null) => {
        try {
            await cancelAppointmentAPI(appointmentId, reason);
            setAppointments(prev => 
                prev.map(apt => 
                    apt.id === appointmentId 
                        ? { ...apt, status: 'cancelled' }
                        : apt
                )
            );
        } catch (error) {
            console.error('Error cancelling appointment:', error);
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
        cancelAppointment,
        addNotes,
        formatTime,
        formatDate
    };
};
