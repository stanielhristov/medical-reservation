import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

const DoctorAppointments = () => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [selectedView, setSelectedView] = useState('today');
    const [appointments, setAppointments] = useState([]);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [showNotes, setShowNotes] = useState(false);
    const [notes, setNotes] = useState('');

    const views = [
        { id: 'today', name: "Today's Schedule", icon: '📅', color: '#3b82f6' },
        { id: 'upcoming', name: 'Upcoming', icon: '⏰', color: '#10b981' },
        { id: 'pending', name: 'Pending Approval', icon: '⏳', color: '#f59e0b' },
        { id: 'completed', name: 'Completed', icon: '✅', color: '#6b7280' }
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
                    patientName: "John Smith",
                    patientAge: 45,
                    patientPhone: "(555) 123-4567",
                    patientEmail: "john.smith@email.com",
                    appointmentDate: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
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
                    appointmentDate: new Date(Date.now() + 4 * 60 * 60 * 1000), // 4 hours from now
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
                    appointmentDate: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
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
                    appointmentDate: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
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
                    appointmentDate: new Date(Date.now() - 24 * 60 * 60 * 1000), // Yesterday
                    duration: "60 minutes",
                    status: "completed",
                    type: "Surgery Consultation",
                    reason: "Pre-operative assessment for bypass surgery",
                    notes: "Patient cleared for surgery. All pre-op tests completed successfully.",
                    medicalHistory: ["Coronary Artery Disease", "High Cholesterol", "Former Smoker"],
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

    const getFilteredAppointments = () => {
        const today = new Date();
        const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const endOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);

        switch (selectedView) {
            case 'today':
                return appointments.filter(apt => 
                    apt.appointmentDate >= startOfToday && apt.appointmentDate < endOfToday
                );
            case 'upcoming':
                return appointments.filter(apt => 
                    apt.appointmentDate > today && (apt.status === 'confirmed' || apt.status === 'pending')
                );
            case 'pending':
                return appointments.filter(apt => apt.status === 'pending');
            case 'completed':
                return appointments.filter(apt => apt.status === 'completed');
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

    const updateAppointmentStatus = (appointmentId, newStatus) => {
        setAppointments(prev =>
            prev.map(apt =>
                apt.id === appointmentId
                    ? { ...apt, status: newStatus }
                    : apt
            )
        );
    };

    const addNotes = (appointmentId, newNotes) => {
        setAppointments(prev =>
            prev.map(apt =>
                apt.id === appointmentId
                    ? { ...apt, notes: apt.notes + '\n\nAdditional Notes: ' + newNotes }
                    : apt
            )
        );
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
            background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 30%, #bae6fd 70%, #7dd3fc 100%)',
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
                        <span style={{ fontSize: '3rem', color: 'white' }}>👨‍⚕️</span>
                    </div>
                    
                    <h1 style={{
                        fontSize: '2.5rem',
                        fontWeight: '800',
                        color: '#374151',
                        margin: '0 0 1rem',
                        letterSpacing: '-0.025em'
                    }}>
                        Doctor's Appointment Center
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
                        Manage your patient appointments, update statuses, and provide excellent healthcare service
                    </p>
                </section>

                {/* Statistics Cards */}
                <section style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '1.5rem',
                    marginBottom: '3rem'
                }}>
                    {views.map(view => {
                        let count = 0;
                        const today = new Date();
                        const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
                        const endOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);

                        switch (view.id) {
                            case 'today':
                                count = appointments.filter(apt => 
                                    apt.appointmentDate >= startOfToday && apt.appointmentDate < endOfToday
                                ).length;
                                break;
                            case 'upcoming':
                                count = appointments.filter(apt => 
                                    apt.appointmentDate > today && (apt.status === 'confirmed' || apt.status === 'pending')
                                ).length;
                                break;
                            case 'pending':
                                count = appointments.filter(apt => apt.status === 'pending').length;
                                break;
                            case 'completed':
                                count = appointments.filter(apt => apt.status === 'completed').length;
                                break;
                        }
                        
                        return (
                            <div key={view.id} style={{
                                background: 'rgba(255, 255, 255, 0.98)',
                                backdropFilter: 'blur(20px)',
                                borderRadius: '20px',
                                padding: '1.5rem',
                                boxShadow: '0 8px 24px rgba(59, 130, 246, 0.1)',
                                border: `1px solid ${view.color}20`,
                                textAlign: 'center',
                                transition: 'all 0.3s ease',
                                cursor: 'pointer'
                            }}
                            onClick={() => setSelectedView(view.id)}
                            onMouseEnter={e => {
                                e.currentTarget.style.transform = 'translateY(-4px)';
                                e.currentTarget.style.boxShadow = `0 12px 32px ${view.color}30`;
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 8px 24px rgba(59, 130, 246, 0.1)';
                            }}>
                                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{view.icon}</div>
                                <div style={{ color: '#374151', fontWeight: '700', fontSize: '1.5rem' }}>{count}</div>
                                <div style={{ color: '#6b7280', fontSize: '0.9rem' }}>{view.name}</div>
                            </div>
                        );
                    })}
                </section>

                {/* View Navigation */}
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
                        <h2 style={{
                            fontSize: '1.5rem',
                            fontWeight: '700',
                            color: '#374151',
                            margin: 0
                        }}>
                            Appointment Views
                        </h2>
                    </div>
                    
                    <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '0.75rem'
                    }}>
                        {views.map(view => (
                            <button
                                key={view.id}
                                onClick={() => setSelectedView(view.id)}
                                style={{
                                    padding: '0.75rem 1.25rem',
                                    background: selectedView === view.id 
                                        ? 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)' 
                                        : 'rgba(59, 130, 246, 0.1)',
                                    color: selectedView === view.id ? 'white' : '#2563eb',
                                    border: selectedView === view.id 
                                        ? 'none' 
                                        : '1px solid rgba(59, 130, 246, 0.2)',
                                    borderRadius: '20px',
                                    fontSize: '0.9rem',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem'
                                }}
                            >
                                <span>{view.icon}</span>
                                {view.name}
                            </button>
                        ))}
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
                                
                                return (
                                    <div
                                        key={appointment.id}
                                        style={{
                                            background: 'rgba(255, 255, 255, 0.98)',
                                            backdropFilter: 'blur(20px)',
                                            borderRadius: '24px',
                                            padding: '2rem',
                                            boxShadow: '0 12px 32px rgba(59, 130, 246, 0.1)',
                                            border: appointment.isEmergency 
                                                ? '2px solid rgba(239, 68, 68, 0.3)' 
                                                : '1px solid rgba(59, 130, 246, 0.15)',
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
                                        {appointment.isEmergency && (
                                            <div style={{
                                                position: 'absolute',
                                                top: '0',
                                                left: '0',
                                                right: '0',
                                                height: '4px',
                                                background: 'linear-gradient(90deg, #ef4444 0%, #dc2626 100%)'
                                            }} />
                                        )}

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
                                                background: appointment.isEmergency 
                                                    ? 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'
                                                    : 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                                                borderRadius: '16px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontSize: '1.8rem',
                                                boxShadow: appointment.isEmergency 
                                                    ? '0 8px 24px rgba(239, 68, 68, 0.3)'
                                                    : '0 8px 24px rgba(59, 130, 246, 0.3)',
                                                flexShrink: 0
                                            }}>
                                                {appointment.isEmergency ? '🚨' : '👤'}
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
                                                        {appointment.patientName}
                                                        {appointment.isEmergency && (
                                                            <span style={{
                                                                marginLeft: '0.5rem',
                                                                padding: '0.25rem 0.5rem',
                                                                background: 'rgba(239, 68, 68, 0.1)',
                                                                color: '#dc2626',
                                                                borderRadius: '6px',
                                                                fontSize: '0.7rem',
                                                                fontWeight: '600'
                                                            }}>
                                                                URGENT
                                                            </span>
                                                        )}
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
                                                    <span>👤 Age: {appointment.patientAge}</span>
                                                    <span>📅 {appointment.appointmentDate.toLocaleDateString()}</span>
                                                    <span>⏰ {appointment.appointmentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
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

                                        {/* Patient Details */}
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
                                                    <span style={{ color: '#6b7280', fontWeight: '600' }}>📞 Contact:</span>
                                                    <div style={{ color: '#374151', marginTop: '0.25rem' }}>
                                                        {appointment.patientPhone}<br/>
                                                        {appointment.patientEmail}
                                                    </div>
                                                </div>
                                                <div>
                                                    <span style={{ color: '#6b7280', fontWeight: '600' }}>🏥 Reason:</span>
                                                    <div style={{ color: '#374151', marginTop: '0.25rem' }}>{appointment.reason}</div>
                                                </div>
                                                <div>
                                                    <span style={{ color: '#6b7280', fontWeight: '600' }}>📋 Medical History:</span>
                                                    <div style={{ color: '#374151', marginTop: '0.25rem' }}>
                                                        {appointment.medicalHistory.join(', ')}
                                                    </div>
                                                </div>
                                                <div>
                                                    <span style={{ color: '#6b7280', fontWeight: '600' }}>📅 Last Visit:</span>
                                                    <div style={{ color: '#374151', marginTop: '0.25rem' }}>
                                                        {appointment.lastVisit ? appointment.lastVisit.toLocaleDateString() : 'First visit'}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Notes */}
                                        <div style={{
                                            background: 'rgba(59, 130, 246, 0.03)',
                                            borderRadius: '12px',
                                            padding: '1rem',
                                            marginBottom: '1.5rem'
                                        }}>
                                            <div style={{
                                                fontSize: '0.9rem',
                                                color: '#6b7280',
                                                fontWeight: '600',
                                                marginBottom: '0.5rem'
                                            }}>
                                                📝 Notes:
                                            </div>
                                            <div style={{
                                                color: '#374151',
                                                lineHeight: '1.5',
                                                fontSize: '0.9rem'
                                            }}>
                                                {appointment.notes}
                                            </div>
                                        </div>

                                        {/* Action Buttons */}
                                        <div style={{
                                            display: 'flex',
                                            gap: '1rem',
                                            flexWrap: 'wrap'
                                        }}>
                                            {appointment.status === 'pending' && (
                                                <>
                                                    <button
                                                        onClick={() => updateAppointmentStatus(appointment.id, 'confirmed')}
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
                                                            boxShadow: '0 4px 12px rgba(34, 197, 94, 0.3)'
                                                        }}
                                                    >
                                                        ✅ Approve
                                                    </button>
                                                    <button
                                                        onClick={() => updateAppointmentStatus(appointment.id, 'cancelled')}
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
                                                        ❌ Decline
                                                    </button>
                                                </>
                                            )}
                                            
                                            {(appointment.status === 'confirmed' || appointment.status === 'completed') && (
                                                <button
                                                    onClick={() => {
                                                        setSelectedAppointment(appointment);
                                                        setShowNotes(true);
                                                    }}
                                                    style={{
                                                        padding: '0.75rem 1.5rem',
                                                        background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                                                        color: 'white',
                                                        border: 'none',
                                                        borderRadius: '12px',
                                                        fontSize: '0.9rem',
                                                        fontWeight: '600',
                                                        cursor: 'pointer',
                                                        transition: 'all 0.3s ease',
                                                        boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)'
                                                    }}
                                                >
                                                    📝 Add Notes
                                                </button>
                                            )}

                                            {appointment.status === 'confirmed' && (
                                                <button
                                                    onClick={() => updateAppointmentStatus(appointment.id, 'completed')}
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
                                                    ✅ Mark Complete
                                                </button>
                                            )}

                                            <button
                                                onClick={() => setSelectedAppointment(appointment)}
                                                style={{
                                                    padding: '0.75rem 1.5rem',
                                                    background: 'rgba(59, 130, 246, 0.1)',
                                                    color: '#2563eb',
                                                    border: '1px solid rgba(59, 130, 246, 0.2)',
                                                    borderRadius: '12px',
                                                    fontSize: '0.9rem',
                                                    fontWeight: '600',
                                                    cursor: 'pointer',
                                                    transition: 'all 0.3s ease'
                                                }}
                                            >
                                                📋 View Full Details
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
                                    No appointments found
                                </h3>
                                <p style={{ color: '#6b7280', margin: 0 }}>
                                    No appointments found for the selected view
                                </p>
                            </div>
                        )}
                    </div>
                </section>
            </main>

            {/* Notes Modal */}
            {showNotes && selectedAppointment && (
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
                        maxWidth: '600px',
                        width: '100%',
                        boxShadow: '0 32px 64px rgba(0, 0, 0, 0.2)',
                        position: 'relative'
                    }}>
                        <button
                            onClick={() => {
                                setShowNotes(false);
                                setSelectedAppointment(null);
                                setNotes('');
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
                                background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                                borderRadius: '16px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '2rem',
                                margin: '0 auto 1rem'
                            }}>
                                📝
                            </div>
                            <h3 style={{
                                fontSize: '1.5rem',
                                fontWeight: '700',
                                color: '#374151',
                                margin: '0 0 0.5rem'
                            }}>
                                Add Medical Notes
                            </h3>
                            <p style={{ color: '#6b7280', margin: 0 }}>
                                {selectedAppointment.patientName} - {selectedAppointment.appointmentDate.toLocaleDateString()}
                            </p>
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <label style={{
                                display: 'block',
                                marginBottom: '0.5rem',
                                fontWeight: '600',
                                color: '#374151'
                            }}>
                                Medical Notes
                            </label>
                            <textarea
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                placeholder="Enter medical notes, observations, treatment plans, etc..."
                                rows={6}
                                style={{
                                    width: '100%',
                                    padding: '1rem',
                                    border: '2px solid rgba(59, 130, 246, 0.2)',
                                    borderRadius: '12px',
                                    fontSize: '1rem',
                                    outline: 'none',
                                    resize: 'vertical',
                                    fontFamily: 'inherit'
                                }}
                            />
                        </div>

                        <div style={{
                            display: 'flex',
                            gap: '1rem'
                        }}>
                            <button
                                onClick={() => {
                                    setShowNotes(false);
                                    setSelectedAppointment(null);
                                    setNotes('');
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
                                onClick={() => {
                                    if (notes.trim()) {
                                        addNotes(selectedAppointment.id, notes);
                                        setShowNotes(false);
                                        setSelectedAppointment(null);
                                        setNotes('');
                                    }
                                }}
                                disabled={!notes.trim()}
                                style={{
                                    flex: 1,
                                    padding: '1rem',
                                    background: notes.trim() 
                                        ? 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)' 
                                        : 'rgba(107, 114, 128, 0.3)',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '12px',
                                    fontSize: '1rem',
                                    fontWeight: '600',
                                    cursor: notes.trim() ? 'pointer' : 'not-allowed'
                                }}
                            >
                                Save Notes
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

export default DoctorAppointments;
