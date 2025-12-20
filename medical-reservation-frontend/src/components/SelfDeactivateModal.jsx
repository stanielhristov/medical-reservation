import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import { selfDeactivateAccount } from '../api/profile';

const SelfDeactivateModal = ({ isOpen, onClose }) => {
    const { t } = useTranslation();
    const [isDeactivating, setIsDeactivating] = useState(false);
    const [error, setError] = useState(null);
    const { user, logout } = useAuth();

    const handleDeactivate = async () => {
        try {
            setIsDeactivating(true);
            setError(null);
            
            await selfDeactivateAccount(user.id);

            setTimeout(() => {
                logout();
            }, 2000);
            
        } catch (err) {
            console.error('Deactivation error:', err);
            setError(err.message || t('profile.failedToDeactivate'));
        } finally {
            setIsDeactivating(false);
        }
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
            zIndex: 1000
        }}>
            <div style={{
                background: 'white',
                borderRadius: '16px',
                padding: '2rem',
                maxWidth: '500px',
                width: '90%',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
                animation: 'modalSlideIn 0.3s ease-out'
            }}>
                {}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '1.5rem',
                    paddingBottom: '1rem',
                    borderBottom: '1px solid #e5e7eb'
                }}>
                    <div style={{
                        width: '48px',
                        height: '48px',
                        backgroundColor: '#fef3c7',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: '1rem'
                    }}>
                        <span style={{ fontSize: '1.5rem' }}>⚠️</span>
                    </div>
                    <div>
                        <h2 style={{
                            fontSize: '1.25rem',
                            fontWeight: '700',
                            color: '#374151',
                            margin: 0
                        }}>
                            {t('profile.deactivateAccount')}
                        </h2>
                        <p style={{
                            fontSize: '0.875rem',
                            color: '#6b7280',
                            margin: '0.25rem 0 0'
                        }}>
                            {t('profile.deactivateAccountDescription')}
                        </p>
                    </div>
                </div>

                {}
                <div style={{ marginBottom: '2rem' }}>
                    <div style={{
                        backgroundColor: '#fef7f0',
                        border: '1px solid #fed7aa',
                        borderRadius: '12px',
                        padding: '1rem',
                        marginBottom: '1.5rem'
                    }}>
                        <h3 style={{
                            fontSize: '1rem',
                            fontWeight: '600',
                            color: '#ea580c',
                            margin: '0 0 0.5rem'
                        }}>
                            {t('profile.whatHappensWhenDeactivate')}
                        </h3>
                        <ul style={{
                            fontSize: '0.875rem',
                            color: '#374151',
                            margin: 0,
                            paddingLeft: '1.25rem',
                            lineHeight: '1.6'
                        }}>
                            <li>{t('profile.deactivateConsequence1')}</li>
                            <li>{t('profile.deactivateConsequence2')}</li>
                            <li>{t('profile.deactivateConsequence3')}</li>
                            <li><strong>{t('profile.deactivateConsequence4')}</strong></li>
                            <li><em>{t('profile.deactivateNote')}</em></li>
                        </ul>
                    </div>

                    <div style={{
                        backgroundColor: '#f0f9ff',
                        border: '1px solid #bae6fd',
                        borderRadius: '12px',
                        padding: '1rem'
                    }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            marginBottom: '0.5rem'
                        }}>
                            <span style={{ fontSize: '1.125rem' }}>💡</span>
                            <span style={{
                                fontSize: '0.875rem',
                                fontWeight: '600',
                                color: '#0369a1'
                            }}>
                                {t('profile.goodToKnow')}
                            </span>
                        </div>
                        <p style={{
                            fontSize: '0.875rem',
                            color: '#374151',
                            margin: 0,
                            lineHeight: '1.6'
                        }}>
                            {t('profile.deactivateGoodToKnowDescription')}
                        </p>
                    </div>

                    {error && (
                        <div style={{
                            backgroundColor: '#fef2f2',
                            border: '1px solid #fecaca',
                            borderRadius: '8px',
                            padding: '0.75rem',
                            marginTop: '1rem'
                        }}>
                            <p style={{
                                fontSize: '0.875rem',
                                color: '#dc2626',
                                margin: 0
                            }}>
                                {error}
                            </p>
                        </div>
                    )}
                </div>

                {}
                <div style={{
                    display: 'flex',
                    gap: '0.75rem',
                    justifyContent: 'flex-end'
                }}>
                    <button
                        onClick={onClose}
                        disabled={isDeactivating}
                        style={{
                            padding: '0.75rem 1.5rem',
                            border: '1px solid #d1d5db',
                            borderRadius: '8px',
                            background: 'white',
                            color: '#374151',
                            fontSize: '0.875rem',
                            fontWeight: '500',
                            cursor: isDeactivating ? 'not-allowed' : 'pointer',
                            opacity: isDeactivating ? 0.5 : 1,
                            transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={e => {
                            if (!isDeactivating) {
                                e.target.style.backgroundColor = '#f9fafb';
                            }
                        }}
                        onMouseLeave={e => {
                            if (!isDeactivating) {
                                e.target.style.backgroundColor = 'white';
                            }
                        }}
                    >
                        {t('common.cancel')}
                    </button>
                    <button
                        onClick={handleDeactivate}
                        disabled={isDeactivating}
                        style={{
                            padding: '0.75rem 1.5rem',
                            border: 'none',
                            borderRadius: '8px',
                            background: isDeactivating 
                                ? 'linear-gradient(135deg, #9ca3af 0%, #6b7280 100%)'
                                : 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                            color: 'white',
                            fontSize: '0.875rem',
                            fontWeight: '600',
                            cursor: isDeactivating ? 'not-allowed' : 'pointer',
                            transition: 'all 0.2s ease',
                            boxShadow: isDeactivating 
                                ? 'none' 
                                : '0 4px 12px rgba(245, 158, 11, 0.3)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}
                        onMouseEnter={e => {
                            if (!isDeactivating) {
                                e.target.style.transform = 'translateY(-1px)';
                                e.target.style.boxShadow = '0 6px 16px rgba(245, 158, 11, 0.4)';
                            }
                        }}
                        onMouseLeave={e => {
                            if (!isDeactivating) {
                                e.target.style.transform = 'translateY(0)';
                                e.target.style.boxShadow = '0 4px 12px rgba(245, 158, 11, 0.3)';
                            }
                        }}
                    >
                        {isDeactivating && (
                            <div style={{
                                width: '16px',
                                height: '16px',
                                border: '2px solid white',
                                borderTop: '2px solid transparent',
                                borderRadius: '50%',
                                animation: 'spin 1s linear infinite'
                            }} />
                        )}
                        {isDeactivating ? t('profile.deactivating') : t('profile.deactivateAccount')}
                    </button>
                </div>

                <style jsx>{`
                    @keyframes modalSlideIn {
                        from {
                            opacity: 0;
                            transform: translateY(-20px) scale(0.95);
                        }
                        to {
                            opacity: 1;
                            transform: translateY(0) scale(1);
                        }
                    }
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                `}</style>
            </div>
        </div>
    );
};

export default SelfDeactivateModal;
