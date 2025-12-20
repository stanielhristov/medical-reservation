import React from 'react';
import { useTranslation } from 'react-i18next';

const AdminWelcomeSection = () => {
    const { t } = useTranslation();
    
    return (
        <section style={{
            background: 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(20px)',
            borderRadius: '32px',
            padding: '4rem 3rem',
            marginBottom: '3rem',
            boxShadow: '0 32px 64px rgba(34, 197, 94, 0.12), 0 16px 32px rgba(0, 0, 0, 0.06)',
            border: '1px solid rgba(34, 197, 94, 0.15)',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden'
        }}>
            <div style={{
                position: 'absolute',
                top: '-50%',
                right: '-20%',
                width: '400px',
                height: '400px',
                background: 'radial-gradient(circle, rgba(34, 197, 94, 0.05) 0%, transparent 70%)',
                borderRadius: '50%',
                zIndex: 0
            }} />
            
            <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{
                    width: '120px',
                    height: '120px',
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    borderRadius: '24px',
                    margin: '0 auto 2.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 16px 40px rgba(16, 185, 129, 0.3)',
                    border: '3px solid #047857',
                    position: 'relative'
                }}>
                    <div style={{
                        width: '60px',
                        height: '60px',
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <div style={{
                            position: 'absolute',
                            top: '15px',
                            left: '10px',
                            width: '40px',
                            height: '30px',
                            background: 'white',
                            borderRadius: '8px 8px 0 0',
                            boxShadow: '0 3px 12px rgba(0,0,0,0.15)'
                        }}>
                            <div style={{
                                position: 'absolute',
                                top: '-8px',
                                left: '8px',
                                width: '8px',
                                height: '12px',
                                background: 'white',
                                borderRadius: '4px 4px 0 0'
                            }} />
                            <div style={{
                                position: 'absolute',
                                top: '-12px',
                                left: '16px',
                                width: '8px',
                                height: '16px',
                                background: 'white',
                                borderRadius: '4px 4px 0 0'
                            }} />
                            <div style={{
                                position: 'absolute',
                                top: '-8px',
                                right: '8px',
                                width: '8px',
                                height: '12px',
                                background: 'white',
                                borderRadius: '4px 4px 0 0'
                            }} />
                            <div style={{
                                position: 'absolute',
                                bottom: '6px',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                width: '20px',
                                height: '8px',
                                background: '#10b981',
                                borderRadius: '50%'
                            }} />
                        </div>
                    </div>
                </div>
                
                <h1 style={{
                    fontSize: '3rem',
                    fontWeight: '900',
                    color: '#1f2937',
                    margin: '0 0 1rem',
                    letterSpacing: '-0.04em',
                    lineHeight: '1.1'
                }}>
                    {t('admin.adminCommandCenter')}
                </h1>
                
                <div style={{
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    color: 'white',
                    padding: '0.75rem 2rem',
                    borderRadius: '50px',
                    margin: '0 auto',
                    fontSize: '1.1rem',
                    fontWeight: '700',
                    boxShadow: '0 8px 25px rgba(16, 185, 129, 0.3)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.75rem'
                }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                    </svg>
                    {t('admin.administrativeAccess')}
                </div>
            </div>
        </section>
    );
};

export default AdminWelcomeSection;
