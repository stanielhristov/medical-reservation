import React from 'react';
import { useTranslation } from 'react-i18next';
import { getAppointmentStats } from '../utils/doctorAppointmentUtils';

const DoctorAppointmentHeader = ({ user, appointments }) => {
    const { t } = useTranslation();
    const stats = getAppointmentStats(appointments);

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
                borderRadius: '25px',
                margin: '0 auto 2rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 20px 40px rgba(34, 197, 94, 0.3)'
            }}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"/>
                    <path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4"/>
                    <circle cx="20" cy="10" r="2"/>
                </svg>
            </div>
            
            <h1 style={{
                fontSize: '2.5rem',
                fontWeight: '800',
                color: '#374151',
                margin: '0 0 0.5rem',
                letterSpacing: '-0.02em'
            }}>
                {t('doctor.welcome')}, Dr. {user?.fullName?.split(' ')[0] || t('dashboard.doctor')}
            </h1>
            
            <p style={{
                fontSize: '1.2rem',
                color: '#6b7280',
                margin: '0 0 2.5rem',
                fontWeight: '500'
            }}>
                {t('doctor.manageAppointments')}
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
                    <div style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '0.25rem' }}>{stats.today}</div>
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
                            <circle cx="12" cy="12" r="10"/>
                            <polyline points="12 6 12 12 16 14"/>
                        </svg>
                    </div>
                    <div style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '0.25rem' }}>{stats.upcoming}</div>
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
                            <path d="M5 22h14"/>
                            <path d="M5 2h14"/>
                            <path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22"/>
                            <path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2"/>
                        </svg>
                    </div>
                    <div style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '0.25rem' }}>{stats.pending}</div>
                    <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>{t('appointments.pendingApproval')}</div>
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
                    <div style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '0.25rem' }}>{stats.completed}</div>
                    <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>{t('appointments.completed')}</div>
                </div>
            </div>
        </section>
    );
};

export default DoctorAppointmentHeader;
