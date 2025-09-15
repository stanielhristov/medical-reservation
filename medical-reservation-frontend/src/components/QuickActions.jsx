import React from 'react';

const QuickActions = ({ onNavigate }) => {
    const quickActions = [
        {
            title: 'Book Appointment',
            description: 'Schedule a new appointment with your doctor',
            icon: '📅',
            color: '#3b82f6',
            path: '/patient/doctors',
            gradient: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)'
        },
        {
            title: 'View Appointments',
            description: 'Manage your upcoming and past appointments',
            icon: '📋',
            color: '#10b981',
            path: '/patient/appointments',
            gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
        },
        {
            title: 'Medical History',
            description: 'Access your complete medical records',
            icon: '🏥',
            color: '#8b5cf6',
            path: '/patient/medical-history',
            gradient: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)'
        },
        {
            title: 'Notifications',
            description: 'Stay updated with important alerts',
            icon: '🔔',
            color: '#f59e0b',
            path: '/patient/notifications',
            gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
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
                        Get Started →
                    </div>
                </div>
            ))}
        </section>
    );
};

export default QuickActions;
