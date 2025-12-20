import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getPatientRescheduleRequests } from '../api/rescheduleRequests';
import LoadingSpinner from './LoadingSpinner';

const PatientRescheduleStatus = () => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        if (user?.id) {
            fetchRescheduleRequests();
        }
    }, [user?.id]);

    const fetchRescheduleRequests = async () => {
        try {
            setLoading(true);
            const response = await getPatientRescheduleRequests(user.id);
            const recentRequests = response.filter(request => 
                request.status === 'PENDING' && 
                new Date(request.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
            );
            setRequests(recentRequests);
        } catch (error) {
            console.error('Error fetching reschedule requests:', error);
            setRequests([]);
        } finally {
            setLoading(false);
        }
    };

    const formatDateTime = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString('en-GB', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });
    };

    const formatRequestedDateTime = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString('en-GB', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });
    };

    if (loading) {
        return <LoadingSpinner message="Loading reschedule status..." />;
    }

    if (requests.length === 0) {
        return null; 
    }

    return (
        <div style={{
            background: 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(20px)',
            borderRadius: '20px',
            padding: '2rem',
            marginBottom: '2rem',
            boxShadow: '0 16px 32px rgba(0, 0, 0, 0.08)',
            border: '1px solid rgba(0, 0, 0, 0.08)'
        }}>
            <h3 style={{
                fontSize: '1.3rem',
                fontWeight: '700',
                color: '#374151',
                margin: '0 0 1.5rem 0',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
            }}>
                🔄 Pending Reschedule Requests
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {requests.map(request => (
                    <div
                        key={request.id}
                        style={{
                            padding: '1.5rem',
                            backgroundColor: '#fef3c7',
                            borderRadius: '16px',
                            border: '1px solid #f59e0b'
                        }}
                    >
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'flex-start',
                            marginBottom: '1rem'
                        }}>
                            <div>
                                <h4 style={{
                                    fontSize: '1.1rem',
                                    fontWeight: '600',
                                    color: '#92400e',
                                    margin: '0 0 0.5rem 0'
                                }}>
                                    Dr. {request.doctorName}
                                </h4>
                                <p style={{
                                    fontSize: '0.9rem',
                                    color: '#78350f',
                                    margin: 0
                                }}>
                                    {request.serviceName}
                                </p>
                            </div>
                            <span style={{
                                padding: '0.5rem 1rem',
                                borderRadius: '12px',
                                fontSize: '0.8rem',
                                fontWeight: '600',
                                backgroundColor: '#fbbf24',
                                color: '#92400e'
                            }}>
                                PENDING
                            </span>
                        </div>

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            gap: '1rem',
                            fontSize: '0.9rem',
                            color: '#78350f'
                        }}>
                            <div>
                                <strong>From:</strong> {formatDateTime(request.originalDateTime)}
                            </div>
                            <div>
                                <strong>To:</strong> {formatRequestedDateTime(request.requestedDateTime)}
                            </div>
                        </div>

                        <div style={{
                            marginTop: '1rem',
                            padding: '1rem',
                            backgroundColor: '#fef7cd',
                            borderRadius: '12px',
                            fontSize: '0.9rem',
                            color: '#78350f'
                        }}>
                            <strong>Status:</strong> Waiting for doctor approval. You will be notified once the doctor responds to your request.
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PatientRescheduleStatus;
