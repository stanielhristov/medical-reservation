import React from 'react';

const AdminWelcomeSection = () => {
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
                            top: '15px',
                            left: '10px',
                            width: '40px',
                            height: '30px',
                            background: 'white',
                            borderRadius: '8px 8px 0 0',
                            boxShadow: '0 3px 12px rgba(0,0,0,0.15)'
                        }}>
                            <div style={{
                                position: 'absolute',
                                top: '-8px',
                                left: '8px',
                                width: '8px',
                                height: '12px',
                                background: 'white',
                                borderRadius: '4px 4px 0 0'
                            }} />
                            <div style={{
                                position: 'absolute',
                                top: '-12px',
                                left: '16px',
                                width: '8px',
                                height: '16px',
                                background: 'white',
                                borderRadius: '4px 4px 0 0'
                            }} />
                            <div style={{
                                position: 'absolute',
                                top: '-8px',
                                right: '8px',
                                width: '8px',
                                height: '12px',
                                background: 'white',
                                borderRadius: '4px 4px 0 0'
                            }} />
                            <div style={{
                                position: 'absolute',
                                bottom: '6px',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                width: '20px',
                                height: '8px',
                                background: '#10b981',
                                borderRadius: '50%'
                            }} />
                        </div>
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
                    Admin Command Center
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
                    <span style={{ fontSize: '1.2rem' }}>🔐</span>
                    Administrative Access
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
                    Welcome to your administrative dashboard. Monitor platform activity, manage users, 
                    and maintain platform integrity from your centralized dashboard.
                </p>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                    gap: '1rem',
                    maxWidth: '600px',
                    margin: '0 auto'
                }}>
                    <div style={{
                        background: 'rgba(16, 185, 129, 0.1)',
                        borderRadius: '16px',
                        padding: '1rem',
                        border: '1px solid rgba(16, 185, 129, 0.2)',
                        color: '#047857',
                        fontWeight: '600',
                        fontSize: '0.9rem'
                    }}>
                        ⚡ Real-time Monitoring
                    </div>
                    <div style={{
                        background: 'rgba(16, 185, 129, 0.1)',
                        borderRadius: '16px',
                        padding: '1rem',
                        border: '1px solid rgba(16, 185, 129, 0.2)',
                        color: '#047857',
                        fontWeight: '600',
                        fontSize: '0.9rem'
                    }}>
                        👥 User Management
                    </div>
                    <div style={{
                        background: 'rgba(16, 185, 129, 0.1)',
                        borderRadius: '16px',
                        padding: '1rem',
                        border: '1px solid rgba(16, 185, 129, 0.2)',
                        color: '#047857',
                        fontWeight: '600',
                        fontSize: '0.9rem'
                    }}>
                        📊 Analytics
                    </div>
                    <div style={{
                        background: 'rgba(16, 185, 129, 0.1)',
                        borderRadius: '16px',
                        padding: '1rem',
                        border: '1px solid rgba(16, 185, 129, 0.2)',
                        color: '#047857',
                        fontWeight: '600',
                        fontSize: '0.9rem'
                    }}>
                        🔒 Security
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AdminWelcomeSection;
