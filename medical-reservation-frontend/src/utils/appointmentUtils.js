export const APPOINTMENT_TABS = [
    { id: 'upcoming', name: 'Upcoming', icon: '📅', color: '#3b82f6' },
    { id: 'past', name: 'Past', icon: '📋', color: '#6b7280' },
    { id: 'cancelled', name: 'Cancelled', icon: '❌', color: '#ef4444' }
];

export const getStatusColor = (status) => {
    switch (status) {
        case 'confirmed':
            return { bg: 'rgba(34, 197, 94, 0.1)', color: '#16a34a', border: 'rgba(34, 197, 94, 0.2)' };
        case 'pending':
            return { bg: 'rgba(251, 191, 36, 0.1)', color: '#d97706', border: 'rgba(251, 191, 36, 0.2)' };
        case 'completed':
            return { bg: 'rgba(59, 130, 246, 0.1)', color: '#2563eb', border: 'rgba(59, 130, 246, 0.2)' };
        case 'cancelled':
            return { bg: 'rgba(239, 68, 68, 0.1)', color: '#dc2626', border: 'rgba(239, 68, 68, 0.2)' };
        default:
            return { bg: 'rgba(107, 114, 128, 0.1)', color: '#374151', border: 'rgba(107, 114, 128, 0.2)' };
    }
};

// Doctor Schedule Format: dd MMM yyyy – HH:mm (24-hour format)
export const formatDoctorScheduleDateTime = (dateTime) => {
    if (!dateTime) return 'Invalid Date';
    
    const date = typeof dateTime === 'string' ? new Date(dateTime) : dateTime;
    if (!(date instanceof Date) || isNaN(date.getTime())) {
        return 'Invalid Date';
    }
    
    const day = date.getDate().toString().padStart(2, '0');
    const month = date.toLocaleDateString('en-US', { month: 'short' });
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    
    return `${day} ${month} ${year} – ${hours}:${minutes}`;
};

// Patient UI Format: EEEE, MMM dd 'at' h:mm a (12-hour format with weekday)
export const formatPatientDateTime = (dateTime) => {
    if (!dateTime) return 'Invalid Date';
    
    const date = typeof dateTime === 'string' ? new Date(dateTime) : dateTime;
    if (!(date instanceof Date) || isNaN(date.getTime())) {
        return 'Invalid Date';
    }
    
    // Check if it's today or tomorrow
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const appointmentDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    
    const timeString = date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });
    
    if (appointmentDate.getTime() === today.getTime()) {
        return `Today at ${timeString}`;
    } else if (appointmentDate.getTime() === tomorrow.getTime()) {
        return `Tomorrow at ${timeString}`;
    } else {
        const weekday = date.toLocaleDateString('en-US', { weekday: 'long' });
        const month = date.toLocaleDateString('en-US', { month: 'short' });
        const day = date.getDate();
        return `${weekday}, ${month} ${day} at ${timeString}`;
    }
};

// Legacy functions for backward compatibility
export const formatAppointmentDate = (date) => {
    if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
        return 'Invalid Date';
    }
    return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

export const formatAppointmentTime = (date) => {
    if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
        return 'Invalid Time';
    }
    return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
    });
};

export const getRelativeTimeUntil = (date) => {
    if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
        return 'Invalid Date';
    }
    
    const now = new Date();
    const diffTime = date.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    if (diffDays > 1) return `In ${diffDays} days`;
    if (diffDays === -1) return 'Yesterday';
    if (diffDays < -1) return `${Math.abs(diffDays)} days ago`;
    
    return '';
};
