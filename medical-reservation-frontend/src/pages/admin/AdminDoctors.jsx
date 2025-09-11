import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminAPI } from '../../api/admin';
import { useAuth } from '../../context/AuthContext';

const AdminDoctors = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [doctorRequests, setDoctorRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [actionLoading, setActionLoading] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState('approve'); // 'approve' or 'reject'

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
            setError('Failed to load doctor requests');
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
            alert('Failed to approve request. Please try again.');
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
            alert('Failed to reject request. Please try again.');
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
                    <p style={{ color: '#6b7280', margin: 0, fontSize: '1rem', fontWeight: '500' }}>Loading doctor requests...</p>
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
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div style={{
            position: 'relative'
        }}>
            {/* Enhanced background decorations */}
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

            {/* Main Content */}
            <main style={{
                padding: '2.5rem 0',
                position: 'relative',
                zIndex: 1
            }}>
                {/* Enhanced Welcome Section */}
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
                    {/* Background pattern */}
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
                            background: '#10b981',
                            borderRadius: '24px',
                            margin: '0 auto 2.5rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 16px 40px rgba(16, 185, 129, 0.3)',
                            border: '3px solid #047857',
                            position: 'relative'
                        }}>
                            {/* Doctor Stethoscope Icon */}
                            <div style={{
                                width: '60px',
                                height: '60px',
                                position: 'relative',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <div style={{
                                    position: 'absolute',
                                    top: '8px',
                                    left: '25px',
                                    width: '10px',
                                    height: '10px',
                                    background: 'white',
                                    borderRadius: '50%',
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                                }} />
                                <div style={{
                                    position: 'absolute',
                                    top: '12px',
                                    left: '12px',
                                    width: '2px',
                                    height: '20px',
                                    background: 'white',
                                    borderRadius: '1px',
                                    transform: 'rotate(-30deg)'
                                }} />
                                <div style={{
                                    position: 'absolute',
                                    top: '12px',
                                    left: '36px',
                                    width: '2px',
                                    height: '20px',
                                    background: 'white',
                                    borderRadius: '1px',
                                    transform: 'rotate(30deg)'
                                }} />
                                <div style={{
                                    position: 'absolute',
                                    top: '30px',
                                    left: '8px',
                                    width: '6px',
                                    height: '12px',
                                    background: 'white',
                                    borderRadius: '3px 3px 0 0'
                                }} />
                                <div style={{
                                    position: 'absolute',
                                    top: '30px',
                                    left: '38px',
                                    width: '6px',
                                    height: '12px',
                                    background: 'white',
                                    borderRadius: '3px 3px 0 0'
                                }} />
                                <div style={{
                                    position: 'absolute',
                                    top: '40px',
                                    left: '20px',
                                    width: '12px',
                                    height: '8px',
                                    background: 'rgba(220, 252, 231, 0.9)',
                                    borderRadius: '6px',
                                    border: '2px solid white'
                                }} />
                            </div>
                        </div>
                        
                        <h1 style={{
                            fontSize: '2.8rem',
                            fontWeight: '800',
                            color: '#374151',
                            margin: '0 0 1rem',
                            letterSpacing: '-0.03em',
                            lineHeight: '1.1'
                        }}>
                            Doctor Management
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
                            Review and approve doctor registration requests. Manage medical professional credentials 
                            and maintain platform quality standards ({doctorRequests.length} total requests).
                        </p>

                        {/* Quick Stats */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                            gap: '1.5rem',
                            maxWidth: '800px',
                            margin: '0 auto'
                        }}>
                            <div style={{
                                background: 'rgba(251, 191, 36, 0.1)',
                                padding: '1.5rem',
                                borderRadius: '16px',
                                border: '1px solid rgba(251, 191, 36, 0.2)'
                            }}>
                                <div style={{ color: '#f59e0b', fontSize: '2rem', marginBottom: '0.5rem' }}>⏱️</div>
                                <div style={{ color: '#374151', fontWeight: '700', fontSize: '1.5rem' }}>
                                    {doctorRequests.filter(req => req.status === 'PENDING').length}
                                </div>
                                <div style={{ color: '#6b7280', fontSize: '0.9rem' }}>Pending</div>
                            </div>
                            <div style={{
                                background: 'rgba(34, 197, 94, 0.1)',
                                padding: '1.5rem',
                                borderRadius: '16px',
                                border: '1px solid rgba(34, 197, 94, 0.2)'
                            }}>
                                <div style={{ color: '#22c55e', fontSize: '2rem', marginBottom: '0.5rem' }}>✅</div>
                                <div style={{ color: '#374151', fontWeight: '700', fontSize: '1.5rem' }}>
                                    {doctorRequests.filter(req => req.status === 'APPROVED').length}
                                </div>
                                <div style={{ color: '#6b7280', fontSize: '0.9rem' }}>Approved</div>
                            </div>
                            <div style={{
                                background: 'rgba(239, 68, 68, 0.1)',
                                padding: '1.5rem',
                                borderRadius: '16px',
                                border: '1px solid rgba(239, 68, 68, 0.2)'
                            }}>
                                <div style={{ color: '#ef4444', fontSize: '2rem', marginBottom: '0.5rem' }}>❌</div>
                                <div style={{ color: '#374151', fontWeight: '700', fontSize: '1.5rem' }}>
                                    {doctorRequests.filter(req => req.status === 'REJECTED').length}
                                </div>
                                <div style={{ color: '#6b7280', fontSize: '0.9rem' }}>Rejected</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Doctor Requests Table */}
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
                            color: 'white',
                            fontSize: '1.5rem'
                        }}>🩺</span>
                        Doctor Registration Requests
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
                                                {request.userName || 'No name'}
                                            </div>
                                            <div style={{ 
                                                color: '#6b7280', 
                                                fontSize: '0.9rem',
                                                marginBottom: '0.25rem'
                                            }}>
                                                {request.specialization}
                                            </div>
                                            <div style={{ 
                                                color: '#6b7280', 
                                                fontSize: '0.85rem'
                                            }}>
                                                License: {request.licenseNumber}
                                            </div>
                                        </div>
                                        <div style={{ textAlign: 'center', minWidth: '120px' }}>
                                            <span style={{
                                                display: 'inline-block',
                                                padding: '0.5rem 1rem',
                                                fontSize: '0.8rem',
                                                fontWeight: '600',
                                                borderRadius: '8px',
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
                                                {request.status}
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
                                                    ✅ Approve
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
                                                    ❌ Reject
                                                </button>
                                            </>
                                        )}
                                        {request.status !== 'PENDING' && (
                                            <span style={{
                                                color: '#6b7280',
                                                fontSize: '0.9rem',
                                                fontWeight: '500',
                                                padding: '0.75rem 1.5rem'
                                            }}>
                                                {request.status === 'APPROVED' ? '✅ Approved' : '❌ Rejected'}
                                            </span>
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
                                    <span style={{ fontSize: '1.5rem' }}>🏥</span>
                                </div>
                                No doctor requests found.
                            </div>
                        )}
                    </div>
                </section>

            {/* Confirmation Modal */}
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
                            {modalType === 'approve' ? 'Approve Doctor' : 'Reject Doctor'}
                        </h3>
                        
                        <p style={{
                            color: '#6b7280',
                            margin: '0 0 1rem',
                            lineHeight: '1.6'
                        }}>
                            Are you sure you want to <strong>{modalType}</strong> the registration request for:
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
                                {selectedRequest.specialization} • License: {selectedRequest.licenseNumber}
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
                                Cancel
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
                                {actionLoading ? 'Processing...' : `Yes, ${modalType === 'approve' ? 'Approve' : 'Reject'}`}
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
