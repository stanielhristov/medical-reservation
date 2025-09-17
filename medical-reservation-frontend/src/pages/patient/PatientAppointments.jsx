import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useAppointments } from '../../hooks/useAppointments';
import LoadingSpinner from '../../components/LoadingSpinner';
import AppointmentHeader from '../../components/AppointmentHeader';
import AppointmentTabs from '../../components/AppointmentTabs';
import AppointmentCard from '../../components/AppointmentCard';
import CancelAppointmentModal from '../../components/CancelAppointmentModal';

const PatientAppointments = () => {
    const { user } = useAuth();
    const [selectedTab, setSelectedTab] = useState('upcoming');
    const [showBookingModal, setShowBookingModal] = useState(false);
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
        handleRescheduleAppointment
    } = useAppointments();

    const filteredAppointments = getFilteredAppointments(selectedTab);

    const handleReschedule = (appointment) => {
        setSelectedAppointment(appointment);
        setShowRescheduleModal(true);
    };

    const confirmReschedule = () => {
        if (selectedDate && selectedTime && selectedAppointment) {
            const newDateTime = new Date(`${selectedDate}T${selectedTime}`);
            handleRescheduleAppointment(selectedAppointment.id, newDateTime);
            setShowRescheduleModal(false);
            setSelectedAppointment(null);
            setSelectedDate('');
            setSelectedTime('');
        }
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
        return <LoadingSpinner message="Loading appointments..." />;
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
                        {selectedTab.charAt(0).toUpperCase() + selectedTab.slice(1)} Appointments
                    </h2>
                    
                    {selectedTab === 'upcoming' && (
                        <button
                            onClick={() => setShowBookingModal(true)}
                            style={{
                                background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '16px',
                                padding: '1rem 2rem',
                                fontSize: '1rem',
                                fontWeight: '600',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                boxShadow: '0 8px 20px rgba(59, 130, 246, 0.3)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}
                        >
                            ➕ Book New Appointment
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
                            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>
                                {selectedTab === 'upcoming' ? '📅' : 
                                 selectedTab === 'past' ? '📋' : '❌'}
                            </div>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: '600', margin: '0 0 0.5rem 0' }}>
                                No {selectedTab} appointments
                            </h3>
                            <p style={{ margin: 0, fontSize: '1.1rem' }}>
                                {selectedTab === 'upcoming' ? 
                                    "You don't have any upcoming appointments. Book one now!" :
                                 selectedTab === 'past' ? 
                                    "You haven't had any appointments yet." :
                                    "You don't have any cancelled appointments."}
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

                {/* Cancel Appointment Confirmation Modal */}
                <CancelAppointmentModal
                    isOpen={showCancelModal}
                    onClose={handleCloseCancelModal}
                    onConfirm={handleConfirmCancel}
                    appointment={appointmentToCancel}
                    loading={cancelLoading}
                />
            </main>
        </div>
    );
};

export default PatientAppointments;
