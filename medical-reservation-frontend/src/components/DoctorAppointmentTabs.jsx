import React from 'react';
import { useTranslation } from 'react-i18next';
import { getViews } from '../utils/doctorAppointmentUtils';

const getViewIcon = (iconId, isSelected) => {
    const color = isSelected ? 'white' : '#22c55e';
    
    switch (iconId) {
        case 'calendar':
            return (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
            );
        case 'clock':
            return (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                </svg>
            );
        case 'hourglass':
            return (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 22h14"/>
                    <path d="M5 2h14"/>
                    <path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22"/>
                    <path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2"/>
                </svg>
            );
        case 'check':
            return (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
            );
        default:
            return (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
            );
    }
};

const DoctorAppointmentTabs = ({ selectedView, onViewChange }) => {
    const { t } = useTranslation();
    const views = getViews();
    return (
        <section style={{
            background: 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(20px)',
            borderRadius: '24px',
            padding: '2rem',
            marginBottom: '2rem',
            boxShadow: '0 20px 40px rgba(34, 197, 94, 0.12), 0 16px 32px rgba(0, 0, 0, 0.06)',
            border: '1px solid rgba(34, 197, 94, 0.15)'
        }}>
            <div style={{
                display: 'flex',
                gap: '1rem',
                justifyContent: 'center',
                flexWrap: 'wrap'
            }}>
                {views.map(view => (
                    <button
                        key={view.id}
                        onClick={() => onViewChange(view.id)}
                        style={{
                            padding: '1rem 2rem',
                            background: selectedView === view.id 
                                ? `linear-gradient(135deg, ${view.color} 0%, ${view.color}CC 100%)`
                                : 'rgba(255, 255, 255, 0.8)',
                            color: selectedView === view.id ? 'white' : '#374151',
                            border: selectedView === view.id 
                                ? 'none' 
                                : '2px solid rgba(34, 197, 94, 0.2)',
                            borderRadius: '16px',
                            cursor: 'pointer',
                            fontWeight: '600',
                            fontSize: '1rem',
                            transition: 'all 0.3s ease',
                            boxShadow: selectedView === view.id 
                                ? `0 8px 25px ${view.color}40`
                                : '0 4px 12px rgba(34, 197, 94, 0.1)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            minWidth: '160px',
                            justifyContent: 'center'
                        }}
                        onMouseEnter={e => {
                            if (selectedView !== view.id) {
                                e.target.style.background = `${view.color}15`;
                                e.target.style.borderColor = `${view.color}40`;
                                e.target.style.transform = 'translateY(-2px)';
                            }
                        }}
                        onMouseLeave={e => {
                            if (selectedView !== view.id) {
                                e.target.style.background = 'rgba(255, 255, 255, 0.8)';
                                e.target.style.borderColor = 'rgba(34, 197, 94, 0.2)';
                                e.target.style.transform = 'translateY(0)';
                            }
                        }}
                    >
                        {getViewIcon(view.icon, selectedView === view.id)}
                        <span>{view.name}</span>
                    </button>
                ))}
            </div>
        </section>
    );
};

export default DoctorAppointmentTabs;
