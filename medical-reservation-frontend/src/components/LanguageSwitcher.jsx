import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
    const { i18n } = useTranslation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        localStorage.setItem('i18nextLng', lng);
    };

    const currentLanguage = i18n.language || 'en';

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'rgba(34, 197, 94, 0.05)',
            padding: '0.5rem',
            borderRadius: '8px',
            border: '1px solid rgba(34, 197, 94, 0.15)'
        }}>
            <button
                onClick={() => changeLanguage('en')}
                style={{
                    padding: '0.5rem 0.75rem',
                    background: currentLanguage === 'en' 
                        ? 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)' 
                        : 'transparent',
                    color: currentLanguage === 'en' ? 'white' : '#374151',
                    border: currentLanguage === 'en' 
                        ? 'none' 
                        : '1px solid rgba(34, 197, 94, 0.2)',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                    fontWeight: '500',
                    transition: 'all 0.3s ease',
                    minWidth: '50px'
                }}
                onMouseEnter={e => {
                    if (currentLanguage !== 'en') {
                        e.target.style.background = 'rgba(34, 197, 94, 0.1)';
                    }
                }}
                onMouseLeave={e => {
                    if (currentLanguage !== 'en') {
                        e.target.style.background = 'transparent';
                    }
                }}
            >
                EN
            </button>
            <button
                onClick={() => changeLanguage('bg')}
                style={{
                    padding: '0.5rem 0.75rem',
                    background: currentLanguage === 'bg' 
                        ? 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)' 
                        : 'transparent',
                    color: currentLanguage === 'bg' ? 'white' : '#374151',
                    border: currentLanguage === 'bg' 
                        ? 'none' 
                        : '1px solid rgba(34, 197, 94, 0.2)',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                    fontWeight: '500',
                    transition: 'all 0.3s ease',
                    minWidth: '50px'
                }}
                onMouseEnter={e => {
                    if (currentLanguage !== 'bg') {
                        e.target.style.background = 'rgba(34, 197, 94, 0.1)';
                    }
                }}
                onMouseLeave={e => {
                    if (currentLanguage !== 'bg') {
                        e.target.style.background = 'transparent';
                    }
                }}
            >
                BG
            </button>
        </div>
    );
};

export default LanguageSwitcher;

