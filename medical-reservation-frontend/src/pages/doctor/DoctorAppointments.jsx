import React from 'react';
import ReactDOM from 'react-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import { useDoctorAppointments } from '../../hooks/useDoctorAppointments';
import { translateAppointmentType, translateDuration } from '../../utils/appointmentUtils';
import LoadingSpinner from '../../components/LoadingSpinner';
import DoctorAppointmentHeader from '../../components/DoctorAppointmentHeader';
import DoctorAppointmentTabs from '../../components/DoctorAppointmentTabs';
import DoctorAppointmentCard from '../../components/DoctorAppointmentCard';

const DoctorAppointments = () => {
    const { t } = useTranslation();
    const { user } = useAuth();
    const {
        loading,
        selectedView,
        setSelectedView,
        appointments,
        selectedAppointment,
        setSelectedAppointment,
        showNotes,
        setShowNotes,
        notes,
        setNotes,
        filteredAppointments,
        getStatusColor,
        updateAppointmentStatus,
        addNotes,
        formatTime,
        formatDate
    } = useDoctorAppointments();

    if (loading) {
        return <LoadingSpinner message={t('loading.loadingAppointments')} />;
    }

    return (
        <div style={{ position: 'relative' }}>
            <div style={{
                position: 'absolute',
                top: '5%',
                right: '8%',
                width: '300px',
                height: '300px',
                background: 'radial-gradient(circle, rgba(34, 197, 94, 0.1) 0%, rgba(34, 197, 94, 0.05) 50%, transparent 100%)',
                borderRadius: '50%',
                zIndex: 0
            }} />
            
            <div style={{
                position: 'absolute',
                bottom: '10%',
                left: '5%',
                width: '250px',
                height: '250px',
                background: 'radial-gradient(circle, rgba(22, 163, 74, 0.08) 0%, rgba(22, 163, 74, 0.03) 50%, transparent 100%)',
                borderRadius: '50%',
                zIndex: 0
            }} />

            <main style={{
                padding: '2.5rem 0',
                position: 'relative',
                zIndex: 1
            }}>
                <DoctorAppointmentHeader user={user} appointments={appointments} />

                <DoctorAppointmentTabs
                    selectedView={selectedView}
                    onViewChange={setSelectedView}
                />

                <section style={{
                    background: 'rgba(255, 255, 255, 0.98)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '24px',
                    padding: '2.5rem',
                    boxShadow: '0 20px 40px rgba(34, 197, 94, 0.12), 0 16px 32px rgba(0, 0, 0, 0.06)',
                    border: '1px solid rgba(34, 197, 94, 0.15)'
                }}>
                    {filteredAppointments.length === 0 ? (
                        <div style={{
                            textAlign: 'center',
                            padding: '4rem 2rem',
                            color: '#6b7280'
                        }}>
                            <div style={{
                                width: '100px',
                                height: '100px',
                                background: 'rgba(34, 197, 94, 0.1)',
                                borderRadius: '24px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 1rem'
                            }}>
                                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                                    <line x1="16" y1="2" x2="16" y2="6"/>
                                    <line x1="8" y1="2" x2="8" y2="6"/>
                                    <line x1="3" y1="10" x2="21" y2="10"/>
                                </svg>
                            </div>
                            <h3 style={{
                                fontSize: '1.5rem',
                                fontWeight: '600',
                                margin: '0 0 0.5rem',
                                color: '#374151'
                            }}>
                                {t('appointments.noAppointments')}
                            </h3>
                            <p style={{
                                fontSize: '1rem',
                                margin: 0,
                                maxWidth: '400px',
                                marginLeft: 'auto',
                                marginRight: 'auto',
                                lineHeight: '1.5'
                            }}>
                                {t('appointments.noAppointmentsInCategory')}
                            </p>
                        </div>
                    ) : (
                        <div style={{
                            display: 'grid',
                            gap: '1.5rem'
                        }}>
                            {filteredAppointments.map(appointment => (
                                <DoctorAppointmentCard
                                    key={appointment.id}
                                    appointment={appointment}
                                    getStatusColor={getStatusColor}
                                    formatTime={formatTime}
                                    formatDate={formatDate}
                                    updateAppointmentStatus={updateAppointmentStatus}
                                    setSelectedAppointment={setSelectedAppointment}
                                />
                            ))}
                        </div>
                    )}
                </section>

                {selectedAppointment && ReactDOM.createPortal(
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
                            animation: 'fadeInUp 0.3s ease-out',
                            border: '1px solid rgba(34, 197, 94, 0.2)'
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
                                    background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                                    borderRadius: '20px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    boxShadow: '0 12px 25px rgba(34, 197, 94, 0.3)'
                                }}>
                                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                                        <circle cx="12" cy="7" r="4"/>
                                    </svg>
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
                                        {translateAppointmentType(selectedAppointment.type)} • {t('common.age')}: {selectedAppointment.patientAge || t('common.notProvided')}
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
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                                        </svg>
                                        {t('common.contactInformation')}
                                    </h4>
                                    <div style={{ marginBottom: '0.75rem' }}>
                                        <span style={{ fontSize: '0.85rem', color: '#6b7280', fontWeight: '600' }}>{t('common.phone')}: </span>
                                        <span style={{ 
                                            color: selectedAppointment.patientPhone === t('common.notProvided') || selectedAppointment.patientPhone === 'Not provided' ? '#9ca3af' : '#374151',
                                            fontStyle: selectedAppointment.patientPhone === t('common.notProvided') || selectedAppointment.patientPhone === 'Not provided' ? 'italic' : 'normal'
                                        }}>
                                            {selectedAppointment.patientPhone}
                                        </span>
                                    </div>
                                    <div>
                                        <span style={{ fontSize: '0.85rem', color: '#6b7280', fontWeight: '600' }}>{t('common.email')}: </span>
                                        <span style={{ 
                                            color: selectedAppointment.patientEmail === t('common.notProvided') || selectedAppointment.patientEmail === 'Not provided' ? '#9ca3af' : '#374151',
                                            fontStyle: selectedAppointment.patientEmail === t('common.notProvided') || selectedAppointment.patientEmail === 'Not provided' ? 'italic' : 'normal'
                                        }}>
                                            {selectedAppointment.patientEmail}
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
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <circle cx="12" cy="12" r="10"/>
                                            <polyline points="12 6 12 12 16 14"/>
                                        </svg>
                                        {t('appointments.appointmentDetails')}
                                    </h4>
                                    <div style={{ marginBottom: '0.75rem' }}>
                                        <span style={{ fontSize: '0.85rem', color: '#6b7280', fontWeight: '600' }}>{t('common.date')}: </span>
                                        <span style={{ color: '#374151' }}>{formatDate(selectedAppointment.appointmentDate)}</span>
                                    </div>
                                    <div style={{ marginBottom: '0.75rem' }}>
                                        <span style={{ fontSize: '0.85rem', color: '#6b7280', fontWeight: '600' }}>{t('common.time')}: </span>
                                        <span style={{ color: '#22c55e', fontWeight: '600' }}>{formatTime(selectedAppointment.appointmentDate)}</span>
                                    </div>
                                    <div>
                                        <span style={{ fontSize: '0.85rem', color: '#6b7280', fontWeight: '600' }}>{t('appointments.duration')}: </span>
                                        <span style={{ color: '#374151' }}>{translateDuration(selectedAppointment.duration)}</span>
                                    </div>
                                </div>
                            </div>

                            {selectedAppointment.medicalHistory && selectedAppointment.medicalHistory.length > 0 && (
                                <div style={{
                                    background: 'rgba(254, 249, 195, 0.7)',
                                    borderRadius: '16px',
                                    padding: '1.5rem',
                                    marginBottom: '1.5rem',
                                    border: '1px solid rgba(251, 191, 36, 0.3)'
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
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                                            <polyline points="14 2 14 8 20 8"/>
                                            <line x1="16" y1="13" x2="8" y2="13"/>
                                            <line x1="16" y1="17" x2="8" y2="17"/>
                                            <polyline points="10 9 9 9 8 9"/>
                                        </svg>
                                        {t('patients.medicalHistory')}
                                    </h4>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                                        {selectedAppointment.medicalHistory.map((condition, index) => (
                                            <span
                                                key={index}
                                                style={{
                                                    background: 'rgba(251, 191, 36, 0.2)',
                                                    color: '#92400e',
                                                    padding: '0.5rem 1rem',
                                                    borderRadius: '12px',
                                                    fontSize: '0.9rem',
                                                    fontWeight: '600',
                                                    border: '1px solid rgba(251, 191, 36, 0.3)'
                                                }}
                                            >
                                                {condition}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

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
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                                    </svg>
                                    {t('appointments.notesAndReason')}
                                </h4>
                                <div style={{ marginBottom: '1rem' }}>
                                    <p style={{ color: '#374151', margin: 0, lineHeight: '1.5' }}>
                                        <span style={{ fontSize: '0.9rem', fontWeight: '600' }}>{t('appointments.reasonForVisit')}:</span> {selectedAppointment.reason || t('appointments.noReasonProvided')}
                                    </p>
                                </div>
                                {selectedAppointment.additionalNotes && (
                                    <div>
                                        <p style={{ color: '#374151', margin: 0, lineHeight: '1.5' }}>
                                            <span style={{ fontSize: '0.9rem', fontWeight: '600' }}>{t('appointments.additionalNotes')}:</span> {selectedAppointment.additionalNotes}
                                        </p>
                                    </div>
                                )}
                            </div>

                            <div style={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                gap: '1rem',
                                paddingTop: '1rem',
                                borderTop: '1px solid rgba(229, 231, 235, 0.8)'
                            }}>
                                <button
                                    onClick={() => setShowNotes(true)}
                                    style={{
                                        padding: '0.8rem 1.5rem',
                                        background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '12px',
                                        cursor: 'pointer',
                                        fontSize: '1rem',
                                        fontWeight: '600',
                                        transition: 'all 0.3s ease',
                                        boxShadow: '0 4px 12px rgba(5, 150, 105, 0.3)'
                                    }}
                                    onMouseEnter={e => {
                                        e.target.style.transform = 'translateY(-2px)';
                                        e.target.style.boxShadow = '0 6px 20px rgba(5, 150, 105, 0.4)';
                                    }}
                                    onMouseLeave={e => {
                                        e.target.style.transform = 'translateY(0)';
                                        e.target.style.boxShadow = '0 4px 12px rgba(5, 150, 105, 0.3)';
                                    }}
                                >
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '0.5rem' }}>
                                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                                    </svg>
                                    {t('appointments.addNotes')}
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
                                    onMouseEnter={e => {
                                        e.target.style.background = 'rgba(107, 114, 128, 0.2)';
                                        e.target.style.transform = 'translateY(-2px)';
                                    }}
                                    onMouseLeave={e => {
                                        e.target.style.background = 'rgba(107, 114, 128, 0.1)';
                                        e.target.style.transform = 'translateY(0)';
                                    }}
                                >
                                    {t('common.close')}
                                </button>
                            </div>
                        </div>
                    </div>,
                    document.body
                )}

                {showNotes && ReactDOM.createPortal(
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
                        zIndex: 1001,
                        padding: '2rem'
                    }} onClick={() => setShowNotes(false)}>
                        <div style={{
                            background: 'white',
                            borderRadius: '20px',
                            padding: '2.5rem',
                            maxWidth: '600px',
                            width: '100%',
                            boxShadow: '0 25px 50px rgba(0,0,0,0.25)',
                            position: 'relative',
                            animation: 'fadeInUp 0.3s ease-out',
                            border: '1px solid rgba(34, 197, 94, 0.2)'
                        }} onClick={e => e.stopPropagation()}>
                            <button
                                onClick={() => setShowNotes(false)}
                                style={{
                                    position: 'absolute',
                                    top: '1rem',
                                    right: '1rem',
                                    background: 'none',
                                    border: 'none',
                                    fontSize: '1.5rem',
                                    cursor: 'pointer',
                                    color: '#9ca3af',
                                    padding: '0.5rem',
                                    borderRadius: '8px'
                                }}
                            >
                                ✕
                            </button>

                            <h3 style={{
                                fontSize: '1.8rem',
                                fontWeight: '700',
                                color: '#374151',
                                margin: '0 0 1.5rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem'
                            }}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                                </svg>
                                {t('appointments.addNotes')}
                            </h3>

                            <p style={{
                                color: '#6b7280',
                                margin: '0 0 1.5rem',
                                lineHeight: '1.5'
                            }}>
                                {t('appointments.addNotesDescription', { patientName: selectedAppointment?.patientName })}
                            </p>

                            <textarea
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                placeholder={t('appointments.enterNotesPlaceholder')}
                                style={{
                                    width: '100%',
                                    minHeight: '120px',
                                    padding: '1rem',
                                    border: '2px solid rgba(34, 197, 94, 0.2)',
                                    borderRadius: '12px',
                                    fontSize: '1rem',
                                    fontFamily: 'inherit',
                                    resize: 'vertical',
                                    marginBottom: '1.5rem',
                                    boxSizing: 'border-box'
                                }}
                            />

                            <div style={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                gap: '1rem'
                            }}>
                                <button
                                    onClick={() => setShowNotes(false)}
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
                                    {t('common.cancel')}
                                </button>
                                <button
                                    onClick={() => {
                                        if (notes.trim() && selectedAppointment) {
                                            addNotes(selectedAppointment.id, notes.trim());
                                        }
                                    }}
                                    disabled={!notes.trim()}
                                    style={{
                                        padding: '0.8rem 1.5rem',
                                        background: notes.trim() 
                                            ? 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)'
                                            : 'rgba(107, 114, 128, 0.3)',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '12px',
                                        cursor: notes.trim() ? 'pointer' : 'not-allowed',
                                        fontSize: '1rem',
                                        fontWeight: '600',
                                        transition: 'all 0.3s ease',
                                        boxShadow: notes.trim() ? '0 4px 12px rgba(34, 197, 94, 0.3)' : 'none'
                                    }}
                                >
                                    {t('appointments.saveNotes')}
                                </button>
                            </div>
                        </div>
                    </div>,
                    document.body
                )}
            </main>
        </div>
    );
};

export default DoctorAppointments;
