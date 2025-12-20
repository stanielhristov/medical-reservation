import React from 'react';

export const NOTIFICATION_CATEGORIES = [
    { id: 'all', name: 'All Notifications', icon: 'bell', color: '#22c55e' },
    { id: 'appointments', name: 'Appointments', icon: 'calendar', color: '#22c55e' },
    { id: 'reminders', name: 'Reminders', icon: 'clock', color: '#22c55e' },
    { id: 'health', name: 'Health Updates', icon: 'heart', color: '#22c55e' },
    { id: 'system', name: 'System', icon: 'settings', color: '#22c55e' }
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
    const iconMap = {
        'appointments': (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
        ),
        'reminders': (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12,6 12,12 16,14"/>
            </svg>
        ),
        'health': (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
        ),
        'system': (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3"/>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
            </svg>
        ),
        'all': (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
            </svg>
        )
    };
    
    return iconMap[category] || iconMap['all'];
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

        const dateMatch = dateTimeString.match(/(\w+day), (\w+) (\d+), (\d+) at (\d+):(\d+) (AM|PM)/i);
        if (dateMatch) {
            const [, weekday, month, day, year, hour, minute, period] = dateMatch;

            const monthNames = {
                'january': 0, 'february': 1, 'march': 2, 'april': 3,
                'may': 4, 'june': 5, 'july': 6, 'august': 7,
                'september': 8, 'october': 9, 'november': 10, 'december': 11
            };
            const monthNum = monthNames[month.toLowerCase()];
            if (monthNum === undefined) return dateTimeString;

            let hour24 = parseInt(hour);
            if (period.toUpperCase() === 'PM' && hour24 !== 12) {
                hour24 += 12;
            } else if (period.toUpperCase() === 'AM' && hour24 === 12) {
                hour24 = 0;
            }

            const date = new Date(parseInt(year), monthNum, parseInt(day), hour24, parseInt(minute));

            const bgWeekday = date.toLocaleDateString('bg-BG', { weekday: 'long' });
            const bgMonth = date.toLocaleDateString('bg-BG', { month: 'long' });
            const bgDay = date.getDate();
            const bgYear = date.getFullYear();

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

    const appointmentRequestPattern = /Your appointment request for (.+?) has been submitted and is pending confirmation\.?/i;
    let match = message.match(appointmentRequestPattern);
    
    if (match) {
        const dateTime = parseAndFormatDate(match[1].trim(), currentLang);
        return i18n.t('notifications.appointmentRequestedMessage', { dateTime });
    }

    const appointmentConfirmedPattern = /Your appointment has been confirmed for (.+?)(\.|$)/i;
    match = message.match(appointmentConfirmedPattern);
    
    if (match) {
        let dateTime = match[1].trim();
        dateTime = dateTime.replace(/\.$/, '');
        dateTime = parseAndFormatDate(dateTime, currentLang);
        return i18n.t('notifications.appointmentConfirmedMessage', { dateTime });
    }

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
            
            dateTime = dateTime.replace(/\.$/, '');
            dateTime = parseAndFormatDate(dateTime, currentLang);
            return i18n.t('notifications.newAppointmentRequestMessage', { patientName, dateTime });
        }
    }

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
