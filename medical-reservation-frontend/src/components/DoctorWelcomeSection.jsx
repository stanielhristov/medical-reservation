import React from 'react';
import { useTranslation } from 'react-i18next';

const DoctorWelcomeSection = ({ user, dashboardStats }) => {
    const { t } = useTranslation();
    
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
                    {t('doctor.welcome')}, Dr. {user?.fullName?.split(' ').pop() || t('dashboard.doctor')}
                </h1>
                
                <div style={{
                    background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                    color: 'white',
                    padding: '0.75rem 2rem',
                    borderRadius: '50px',
                    margin: '0 auto 2rem',
                    fontSize: '1.1rem',
                    fontWeight: '700',
                    boxShadow: '0 8px 25px rgba(34, 197, 94, 0.3)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.75rem'
                }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"/>
                        <path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4"/>
                        <circle cx="20" cy="10" r="2"/>
                    </svg>
                    {t('doctor.medicalProfessional')}
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
                    {t('dashboard.doctorWelcomeMessage')}
                </p>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '1.5rem',
                    maxWidth: '800px',
                    margin: '0 auto'
                }}>
                    <div style={{
                        background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                        borderRadius: '20px',
                        padding: '1.5rem',
                        color: 'white',
                        boxShadow: '0 8px 25px rgba(34, 197, 94, 0.3)'
                    }}>
                        <div style={{ marginBottom: '0.5rem' }}>
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                                <line x1="16" y1="2" x2="16" y2="6"/>
                                <line x1="8" y1="2" x2="8" y2="6"/>
                                <line x1="3" y1="10" x2="21" y2="10"/>
                            </svg>
                        </div>
                        <div style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '0.25rem' }}>
                            {dashboardStats.todayAppointments || 0}
                        </div>
                        <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>{t('dashboard.todayAppointments')}</div>
                    </div>
                    
                    <div style={{
                        background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                        borderRadius: '20px',
                        padding: '1.5rem',
                        color: 'white',
                        boxShadow: '0 8px 25px rgba(34, 197, 94, 0.3)'
                    }}>
                        <div style={{ marginBottom: '0.5rem' }}>
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                                <circle cx="9" cy="7" r="4"/>
                                <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
                                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                            </svg>
                        </div>
                        <div style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '0.25rem' }}>
                            {dashboardStats.totalPatients || 0}
                        </div>
                        <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>{t('patients.title')}</div>
                    </div>
                    
                    <div style={{
                        background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                        borderRadius: '20px',
                        padding: '1.5rem',
                        color: 'white',
                        boxShadow: '0 8px 25px rgba(34, 197, 94, 0.3)'
                    }}>
                        <div style={{ marginBottom: '0.5rem' }}>
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10"/>
                                <polyline points="12 6 12 12 16 14"/>
                            </svg>
                        </div>
                        <div style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '0.25rem' }}>
                            {dashboardStats.upcomingAppointments || 0}
                        </div>
                        <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>{t('appointments.upcoming')}</div>
                    </div>
                    
                    <div style={{
                        background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                        borderRadius: '20px',
                        padding: '1.5rem',
                        color: 'white',
                        boxShadow: '0 8px 25px rgba(34, 197, 94, 0.3)'
                    }}>
                        <div style={{ marginBottom: '0.5rem' }}>
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                                <polyline points="22 4 12 14.01 9 11.01"/>
                            </svg>
                        </div>
                        <div style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '0.25rem' }}>
                            {dashboardStats.completedToday || 0}
                        </div>
                        <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>{t('appointments.completed')} {t('common.today')}</div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DoctorWelcomeSection;
