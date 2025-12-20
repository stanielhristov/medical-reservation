import React from 'react';
import { useTranslation } from 'react-i18next';
import { NOTIFICATION_CATEGORIES } from '../utils/notificationUtils.jsx';

const getIcon = (iconName, isSelected, color) => {
    const strokeColor = isSelected ? 'white' : color;
    
    switch (iconName) {
        case 'bell':
            return (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                    <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
                </svg>
            );
        case 'calendar':
            return (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
            );
        case 'clock':
            return (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                </svg>
            );
        case 'heart':
            return (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
            );
        case 'settings':
            return (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="3"/>
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
                </svg>
            );
        default:
            return (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                    <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
                </svg>
            );
    }
};

const NotificationFilters = ({ 
    selectedCategory, 
    onCategorySelect, 
    notifications, 
    onMarkAllAsRead 
}) => {
    const { t } = useTranslation();
    const unreadCount = notifications.filter(n => !n.isRead).length;

    return (
        <section style={{
            background: 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(20px)',
            borderRadius: '24px',
            padding: '2rem',
            marginBottom: '2rem',
            boxShadow: '0 16px 32px rgba(0, 0, 0, 0.06)',
            border: '1px solid rgba(0, 0, 0, 0.08)'
        }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1.5rem'
            }}>
                <h2 style={{
                    fontSize: '1.5rem',
                    fontWeight: '700',
                    color: '#374151',
                    margin: 0
                }}>
                    {t('notifications.filterNotifications')}
                </h2>
                
                <div style={{ display: 'flex', gap: '1rem' }}>
                    {unreadCount > 0 && (
                        <button
                            onClick={onMarkAllAsRead}
                            style={{
                                background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '12px',
                                padding: '0.75rem 1.5rem',
                                fontSize: '0.9rem',
                                fontWeight: '600',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                boxShadow: '0 4px 12px rgba(34, 197, 94, 0.3)'
                            }}
                        >
                            {t('notifications.markAllRead')} ({unreadCount})
                        </button>
                    )}
                </div>
            </div>
            
            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1rem'
            }}>
                {NOTIFICATION_CATEGORIES.map(category => (
                    <button
                        key={category.id}
                        onClick={() => onCategorySelect(category.id)}
                        style={{
                            background: selectedCategory === category.id 
                                ? `linear-gradient(135deg, ${category.color} 0%, ${category.color}dd 100%)`
                                : 'rgba(255, 255, 255, 0.8)',
                            color: selectedCategory === category.id ? 'white' : '#374151',
                            border: selectedCategory === category.id 
                                ? 'none'
                                : `1px solid ${category.color}40`,
                            borderRadius: '16px',
                            padding: '1rem 1.5rem',
                            fontSize: '0.9rem',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            boxShadow: selectedCategory === category.id 
                                ? `0 8px 20px ${category.color}30`
                                : 'none'
                        }}
                    >
                        {getIcon(category.icon, selectedCategory === category.id, category.color)}
                        {t(`notifications.category.${category.id}`)}
                    </button>
                ))}
            </div>
        </section>
    );
};

export default NotificationFilters;
