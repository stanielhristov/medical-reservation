import React from 'react';
import { getAppointmentTypeIcon, getPriorityLevel, getPriorityColor } from '../utils/doctorAppointmentUtils';
import { formatDoctorScheduleDateTime } from '../utils/appointmentUtils';

const DoctorAppointmentCard = ({ 
    appointment, 
    getStatusColor, 
    formatTime, 
    formatDate, 
    updateAppointmentStatus, 
    setSelectedAppointment 
}) => {
    const statusColors = getStatusColor(appointment.status);
    const priorityLevel = getPriorityLevel(appointment);
    const priorityColor = getPriorityColor(priorityLevel);

    return (
        <div style={{
            background: 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(20px)',
            borderRadius: '20px',
            padding: '2rem',
            boxShadow: '0 12px 30px rgba(59, 130, 246, 0.1), 0 6px 20px rgba(0, 0, 0, 0.05)',
            border: '1px solid rgba(59, 130, 246, 0.15)',
            transition: 'all 0.3s ease',
            cursor: 'pointer',
            position: 'relative',
            overflow: 'hidden'
        }}
        onMouseEnter={e => {
            e.target.style.transform = 'translateY(-4px)';
            e.target.style.boxShadow = '0 20px 40px rgba(59, 130, 246, 0.15), 0 10px 30px rgba(0, 0, 0, 0.08)';
        }}
        onMouseLeave={e => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 12px 30px rgba(59, 130, 246, 0.1), 0 6px 20px rgba(0, 0, 0, 0.05)';
        }}
        onClick={() => setSelectedAppointment(appointment)}
        >
            {appointment.isEmergency && (
                <div style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                    color: 'white',
                    padding: '0.5rem 1rem',
                    borderRadius: '12px',
                    fontSize: '0.8rem',
                    fontWeight: '700',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)'
                }}>
                    🚨 EMERGENCY
                </div>
            )}

            <div style={{
                position: 'absolute',
                top: '-20px',
                left: '-20px',
                width: '80px',
                height: '80px',
                background: 'rgba(59, 130, 246, 0.05)',
                borderRadius: '50%'
            }} />

            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '1.5rem',
                position: 'relative',
                zIndex: 1
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{
                        width: '60px',
                        height: '60px',
                        background: `linear-gradient(135deg, ${priorityColor} 0%, ${priorityColor}CC 100%)`,
                        borderRadius: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.8rem',
                        boxShadow: `0 8px 20px ${priorityColor}40`
                    }}>
                        {getAppointmentTypeIcon(appointment.type)}
                    </div>
                    <div>
                        <h3 style={{
                            fontSize: '1.4rem',
                            fontWeight: '700',
                            color: '#374151',
                            margin: '0 0 0.25rem'
                        }}>
                            {appointment.patientName}
                        </h3>
                        <p style={{
                            fontSize: '0.9rem',
                            color: '#6b7280',
                            margin: 0,
                            fontWeight: '500'
                        }}>
                            Age: {appointment.patientAge} • {appointment.type}
                        </p>
                    </div>
                </div>
                
                <div style={{
                    background: statusColors.bg,
                    color: statusColors.color,
                    padding: '0.5rem 1rem',
                    borderRadius: '12px',
                    fontSize: '0.85rem',
                    fontWeight: '600',
                    border: `1px solid ${statusColors.border}`,
                    textTransform: 'capitalize'
                }}>
                    {appointment.status}
                </div>
            </div>

            <div style={{
                background: 'rgba(243, 244, 246, 0.7)',
                borderRadius: '16px',
                padding: '1.25rem',
                marginBottom: '1.5rem',
                border: '1px solid rgba(209, 213, 219, 0.5)'
            }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '1rem',
                    marginBottom: '1rem'
                }}>
                    <div>
                        <p style={{
                            fontSize: '0.8rem',
                            color: '#9ca3af',
                            margin: '0 0 0.25rem',
                            fontWeight: '600',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em'
                        }}>
                            Date & Time
                        </p>
                        <p style={{
                            fontSize: '1.1rem',
                            color: '#3b82f6',
                            margin: 0,
                            fontWeight: '700'
                        }}>
                            {formatDoctorScheduleDateTime(appointment.appointmentDate)}
                        </p>
                    </div>
                    <div>
                        <p style={{
                            fontSize: '0.8rem',
                            color: '#9ca3af',
                            margin: '0 0 0.25rem',
                            fontWeight: '600',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em'
                        }}>
                            Duration
                        </p>
                        <p style={{
                            fontSize: '1rem',
                            color: '#374151',
                            margin: 0,
                            fontWeight: '600'
                        }}>
                            {appointment.duration}
                        </p>
                    </div>
                    <div>
                        <p style={{
                            fontSize: '0.8rem',
                            color: '#9ca3af',
                            margin: '0 0 0.25rem',
                            fontWeight: '600',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em'
                        }}>
                            Consultation Fee
                        </p>
                        <p style={{
                            fontSize: '1.1rem',
                            color: '#059669',
                            margin: 0,
                            fontWeight: '700'
                        }}>
                            {appointment.consultationFee}
                        </p>
                    </div>
                </div>
                
                <div>
                    <p style={{
                        fontSize: '0.8rem',
                        color: '#9ca3af',
                        margin: '0 0 0.5rem',
                        fontWeight: '600',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                    }}>
                        Reason for Visit
                    </p>
                    <p style={{
                        fontSize: '1rem',
                        color: '#374151',
                        margin: 0,
                        lineHeight: '1.5'
                    }}>
                        {appointment.reason}
                    </p>
                </div>
            </div>

            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '1rem',
                flexWrap: 'wrap'
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    fontSize: '0.9rem',
                    color: '#6b7280'
                }}>
                    <span>📧</span>
                    <span>{appointment.patientEmail}</span>
                </div>
                
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                    {appointment.status === 'pending' && (
                        <>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    updateAppointmentStatus(appointment.id, 'confirmed');
                                }}
                                style={{
                                    padding: '0.6rem 1.2rem',
                                    background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '10px',
                                    cursor: 'pointer',
                                    fontSize: '0.85rem',
                                    fontWeight: '600',
                                    transition: 'all 0.3s ease',
                                    boxShadow: '0 4px 12px rgba(34, 197, 94, 0.3)'
                                }}
                                onMouseEnter={e => {
                                    e.target.style.transform = 'translateY(-2px)';
                                    e.target.style.boxShadow = '0 6px 20px rgba(34, 197, 94, 0.4)';
                                }}
                                onMouseLeave={e => {
                                    e.target.style.transform = 'translateY(0)';
                                    e.target.style.boxShadow = '0 4px 12px rgba(34, 197, 94, 0.3)';
                                }}
                            >
                                ✓ Approve
                            </button>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    updateAppointmentStatus(appointment.id, 'cancelled');
                                }}
                                style={{
                                    padding: '0.6rem 1.2rem',
                                    background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '10px',
                                    cursor: 'pointer',
                                    fontSize: '0.85rem',
                                    fontWeight: '600',
                                    transition: 'all 0.3s ease',
                                    boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)'
                                }}
                                onMouseEnter={e => {
                                    e.target.style.transform = 'translateY(-2px)';
                                    e.target.style.boxShadow = '0 6px 20px rgba(239, 68, 68, 0.4)';
                                }}
                                onMouseLeave={e => {
                                    e.target.style.transform = 'translateY(0)';
                                    e.target.style.boxShadow = '0 4px 12px rgba(239, 68, 68, 0.3)';
                                }}
                            >
                                ✗ Decline
                            </button>
                        </>
                    )}
                    
                    {appointment.status === 'confirmed' && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                updateAppointmentStatus(appointment.id, 'completed');
                            }}
                            style={{
                                padding: '0.6rem 1.2rem',
                                background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '10px',
                                cursor: 'pointer',
                                fontSize: '0.85rem',
                                fontWeight: '600',
                                transition: 'all 0.3s ease',
                                boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
                            }}
                            onMouseEnter={e => {
                                e.target.style.transform = 'translateY(-2px)';
                                e.target.style.boxShadow = '0 6px 20px rgba(59, 130, 246, 0.4)';
                            }}
                            onMouseLeave={e => {
                                e.target.style.transform = 'translateY(0)';
                                e.target.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.3)';
                            }}
                        >
                            ✓ Mark Complete
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DoctorAppointmentCard;
