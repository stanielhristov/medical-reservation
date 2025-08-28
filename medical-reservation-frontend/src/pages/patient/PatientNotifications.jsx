import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

const PatientNotifications = () => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [notifications, setNotifications] = useState([]);
    const [selectedNotification, setSelectedNotification] = useState(null);
    const [showSettings, setShowSettings] = useState(false);

    const categories = [
        { id: 'all', name: 'All Notifications', icon: '🔔', color: '#f97316' },
        { id: 'appointments', name: 'Appointments', icon: '📅', color: '#3b82f6' },
        { id: 'reminders', name: 'Reminders', icon: '⏰', color: '#10b981' },
        { id: 'health', name: 'Health Updates', icon: '🏥', color: '#8b5cf6' },
        { id: 'system', name: 'System', icon: '⚙️', color: '#6b7280' }
    ];

    useEffect(() => {
        fetchNotifications();
    }, []);

    const fetchNotifications = async () => {
        try {
            // Mock data - replace with actual API call
            setNotifications([
                {
                    id: 1,
                    title: "Appointment Reminder",
                    message: "Your appointment with Dr. Sarah Johnson is scheduled for tomorrow at 2:30 PM. Please arrive 15 minutes early.",
                    category: "appointments",
                    type: "reminder",
                    priority: "high",
                    isRead: false,
                    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
                    actionRequired: true,
                    actionText: "Confirm Attendance",
                    details: {
                        doctor: "Dr. Sarah Johnson",
                        specialization: "Cardiology",
                        date: new Date(Date.now() + 24 * 60 * 60 * 1000),
                        location: "Medical Center East, Room 205"
                    }
                },
                {
                    id: 2,
                    title: "Test Results Available",
                    message: "Your recent blood work results are now available in your medical records. All values are within normal range.",
                    category: "health",
                    type: "update",
                    priority: "medium",
                    isRead: false,
                    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
                    actionRequired: true,
                    actionText: "View Results",
                    details: {
                        testType: "Complete Blood Count (CBC)",
                        doctor: "Dr. Michael Chen",
                        status: "Normal",
                        dateCompleted: new Date(Date.now() - 24 * 60 * 60 * 1000)
                    }
                },
                {
                    id: 3,
                    title: "Prescription Refill Reminder",
                    message: "Your Lisinopril prescription is running low. You have 3 days of medication remaining.",
                    category: "reminders",
                    type: "medication",
                    priority: "high",
                    isRead: true,
                    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
                    actionRequired: true,
                    actionText: "Request Refill",
                    details: {
                        medication: "Lisinopril 10mg",
                        prescribedBy: "Dr. Sarah Johnson",
                        daysRemaining: 3,
                        pharmacyNote: "Available for pickup at CVS Pharmacy"
                    }
                },
                {
                    id: 4,
                    title: "Annual Physical Due",
                    message: "It's time for your annual physical examination. Schedule your appointment to maintain your health.",
                    category: "reminders",
                    type: "checkup",
                    priority: "medium",
                    isRead: true,
                    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
                    actionRequired: true,
                    actionText: "Schedule Appointment",
                    details: {
                        lastPhysical: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000),
                        recommendedProvider: "Dr. Emily Rodriguez",
                        frequency: "Annual"
                    }
                },
                {
                    id: 5,
                    title: "System Maintenance Notice",
                    message: "Our patient portal will be undergoing scheduled maintenance on Saturday from 2:00 AM to 6:00 AM.",
                    category: "system",
                    type: "maintenance",
                    priority: "low",
                    isRead: true,
                    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
                    actionRequired: false,
                    details: {
                        maintenanceWindow: "Saturday 2:00 AM - 6:00 AM",
                        affectedServices: ["Patient Portal", "Appointment Booking", "Medical Records"],
                        alternativeContact: "Call (555) 123-4567 for urgent matters"
                    }
                },
                {
                    id: 6,
                    title: "Vaccination Reminder",
                    message: "Your annual flu vaccination is due. Protect yourself and others by scheduling your shot today.",
                    category: "health",
                    type: "vaccination",
                    priority: "medium",
                    isRead: false,
                    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
                    actionRequired: true,
                    actionText: "Schedule Vaccination",
                    details: {
                        vaccinationType: "Annual Influenza Vaccine",
                        lastVaccination: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000),
                        recommendedBy: "Dr. Lisa Martinez",
                        availableLocations: ["Main Clinic", "North Branch", "Pharmacy"]
                    }
                }
            ]);
        } catch (error) {
            console.error('Error fetching notifications:', error);
        } finally {
            setLoading(false);
        }
    };

    const getFilteredNotifications = () => {
        if (selectedCategory === 'all') return notifications;
        return notifications.filter(notification => notification.category === selectedCategory);
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'high':
                return { bg: 'rgba(239, 68, 68, 0.1)', color: '#dc2626', border: 'rgba(239, 68, 68, 0.2)' };
            case 'medium':
                return { bg: 'rgba(251, 191, 36, 0.1)', color: '#d97706', border: 'rgba(251, 191, 36, 0.2)' };
            case 'low':
                return { bg: 'rgba(34, 197, 94, 0.1)', color: '#16a34a', border: 'rgba(34, 197, 94, 0.2)' };
            default:
                return { bg: 'rgba(107, 114, 128, 0.1)', color: '#374151', border: 'rgba(107, 114, 128, 0.2)' };
        }
    };

    const getCategoryIcon = (category) => {
        const categoryObj = categories.find(cat => cat.id === category);
        return categoryObj ? categoryObj.icon : '🔔';
    };

    const markAsRead = (notificationId) => {
        setNotifications(prev =>
            prev.map(notification =>
                notification.id === notificationId
                    ? { ...notification, isRead: true }
                    : notification
            )
        );
    };

    const markAllAsRead = () => {
        setNotifications(prev =>
            prev.map(notification => ({ ...notification, isRead: true }))
        );
    };

    const deleteNotification = (notificationId) => {
        setNotifications(prev =>
            prev.filter(notification => notification.id !== notificationId)
        );
    };

    const formatTimeAgo = (timestamp) => {
        const now = new Date();
        const diff = now - timestamp;
        const minutes = Math.floor(diff / (1000 * 60));
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));

        if (minutes < 60) return `${minutes}m ago`;
        if (hours < 24) return `${hours}h ago`;
        return `${days}d ago`;
    };

    if (loading) {
        return (
            <div style={{
                minHeight: '100vh',
                width: '100vw',
                background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 50%, #bbf7d0 100%)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                boxSizing: 'border-box'
            }}>
                <div style={{
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '24px',
                    padding: '3rem',
                    textAlign: 'center',
                    boxShadow: '0 20px 40px rgba(34, 197, 94, 0.1), 0 8px 32px rgba(0, 0, 0, 0.05)',
                    border: '1px solid rgba(34, 197, 94, 0.1)'
                }}>
                    <div style={{
                        width: '60px',
                        height: '60px',
                        border: '4px solid rgba(34, 197, 94, 0.2)',
                        borderTop: '4px solid #22c55e',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite',
                        margin: '0 auto 1.5rem'
                    }} />
                    <p style={{ color: '#6b7280', margin: 0, fontSize: '1rem', fontWeight: '500' }}>Loading notifications...</p>
                </div>
            </div>
        );
    }

    return (
        <div style={{
            minHeight: '100vh',
            width: '100vw',
            background: 'linear-gradient(135deg, #fff7ed 0%, #fed7aa 30%, #fb923c 70%, #f97316 100%)',
            position: 'relative',
            overflow: 'hidden',
            boxSizing: 'border-box'
        }}>
            {/* Background decorations */}
            <div style={{
                position: 'absolute',
                top: '5%',
                right: '8%',
                width: '300px',
                height: '300px',
                background: 'radial-gradient(circle, rgba(249, 115, 22, 0.1) 0%, rgba(249, 115, 22, 0.05) 50%, transparent 100%)',
                borderRadius: '50%',
                zIndex: 0
            }} />
            
            <div style={{
                position: 'absolute',
                bottom: '10%',
                left: '5%',
                width: '250px',
                height: '250px',
                background: 'radial-gradient(circle, rgba(234, 88, 12, 0.08) 0%, rgba(234, 88, 12, 0.03) 50%, transparent 100%)',
                borderRadius: '50%',
                zIndex: 0
            }} />

            {/* Main Content */}
            <main style={{
                maxWidth: '1400px',
                margin: '0 auto',
                padding: '2.5rem 2rem',
                position: 'relative',
                zIndex: 1,
                width: '100%',
                boxSizing: 'border-box'
            }}>
                {/* Header Section */}
                <section style={{
                    background: 'rgba(255, 255, 255, 0.98)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '32px',
                    padding: '3rem',
                    marginBottom: '3rem',
                    boxShadow: '0 32px 64px rgba(249, 115, 22, 0.12), 0 16px 32px rgba(0, 0, 0, 0.06)',
                    border: '1px solid rgba(249, 115, 22, 0.15)',
                    textAlign: 'center'
                }}>
                    <div style={{
                        width: '100px',
                        height: '100px',
                        background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
                        borderRadius: '20px',
                        margin: '0 auto 2rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 16px 40px rgba(249, 115, 22, 0.3)'
                    }}>
                        <span style={{ fontSize: '3rem', color: 'white' }}>🔔</span>
                    </div>
                    
                    <h1 style={{
                        fontSize: '2.5rem',
                        fontWeight: '800',
                        color: '#374151',
                        margin: '0 0 1rem',
                        letterSpacing: '-0.025em'
                    }}>
                        Notifications Center
                    </h1>
                    
                    <p style={{
                        fontSize: '1.2rem',
                        color: '#6b7280',
                        margin: 0,
                        maxWidth: '600px',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        lineHeight: '1.6'
                    }}>
                        Stay updated with appointment reminders, health updates, and important medical information
                    </p>
                </section>

                {/* Statistics Cards */}
                <section style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '1.5rem',
                    marginBottom: '3rem'
                }}>
                    {categories.slice(1).map(category => {
                        const count = notifications.filter(notification => notification.category === category.id).length;
                        const unreadCount = notifications.filter(notification => 
                            notification.category === category.id && !notification.isRead
                        ).length;
                        
                        return (
                            <div key={category.id} style={{
                                background: 'rgba(255, 255, 255, 0.98)',
                                backdropFilter: 'blur(20px)',
                                borderRadius: '20px',
                                padding: '1.5rem',
                                boxShadow: '0 8px 24px rgba(249, 115, 22, 0.1)',
                                border: `1px solid ${category.color}20`,
                                textAlign: 'center',
                                transition: 'all 0.3s ease',
                                cursor: 'pointer',
                                position: 'relative'
                            }}
                            onClick={() => setSelectedCategory(category.id)}
                            onMouseEnter={e => {
                                e.currentTarget.style.transform = 'translateY(-4px)';
                                e.currentTarget.style.boxShadow = `0 12px 32px ${category.color}30`;
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 8px 24px rgba(249, 115, 22, 0.1)';
                            }}>
                                {unreadCount > 0 && (
                                    <div style={{
                                        position: 'absolute',
                                        top: '10px',
                                        right: '10px',
                                        width: '24px',
                                        height: '24px',
                                        background: '#ef4444',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'white',
                                        fontSize: '0.7rem',
                                        fontWeight: '700'
                                    }}>
                                        {unreadCount}
                                    </div>
                                )}
                                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{category.icon}</div>
                                <div style={{ color: '#374151', fontWeight: '700', fontSize: '1.5rem' }}>{count}</div>
                                <div style={{ color: '#6b7280', fontSize: '0.9rem' }}>{category.name}</div>
                            </div>
                        );
                    })}
                </section>

                {/* Filter and Actions */}
                <section style={{
                    background: 'rgba(255, 255, 255, 0.98)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '24px',
                    padding: '2rem',
                    marginBottom: '3rem',
                    boxShadow: '0 12px 32px rgba(249, 115, 22, 0.1)',
                    border: '1px solid rgba(249, 115, 22, 0.15)'
                }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '1.5rem',
                        flexWrap: 'wrap',
                        gap: '1rem'
                    }}>
                        <h2 style={{
                            fontSize: '1.5rem',
                            fontWeight: '700',
                            color: '#374151',
                            margin: 0
                        }}>
                            Filter Notifications
                        </h2>
                        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                            <button
                                onClick={markAllAsRead}
                                style={{
                                    padding: '0.75rem 1.5rem',
                                    background: 'rgba(249, 115, 22, 0.1)',
                                    color: '#ea580c',
                                    border: '1px solid rgba(249, 115, 22, 0.2)',
                                    borderRadius: '12px',
                                    fontSize: '0.9rem',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem'
                                }}
                            >
                                <span>✅</span>
                                Mark All Read
                            </button>
                            <button
                                onClick={() => setShowSettings(true)}
                                style={{
                                    padding: '0.75rem 1.5rem',
                                    background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '12px',
                                    fontSize: '0.9rem',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    boxShadow: '0 4px 12px rgba(249, 115, 22, 0.3)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem'
                                }}
                            >
                                <span>⚙️</span>
                                Settings
                            </button>
                        </div>
                    </div>
                    
                    <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '0.75rem'
                    }}>
                        {categories.map(category => (
                            <button
                                key={category.id}
                                onClick={() => setSelectedCategory(category.id)}
                                style={{
                                    padding: '0.75rem 1.25rem',
                                    background: selectedCategory === category.id 
                                        ? 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)' 
                                        : 'rgba(249, 115, 22, 0.1)',
                                    color: selectedCategory === category.id ? 'white' : '#ea580c',
                                    border: selectedCategory === category.id 
                                        ? 'none' 
                                        : '1px solid rgba(249, 115, 22, 0.2)',
                                    borderRadius: '20px',
                                    fontSize: '0.9rem',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem'
                                }}
                            >
                                <span>{category.icon}</span>
                                {category.name}
                            </button>
                        ))}
                    </div>
                </section>

                {/* Notifications List */}
                <section>
                    <div style={{
                        display: 'grid',
                        gap: '1.5rem'
                    }}>
                        {getFilteredNotifications().length > 0 ? (
                            getFilteredNotifications().map((notification) => {
                                const priorityColors = getPriorityColor(notification.priority);
                                
                                return (
                                    <div
                                        key={notification.id}
                                        style={{
                                            background: 'rgba(255, 255, 255, 0.98)',
                                            backdropFilter: 'blur(20px)',
                                            borderRadius: '24px',
                                            padding: '2rem',
                                            boxShadow: '0 12px 32px rgba(249, 115, 22, 0.1)',
                                            border: notification.isRead 
                                                ? '1px solid rgba(249, 115, 22, 0.15)' 
                                                : '2px solid rgba(249, 115, 22, 0.3)',
                                            transition: 'all 0.4s ease',
                                            cursor: 'pointer',
                                            position: 'relative',
                                            overflow: 'hidden',
                                            opacity: notification.isRead ? 0.8 : 1
                                        }}
                                        onClick={() => {
                                            setSelectedNotification(notification);
                                            if (!notification.isRead) {
                                                markAsRead(notification.id);
                                            }
                                        }}
                                        onMouseEnter={e => {
                                            e.currentTarget.style.transform = 'translateY(-4px)';
                                            e.currentTarget.style.boxShadow = '0 20px 48px rgba(249, 115, 22, 0.2)';
                                        }}
                                        onMouseLeave={e => {
                                            e.currentTarget.style.transform = 'translateY(0)';
                                            e.currentTarget.style.boxShadow = '0 12px 32px rgba(249, 115, 22, 0.1)';
                                        }}
                                    >
                                        {!notification.isRead && (
                                            <div style={{
                                                position: 'absolute',
                                                top: '15px',
                                                right: '15px',
                                                width: '12px',
                                                height: '12px',
                                                background: '#f97316',
                                                borderRadius: '50%',
                                                boxShadow: '0 0 0 3px rgba(249, 115, 22, 0.2)'
                                            }} />
                                        )}

                                        <div style={{
                                            position: 'absolute',
                                            top: '10px',
                                            right: '10px',
                                            width: '80px',
                                            height: '80px',
                                            background: 'radial-gradient(circle, rgba(249, 115, 22, 0.1) 0%, transparent 70%)',
                                            borderRadius: '50%'
                                        }} />
                                        
                                        {/* Notification Header */}
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'flex-start',
                                            gap: '1rem',
                                            marginBottom: '1.5rem'
                                        }}>
                                            <div style={{
                                                width: '60px',
                                                height: '60px',
                                                background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
                                                borderRadius: '16px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontSize: '1.8rem',
                                                boxShadow: '0 8px 24px rgba(249, 115, 22, 0.3)',
                                                flexShrink: 0
                                            }}>
                                                {getCategoryIcon(notification.category)}
                                            </div>
                                            
                                            <div style={{ flex: 1 }}>
                                                <div style={{
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'flex-start',
                                                    marginBottom: '0.5rem',
                                                    flexWrap: 'wrap',
                                                    gap: '0.5rem'
                                                }}>
                                                    <h3 style={{
                                                        fontSize: '1.3rem',
                                                        fontWeight: '700',
                                                        color: '#374151',
                                                        margin: 0
                                                    }}>
                                                        {notification.title}
                                                    </h3>
                                                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                                        <span style={{
                                                            padding: '0.5rem 1rem',
                                                            fontSize: '0.8rem',
                                                            fontWeight: '600',
                                                            borderRadius: '20px',
                                                            background: priorityColors.bg,
                                                            color: priorityColors.color,
                                                            border: `1px solid ${priorityColors.border}`
                                                        }}>
                                                            {notification.priority.charAt(0).toUpperCase() + notification.priority.slice(1)}
                                                        </span>
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                deleteNotification(notification.id);
                                                            }}
                                                            style={{
                                                                width: '32px',
                                                                height: '32px',
                                                                background: 'rgba(239, 68, 68, 0.1)',
                                                                color: '#dc2626',
                                                                border: '1px solid rgba(239, 68, 68, 0.2)',
                                                                borderRadius: '8px',
                                                                cursor: 'pointer',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                fontSize: '0.9rem'
                                                            }}
                                                        >
                                                            🗑️
                                                        </button>
                                                    </div>
                                                </div>
                                                
                                                <div style={{
                                                    fontSize: '0.9rem',
                                                    color: '#6b7280',
                                                    marginBottom: '0.5rem'
                                                }}>
                                                    {formatTimeAgo(notification.timestamp)}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Notification Message */}
                                        <p style={{
                                            color: '#374151',
                                            fontSize: '1rem',
                                            lineHeight: '1.6',
                                            marginBottom: '1.5rem'
                                        }}>
                                            {notification.message}
                                        </p>

                                        {/* Action Button */}
                                        {notification.actionRequired && (
                                            <div style={{
                                                display: 'flex',
                                                gap: '1rem'
                                            }}>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        // Handle action based on notification type
                                                        alert(`Action: ${notification.actionText}`);
                                                    }}
                                                    style={{
                                                        padding: '0.75rem 1.5rem',
                                                        background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
                                                        color: 'white',
                                                        border: 'none',
                                                        borderRadius: '12px',
                                                        fontSize: '0.9rem',
                                                        fontWeight: '600',
                                                        cursor: 'pointer',
                                                        transition: 'all 0.3s ease',
                                                        boxShadow: '0 4px 12px rgba(249, 115, 22, 0.3)'
                                                    }}
                                                >
                                                    {notification.actionText}
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                );
                            })
                        ) : (
                            <div style={{
                                background: 'rgba(255, 255, 255, 0.98)',
                                backdropFilter: 'blur(20px)',
                                borderRadius: '24px',
                                padding: '3rem',
                                textAlign: 'center',
                                boxShadow: '0 12px 32px rgba(249, 115, 22, 0.1)',
                                border: '1px solid rgba(249, 115, 22, 0.15)'
                            }}>
                                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔔</div>
                                <h3 style={{
                                    fontSize: '1.5rem',
                                    fontWeight: '600',
                                    color: '#374151',
                                    margin: '0 0 0.5rem'
                                }}>
                                    No notifications found
                                </h3>
                                <p style={{ color: '#6b7280', margin: 0 }}>
                                    No notifications found for the selected category
                                </p>
                            </div>
                        )}
                    </div>
                </section>
            </main>

            {/* Notification Details Modal */}
            {selectedNotification && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0, 0, 0, 0.7)',
                    backdropFilter: 'blur(10px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000,
                    padding: '2rem'
                }}>
                    <div style={{
                        background: 'white',
                        borderRadius: '24px',
                        padding: '2.5rem',
                        maxWidth: '600px',
                        width: '100%',
                        maxHeight: '80vh',
                        overflowY: 'auto',
                        boxShadow: '0 32px 64px rgba(0, 0, 0, 0.2)',
                        position: 'relative'
                    }}>
                        <button
                            onClick={() => setSelectedNotification(null)}
                            style={{
                                position: 'absolute',
                                top: '1rem',
                                right: '1rem',
                                background: 'none',
                                border: 'none',
                                fontSize: '1.5rem',
                                cursor: 'pointer',
                                color: '#6b7280'
                            }}
                        >
                            ✕
                        </button>

                        <div style={{ marginBottom: '2rem' }}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem',
                                marginBottom: '1rem'
                            }}>
                                <div style={{
                                    width: '60px',
                                    height: '60px',
                                    background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
                                    borderRadius: '16px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '1.8rem'
                                }}>
                                    {getCategoryIcon(selectedNotification.category)}
                                </div>
                                <div>
                                    <h3 style={{
                                        fontSize: '1.5rem',
                                        fontWeight: '700',
                                        color: '#374151',
                                        margin: '0 0 0.25rem'
                                    }}>
                                        {selectedNotification.title}
                                    </h3>
                                    <p style={{ color: '#6b7280', margin: 0 }}>
                                        {formatTimeAgo(selectedNotification.timestamp)} • {selectedNotification.priority} priority
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div style={{
                            background: 'rgba(249, 115, 22, 0.1)',
                            borderRadius: '12px',
                            padding: '1.5rem',
                            marginBottom: '2rem'
                        }}>
                            <h4 style={{
                                fontSize: '1.1rem',
                                fontWeight: '600',
                                color: '#374151',
                                margin: '0 0 1rem'
                            }}>
                                Message
                            </h4>
                            <p style={{
                                color: '#374151',
                                lineHeight: '1.6',
                                margin: 0
                            }}>
                                {selectedNotification.message}
                            </p>
                        </div>

                        {selectedNotification.details && (
                            <div style={{
                                background: 'rgba(249, 115, 22, 0.05)',
                                borderRadius: '12px',
                                padding: '1.5rem',
                                marginBottom: '2rem'
                            }}>
                                <h4 style={{
                                    fontSize: '1.1rem',
                                    fontWeight: '600',
                                    color: '#374151',
                                    margin: '0 0 1rem'
                                }}>
                                    Additional Details
                                </h4>
                                <div style={{
                                    display: 'grid',
                                    gap: '0.75rem'
                                }}>
                                    {Object.entries(selectedNotification.details).map(([key, value]) => (
                                        <div key={key} style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            padding: '0.75rem',
                                            background: 'white',
                                            borderRadius: '8px',
                                            border: '1px solid rgba(249, 115, 22, 0.1)'
                                        }}>
                                            <span style={{
                                                color: '#6b7280',
                                                fontWeight: '500',
                                                textTransform: 'capitalize'
                                            }}>
                                                {key.replace(/([A-Z])/g, ' $1').trim()}:
                                            </span>
                                            <span style={{
                                                color: '#374151',
                                                fontWeight: '600'
                                            }}>
                                                {value instanceof Date ? value.toLocaleDateString() : value}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {selectedNotification.actionRequired && (
                            <button
                                onClick={() => {
                                    setSelectedNotification(null);
                                    alert(`Action: ${selectedNotification.actionText}`);
                                }}
                                style={{
                                    width: '100%',
                                    padding: '1rem',
                                    background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '12px',
                                    fontSize: '1rem',
                                    fontWeight: '600',
                                    cursor: 'pointer'
                                }}
                            >
                                {selectedNotification.actionText}
                            </button>
                        )}
                    </div>
                </div>
            )}

            {/* Settings Modal */}
            {showSettings && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0, 0, 0, 0.7)',
                    backdropFilter: 'blur(10px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000,
                    padding: '2rem'
                }}>
                    <div style={{
                        background: 'white',
                        borderRadius: '24px',
                        padding: '2.5rem',
                        maxWidth: '500px',
                        width: '100%',
                        boxShadow: '0 32px 64px rgba(0, 0, 0, 0.2)',
                        position: 'relative'
                    }}>
                        <button
                            onClick={() => setShowSettings(false)}
                            style={{
                                position: 'absolute',
                                top: '1rem',
                                right: '1rem',
                                background: 'none',
                                border: 'none',
                                fontSize: '1.5rem',
                                cursor: 'pointer',
                                color: '#6b7280'
                            }}
                        >
                            ✕
                        </button>

                        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                            <div style={{
                                width: '80px',
                                height: '80px',
                                background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
                                borderRadius: '16px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '2rem',
                                margin: '0 auto 1rem'
                            }}>
                                ⚙️
                            </div>
                            <h3 style={{
                                fontSize: '1.5rem',
                                fontWeight: '700',
                                color: '#374151',
                                margin: '0 0 0.5rem'
                            }}>
                                Notification Settings
                            </h3>
                            <p style={{ color: '#6b7280', margin: 0 }}>
                                Customize your notification preferences
                            </p>
                        </div>

                        <div style={{
                            background: 'rgba(249, 115, 22, 0.1)',
                            borderRadius: '12px',
                            padding: '1.5rem',
                            textAlign: 'center',
                            marginBottom: '2rem'
                        }}>
                            <p style={{
                                color: '#ea580c',
                                fontWeight: '600',
                                margin: 0,
                                fontSize: '1.1rem'
                            }}>
                                🚀 Notification preferences will be integrated!
                            </p>
                            <p style={{
                                color: '#f97316',
                                margin: '0.5rem 0 0',
                                fontSize: '0.9rem'
                            }}>
                                This will allow customization of notification types and delivery methods.
                            </p>
                        </div>

                        <button
                            onClick={() => setShowSettings(false)}
                            style={{
                                width: '100%',
                                padding: '1rem',
                                background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '12px',
                                fontSize: '1rem',
                                fontWeight: '600',
                                cursor: 'pointer'
                            }}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            <style jsx>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
};

export default PatientNotifications;
