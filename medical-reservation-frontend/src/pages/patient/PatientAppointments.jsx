import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useAppointments } from '../../hooks/useAppointments';
import LoadingSpinner from '../../components/LoadingSpinner';
import AppointmentHeader from '../../components/AppointmentHeader';
import AppointmentTabs from '../../components/AppointmentTabs';
import AppointmentCard from '../../components/AppointmentCard';
import CancelAppointmentModal from '../../components/CancelAppointmentModal';
import RescheduleModal from '../../components/RescheduleModal';
import PatientRescheduleStatus from '../../components/PatientRescheduleStatus';

const PatientAppointments = () => {
    const { t } = useTranslation();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [selectedTab, setSelectedTab] = useState('upcoming');
    const [showRescheduleModal, setShowRescheduleModal] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [appointmentToCancel, setAppointmentToCancel] = useState(null);
    const [cancelLoading, setCancelLoading] = useState(false);

    const {
        loading,
        appointments,
        getFilteredAppointments,
        handleCancelAppointment,
        handleRescheduleAppointment,
        fetchAppointments
    } = useAppointments();

    const filteredAppointments = getFilteredAppointments(selectedTab);

    const handleReschedule = (appointment) => {
        setSelectedAppointment(appointment);
        setShowRescheduleModal(true);
    };

    const handleRescheduleSuccess = () => {
        
        fetchAppointments();
        setSelectedAppointment(null);
        setShowRescheduleModal(false);
    };

    const handleCancelClick = (appointment) => {
        setAppointmentToCancel(appointment);
        setShowCancelModal(true);
    };

    const handleConfirmCancel = async (appointment, reason) => {
        try {
            setCancelLoading(true);
            await handleCancelAppointment(appointment, reason);
            setShowCancelModal(false);
            setAppointmentToCancel(null);
        } catch (error) {
            console.error('Failed to cancel appointment:', error);
        } finally {
            setCancelLoading(false);
        }
    };

    const handleCloseCancelModal = () => {
        if (!cancelLoading) {
            setShowCancelModal(false);
            setAppointmentToCancel(null);
        }
    };

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
                background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, rgba(59, 130, 246, 0.05) 50%, transparent 100%)',
                borderRadius: '50%',
                zIndex: 0
            }} />
            
            <div style={{
                position: 'absolute',
                bottom: '10%',
                left: '5%',
                width: '250px',
                height: '250px',
                background: 'radial-gradient(circle, rgba(37, 99, 235, 0.08) 0%, rgba(37, 99, 235, 0.03) 50%, transparent 100%)',
                borderRadius: '50%',
                zIndex: 0
            }} />

            <main style={{
                padding: '2.5rem 0',
                position: 'relative',
                zIndex: 1
            }}>
                <AppointmentHeader />

                <AppointmentTabs 
                    selectedTab={selectedTab}
                    onTabSelect={setSelectedTab}
                    appointments={appointments}
                />

                {}
                <PatientRescheduleStatus />

                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '2rem'
                }}>
                    <h2 style={{
                        fontSize: '1.8rem',
                        fontWeight: '700',
                        color: '#374151',
                        margin: 0
                    }}>
                        {t(`appointments.${selectedTab}Appointments`)}
                    </h2>
                    
                    {selectedTab === 'upcoming' && (
                        <button
                            onClick={() => navigate('/patient/doctors')}
                            style={{
                                background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '16px',
                                padding: '1rem 2rem',
                                fontSize: '1rem',
                                fontWeight: '600',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                boxShadow: '0 8px 20px rgba(34, 197, 94, 0.3)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}
                        >
                            ➕ {t('appointments.bookNewAppointment')}
                        </button>
                    )}
                </div>

                <section>
                    {filteredAppointments.length === 0 ? (
                        <div style={{
                            background: 'rgba(255, 255, 255, 0.98)',
                            backdropFilter: 'blur(20px)',
                            borderRadius: '24px',
                            padding: '4rem 2rem',
                            textAlign: 'center',
                            boxShadow: '0 16px 32px rgba(0, 0, 0, 0.06)',
                            border: '1px solid rgba(0, 0, 0, 0.08)',
                            color: '#9ca3af'
                        }}>
                            <div style={{ 
                                width: '80px',
                                height: '80px',
                                background: 'rgba(34, 197, 94, 0.1)',
                                borderRadius: '20px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 1rem'
                            }}>
                                {selectedTab === 'upcoming' ? (
                                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                                        <line x1="16" y1="2" x2="16" y2="6"/>
                                        <line x1="8" y1="2" x2="8" y2="6"/>
                                        <line x1="3" y1="10" x2="21" y2="10"/>
                                    </svg>
                                ) : selectedTab === 'past' ? (
                                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
                                        <rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>
                                        <line x1="9" y1="12" x2="15" y2="12"/>
                                        <line x1="9" y1="16" x2="15" y2="16"/>
                                    </svg>
                                ) : (
                                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="12" cy="12" r="10"/>
                                        <line x1="15" y1="9" x2="9" y2="15"/>
                                        <line x1="9" y1="9" x2="15" y2="15"/>
                                    </svg>
                                )}
                            </div>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: '600', margin: '0 0 0.5rem 0' }}>
                                {t(`appointments.no${selectedTab.charAt(0).toUpperCase() + selectedTab.slice(1)}Appointments`)}
                            </h3>
                            <p style={{ margin: 0, fontSize: '1.1rem' }}>
                                {selectedTab === 'upcoming' ? 
                                    t('appointments.noUpcomingAppointmentsDescription') :
                                 selectedTab === 'past' ? 
                                    t('appointments.noPastAppointmentsDescription') :
                                    t('appointments.noCancelledAppointmentsDescription')}
                            </p>
                        </div>
                    ) : (
                        <div>
                            {filteredAppointments.map(appointment => (
                                <AppointmentCard
                                    key={appointment.id}
                                    appointment={appointment}
                                    onCancel={handleCancelClick}
                                    onReschedule={handleReschedule}
                                    selectedTab={selectedTab}
                                />
                            ))}
                        </div>
                    )}
                </section>

                {}
                <CancelAppointmentModal
                    isOpen={showCancelModal}
                    onClose={handleCloseCancelModal}
                    onConfirm={handleConfirmCancel}
                    appointment={appointmentToCancel}
                    loading={cancelLoading}
                />

                {}
                <RescheduleModal
                    isOpen={showRescheduleModal}
                    onClose={() => setShowRescheduleModal(false)}
                    appointment={selectedAppointment}
                    onSuccess={handleRescheduleSuccess}
                />
            </main>
        </div>
    );
};

export default PatientAppointments;
