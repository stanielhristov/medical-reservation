import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';

const ConfirmationPopup = ({ isOpen, onClose, title, message, type = 'success', autoClose = true }) => {
    const { t } = useTranslation();
    useEffect(() => {
        if (isOpen && autoClose && type === 'success') {
            const timer = setTimeout(() => {
                onClose();
            }, 3000); // Auto close success messages after 3 seconds

            return () => clearTimeout(timer);
        }
    }, [isOpen, autoClose, type, onClose]);

    if (!isOpen) return null;

    const getIcon = () => {
        switch (type) {
            case 'success':
                return '✅';
            case 'error':
                return '❌';
            case 'warning':
                return '⚠️';
            case 'info':
                return 'ℹ️';
            default:
                return '✅';
        }
    };

    const getBackgroundColor = () => {
        switch (type) {
            case 'success':
                return 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
            case 'error':
                return 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)';
            case 'warning':
                return 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)';
            case 'info':
                return 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)';
            default:
                return 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
        }
    };

    const getBorderColor = () => {
        switch (type) {
            case 'success':
                return '#10b981';
            case 'error':
                return '#ef4444';
            case 'warning':
                return '#f59e0b';
            case 'info':
                return '#3b82f6';
            default:
                return '#10b981';
        }
    };

    const content = (
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
            zIndex: 10000,
            animation: 'fadeIn 0.3s ease-out'
        }}>
            <div style={{
                background: 'white',
                borderRadius: '20px',
                padding: '2rem',
                maxWidth: '400px',
                width: '90%',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
                transform: 'scale(1)',
                animation: 'slideUp 0.3s ease-out',
                border: `3px solid ${getBorderColor()}`
            }}>
                {/* Header with icon and close button */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '1.5rem'
                }}>
                    <div style={{
                        fontSize: '3rem',
                        marginRight: '1rem'
                    }}>
                        {getIcon()}
                    </div>
                    <button
                        onClick={onClose}
                        style={{
                            background: 'none',
                            border: 'none',
                            fontSize: '1.5rem',
                            cursor: 'pointer',
                            color: '#666',
                            padding: '0.25rem',
                            borderRadius: '50%',
                            width: '35px',
                            height: '35px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                        onMouseEnter={e => {
                            e.target.style.backgroundColor = '#f3f4f6';
                        }}
                        onMouseLeave={e => {
                            e.target.style.backgroundColor = 'transparent';
                        }}
                    >
                        ✕
                    </button>
                </div>

                {/* Content */}
                <div style={{ textAlign: 'center' }}>
                    <h3 style={{
                        margin: '0 0 1rem 0',
                        color: '#1f2937',
                        fontSize: '1.5rem',
                        fontWeight: '600'
                    }}>
                        {title}
                    </h3>
                    
                    <p style={{
                        margin: '0 0 2rem 0',
                        color: '#6b7280',
                        fontSize: '1rem',
                        lineHeight: '1.5'
                    }}>
                        {message}
                    </p>
                    
                    <button
                        onClick={onClose}
                        style={{
                            background: getBackgroundColor(),
                            border: 'none',
                            borderRadius: '12px',
                            padding: '0.75rem 2rem',
                            color: 'white',
                            fontSize: '1rem',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            boxShadow: `0 4px 12px ${getBorderColor()}30`
                        }}
                        onMouseEnter={e => {
                            e.target.style.transform = 'translateY(-2px)';
                            e.target.style.boxShadow = `0 6px 20px ${getBorderColor()}40`;
                        }}
                        onMouseLeave={e => {
                            e.target.style.transform = 'translateY(0)';
                            e.target.style.boxShadow = `0 4px 12px ${getBorderColor()}30`;
                        }}
                    >
                        {type === 'success' && autoClose ? t('common.awesome') : t('common.gotIt')}
                    </button>
                    
                    {type === 'success' && autoClose && (
                        <div style={{
                            width: '100%',
                            height: '3px',
                            backgroundColor: '#e5e7eb',
                            borderRadius: '2px',
                            marginTop: '1rem',
                            overflow: 'hidden'
                        }}>
                            <div style={{
                                width: '100%',
                                height: '100%',
                                backgroundColor: getBorderColor(),
                                borderRadius: '2px',
                                animation: 'shrink 3s linear forwards'
                            }} />
                        </div>
                    )}
                </div>
            </div>

            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                
                @keyframes slideUp {
                    from { 
                        opacity: 0;
                        transform: translateY(30px) scale(0.95);
                    }
                    to { 
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }
                
                @keyframes shrink {
                    from { width: 100%; }
                    to { width: 0%; }
                }
            `}</style>
        </div>
    );

    return createPortal(content, document.body);
};

export default ConfirmationPopup;
