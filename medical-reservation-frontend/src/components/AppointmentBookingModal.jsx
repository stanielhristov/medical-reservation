import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { translateSpecialization } from '../utils/specializationUtils';
import { getAvailableSlots, getDoctorScheduleWithStatus } from '../api/schedule';
import { createAppointment } from '../api/appointments';

const AppointmentBookingModal = ({ 
    isOpen, 
    onClose, 
    doctor, 
    patientId,
    onBookingSuccess,
    onBookingError
}) => {
    const [selectedDate, setSelectedDate] = useState('');
    const [availableSlots, setAvailableSlots] = useState([]);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [loading, setLoading] = useState(false);
    const [loadingSlots, setLoadingSlots] = useState(false);
    const [reason, setReason] = useState('');
    const [notes, setNotes] = useState('');
    const { t } = useTranslation();

    useEffect(() => {
        if (selectedDate && doctor) {
            fetchAvailableSlots();
        }
    }, [selectedDate, doctor]);

    useEffect(() => {
        if (isOpen && !selectedDate) {
            const today = new Date();
            const todayString = today.toISOString().split('T')[0];
            setSelectedDate(todayString);
        }
    }, [isOpen, selectedDate]);

    const fetchAvailableSlots = async () => {
        if (!selectedDate || !doctor) return;
        
        setLoadingSlots(true);
        try {
            const startDate = new Date(selectedDate);
            const endDate = new Date(selectedDate);
            endDate.setHours(23, 59, 59, 999);
            
            console.log('Fetching slots for:', {
                doctorId: doctor.id,
                startDate: startDate.toISOString(),
                endDate: endDate.toISOString(),
                selectedDate
            });

            const slots = await getDoctorScheduleWithStatus(
                doctor.id, 
                startDate.toISOString(), 
                endDate.toISOString()
            );
            console.log('Received slots with status:', slots);
            
            const relevantSlots = slots.filter(slot => 
                slot.status === 'FREE' || slot.status === 'UNAVAILABLE'
            );
            setAvailableSlots(relevantSlots);
        } catch (error) {
            console.error('Error fetching available slots:', error);
            console.error('Error response:', error.response?.data);
            console.error('Error status:', error.response?.status);
            setAvailableSlots([]);
        } finally {
            setLoadingSlots(false);
        }
    };

    const handleBooking = async () => {
        if (!selectedSlot || !reason.trim()) {
            onBookingError(t('appointments.selectSlotAndReason'));
            return;
        }

        if (selectedSlot.status !== 'FREE') {
            onBookingError(t('appointments.slotNotAvailable'));
            return;
        }

        setLoading(true);
        try {
            const appointmentData = {
                doctorId: doctor.id,
                patientId: patientId,
                appointmentTime: selectedSlot.startTime,
                endTime: selectedSlot.endTime,
                notes: reason.trim() + (notes.trim() ? ' | Additional notes: ' + notes.trim() : '')
            };

            await createAppointment(appointmentData);
            onBookingSuccess(t('appointments.bookingSuccess'));
            handleClose();
        } catch (error) {
            console.error('Error booking appointment:', error);
            onBookingError(error.message || t('appointments.bookingFailed'));
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        setSelectedDate('');
        setSelectedSlot(null);
        setAvailableSlots([]);
        setReason('');
        setNotes('');
        onClose();
    };

    const formatSlotTime = (startTime, endTime) => {
        const start = new Date(startTime);
        const end = new Date(endTime);
        return `${start.toLocaleTimeString('en-US', { 
            hour: 'numeric', 
            minute: '2-digit',
            hour12: true 
        })} - ${end.toLocaleTimeString('en-US', { 
            hour: 'numeric', 
            minute: '2-digit',
            hour12: true 
        })}`;
    };

    const getTodayDate = () => {
        const today = new Date();
        return today.toISOString().split('T')[0];
    };

    const getMaxDate = () => {
        const maxDate = new Date();
        maxDate.setDate(maxDate.getDate() + 30); 
        return maxDate.toISOString().split('T')[0];
    };

    if (!isOpen || !doctor) return null;

    return (
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
        }} onClick={handleClose}>
            <div style={{
                background: 'white',
                borderRadius: '24px',
                padding: '2.5rem',
                maxWidth: '700px',
                width: '100%',
                maxHeight: '90vh',
                overflowY: 'auto',
                boxShadow: '0 25px 50px rgba(0,0,0,0.25)',
                position: 'relative',
                animation: 'fadeInUp 0.3s ease-out',
                border: '1px solid rgba(34, 197, 94, 0.2)'
            }} onClick={e => e.stopPropagation()}>
                <button
                    onClick={handleClose}
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

                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <div style={{
                        width: '80px',
                        height: '80px',
                        background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                        borderRadius: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '2rem',
                        margin: '0 auto 1rem',
                        color: 'white'
                    }}>
                        📅
                    </div>
                    <h3 style={{
                        fontSize: '1.8rem',
                        fontWeight: '700',
                        color: '#374151',
                        margin: '0 0 0.5rem'
                    }}>
                        {t('appointments.bookAppointment')}
                    </h3>
                    <p style={{
                        color: '#6b7280',
                        margin: '0 0 1rem',
                        lineHeight: '1.5'
                    }}>
                        {t('appointments.scheduleWithDoctor', { doctorName: doctor.name })}
                    </p>
                    <div style={{
                        background: 'rgba(34, 197, 94, 0.05)',
                        border: '1px solid rgba(34, 197, 94, 0.2)',
                        borderRadius: '12px',
                        padding: '1rem',
                        display: 'inline-block'
                    }}>
                        <span style={{ fontWeight: '600', color: '#374151' }}>
                            {translateSpecialization(doctor.specialization)}
                        </span>
                        {doctor.consultationFee && (
                            <span style={{ marginLeft: '1rem', color: '#22c55e', fontWeight: '600' }}>
                                {doctor.consultationFee}
                            </span>
                        )}
                    </div>
                </div>

                <div style={{ marginBottom: '2rem' }}>
                    <label style={{
                        display: 'block',
                        marginBottom: '0.75rem',
                        fontWeight: '600',
                        color: '#374151',
                        fontSize: '1rem'
                    }}>
                        {t('appointments.selectDate')} <span style={{ color: '#dc2626' }}>*</span>
                    </label>
                    <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        min={getTodayDate()}
                        max={getMaxDate()}
                        style={{
                            width: '100%',
                            padding: '1rem',
                            border: '2px solid rgba(34, 197, 94, 0.2)',
                            borderRadius: '12px',
                            fontSize: '1rem',
                            outline: 'none',
                            boxSizing: 'border-box',
                            transition: 'border-color 0.2s ease'
                        }}
                        onFocus={e => {
                            e.target.style.borderColor = '#22c55e';
                        }}
                        onBlur={e => {
                            e.target.style.borderColor = 'rgba(34, 197, 94, 0.2)';
                        }}
                    />
                </div>

                {selectedDate && (
                    <div style={{ marginBottom: '2rem' }}>
                        <label style={{
                            display: 'block',
                            marginBottom: '0.75rem',
                            fontWeight: '600',
                            color: '#374151',
                            fontSize: '1rem'
                        }}>
                            {t('appointments.availableTimeSlots')} <span style={{ color: '#dc2626' }}>*</span>
                        </label>
                        
                        {loadingSlots ? (
                            <div style={{
                                textAlign: 'center',
                                padding: '2rem',
                                color: '#6b7280'
                            }}>
                                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⏳</div>
                                <p>{t('appointments.loadingSlots')}</p>
                            </div>
                        ) : availableSlots.length === 0 ? (
                            <div style={{
                                textAlign: 'center',
                                padding: '2rem',
                                background: 'rgba(239, 68, 68, 0.05)',
                                border: '1px solid rgba(239, 68, 68, 0.2)',
                                borderRadius: '12px',
                                color: '#6b7280'
                            }}>
                                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>📅</div>
                                <p><strong>{t('appointments.noSlotsForDate')}</strong></p>
                                <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>
                                    {t('appointments.noSlotsDescription', { doctorName: doctor.name })}
                                </p>
                            </div>
                        ) : (
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                                gap: '1rem'
                            }}>
                                {availableSlots.map((slot) => (
                                    <div
                                        key={slot.id}
                                        onClick={slot.status === 'FREE' ? () => setSelectedSlot(slot) : undefined}
                                        style={{
                                            padding: '1rem',
                                            border: slot.status === 'UNAVAILABLE' 
                                                ? '2px solid rgba(239, 68, 68, 0.3)'
                                                : selectedSlot?.id === slot.id 
                                                    ? '2px solid #22c55e' 
                                                    : '2px solid rgba(34, 197, 94, 0.2)',
                                            borderRadius: '12px',
                                            background: slot.status === 'UNAVAILABLE' 
                                                ? 'rgba(239, 68, 68, 0.05)'
                                                : selectedSlot?.id === slot.id 
                                                    ? 'rgba(34, 197, 94, 0.1)' 
                                                    : 'white',
                                            cursor: slot.status === 'FREE' ? 'pointer' : 'not-allowed',
                                            fontSize: '1rem',
                                            fontWeight: '600',
                                            color: slot.status === 'UNAVAILABLE' ? '#9ca3af' : '#374151',
                                            transition: 'all 0.2s ease',
                                            textAlign: 'center',
                                            opacity: slot.status === 'UNAVAILABLE' ? 0.7 : 1,
                                            position: 'relative'
                                        }}
                                    >
                                        {formatSlotTime(slot.startTime, slot.endTime)}
                                        {slot.status === 'UNAVAILABLE' && (
                                            <div style={{
                                                fontSize: '0.8rem',
                                                color: '#ef4444',
                                                marginTop: '0.25rem',
                                                fontWeight: '500'
                                            }}>
                                                {t('appointments.unavailable')}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{
                        display: 'block',
                        marginBottom: '0.75rem',
                        fontWeight: '600',
                        color: '#374151',
                        fontSize: '1rem'
                    }}>
                        {t('appointments.reasonForAppointment')} <span style={{ color: '#dc2626' }}>*</span>
                    </label>
                    <textarea
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        placeholder={t('appointments.reasonPlaceholder')}
                        rows="3"
                        style={{
                            width: '100%',
                            padding: '1rem',
                            border: '2px solid rgba(34, 197, 94, 0.2)',
                            borderRadius: '12px',
                            fontSize: '1rem',
                            outline: 'none',
                            boxSizing: 'border-box',
                            transition: 'border-color 0.2s ease',
                            resize: 'vertical',
                            fontFamily: 'inherit'
                        }}
                        onFocus={e => {
                            e.target.style.borderColor = '#22c55e';
                        }}
                        onBlur={e => {
                            e.target.style.borderColor = 'rgba(34, 197, 94, 0.2)';
                        }}
                    />
                </div>

                <div style={{ marginBottom: '2rem' }}>
                    <label style={{
                        display: 'block',
                        marginBottom: '0.75rem',
                        fontWeight: '600',
                        color: '#374151',
                        fontSize: '1rem'
                    }}>
                        {t('appointments.additionalNotes')}
                    </label>
                    <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder={t('appointments.additionalNotesPlaceholder')}
                        rows="2"
                        style={{
                            width: '100%',
                            padding: '1rem',
                            border: '2px solid rgba(34, 197, 94, 0.2)',
                            borderRadius: '12px',
                            fontSize: '1rem',
                            outline: 'none',
                            boxSizing: 'border-box',
                            transition: 'border-color 0.2s ease',
                            resize: 'vertical',
                            fontFamily: 'inherit'
                        }}
                        onFocus={e => {
                            e.target.style.borderColor = '#22c55e';
                        }}
                        onBlur={e => {
                            e.target.style.borderColor = 'rgba(34, 197, 94, 0.2)';
                        }}
                    />
                </div>

                <div style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    gap: '1rem'
                }}>
                    <button
                        onClick={handleClose}
                        disabled={loading}
                        style={{
                            padding: '1rem 1.5rem',
                            background: 'rgba(107, 114, 128, 0.1)',
                            color: '#374151',
                            border: '2px solid rgba(107, 114, 128, 0.2)',
                            borderRadius: '12px',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            fontSize: '1rem',
                            fontWeight: '600',
                            transition: 'all 0.3s ease',
                            opacity: loading ? 0.6 : 1
                        }}
                    >
                        {t('common.cancel')}
                    </button>
                    <button
                        onClick={handleBooking}
                        disabled={loading || !selectedSlot || !reason.trim()}
                        style={{
                            padding: '1rem 2rem',
                            background: loading || !selectedSlot || !reason.trim() 
                                ? 'rgba(107, 114, 128, 0.3)' 
                                : 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '12px',
                            cursor: loading || !selectedSlot || !reason.trim() ? 'not-allowed' : 'pointer',
                            fontSize: '1rem',
                            fontWeight: '600',
                            transition: 'all 0.3s ease',
                            boxShadow: loading || !selectedSlot || !reason.trim() 
                                ? 'none' 
                                : '0 4px 12px rgba(34, 197, 94, 0.3)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}
                    >
                        {loading ? (
                            <>
                                <div style={{
                                    width: '20px',
                                    height: '20px',
                                    border: '2px solid rgba(255, 255, 255, 0.3)',
                                    borderTop: '2px solid white',
                                    borderRadius: '50%',
                                    animation: 'spin 1s linear infinite'
                                }} />
                                {t('appointments.booking')}
                            </>
                        ) : (
                            <>
                                📅 {t('appointments.confirmBooking')}
                            </>
                        )}
                    </button>
                </div>
            </div>

            <style>
                {`
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                    @keyframes fadeInUp {
                        from {
                            opacity: 0;
                            transform: translateY(20px);
                        }
                        to {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }
                `}
            </style>
        </div>
    );
};

export default AppointmentBookingModal;
