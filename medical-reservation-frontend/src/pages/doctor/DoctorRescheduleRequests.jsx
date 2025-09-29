import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useRescheduleRequests } from '../../hooks/useRescheduleRequests';
import LoadingSpinner from '../../components/LoadingSpinner';
import RescheduleRequestCard from '../../components/RescheduleRequestCard';

const DoctorRescheduleRequests = () => {
    const { user } = useAuth();
    const [selectedFilter, setSelectedFilter] = useState('all');
    const {
        loading,
        requests,
        pendingCount,
        getFilteredRequests,
        refreshRequests
    } = useRescheduleRequests('doctor');

    const filteredRequests = getFilteredRequests(selectedFilter);

    const getFilterStats = () => {
        return {
            all: requests.length,
            pending: requests.filter(r => r.status === 'PENDING').length,
            approved: requests.filter(r => r.status === 'APPROVED').length,
            rejected: requests.filter(r => r.status === 'REJECTED').length
        };
    };

    const stats = getFilterStats();

    const filterOptions = [
        { key: 'all', label: 'All Requests', count: stats.all, color: '#6b7280' },
        { key: 'pending', label: 'Pending', count: stats.pending, color: '#f59e0b' },
        { key: 'approved', label: 'Approved', count: stats.approved, color: '#10b981' },
        { key: 'rejected', label: 'Rejected', count: stats.rejected, color: '#ef4444' }
    ];

    if (loading) {
        return <LoadingSpinner message="Loading reschedule requests..." />;
    }

    return (
        <div style={{ position: 'relative' }}>
            {/* Background decorations */}
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
                {/* Header */}
                <div style={{
                    textAlign: 'center',
                    marginBottom: '3rem'
                }}>
                    <h1 style={{
                        fontSize: '3rem',
                        fontWeight: '800',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        margin: '0 0 1rem 0'
                    }}>
                        Reschedule Requests
                    </h1>
                    <p style={{
                        fontSize: '1.2rem',
                        color: '#6b7280',
                        margin: 0,
                        maxWidth: '600px',
                        marginLeft: 'auto',
                        marginRight: 'auto'
                    }}>
                        Review and manage patient reschedule requests for your appointments
                    </p>
                </div>

                {/* Filter Tabs */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginBottom: '3rem'
                }}>
                    <div style={{
                        display: 'flex',
                        background: 'rgba(255, 255, 255, 0.98)',
                        backdropFilter: 'blur(20px)',
                        borderRadius: '20px',
                        padding: '0.5rem',
                        boxShadow: '0 16px 32px rgba(0, 0, 0, 0.06)',
                        border: '1px solid rgba(0, 0, 0, 0.08)',
                        gap: '0.5rem'
                    }}>
                        {filterOptions.map((option) => (
                            <button
                                key={option.key}
                                onClick={() => setSelectedFilter(option.key)}
                                style={{
                                    padding: '1rem 2rem',
                                    border: 'none',
                                    borderRadius: '16px',
                                    fontSize: '1rem',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    backgroundColor: selectedFilter === option.key ? option.color : 'transparent',
                                    color: selectedFilter === option.key ? 'white' : option.color
                                }}
                            >
                                {option.label}
                                {option.count > 0 && (
                                    <span style={{
                                        backgroundColor: selectedFilter === option.key ? 'rgba(255, 255, 255, 0.3)' : `${option.color}20`,
                                        color: selectedFilter === option.key ? 'white' : option.color,
                                        padding: '0.25rem 0.5rem',
                                        borderRadius: '8px',
                                        fontSize: '0.8rem',
                                        fontWeight: '700'
                                    }}>
                                        {option.count}
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Requests List */}
                <section>
                    {filteredRequests.length === 0 ? (
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
                                {selectedFilter === 'pending' ? '⏳' : 
                                 selectedFilter === 'approved' ? '✅' : 
                                 selectedFilter === 'rejected' ? '❌' : '📋'}
                            </div>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: '600', margin: '0 0 0.5rem 0' }}>
                                No {selectedFilter === 'all' ? '' : selectedFilter.toLowerCase()} reschedule requests
                            </h3>
                            <p style={{ margin: 0, fontSize: '1.1rem' }}>
                                {selectedFilter === 'pending' ? 
                                    "You don't have any pending reschedule requests at the moment." :
                                 selectedFilter === 'approved' ? 
                                    "You haven't approved any reschedule requests yet." :
                                 selectedFilter === 'rejected' ? 
                                    "You haven't rejected any reschedule requests yet." :
                                    "You don't have any reschedule requests yet."}
                            </p>
                        </div>
                    ) : (
                        <div>
                            {filteredRequests.map(request => (
                                <RescheduleRequestCard
                                    key={request.id}
                                    request={request}
                                    onUpdate={refreshRequests}
                                />
                            ))}
                        </div>
                    )}
                </section>

                {/* Quick Stats */}
                {requests.length > 0 && (
                    <div style={{
                        marginTop: '3rem',
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '1.5rem'
                    }}>
                        <div style={{
                            background: 'rgba(255, 255, 255, 0.98)',
                            backdropFilter: 'blur(20px)',
                            borderRadius: '20px',
                            padding: '2rem',
                            textAlign: 'center',
                            boxShadow: '0 16px 32px rgba(0, 0, 0, 0.06)',
                            border: '1px solid rgba(0, 0, 0, 0.08)'
                        }}>
                            <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>📊</div>
                            <h4 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#374151', margin: '0 0 0.5rem 0' }}>
                                Total Requests
                            </h4>
                            <p style={{ fontSize: '2rem', fontWeight: '700', color: '#3b82f6', margin: 0 }}>
                                {stats.all}
                            </p>
                        </div>

                        <div style={{
                            background: 'rgba(255, 255, 255, 0.98)',
                            backdropFilter: 'blur(20px)',
                            borderRadius: '20px',
                            padding: '2rem',
                            textAlign: 'center',
                            boxShadow: '0 16px 32px rgba(0, 0, 0, 0.06)',
                            border: '1px solid rgba(0, 0, 0, 0.08)'
                        }}>
                            <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>⏳</div>
                            <h4 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#374151', margin: '0 0 0.5rem 0' }}>
                                Pending
                            </h4>
                            <p style={{ fontSize: '2rem', fontWeight: '700', color: '#f59e0b', margin: 0 }}>
                                {stats.pending}
                            </p>
                        </div>

                        <div style={{
                            background: 'rgba(255, 255, 255, 0.98)',
                            backdropFilter: 'blur(20px)',
                            borderRadius: '20px',
                            padding: '2rem',
                            textAlign: 'center',
                            boxShadow: '0 16px 32px rgba(0, 0, 0, 0.06)',
                            border: '1px solid rgba(0, 0, 0, 0.08)'
                        }}>
                            <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>✅</div>
                            <h4 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#374151', margin: '0 0 0.5rem 0' }}>
                                Approved
                            </h4>
                            <p style={{ fontSize: '2rem', fontWeight: '700', color: '#10b981', margin: 0 }}>
                                {stats.approved}
                            </p>
                        </div>

                        <div style={{
                            background: 'rgba(255, 255, 255, 0.98)',
                            backdropFilter: 'blur(20px)',
                            borderRadius: '20px',
                            padding: '2rem',
                            textAlign: 'center',
                            boxShadow: '0 16px 32px rgba(0, 0, 0, 0.06)',
                            border: '1px solid rgba(0, 0, 0, 0.08)'
                        }}>
                            <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>❌</div>
                            <h4 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#374151', margin: '0 0 0.5rem 0' }}>
                                Rejected
                            </h4>
                            <p style={{ fontSize: '2rem', fontWeight: '700', color: '#ef4444', margin: 0 }}>
                                {stats.rejected}
                            </p>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default DoctorRescheduleRequests;
