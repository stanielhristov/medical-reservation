import React from 'react';

const AdminStatisticsCards = ({ statistics, onNavigation }) => {
    const statCards = [
        {
            title: 'Total Users',
            value: statistics.totalUsers,
            icon: '👥',
            color: '#10b981',
            bgColor: 'rgba(16, 185, 129, 0.1)',
            borderColor: 'rgba(16, 185, 129, 0.2)',
            path: '/admin/users'
        },
        {
            title: 'Patients',
            value: statistics.totalPatients,
            icon: '🏥',
            color: '#3b82f6',
            bgColor: 'rgba(59, 130, 246, 0.1)',
            borderColor: 'rgba(59, 130, 246, 0.2)',
            path: '/admin/users?filter=patient'
        },
        {
            title: 'Doctors',
            value: statistics.totalDoctors,
            icon: '👩‍⚕️',
            color: '#8b5cf6',
            bgColor: 'rgba(139, 92, 246, 0.1)',
            borderColor: 'rgba(139, 92, 246, 0.2)',
            path: '/admin/doctors'
        },
        {
            title: 'Appointments',
            value: statistics.totalAppointments,
            icon: '📅',
            color: '#f59e0b',
            bgColor: 'rgba(245, 158, 11, 0.1)',
            borderColor: 'rgba(245, 158, 11, 0.2)',
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
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'flex-start',
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
                            
                            <div style={{
                                background: card.bgColor,
                                color: card.color,
                                padding: '0.5rem 1rem',
                                borderRadius: '50px',
                                fontSize: '0.8rem',
                                fontWeight: '600',
                                border: `1px solid ${card.borderColor}`
                            }}>
                                Live Data
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
                            <span>View Details</span>
                            <span style={{ fontSize: '0.8rem' }}>→</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AdminStatisticsCards;
