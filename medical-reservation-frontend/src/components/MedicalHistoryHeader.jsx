import React from 'react';
import { useTranslation } from 'react-i18next';

const MedicalHistoryHeader = () => {
    const { t } = useTranslation();
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
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14,2 14,8 20,8"/>
                    <line x1="16" y1="13" x2="8" y2="13"/>
                    <line x1="16" y1="17" x2="8" y2="17"/>
                    <polyline points="10,9 9,9 8,9"/>
                </svg>
            </div>
            
            <h1 style={{
                fontSize: '2.5rem',
                fontWeight: '800',
                color: '#374151',
                margin: '0 0 0.5rem',
                letterSpacing: '-0.02em'
            }}>
                {t('patient.medicalHistoryHeader')}
            </h1>
            
            <p style={{
                fontSize: '1.2rem',
                color: '#6b7280',
                margin: 0,
                fontWeight: '500'
            }}>
                {t('patient.medicalHistoryDescription')}
            </p>
        </section>
    );
};

export default MedicalHistoryHeader;
