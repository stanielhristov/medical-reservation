import React from 'react';
import { APPOINTMENT_TABS } from '../utils/appointmentUtils';

const AppointmentTabs = ({ selectedTab, onTabSelect, appointments }) => {
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
                                justifyContent: 'center',
                                fontSize: '1.5rem'
                            }}>
                                {tab.icon}
                            </div>
                            <div>
                                <h3 style={{
                                    fontSize: '1.1rem',
                                    fontWeight: '700',
                                    color: selectedTab === tab.id ? tab.color : '#374151',
                                    margin: 0
                                }}>
                                    {tab.name}
                                </h3>
                                <p style={{
                                    fontSize: '0.9rem',
                                    color: '#6b7280',
                                    margin: 0
                                }}>
                                    {count} appointments
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
