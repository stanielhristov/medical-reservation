import React from 'react';
import { useTranslation } from 'react-i18next';

const UsersIcon = () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
);

const PatientsIcon = () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
);

const DoctorsIcon = () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"/>
        <path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4"/>
        <circle cx="20" cy="10" r="2"/>
    </svg>
);

const CalendarIcon = () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
        <line x1="16" y1="2" x2="16" y2="6"/>
        <line x1="8" y1="2" x2="8" y2="6"/>
        <line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
);

const AdminStatisticsCards = ({ statistics, onNavigation }) => {
    const { t } = useTranslation();
    
    const statCards = [
        {
            title: t('admin.totalUsers'),
            value: statistics.totalUsers,
            icon: <UsersIcon />,
            color: '#22c55e',
            bgColor: 'rgba(34, 197, 94, 0.1)',
            borderColor: 'rgba(34, 197, 94, 0.2)',
            path: '/admin/users'
        },
        {
            title: t('patients.title'),
            value: statistics.totalPatients,
            icon: <PatientsIcon />,
            color: '#22c55e',
            bgColor: 'rgba(34, 197, 94, 0.1)',
            borderColor: 'rgba(34, 197, 94, 0.2)',
            path: '/admin/users?filter=patient'
        },
        {
            title: t('doctors.title'),
            value: statistics.totalDoctors,
            icon: <DoctorsIcon />,
            color: '#22c55e',
            bgColor: 'rgba(34, 197, 94, 0.1)',
            borderColor: 'rgba(34, 197, 94, 0.2)',
            path: '/admin/doctors'
        },
        {
            title: t('appointments.title'),
            value: statistics.totalAppointments,
            icon: <CalendarIcon />,
            color: '#22c55e',
            bgColor: 'rgba(34, 197, 94, 0.1)',
            borderColor: 'rgba(34, 197, 94, 0.2)',
            path: '/admin/appointments'
        }
    ];

    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem',
            marginBottom: '3rem'
        }}>
            {statCards.map((card, index) => (
                <div
                    key={index}
                    onClick={() => onNavigation(card.path)}
                    style={{
                        background: 'rgba(255, 255, 255, 0.98)',
                        backdropFilter: 'blur(20px)',
                        borderRadius: '24px',
                        padding: '2rem',
                        boxShadow: '0 12px 30px rgba(0, 0, 0, 0.08), 0 6px 20px rgba(0, 0, 0, 0.04)',
                        border: `1px solid ${card.borderColor}`,
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        position: 'relative',
                        overflow: 'hidden'
                    }}
                    onMouseEnter={e => {
                        e.target.style.transform = 'translateY(-6px)';
                        e.target.style.boxShadow = `0 20px 40px rgba(0, 0, 0, 0.12), 0 10px 30px ${card.color}20`;
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
                        background: card.bgColor,
                        borderRadius: '50%',
                        zIndex: 0
                    }} />
                    
                    <div style={{ position: 'relative', zIndex: 1 }}>
                        <div style={{
                            marginBottom: '1.5rem'
                        }}>
                            <div style={{
                                width: '60px',
                                height: '60px',
                                background: `linear-gradient(135deg, ${card.color} 0%, ${card.color}CC 100%)`,
                                borderRadius: '16px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '1.8rem',
                                boxShadow: `0 8px 20px ${card.color}40`
                            }}>
                                {card.icon}
                            </div>
                        </div>
                        
                        <h3 style={{
                            fontSize: '1rem',
                            fontWeight: '600',
                            color: '#6b7280',
                            margin: '0 0 0.5rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em'
                        }}>
                            {card.title}
                        </h3>
                        
                        <div style={{
                            fontSize: '2.5rem',
                            fontWeight: '900',
                            color: '#1f2937',
                            margin: '0 0 1rem',
                            lineHeight: '1'
                        }}>
                            {card.value.toLocaleString()}
                        </div>
                        
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            color: card.color,
                            fontSize: '0.9rem',
                            fontWeight: '600'
                        }}>
                            <span>{t('common.view')} {t('common.details')}</span>
                            <span style={{ fontSize: '0.8rem' }}>→</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AdminStatisticsCards;
