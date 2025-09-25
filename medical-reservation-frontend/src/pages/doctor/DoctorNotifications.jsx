import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../hooks/useNotifications';
import LoadingSpinner from '../../components/LoadingSpinner';
import NotificationHeader from '../../components/NotificationHeader';
import NotificationStats from '../../components/NotificationStats';
import NotificationFilters from '../../components/NotificationFilters';
import NotificationCard from '../../components/NotificationCard';

const DoctorNotifications = () => {
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
        return <LoadingSpinner message="Loading notifications..." />;
    }

    return (
        <div style={{ position: 'relative' }}>
            {/* Background decorative elements */}
            <div style={{
                position: 'absolute',
                top: '5%',
                right: '8%',
                width: '300px',
                height: '300px',
                background: 'radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, rgba(16, 185, 129, 0.05) 50%, transparent 100%)',
                borderRadius: '50%',
                zIndex: 0
            }} />
            
            <div style={{
                position: 'absolute',
                bottom: '10%',
                left: '5%',
                width: '250px',
                height: '250px',
                background: 'radial-gradient(circle, rgba(5, 150, 105, 0.08) 0%, rgba(5, 150, 105, 0.03) 50%, transparent 100%)',
                borderRadius: '50%',
                zIndex: 0
            }} />

            <main style={{
                padding: '2.5rem 0',
                position: 'relative',
                zIndex: 1
            }}>
                <NotificationHeader isDoctor={true} />

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
                        margin: '0 0 2rem 0',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem'
                    }}>
                        🔔 Your Notifications
                        {filteredNotifications.length > 0 && (
                            <span style={{
                                background: 'rgba(16, 185, 129, 0.1)',
                                color: '#059669',
                                padding: '0.25rem 0.75rem',
                                borderRadius: '12px',
                                fontSize: '0.9rem',
                                fontWeight: '600'
                            }}>
                                {filteredNotifications.length}
                            </span>
                        )}
                    </h2>

                    {filteredNotifications.length === 0 ? (
                        <div style={{
                            textAlign: 'center',
                            padding: '4rem 2rem',
                            color: '#9ca3af'
                        }}>
                            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📬</div>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: '600', margin: '0 0 0.5rem 0' }}>
                                No notifications yet
                            </h3>
                            <p style={{ margin: 0, fontSize: '1.1rem' }}>
                                You'll receive notifications here about appointments, patient updates, and system messages.
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

export default DoctorNotifications;
