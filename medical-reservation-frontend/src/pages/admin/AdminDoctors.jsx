import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { translateSpecialization } from '../../utils/specializationUtils';
import { adminAPI } from '../../api/admin';
import { useAuth } from '../../context/AuthContext';

const AdminDoctors = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [doctorRequests, setDoctorRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [actionLoading, setActionLoading] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState('approve'); 

    useEffect(() => {
        loadDoctorRequests();
    }, []);

    const loadDoctorRequests = async () => {
        try {
            setLoading(true);
            const response = await adminAPI.getAllDoctorRequests();
            setDoctorRequests(response.data);
        } catch (err) {
            console.error('Error loading doctor requests:', err);
            setError(t('admin.failedToLoadDoctorRequests'));
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async (requestId) => {
        try {
            setActionLoading(true);
            await adminAPI.approveDoctorRequest(requestId, user.id);
            await loadDoctorRequests();
            setShowModal(false);
            setSelectedRequest(null);
        } catch (err) {
            console.error('Error approving request:', err);
            alert(t('admin.failedToApproveRequest'));
        } finally {
            setActionLoading(false);
        }
    };

    const handleReject = async (requestId, reason) => {
        try {
            setActionLoading(true);
            await adminAPI.rejectDoctorRequest(requestId, user.id, reason);
            await loadDoctorRequests();
            setShowModal(false);
            setSelectedRequest(null);
        } catch (err) {
            console.error('Error rejecting request:', err);
            alert(t('admin.failedToRejectRequest'));
        } finally {
            setActionLoading(false);
        }
    };

    const openModal = (request, type) => {
        setSelectedRequest(request);
        setModalType(type);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedRequest(null);
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'PENDING': return 'bg-yellow-100 text-yellow-800';
            case 'APPROVED': return 'bg-green-100 text-green-800';
            case 'REJECTED': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    if (loading) {
        return (
            <div style={{
                minHeight: '100vh',
                width: '100vw',
                background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 50%, #bbf7d0 100%)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                boxSizing: 'border-box'
            }}>
                <div style={{
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '24px',
                    padding: '3rem',
                    textAlign: 'center',
                    boxShadow: '0 20px 40px rgba(34, 197, 94, 0.1), 0 8px 32px rgba(0, 0, 0, 0.05)',
                    border: '1px solid rgba(34, 197, 94, 0.1)'
                }}>
                    <div style={{
                        width: '60px',
                        height: '60px',
                        border: '4px solid rgba(34, 197, 94, 0.2)',
                        borderTop: '4px solid #22c55e',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite',
                        margin: '0 auto 1.5rem'
                    }} />
                    <p style={{ color: '#6b7280', margin: 0, fontSize: '1rem', fontWeight: '500' }}>{t('admin.loadingDoctorRequests')}</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div style={{
                background: 'rgba(254, 242, 242, 0.95)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(248, 113, 113, 0.2)',
                borderRadius: '16px',
                padding: '2rem',
                boxShadow: '0 8px 32px rgba(248, 113, 113, 0.1)'
            }}>
                <p style={{ color: '#991b1b', margin: '0 0 1rem', fontSize: '1rem', fontWeight: '500' }}>{error}</p>
                <button 
                    onClick={loadDoctorRequests}
                    style={{
                        background: 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)',
                        color: 'white',
                        border: 'none',
                        padding: '0.75rem 1.5rem',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontWeight: '500',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 4px 12px rgba(220, 38, 38, 0.25)'
                    }}
                    onMouseEnter={e => {
                        e.target.style.transform = 'translateY(-1px)';
                        e.target.style.boxShadow = '0 6px 16px rgba(220, 38, 38, 0.3)';
                    }}
                    onMouseLeave={e => {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = '0 4px 12px rgba(220, 38, 38, 0.25)';
                    }}
                >
                    {t('admin.retry')}
                </button>
            </div>
        );
    }

    return (
        <div style={{
            position: 'relative'
        }}>
            {}
            <div style={{
                position: 'absolute',
                top: '8%',
                right: '5%',
                width: '280px',
                height: '280px',
                background: 'radial-gradient(circle, rgba(34, 197, 94, 0.12) 0%, rgba(34, 197, 94, 0.06) 50%, transparent 100%)',
                borderRadius: '50%',
                zIndex: 0
            }} />
            
            <div style={{
                position: 'absolute',
                bottom: '12%',
                left: '3%',
                width: '220px',
                height: '220px',
                background: 'radial-gradient(circle, rgba(22, 163, 74, 0.1) 0%, rgba(22, 163, 74, 0.04) 50%, transparent 100%)',
                borderRadius: '50%',
                zIndex: 0
            }} />

            <div style={{
                position: 'absolute',
                top: '45%',
                left: '85%',
                width: '180px',
                height: '180px',
                background: 'radial-gradient(circle, rgba(16, 185, 129, 0.08) 0%, rgba(16, 185, 129, 0.03) 50%, transparent 100%)',
                borderRadius: '50%',
                zIndex: 0
            }} />

            {}
            <main style={{
                padding: '2.5rem 0',
                position: 'relative',
                zIndex: 1
            }}>
                {}
                <section style={{
                    background: 'rgba(255, 255, 255, 0.98)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '32px',
                    padding: '4rem 3rem',
                    marginBottom: '3rem',
                    boxShadow: '0 32px 64px rgba(34, 197, 94, 0.12), 0 16px 32px rgba(0, 0, 0, 0.06)',
                    border: '1px solid rgba(34, 197, 94, 0.15)',
                    textAlign: 'center',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    {}
                    <div style={{
                        position: 'absolute',
                        top: '-50%',
                        right: '-20%',
                        width: '400px',
                        height: '400px',
                        background: 'radial-gradient(circle, rgba(34, 197, 94, 0.05) 0%, transparent 70%)',
                        borderRadius: '50%',
                        zIndex: 0
                    }} />
                    
                    <div style={{ position: 'relative', zIndex: 1 }}>
                        <div style={{
                            width: '120px',
                            height: '120px',
                            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                            borderRadius: '24px',
                            margin: '0 auto 2.5rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 16px 40px rgba(16, 185, 129, 0.3)',
                            border: '3px solid #047857'
                        }}>
                            <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                                <circle cx="9" cy="7" r="4"/>
                                <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
                                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                            </svg>
                        </div>
                        
                        <h1 style={{
                            fontSize: '2.8rem',
                            fontWeight: '800',
                            color: '#374151',
                            margin: '0 0 1rem',
                            letterSpacing: '-0.03em',
                            lineHeight: '1.1'
                        }}>
                            {t('admin.doctorManagement')}
                        </h1>
                        
                        <p style={{
                            fontSize: '1.25rem',
                            color: '#6b7280',
                            margin: '0 0 3rem',
                            maxWidth: '700px',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            lineHeight: '1.6',
                            fontWeight: '400'
                        }}>
                            {t('admin.doctorManagementDescription', { total: doctorRequests.length })}
                        </p>

                        {}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                            gap: '1.5rem',
                            maxWidth: '800px',
                            margin: '0 auto'
                        }}>
                            <div style={{
                                background: 'rgba(34, 197, 94, 0.1)',
                                padding: '1.5rem',
                                borderRadius: '16px',
                                border: '1px solid rgba(34, 197, 94, 0.2)'
                            }}>
                                <div style={{ color: '#22c55e', marginBottom: '0.5rem' }}>
                                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="12" cy="12" r="10"/>
                                        <polyline points="12 6 12 12 16 14"/>
                                    </svg>
                                </div>
                                <div style={{ color: '#374151', fontWeight: '700', fontSize: '1.5rem' }}>
                                    {doctorRequests.filter(req => req.status === 'PENDING').length}
                                </div>
                                <div style={{ color: '#6b7280', fontSize: '0.9rem' }}>{t('appointments.pending')}</div>
                            </div>
                            <div style={{
                                background: 'rgba(34, 197, 94, 0.1)',
                                padding: '1.5rem',
                                borderRadius: '16px',
                                border: '1px solid rgba(34, 197, 94, 0.2)'
                            }}>
                                <div style={{ color: '#22c55e', marginBottom: '0.5rem' }}>
                                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                                        <polyline points="22 4 12 14.01 9 11.01"/>
                                    </svg>
                                </div>
                                <div style={{ color: '#374151', fontWeight: '700', fontSize: '1.5rem' }}>
                                    {doctorRequests.filter(req => req.status === 'APPROVED').length}
                                </div>
                                <div style={{ color: '#6b7280', fontSize: '0.9rem' }}>{t('reschedule.approved')}</div>
                            </div>
                            <div style={{
                                background: 'rgba(34, 197, 94, 0.1)',
                                padding: '1.5rem',
                                borderRadius: '16px',
                                border: '1px solid rgba(34, 197, 94, 0.2)'
                            }}>
                                <div style={{ color: '#22c55e', marginBottom: '0.5rem' }}>
                                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="12" cy="12" r="10"/>
                                        <line x1="15" y1="9" x2="9" y2="15"/>
                                        <line x1="9" y1="9" x2="15" y2="15"/>
                                    </svg>
                                </div>
                                <div style={{ color: '#374151', fontWeight: '700', fontSize: '1.5rem' }}>
                                    {doctorRequests.filter(req => req.status === 'REJECTED').length}
                                </div>
                                <div style={{ color: '#6b7280', fontSize: '0.9rem' }}>{t('reschedule.rejected')}</div>
                            </div>
                        </div>
                    </div>
                </section>

                {}
                <section style={{
                    background: 'rgba(255, 255, 255, 0.98)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '24px',
                    padding: '2.5rem',
                    boxShadow: '0 20px 40px rgba(34, 197, 94, 0.12), 0 8px 32px rgba(0, 0, 0, 0.06)',
                    border: '1px solid rgba(34, 197, 94, 0.15)',
                    overflow: 'hidden'
                }}>
                    <h3 style={{
                        fontSize: '1.8rem',
                        fontWeight: '700',
                        color: '#374151',
                        margin: '0 0 2rem',
                        letterSpacing: '-0.025em',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem'
                    }}>
                        <span style={{
                            width: '48px',
                            height: '48px',
                            background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                            borderRadius: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white'
                        }}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                                <circle cx="9" cy="7" r="4"/>
                                <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
                                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                            </svg>
                        </span>
                        {t('admin.doctorRegistrationRequests')}
                    </h3>
                    
                    <div style={{
                        display: 'grid',
                        gap: '1rem'
                    }}>
                        {doctorRequests.length > 0 ? (
                            doctorRequests.map((request) => (
                                <div key={request.id} style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    gap: '1rem',
                                    padding: '1.5rem',
                                    background: 'rgba(34, 197, 94, 0.05)',
                                    borderRadius: '12px',
                                    border: '1px solid rgba(34, 197, 94, 0.1)',
                                    transition: 'all 0.3s ease'
                                }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.background = 'rgba(34, 197, 94, 0.08)';
                                    e.currentTarget.style.transform = 'translateY(-1px)';
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.background = 'rgba(34, 197, 94, 0.05)';
                                    e.currentTarget.style.transform = 'translateY(0)';
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1 }}>
                                        <div style={{
                                            width: '50px',
                                            height: '50px',
                                            background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                                            borderRadius: '12px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: 'white',
                                            fontWeight: '700',
                                            fontSize: '1.2rem'
                                        }}>
                                            {request.userName?.charAt(0) || '?'}
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ 
                                                color: '#374151', 
                                                fontWeight: '700', 
                                                fontSize: '1.1rem',
                                                marginBottom: '0.25rem'
                                            }}>
                                                {request.userName || t('admin.noName')}
                                            </div>
                                            <div style={{ 
                                                color: '#6b7280', 
                                                fontSize: '0.9rem',
                                                marginBottom: '0.25rem'
                                            }}>
                                                {translateSpecialization(request.specialization)}
                                            </div>
                                            <div style={{ 
                                                color: '#6b7280', 
                                                fontSize: '0.85rem'
                                            }}>
                                                {t('admin.license')} {request.licenseNumber}
                                            </div>
                                        </div>
                                        <div style={{ textAlign: 'center', minWidth: '120px' }}>
                                            <span style={{
                                                display: 'inline-block',
                                                padding: '0.5rem 1rem',
                                                fontSize: '0.8rem',
                                                fontWeight: '600',
                                                borderRadius: '8px',
                                                minWidth: '90px',
                                                textAlign: 'center',
                                                background: request.status === 'PENDING' 
                                                    ? 'rgba(251, 191, 36, 0.1)' 
                                                    : request.status === 'APPROVED'
                                                    ? 'rgba(34, 197, 94, 0.1)'
                                                    : 'rgba(239, 68, 68, 0.1)',
                                                color: request.status === 'PENDING' 
                                                    ? '#d97706' 
                                                    : request.status === 'APPROVED'
                                                    ? '#16a34a'
                                                    : '#dc2626',
                                                border: `1px solid ${request.status === 'PENDING' 
                                                    ? 'rgba(251, 191, 36, 0.2)' 
                                                    : request.status === 'APPROVED'
                                                    ? 'rgba(34, 197, 94, 0.2)'
                                                    : 'rgba(239, 68, 68, 0.2)'}`
                                            }}>
                                                {request.status === 'PENDING' 
                                                    ? t('reschedule.pending')
                                                    : request.status === 'APPROVED'
                                                    ? t('reschedule.approved')
                                                    : t('reschedule.rejected')}
                                            </span>
                                            <div style={{ 
                                                color: '#6b7280', 
                                                fontSize: '0.8rem',
                                                marginTop: '0.5rem'
                                            }}>
                                                {formatDate(request.createdAt)}
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        {request.status === 'PENDING' && (
                                            <>
                                                <button
                                                    onClick={() => openModal(request, 'approve')}
                                                    disabled={actionLoading}
                                                    style={{
                                                        background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                                                        color: 'white',
                                                        border: 'none',
                                                        padding: '0.75rem 1.5rem',
                                                        borderRadius: '8px',
                                                        cursor: 'pointer',
                                                        fontWeight: '600',
                                                        fontSize: '0.9rem',
                                                        transition: 'all 0.3s ease',
                                                        boxShadow: '0 4px 12px rgba(34, 197, 94, 0.25)',
                                                        opacity: actionLoading ? 0.5 : 1
                                                    }}
                                                    onMouseEnter={e => {
                                                        if (!actionLoading) {
                                                            e.target.style.transform = 'translateY(-1px)';
                                                            e.target.style.boxShadow = '0 6px 16px rgba(34, 197, 94, 0.3)';
                                                        }
                                                    }}
                                                    onMouseLeave={e => {
                                                        if (!actionLoading) {
                                                            e.target.style.transform = 'translateY(0)';
                                                            e.target.style.boxShadow = '0 4px 12px rgba(34, 197, 94, 0.25)';
                                                        }
                                                    }}
                                                >
                                                    ✅ {t('admin.approve')}
                                                </button>
                                                <button
                                                    onClick={() => openModal(request, 'reject')}
                                                    disabled={actionLoading}
                                                    style={{
                                                        background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                                                        color: 'white',
                                                        border: 'none',
                                                        padding: '0.75rem 1.5rem',
                                                        borderRadius: '8px',
                                                        cursor: 'pointer',
                                                        fontWeight: '600',
                                                        fontSize: '0.9rem',
                                                        transition: 'all 0.3s ease',
                                                        boxShadow: '0 4px 12px rgba(239, 68, 68, 0.25)',
                                                        opacity: actionLoading ? 0.5 : 1
                                                    }}
                                                    onMouseEnter={e => {
                                                        if (!actionLoading) {
                                                            e.target.style.transform = 'translateY(-1px)';
                                                            e.target.style.boxShadow = '0 6px 16px rgba(239, 68, 68, 0.3)';
                                                        }
                                                    }}
                                                    onMouseLeave={e => {
                                                        if (!actionLoading) {
                                                            e.target.style.transform = 'translateY(0)';
                                                            e.target.style.boxShadow = '0 4px 12px rgba(239, 68, 68, 0.25)';
                                                        }
                                                    }}
                                                >
                                                    ❌ {t('admin.reject')}
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div style={{
                                padding: '3rem',
                                textAlign: 'center',
                                color: '#6b7280',
                                fontSize: '1.1rem'
                            }}>
                                <div style={{
                                    width: '60px',
                                    height: '60px',
                                    background: 'rgba(107, 114, 128, 0.1)',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    margin: '0 auto 1rem'
                                }}>
                                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                                        <circle cx="9" cy="7" r="4"/>
                                        <line x1="19" y1="8" x2="19" y2="14"/>
                                        <line x1="22" y1="11" x2="16" y2="11"/>
                                    </svg>
                                </div>
                                {t('admin.noDoctorRequestsFound')}
                            </div>
                        )}
                    </div>
                </section>

            {}
            {showModal && selectedRequest && (
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
                    zIndex: 1000
                }}>
                    <div style={{
                        background: 'white',
                        borderRadius: '16px',
                        padding: '2rem',
                        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
                        maxWidth: '400px',
                        width: '90%',
                        textAlign: 'center'
                    }}>
                        <div style={{
                            width: '60px',
                            height: '60px',
                            background: modalType === 'approve' 
                                ? 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)'
                                : 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 1rem',
                            boxShadow: modalType === 'approve' 
                                ? '0 8px 24px rgba(34, 197, 94, 0.3)'
                                : '0 8px 24px rgba(239, 68, 68, 0.3)'
                        }}>
                            <div style={{
                                fontSize: '1.5rem',
                                color: 'white'
                            }}>
                                {modalType === 'approve' ? '✅' : '❌'}
                            </div>
                        </div>
                        
                        <h3 style={{
                            fontSize: '1.5rem',
                            fontWeight: '600',
                            color: '#374151',
                            margin: '0 0 1rem'
                        }}>
                            {modalType === 'approve' ? t('admin.approveDoctor') : t('admin.rejectDoctor')}
                        </h3>
                        
                        <p style={{
                            color: '#6b7280',
                            margin: '0 0 1rem',
                            lineHeight: '1.6'
                        }}>
                            {t('admin.confirmApproveReject', { action: modalType === 'approve' ? t('admin.approve') : t('admin.reject') })}
                        </p>
                        
                        <div style={{
                            background: 'rgba(34, 197, 94, 0.05)',
                            borderRadius: '8px',
                            padding: '1rem',
                            margin: '0 0 2rem',
                            border: '1px solid rgba(34, 197, 94, 0.1)'
                        }}>
                            <div style={{
                                fontWeight: '600',
                                color: '#374151',
                                marginBottom: '0.25rem'
                            }}>
                                Dr. {selectedRequest.userName}
                            </div>
                            <div style={{
                                color: '#6b7280',
                                fontSize: '0.9rem'
                            }}>
                                {translateSpecialization(selectedRequest.specialization)} • License: {selectedRequest.licenseNumber}
                            </div>
                        </div>
                        
                        <div style={{
                            display: 'flex',
                            gap: '1rem',
                            justifyContent: 'center'
                        }}>
                            <button
                                onClick={closeModal}
                                style={{
                                    padding: '0.75rem 1.5rem',
                                    background: 'rgba(107, 114, 128, 0.1)',
                                    color: '#6b7280',
                                    border: '1px solid rgba(107, 114, 128, 0.2)',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    fontWeight: '500',
                                    transition: 'all 0.3s ease'
                                }}
                                onMouseEnter={e => {
                                    e.target.style.background = 'rgba(107, 114, 128, 0.15)';
                                }}
                                onMouseLeave={e => {
                                    e.target.style.background = 'rgba(107, 114, 128, 0.1)';
                                }}
                            >
                                {t('admin.cancel')}
                            </button>
                            
                            <button
                                onClick={() => {
                                    if (modalType === 'approve') {
                                        handleApprove(selectedRequest.id);
                                    } else {
                                        handleReject(selectedRequest.id, 'Request rejected by admin');
                                    }
                                }}
                                disabled={actionLoading}
                                style={{
                                    padding: '0.75rem 1.5rem',
                                    background: modalType === 'approve' 
                                        ? 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)'
                                        : 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    fontWeight: '500',
                                    transition: 'all 0.3s ease',
                                    boxShadow: modalType === 'approve' 
                                        ? '0 4px 12px rgba(34, 197, 94, 0.25)'
                                        : '0 4px 12px rgba(220, 38, 38, 0.25)',
                                    opacity: actionLoading ? 0.5 : 1
                                }}
                                onMouseEnter={e => {
                                    if (!actionLoading) {
                                        e.target.style.transform = 'translateY(-1px)';
                                        e.target.style.boxShadow = modalType === 'approve' 
                                            ? '0 6px 16px rgba(34, 197, 94, 0.3)'
                                            : '0 6px 16px rgba(220, 38, 38, 0.3)';
                                    }
                                }}
                                onMouseLeave={e => {
                                    if (!actionLoading) {
                                        e.target.style.transform = 'translateY(0)';
                                        e.target.style.boxShadow = modalType === 'approve' 
                                            ? '0 4px 12px rgba(34, 197, 94, 0.25)'
                                            : '0 4px 12px rgba(220, 38, 38, 0.25)';
                                    }
                                }}
                            >
                                {actionLoading ? t('admin.processing') : (modalType === 'approve' ? t('admin.yesApprove') : t('admin.yesReject'))}
                            </button>
                        </div>
                    </div>
                </div>
            )}
            </main>

            <style jsx>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
};

export default AdminDoctors;
