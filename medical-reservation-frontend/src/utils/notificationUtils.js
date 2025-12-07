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

import i18n from '../i18n/config';

export const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 1) return i18n.t('notifications.now');
    if (minutes < 60) return i18n.t('notifications.minutesAgo', { minutes });
    if (hours < 24) return i18n.t('notifications.hoursAgo', { hours });
    return i18n.t('notifications.daysAgo', { days });
};

export const translateNotificationTitle = (title) => {
    if (!title) return title;
    
    // Common notification titles that come from backend
    const titleMap = {
        'Appointment Requested': i18n.t('notifications.appointmentRequested'),
        'New Appointment Request': i18n.t('notifications.newAppointmentRequest'),
        'Appointment Confirmed': i18n.t('notifications.appointmentConfirmed'),
        'Appointment Cancelled': i18n.t('notifications.appointmentCancelled'),
    };
    
    return titleMap[title] || title;
};

const parseAndFormatDate = (dateTimeString, currentLang) => {
    if (currentLang !== 'bg') return dateTimeString;
    
    try {
        // Try to parse common English date formats
        // Format: "Sunday, December 7, 2025 at 4:00 PM"
        const dateMatch = dateTimeString.match(/(\w+day), (\w+) (\d+), (\d+) at (\d+):(\d+) (AM|PM)/i);
        if (dateMatch) {
            const [, weekday, month, day, year, hour, minute, period] = dateMatch;
            
            // Convert month name to number
            const monthNames = {
                'january': 0, 'february': 1, 'march': 2, 'april': 3,
                'may': 4, 'june': 5, 'july': 6, 'august': 7,
                'september': 8, 'october': 9, 'november': 10, 'december': 11
            };
            const monthNum = monthNames[month.toLowerCase()];
            if (monthNum === undefined) return dateTimeString;
            
            // Convert 12-hour to 24-hour
            let hour24 = parseInt(hour);
            if (period.toUpperCase() === 'PM' && hour24 !== 12) {
                hour24 += 12;
            } else if (period.toUpperCase() === 'AM' && hour24 === 12) {
                hour24 = 0;
            }
            
            // Create date object
            const date = new Date(parseInt(year), monthNum, parseInt(day), hour24, parseInt(minute));
            
            // Format in Bulgarian
            const bgWeekday = date.toLocaleDateString('bg-BG', { weekday: 'long' });
            const bgMonth = date.toLocaleDateString('bg-BG', { month: 'long' });
            const bgDay = date.getDate();
            const bgYear = date.getFullYear();
            
            // Format time in Bulgarian (24-hour format with period)
            const bgHours = date.getHours();
            const bgMinutes = date.getMinutes().toString().padStart(2, '0');
            const periodBg = bgHours < 12 ? 'сутринта' : bgHours < 18 ? 'следобед' : 'вечерта';
            const timeString = `${bgHours}:${bgMinutes} ${periodBg}`;
            
            return `${bgWeekday}, ${bgDay} ${bgMonth} ${bgYear} г. в ${timeString}`;
        }
    } catch (error) {
        console.warn('Failed to parse date in notification message:', error);
    }
    
    return dateTimeString;
};

export const translateNotificationMessage = (message) => {
    if (!message) return message;
    
    const currentLang = i18n.language || 'en';
    
    // Pattern 1: "Your appointment request for [date] has been submitted and is pending confirmation."
    const appointmentRequestPattern = /Your appointment request for (.+?) has been submitted and is pending confirmation\.?/i;
    let match = message.match(appointmentRequestPattern);
    
    if (match) {
        const dateTime = parseAndFormatDate(match[1].trim(), currentLang);
        return i18n.t('notifications.appointmentRequestedMessage', { dateTime });
    }
    
    // Pattern 2: "Your appointment has been confirmed for [date]"
    const appointmentConfirmedPattern = /Your appointment has been confirmed for (.+?)(\.|$)/i;
    match = message.match(appointmentConfirmedPattern);
    
    if (match) {
        let dateTime = match[1].trim();
        dateTime = dateTime.replace(/\.$/, '');
        dateTime = parseAndFormatDate(dateTime, currentLang);
        return i18n.t('notifications.appointmentConfirmedMessage', { dateTime });
    }
    
    // Pattern 3: "You have a new appointment request from [patientName] for [dateTime]."
    // Try multiple variations to catch different message formats
    const patterns = [
        /You have a new appointment request from (.+?) for (.+?)(\.|$)/i,
        /new appointment request from (.+?) for (.+?)(\.|$)/i,
        /appointment request from (.+?) for (.+?)(\.|$)/i,
        /You have a new appointment request from (.+?) for (.+)/i,
        /new appointment request from (.+?) for (.+)/i
    ];
    
    for (const pattern of patterns) {
        match = message.match(pattern);
        if (match && match[1] && match[2]) {
            const patientName = match[1].trim();
            let dateTime = match[2].trim();
            // Remove trailing period if present
            dateTime = dateTime.replace(/\.$/, '');
            dateTime = parseAndFormatDate(dateTime, currentLang);
            return i18n.t('notifications.newAppointmentRequestMessage', { patientName, dateTime });
        }
    }
    
    // Fallback: If message contains key phrases, try to extract manually
    if (message.toLowerCase().includes('new appointment request') && 
        message.toLowerCase().includes('from') && 
        message.toLowerCase().includes('for')) {
        const fromIndex = message.toLowerCase().indexOf('from');
        const forIndex = message.toLowerCase().indexOf('for', fromIndex);
        
        if (fromIndex !== -1 && forIndex !== -1) {
            const patientName = message.substring(fromIndex + 4, forIndex).trim();
            let dateTime = message.substring(forIndex + 3).trim();
            dateTime = dateTime.replace(/\.$/, '');
            dateTime = parseAndFormatDate(dateTime, currentLang);
            return i18n.t('notifications.newAppointmentRequestMessage', { patientName, dateTime });
        }
    }
    
    // Fallback for appointment confirmed: If message contains "confirmed for"
    if (message.toLowerCase().includes('appointment') && 
        message.toLowerCase().includes('confirmed') && 
        message.toLowerCase().includes('for')) {
        const forIndex = message.toLowerCase().indexOf('for');
        if (forIndex !== -1) {
            let dateTime = message.substring(forIndex + 3).trim();
            dateTime = dateTime.replace(/\.$/, '');
            dateTime = parseAndFormatDate(dateTime, currentLang);
            return i18n.t('notifications.appointmentConfirmedMessage', { dateTime });
        }
    }
    
    return message;
};
