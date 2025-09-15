import React from 'react';

const MedicalHistoryHeader = ({ onUploadClick }) => {
    return (
        <section style={{
            background: 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(20px)',
            borderRadius: '32px',
            padding: '3rem',
            marginBottom: '3rem',
            boxShadow: '0 32px 64px rgba(34, 197, 94, 0.12), 0 16px 32px rgba(0, 0, 0, 0.06)',
            border: '1px solid rgba(34, 197, 94, 0.15)',
            textAlign: 'center'
        }}>
            <div style={{
                width: '100px',
                height: '100px',
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                borderRadius: '25px',
                margin: '0 auto 2rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 20px 40px rgba(16, 185, 129, 0.3)'
            }}>
                <span style={{ fontSize: '3rem', color: 'white' }}>📋</span>
            </div>
            
            <h1 style={{
                fontSize: '2.5rem',
                fontWeight: '800',
                color: '#374151',
                margin: '0 0 0.5rem',
                letterSpacing: '-0.02em'
            }}>
                Medical History
            </h1>
            
            <p style={{
                fontSize: '1.2rem',
                color: '#6b7280',
                margin: '0 0 2.5rem',
                fontWeight: '500'
            }}>
                Access your complete medical records, test results, and health documentation
            </p>

            <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '1rem',
                flexWrap: 'wrap'
            }}>
                <button
                    onClick={onUploadClick}
                    style={{
                        padding: '0.8rem 1.5rem',
                        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '12px',
                        cursor: 'pointer',
                        fontSize: '1rem',
                        fontWeight: '600',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                    }}
                    onMouseEnter={e => {
                        e.target.style.transform = 'translateY(-2px)';
                        e.target.style.boxShadow = '0 6px 20px rgba(16, 185, 129, 0.4)';
                    }}
                    onMouseLeave={e => {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = '0 4px 12px rgba(16, 185, 129, 0.3)';
                    }}
                >
                    <span>📤</span>
                    Upload New Record
                </button>
                
                <button
                    style={{
                        padding: '0.8rem 1.5rem',
                        background: 'rgba(255, 255, 255, 0.9)',
                        color: '#374151',
                        border: '2px solid rgba(16, 185, 129, 0.2)',
                        borderRadius: '12px',
                        cursor: 'pointer',
                        fontSize: '1rem',
                        fontWeight: '600',
                        transition: 'all 0.3s ease',
                        backdropFilter: 'blur(10px)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                    }}
                    onMouseEnter={e => {
                        e.target.style.transform = 'translateY(-2px)';
                        e.target.style.background = 'rgba(255, 255, 255, 1)';
                        e.target.style.boxShadow = '0 6px 20px rgba(16, 185, 129, 0.15)';
                    }}
                    onMouseLeave={e => {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.background = 'rgba(255, 255, 255, 0.9)';
                        e.target.style.boxShadow = 'none';
                    }}
                >
                    <span>📊</span>
                    Export Records
                </button>
            </div>
        </section>
    );
};

export default MedicalHistoryHeader;
