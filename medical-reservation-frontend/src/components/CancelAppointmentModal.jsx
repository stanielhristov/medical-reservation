import React, { useState } from 'react';
import { translateSpecialization } from '../utils/specializationUtils';

const CancelAppointmentModal = ({ 
    isOpen, 
    onClose, 
    onConfirm, 
    appointment,
    loading = false 
}) => {
    const [reason, setReason] = useState('');

    const handleConfirm = () => {
        onConfirm(appointment, reason.trim() || null);
        setReason('');
    };

    const handleClose = () => {
        setReason('');
        onClose();
    };

    if (!isOpen || !appointment) return null;

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
                maxWidth: '600px',
                width: '100%',
                maxHeight: '90vh',
                overflowY: 'auto',
                boxShadow: '0 25px 50px rgba(0,0,0,0.25)',
                position: 'relative',
                animation: 'fadeInUp 0.3s ease-out',
                border: '1px solid rgba(239, 68, 68, 0.2)'
            }} onClick={e => e.stopPropagation()}>
                <button
                    onClick={handleClose}
                    disabled={loading}
                    style={{
                        position: 'absolute',
                        top: '1rem',
                        right: '1rem',
                        background: 'none',
                        border: 'none',
                        fontSize: '1.5rem',
                        cursor: loading ? 'not-allowed' : 'pointer',
                        color: '#9ca3af',
                        padding: '0.5rem',
                        borderRadius: '8px',
                        opacity: loading ? 0.5 : 1
                    }}
                >
                    ✕
                </button>

                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <div style={{
                        width: '80px',
                        height: '80px',
                        background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                        borderRadius: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '2rem',
                        margin: '0 auto 1rem',
                        color: 'white'
                    }}>
                        ⚠️
                    </div>
                    <h3 style={{
                        fontSize: '1.8rem',
                        fontWeight: '700',
                        color: '#374151',
                        margin: '0 0 0.5rem'
                    }}>
                        Cancel Appointment
                    </h3>
                    <p style={{
                        color: '#6b7280',
                        margin: '0 0 1rem',
                        lineHeight: '1.5'
                    }}>
                        Are you sure you want to cancel this appointment?
                    </p>
                </div>

                {}
                <div style={{
                    background: 'rgba(239, 68, 68, 0.05)',
                    border: '1px solid rgba(239, 68, 68, 0.2)',
                    borderRadius: '16px',
                    padding: '1.5rem',
                    marginBottom: '2rem'
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
                        📅 Appointment Details
                    </h4>
                    <div style={{ display: 'grid', gap: '0.75rem' }}>
                        <div>
                            <span style={{ fontSize: '0.9rem', color: '#6b7280', fontWeight: '600' }}>Doctor: </span>
                            <span style={{ color: '#374151', fontWeight: '600' }}>{appointment.doctorName}</span>
                        </div>
                        <div>
                            <span style={{ fontSize: '0.9rem', color: '#6b7280', fontWeight: '600' }}>Specialization: </span>
                            <span style={{ color: '#374151' }}>{translateSpecialization(appointment.specialization)}</span>
                        </div>
                        <div>
                            <span style={{ fontSize: '0.9rem', color: '#6b7280', fontWeight: '600' }}>Date & Time: </span>
                            <span style={{ color: '#374151', fontWeight: '600' }}>
                                {appointment.date?.toLocaleDateString('en-US', {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })} at {appointment.date?.toLocaleTimeString('en-US', {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    hour12: true
                                })}
                            </span>
                        </div>
                        <div>
                            <span style={{ fontSize: '0.9rem', color: '#6b7280', fontWeight: '600' }}>Duration: </span>
                            <span style={{ color: '#374151' }}>{appointment.duration}</span>
                        </div>
                    </div>
                </div>

                {}
                <div style={{ marginBottom: '2rem' }}>
                    <label style={{
                        display: 'block',
                        marginBottom: '0.75rem',
                        fontWeight: '600',
                        color: '#374151',
                        fontSize: '1rem'
                    }}>
                        Reason for Cancellation (Optional)
                    </label>
                    <textarea
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        placeholder="Please let us know why you're cancelling this appointment..."
                        rows="3"
                        disabled={loading}
                        style={{
                            width: '100%',
                            padding: '1rem',
                            border: '2px solid rgba(239, 68, 68, 0.2)',
                            borderRadius: '12px',
                            fontSize: '1rem',
                            outline: 'none',
                            boxSizing: 'border-box',
                            transition: 'border-color 0.2s ease',
                            resize: 'vertical',
                            fontFamily: 'inherit',
                            opacity: loading ? 0.7 : 1
                        }}
                        onFocus={e => {
                            if (!loading) e.target.style.borderColor = '#ef4444';
                        }}
                        onBlur={e => {
                            e.target.style.borderColor = 'rgba(239, 68, 68, 0.2)';
                        }}
                    />
                </div>

                {}
                <div style={{
                    background: 'rgba(251, 191, 36, 0.1)',
                    border: '1px solid rgba(251, 191, 36, 0.3)',
                    borderRadius: '12px',
                    padding: '1rem',
                    marginBottom: '2rem',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.75rem'
                }}>
                    <span style={{ fontSize: '1.25rem' }}>⚠️</span>
                    <div>
                        <p style={{
                            color: '#92400e',
                            margin: '0 0 0.5rem',
                            fontSize: '0.9rem',
                            fontWeight: '600'
                        }}>
                            Important Notice
                        </p>
                        <p style={{
                            color: '#92400e',
                            margin: 0,
                            fontSize: '0.85rem',
                            lineHeight: '1.4'
                        }}>
                            Cancelling this appointment may result in a cancellation fee depending on the timing. 
                            Please check our cancellation policy or contact support if you have questions.
                        </p>
                    </div>
                </div>

                {}
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
                        Keep Appointment
                    </button>
                    <button
                        onClick={handleConfirm}
                        disabled={loading}
                        style={{
                            padding: '1rem 2rem',
                            background: loading 
                                ? 'rgba(107, 114, 128, 0.3)' 
                                : 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '12px',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            fontSize: '1rem',
                            fontWeight: '600',
                            transition: 'all 0.3s ease',
                            boxShadow: loading 
                                ? 'none' 
                                : '0 4px 12px rgba(239, 68, 68, 0.3)',
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
                                Cancelling...
                            </>
                        ) : (
                            <>
                                ❌ Yes, Cancel Appointment
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

export default CancelAppointmentModal;
