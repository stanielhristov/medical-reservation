import React from 'react';
import { useTranslation } from 'react-i18next';
import { NOTIFICATION_CATEGORIES } from '../utils/notificationUtils';

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
                                justifyContent: 'center',
                                fontSize: '1.5rem'
                            }}>
                                {category.icon}
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
