import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useDoctorDashboard } from '../../hooks/useDoctorDashboard';
import { translateAppointmentType, translateDuration } from '../../utils/appointmentUtils';
import LoadingSpinner from '../../components/LoadingSpinner';
import DoctorWelcomeSection from '../../components/DoctorWelcomeSection';
import DoctorQuickActions from '../../components/DoctorQuickActions';
import IncomingAppointmentsSection from '../../components/IncomingAppointmentsSection';

const DoctorDashboard = () => {
    const { t } = useTranslation();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const {
        loading,
        todayAppointments,
        upcomingAppointments,
        dashboardStats,
        formatTime,
        formatDate,
        getStatusColor
    } = useDoctorDashboard(user);

    const handleNavigation = (path) => {
        navigate(path);
    };

    const handleAppointmentClick = (appointment) => {
        setSelectedAppointment(appointment);
    };

    if (loading) {
        return <LoadingSpinner message={t('loading.loadingDashboard')} />;
    }

    return (
        <div style={{ position: 'relative' }}>
            <div style={{
                position: 'absolute',
                top: '8%',
                right: '5%',
                width: '280px',
                height: '280px',
                background: 'radial-gradient(circle, rgba(34, 197, 94, 0.12) 0%, rgba(34, 197, 94, 0.06) 50%, transparent 100%)',
                borderRadius: '50%',
                zIndex: 0
            }} />
            <div style={{
                position: 'absolute',
                bottom: '12%',
                left: '3%',
                width: '220px',
                height: '220px',
                background: 'radial-gradient(circle, rgba(22, 163, 74, 0.1) 0%, rgba(22, 163, 74, 0.04) 50%, transparent 100%)',
                borderRadius: '50%',
                zIndex: 0
            }} />

            <main style={{
                padding: '2.5rem 0',
                position: 'relative',
                zIndex: 1
            }}>
                <DoctorWelcomeSection 
                    user={user} 
                    dashboardStats={dashboardStats} 
                />

                <DoctorQuickActions onNavigation={handleNavigation} />

                <IncomingAppointmentsSection
                    todayAppointments={todayAppointments}
                    upcomingAppointments={upcomingAppointments}
                    getStatusColor={getStatusColor}
                    onNavigation={handleNavigation}
                    onAppointmentClick={handleAppointmentClick}
                />

                {selectedAppointment && (
                    <div style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'rgba(0, 0, 0, 0.6)',
                        backdropFilter: 'blur(5px)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 1000,
                        padding: '2rem'
                    }} onClick={() => setSelectedAppointment(null)}>
                        <div style={{
                            background: 'white',
                            borderRadius: '24px',
                            padding: '2.5rem',
                            maxWidth: '800px',
                            width: '100%',
                            maxHeight: '90vh',
                            overflow: 'auto',
                            boxShadow: '0 25px 50px rgba(0,0,0,0.25)',
                            position: 'relative',
                            border: '1px solid rgba(59, 130, 246, 0.2)'
                        }} onClick={e => e.stopPropagation()}>
                            <button
                                onClick={() => setSelectedAppointment(null)}
                                style={{
                                    position: 'absolute',
                                    top: '1.5rem',
                                    right: '1.5rem',
                                    background: 'none',
                                    border: 'none',
                                    fontSize: '1.5rem',
                                    cursor: 'pointer',
                                    color: '#9ca3af',
                                    padding: '0.5rem',
                                    borderRadius: '8px',
                                    transition: 'all 0.3s ease'
                                }}
                                onMouseEnter={e => {
                                    e.target.style.background = 'rgba(239, 68, 68, 0.1)';
                                    e.target.style.color = '#ef4444';
                                }}
                                onMouseLeave={e => {
                                    e.target.style.background = 'none';
                                    e.target.style.color = '#9ca3af';
                                }}
                            >
                                ✕
                            </button>

                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1.5rem',
                                marginBottom: '2rem',
                                paddingRight: '3rem'
                            }}>
                                <div style={{
                                    width: '80px',
                                    height: '80px',
                                    background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                                    borderRadius: '20px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '2.5rem',
                                    boxShadow: '0 12px 25px rgba(59, 130, 246, 0.3)'
                                }}>
                                    👤
                                </div>
                                <div>
                                    <h2 style={{
                                        fontSize: '2rem',
                                        fontWeight: '700',
                                        color: '#374151',
                                        margin: '0 0 0.5rem'
                                    }}>
                                        {selectedAppointment.patientName}
                                    </h2>
                                    <p style={{
                                        fontSize: '1.1rem',
                                        color: '#6b7280',
                                        margin: 0,
                                        fontWeight: '500'
                                    }}>
                                        {t('common.age')}: {selectedAppointment.patientAge || t('common.notProvided')}
                                    </p>
                                </div>
                            </div>

                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                                gap: '1.5rem',
                                marginBottom: '2rem'
                            }}>
                                <div style={{
                                    background: 'rgba(243, 244, 246, 0.7)',
                                    borderRadius: '16px',
                                    padding: '1.5rem',
                                    border: '1px solid rgba(209, 213, 219, 0.5)'
                                }}>
                                    <h4 style={{
                                        fontSize: '1.1rem',
                                        fontWeight: '600',
                                        color: '#374151',
                                        margin: '0 0 1rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem'
                                    }}>
                                        📞 {t('common.contactInformation')}
                                    </h4>
                                    <div style={{ marginBottom: '0.75rem' }}>
                                        <span style={{ fontSize: '0.85rem', color: '#6b7280', fontWeight: '600' }}>{t('common.phone')}: </span>
                                        <span style={{ color: '#374151' }}>
                                            {selectedAppointment.patientPhone || t('common.notProvided')}
                                        </span>
                                    </div>
                                    <div>
                                        <span style={{ fontSize: '0.85rem', color: '#6b7280', fontWeight: '600' }}>{t('common.email')}: </span>
                                        <span style={{ color: '#374151' }}>
                                            {selectedAppointment.patientEmail || t('common.notProvided')}
                                        </span>
                                    </div>
                                </div>

                                <div style={{
                                    background: 'rgba(243, 244, 246, 0.7)',
                                    borderRadius: '16px',
                                    padding: '1.5rem',
                                    border: '1px solid rgba(209, 213, 219, 0.5)'
                                }}>
                                    <h4 style={{
                                        fontSize: '1.1rem',
                                        fontWeight: '600',
                                        color: '#374151',
                                        margin: '0 0 1rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem'
                                    }}>
                                        🕐 {t('appointments.appointmentDetails')}
                                    </h4>
                                    <div style={{ marginBottom: '0.75rem' }}>
                                        <span style={{ fontSize: '0.85rem', color: '#6b7280', fontWeight: '600' }}>{t('common.date')}: </span>
                                        <span style={{ color: '#374151' }}>{formatDate(selectedAppointment.appointmentTime || selectedAppointment.appointmentDate || selectedAppointment.date)}</span>
                                    </div>
                                    <div style={{ marginBottom: '0.75rem' }}>
                                        <span style={{ fontSize: '0.85rem', color: '#6b7280', fontWeight: '600' }}>{t('common.time')}: </span>
                                        <span style={{ color: '#3b82f6', fontWeight: '600' }}>{formatTime(selectedAppointment.appointmentTime || selectedAppointment.appointmentDate || selectedAppointment.date)}</span>
                                    </div>
                                    <div>
                                        <span style={{ fontSize: '0.85rem', color: '#6b7280', fontWeight: '600' }}>{t('appointments.duration')}: </span>
                                        <span style={{ color: '#374151' }}>{translateDuration(selectedAppointment.duration)}</span>
                                    </div>
                                </div>
                            </div>

                            {selectedAppointment.reason && (
                                <div style={{
                                    background: 'rgba(220, 252, 231, 0.7)',
                                    borderRadius: '16px',
                                    padding: '1.5rem',
                                    marginBottom: '1.5rem',
                                    border: '1px solid rgba(34, 197, 94, 0.3)'
                                }}>
                                    <h4 style={{
                                        fontSize: '1.1rem',
                                        fontWeight: '600',
                                        color: '#374151',
                                        margin: '0 0 1rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem'
                                    }}>
                                        📝 {t('appointments.notesAndReason')}
                                    </h4>
                                    <div>
                                        <p style={{ color: '#374151', margin: 0, lineHeight: '1.5' }}>
                                            <span style={{ fontSize: '0.9rem', fontWeight: '600' }}>{t('appointments.reasonForVisit')}:</span> {selectedAppointment.reason}
                                        </p>
                                    </div>
                                </div>
                            )}

                            <div style={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                gap: '1rem',
                                paddingTop: '1rem',
                                borderTop: '1px solid rgba(229, 231, 235, 0.8)'
                            }}>
                                <button
                                    onClick={() => {
                                        setSelectedAppointment(null);
                                        navigate(`/doctor/appointments`);
                                    }}
                                    style={{
                                        padding: '0.8rem 1.5rem',
                                        background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '12px',
                                        cursor: 'pointer',
                                        fontSize: '1rem',
                                        fontWeight: '600',
                                        transition: 'all 0.3s ease',
                                        boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
                                    }}
                                >
                                    {t('appointments.viewDetails')}
                                </button>
                                <button
                                    onClick={() => setSelectedAppointment(null)}
                                    style={{
                                        padding: '0.8rem 1.5rem',
                                        background: 'rgba(107, 114, 128, 0.1)',
                                        color: '#374151',
                                        border: '2px solid rgba(107, 114, 128, 0.2)',
                                        borderRadius: '12px',
                                        cursor: 'pointer',
                                        fontSize: '1rem',
                                        fontWeight: '600',
                                        transition: 'all 0.3s ease'
                                    }}
                                >
                                    {t('common.close')}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default DoctorDashboard;
