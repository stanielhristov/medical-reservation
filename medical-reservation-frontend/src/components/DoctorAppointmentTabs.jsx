import React from 'react';
import { useTranslation } from 'react-i18next';
import { getViews } from '../utils/doctorAppointmentUtils';

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
            boxShadow: '0 20px 40px rgba(59, 130, 246, 0.12), 0 16px 32px rgba(0, 0, 0, 0.06)',
            border: '1px solid rgba(59, 130, 246, 0.15)'
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
                                : '2px solid rgba(59, 130, 246, 0.2)',
                            borderRadius: '16px',
                            cursor: 'pointer',
                            fontWeight: '600',
                            fontSize: '1rem',
                            transition: 'all 0.3s ease',
                            boxShadow: selectedView === view.id 
                                ? `0 8px 25px ${view.color}40`
                                : '0 4px 12px rgba(59, 130, 246, 0.1)',
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
                                e.target.style.borderColor = 'rgba(59, 130, 246, 0.2)';
                                e.target.style.transform = 'translateY(0)';
                            }
                        }}
                    >
                        <span style={{ fontSize: '1.2rem' }}>{view.icon}</span>
                        <span>{view.name}</span>
                    </button>
                ))}
            </div>
        </section>
    );
};

export default DoctorAppointmentTabs;
