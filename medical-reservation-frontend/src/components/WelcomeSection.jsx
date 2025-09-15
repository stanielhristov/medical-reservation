const WelcomeSection = ({ user }) => {
    return (
        <section style={{
            background: 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(20px)',
            borderRadius: '32px',
            padding: '4rem 3rem',
            marginBottom: '3rem',
            boxShadow: '0 32px 64px rgba(34, 197, 94, 0.12), 0 16px 32px rgba(0, 0, 0, 0.06)',
            border: '1px solid rgba(34, 197, 94, 0.15)',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden'
        }}>
            <div style={{
                position: 'absolute',
                top: '-50%',
                right: '-20%',
                width: '400px',
                height: '400px',
                background: 'radial-gradient(circle, rgba(34, 197, 94, 0.05) 0%, transparent 70%)',
                borderRadius: '50%',
                zIndex: 0
            }} />
            
            <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{
                    width: '120px',
                    height: '120px',
                    background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                    borderRadius: '24px',
                    margin: '0 auto 2.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 16px 40px rgba(34, 197, 94, 0.3)',
                    position: 'relative'
                }}>
                    <span style={{ fontSize: '3.5rem', color: 'white' }}>👋</span>
                    <div style={{
                        position: 'absolute',
                        inset: '-4px',
                        background: 'linear-gradient(45deg, transparent, rgba(255,255,255,0.3), transparent)',
                        borderRadius: '28px',
                        zIndex: -1
                    }} />
                </div>
                
                <h1 style={{
                    fontSize: '2.8rem',
                    fontWeight: '800',
                    color: '#374151',
                    margin: '0 0 1rem',
                    letterSpacing: '-0.03em',
                    lineHeight: '1.1'
                }}>
                    Welcome Back,
                    <br />
                    <span style={{
                        background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                    }}>
                        {user.fullName?.split(' ')[0] || 'User'}!
                    </span>
                </h1>
                
                <p style={{
                    fontSize: '1.25rem',
                    color: '#6b7280',
                    margin: '0 0 3rem',
                    maxWidth: '700px',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    lineHeight: '1.6',
                    fontWeight: '400'
                }}>
                    Your comprehensive healthcare dashboard is ready. Manage appointments, access health records, 
                    and stay connected with your healthcare providers all in one place.
                </p>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                    gap: '1.5rem',
                    maxWidth: '800px',
                    margin: '0 auto'
                }}>
                    <div style={{
                        background: 'rgba(34, 197, 94, 0.1)',
                        padding: '1.5rem',
                        borderRadius: '16px',
                        border: '1px solid rgba(34, 197, 94, 0.2)'
                    }}>
                        <div style={{ color: '#22c55e', fontSize: '2rem', marginBottom: '0.5rem' }}>📅</div>
                        <div style={{ color: '#374151', fontWeight: '700', fontSize: '1.5rem' }}>2</div>
                        <div style={{ color: '#6b7280', fontSize: '0.9rem' }}>Upcoming Appointments</div>
                    </div>
                    <div style={{
                        background: 'rgba(59, 130, 246, 0.1)',
                        padding: '1.5rem',
                        borderRadius: '16px',
                        border: '1px solid rgba(59, 130, 246, 0.2)'
                    }}>
                        <div style={{ color: '#3b82f6', fontSize: '2rem', marginBottom: '0.5rem' }}>📋</div>
                        <div style={{ color: '#374151', fontWeight: '700', fontSize: '1.5rem' }}>8</div>
                        <div style={{ color: '#6b7280', fontSize: '0.9rem' }}>Health Records</div>
                    </div>
                    <div style={{
                        background: 'rgba(168, 85, 247, 0.1)',
                        padding: '1.5rem',
                        borderRadius: '16px',
                        border: '1px solid rgba(168, 85, 247, 0.2)'
                    }}>
                        <div style={{ color: '#a855f7', fontSize: '2rem', marginBottom: '0.5rem' }}>🩺</div>
                        <div style={{ color: '#374151', fontWeight: '700', fontSize: '1.5rem' }}>3</div>
                        <div style={{ color: '#6b7280', fontSize: '0.9rem' }}>Preferred Doctors</div>
                    </div>
                    <div style={{
                        background: 'rgba(239, 68, 68, 0.1)',
                        padding: '1.5rem',
                        borderRadius: '16px',
                        border: '1px solid rgba(239, 68, 68, 0.2)'
                    }}>
                        <div style={{ color: '#ef4444', fontSize: '2rem', marginBottom: '0.5rem' }}>🔔</div>
                        <div style={{ color: '#374151', fontWeight: '700', fontSize: '1.5rem' }}>1</div>
                        <div style={{ color: '#6b7280', fontSize: '0.9rem' }}>New Notifications</div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WelcomeSection;
