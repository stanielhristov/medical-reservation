import React, { useState } from 'react';
import { respondToRescheduleRequest } from '../api/rescheduleRequests';

const RescheduleRequestCard = ({ request, onUpdate }) => {
    const [loading, setLoading] = useState(false);
    const [showResponseForm, setShowResponseForm] = useState(false);
    const [doctorResponse, setDoctorResponse] = useState('');
    const [error, setError] = useState('');

    const formatDateTime = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'PENDING':
                return { backgroundColor: '#fef3c7', color: '#92400e', border: '#f59e0b' };
            case 'APPROVED':
                return { backgroundColor: '#d1fae5', color: '#065f46', border: '#10b981' };
            case 'REJECTED':
                return { backgroundColor: '#fee2e2', color: '#991b1b', border: '#ef4444' };
            default:
                return { backgroundColor: '#f3f4f6', color: '#374151', border: '#9ca3af' };
        }
    };

    const handleResponse = async (status) => {
        try {
            setLoading(true);
            setError('');
            
            await respondToRescheduleRequest(
                request.id, 
                status, 
                doctorResponse.trim() || null
            );
            
            onUpdate && onUpdate();
            setShowResponseForm(false);
            setDoctorResponse('');
        } catch (error) {
            console.error('Error responding to reschedule request:', error);
            setError(error.message || 'Failed to respond to request');
        } finally {
            setLoading(false);
        }
    };

    const statusStyle = getStatusColor(request.status);

    return (
        <div style={{
            background: 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(20px)',
            borderRadius: '20px',
            padding: '2rem',
            marginBottom: '1.5rem',
            boxShadow: '0 16px 32px rgba(0, 0, 0, 0.08)',
            border: '1px solid rgba(0, 0, 0, 0.08)',
            transition: 'all 0.3s ease'
        }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '1.5rem'
            }}>
                <div>
                    <h3 style={{
                        fontSize: '1.3rem',
                        fontWeight: '700',
                        color: '#374151',
                        margin: '0 0 0.5rem 0'
                    }}>
                        Reschedule Request from {request.patientName}
                    </h3>
                    <p style={{
                        fontSize: '1rem',
                        color: '#6b7280',
                        margin: '0 0 0.5rem 0'
                    }}>
                        Service: {request.serviceName}
                    </p>
                </div>
                <span style={{
                    padding: '0.5rem 1rem',
                    borderRadius: '12px',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    backgroundColor: statusStyle.backgroundColor,
                    color: statusStyle.color,
                    border: `1px solid ${statusStyle.border}`
                }}>
                    {request.status}
                </span>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '2rem',
                marginBottom: '1.5rem'
            }}>
                <div style={{
                    padding: '1.5rem',
                    backgroundColor: '#fef2f2',
                    borderRadius: '16px',
                    border: '1px solid #fecaca'
                }}>
                    <h4 style={{
                        fontSize: '1.1rem',
                        fontWeight: '600',
                        color: '#dc2626',
                        margin: '0 0 1rem 0'
                    }}>
                        Original Appointment
                    </h4>
                    <p style={{
                        fontSize: '1rem',
                        color: '#374151',
                        margin: 0
                    }}>
                        {formatDateTime(request.originalDateTime)}
                    </p>
                </div>

                <div style={{
                    padding: '1.5rem',
                    backgroundColor: '#f0fdf4',
                    borderRadius: '16px',
                    border: '1px solid #bbf7d0'
                }}>
                    <h4 style={{
                        fontSize: '1.1rem',
                        fontWeight: '600',
                        color: '#16a34a',
                        margin: '0 0 1rem 0'
                    }}>
                        Requested New Time
                    </h4>
                    <p style={{
                        fontSize: '1rem',
                        color: '#374151',
                        margin: 0
                    }}>
                        {formatDateTime(request.requestedDateTime)}
                    </p>
                </div>
            </div>

            {request.patientReason && (
                <div style={{
                    padding: '1.5rem',
                    backgroundColor: '#f8fafc',
                    borderRadius: '16px',
                    border: '1px solid #e2e8f0',
                    marginBottom: '1.5rem'
                }}>
                    <h4 style={{
                        fontSize: '1.1rem',
                        fontWeight: '600',
                        color: '#374151',
                        margin: '0 0 1rem 0'
                    }}>
                        Patient's Reason
                    </h4>
                    <p style={{
                        fontSize: '1rem',
                        color: '#6b7280',
                        margin: 0,
                        lineHeight: '1.6'
                    }}>
                        {request.patientReason}
                    </p>
                </div>
            )}

            {request.doctorResponse && (
                <div style={{
                    padding: '1.5rem',
                    backgroundColor: '#f0f9ff',
                    borderRadius: '16px',
                    border: '1px solid #bae6fd',
                    marginBottom: '1.5rem'
                }}>
                    <h4 style={{
                        fontSize: '1.1rem',
                        fontWeight: '600',
                        color: '#0369a1',
                        margin: '0 0 1rem 0'
                    }}>
                        Your Response
                    </h4>
                    <p style={{
                        fontSize: '1rem',
                        color: '#374151',
                        margin: 0,
                        lineHeight: '1.6'
                    }}>
                        {request.doctorResponse}
                    </p>
                </div>
            )}

            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingTop: '1rem',
                borderTop: '1px solid #e5e7eb'
            }}>
                <div style={{
                    fontSize: '0.9rem',
                    color: '#9ca3af'
                }}>
                    Requested on {new Date(request.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    })}
                    {request.respondedAt && (
                        <span>
                            {' • Responded on '}{new Date(request.respondedAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </span>
                    )}
                </div>

                {request.status === 'PENDING' && (
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        {!showResponseForm ? (
                            <>
                                <button
                                    onClick={() => handleResponse('APPROVED')}
                                    disabled={loading}
                                    style={{
                                        padding: '0.75rem 1.5rem',
                                        border: 'none',
                                        borderRadius: '12px',
                                        backgroundColor: '#10b981',
                                        color: 'white',
                                        fontSize: '1rem',
                                        fontWeight: '600',
                                        cursor: loading ? 'not-allowed' : 'pointer',
                                        opacity: loading ? 0.6 : 1
                                    }}
                                >
                                    {loading ? 'Processing...' : 'Approve'}
                                </button>
                                <button
                                    onClick={() => setShowResponseForm(true)}
                                    disabled={loading}
                                    style={{
                                        padding: '0.75rem 1.5rem',
                                        border: '2px solid #ef4444',
                                        borderRadius: '12px',
                                        backgroundColor: 'white',
                                        color: '#ef4444',
                                        fontSize: '1rem',
                                        fontWeight: '600',
                                        cursor: loading ? 'not-allowed' : 'pointer',
                                        opacity: loading ? 0.6 : 1
                                    }}
                                >
                                    Reject
                                </button>
                            </>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
                                <textarea
                                    value={doctorResponse}
                                    onChange={(e) => setDoctorResponse(e.target.value)}
                                    placeholder="Optional: Provide a reason for rejection or additional comments..."
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
                                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                                    <button
                                        onClick={() => {
                                            setShowResponseForm(false);
                                            setDoctorResponse('');
                                            setError('');
                                        }}
                                        disabled={loading}
                                        style={{
                                            padding: '0.75rem 1.5rem',
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
                                        onClick={() => handleResponse('REJECTED')}
                                        disabled={loading}
                                        style={{
                                            padding: '0.75rem 1.5rem',
                                            border: 'none',
                                            borderRadius: '12px',
                                            backgroundColor: '#ef4444',
                                            color: 'white',
                                            fontSize: '1rem',
                                            fontWeight: '600',
                                            cursor: loading ? 'not-allowed' : 'pointer',
                                            opacity: loading ? 0.6 : 1
                                        }}
                                    >
                                        {loading ? 'Processing...' : 'Confirm Rejection'}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {error && (
                <div style={{
                    marginTop: '1rem',
                    padding: '1rem',
                    backgroundColor: '#fef2f2',
                    border: '1px solid #fecaca',
                    borderRadius: '12px',
                    color: '#dc2626'
                }}>
                    {error}
                </div>
            )}
        </div>
    );
};

export default RescheduleRequestCard;
