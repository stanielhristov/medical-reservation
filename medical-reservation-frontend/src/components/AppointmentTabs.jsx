import React from 'react';
import { useTranslation } from 'react-i18next';
import { APPOINTMENT_TABS } from '../utils/appointmentUtils';

const CalendarIcon = ({ color }) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
        <line x1="16" y1="2" x2="16" y2="6"/>
        <line x1="8" y1="2" x2="8" y2="6"/>
        <line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
);

const ClipboardIcon = ({ color }) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
        <rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>
        <line x1="9" y1="12" x2="15" y2="12"/>
        <line x1="9" y1="16" x2="15" y2="16"/>
    </svg>
);

const CancelIcon = ({ color }) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <line x1="15" y1="9" x2="9" y2="15"/>
        <line x1="9" y1="9" x2="15" y2="15"/>
    </svg>
);

const getTabIcon = (tabId, color) => {
    switch (tabId) {
        case 'upcoming':
            return <CalendarIcon color={color} />;
        case 'past':
            return <ClipboardIcon color={color} />;
        case 'cancelled':
            return <CancelIcon color={color} />;
        default:
            return <CalendarIcon color={color} />;
    }
};

const AppointmentTabs = ({ selectedTab, onTabSelect, appointments }) => {
    const { t } = useTranslation();
    const getTabCount = (tabId) => {
        const now = new Date();
        switch (tabId) {
            case 'upcoming':
                return appointments.filter(apt => 
                    apt.date > now && apt.status !== 'cancelled'
                ).length;
            case 'past':
                return appointments.filter(apt => 
                    apt.date <= now && apt.status !== 'cancelled'
                ).length;
            case 'cancelled':
                return appointments.filter(apt => apt.status === 'cancelled').length;
            default:
                return 0;
        }
    };

    return (
        <section style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.5rem',
            marginBottom: '3rem'
        }}>
            {APPOINTMENT_TABS.map(tab => {
                const count = getTabCount(tab.id);
                
                return (
                    <div 
                        key={tab.id} 
                        onClick={() => onTabSelect(tab.id)}
                        style={{
                            background: 'rgba(255, 255, 255, 0.98)',
                            backdropFilter: 'blur(20px)',
                            borderRadius: '20px',
                            padding: '2rem',
                            boxShadow: selectedTab === tab.id 
                                ? `0 20px 40px ${tab.color}30, 0 8px 32px rgba(0, 0, 0, 0.08)`
                                : '0 16px 32px rgba(0, 0, 0, 0.06)',
                            border: selectedTab === tab.id 
                                ? `2px solid ${tab.color}40`
                                : '1px solid rgba(0, 0, 0, 0.08)',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            transform: selectedTab === tab.id ? 'translateY(-2px)' : 'none'
                        }}
                    >
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem',
                            marginBottom: '1rem'
                        }}>
                            <div style={{
                                width: '50px',
                                height: '50px',
                                background: selectedTab === tab.id 
                                    ? `linear-gradient(135deg, ${tab.color} 0%, ${tab.color}dd 100%)`
                                    : `${tab.color}20`,
                                borderRadius: '12px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                {getTabIcon(tab.id, selectedTab === tab.id ? 'white' : tab.color)}
                            </div>
                            <div>
                                <h3 style={{
                                    fontSize: '1.1rem',
                                    fontWeight: '700',
                                    color: selectedTab === tab.id ? tab.color : '#374151',
                                    margin: 0
                                }}>
                                    {t(`appointments.${tab.id}`)}
                                </h3>
                                <p style={{
                                    fontSize: '0.9rem',
                                    color: '#6b7280',
                                    margin: 0
                                }}>
                                    {count} {t('appointments.appointments')}
                                </p>
                            </div>
                        </div>
                        
                        <div style={{
                            background: selectedTab === tab.id 
                                ? `${tab.color}20`
                                : 'rgba(107, 114, 128, 0.1)',
                            color: selectedTab === tab.id ? tab.color : '#6b7280',
                            padding: '0.75rem 1rem',
                            borderRadius: '12px',
                            fontSize: '1.5rem',
                            fontWeight: '700',
                            textAlign: 'center'
                        }}>
                            {count}
                        </div>
                    </div>
                );
            })}
        </section>
    );
};

export default AppointmentTabs;
