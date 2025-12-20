import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import { useRescheduleRequests } from '../../hooks/useRescheduleRequests';
import LoadingSpinner from '../../components/LoadingSpinner';
import RescheduleRequestCard from '../../components/RescheduleRequestCard';

const DoctorRescheduleRequests = () => {
    const { t } = useTranslation();
    const { user } = useAuth();
    const [selectedFilter, setSelectedFilter] = useState('all');
    const {
        loading,
        requests,
        pendingCount,
        doctorId,
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
        { key: 'all', label: t('reschedule.allRequests'), count: stats.all },
        { key: 'pending', label: t('appointments.pending'), count: stats.pending },
        { key: 'approved', label: t('reschedule.approved'), count: stats.approved },
        { key: 'rejected', label: t('reschedule.rejected'), count: stats.rejected }
    ];

    if (loading) {
        return <LoadingSpinner message={t('loading.loadingRescheduleRequests')} />;
    }

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 50%, #bbf7d0 100%)',
            position: 'relative'
        }}>
            <main style={{
                maxWidth: '1400px',
                margin: '0 auto',
                padding: '2rem',
                position: 'relative',
                zIndex: 1
            }}>
                {}
                <section style={{
                    background: 'rgba(255, 255, 255, 0.98)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '32px',
                    padding: '3rem',
                    marginBottom: '2rem',
                    boxShadow: '0 32px 64px rgba(34, 197, 94, 0.12), 0 16px 32px rgba(0, 0, 0, 0.06)',
                    border: '1px solid rgba(34, 197, 94, 0.15)',
                    textAlign: 'center'
                }}>
                    <div style={{
                        width: '100px',
                        height: '100px',
                        background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                        borderRadius: '25px',
                        margin: '0 auto 2rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 20px 40px rgba(34, 197, 94, 0.3)'
                    }}>
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.5"/>
                            <path d="M16 2v4"/>
                            <path d="M8 2v4"/>
                            <path d="M3 10h5"/>
                            <path d="M17.5 17.5 16 16.25V14"/>
                            <circle cx="16" cy="16" r="6"/>
                        </svg>
                    </div>
                    
                    <h1 style={{
                        fontSize: '2.5rem',
                        fontWeight: '800',
                        color: '#374151',
                        margin: '0 0 0.5rem',
                        letterSpacing: '-0.02em'
                    }}>
                        {t('reschedule.rescheduleRequests')}
                    </h1>
                    
                    <p style={{
                        fontSize: '1.2rem',
                        color: '#6b7280',
                        margin: '0 0 2rem',
                        fontWeight: '500'
                    }}>
                        {t('reschedule.manageDescription')}
                    </p>

                    {}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(4, 1fr)',
                        gap: '1rem',
                        maxWidth: '800px',
                        margin: '0 auto'
                    }}>
                        <div style={{
                            background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(34, 197, 94, 0.05) 100%)',
                            borderRadius: '16px',
                            padding: '1.5rem 1rem',
                            border: '1px solid rgba(34, 197, 94, 0.2)'
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.5rem' }}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="18" y1="20" x2="18" y2="10"/>
                                    <line x1="12" y1="20" x2="12" y2="4"/>
                                    <line x1="6" y1="20" x2="6" y2="14"/>
                                </svg>
                            </div>
                            <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#22c55e' }}>{stats.all}</div>
                            <div style={{ fontSize: '0.8rem', color: '#6b7280', fontWeight: '500' }}>{t('reschedule.totalRequests')}</div>
                        </div>

                        <div style={{
                            background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(34, 197, 94, 0.05) 100%)',
                            borderRadius: '16px',
                            padding: '1.5rem 1rem',
                            border: '1px solid rgba(34, 197, 94, 0.2)'
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.5rem' }}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10"/>
                                    <polyline points="12,6 12,12 16,14"/>
                                </svg>
                            </div>
                            <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#22c55e' }}>{stats.pending}</div>
                            <div style={{ fontSize: '0.8rem', color: '#6b7280', fontWeight: '500' }}>{t('reschedule.pending')}</div>
                        </div>

                        <div style={{
                            background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(34, 197, 94, 0.05) 100%)',
                            borderRadius: '16px',
                            padding: '1.5rem 1rem',
                            border: '1px solid rgba(34, 197, 94, 0.2)'
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.5rem' }}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                                    <polyline points="22 4 12 14.01 9 11.01"/>
                                </svg>
                            </div>
                            <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#22c55e' }}>{stats.approved}</div>
                            <div style={{ fontSize: '0.8rem', color: '#6b7280', fontWeight: '500' }}>{t('reschedule.approved')}</div>
                        </div>

                        <div style={{
                            background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(34, 197, 94, 0.05) 100%)',
                            borderRadius: '16px',
                            padding: '1.5rem 1rem',
                            border: '1px solid rgba(34, 197, 94, 0.2)'
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.5rem' }}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10"/>
                                    <line x1="15" y1="9" x2="9" y2="15"/>
                                    <line x1="9" y1="9" x2="15" y2="15"/>
                                </svg>
                            </div>
                            <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#22c55e' }}>{stats.rejected}</div>
                            <div style={{ fontSize: '0.8rem', color: '#6b7280', fontWeight: '500' }}>{t('reschedule.rejected')}</div>
                        </div>
                    </div>
                </section>

                {}
                <section style={{
                    background: 'rgba(255, 255, 255, 0.98)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '24px',
                    padding: '1.5rem',
                    marginBottom: '2rem',
                    boxShadow: '0 16px 32px rgba(34, 197, 94, 0.08)',
                    border: '1px solid rgba(34, 197, 94, 0.1)'
                }}>
                    <div style={{
                        display: 'flex',
                        gap: '0.75rem',
                        flexWrap: 'wrap'
                    }}>
                        {filterOptions.map((option) => (
                            <button
                                key={option.key}
                                onClick={() => setSelectedFilter(option.key)}
                                style={{
                                    padding: '0.75rem 1.5rem',
                                    border: 'none',
                                    borderRadius: '12px',
                                    fontSize: '0.95rem',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    backgroundColor: selectedFilter === option.key 
                                        ? 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)' 
                                        : 'rgba(34, 197, 94, 0.1)',
                                    background: selectedFilter === option.key 
                                        ? 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)' 
                                        : 'rgba(34, 197, 94, 0.1)',
                                    color: selectedFilter === option.key ? 'white' : '#22c55e',
                                    boxShadow: selectedFilter === option.key 
                                        ? '0 4px 12px rgba(34, 197, 94, 0.3)' 
                                        : 'none'
                                }}
                            >
                                {option.label}
                                <span style={{
                                    backgroundColor: selectedFilter === option.key 
                                        ? 'rgba(255, 255, 255, 0.25)' 
                                        : 'rgba(34, 197, 94, 0.15)',
                                    color: selectedFilter === option.key ? 'white' : '#22c55e',
                                    padding: '0.2rem 0.5rem',
                                    borderRadius: '6px',
                                    fontSize: '0.8rem',
                                    fontWeight: '700'
                                }}>
                                    {option.count}
                                </span>
                            </button>
                        ))}
                    </div>
                </section>

                {}
                <section>
                    {filteredRequests.length === 0 ? (
                        <div style={{
                            background: 'rgba(255, 255, 255, 0.98)',
                            backdropFilter: 'blur(20px)',
                            borderRadius: '24px',
                            padding: '4rem 2rem',
                            textAlign: 'center',
                            boxShadow: '0 16px 32px rgba(34, 197, 94, 0.08)',
                            border: '1px solid rgba(34, 197, 94, 0.1)'
                        }}>
                            <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>
                                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.5"/>
                                    <path d="M16 2v4"/>
                                    <path d="M8 2v4"/>
                                    <path d="M3 10h5"/>
                                    <path d="M17.5 17.5 16 16.25V14"/>
                                    <circle cx="16" cy="16" r="6"/>
                                </svg>
                            </div>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: '600', margin: '0 0 0.5rem 0', color: '#374151' }}>
                                {selectedFilter === 'all' ? t('reschedule.noRequests') : 
                                 t('reschedule.noRequestsForFilter', { filter: selectedFilter === 'pending' ? t('reschedule.pending') : 
                                                                        selectedFilter === 'approved' ? t('reschedule.approved') : 
                                                                        t('reschedule.rejected') })}
                            </h3>
                            <p style={{ margin: 0, fontSize: '1.1rem', color: '#6b7280' }}>
                                {selectedFilter === 'pending' ? t('reschedule.noPendingRequests') :
                                 selectedFilter === 'approved' ? t('reschedule.noApprovedRequests') :
                                 selectedFilter === 'rejected' ? t('reschedule.noRejectedRequests') :
                                 t('reschedule.noRequestsYet')}
                            </p>
                        </div>
                    ) : (
                        <div>
                            {filteredRequests.map(request => (
                                <RescheduleRequestCard
                                    key={request.id}
                                    request={request}
                                    doctorId={doctorId}
                                    onUpdate={refreshRequests}
                                />
                            ))}
                        </div>
                    )}
                </section>
            </main>

            <style jsx>{`
                @keyframes fadeIn {
                    0% { 
                        opacity: 0; 
                        transform: translateY(20px);
                    }
                    100% { 
                        opacity: 1; 
                        transform: translateY(0);
                    }
                }
            `}</style>
        </div>
    );
};

export default DoctorRescheduleRequests;
