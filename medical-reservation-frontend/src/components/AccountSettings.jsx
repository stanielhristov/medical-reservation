import React, { useState } from 'react';
import SelfDeactivateModal from './SelfDeactivateModal';

const AccountSettings = () => {
    const [showDeactivateModal, setShowDeactivateModal] = useState(false);

    return (
        <div>
            <h2 style={{
                fontSize: '1.75rem',
                fontWeight: '700',
                color: '#374151',
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
            }}>
                <div style={{
                    width: '40px',
                    height: '40px',
                    background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '1.25rem'
                }}>
                    ⚙️
                </div>
                Account Settings
            </h2>

            <div style={{
                display: 'grid',
                gap: '2rem'
            }}>
                {/* Account Status Section */}
                <div style={{
                    background: '#f8fafc',
                    borderRadius: '16px',
                    padding: '2rem',
                    border: '1px solid #e2e8f0'
                }}>
                    <h3 style={{
                        fontSize: '1.25rem',
                        fontWeight: '600',
                        color: '#1e293b',
                        marginBottom: '1rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                    }}>
                        <span style={{ fontSize: '1.125rem' }}>✅</span>
                        Account Status
                    </h3>
                    <div style={{
                        background: 'white',
                        borderRadius: '12px',
                        padding: '1.5rem',
                        border: '1px solid #e2e8f0'
                    }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginBottom: '1rem'
                        }}>
                            <div>
                                <div style={{
                                    fontSize: '1rem',
                                    fontWeight: '600',
                                    color: '#1e293b',
                                    marginBottom: '0.25rem'
                                }}>
                                    Current Status
                                </div>
                                <div style={{
                                    fontSize: '0.875rem',
                                    color: '#64748b'
                                }}>
                                    Your account is currently active
                                </div>
                            </div>
                            <div style={{
                                background: '#dcfdf7',
                                color: '#065f46',
                                padding: '0.5rem 1rem',
                                borderRadius: '8px',
                                fontSize: '0.875rem',
                                fontWeight: '600',
                                border: '1px solid #86efac'
                            }}>
                                Active
                            </div>
                        </div>
                        <div style={{
                            fontSize: '0.875rem',
                            color: '#64748b',
                            lineHeight: '1.6'
                        }}>
                            Your account is active and you can access all features. 
                            If you need to temporarily disable your account, you can deactivate it below.
                        </div>
                    </div>
                </div>

                {/* Account Deactivation Section */}
                <div style={{
                    background: '#fefce8',
                    borderRadius: '16px',
                    padding: '2rem',
                    border: '1px solid #fde047'
                }}>
                    <h3 style={{
                        fontSize: '1.25rem',
                        fontWeight: '600',
                        color: '#92400e',
                        marginBottom: '1rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                    }}>
                        <span style={{ fontSize: '1.125rem' }}>⚠️</span>
                        Account Deactivation
                    </h3>
                    
                    <div style={{
                        background: 'white',
                        borderRadius: '12px',
                        padding: '1.5rem',
                        border: '1px solid #fde047',
                        marginBottom: '1.5rem'
                    }}>
                        <div style={{
                            fontSize: '1rem',
                            fontWeight: '600',
                            color: '#92400e',
                            marginBottom: '0.75rem'
                        }}>
                            Temporarily Deactivate Your Account
                        </div>
                        <div style={{
                            fontSize: '0.875rem',
                            color: '#374151',
                            lineHeight: '1.6',
                            marginBottom: '1rem'
                        }}>
                            You can temporarily deactivate your account if you need a break. 
                            This will prevent others from booking appointments with you and limit your access to the platform.
                        </div>
                        
                        <div style={{
                            background: '#f0f9ff',
                            border: '1px solid #bae6fd',
                            borderRadius: '8px',
                            padding: '1rem',
                            marginBottom: '1.5rem'
                        }}>
                            <div style={{
                                fontSize: '0.875rem',
                                fontWeight: '600',
                                color: '#0369a1',
                                marginBottom: '0.5rem'
                            }}>
                                What happens when you deactivate?
                            </div>
                            <ul style={{
                                fontSize: '0.875rem',
                                color: '#374151',
                                margin: 0,
                                paddingLeft: '1.25rem',
                                lineHeight: '1.6'
                            }}>
                                <li>Your account will be temporarily disabled</li>
                                <li>You will be automatically logged out</li>
                                <li>Others won't be able to book appointments with you</li>
                                <li><strong>You can reactivate anytime by logging in again</strong></li>
                            </ul>
                        </div>

                        <button
                            onClick={() => setShowDeactivateModal(true)}
                            style={{
                                background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '8px',
                                padding: '0.75rem 1.5rem',
                                fontSize: '0.875rem',
                                fontWeight: '600',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}
                            onMouseEnter={e => {
                                e.target.style.transform = 'translateY(-1px)';
                                e.target.style.boxShadow = '0 6px 16px rgba(245, 158, 11, 0.4)';
                            }}
                            onMouseLeave={e => {
                                e.target.style.transform = 'translateY(0)';
                                e.target.style.boxShadow = '0 4px 12px rgba(245, 158, 11, 0.3)';
                            }}
                        >
                            <span style={{ fontSize: '1rem' }}>⏸️</span>
                            Deactivate Account
                        </button>
                    </div>
                </div>

                {/* Privacy & Security Info */}
                <div style={{
                    background: '#f1f5f9',
                    borderRadius: '16px',
                    padding: '2rem',
                    border: '1px solid #cbd5e1'
                }}>
                    <h3 style={{
                        fontSize: '1.25rem',
                        fontWeight: '600',
                        color: '#334155',
                        marginBottom: '1rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                    }}>
                        <span style={{ fontSize: '1.125rem' }}>🔒</span>
                        Privacy & Security
                    </h3>
                    
                    <div style={{
                        background: 'white',
                        borderRadius: '12px',
                        padding: '1.5rem',
                        border: '1px solid #cbd5e1'
                    }}>
                        <div style={{
                            fontSize: '0.875rem',
                            color: '#374151',
                            lineHeight: '1.6'
                        }}>
                            <p style={{ margin: '0 0 1rem' }}>
                                <strong>Data Protection:</strong> Your personal and medical information is encrypted and stored securely according to healthcare privacy standards.
                            </p>
                        <p style={{ margin: '0 0 1rem' }}>
                            <strong>Self-Deactivation Recovery:</strong> If you deactivate your account yourself, all your data remains safe and will be restored when you log in again.
                        </p>
                        <p style={{ margin: '0 0 1rem' }}>
                            <strong>Admin Deactivation:</strong> If an administrator deactivates your account, only they can reactivate it. Contact support for assistance.
                        </p>
                            <p style={{ margin: 0 }}>
                                <strong>Permanent Deletion:</strong> If you need to permanently delete your account, please contact our support team.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <SelfDeactivateModal 
                isOpen={showDeactivateModal}
                onClose={() => setShowDeactivateModal(false)}
            />
        </div>
    );
};

export default AccountSettings;
