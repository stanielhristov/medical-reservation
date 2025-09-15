import React from 'react';
import { getStatusColor, formatAppointmentDate, formatAppointmentTime, getRelativeTimeUntil } from '../utils/appointmentUtils';

const AppointmentCard = ({ appointment, onCancel, onReschedule, selectedTab }) => {
    const statusStyle = getStatusColor(appointment.status);
    const isUpcoming = selectedTab === 'upcoming';
    const isPast = selectedTab === 'past';

    return (
        <div style={{
            background: 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(20px)',
            borderRadius: '20px',
            padding: '2rem',
            marginBottom: '1.5rem',
            boxShadow: '0 16px 32px rgba(0, 0, 0, 0.08)',
            border: '1px solid rgba(0, 0, 0, 0.08)',
            transition: 'all 0.3s ease'
        }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '1.5rem'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{
                        width: '60px',
                        height: '60px',
                        background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
                        borderRadius: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '2rem',
                        border: '2px solid #bae6fd'
                    }}>
                        {appointment.doctorImage}
                    </div>
                    <div>
                        <h3 style={{
                            fontSize: '1.3rem',
                            fontWeight: '700',
                            color: '#374151',
                            margin: '0 0 0.25rem 0'
                        }}>
                            {appointment.doctorName}
                        </h3>
                        <p style={{
                            fontSize: '1rem',
                            color: '#3b82f6',
                            margin: '0 0 0.25rem 0',
                            fontWeight: '600'
                        }}>
                            {appointment.specialization}
                        </p>
                        <p style={{
                            fontSize: '0.9rem',
                            color: '#6b7280',
                            margin: 0
                        }}>
                            {appointment.type}
                        </p>
                    </div>
                </div>
                
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem'
                }}>
                    <div style={{
                        background: statusStyle.bg,
                        color: statusStyle.color,
                        padding: '0.5rem 1rem',
                        borderRadius: '12px',
                        fontSize: '0.8rem',
                        fontWeight: '600',
                        textTransform: 'uppercase',
                        border: `1px solid ${statusStyle.border}`
                    }}>
                        {appointment.status}
                    </div>
                    
                    {isUpcoming && (
                        <div style={{
                            background: 'rgba(59, 130, 246, 0.1)',
                            color: '#2563eb',
                            padding: '0.5rem 1rem',
                            borderRadius: '12px',
                            fontSize: '0.8rem',
                            fontWeight: '600'
                        }}>
                            {getRelativeTimeUntil(appointment.date)}
                        </div>
                    )}
                </div>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '1.5rem',
                marginBottom: '1.5rem'
            }}>
                <div style={{
                    background: 'rgba(59, 130, 246, 0.05)',
                    padding: '1.5rem',
                    borderRadius: '16px',
                    border: '1px solid rgba(59, 130, 246, 0.1)'
                }}>
                    <h4 style={{
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        color: '#6b7280',
                        margin: '0 0 0.5rem 0',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                    }}>
                        📅 Date & Time
                    </h4>
                    <p style={{
                        fontSize: '1.1rem',
                        fontWeight: '600',
                        color: '#374151',
                        margin: '0 0 0.25rem 0'
                    }}>
                        {formatAppointmentDate(appointment.date)}
                    </p>
                    <p style={{
                        fontSize: '1rem',
                        color: '#3b82f6',
                        margin: '0 0 0.25rem 0',
                        fontWeight: '600'
                    }}>
                        {formatAppointmentTime(appointment.date)}
                    </p>
                    <p style={{
                        fontSize: '0.9rem',
                        color: '#6b7280',
                        margin: 0
                    }}>
                        Duration: {appointment.duration}
                    </p>
                </div>

                <div style={{
                    background: 'rgba(16, 185, 129, 0.05)',
                    padding: '1.5rem',
                    borderRadius: '16px',
                    border: '1px solid rgba(16, 185, 129, 0.1)'
                }}>
                    <h4 style={{
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        color: '#6b7280',
                        margin: '0 0 0.5rem 0',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                    }}>
                        📍 Location
                    </h4>
                    <p style={{
                        fontSize: '1rem',
                        fontWeight: '600',
                        color: '#374151',
                        margin: '0 0 0.5rem 0'
                    }}>
                        {appointment.location}
                    </p>
                    <p style={{
                        fontSize: '0.9rem',
                        color: '#6b7280',
                        margin: 0
                    }}>
                        Fee: {appointment.consultationFee}
                    </p>
                </div>
            </div>

            {appointment.notes && (
                <div style={{
                    background: 'rgba(251, 191, 36, 0.05)',
                    padding: '1.5rem',
                    borderRadius: '16px',
                    border: '1px solid rgba(251, 191, 36, 0.1)',
                    marginBottom: '1.5rem'
                }}>
                    <h4 style={{
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        color: '#6b7280',
                        margin: '0 0 0.5rem 0',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                    }}>
                        📝 Notes
                    </h4>
                    <p style={{
                        fontSize: '1rem',
                        color: '#374151',
                        margin: 0,
                        lineHeight: '1.6'
                    }}>
                        {appointment.notes}
                    </p>
                </div>
            )}

            {(isUpcoming && appointment.status !== 'cancelled') && (
                <div style={{
                    display: 'flex',
                    gap: '1rem',
                    justifyContent: 'flex-end'
                }}>
                    <button
                        onClick={() => onReschedule(appointment)}
                        style={{
                            background: 'rgba(59, 130, 246, 0.1)',
                            color: '#2563eb',
                            border: '1px solid rgba(59, 130, 246, 0.2)',
                            borderRadius: '12px',
                            padding: '0.75rem 1.5rem',
                            fontSize: '0.9rem',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}
                    >
                        📅 Reschedule
                    </button>
                    
                    <button
                        onClick={() => onCancel(appointment)}
                        style={{
                            background: 'rgba(239, 68, 68, 0.1)',
                            color: '#dc2626',
                            border: '1px solid rgba(239, 68, 68, 0.2)',
                            borderRadius: '12px',
                            padding: '0.75rem 1.5rem',
                            fontSize: '0.9rem',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}
                    >
                        ❌ Cancel
                    </button>
                </div>
            )}
        </div>
    );
};

export default AppointmentCard;
