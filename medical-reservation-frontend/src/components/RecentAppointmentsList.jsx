import React from 'react';
import { useTranslation } from 'react-i18next';
import { translateSpecialization } from '../utils/specializationUtils';
import { formatAppointmentDate, getStatusColor } from '../utils/appointmentUtils';

const RecentAppointmentsList = ({ appointments, onViewAll }) => {
    const { t } = useTranslation();
    
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
    
    if (!appointments || appointments.length === 0) {
        return (
            <section style={{
                background: 'rgba(255, 255, 255, 0.98)',
                backdropFilter: 'blur(20px)',
                borderRadius: '24px',
                padding: '3rem',
                boxShadow: '0 16px 32px rgba(0, 0, 0, 0.06)',
                border: '1px solid rgba(0, 0, 0, 0.08)',
                textAlign: 'center'
            }}>
                <h2 style={{
                    fontSize: '1.5rem',
                    fontWeight: '700',
                    color: '#374151',
                    margin: '0 0 1rem 0'
                }}>
                    {t('appointments.recentAppointments')}
                </h2>
                <div style={{
                    fontSize: '3rem',
                    marginBottom: '1rem'
                }}>
                    📋
                </div>
                <p style={{
                    color: '#6b7280',
                    margin: 0
                }}>
                    {t('appointments.noRecentAppointments')}
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
            boxShadow: '0 16px 32px rgba(0, 0, 0, 0.06)',
            border: '1px solid rgba(0, 0, 0, 0.08)'
        }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '2rem'
            }}>
                <h2 style={{
                    fontSize: '1.5rem',
                    fontWeight: '700',
                    color: '#374151',
                    margin: 0
                }}>
                    {t('appointments.recentAppointments')}
                </h2>
                
                <button
                    onClick={onViewAll}
                    style={{
                        background: 'rgba(59, 130, 246, 0.1)',
                        color: '#2563eb',
                        border: '1px solid rgba(59, 130, 246, 0.2)',
                        borderRadius: '12px',
                        padding: '0.75rem 1.5rem',
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                    }}
                >
                    {t('appointments.viewAll')} →
                </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {appointments.slice(0, 3).map((appointment, index) => {
                    const statusStyle = getStatusColor(appointment.status);
                    
                    return (
                        <div
                            key={appointment.id || index}
                            style={{
                                background: 'rgba(248, 250, 252, 0.8)',
                                borderRadius: '16px',
                                padding: '1.5rem',
                                border: '1px solid rgba(0, 0, 0, 0.05)',
                                transition: 'all 0.2s ease'
                            }}
                        >
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'flex-start',
                                marginBottom: '1rem'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <div style={{
                                        width: '40px',
                                        height: '40px',
                                        background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
                                        borderRadius: '12px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '1.2rem',
                                        border: '1px solid #bae6fd'
                                    }}>
                                        {appointment.doctorImage || '👩‍⚕️'}
                                    </div>
                                    <div>
                                        <h4 style={{
                                            fontSize: '1.1rem',
                                            fontWeight: '600',
                                            color: '#374151',
                                            margin: '0 0 0.25rem 0'
                                        }}>
                                            {appointment.doctorName}
                                        </h4>
                                        <p style={{
                                            fontSize: '0.9rem',
                                            color: '#3b82f6',
                                            margin: '0 0 0.25rem 0',
                                            fontWeight: '500'
                                        }}>
                                            {translateSpecialization(appointment.specialization)}
                                        </p>
                                        <p style={{
                                            fontSize: '0.8rem',
                                            color: '#6b7280',
                                            margin: 0
                                        }}>
                                            {formatAppointmentDate(new Date(appointment.date))}
                                        </p>
                                    </div>
                                </div>
                                
                                <div style={{
                                    background: statusStyle.bg,
                                    color: statusStyle.color,
                                    padding: '0.25rem 0.75rem',
                                    borderRadius: '8px',
                                    fontSize: '0.75rem',
                                    fontWeight: '600',
                                    textTransform: 'uppercase',
                                    border: `1px solid ${statusStyle.border}`
                                }}>
                                    {getStatusTranslation(appointment.status)}
                                </div>
                            </div>
                            
                            {appointment.notes && (
                                <p style={{
                                    fontSize: '0.9rem',
                                    color: '#6b7280',
                                    margin: 0,
                                    fontStyle: 'italic',
                                    background: 'rgba(255, 255, 255, 0.7)',
                                    padding: '0.75rem',
                                    borderRadius: '8px'
                                }}>
                                    "{appointment.notes}"
                                </p>
                            )}
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default RecentAppointmentsList;
