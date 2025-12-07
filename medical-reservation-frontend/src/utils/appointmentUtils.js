import i18n from '../i18n/config';

export const APPOINTMENT_TABS = [
    { id: 'upcoming', name: 'Upcoming', icon: '📅', color: '#3b82f6' },
    { id: 'past', name: 'Past', icon: '📋', color: '#6b7280' },
    { id: 'cancelled', name: 'Cancelled', icon: '❌', color: '#ef4444' }
];

export const translateAppointmentType = (type) => {
    if (!type) return '';
    
    const normalizedType = type.toLowerCase().trim();
    const translationKey = `appointments.appointmentType.${normalizedType}`;
    const translated = i18n.t(translationKey);
    
    if (translated === translationKey) {
        return type;
    }
    
    return translated;
};

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

export const formatDoctorScheduleDateTime = (dateTime) => {
    if (!dateTime) return 'Invalid Date';
    
    const date = typeof dateTime === 'string' ? new Date(dateTime) : dateTime;
    if (!(date instanceof Date) || isNaN(date.getTime())) {
        return 'Invalid Date';
    }
    
    const currentLang = i18n.language || 'en';
    const locale = currentLang === 'bg' ? 'bg-BG' : 'en-US';
    
    // Format date with day name and full date
    if (currentLang === 'bg') {
        const weekday = date.toLocaleDateString('bg-BG', { weekday: 'long' });
        const day = date.getDate();
        const month = date.toLocaleDateString('bg-BG', { month: 'long' });
        const year = date.getFullYear();
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        
        return `${weekday}, ${day} ${month} ${year} в ${hours}:${minutes}`;
    } else {
        const weekday = date.toLocaleDateString('en-US', { weekday: 'long' });
        const month = date.toLocaleDateString('en-US', { month: 'long' });
        const day = date.getDate();
        const year = date.getFullYear();
        const time = date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
        
        return `${weekday}, ${month} ${day}, ${year} at ${time}`;
    }
};

export const formatPatientDateTime = (dateTime) => {
    if (!dateTime) return 'Invalid Date';
    
    const date = typeof dateTime === 'string' ? new Date(dateTime) : dateTime;
    if (!(date instanceof Date) || isNaN(date.getTime())) {
        return 'Invalid Date';
    }
    
    const currentLang = i18n.language || 'en';
    const locale = currentLang === 'bg' ? 'bg-BG' : 'en-US';
    
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const appointmentDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    
    let timeString;
    if (currentLang === 'bg') {
        const hours = date.getHours();
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const period = hours < 12 ? 'сутринта' : hours < 18 ? 'следобед' : 'вечерта';
        timeString = `${hours}:${minutes} ${period}`;
    } else {
        timeString = date.toLocaleTimeString(locale, {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
    }
    
    if (appointmentDate.getTime() === today.getTime()) {
        const todayText = currentLang === 'bg' ? 'Днес' : 'Today';
        const atText = currentLang === 'bg' ? 'в' : 'at';
        return `${todayText} ${atText} ${timeString}`;
    } else if (appointmentDate.getTime() === tomorrow.getTime()) {
        const tomorrowText = currentLang === 'bg' ? 'Утре' : 'Tomorrow';
        const atText = currentLang === 'bg' ? 'в' : 'at';
        return `${tomorrowText} ${atText} ${timeString}`;
    } else {
        if (currentLang === 'bg') {
            const weekday = date.toLocaleDateString('bg-BG', { weekday: 'long' });
            const month = date.toLocaleDateString('bg-BG', { month: 'long' });
            const day = date.getDate();
            return `${weekday}, ${day} ${month} в ${timeString}`;
        } else {
            const weekday = date.toLocaleDateString('en-US', { weekday: 'long' });
            const month = date.toLocaleDateString('en-US', { month: 'short' });
            const day = date.getDate();
            return `${weekday}, ${month} ${day} at ${timeString}`;
        }
    }
};

export const formatAppointmentDate = (date) => {
    if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
        return 'Invalid Date';
    }
    const currentLang = i18n.language || 'en';
    const locale = currentLang === 'bg' ? 'bg-BG' : 'en-US';
    return date.toLocaleDateString(locale, {
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
    const currentLang = i18n.language || 'en';
    const locale = currentLang === 'bg' ? 'bg-BG' : 'en-US';
    return date.toLocaleTimeString(locale, {
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
    
    if (diffDays === 0) return i18n.t('appointments.today');
    if (diffDays === 1) return i18n.t('appointments.tomorrow');
    if (diffDays > 1) return i18n.t('appointments.inDays', { days: diffDays });
    if (diffDays === -1) return i18n.t('appointments.yesterday');
    if (diffDays < -1) return i18n.t('appointments.daysAgo', { days: Math.abs(diffDays) });
    
    return '';
};

export const translateDuration = (duration) => {
    if (!duration) return '';
    
    const currentLang = i18n.language || 'en';
    
    if (currentLang === 'bg') {
        let translated = duration.replace(/minutes?/gi, (match) => {
            return match.toLowerCase() === 'minutes' ? 'минути' : 'минута';
        });
        
        translated = translated.replace(/hours?/gi, (match) => {
            return match.toLowerCase() === 'hours' ? 'часа' : 'час';
        });
        
        return translated;
    }
    
    return duration;
};
