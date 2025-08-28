import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

const PatientAppointments = () => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [selectedTab, setSelectedTab] = useState('upcoming');
    const [appointments, setAppointments] = useState([]);
    const [showBookingModal, setShowBookingModal] = useState(false);
    const [showRescheduleModal, setShowRescheduleModal] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');

    const tabs = [
        { id: 'upcoming', name: 'Upcoming', icon: '📅', color: '#3b82f6' },
        { id: 'past', name: 'Past', icon: '📋', color: '#6b7280' },
        { id: 'cancelled', name: 'Cancelled', icon: '❌', color: '#ef4444' }
    ];

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        try {
            // Mock data - replace with actual API call
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

    const getFilteredAppointments = () => {
        const now = new Date();
        switch (selectedTab) {
            case 'upcoming':
                return appointments.filter(apt => 
                    apt.date > now && (apt.status === 'confirmed' || apt.status === 'pending')
                );
            case 'past':
                return appointments.filter(apt => 
                    apt.date < now || apt.status === 'completed'
                );
            case 'cancelled':
                return appointments.filter(apt => apt.status === 'cancelled');
            default:
                return appointments;
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'confirmed':
                return { bg: 'rgba(34, 197, 94, 0.1)', color: '#16a34a', border: 'rgba(34, 197, 94, 0.2)' };
            case 'pending':
                return { bg: 'rgba(251, 191, 36, 0.1)', color: '#d97706', border: 'rgba(251, 191, 36, 0.2)' };
            case 'completed':
                return { bg: 'rgba(59, 130, 246, 0.1)', color: '#2563eb', border: 'rgba(59, 130, 246, 0.2)' };
            case 'cancelled':
                return { bg: 'rgba(239, 68, 68, 0.1)', color: '#dc2626', border: 'rgba(239, 68, 68, 0.2)' };
            default:
                return { bg: 'rgba(107, 114, 128, 0.1)', color: '#374151', border: 'rgba(107, 114, 128, 0.2)' };
        }
    };

    const handleCancelAppointment = (appointment) => {
        // Update appointment status to cancelled
        setAppointments(prev => 
            prev.map(apt => 
                apt.id === appointment.id 
                    ? { ...apt, status: 'cancelled' } 
                    : apt
            )
        );
    };

    const handleRescheduleAppointment = (appointment) => {
        setSelectedAppointment(appointment);
        setShowRescheduleModal(true);
    };

    const confirmReschedule = () => {
        if (selectedDate && selectedTime && selectedAppointment) {
            const newDateTime = new Date(`${selectedDate}T${selectedTime}`);
            setAppointments(prev => 
                prev.map(apt => 
                    apt.id === selectedAppointment.id 
                        ? { ...apt, date: newDateTime, status: 'confirmed' } 
                        : apt
                )
            );
            setShowRescheduleModal(false);
            setSelectedAppointment(null);
            setSelectedDate('');
            setSelectedTime('');
        }
    };

    if (loading) {
        return (
            <div style={{
                minHeight: '100vh',
                width: '100vw',
                background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 50%, #bbf7d0 100%)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                boxSizing: 'border-box'
            }}>
                <div style={{
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '24px',
                    padding: '3rem',
                    textAlign: 'center',
                    boxShadow: '0 20px 40px rgba(34, 197, 94, 0.1), 0 8px 32px rgba(0, 0, 0, 0.05)',
                    border: '1px solid rgba(34, 197, 94, 0.1)'
                }}>
                    <div style={{
                        width: '60px',
                        height: '60px',
                        border: '4px solid rgba(34, 197, 94, 0.2)',
                        borderTop: '4px solid #22c55e',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite',
                        margin: '0 auto 1.5rem'
                    }} />
                    <p style={{ color: '#6b7280', margin: 0, fontSize: '1rem', fontWeight: '500' }}>Loading appointments...</p>
                </div>
            </div>
        );
    }

    return (
        <div style={{
            minHeight: '100vh',
            width: '100vw',
            background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 30%, #bfdbfe 70%, #93c5fd 100%)',
            position: 'relative',
            overflow: 'hidden',
            boxSizing: 'border-box'
        }}>
            {/* Background decorations */}
            <div style={{
                position: 'absolute',
                top: '5%',
                right: '8%',
                width: '300px',
                height: '300px',
                background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, rgba(59, 130, 246, 0.05) 50%, transparent 100%)',
                borderRadius: '50%',
                zIndex: 0
            }} />
            
            <div style={{
                position: 'absolute',
                bottom: '10%',
                left: '5%',
                width: '250px',
                height: '250px',
                background: 'radial-gradient(circle, rgba(37, 99, 235, 0.08) 0%, rgba(37, 99, 235, 0.03) 50%, transparent 100%)',
                borderRadius: '50%',
                zIndex: 0
            }} />

            {/* Main Content */}
            <main style={{
                maxWidth: '1400px',
                margin: '0 auto',
                padding: '2.5rem 2rem',
                position: 'relative',
                zIndex: 1,
                width: '100%',
                boxSizing: 'border-box'
            }}>
                {/* Header Section */}
                <section style={{
                    background: 'rgba(255, 255, 255, 0.98)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '32px',
                    padding: '3rem',
                    marginBottom: '3rem',
                    boxShadow: '0 32px 64px rgba(59, 130, 246, 0.12), 0 16px 32px rgba(0, 0, 0, 0.06)',
                    border: '1px solid rgba(59, 130, 246, 0.15)',
                    textAlign: 'center'
                }}>
                    <div style={{
                        width: '100px',
                        height: '100px',
                        background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                        borderRadius: '20px',
                        margin: '0 auto 2rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 16px 40px rgba(59, 130, 246, 0.3)'
                    }}>
                        <span style={{ fontSize: '3rem', color: 'white' }}>📅</span>
                    </div>
                    
                    <h1 style={{
                        fontSize: '2.5rem',
                        fontWeight: '800',
                        color: '#374151',
                        margin: '0 0 1rem',
                        letterSpacing: '-0.025em'
                    }}>
                        My Appointments
                    </h1>
                    
                    <p style={{
                        fontSize: '1.2rem',
                        color: '#6b7280',
                        margin: 0,
                        maxWidth: '600px',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        lineHeight: '1.6'
                    }}>
                        Manage your healthcare appointments, book new visits, and keep track of your medical schedule
                    </p>
                </section>

                {/* Statistics Cards */}
                <section style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '1.5rem',
                    marginBottom: '3rem'
                }}>
                    {tabs.map(tab => {
                        const count = getFilteredAppointments.length;
                        return (
                            <div key={tab.id} style={{
                                background: 'rgba(255, 255, 255, 0.98)',
                                backdropFilter: 'blur(20px)',
                                borderRadius: '20px',
                                padding: '1.5rem',
                                boxShadow: '0 8px 24px rgba(59, 130, 246, 0.1)',
                                border: `1px solid ${tab.color}20`,
                                textAlign: 'center',
                                transition: 'all 0.3s ease',
                                cursor: 'pointer'
                            }}
                            onClick={() => setSelectedTab(tab.id)}
                            onMouseEnter={e => {
                                e.currentTarget.style.transform = 'translateY(-4px)';
                                e.currentTarget.style.boxShadow = `0 12px 32px ${tab.color}30`;
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 8px 24px rgba(59, 130, 246, 0.1)';
                            }}>
                                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{tab.icon}</div>
                                <div style={{ color: '#374151', fontWeight: '700', fontSize: '1.5rem' }}>
                                    {appointments.filter(apt => {
                                        const now = new Date();
                                        switch (tab.id) {
                                            case 'upcoming':
                                                return apt.date > now && (apt.status === 'confirmed' || apt.status === 'pending');
                                            case 'past':
                                                return apt.date < now || apt.status === 'completed';
                                            case 'cancelled':
                                                return apt.status === 'cancelled';
                                            default:
                                                return false;
                                        }
                                    }).length}
                                </div>
                                <div style={{ color: '#6b7280', fontSize: '0.9rem' }}>{tab.name}</div>
                            </div>
                        );
                    })}
                </section>

                {/* Tab Navigation */}
                <section style={{
                    background: 'rgba(255, 255, 255, 0.98)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '24px',
                    padding: '2rem',
                    marginBottom: '3rem',
                    boxShadow: '0 12px 32px rgba(59, 130, 246, 0.1)',
                    border: '1px solid rgba(59, 130, 246, 0.15)'
                }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '1.5rem',
                        flexWrap: 'wrap',
                        gap: '1rem'
                    }}>
                        <div style={{
                            display: 'flex',
                            gap: '0.5rem'
                        }}>
                            {tabs.map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setSelectedTab(tab.id)}
                                    style={{
                                        padding: '0.75rem 1.5rem',
                                        background: selectedTab === tab.id 
                                            ? 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)' 
                                            : 'rgba(59, 130, 246, 0.1)',
                                        color: selectedTab === tab.id ? 'white' : '#2563eb',
                                        border: selectedTab === tab.id 
                                            ? 'none' 
                                            : '1px solid rgba(59, 130, 246, 0.2)',
                                        borderRadius: '12px',
                                        fontSize: '0.9rem',
                                        fontWeight: '600',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem'
                                    }}
                                >
                                    <span>{tab.icon}</span>
                                    {tab.name}
                                </button>
                            ))}
                        </div>
                        
                        <button
                            onClick={() => setShowBookingModal(true)}
                            style={{
                                padding: '0.75rem 1.5rem',
                                background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '12px',
                                fontSize: '0.9rem',
                                fontWeight: '600',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                boxShadow: '0 4px 12px rgba(34, 197, 94, 0.3)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}
                        >
                            <span>➕</span>
                            Book New Appointment
                        </button>
                    </div>
                </section>

                {/* Appointments List */}
                <section>
                    <div style={{
                        display: 'grid',
                        gap: '1.5rem'
                    }}>
                        {getFilteredAppointments().length > 0 ? (
                            getFilteredAppointments().map((appointment) => {
                                const statusColors = getStatusColor(appointment.status);
                                const isUpcoming = appointment.date > new Date() && 
                                                 (appointment.status === 'confirmed' || appointment.status === 'pending');
                                
                                return (
                                    <div
                                        key={appointment.id}
                                        style={{
                                            background: 'rgba(255, 255, 255, 0.98)',
                                            backdropFilter: 'blur(20px)',
                                            borderRadius: '24px',
                                            padding: '2rem',
                                            boxShadow: '0 12px 32px rgba(59, 130, 246, 0.1)',
                                            border: '1px solid rgba(59, 130, 246, 0.15)',
                                            transition: 'all 0.4s ease',
                                            position: 'relative',
                                            overflow: 'hidden'
                                        }}
                                        onMouseEnter={e => {
                                            e.currentTarget.style.transform = 'translateY(-4px)';
                                            e.currentTarget.style.boxShadow = '0 20px 48px rgba(59, 130, 246, 0.2)';
                                        }}
                                        onMouseLeave={e => {
                                            e.currentTarget.style.transform = 'translateY(0)';
                                            e.currentTarget.style.boxShadow = '0 12px 32px rgba(59, 130, 246, 0.1)';
                                        }}
                                    >
                                        <div style={{
                                            position: 'absolute',
                                            top: '10px',
                                            right: '10px',
                                            width: '80px',
                                            height: '80px',
                                            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
                                            borderRadius: '50%'
                                        }} />
                                        
                                        {/* Appointment Header */}
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'flex-start',
                                            gap: '1rem',
                                            marginBottom: '1.5rem'
                                        }}>
                                            <div style={{
                                                width: '60px',
                                                height: '60px',
                                                background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                                                borderRadius: '16px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontSize: '1.8rem',
                                                boxShadow: '0 8px 24px rgba(59, 130, 246, 0.3)',
                                                flexShrink: 0
                                            }}>
                                                {appointment.doctorImage}
                                            </div>
                                            
                                            <div style={{ flex: 1 }}>
                                                <div style={{
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'flex-start',
                                                    marginBottom: '0.5rem',
                                                    flexWrap: 'wrap',
                                                    gap: '0.5rem'
                                                }}>
                                                    <h3 style={{
                                                        fontSize: '1.3rem',
                                                        fontWeight: '700',
                                                        color: '#374151',
                                                        margin: 0
                                                    }}>
                                                        {appointment.doctorName}
                                                    </h3>
                                                    <span style={{
                                                        padding: '0.5rem 1rem',
                                                        fontSize: '0.8rem',
                                                        fontWeight: '600',
                                                        borderRadius: '20px',
                                                        background: statusColors.bg,
                                                        color: statusColors.color,
                                                        border: `1px solid ${statusColors.border}`
                                                    }}>
                                                        {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                                                    </span>
                                                </div>
                                                
                                                <div style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '1rem',
                                                    marginBottom: '0.5rem',
                                                    fontSize: '0.9rem',
                                                    color: '#6b7280',
                                                    flexWrap: 'wrap'
                                                }}>
                                                    <span>🏥 {appointment.specialization}</span>
                                                    <span>📅 {appointment.date.toLocaleDateString()}</span>
                                                    <span>⏰ {appointment.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                                    <span>⏱️ {appointment.duration}</span>
                                                </div>
                                                
                                                <div style={{
                                                    fontSize: '0.9rem',
                                                    color: '#059669',
                                                    fontWeight: '600'
                                                }}>
                                                    {appointment.type} • {appointment.consultationFee}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Appointment Details */}
                                        <div style={{
                                            background: 'rgba(59, 130, 246, 0.05)',
                                            borderRadius: '12px',
                                            padding: '1rem',
                                            marginBottom: '1.5rem'
                                        }}>
                                            <div style={{
                                                display: 'grid',
                                                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                                                gap: '1rem',
                                                fontSize: '0.9rem'
                                            }}>
                                                <div>
                                                    <span style={{ color: '#6b7280', fontWeight: '600' }}>📍 Location:</span>
                                                    <div style={{ color: '#374151', marginTop: '0.25rem' }}>{appointment.location}</div>
                                                </div>
                                                <div>
                                                    <span style={{ color: '#6b7280', fontWeight: '600' }}>📝 Notes:</span>
                                                    <div style={{ color: '#374151', marginTop: '0.25rem' }}>{appointment.notes}</div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Action Buttons */}
                                        <div style={{
                                            display: 'flex',
                                            gap: '1rem',
                                            flexWrap: 'wrap'
                                        }}>
                                            {isUpcoming && (
                                                <>
                                                    <button
                                                        onClick={() => handleRescheduleAppointment(appointment)}
                                                        style={{
                                                            padding: '0.75rem 1.5rem',
                                                            background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                                                            color: 'white',
                                                            border: 'none',
                                                            borderRadius: '12px',
                                                            fontSize: '0.9rem',
                                                            fontWeight: '600',
                                                            cursor: 'pointer',
                                                            transition: 'all 0.3s ease',
                                                            boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)'
                                                        }}
                                                    >
                                                        📅 Reschedule
                                                    </button>
                                                    <button
                                                        onClick={() => handleCancelAppointment(appointment)}
                                                        style={{
                                                            padding: '0.75rem 1.5rem',
                                                            background: 'rgba(239, 68, 68, 0.1)',
                                                            color: '#dc2626',
                                                            border: '1px solid rgba(239, 68, 68, 0.2)',
                                                            borderRadius: '12px',
                                                            fontSize: '0.9rem',
                                                            fontWeight: '600',
                                                            cursor: 'pointer',
                                                            transition: 'all 0.3s ease'
                                                        }}
                                                    >
                                                        ❌ Cancel
                                                    </button>
                                                </>
                                            )}
                                            <button
                                                style={{
                                                    padding: '0.75rem 1.5rem',
                                                    background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                                                    color: 'white',
                                                    border: 'none',
                                                    borderRadius: '12px',
                                                    fontSize: '0.9rem',
                                                    fontWeight: '600',
                                                    cursor: 'pointer',
                                                    transition: 'all 0.3s ease',
                                                    boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
                                                }}
                                            >
                                                📋 View Details
                                            </button>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div style={{
                                background: 'rgba(255, 255, 255, 0.98)',
                                backdropFilter: 'blur(20px)',
                                borderRadius: '24px',
                                padding: '3rem',
                                textAlign: 'center',
                                boxShadow: '0 12px 32px rgba(59, 130, 246, 0.1)',
                                border: '1px solid rgba(59, 130, 246, 0.15)'
                            }}>
                                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📅</div>
                                <h3 style={{
                                    fontSize: '1.5rem',
                                    fontWeight: '600',
                                    color: '#374151',
                                    margin: '0 0 0.5rem'
                                }}>
                                    No {selectedTab} appointments
                                </h3>
                                <p style={{ color: '#6b7280', margin: 0 }}>
                                    {selectedTab === 'upcoming' 
                                        ? 'Book your first appointment to get started!' 
                                        : `You have no ${selectedTab} appointments at this time.`}
                                </p>
                            </div>
                        )}
                    </div>
                </section>
            </main>

            {/* Booking Modal */}
            {showBookingModal && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0, 0, 0, 0.7)',
                    backdropFilter: 'blur(10px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000,
                    padding: '2rem'
                }}>
                    <div style={{
                        background: 'white',
                        borderRadius: '24px',
                        padding: '2.5rem',
                        maxWidth: '500px',
                        width: '100%',
                        boxShadow: '0 32px 64px rgba(0, 0, 0, 0.2)',
                        position: 'relative'
                    }}>
                        <button
                            onClick={() => setShowBookingModal(false)}
                            style={{
                                position: 'absolute',
                                top: '1rem',
                                right: '1rem',
                                background: 'none',
                                border: 'none',
                                fontSize: '1.5rem',
                                cursor: 'pointer',
                                color: '#6b7280'
                            }}
                        >
                            ✕
                        </button>

                        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                            <div style={{
                                width: '80px',
                                height: '80px',
                                background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                                borderRadius: '16px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '2rem',
                                margin: '0 auto 1rem'
                            }}>
                                📅
                            </div>
                            <h3 style={{
                                fontSize: '1.5rem',
                                fontWeight: '700',
                                color: '#374151',
                                margin: '0 0 0.5rem'
                            }}>
                                Book New Appointment
                            </h3>
                            <p style={{ color: '#6b7280', margin: 0 }}>
                                Schedule a visit with one of our healthcare providers
                            </p>
                        </div>

                        <div style={{
                            background: 'rgba(59, 130, 246, 0.1)',
                            borderRadius: '12px',
                            padding: '1.5rem',
                            textAlign: 'center',
                            marginBottom: '2rem'
                        }}>
                            <p style={{
                                color: '#2563eb',
                                fontWeight: '600',
                                margin: 0,
                                fontSize: '1.1rem'
                            }}>
                                🚀 Booking system will connect to the doctors page!
                            </p>
                            <p style={{
                                color: '#3b82f6',
                                margin: '0.5rem 0 0',
                                fontSize: '0.9rem'
                            }}>
                                This will integrate with the doctor selection and scheduling system.
                            </p>
                        </div>

                        <button
                            onClick={() => setShowBookingModal(false)}
                            style={{
                                width: '100%',
                                padding: '1rem',
                                background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '12px',
                                fontSize: '1rem',
                                fontWeight: '600',
                                cursor: 'pointer'
                            }}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            {/* Reschedule Modal */}
            {showRescheduleModal && selectedAppointment && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0, 0, 0, 0.7)',
                    backdropFilter: 'blur(10px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000,
                    padding: '2rem'
                }}>
                    <div style={{
                        background: 'white',
                        borderRadius: '24px',
                        padding: '2.5rem',
                        maxWidth: '500px',
                        width: '100%',
                        boxShadow: '0 32px 64px rgba(0, 0, 0, 0.2)',
                        position: 'relative'
                    }}>
                        <button
                            onClick={() => {
                                setShowRescheduleModal(false);
                                setSelectedAppointment(null);
                                setSelectedDate('');
                                setSelectedTime('');
                            }}
                            style={{
                                position: 'absolute',
                                top: '1rem',
                                right: '1rem',
                                background: 'none',
                                border: 'none',
                                fontSize: '1.5rem',
                                cursor: 'pointer',
                                color: '#6b7280'
                            }}
                        >
                            ✕
                        </button>

                        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                            <div style={{
                                width: '80px',
                                height: '80px',
                                background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                                borderRadius: '16px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '2rem',
                                margin: '0 auto 1rem'
                            }}>
                                📅
                            </div>
                            <h3 style={{
                                fontSize: '1.5rem',
                                fontWeight: '700',
                                color: '#374151',
                                margin: '0 0 0.5rem'
                            }}>
                                Reschedule Appointment
                            </h3>
                            <p style={{ color: '#6b7280', margin: 0 }}>
                                {selectedAppointment.doctorName} - {selectedAppointment.specialization}
                            </p>
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{
                                    display: 'block',
                                    marginBottom: '0.5rem',
                                    fontWeight: '600',
                                    color: '#374151'
                                }}>
                                    Select Date
                                </label>
                                <input
                                    type="date"
                                    value={selectedDate}
                                    onChange={(e) => setSelectedDate(e.target.value)}
                                    min={new Date().toISOString().split('T')[0]}
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem',
                                        border: '2px solid rgba(59, 130, 246, 0.2)',
                                        borderRadius: '8px',
                                        fontSize: '1rem',
                                        outline: 'none'
                                    }}
                                />
                            </div>
                            
                            <div>
                                <label style={{
                                    display: 'block',
                                    marginBottom: '0.5rem',
                                    fontWeight: '600',
                                    color: '#374151'
                                }}>
                                    Select Time
                                </label>
                                <select
                                    value={selectedTime}
                                    onChange={(e) => setSelectedTime(e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem',
                                        border: '2px solid rgba(59, 130, 246, 0.2)',
                                        borderRadius: '8px',
                                        fontSize: '1rem',
                                        outline: 'none'
                                    }}
                                >
                                    <option value="">Select time</option>
                                    <option value="09:00">9:00 AM</option>
                                    <option value="10:00">10:00 AM</option>
                                    <option value="11:00">11:00 AM</option>
                                    <option value="14:00">2:00 PM</option>
                                    <option value="15:00">3:00 PM</option>
                                    <option value="16:00">4:00 PM</option>
                                </select>
                            </div>
                        </div>

                        <div style={{
                            display: 'flex',
                            gap: '1rem'
                        }}>
                            <button
                                onClick={() => {
                                    setShowRescheduleModal(false);
                                    setSelectedAppointment(null);
                                    setSelectedDate('');
                                    setSelectedTime('');
                                }}
                                style={{
                                    flex: 1,
                                    padding: '1rem',
                                    background: 'rgba(107, 114, 128, 0.1)',
                                    color: '#374151',
                                    border: '1px solid rgba(107, 114, 128, 0.2)',
                                    borderRadius: '12px',
                                    fontSize: '1rem',
                                    fontWeight: '600',
                                    cursor: 'pointer'
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmReschedule}
                                disabled={!selectedDate || !selectedTime}
                                style={{
                                    flex: 1,
                                    padding: '1rem',
                                    background: selectedDate && selectedTime 
                                        ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' 
                                        : 'rgba(107, 114, 128, 0.3)',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '12px',
                                    fontSize: '1rem',
                                    fontWeight: '600',
                                    cursor: selectedDate && selectedTime ? 'pointer' : 'not-allowed'
                                }}
                            >
                                Confirm Reschedule
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
};

export default PatientAppointments;
