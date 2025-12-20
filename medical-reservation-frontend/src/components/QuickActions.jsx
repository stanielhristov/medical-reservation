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

const ClipboardIcon = () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
        <rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>
        <line x1="9" y1="12" x2="15" y2="12"/>
        <line x1="9" y1="16" x2="15" y2="16"/>
    </svg>
);

const MedicalIcon = () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="12" y1="12" x2="12" y2="18"/>
        <line x1="9" y1="15" x2="15" y2="15"/>
    </svg>
);

const BellIcon = () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
        <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
    </svg>
);

const QuickActions = ({ onNavigate }) => {
    const { t } = useTranslation();
    
    const quickActions = [
        {
            title: t('quickActions.bookAppointment'),
            description: t('quickActions.bookAppointmentDesc'),
            icon: <CalendarIcon />,
            color: '#22c55e',
            path: '/patient/doctors',
            gradient: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)'
        },
        {
            title: t('quickActions.viewAppointments'),
            description: t('quickActions.viewAppointmentsDesc'),
            icon: <ClipboardIcon />,
            color: '#22c55e',
            path: '/patient/appointments',
            gradient: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)'
        },
        {
            title: t('quickActions.medicalHistory'),
            description: t('quickActions.medicalHistoryDesc'),
            icon: <MedicalIcon />,
            color: '#22c55e',
            path: '/patient/medical-history',
            gradient: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)'
        },
        {
            title: t('quickActions.notifications'),
            description: t('quickActions.notificationsDesc'),
            icon: <BellIcon />,
            color: '#22c55e',
            path: '/patient/notifications',
            gradient: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)'
        }
    ];

    return (
        <section style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
            marginBottom: '3rem'
        }}>
            {quickActions.map((action, index) => (
                <div
                    key={index}
                    onClick={() => onNavigate(action.path)}
                    style={{
                        background: 'rgba(255, 255, 255, 0.98)',
                        backdropFilter: 'blur(20px)',
                        borderRadius: '20px',
                        padding: '2rem',
                        boxShadow: '0 16px 32px rgba(0, 0, 0, 0.06)',
                        border: '1px solid rgba(0, 0, 0, 0.08)',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        transform: 'translateY(0)',
                        position: 'relative',
                        overflow: 'hidden'
                    }}
                    onMouseEnter={(e) => {
                        e.target.style.transform = 'translateY(-4px)';
                        e.target.style.boxShadow = `0 20px 40px ${action.color}30, 0 8px 32px rgba(0, 0, 0, 0.12)`;
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = '0 16px 32px rgba(0, 0, 0, 0.06)';
                    }}
                >
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        width: '100px',
                        height: '100px',
                        background: `${action.color}10`,
                        borderRadius: '50%',
                        transform: 'translate(30px, -30px)'
                    }} />
                    
                    <div style={{
                        width: '60px',
                        height: '60px',
                        background: action.gradient,
                        borderRadius: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.8rem',
                        marginBottom: '1.5rem',
                        boxShadow: `0 8px 20px ${action.color}40`,
                        position: 'relative',
                        zIndex: 1
                    }}>
                        {action.icon}
                    </div>
                    
                    <h3 style={{
                        fontSize: '1.2rem',
                        fontWeight: '700',
                        color: '#374151',
                        margin: '0 0 0.5rem 0',
                        position: 'relative',
                        zIndex: 1
                    }}>
                        {action.title}
                    </h3>
                    
                    <p style={{
                        fontSize: '0.95rem',
                        color: '#6b7280',
                        margin: 0,
                        lineHeight: '1.5',
                        position: 'relative',
                        zIndex: 1
                    }}>
                        {action.description}
                    </p>
                    
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginTop: '1rem',
                        color: action.color,
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        position: 'relative',
                        zIndex: 1
                    }}>
                        {t('quickActions.getStarted')} →
                    </div>
                </div>
            ))}
        </section>
    );
};

export default QuickActions;
