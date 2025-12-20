import React from 'react';
import { useTranslation } from 'react-i18next';
import { NOTIFICATION_CATEGORIES } from '../utils/notificationUtils.jsx';

const getIcon = (iconName, isSelected, color) => {
    const strokeColor = isSelected ? 'white' : color;
    
    switch (iconName) {
        case 'bell':
            return (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                    <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
                </svg>
            );
        case 'calendar':
            return (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
            );
        case 'clock':
            return (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                </svg>
            );
        case 'heart':
            return (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
            );
        case 'settings':
            return (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="3"/>
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
                </svg>
            );
        default:
            return (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                    <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
                </svg>
            );
    }
};

const NotificationStats = ({ notifications, selectedCategory, onCategorySelect }) => {
    const { t } = useTranslation();
    return (
        <section style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.5rem',
            marginBottom: '3rem'
        }}>
            {NOTIFICATION_CATEGORIES.slice(1).map(category => {
                const count = notifications.filter(notification => notification.category === category.id).length;
                const unreadCount = notifications.filter(notification => 
                    notification.category === category.id && !notification.isRead
                ).length;
                
                return (
                    <div 
                        key={category.id} 
                        onClick={() => onCategorySelect(category.id)}
                        style={{
                            background: 'rgba(255, 255, 255, 0.98)',
                            backdropFilter: 'blur(20px)',
                            borderRadius: '20px',
                            padding: '2rem',
                            boxShadow: selectedCategory === category.id 
                                ? `0 20px 40px ${category.color}30, 0 8px 32px rgba(0, 0, 0, 0.08)`
                                : '0 16px 32px rgba(0, 0, 0, 0.06)',
                            border: selectedCategory === category.id 
                                ? `2px solid ${category.color}40`
                                : '1px solid rgba(0, 0, 0, 0.08)',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            transform: selectedCategory === category.id ? 'translateY(-2px)' : 'none'
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
                                background: selectedCategory === category.id 
                                    ? `linear-gradient(135deg, ${category.color} 0%, ${category.color}dd 100%)`
                                    : `${category.color}20`,
                                borderRadius: '12px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                {getIcon(category.icon, selectedCategory === category.id, category.color)}
                            </div>
                            <div>
                                <h3 style={{
                                    fontSize: '1.1rem',
                                    fontWeight: '700',
                                    color: selectedCategory === category.id ? category.color : '#374151',
                                    margin: 0
                                }}>
                                    {t(`notifications.category.${category.id}`)}
                                </h3>
                                <p style={{
                                    fontSize: '0.9rem',
                                    color: '#6b7280',
                                    margin: 0
                                }}>
                                    {count} {t('notifications.total')}
                                </p>
                            </div>
                        </div>
                        
                        {unreadCount > 0 && (
                            <div style={{
                                background: 'rgba(239, 68, 68, 0.1)',
                                color: '#dc2626',
                                padding: '0.5rem 1rem',
                                borderRadius: '8px',
                                fontSize: '0.85rem',
                                fontWeight: '600',
                                textAlign: 'center'
                            }}>
                                {unreadCount} {t('notifications.unread')}
                            </div>
                        )}
                    </div>
                );
            })}
        </section>
    );
};

export default NotificationStats;
