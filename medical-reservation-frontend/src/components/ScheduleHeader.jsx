const ScheduleHeader = () => {
    return (
        <section style={{
            background: 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(20px)',
            borderRadius: '24px',
            padding: '3rem',
            marginBottom: '2rem',
            boxShadow: '0 20px 40px rgba(21, 128, 61, 0.15)',
            border: '1px solid rgba(21, 128, 61, 0.1)',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden'
        }}>
            <div style={{
                position: 'absolute',
                top: '-50%',
                right: '-20%',
                width: '300px',
                height: '300px',
                background: 'radial-gradient(circle, rgba(21, 128, 61, 0.05) 0%, transparent 70%)',
                borderRadius: '50%',
                zIndex: 0
            }} />
            
            <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{
                    width: '100px',
                    height: '100px',
                    background: 'linear-gradient(135deg, #15803d 0%, #14532d 100%)',
                    borderRadius: '20px',
                    margin: '0 auto 2rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 16px 40px rgba(21, 128, 61, 0.3)'
                }}>
                    <span style={{ fontSize: '3rem', color: 'white' }}>🗓️</span>
                </div>
                
                <h1 style={{
                    fontSize: '2.5rem',
                    fontWeight: '800',
                    color: '#374151',
                    margin: '0 0 1rem',
                    letterSpacing: '-0.025em'
                }}>
                    Schedule Management
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
                    Manage your working hours, availability, and time slots for patient appointments
                </p>
            </div>
        </section>
    );
};

export default ScheduleHeader;
