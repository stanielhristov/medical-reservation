import React from 'react';
import { useTranslation } from 'react-i18next';

const HeroSection = ({ onLogin, onRegister }) => {
    const { t } = useTranslation();
    
    return (
        <section style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '4rem 2rem',
            position: 'relative',
            zIndex: 1,
            textAlign: 'center'
        }}>
            <div style={{
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(20px)',
                borderRadius: '32px',
                padding: '4rem 3rem',
                boxShadow: '0 32px 64px rgba(34, 197, 94, 0.1), 0 16px 48px rgba(0, 0, 0, 0.05)',
                border: '1px solid rgba(34, 197, 94, 0.1)',
                marginBottom: '4rem'
            }}>
                <div style={{
                    width: '120px',
                    height: '120px',
                    background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                    borderRadius: '30px',
                    margin: '0 auto 3rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 20px 40px rgba(34, 197, 94, 0.3)'
                }}>
                    <span style={{ fontSize: '4rem', color: 'white' }}>🏥</span>
                </div>
                
                <h1 style={{
                    fontSize: '3.5rem',
                    fontWeight: '800',
                    color: '#374151',
                    margin: '0 0 1.5rem',
                    letterSpacing: '-0.03em',
                    lineHeight: '1.1'
                }}>
                    {t('landing.heroTitle')}
                </h1>
                
                <p style={{
                    fontSize: '1.3rem',
                    color: '#6b7280',
                    margin: '0 0 3rem',
                    maxWidth: '700px',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    lineHeight: '1.6',
                    fontWeight: '400'
                }}>
                    {t('landing.heroSubtitle')}
                </p>
                
                <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <button 
                        onClick={onRegister}
                        style={{
                            padding: '1.2rem 2.5rem',
                            background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '16px',
                            cursor: 'pointer',
                            fontWeight: '700',
                            fontSize: '1.1rem',
                            transition: 'all 0.3s ease',
                            boxShadow: '0 8px 25px rgba(34, 197, 94, 0.3)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem'
                        }}
                        onMouseEnter={e => {
                            e.target.style.transform = 'translateY(-3px)';
                            e.target.style.boxShadow = '0 12px 35px rgba(34, 197, 94, 0.4)';
                        }}
                        onMouseLeave={e => {
                            e.target.style.transform = 'translateY(0)';
                            e.target.style.boxShadow = '0 8px 25px rgba(34, 197, 94, 0.3)';
                        }}
                    >
                        <span>🚀</span>
                        {t('landing.heroCTA')}
                    </button>
                    <button 
                        onClick={onLogin}
                        style={{
                            padding: '1.2rem 2.5rem',
                            background: 'rgba(255, 255, 255, 0.9)',
                            color: '#374151',
                            border: '2px solid rgba(34, 197, 94, 0.2)',
                            borderRadius: '16px',
                            cursor: 'pointer',
                            fontWeight: '700',
                            fontSize: '1.1rem',
                            transition: 'all 0.3s ease',
                            backdropFilter: 'blur(10px)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem'
                        }}
                        onMouseEnter={e => {
                            e.target.style.transform = 'translateY(-3px)';
                            e.target.style.background = 'rgba(255, 255, 255, 1)';
                            e.target.style.boxShadow = '0 12px 35px rgba(34, 197, 94, 0.15)';
                        }}
                        onMouseLeave={e => {
                            e.target.style.transform = 'translateY(0)';
                            e.target.style.background = 'rgba(255, 255, 255, 0.9)';
                            e.target.style.boxShadow = 'none';
                        }}
                    >
                        <span>👤</span>
                        {t('landing.haveAccount')}
                    </button>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
