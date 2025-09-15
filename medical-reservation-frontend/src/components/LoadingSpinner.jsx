import React from 'react';

const LoadingSpinner = ({ message = "Loading..." }) => {
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
                <p style={{ color: '#6b7280', margin: 0, fontSize: '1rem', fontWeight: '500' }}>
                    {message}
                </p>
            </div>
        </div>
    );
};

export default LoadingSpinner;
