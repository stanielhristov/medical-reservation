import React from 'react';
import { useTranslation } from 'react-i18next';
import { translateSpecialization } from '../utils/specializationUtils';
import { formatPatientDateTime, translateAppointmentType } from '../utils/appointmentUtils';

const NextAppointmentCard = ({ appointment, onViewDetails }) => {
    const { t } = useTranslation();
    
    if (!appointment) {
        return (
            <section style={{
                background: 'rgba(255, 255, 255, 0.98)',
                backdropFilter: 'blur(20px)',
                borderRadius: '24px',
                padding: '3rem',
                marginBottom: '3rem',
                boxShadow: '0 16px 32px rgba(0, 0, 0, 0.06)',
                border: '1px solid rgba(0, 0, 0, 0.08)',
                textAlign: 'center'
            }}>
                <div style={{
                    width: '80px',
                    height: '80px',
                    background: 'rgba(34, 197, 94, 0.1)',
                    borderRadius: '16px',
                    margin: '0 auto 1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '2rem',
                    color: '#22c55e'
                }}>
                    📅
                </div>
                <h3 style={{
                    fontSize: '1.3rem',
                    fontWeight: '600',
                    color: '#6b7280',
                    margin: '0 0 0.5rem 0'
                }}>
                    {t('appointments.noUpcomingAppointments')}
                </h3>
                <p style={{
                    color: '#9ca3af',
                    margin: 0
                }}>
                    {t('appointments.noUpcomingDesc')}
                </p>
            </section>
        );
    }

    return (
        <section style={{
            background: 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(20px)',
            borderRadius: '24px',
            padding: '3rem',
            marginBottom: '3rem',
            boxShadow: '0 16px 32px rgba(59, 130, 246, 0.12), 0 8px 24px rgba(0, 0, 0, 0.06)',
            border: '1px solid rgba(59, 130, 246, 0.15)',
            position: 'relative',
            overflow: 'hidden'
        }}>
            <div style={{
                position: 'absolute',
                top: '-50px',
                right: '-50px',
                width: '150px',
                height: '150px',
                background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
                borderRadius: '50%'
            }} />
            
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '2rem'
            }}>
                <div style={{
                    width: '12px',
                    height: '12px',
                    background: '#22c55e',
                    borderRadius: '50%',
                    animation: 'pulse 2s infinite'
                }} />
                <h2 style={{
                    fontSize: '1.5rem',
                    fontWeight: '700',
                    color: '#374151',
                    margin: 0
                }}>
                    {t('appointments.nextAppointment')}
                </h2>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'auto 1fr auto',
                gap: '2rem',
                alignItems: 'center'
            }}>
                <div style={{
                    width: '80px',
                    height: '80px',
                    background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '2.5rem',
                    boxShadow: '0 8px 24px rgba(59, 130, 246, 0.3)',
                    position: 'relative',
                    zIndex: 1
                }}>
                    {appointment.doctorImage || '👩‍⚕️'}
                </div>

                <div style={{ position: 'relative', zIndex: 1 }}>
                    <h3 style={{
                        fontSize: '1.4rem',
                        fontWeight: '700',
                        color: '#374151',
                        margin: '0 0 0.5rem 0'
                    }}>
                        {appointment.doctorName}
                    </h3>
                    <p style={{
                        fontSize: '1.1rem',
                        color: '#3b82f6',
                        margin: '0 0 0.25rem 0',
                        fontWeight: '600'
                    }}>
                        {translateSpecialization(appointment.specialization)}
                    </p>
                    <p style={{
                        fontSize: '1rem',
                        color: '#6b7280',
                        margin: '0 0 1rem 0'
                    }}>
                        {translateAppointmentType(appointment.type)}
                    </p>
                    
                    <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '1rem',
                        alignItems: 'center'
                    }}>
                        <div style={{
                            background: 'rgba(34, 197, 94, 0.1)',
                            color: '#16a34a',
                            padding: '0.5rem 1rem',
                            borderRadius: '12px',
                            fontSize: '0.9rem',
                            fontWeight: '600'
                        }}>
                            📅 {formatPatientDateTime(new Date(appointment.date))}
                        </div>
                    </div>
                </div>

                <button
                    onClick={() => onViewDetails && onViewDetails(appointment)}
                    style={{
                        background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '16px',
                        padding: '1rem 1.5rem',
                        fontSize: '0.95rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        boxShadow: '0 8px 20px rgba(59, 130, 246, 0.3)',
                        position: 'relative',
                        zIndex: 1
                    }}
                >
                    {t('appointments.viewDetails')} →
                </button>
            </div>
        </section>
    );
};

export default NextAppointmentCard;
