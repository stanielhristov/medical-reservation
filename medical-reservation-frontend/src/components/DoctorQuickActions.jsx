import React from 'react';
import { useTranslation } from 'react-i18next';

const CalendarIcon = () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
        <line x1="16" y1="2" x2="16" y2="6"/>
        <line x1="8" y1="2" x2="8" y2="6"/>
        <line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
);

const UsersIcon = () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
);

const ScheduleIcon = () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
        <line x1="16" y1="2" x2="16" y2="6"/>
        <line x1="8" y1="2" x2="8" y2="6"/>
        <line x1="3" y1="10" x2="21" y2="10"/>
        <line x1="10" y1="14" x2="14" y2="14"/>
    </svg>
);

const RefreshIcon = () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M23 4v6h-6"/>
        <path d="M1 20v-6h6"/>
        <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
    </svg>
);

const BellIcon = () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
        <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
    </svg>
);

const DoctorQuickActions = ({ onNavigation }) => {
    const { t } = useTranslation();
    const quickActions = [
        {
            title: t('doctor.viewAppointments'),
            description: t('doctor.viewAppointmentsDescription'),
            icon: <CalendarIcon />,
            color: '#22c55e',
            bgColor: 'rgba(34, 197, 94, 0.1)',
            borderColor: 'rgba(34, 197, 94, 0.2)',
            path: '/doctor/appointments'
        },
        {
            title: t('doctor.managePatients'),
            description: t('doctor.managePatientsDescription'),
            icon: <UsersIcon />,
            color: '#22c55e',
            bgColor: 'rgba(34, 197, 94, 0.1)',
            borderColor: 'rgba(34, 197, 94, 0.2)',
            path: '/doctor/patients'
        },
        {
            title: t('doctor.scheduleManagement'),
            description: t('doctor.scheduleManagementDescription'),
            icon: <ScheduleIcon />,
            color: '#22c55e',
            bgColor: 'rgba(34, 197, 94, 0.1)',
            borderColor: 'rgba(34, 197, 94, 0.2)',
            path: '/doctor/schedule'
        },
        {
            title: t('doctor.rescheduleRequests'),
            description: t('doctor.rescheduleRequestsDescription'),
            icon: <RefreshIcon />,
            color: '#22c55e',
            bgColor: 'rgba(34, 197, 94, 0.1)',
            borderColor: 'rgba(34, 197, 94, 0.2)',
            path: '/doctor/reschedule-requests'
        },
        {
            title: t('doctor.notifications'),
            description: t('doctor.notificationsDescription'),
            icon: <BellIcon />,
            color: '#22c55e',
            bgColor: 'rgba(34, 197, 94, 0.1)',
            borderColor: 'rgba(34, 197, 94, 0.2)',
            path: '/doctor/notifications'
        }
    ];

    return (
        <section style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            marginBottom: '3rem'
        }}>
            {quickActions.map((action, index) => (
                <div
                    key={index}
                    onClick={() => onNavigation(action.path)}
                    style={{
                        background: 'rgba(255, 255, 255, 0.98)',
                        backdropFilter: 'blur(20px)',
                        borderRadius: '24px',
                        padding: '2rem',
                        boxShadow: '0 12px 30px rgba(0, 0, 0, 0.08), 0 6px 20px rgba(0, 0, 0, 0.04)',
                        border: `1px solid ${action.borderColor}`,
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        position: 'relative',
                        overflow: 'hidden'
                    }}
                    onMouseEnter={e => {
                        e.target.style.transform = 'translateY(-6px)';
                        e.target.style.boxShadow = `0 20px 40px rgba(0, 0, 0, 0.12), 0 10px 30px ${action.color}20`;
                    }}
                    onMouseLeave={e => {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.08), 0 6px 20px rgba(0, 0, 0, 0.04)';
                    }}
                >
                    <div style={{
                        position: 'absolute',
                        top: '-20px',
                        right: '-20px',
                        width: '100px',
                        height: '100px',
                        background: action.bgColor,
                        borderRadius: '50%',
                        zIndex: 0
                    }} />
                    
                    <div style={{ position: 'relative', zIndex: 1 }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem',
                            marginBottom: '1.5rem'
                        }}>
                            <div style={{
                                width: '60px',
                                height: '60px',
                                background: `linear-gradient(135deg, ${action.color} 0%, ${action.color}CC 100%)`,
                                borderRadius: '16px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxShadow: `0 8px 20px ${action.color}40`
                            }}>
                                {action.icon}
                            </div>
                            
                            <div>
                                <h3 style={{
                                    fontSize: '1.3rem',
                                    fontWeight: '700',
                                    color: '#374151',
                                    margin: 0
                                }}>
                                    {action.title}
                                </h3>
                            </div>
                        </div>
                        
                        <p style={{
                            fontSize: '1rem',
                            color: '#6b7280',
                            margin: '0 0 1.5rem',
                            lineHeight: '1.5'
                        }}>
                            {action.description}
                        </p>
                        
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            color: action.color,
                            fontSize: '0.9rem',
                            fontWeight: '600'
                        }}>
                            <span>{t('doctor.accessNow')}</span>
                            <span style={{ fontSize: '0.8rem' }}>→</span>
                        </div>
                    </div>
                </div>
            ))}
        </section>
    );
};

export default DoctorQuickActions;
