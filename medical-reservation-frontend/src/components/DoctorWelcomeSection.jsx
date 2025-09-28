import React from 'react';

const DoctorWelcomeSection = ({ user, dashboardStats }) => {
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
                    background: '#10b981',
                    borderRadius: '24px',
                    margin: '0 auto 2.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 16px 40px rgba(16, 185, 129, 0.3)',
                    border: '3px solid #047857',
                    position: 'relative'
                }}>
                    <div style={{
                        width: '60px',
                        height: '60px',
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <div style={{
                            position: 'absolute',
                            top: '10px',
                            left: '50%',
                            width: '10px',
                            height: '40px',
                            background: 'white',
                            borderRadius: '3px',
                            transform: 'translateX(-50%)',
                            boxShadow: '0 3px 12px rgba(0,0,0,0.15)'
                        }} />
                        <div style={{
                            position: 'absolute',
                            top: '50%',
                            left: '10px',
                            width: '40px',
                            height: '10px',
                            background: 'white',
                            borderRadius: '3px',
                            transform: 'translateY(-50%)',
                            boxShadow: '0 3px 12px rgba(0,0,0,0.15)'
                        }} />
                    </div>
                </div>
                
                <h1 style={{
                    fontSize: '3rem',
                    fontWeight: '900',
                    color: '#1f2937',
                    margin: '0 0 1rem',
                    letterSpacing: '-0.04em',
                    lineHeight: '1.1'
                }}>
                    Welcome, Dr. {user?.fullName?.split(' ').pop() || 'Doctor'}
                </h1>
                
                <div style={{
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    color: 'white',
                    padding: '0.75rem 2rem',
                    borderRadius: '50px',
                    margin: '0 auto 2rem',
                    fontSize: '1.1rem',
                    fontWeight: '700',
                    boxShadow: '0 8px 25px rgba(16, 185, 129, 0.3)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.75rem'
                }}>
                    <span style={{ fontSize: '1.2rem' }}>🩺</span>
                    Medical Professional
                </div>
                
                <p style={{
                    fontSize: '1.2rem',
                    color: '#6b7280',
                    margin: '0 0 2.5rem',
                    maxWidth: '600px',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    lineHeight: '1.6',
                    fontWeight: '500'
                }}>
                    Your comprehensive medical dashboard. Manage appointments, view patient information, 
                    and track your daily medical practice with advanced healthcare tools.
                </p>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '1.5rem',
                    maxWidth: '800px',
                    margin: '0 auto'
                }}>
                    <div style={{
                        background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                        borderRadius: '20px',
                        padding: '1.5rem',
                        color: 'white',
                        boxShadow: '0 8px 25px rgba(59, 130, 246, 0.3)'
                    }}>
                        <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📅</div>
                        <div style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '0.25rem' }}>
                            {dashboardStats.todayAppointments || 0}
                        </div>
                        <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>Today's Appointments</div>
                    </div>
                    
                    <div style={{
                        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                        borderRadius: '20px',
                        padding: '1.5rem',
                        color: 'white',
                        boxShadow: '0 8px 25px rgba(16, 185, 129, 0.3)'
                    }}>
                        <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>👥</div>
                        <div style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '0.25rem' }}>
                            {dashboardStats.totalPatients || 0}
                        </div>
                        <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>Total Patients</div>
                    </div>
                    
                    <div style={{
                        background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                        borderRadius: '20px',
                        padding: '1.5rem',
                        color: 'white',
                        boxShadow: '0 8px 25px rgba(245, 158, 11, 0.3)'
                    }}>
                        <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⏰</div>
                        <div style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '0.25rem' }}>
                            {dashboardStats.upcomingAppointments || 0}
                        </div>
                        <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>Upcoming</div>
                    </div>
                    
                    <div style={{
                        background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                        borderRadius: '20px',
                        padding: '1.5rem',
                        color: 'white',
                        boxShadow: '0 8px 25px rgba(139, 92, 246, 0.3)'
                    }}>
                        <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⚕️</div>
                        <div style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '0.25rem' }}>
                            {dashboardStats.completedToday || 0}
                        </div>
                        <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>Completed Today</div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DoctorWelcomeSection;
