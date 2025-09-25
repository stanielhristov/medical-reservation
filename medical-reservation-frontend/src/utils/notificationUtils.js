export const NOTIFICATION_CATEGORIES = [
    { id: 'all', name: 'All Notifications', icon: '🔔', color: '#f97316' },
    { id: 'appointments', name: 'Appointments', icon: '📅', color: '#3b82f6' },
    { id: 'reminders', name: 'Reminders', icon: '⏰', color: '#10b981' },
    { id: 'health', name: 'Health Updates', icon: '🏥', color: '#8b5cf6' },
    { id: 'system', name: 'System', icon: '⚙️', color: '#6b7280' }
];

export const getPriorityColor = (priority) => {
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

export const getCategoryIcon = (category) => {
    const categoryObj = NOTIFICATION_CATEGORIES.find(cat => cat.id === category);
    return categoryObj ? categoryObj.icon : '🔔';
};

export const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 1) return 'now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
};
