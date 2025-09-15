export const views = [
    { id: 'today', name: "Today's Schedule", icon: '📅', color: '#3b82f6' },
    { id: 'upcoming', name: 'Upcoming', icon: '⏰', color: '#10b981' },
    { id: 'pending', name: 'Pending Approval', icon: '⏳', color: '#f59e0b' },
    { id: 'completed', name: 'Completed', icon: '✅', color: '#6b7280' }
];

export const getAppointmentTypeIcon = (type) => {
    switch (type?.toLowerCase()) {
        case 'consultation':
            return '🩺';
        case 'follow-up':
            return '🔄';
        case 'check-up':
            return '✅';
        case 'treatment':
            return '💊';
        case 'surgery consultation':
            return '⚕️';
        case 'emergency':
            return '🚨';
        default:
            return '📋';
    }
};

export const getPriorityLevel = (appointment) => {
    if (appointment.isEmergency) return 'emergency';
    if (appointment.type?.toLowerCase().includes('surgery')) return 'high';
    if (appointment.type?.toLowerCase().includes('follow-up')) return 'medium';
    return 'normal';
};

export const getPriorityColor = (priority) => {
    switch (priority) {
        case 'emergency':
            return '#ef4444';
        case 'high':
            return '#f59e0b';
        case 'medium':
            return '#3b82f6';
        default:
            return '#6b7280';
    }
};

export const getAppointmentStats = (appointments) => {
    const today = new Date();
    const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const endOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);

    return {
        today: appointments.filter(apt => 
            new Date(apt.appointmentDate) >= startOfToday && 
            new Date(apt.appointmentDate) < endOfToday
        ).length,
        upcoming: appointments.filter(apt => 
            new Date(apt.appointmentDate) >= endOfToday && 
            apt.status !== 'completed'
        ).length,
        pending: appointments.filter(apt => apt.status === 'pending').length,
        completed: appointments.filter(apt => apt.status === 'completed').length
    };
};
