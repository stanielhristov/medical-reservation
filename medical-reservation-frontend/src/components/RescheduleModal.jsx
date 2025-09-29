import React, { useState, useEffect } from 'react';
import { getAvailableSlots } from '../api/schedule';
import { createRescheduleRequest } from '../api/rescheduleRequests';
import LoadingSpinner from './LoadingSpinner';

const RescheduleModal = ({ isOpen, onClose, appointment, onSuccess }) => {
    const [selectedDate, setSelectedDate] = useState('');
    const [availableSlots, setAvailableSlots] = useState([]);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [reason, setReason] = useState('');
    const [loading, setLoading] = useState(false);
    const [slotsLoading, setSlotsLoading] = useState(false);
    const [error, setError] = useState('');

    // Get next 30 days for date selection
    const getAvailableDates = () => {
        const dates = [];
        const today = new Date();
        for (let i = 1; i <= 30; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);
            dates.push(date);
        }
        return dates;
    };

    const availableDates = getAvailableDates();

    useEffect(() => {
        if (selectedDate && appointment) {
            fetchAvailableSlots();
        }
    }, [selectedDate, appointment]);

    const fetchAvailableSlots = async () => {
        try {
            setSlotsLoading(true);
            setError('');
            setSelectedSlot(null);
            
            const startDate = new Date(selectedDate);
            startDate.setHours(0, 0, 0, 0);
            
            const endDate = new Date(selectedDate);
            endDate.setHours(23, 59, 59, 999);
            
            const slots = await getAvailableSlots(appointment.doctorId, startDate, endDate);
            setAvailableSlots(slots.filter(slot => slot.available));
        } catch (error) {
            console.error('Error fetching available slots:', error);
            setError('Failed to load available slots. Please try again.');
            setAvailableSlots([]);
        } finally {
            setSlotsLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedSlot) {
            setError('Please select a time slot');
            return;
        }

        try {
            setLoading(true);
            setError('');
            
            await createRescheduleRequest(
                appointment.id,
                new Date(selectedSlot.startTime),
                new Date(selectedSlot.endTime),
                reason.trim() || null
            );
            
            onSuccess && onSuccess();
            
            // Show success message
            alert('Reschedule request submitted successfully! The doctor will review your request and respond soon.');
            
            onClose();
            
            // Reset form
            setSelectedDate('');
            setSelectedSlot(null);
            setReason('');
            setAvailableSlots([]);
        } catch (error) {
            console.error('Error creating reschedule request:', error);
            setError(error.message || 'Failed to submit reschedule request. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        if (!loading) {
            onClose();
            // Reset form
            setSelectedDate('');
            setSelectedSlot(null);
            setReason('');
            setAvailableSlots([]);
            setError('');
        }
    };

    const formatDate = (date) => {
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const formatTime = (dateString) => {
        return new Date(dateString).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    };

    if (!isOpen) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '1rem'
        }}>
            <div style={{
                backgroundColor: 'white',
                borderRadius: '24px',
                padding: '2rem',
                maxWidth: '600px',
                width: '100%',
                maxHeight: '90vh',
                overflowY: 'auto',
                boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)'
            }}>
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
                        Reschedule Appointment
                    </h2>
                    <button
                        onClick={handleClose}
                        disabled={loading}
                        style={{
                            background: 'none',
                            border: 'none',
                            fontSize: '1.5rem',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            color: '#9ca3af',
                            padding: '0.5rem'
                        }}
                    >
                        ✕
                    </button>
                </div>

                {appointment && (
                    <div style={{
                        backgroundColor: '#f8fafc',
                        borderRadius: '16px',
                        padding: '1.5rem',
                        marginBottom: '2rem',
                        border: '1px solid #e2e8f0'
                    }}>
                        <h3 style={{
                            fontSize: '1.2rem',
                            fontWeight: '600',
                            color: '#374151',
                            marginBottom: '1rem'
                        }}>
                            Current Appointment
                        </h3>
                        <div style={{ color: '#6b7280' }}>
                            <p style={{ margin: '0.5rem 0' }}>
                                <strong>Doctor:</strong> {appointment.doctorName}
                            </p>
                            <p style={{ margin: '0.5rem 0' }}>
                                <strong>Date & Time:</strong> {formatDate(appointment.date)} at {formatTime(appointment.date)}
                            </p>
                            <p style={{ margin: '0.5rem 0' }}>
                                <strong>Type:</strong> {appointment.type}
                            </p>
                        </div>
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '2rem' }}>
                        <label style={{
                            display: 'block',
                            fontSize: '1rem',
                            fontWeight: '600',
                            color: '#374151',
                            marginBottom: '0.5rem'
                        }}>
                            Select New Date
                        </label>
                        <select
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            required
                            disabled={loading}
                            style={{
                                width: '100%',
                                padding: '1rem',
                                border: '2px solid #e5e7eb',
                                borderRadius: '12px',
                                fontSize: '1rem',
                                backgroundColor: 'white',
                                cursor: loading ? 'not-allowed' : 'pointer'
                            }}
                        >
                            <option value="">Choose a date...</option>
                            {availableDates.map((date, index) => (
                                <option key={index} value={date.toISOString().split('T')[0]}>
                                    {formatDate(date)}
                                </option>
                            ))}
                        </select>
                    </div>

                    {selectedDate && (
                        <div style={{ marginBottom: '2rem' }}>
                            <label style={{
                                display: 'block',
                                fontSize: '1rem',
                                fontWeight: '600',
                                color: '#374151',
                                marginBottom: '0.5rem'
                            }}>
                                Available Time Slots
                            </label>
                            
                            {slotsLoading ? (
                                <div style={{ textAlign: 'center', padding: '2rem' }}>
                                    <LoadingSpinner message="Loading available slots..." />
                                </div>
                            ) : availableSlots.length === 0 ? (
                                <div style={{
                                    textAlign: 'center',
                                    padding: '2rem',
                                    color: '#9ca3af',
                                    backgroundColor: '#f9fafb',
                                    borderRadius: '12px',
                                    border: '1px solid #e5e7eb'
                                }}>
                                    No available slots for this date. Please select another date.
                                </div>
                            ) : (
                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
                                    gap: '0.75rem',
                                    maxHeight: '200px',
                                    overflowY: 'auto',
                                    padding: '0.5rem',
                                    border: '1px solid #e5e7eb',
                                    borderRadius: '12px',
                                    backgroundColor: '#f9fafb'
                                }}>
                                    {availableSlots.map((slot, index) => (
                                        <button
                                            key={index}
                                            type="button"
                                            onClick={() => setSelectedSlot(slot)}
                                            disabled={loading}
                                            style={{
                                                padding: '0.75rem',
                                                border: selectedSlot?.id === slot.id ? '2px solid #3b82f6' : '1px solid #d1d5db',
                                                borderRadius: '8px',
                                                backgroundColor: selectedSlot?.id === slot.id ? '#eff6ff' : 'white',
                                                color: selectedSlot?.id === slot.id ? '#1d4ed8' : '#374151',
                                                cursor: loading ? 'not-allowed' : 'pointer',
                                                fontSize: '0.9rem',
                                                fontWeight: selectedSlot?.id === slot.id ? '600' : '400',
                                                transition: 'all 0.2s ease'
                                            }}
                                        >
                                            {formatTime(slot.startTime)}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    <div style={{ marginBottom: '2rem' }}>
                        <label style={{
                            display: 'block',
                            fontSize: '1rem',
                            fontWeight: '600',
                            color: '#374151',
                            marginBottom: '0.5rem'
                        }}>
                            Reason for Rescheduling (Optional)
                        </label>
                        <textarea
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            placeholder="Please provide a reason for rescheduling..."
                            disabled={loading}
                            rows={3}
                            style={{
                                width: '100%',
                                padding: '1rem',
                                border: '2px solid #e5e7eb',
                                borderRadius: '12px',
                                fontSize: '1rem',
                                resize: 'vertical',
                                minHeight: '80px'
                            }}
                        />
                    </div>

                    {error && (
                        <div style={{
                            backgroundColor: '#fef2f2',
                            border: '1px solid #fecaca',
                            borderRadius: '12px',
                            padding: '1rem',
                            marginBottom: '1.5rem',
                            color: '#dc2626'
                        }}>
                            {error}
                        </div>
                    )}

                    <div style={{
                        display: 'flex',
                        gap: '1rem',
                        justifyContent: 'flex-end'
                    }}>
                        <button
                            type="button"
                            onClick={handleClose}
                            disabled={loading}
                            style={{
                                padding: '1rem 2rem',
                                border: '2px solid #e5e7eb',
                                borderRadius: '12px',
                                backgroundColor: 'white',
                                color: '#374151',
                                fontSize: '1rem',
                                fontWeight: '600',
                                cursor: loading ? 'not-allowed' : 'pointer'
                            }}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading || !selectedSlot}
                            style={{
                                padding: '1rem 2rem',
                                border: 'none',
                                borderRadius: '12px',
                                backgroundColor: loading || !selectedSlot ? '#9ca3af' : '#3b82f6',
                                color: 'white',
                                fontSize: '1rem',
                                fontWeight: '600',
                                cursor: loading || !selectedSlot ? 'not-allowed' : 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}
                        >
                            {loading ? (
                                <>
                                    <div style={{
                                        width: '16px',
                                        height: '16px',
                                        border: '2px solid transparent',
                                        borderTop: '2px solid white',
                                        borderRadius: '50%',
                                        animation: 'spin 1s linear infinite'
                                    }} />
                                    Submitting...
                                </>
                            ) : (
                                'Submit Request'
                            )}
                        </button>
                    </div>
                </form>

                <div style={{
                    marginTop: '2rem',
                    padding: '1rem',
                    backgroundColor: '#f0f9ff',
                    borderRadius: '12px',
                    border: '1px solid #bae6fd'
                }}>
                    <p style={{
                        margin: 0,
                        fontSize: '0.9rem',
                        color: '#0369a1'
                    }}>
                        <strong>Note:</strong> Your reschedule request will be sent to the doctor for approval. 
                        The appointment will only be rescheduled once the doctor approves your request.
                    </p>
                </div>
            </div>

            <style>
                {`
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                `}
            </style>
        </div>
    );
};

export default RescheduleModal;
