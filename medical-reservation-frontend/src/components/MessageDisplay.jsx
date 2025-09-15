import React from 'react';

const MessageDisplay = ({ message }) => {
    if (!message.text) return null;

    return (
        <div style={{
            background: message.type === 'success' 
                ? 'rgba(34, 197, 94, 0.1)' 
                : 'rgba(239, 68, 68, 0.1)',
            color: message.type === 'success' ? '#16a34a' : '#dc2626',
            padding: '1rem 1.5rem',
            borderRadius: '12px',
            marginBottom: '2rem',
            border: `1px solid ${message.type === 'success' 
                ? 'rgba(34, 197, 94, 0.2)' 
                : 'rgba(239, 68, 68, 0.2)'}`,
            fontSize: '0.95rem',
            fontWeight: '500',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            transition: 'opacity 0.5s ease-out, transform 0.5s ease-out',
            animation: message.fadeOut ? 'fadeOut 0.5s ease-out forwards' : 'slideInDown 0.3s ease-out',
            opacity: message.fadeOut ? 0 : 1,
            transform: message.fadeOut ? 'translateY(-10px)' : 'translateY(0)'
        }}>
            <span style={{ fontSize: '1.1rem' }}>
                {message.type === 'success' ? '✅' : '⚠️'}
            </span>
            {message.text}
        </div>
    );
};

export default MessageDisplay;
