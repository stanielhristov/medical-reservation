import React from 'react';
import { useTranslation } from 'react-i18next';
import { NOTIFICATION_CATEGORIES } from '../utils/notificationUtils';

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
                        <span>{category.icon}</span>
                        {t(`notifications.category.${category.id}`)}
                    </button>
                ))}
            </div>
        </section>
    );
};

export default NotificationFilters;
