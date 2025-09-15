import { useState, useEffect, useCallback, useMemo } from 'react';

export const useDoctorAppointments = () => {
    const [loading, setLoading] = useState(true);
    const [selectedView, setSelectedView] = useState('today');
    const [appointments, setAppointments] = useState([]);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [showNotes, setShowNotes] = useState(false);
    const [notes, setNotes] = useState('');

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        try {
            setAppointments([
                {
                    id: 1,
                    patientName: "John Smith",
                    patientAge: 45,
                    patientPhone: "(555) 123-4567",
                    patientEmail: "john.smith@email.com",
                    appointmentDate: new Date(Date.now() + 2 * 60 * 60 * 1000),
                    duration: "30 minutes",
                    status: "confirmed",
                    type: "Follow-up",
                    reason: "Blood pressure medication review",
                    notes: "Patient reports feeling better since starting new medication. Check BP levels.",
                    medicalHistory: ["Hypertension", "Type 2 Diabetes"],
                    lastVisit: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
                    isEmergency: false,
                    consultationFee: "$150"
                },
                {
                    id: 2,
                    patientName: "Sarah Johnson",
                    patientAge: 32,
                    patientPhone: "(555) 234-5678",
                    patientEmail: "sarah.johnson@email.com",
                    appointmentDate: new Date(Date.now() + 4 * 60 * 60 * 1000),
                    duration: "45 minutes",
                    status: "confirmed",
                    type: "Consultation",
                    reason: "Chest pain and shortness of breath",
                    notes: "Patient experienced chest pain during exercise. Requesting cardiac evaluation.",
                    medicalHistory: ["No significant history"],
                    lastVisit: null,
                    isEmergency: true,
                    consultationFee: "$200"
                },
                {
                    id: 3,
                    patientName: "Michael Davis",
                    patientAge: 28,
                    patientPhone: "(555) 345-6789",
                    patientEmail: "michael.davis@email.com",
                    appointmentDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
                    duration: "30 minutes",
                    status: "pending",
                    type: "Check-up",
                    reason: "Annual physical examination",
                    notes: "Healthy young adult requesting routine checkup.",
                    medicalHistory: ["Allergies to penicillin"],
                    lastVisit: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000),
                    isEmergency: false,
                    consultationFee: "$120"
                },
                {
                    id: 4,
                    patientName: "Emily Wilson",
                    patientAge: 55,
                    patientPhone: "(555) 456-7890",
                    patientEmail: "emily.wilson@email.com",
                    appointmentDate: new Date(Date.now() - 2 * 60 * 60 * 1000),
                    duration: "45 minutes",
                    status: "completed",
                    type: "Treatment",
                    reason: "Cardiac catheterization follow-up",
                    notes: "Post-procedure recovery excellent. Patient cleared for normal activities.",
                    medicalHistory: ["Coronary Artery Disease", "Hypertension"],
                    lastVisit: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
                    isEmergency: false,
                    consultationFee: "$250"
                },
                {
                    id: 5,
                    patientName: "Robert Brown",
                    patientAge: 67,
                    patientPhone: "(555) 567-8901",
                    patientEmail: "robert.brown@email.com",
                    appointmentDate: new Date(Date.now() + 48 * 60 * 60 * 1000),
                    duration: "60 minutes",
                    status: "pending",
                    type: "Surgery Consultation",
                    reason: "Pre-operative cardiac assessment",
                    notes: "Patient scheduled for bypass surgery. Comprehensive cardiac evaluation needed.",
                    medicalHistory: ["Coronary Artery Disease", "Previous MI", "Diabetes"],
                    lastVisit: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
                    isEmergency: false,
                    consultationFee: "$300"
                }
            ]);
        } catch (error) {
            console.error('Error fetching appointments:', error);
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

    const updateAppointmentStatus = useCallback((appointmentId, newStatus) => {
        setAppointments(prev => 
            prev.map(apt => 
                apt.id === appointmentId 
                    ? { ...apt, status: newStatus }
                    : apt
            )
        );
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
