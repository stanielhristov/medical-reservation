import React from 'react';
import { getAppointmentStats } from '../utils/doctorAppointmentUtils';

const DoctorAppointmentHeader = ({ user, appointments }) => {
    const stats = getAppointmentStats(appointments);

    return (
        <section style={{
            background: 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(20px)',
            borderRadius: '32px',
            padding: '3rem',
            marginBottom: '3rem',
            boxShadow: '0 32px 64px rgba(59, 130, 246, 0.12), 0 16px 32px rgba(0, 0, 0, 0.06)',
            border: '1px solid rgba(59, 130, 246, 0.15)',
            textAlign: 'center'
        }}>
            <div style={{
                width: '100px',
                height: '100px',
                background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                borderRadius: '25px',
                margin: '0 auto 2rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 20px 40px rgba(59, 130, 246, 0.3)'
            }}>
                <span style={{ fontSize: '3rem', color: 'white' }}>🩺</span>
            </div>
            
            <h1 style={{
                fontSize: '2.5rem',
                fontWeight: '800',
                color: '#374151',
                margin: '0 0 0.5rem',
                letterSpacing: '-0.02em'
            }}>
                Welcome, Dr. {user?.fullName?.split(' ')[0] || 'Doctor'}
            </h1>
            
            <p style={{
                fontSize: '1.2rem',
                color: '#6b7280',
                margin: '0 0 2.5rem',
                fontWeight: '500'
            }}>
                Manage your appointments and patient consultations
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
                    <div style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '0.25rem' }}>{stats.today}</div>
                    <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>Today's Appointments</div>
                </div>
                
                <div style={{
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    borderRadius: '20px',
                    padding: '1.5rem',
                    color: 'white',
                    boxShadow: '0 8px 25px rgba(16, 185, 129, 0.3)'
                }}>
                    <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⏰</div>
                    <div style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '0.25rem' }}>{stats.upcoming}</div>
                    <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>Upcoming</div>
                </div>
                
                <div style={{
                    background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                    borderRadius: '20px',
                    padding: '1.5rem',
                    color: 'white',
                    boxShadow: '0 8px 25px rgba(245, 158, 11, 0.3)'
                }}>
                    <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⏳</div>
                    <div style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '0.25rem' }}>{stats.pending}</div>
                    <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>Pending Approval</div>
                </div>
                
                <div style={{
                    background: 'linear-gradient(135deg, #6b7280 0%, #4b5563 100%)',
                    borderRadius: '20px',
                    padding: '1.5rem',
                    color: 'white',
                    boxShadow: '0 8px 25px rgba(107, 114, 128, 0.3)'
                }}>
                    <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>✅</div>
                    <div style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '0.25rem' }}>{stats.completed}</div>
                    <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>Completed</div>
                </div>
            </div>
        </section>
    );
};

export default DoctorAppointmentHeader;
