import React from 'react';
import { useTranslation } from 'react-i18next';
import { formatDoctorScheduleDateTime, translateAppointmentType } from '../utils/appointmentUtils';

const IncomingAppointmentsSection = ({ todayAppointments, upcomingAppointments, getStatusColor, onNavigation, onAppointmentClick }) => {
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

    // Combine today's and upcoming appointments, remove duplicates, and sort by date
    const appointmentMap = new Map();
    
    // Add today's appointments
    (todayAppointments || []).forEach(apt => {
        const key = `${apt.id}_${apt.appointmentTime || apt.appointmentDate || apt.date}`;
        if (!appointmentMap.has(key)) {
            appointmentMap.set(key, { ...apt, isToday: true });
        }
    });
    
    // Add upcoming appointments (only if not already in today's)
    (upcomingAppointments || []).forEach(apt => {
        const key = `${apt.id}_${apt.appointmentTime || apt.appointmentDate || apt.date}`;
        if (!appointmentMap.has(key)) {
            appointmentMap.set(key, { ...apt, isToday: false });
        }
    });
    
    const allAppointments = Array.from(appointmentMap.values()).sort((a, b) => {
        const dateA = new Date(a.appointmentTime || a.appointmentDate || a.date);
        const dateB = new Date(b.appointmentTime || b.appointmentDate || b.date);
        return dateA - dateB;
    });

    return (
        <section style={{ marginBottom: '3rem' }}>
            <div style={{
                background: 'rgba(255, 255, 255, 0.98)',
                backdropFilter: 'blur(20px)',
                borderRadius: '24px',
                padding: '2.5rem',
                boxShadow: '0 20px 40px rgba(34, 197, 94, 0.12), 0 16px 32px rgba(0, 0, 0, 0.06)',
                border: '1px solid rgba(34, 197, 94, 0.15)'
            }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '2rem'
                }}>
                    <h2 style={{
                        fontSize: '2rem',
                        fontWeight: '700',
                        color: '#374151',
                        margin: 0,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem'
                    }}>
                        <span style={{
                            width: '50px',
                            height: '50px',
                            background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                            borderRadius: '15px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '1.5rem',
                            boxShadow: '0 8px 20px rgba(59, 130, 246, 0.3)'
                        }}>
                            📅
                        </span>
                        {t('dashboard.todaysSchedule')}
                    </h2>
                    
                    <button
                        onClick={() => onNavigation('/doctor/appointments')}
                        style={{
                            padding: '0.75rem 1.5rem',
                            background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '12px',
                            cursor: 'pointer',
                            fontSize: '0.9rem',
                            fontWeight: '600',
                            transition: 'all 0.3s ease',
                            boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
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
                        {t('dashboard.viewAllAppointments')}
                        <span>→</span>
                    </button>
                </div>

                {allAppointments.length === 0 ? (
                    <div style={{
                        padding: '4rem 2rem',
                        textAlign: 'center',
                        color: '#6b7280'
                    }}>
                        <div style={{
                            fontSize: '4rem',
                            marginBottom: '1.5rem',
                            opacity: 0.5
                        }}>
                            📅
                        </div>
                        <h3 style={{
                            fontSize: '1.5rem',
                            fontWeight: '600',
                            margin: '0 0 0.75rem',
                            color: '#374151'
                        }}>
                            {t('dashboard.noAppointmentsToday')}
                        </h3>
                        <p style={{
                            fontSize: '1rem',
                            margin: '0 0 2rem',
                            maxWidth: '400px',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            lineHeight: '1.5'
                        }}>
                            {t('dashboard.clearScheduleMessage')}
                        </p>
                        <button
                            onClick={() => onNavigation('/doctor/schedule')}
                            style={{
                                padding: '0.8rem 1.5rem',
                                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '12px',
                                cursor: 'pointer',
                                fontSize: '1rem',
                                fontWeight: '600',
                                transition: 'all 0.3s ease',
                                boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)'
                            }}
                        >
                            {t('dashboard.manageYourSchedule')}
                        </button>
                    </div>
                ) : (
                    <div style={{
                        display: 'grid',
                        gap: '1.5rem'
                    }}>
                        {allAppointments.map(appointment => {
                            const statusColors = getStatusColor(appointment.status);
                            const appointmentDate = appointment.appointmentTime || appointment.appointmentDate || appointment.date;
                            
                            return (
                                <div
                                    key={appointment.id}
                                    style={{
                                        background: appointment.isToday 
                                            ? 'rgba(249, 250, 251, 0.8)' 
                                            : 'rgba(220, 252, 231, 0.3)',
                                        borderRadius: '16px',
                                        padding: '1.5rem',
                                        border: appointment.isToday
                                            ? '1px solid rgba(229, 231, 235, 0.6)'
                                            : '1px solid rgba(34, 197, 94, 0.2)',
                                        transition: 'all 0.3s ease',
                                        cursor: 'pointer'
                                    }}
                                    onMouseEnter={e => {
                                        e.target.style.background = appointment.isToday 
                                            ? 'rgba(243, 244, 246, 0.9)' 
                                            : 'rgba(220, 252, 231, 0.5)';
                                        e.target.style.transform = 'translateY(-2px)';
                                        e.target.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.08)';
                                    }}
                                    onMouseLeave={e => {
                                        e.target.style.background = appointment.isToday 
                                            ? 'rgba(249, 250, 251, 0.8)' 
                                            : 'rgba(220, 252, 231, 0.3)';
                                        e.target.style.transform = 'translateY(0)';
                                        e.target.style.boxShadow = 'none';
                                    }}
                                    onClick={() => {
                                        if (onAppointmentClick) {
                                            onAppointmentClick(appointment);
                                        } else {
                                            onNavigation(`/doctor/appointments`);
                                        }
                                    }}
                                >
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'flex-start',
                                        gap: '1rem'
                                    }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1 }}>
                                            <div style={{
                                                width: '50px',
                                                height: '50px',
                                                background: appointment.isToday
                                                    ? 'linear-gradient(135deg, #6b7280 0%, #4b5563 100%)'
                                                    : 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                                                borderRadius: '12px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontSize: '1.5rem',
                                                color: 'white',
                                                boxShadow: appointment.isToday
                                                    ? '0 4px 12px rgba(107, 114, 128, 0.3)'
                                                    : '0 4px 12px rgba(16, 185, 129, 0.3)'
                                            }}>
                                                👤
                                            </div>
                                            
                                            <div style={{ flex: 1 }}>
                                                <div style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '0.5rem',
                                                    marginBottom: '0.5rem'
                                                }}>
                                                    <h4 style={{
                                                        fontSize: '1.2rem',
                                                        fontWeight: '600',
                                                        color: '#374151',
                                                        margin: 0
                                                    }}>
                                                        {appointment.patientName}
                                                    </h4>
                                                    {appointment.patientAge && (
                                                        <span style={{
                                                            fontSize: '0.9rem',
                                                            color: '#6b7280',
                                                            fontWeight: '500'
                                                        }}>
                                                            {appointment.patientAge} {t('patients.yearsOld')}
                                                        </span>
                                                    )}
                                                </div>
                                                
                                                <div style={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    gap: '0.25rem',
                                                    marginBottom: '0.5rem'
                                                }}>
                                                    {(appointment.type || appointment.duration) && (
                                                        <p style={{
                                                            fontSize: '0.9rem',
                                                            color: '#6b7280',
                                                            margin: 0
                                                        }}>
                                                            {appointment.type && translateAppointmentType(appointment.type)}
                                                            {appointment.type && appointment.duration && ' • '}
                                                            {appointment.duration}
                                                        </p>
                                                    )}
                                                    
                                                    {appointment.patientPhone && (
                                                        <p style={{
                                                            fontSize: '0.85rem',
                                                            color: '#6b7280',
                                                            margin: 0,
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: '0.25rem'
                                                        }}>
                                                            📞 {appointment.patientPhone}
                                                        </p>
                                                    )}
                                                    
                                                    {appointment.patientEmail && (
                                                        <p style={{
                                                            fontSize: '0.85rem',
                                                            color: '#6b7280',
                                                            margin: 0,
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: '0.25rem'
                                                        }}>
                                                            ✉️ {appointment.patientEmail}
                                                        </p>
                                                    )}
                                                </div>
                                                
                                                <p style={{
                                                    fontSize: '1rem',
                                                    color: appointment.isToday ? '#3b82f6' : '#059669',
                                                    margin: 0,
                                                    fontWeight: '600'
                                                }}>
                                                    {appointment.isToday ? '🕐' : '📅'} {formatDoctorScheduleDateTime(appointmentDate)}
                                                </p>
                                                
                                                {appointment.reason && (
                                                    <p style={{
                                                        fontSize: '0.85rem',
                                                        color: '#6b7280',
                                                        margin: '0.5rem 0 0',
                                                        fontStyle: 'italic'
                                                    }}>
                                                        {t('appointments.reasonForVisit')}: {appointment.reason}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        
                                        <div style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: '0.5rem',
                                            alignItems: 'flex-end'
                                        }}>
                                            <div style={{
                                                background: statusColors.bg,
                                                color: statusColors.color,
                                                padding: '0.4rem 0.8rem',
                                                borderRadius: '8px',
                                                fontSize: '0.75rem',
                                                fontWeight: '600',
                                                border: `1px solid ${statusColors.border}`,
                                                textTransform: 'capitalize'
                                            }}>
                                                {getStatusTranslation(appointment.status)}
                                            </div>
                                            
                                            {appointment.reason && (
                                                <div style={{
                                                    fontSize: '0.8rem',
                                                    color: '#6b7280',
                                                    textAlign: 'right',
                                                    maxWidth: '200px'
                                                }}>
                                                    {appointment.reason.length > 50 
                                                        ? `${appointment.reason.substring(0, 50)}...` 
                                                        : appointment.reason}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </section>
    );
};

export default IncomingAppointmentsSection;

