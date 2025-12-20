import React from 'react';
import { useTranslation } from 'react-i18next';
import { translateSpecialization } from '../utils/specializationUtils';

const PendingDoctorRequestsSection = ({ pendingDoctorRequests, formatDate, onNavigation }) => {
    const { t } = useTranslation();
    return (
        <section style={{
            background: 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(20px)',
            borderRadius: '24px',
            padding: '2.5rem',
            boxShadow: '0 20px 40px rgba(34, 197, 94, 0.12), 0 16px 32px rgba(0, 0, 0, 0.06)',
            border: '1px solid rgba(34, 197, 94, 0.15)'
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
                    margin: 0,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem'
                }}>
                    <span style={{
                        width: '40px',
                        height: '40px',
                        background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.2rem'
                    }}>
                        ⏳
                    </span>
                    {t('admin.pendingDoctorRequests')}
                    {pendingDoctorRequests.length > 0 && (
                        <span style={{
                            background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                            color: 'white',
                            padding: '0.25rem 0.75rem',
                            borderRadius: '50px',
                            fontSize: '0.8rem',
                            fontWeight: '700',
                            boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)'
                        }}>
                            {pendingDoctorRequests.length}
                        </span>
                    )}
                </h2>
                
                <button
                    onClick={() => onNavigation('/admin/doctors')}
                    style={{
                        padding: '0.75rem 1.5rem',
                        background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '12px',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                    }}
                    onMouseEnter={e => {
                        e.target.style.transform = 'translateY(-2px)';
                        e.target.style.boxShadow = '0 6px 20px rgba(245, 158, 11, 0.4)';
                    }}
                    onMouseLeave={e => {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = '0 4px 12px rgba(245, 158, 11, 0.3)';
                    }}
                >
                    {t('admin.manageDoctors')}
                    <span>→</span>
                </button>
            </div>

            {pendingDoctorRequests.length === 0 ? (
                <div style={{
                    textAlign: 'center',
                    padding: '3rem',
                    color: '#6b7280'
                }}>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem', opacity: 0.5 }}>✅</div>
                    <p style={{ fontSize: '1.1rem', fontWeight: '500', margin: 0 }}>
                        {t('admin.noPendingDoctorRequests')}
                    </p>
                    <p style={{ fontSize: '0.9rem', margin: '0.5rem 0 0', opacity: 0.8 }}>
                        {t('admin.allDoctorApplicationsProcessed')}
                    </p>
                </div>
            ) : (
                <div style={{
                    display: 'grid',
                    gap: '1rem'
                }}>
                    {pendingDoctorRequests.map(request => (
                        <div
                            key={request.id}
                            style={{
                                background: 'rgba(254, 252, 232, 0.8)',
                                borderRadius: '16px',
                                padding: '1.5rem',
                                border: '1px solid rgba(251, 191, 36, 0.3)',
                                transition: 'all 0.3s ease',
                                cursor: 'pointer'
                            }}
                            onMouseEnter={e => {
                                e.target.style.background = 'rgba(254, 249, 195, 0.9)';
                                e.target.style.transform = 'translateY(-2px)';
                                e.target.style.boxShadow = '0 8px 25px rgba(245, 158, 11, 0.15)';
                            }}
                            onMouseLeave={e => {
                                e.target.style.background = 'rgba(254, 252, 232, 0.8)';
                                e.target.style.transform = 'translateY(0)';
                                e.target.style.boxShadow = 'none';
                            }}
                            onClick={() => onNavigation(`/admin/doctors/${request.id}`)}
                        >
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'flex-start',
                                gap: '1rem'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1 }}>
                                    <div style={{
                                        width: '50px',
                                        height: '50px',
                                        background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                                        borderRadius: '12px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '1.5rem',
                                        color: 'white',
                                        boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)'
                                    }}>
                                        👩‍⚕️
                                    </div>
                                    
                                    <div style={{ flex: 1 }}>
                                        <h4 style={{
                                            fontSize: '1.1rem',
                                            fontWeight: '600',
                                            color: '#374151',
                                            margin: '0 0 0.25rem'
                                        }}>
                                            Dr. {request.fullName}
                                        </h4>
                                        <p style={{
                                            fontSize: '0.9rem',
                                            color: '#6b7280',
                                            margin: '0 0 0.5rem'
                                        }}>
                                            {translateSpecialization(request.specialization)}
                                        </p>
                                        <div style={{
                                            display: 'flex',
                                            gap: '1rem',
                                            fontSize: '0.8rem',
                                            color: '#9ca3af'
                                        }}>
                                            <span>📧 {request.email}</span>
                                            <span>📅 {t('admin.applied')} {formatDate(request.createdAt)}</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '0.5rem',
                                    alignItems: 'flex-end'
                                }}>
                                    <div style={{
                                        background: 'rgba(251, 191, 36, 0.2)',
                                        color: '#d97706',
                                        padding: '0.4rem 0.8rem',
                                        borderRadius: '8px',
                                        fontSize: '0.75rem',
                                        fontWeight: '600',
                                        border: '1px solid rgba(251, 191, 36, 0.3)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem'
                                    }}>
                                        ⏳ {t('admin.pendingReview')}
                                    </div>
                                    
                                    {request.licenseNumber && (
                                        <div style={{
                                            fontSize: '0.75rem',
                                            color: '#6b7280',
                                            textAlign: 'right'
                                        }}>
                                            {t('admin.license')} {request.licenseNumber}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {request.bio && (
                                <div style={{
                                    marginTop: '1rem',
                                    padding: '1rem',
                                    background: 'rgba(255, 255, 255, 0.7)',
                                    borderRadius: '12px',
                                    border: '1px solid rgba(251, 191, 36, 0.2)'
                                }}>
                                    <p style={{
                                        fontSize: '0.9rem',
                                        color: '#374151',
                                        margin: 0,
                                        lineHeight: '1.5'
                                    }}>
                                        <strong>{t('admin.bio')}</strong> {request.bio}
                                    </p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
};

export default PendingDoctorRequestsSection;
