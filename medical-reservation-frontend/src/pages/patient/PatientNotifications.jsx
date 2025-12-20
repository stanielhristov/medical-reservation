import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../hooks/useNotifications';
import LoadingSpinner from '../../components/LoadingSpinner';
import NotificationHeader from '../../components/NotificationHeader';
import NotificationStats from '../../components/NotificationStats';
import NotificationFilters from '../../components/NotificationFilters';
import NotificationCard from '../../components/NotificationCard';

const PatientNotifications = () => {
    const { t } = useTranslation();
    const { user } = useAuth();
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedNotification, setSelectedNotification] = useState(null);

    const {
        loading,
        notifications,
        markAsRead,
        markAllAsRead,
        deleteNotification,
        getFilteredNotifications
    } = useNotifications();

    const filteredNotifications = getFilteredNotifications(selectedCategory);

    if (loading) {
        return <LoadingSpinner message={t('loading.loadingNotifications')} />;
    }

    return (
        <div style={{ position: 'relative' }}>
            <div style={{
                position: 'absolute',
                top: '5%',
                right: '8%',
                width: '300px',
                height: '300px',
                background: 'radial-gradient(circle, rgba(34, 197, 94, 0.1) 0%, rgba(34, 197, 94, 0.05) 50%, transparent 100%)',
                borderRadius: '50%',
                zIndex: 0
            }} />
            
            <div style={{
                position: 'absolute',
                bottom: '10%',
                left: '5%',
                width: '250px',
                height: '250px',
                background: 'radial-gradient(circle, rgba(22, 163, 74, 0.08) 0%, rgba(22, 163, 74, 0.03) 50%, transparent 100%)',
                borderRadius: '50%',
                zIndex: 0
            }} />

            <main style={{
                padding: '2.5rem 0',
                position: 'relative',
                zIndex: 1
            }}>
                <NotificationHeader />

                <NotificationStats 
                    notifications={notifications}
                    selectedCategory={selectedCategory}
                    onCategorySelect={setSelectedCategory}
                />

                <NotificationFilters
                    selectedCategory={selectedCategory}
                    onCategorySelect={setSelectedCategory}
                    notifications={notifications}
                    onMarkAllAsRead={markAllAsRead}
                />

                <section style={{
                    background: 'rgba(255, 255, 255, 0.98)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '24px',
                    padding: '2rem',
                    boxShadow: '0 16px 32px rgba(0, 0, 0, 0.06)',
                    border: '1px solid rgba(0, 0, 0, 0.08)'
                }}>
                    <h2 style={{
                        fontSize: '1.5rem',
                        fontWeight: '700',
                        color: '#374151',
                        margin: '0 0 2rem 0'
                    }}>
                        {selectedCategory === 'all' ? t('notifications.allNotifications') : 
                         t(`notifications.${selectedCategory}Notifications`)}
                        <span style={{
                            fontSize: '1rem',
                            fontWeight: '500',
                            color: '#9ca3af',
                            marginLeft: '0.5rem'
                        }}>
                            ({filteredNotifications.length})
                        </span>
                    </h2>

                    {filteredNotifications.length === 0 ? (
                        <div style={{
                            textAlign: 'center',
                            padding: '4rem 2rem',
                            color: '#9ca3af'
                        }}>
                            <div style={{
                            width: '80px',
                            height: '80px',
                            background: 'rgba(34, 197, 94, 0.1)',
                            borderRadius: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 1rem'
                        }}>
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                                <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
                            </svg>
                        </div>
                            <h3 style={{ fontSize: '1.2rem', fontWeight: '600', margin: '0 0 0.5rem 0' }}>
                                {t('notifications.noNotificationsFound')}
                            </h3>
                            <p style={{ margin: 0 }}>
                                {t('notifications.allCaughtUp')}
                            </p>
                        </div>
                    ) : (
                        <div>
                            {filteredNotifications.map(notification => (
                                <NotificationCard
                                    key={notification.id}
                                    notification={notification}
                                    onMarkAsRead={markAsRead}
                                    onDelete={deleteNotification}
                                    onViewDetails={setSelectedNotification}
                                />
                            ))}
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
};

export default PatientNotifications;
