import React from 'react';
import { useTranslation } from 'react-i18next';

const ProfileHeader = () => {
    const { t } = useTranslation();
    return (
        <div style={{
            background: 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(20px)',
            borderRadius: '24px',
            padding: '2.5rem',
            marginBottom: '2rem',
            boxShadow: '0 20px 40px rgba(34, 197, 94, 0.1)',
            border: '1px solid rgba(34, 197, 94, 0.15)',
            textAlign: 'center'
        }}>
            <div style={{
                width: '80px',
                height: '80px',
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                borderRadius: '20px',
                margin: '0 auto 1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 12px 32px rgba(16, 185, 129, 0.3)',
                border: '2px solid #047857',
                position: 'relative'
            }}>
                <div style={{
                    width: '40px',
                    height: '40px',
                    position: 'relative'
                }}>
                    <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        width: '32px',
                        height: '32px',
                        transform: 'translate(-50%, -50%)',
                        border: '4px solid white',
                        borderRadius: '50%'
                    }} />
                    <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        width: '16px',
                        height: '16px',
                        transform: 'translate(-50%, -50%)',
                        background: 'white',
                        borderRadius: '50%'
                    }} />
                    <div style={{
                        position: 'absolute',
                        top: '2px',
                        left: '50%',
                        width: '4px',
                        height: '8px',
                        background: 'white',
                        transform: 'translateX(-50%)',
                        borderRadius: '2px'
                    }} />
                    <div style={{
                        position: 'absolute',
                        bottom: '2px',
                        left: '50%',
                        width: '4px',
                        height: '8px',
                        background: 'white',
                        transform: 'translateX(-50%)',
                        borderRadius: '2px'
                    }} />
                    <div style={{
                        position: 'absolute',
                        left: '2px',
                        top: '50%',
                        width: '8px',
                        height: '4px',
                        background: 'white',
                        transform: 'translateY(-50%)',
                        borderRadius: '2px'
                    }} />
                    <div style={{
                        position: 'absolute',
                        right: '2px',
                        top: '50%',
                        width: '8px',
                        height: '4px',
                        background: 'white',
                        transform: 'translateY(-50%)',
                        borderRadius: '2px'
                    }} />
                </div>
            </div>
            <h1 style={{
                fontSize: '2.5rem',
                fontWeight: '800',
                color: '#065f46',
                margin: '0 0 0.5rem 0',
                letterSpacing: '-0.025em'
            }}>
                {t('profile.editProfile')}
            </h1>
            <p style={{
                fontSize: '1.1rem',
                color: '#6b7280',
                margin: '0',
                fontWeight: '500'
            }}>
                {t('profile.updateAccountInfo')}
            </p>
        </div>
    );
};

export default ProfileHeader;
