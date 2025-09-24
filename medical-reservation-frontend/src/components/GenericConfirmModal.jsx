import React from 'react';

const GenericConfirmModal = ({ 
    isOpen, 
    onClose, 
    onConfirm, 
    title = 'Confirm Action',
    message = 'Are you sure you want to perform this action?',
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    confirmButtonStyle = {},
    loading = false,
    icon = '❓'
}) => {
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
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
            padding: '1rem'
        }}>
            <div style={{
                background: 'white',
                borderRadius: '20px',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
                maxWidth: '500px',
                width: '100%',
                position: 'relative'
            }}>
                <div style={{ padding: '2rem' }}>
                    <button
                        onClick={onClose}
                        disabled={loading}
                        style={{
                            position: 'absolute',
                            top: '1rem',
                            right: '1rem',
                            background: 'none',
                            border: 'none',
                            fontSize: '1.5rem',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            color: '#6b7280',
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'background 0.2s ease',
                            opacity: loading ? 0.5 : 1
                        }}
                        onMouseEnter={e => {
                            if (!loading) {
                                e.target.style.background = 'rgba(107, 114, 128, 0.1)';
                            }
                        }}
                        onMouseLeave={e => {
                            if (!loading) {
                                e.target.style.background = 'none';
                            }
                        }}
                    >
                        ✕
                    </button>

                    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                        <div style={{
                            width: '80px',
                            height: '80px',
                            background: confirmButtonStyle.backgroundColor || 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
                            borderRadius: '16px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '2rem',
                            margin: '0 auto 1rem',
                            color: 'white'
                        }}>
                            {icon}
                        </div>
                        <h3 style={{
                            fontSize: '1.5rem',
                            fontWeight: '700',
                            color: '#374151',
                            margin: '0 0 0.5rem'
                        }}>
                            {title}
                        </h3>
                        <p style={{ 
                            color: '#6b7280', 
                            margin: 0,
                            lineHeight: '1.5'
                        }}>
                            {message}
                        </p>
                    </div>

                    <div style={{ 
                        display: 'flex', 
                        gap: '1rem',
                        justifyContent: 'flex-end'
                    }}>
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={loading}
                            style={{
                                padding: '0.75rem 1.5rem',
                                background: 'rgba(107, 114, 128, 0.1)',
                                color: '#6b7280',
                                border: '1px solid rgba(107, 114, 128, 0.2)',
                                borderRadius: '8px',
                                cursor: loading ? 'not-allowed' : 'pointer',
                                fontWeight: '500',
                                fontSize: '1rem',
                                transition: 'all 0.2s ease',
                                opacity: loading ? 0.5 : 1
                            }}
                            onMouseEnter={e => {
                                if (!loading) {
                                    e.target.style.background = 'rgba(107, 114, 128, 0.15)';
                                }
                            }}
                            onMouseLeave={e => {
                                if (!loading) {
                                    e.target.style.background = 'rgba(107, 114, 128, 0.1)';
                                }
                            }}
                        >
                            {cancelText}
                        </button>
                        
                        <button
                            type="button"
                            onClick={onConfirm}
                            disabled={loading}
                            style={{
                                padding: '0.75rem 1.5rem',
                                background: loading 
                                    ? 'rgba(107, 114, 128, 0.3)'
                                    : (confirmButtonStyle.backgroundColor || '#dc3545'),
                                color: 'white',
                                border: 'none',
                                borderRadius: '8px',
                                cursor: loading ? 'not-allowed' : 'pointer',
                                fontWeight: '600',
                                fontSize: '1rem',
                                transition: 'all 0.2s ease',
                                boxShadow: loading 
                                    ? 'none'
                                    : `0 4px 12px ${confirmButtonStyle.backgroundColor || '#dc3545'}30`,
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                ...confirmButtonStyle
                            }}
                            onMouseEnter={e => {
                                if (!loading) {
                                    e.target.style.transform = 'translateY(-1px)';
                                    e.target.style.boxShadow = `0 6px 16px ${confirmButtonStyle.backgroundColor || '#dc3545'}40`;
                                }
                            }}
                            onMouseLeave={e => {
                                if (!loading) {
                                    e.target.style.transform = 'translateY(0)';
                                    e.target.style.boxShadow = `0 4px 12px ${confirmButtonStyle.backgroundColor || '#dc3545'}30`;
                                }
                            }}
                        >
                            {loading && (
                                <div style={{
                                    width: '16px',
                                    height: '16px',
                                    border: '2px solid rgba(255, 255, 255, 0.3)',
                                    borderTop: '2px solid white',
                                    borderRadius: '50%',
                                    animation: 'spin 1s linear infinite'
                                }} />
                            )}
                            {loading ? 'Processing...' : confirmText}
                        </button>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
};

export default GenericConfirmModal;
