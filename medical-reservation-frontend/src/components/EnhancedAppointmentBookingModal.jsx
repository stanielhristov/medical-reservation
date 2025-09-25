import React, { useState, useEffect } from 'react';
import { createAppointment } from '../api/appointments';
import PatientCalendarView from './PatientCalendarView';

const EnhancedAppointmentBookingModal = ({ 
    isOpen, 
    onClose, 
    doctor, 
    patientId,
    onBookingSuccess,
    onBookingError
}) => {
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [loading, setLoading] = useState(false);
    const [reason, setReason] = useState('');
    const [notes, setNotes] = useState('');
    const [step, setStep] = useState(1); // 1: Select date/slot, 2: Enter details, 3: Confirm

    useEffect(() => {
        if (isOpen && !selectedDate) {
            const today = new Date();
            const todayString = today.toISOString().split('T')[0];
            setSelectedDate(todayString);
        }
    }, [isOpen, selectedDate]);

    const handleSlotSelect = (slot) => {
        setSelectedSlot(slot);
        setStep(2);
    };

    const handleBack = () => {
        if (step === 2) {
            setSelectedSlot(null);
            setStep(1);
        } else if (step === 3) {
            setStep(2);
        }
    };

    const handleProceedToConfirm = () => {
        if (!reason.trim()) {
            onBookingError('Please provide a reason for the appointment.');
            return;
        }
        setStep(3);
    };

    const handleBooking = async () => {
        if (!selectedSlot || !reason.trim()) {
            onBookingError('Please select a time slot and provide a reason for the appointment.');
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
            onBookingSuccess('Appointment booked successfully!');
            handleClose();
        } catch (error) {
            console.error('Error booking appointment:', error);
            onBookingError(error.message || 'Failed to book appointment. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        setSelectedDate('');
        setSelectedSlot(null);
        setReason('');
        setNotes('');
        setStep(1);
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

    const formatDate = (dateStr) => {
        return new Date(dateStr).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    if (!isOpen || !doctor) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
            padding: '1rem'
        }}>
            <div style={{
                background: 'white',
                borderRadius: '20px',
                maxWidth: step === 1 ? '700px' : '500px',
                width: '100%',
                maxHeight: '90vh',
                overflow: 'hidden',
                boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1)',
                display: 'flex',
                flexDirection: 'column'
            }}>
                {/* Header */}
                <div style={{
                    background: 'linear-gradient(135deg, #15803d 0%, #059669 100%)',
                    color: 'white',
                    padding: '2rem',
                    position: 'relative'
                }}>
                    <button
                        onClick={handleClose}
                        style={{
                            position: 'absolute',
                            top: '1rem',
                            right: '1rem',
                            background: 'rgba(255, 255, 255, 0.2)',
                            border: 'none',
                            borderRadius: '50%',
                            width: '40px',
                            height: '40px',
                            color: 'white',
                            fontSize: '1.2rem',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        ✕
                    </button>
                    
                    <div style={{ marginRight: '3rem' }}>
                        <h2 style={{ margin: '0 0 0.5rem 0', fontSize: '1.5rem' }}>
                            Book Appointment
                        </h2>
                        <p style={{ margin: 0, opacity: 0.9 }}>
                            with Dr. {doctor.fullName || doctor.name}
                        </p>
                    </div>
                    
                    {/* Progress indicator */}
                    <div style={{
                        display: 'flex',
                        gap: '0.5rem',
                        marginTop: '1.5rem'
                    }}>
                        {[1, 2, 3].map(num => (
                            <div
                                key={num}
                                style={{
                                    width: '10px',
                                    height: '10px',
                                    borderRadius: '50%',
                                    background: step >= num ? 'white' : 'rgba(255, 255, 255, 0.3)'
                                }}
                            />
                        ))}
                    </div>
                </div>

                {/* Content */}
                <div style={{ flex: 1, overflow: 'auto' }}>
                    {step === 1 && (
                        <div style={{ padding: '2rem' }}>
                            <h3 style={{ 
                                margin: '0 0 1.5rem 0', 
                                color: '#374151',
                                textAlign: 'center'
                            }}>
                                Step 1: Select Date & Time
                            </h3>
                            <PatientCalendarView
                                doctorId={doctor.id}
                                doctorName={doctor.fullName || doctor.name}
                                selectedDate={selectedDate}
                                onDateChange={setSelectedDate}
                                onSlotSelect={handleSlotSelect}
                            />
                        </div>
                    )}

                    {step === 2 && (
                        <div style={{ padding: '2rem' }}>
                            <h3 style={{ 
                                margin: '0 0 1.5rem 0', 
                                color: '#374151',
                                textAlign: 'center'
                            }}>
                                Step 2: Appointment Details
                            </h3>

                            {/* Selected slot summary */}
                            <div style={{
                                background: '#f0fdf4',
                                border: '1px solid #bbf7d0',
                                borderRadius: '12px',
                                padding: '1rem',
                                marginBottom: '2rem'
                            }}>
                                <h4 style={{ margin: '0 0 0.5rem 0', color: '#15803d' }}>
                                    Selected Appointment
                                </h4>
                                <p style={{ margin: '0 0 0.25rem 0', color: '#374151' }}>
                                    <strong>Date:</strong> {formatDate(selectedDate)}
                                </p>
                                <p style={{ margin: 0, color: '#374151' }}>
                                    <strong>Time:</strong> {formatSlotTime(selectedSlot.startTime, selectedSlot.endTime)}
                                </p>
                            </div>

                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{
                                    display: 'block',
                                    marginBottom: '0.5rem',
                                    color: '#374151',
                                    fontWeight: '600'
                                }}>
                                    Reason for appointment *
                                </label>
                                <textarea
                                    value={reason}
                                    onChange={(e) => setReason(e.target.value)}
                                    placeholder="Please describe the reason for your visit..."
                                    required
                                    rows={4}
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem',
                                        border: '2px solid #d1d5db',
                                        borderRadius: '8px',
                                        fontSize: '1rem',
                                        resize: 'vertical',
                                        fontFamily: 'inherit'
                                    }}
                                />
                            </div>

                            <div style={{ marginBottom: '2rem' }}>
                                <label style={{
                                    display: 'block',
                                    marginBottom: '0.5rem',
                                    color: '#374151',
                                    fontWeight: '600'
                                }}>
                                    Additional notes (optional)
                                </label>
                                <textarea
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                    placeholder="Any additional information you'd like to share..."
                                    rows={3}
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem',
                                        border: '2px solid #d1d5db',
                                        borderRadius: '8px',
                                        fontSize: '1rem',
                                        resize: 'vertical',
                                        fontFamily: 'inherit'
                                    }}
                                />
                            </div>

                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <button
                                    onClick={handleBack}
                                    style={{
                                        flex: 1,
                                        padding: '0.75rem',
                                        border: '2px solid #d1d5db',
                                        borderRadius: '8px',
                                        background: 'white',
                                        color: '#374151',
                                        fontSize: '1rem',
                                        fontWeight: '600',
                                        cursor: 'pointer'
                                    }}
                                >
                                    ← Back
                                </button>
                                <button
                                    onClick={handleProceedToConfirm}
                                    style={{
                                        flex: 2,
                                        padding: '0.75rem',
                                        border: 'none',
                                        borderRadius: '8px',
                                        background: '#15803d',
                                        color: 'white',
                                        fontSize: '1rem',
                                        fontWeight: '600',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Continue →
                                </button>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div style={{ padding: '2rem' }}>
                            <h3 style={{ 
                                margin: '0 0 1.5rem 0', 
                                color: '#374151',
                                textAlign: 'center'
                            }}>
                                Step 3: Confirm Booking
                            </h3>

                            <div style={{
                                background: '#f8fafc',
                                border: '1px solid #e2e8f0',
                                borderRadius: '12px',
                                padding: '1.5rem',
                                marginBottom: '2rem'
                            }}>
                                <h4 style={{ margin: '0 0 1rem 0', color: '#15803d' }}>
                                    Appointment Summary
                                </h4>
                                
                                <div style={{ marginBottom: '1rem' }}>
                                    <strong style={{ color: '#374151' }}>Doctor:</strong>
                                    <span style={{ marginLeft: '0.5rem', color: '#6b7280' }}>
                                        Dr. {doctor.fullName || doctor.name}
                                    </span>
                                </div>
                                
                                <div style={{ marginBottom: '1rem' }}>
                                    <strong style={{ color: '#374151' }}>Date:</strong>
                                    <span style={{ marginLeft: '0.5rem', color: '#6b7280' }}>
                                        {formatDate(selectedDate)}
                                    </span>
                                </div>
                                
                                <div style={{ marginBottom: '1rem' }}>
                                    <strong style={{ color: '#374151' }}>Time:</strong>
                                    <span style={{ marginLeft: '0.5rem', color: '#6b7280' }}>
                                        {formatSlotTime(selectedSlot.startTime, selectedSlot.endTime)}
                                    </span>
                                </div>
                                
                                <div style={{ marginBottom: notes.trim() ? '1rem' : 0 }}>
                                    <strong style={{ color: '#374151' }}>Reason:</strong>
                                    <div style={{ 
                                        marginTop: '0.5rem', 
                                        color: '#6b7280',
                                        background: 'white',
                                        padding: '0.75rem',
                                        borderRadius: '6px',
                                        border: '1px solid #e5e7eb'
                                    }}>
                                        {reason}
                                    </div>
                                </div>
                                
                                {notes.trim() && (
                                    <div>
                                        <strong style={{ color: '#374151' }}>Additional Notes:</strong>
                                        <div style={{ 
                                            marginTop: '0.5rem', 
                                            color: '#6b7280',
                                            background: 'white',
                                            padding: '0.75rem',
                                            borderRadius: '6px',
                                            border: '1px solid #e5e7eb'
                                        }}>
                                            {notes}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <button
                                    onClick={handleBack}
                                    disabled={loading}
                                    style={{
                                        flex: 1,
                                        padding: '0.75rem',
                                        border: '2px solid #d1d5db',
                                        borderRadius: '8px',
                                        background: 'white',
                                        color: '#374151',
                                        fontSize: '1rem',
                                        fontWeight: '600',
                                        cursor: loading ? 'not-allowed' : 'pointer'
                                    }}
                                >
                                    ← Back
                                </button>
                                <button
                                    onClick={handleBooking}
                                    disabled={loading}
                                    style={{
                                        flex: 2,
                                        padding: '0.75rem',
                                        border: 'none',
                                        borderRadius: '8px',
                                        background: loading ? '#9ca3af' : '#15803d',
                                        color: 'white',
                                        fontSize: '1rem',
                                        fontWeight: '600',
                                        cursor: loading ? 'not-allowed' : 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '0.5rem'
                                    }}
                                >
                                    {loading && (
                                        <div style={{
                                            width: '16px',
                                            height: '16px',
                                            border: '2px solid rgba(255, 255, 255, 0.3)',
                                            borderTop: '2px solid white',
                                            borderRadius: '50%',
                                            animation: 'spin 1s linear infinite'
                                        }} />
                                    )}
                                    {loading ? 'Booking...' : 'Confirm Booking'}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <style jsx>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
};

export default EnhancedAppointmentBookingModal;
