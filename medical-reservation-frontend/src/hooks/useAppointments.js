import { useState, useEffect } from 'react';

export const useAppointments = () => {
    const [loading, setLoading] = useState(true);
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        try {
            setAppointments([
                {
                    id: 1,
                    doctorName: "Dr. Sarah Johnson",
                    specialization: "Cardiology",
                    date: new Date(2024, 2, 25, 14, 30),
                    duration: "30 minutes",
                    status: "confirmed",
                    type: "Follow-up",
                    location: "Medical Center East, Room 205",
                    notes: "Follow-up for blood pressure medication adjustment",
                    doctorImage: "👩‍⚕️",
                    consultationFee: "$150",
                    bookingDate: new Date(2024, 1, 20)
                },
                {
                    id: 2,
                    doctorName: "Dr. Michael Chen",
                    specialization: "Dermatology",
                    date: new Date(2024, 3, 2, 10, 0),
                    duration: "45 minutes",
                    status: "pending",
                    type: "Consultation",
                    location: "Skin Care Clinic, Room 102",
                    notes: "Skin examination and mole check",
                    doctorImage: "👨‍⚕️",
                    consultationFee: "$120",
                    bookingDate: new Date(2024, 2, 15)
                },
                {
                    id: 3,
                    doctorName: "Dr. Emily Rodriguez",
                    specialization: "General Practice",
                    date: new Date(2024, 1, 28, 16, 0),
                    duration: "30 minutes",
                    status: "completed",
                    type: "Annual Checkup",
                    location: "Community Health Center, Room 301",
                    notes: "Annual physical examination completed successfully",
                    doctorImage: "👩‍⚕️",
                    consultationFee: "$100",
                    bookingDate: new Date(2024, 0, 25)
                },
                {
                    id: 4,
                    doctorName: "Dr. James Wilson",
                    specialization: "Orthopedics",
                    date: new Date(2024, 1, 15, 9, 30),
                    duration: "60 minutes",
                    status: "completed",
                    type: "Surgery Follow-up",
                    location: "Sports Medicine Institute, Room 401",
                    notes: "Post-surgery knee rehabilitation assessment",
                    doctorImage: "👨‍⚕️",
                    consultationFee: "$200",
                    bookingDate: new Date(2024, 0, 10)
                },
                {
                    id: 5,
                    doctorName: "Dr. Lisa Martinez",
                    specialization: "Pediatrics",
                    date: new Date(2024, 1, 10, 11, 0),
                    duration: "30 minutes",
                    status: "cancelled",
                    type: "Vaccination",
                    location: "Children's Medical Center, Room 201",
                    notes: "Cancelled due to patient illness",
                    doctorImage: "👩‍⚕️",
                    consultationFee: "$110",
                    bookingDate: new Date(2024, 0, 5)
                }
            ]);
        } catch (error) {
            console.error('Error fetching appointments:', error);
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

    const handleCancelAppointment = (appointment) => {
        setAppointments(prev => 
            prev.map(apt => 
                apt.id === appointment.id 
                    ? { ...apt, status: 'cancelled' } 
                    : apt
            )
        );
    };

    const handleRescheduleAppointment = (appointmentId, newDate) => {
        setAppointments(prev => 
            prev.map(apt => 
                apt.id === appointmentId 
                    ? { ...apt, date: newDate, status: 'confirmed' } 
                    : apt
            )
        );
    };

    return {
        loading,
        appointments,
        getFilteredAppointments,
        handleCancelAppointment,
        handleRescheduleAppointment
    };
};
