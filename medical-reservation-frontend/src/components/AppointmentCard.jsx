import React from 'react';
import { useTranslation } from 'react-i18next';
import { translateSpecialization } from '../utils/specializationUtils';
import { getStatusColor, formatPatientDateTime, translateAppointmentType, translateDuration } from '../utils/appointmentUtils';

const AppointmentCard = ({ appointment, onCancel, onReschedule, selectedTab }) => {
    const { t } = useTranslation();
    const statusStyle = getStatusColor(appointment.status);
    const isUpcoming = selectedTab === 'upcoming';
    const isPast = selectedTab === 'past';

    const getStatusTranslation = (status) => {
        const statusMap = {
            'completed': t('appointments.completed'),
            'confirmed': t('appointments.confirmed'),
            'pending': t('appointments.pending'),
            'cancelled': t('appointments.cancelled'),
            'rescheduled': t('appointments.rescheduled')
        };
        return statusMap[status?.toLowerCase()] || status;
    };

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
                        background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
                        borderRadius: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '2rem',
                        border: '2px solid #86efac'
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
                            color: '#22c55e',
                            margin: '0 0 0.25rem 0',
                            fontWeight: '600'
                        }}>
                            {translateSpecialization(appointment.specialization)}
                        </p>
                        <p style={{
                            fontSize: '0.9rem',
                            color: '#6b7280',
                            margin: 0
                        }}>
                            {translateAppointmentType(appointment.type)}
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
                        {getStatusTranslation(appointment.status)}
                    </div>
                    
                </div>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '1.5rem',
                marginBottom: '1.5rem'
            }}>
                <div style={{
                    background: 'rgba(34, 197, 94, 0.05)',
                    padding: '1.5rem',
                    borderRadius: '16px',
                    border: '1px solid rgba(34, 197, 94, 0.1)'
                }}>
                    <h4 style={{
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        color: '#6b7280',
                        margin: '0 0 0.5rem 0',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                    }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                            <line x1="16" y1="2" x2="16" y2="6"/>
                            <line x1="8" y1="2" x2="8" y2="6"/>
                            <line x1="3" y1="10" x2="21" y2="10"/>
                        </svg>
                        {t('appointments.dateAndTime')}
                    </h4>
                    <p style={{
                        fontSize: '1.1rem',
                        fontWeight: '600',
                        color: '#22c55e',
                        margin: '0 0 0.25rem 0'
                    }}>
                        {formatPatientDateTime(appointment.date)}
                    </p>
                    <p style={{
                        fontSize: '0.9rem',
                        color: '#6b7280',
                        margin: 0
                    }}>
                        {t('appointments.duration')}: {translateDuration(appointment.duration)}
                    </p>
                </div>

                <div style={{
                    background: 'rgba(34, 197, 94, 0.05)',
                    padding: '1.5rem',
                    borderRadius: '16px',
                    border: '1px solid rgba(34, 197, 94, 0.1)'
                }}>
                    <h4 style={{
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        color: '#6b7280',
                        margin: '0 0 0.5rem 0',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                    }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                            <circle cx="12" cy="10" r="3"/>
                        </svg>
                        {t('appointments.location')}
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
                        {t('appointments.fee')}: {appointment.consultationFee}
                    </p>
                </div>
            </div>

            {appointment.notes && (
                <div style={{
                    background: 'rgba(34, 197, 94, 0.05)',
                    padding: '1.5rem',
                    borderRadius: '16px',
                    border: '1px solid rgba(34, 197, 94, 0.1)',
                    marginBottom: '1.5rem'
                }}>
                    <h4 style={{
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        color: '#6b7280',
                        margin: '0 0 0.5rem 0',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                    }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                        </svg>
                        {t('appointments.notes')}
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
                            background: 'rgba(34, 197, 94, 0.1)',
                            color: '#16a34a',
                            border: '1px solid rgba(34, 197, 94, 0.2)',
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
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                            <line x1="16" y1="2" x2="16" y2="6"/>
                            <line x1="8" y1="2" x2="8" y2="6"/>
                            <line x1="3" y1="10" x2="21" y2="10"/>
                        </svg>
                        {t('appointments.reschedule')}
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
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10"/>
                            <line x1="15" y1="9" x2="9" y2="15"/>
                            <line x1="9" y1="9" x2="15" y2="15"/>
                        </svg>
                        {t('appointments.cancel')}
                    </button>
                </div>
            )}
        </div>
    );
};

export default AppointmentCard;
