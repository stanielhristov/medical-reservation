import React from 'react';

const DashboardWelcome = ({ user }) => {
    const getTimeOfDay = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good morning';
        if (hour < 17) return 'Good afternoon';
        return 'Good evening';
    };

    return (
        <section style={{
            background: 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(20px)',
            borderRadius: '32px',
            padding: '3rem',
            marginBottom: '3rem',
            boxShadow: '0 32px 64px rgba(34, 197, 94, 0.12), 0 16px 32px rgba(0, 0, 0, 0.06)',
            border: '1px solid rgba(34, 197, 94, 0.15)',
            textAlign: 'center'
        }}>
            <div style={{
                width: '100px',
                height: '100px',
                background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                borderRadius: '20px',
                margin: '0 auto 2rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 16px 40px rgba(34, 197, 94, 0.3)'
            }}>
                <span style={{ fontSize: '3rem', color: 'white' }}>👋</span>
            </div>
            
            <h1 style={{
                fontSize: '2.5rem',
                fontWeight: '800',
                color: '#374151',
                margin: '0 0 1rem',
                letterSpacing: '-0.025em'
            }}>
                {getTimeOfDay()}, {user?.fullName || 'Patient'}!
            </h1>
            
            <p style={{
                fontSize: '1.2rem',
                color: '#6b7280',
                margin: 0,
                maxWidth: '600px',
                marginLeft: 'auto',
                marginRight: 'auto',
                lineHeight: '1.6'
            }}>
                Welcome to your personal health dashboard. Stay on top of your appointments and health journey.
            </p>
        </section>
    );
};

export default DashboardWelcome;
