import React from 'react';

const MessageDisplay = ({ message, type, onClose }) => {
    // Handle both old and new prop structures
    const messageText = typeof message === 'string' ? message : message?.text;
    const messageType = type || message?.type;

    if (!messageText) return null;

    return (
        <div style={{
            position: 'fixed',
            top: '2rem',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 1001,
            background: messageType === 'success' 
                ? 'rgba(34, 197, 94, 0.95)' 
                : 'rgba(239, 68, 68, 0.95)',
            color: 'white',
            padding: '1rem 1.5rem',
            borderRadius: '12px',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
            backdropFilter: 'blur(10px)',
            fontSize: '0.95rem',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            maxWidth: '500px',
            width: 'calc(100% - 4rem)',
            animation: 'slideInDown 0.3s ease-out'
        }}>
            <span style={{ fontSize: '1.1rem' }}>
                {messageType === 'success' ? '✅' : '⚠️'}
            </span>
            <span style={{ flex: 1 }}>{messageText}</span>
            {onClose && (
                <button
                    onClick={onClose}
                    style={{
                        background: 'none',
                        border: 'none',
                        color: 'white',
                        fontSize: '1.2rem',
                        cursor: 'pointer',
                        padding: '0.25rem',
                        borderRadius: '4px',
                        opacity: 0.8,
                        transition: 'opacity 0.2s ease'
                    }}
                    onMouseEnter={e => e.target.style.opacity = '1'}
                    onMouseLeave={e => e.target.style.opacity = '0.8'}
                >
                    ✕
                </button>
            )}
            
            <style>
                {`
                    @keyframes slideInDown {
                        from {
                            transform: translateX(-50%) translateY(-100%);
                            opacity: 0;
                        }
                        to {
                            transform: translateX(-50%) translateY(0);
                            opacity: 1;
                        }
                    }
                `}
            </style>
        </div>
    );
};

export default MessageDisplay;
