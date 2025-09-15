import { useState, useEffect } from 'react';

export const useNotifications = () => {
    const [loading, setLoading] = useState(true);
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        fetchNotifications();
    }, []);

    const fetchNotifications = async () => {
        try {
            setNotifications([
                {
                    id: 1,
                    title: "Appointment Reminder",
                    message: "Your appointment with Dr. Sarah Johnson is scheduled for tomorrow at 2:30 PM. Please arrive 15 minutes early.",
                    category: "appointments",
                    type: "reminder",
                    priority: "high",
                    isRead: false,
                    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
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
                    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
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
                    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
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
                    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
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
                    title: "System Maintenance Alert",
                    message: "The patient portal will be undergoing maintenance on Sunday from 2:00 AM to 4:00 AM EST.",
                    category: "system",
                    type: "alert",
                    priority: "low",
                    isRead: false,
                    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
                    actionRequired: false,
                    actionText: null,
                    details: {
                        maintenanceWindow: "Sunday 2:00 AM - 4:00 AM EST",
                        expectedDuration: "2 hours",
                        affectedServices: ["Patient Portal", "Appointment Booking"]
                    }
                }
            ]);
        } catch (error) {
            console.error('Error fetching notifications:', error);
        } finally {
            setLoading(false);
        }
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

    const getFilteredNotifications = (selectedCategory) => {
        if (selectedCategory === 'all') return notifications;
        return notifications.filter(notification => notification.category === selectedCategory);
    };

    return {
        loading,
        notifications,
        markAsRead,
        markAllAsRead,
        deleteNotification,
        getFilteredNotifications
    };
};
