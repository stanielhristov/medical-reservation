import React from 'react';

const DoctorQuickActions = ({ onNavigation }) => {
    const quickActions = [
        {
            title: 'View Appointments',
            description: 'See today\'s schedule and upcoming appointments',
            icon: '📅',
            color: '#3b82f6',
            bgColor: 'rgba(59, 130, 246, 0.1)',
            borderColor: 'rgba(59, 130, 246, 0.2)',
            path: '/doctor/appointments'
        },
        {
            title: 'Manage Patients',
            description: 'Access patient records and medical history',
            icon: '👥',
            color: '#10b981',
            bgColor: 'rgba(16, 185, 129, 0.1)',
            borderColor: 'rgba(16, 185, 129, 0.2)',
            path: '/doctor/patients'
        },
        {
            title: 'Schedule Management',
            description: 'Update availability and time slots',
            icon: '🗓️',
            color: '#f59e0b',
            bgColor: 'rgba(245, 158, 11, 0.1)',
            borderColor: 'rgba(245, 158, 11, 0.2)',
            path: '/doctor/schedule'
        },
        {
            title: 'Medical Reports',
            description: 'Generate and review patient reports',
            icon: '📋',
            color: '#8b5cf6',
            bgColor: 'rgba(139, 92, 246, 0.1)',
            borderColor: 'rgba(139, 92, 246, 0.2)',
            path: '/doctor/reports'
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
                                fontSize: '1.8rem',
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
                            <span>Access Now</span>
                            <span style={{ fontSize: '0.8rem' }}>→</span>
                        </div>
                    </div>
                </div>
            ))}
        </section>
    );
};

export default DoctorQuickActions;
