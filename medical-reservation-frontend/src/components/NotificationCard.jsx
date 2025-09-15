import React from 'react';
import { getPriorityColor, getCategoryIcon, formatTimeAgo } from '../utils/notificationUtils';

const NotificationCard = ({ notification, onMarkAsRead, onDelete, onViewDetails }) => {
    const priorityStyle = getPriorityColor(notification.priority);

    return (
        <div style={{
            background: notification.isRead 
                ? 'rgba(255, 255, 255, 0.95)' 
                : 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(20px)',
            borderRadius: '20px',
            padding: '2rem',
            marginBottom: '1.5rem',
            boxShadow: notification.isRead 
                ? '0 8px 24px rgba(0, 0, 0, 0.06)'
                : '0 16px 32px rgba(0, 0, 0, 0.08), 0 4px 16px rgba(249, 115, 22, 0.15)',
            border: notification.isRead 
                ? '1px solid rgba(0, 0, 0, 0.06)'
                : '1px solid rgba(249, 115, 22, 0.2)',
            position: 'relative',
            transition: 'all 0.3s ease',
            cursor: 'pointer'
        }}
        onClick={() => onViewDetails(notification)}
        >
            {!notification.isRead && (
                <div style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    width: '12px',
                    height: '12px',
                    background: '#f97316',
                    borderRadius: '50%',
                    boxShadow: '0 0 0 3px rgba(249, 115, 22, 0.2)'
                }} />
            )}
            
            <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '1.5rem'
            }}>
                <div style={{
                    width: '60px',
                    height: '60px',
                    background: `linear-gradient(135deg, ${priorityStyle.color}20 0%, ${priorityStyle.color}10 100%)`,
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.8rem',
                    flexShrink: 0
                }}>
                    {getCategoryIcon(notification.category)}
                </div>
                
                <div style={{ flex: 1 }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        marginBottom: '0.5rem'
                    }}>
                        <h3 style={{
                            fontSize: '1.2rem',
                            fontWeight: '700',
                            color: '#374151',
                            margin: 0,
                            lineHeight: '1.4'
                        }}>
                            {notification.title}
                        </h3>
                        
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem'
                        }}>
                            <div style={{
                                background: priorityStyle.bg,
                                color: priorityStyle.color,
                                padding: '0.25rem 0.75rem',
                                borderRadius: '8px',
                                fontSize: '0.75rem',
                                fontWeight: '600',
                                textTransform: 'uppercase',
                                border: `1px solid ${priorityStyle.border}`
                            }}>
                                {notification.priority}
                            </div>
                            
                            <span style={{
                                fontSize: '0.85rem',
                                color: '#9ca3af',
                                fontWeight: '500'
                            }}>
                                {formatTimeAgo(notification.timestamp)}
                            </span>
                        </div>
                    </div>
                    
                    <p style={{
                        fontSize: '1rem',
                        color: '#6b7280',
                        margin: '0 0 1rem 0',
                        lineHeight: '1.6'
                    }}>
                        {notification.message}
                    </p>
                    
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <div style={{
                            display: 'flex',
                            gap: '1rem'
                        }}>
                            {notification.actionRequired && (
                                <button style={{
                                    background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '12px',
                                    padding: '0.75rem 1.5rem',
                                    fontSize: '0.9rem',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease',
                                    boxShadow: '0 4px 12px rgba(249, 115, 22, 0.3)'
                                }}>
                                    {notification.actionText}
                                </button>
                            )}
                            
                            {!notification.isRead && (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onMarkAsRead(notification.id);
                                    }}
                                    style={{
                                        background: 'rgba(34, 197, 94, 0.1)',
                                        color: '#16a34a',
                                        border: '1px solid rgba(34, 197, 94, 0.2)',
                                        borderRadius: '12px',
                                        padding: '0.75rem 1.5rem',
                                        fontSize: '0.9rem',
                                        fontWeight: '600',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease'
                                    }}
                                >
                                    Mark as Read
                                </button>
                            )}
                        </div>
                        
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onDelete(notification.id);
                            }}
                            style={{
                                background: 'rgba(239, 68, 68, 0.1)',
                                color: '#dc2626',
                                border: '1px solid rgba(239, 68, 68, 0.2)',
                                borderRadius: '12px',
                                padding: '0.75rem',
                                fontSize: '0.9rem',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                            title="Delete notification"
                        >
                            🗑️
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotificationCard;
