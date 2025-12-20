import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import { useAvailability } from '../hooks/useAvailability';
import { generateScheduleFromAvailability } from '../api/schedule';
import WeeklySlotDisplay from './WeeklySlotDisplay';
import ConfirmationPopup from './ConfirmationPopup';

const WeeklyAvailabilityManager = ({ doctorId, onClose, onSave }) => {
    const { t, i18n } = useTranslation();
    const {
        availabilities,
        loading,
        error,
        fetchAvailabilities,
        createAvailability,
        updateAvailability,
        deleteAvailabilityForDay
    } = useAvailability(doctorId);

    const [weekSchedule, setWeekSchedule] = useState({});
    const [saving, setSaving] = useState(false);
    const [showSlotDisplay, setShowSlotDisplay] = useState(false);
    const [selectedWeekOffset, setSelectedWeekOffset] = useState(0); 
    const [confirmationPopup, setConfirmationPopup] = useState({
        isOpen: false,
        title: '',
        message: '',
        type: 'success'
    });
    
    const manualChangesRef = useRef(new Set());
    const initialLoadRef = useRef(true);
    
    const [globalSlotDuration, setGlobalSlotDuration] = useState(() => {
        const saved = localStorage.getItem('weeklyAvailabilitySlotDuration');
        return saved ? parseInt(saved, 10) : 30;
    });

    const daysOfWeek = [
        { key: 'MONDAY', label: t('schedule.monday') },
        { key: 'TUESDAY', label: t('schedule.tuesday') },
        { key: 'WEDNESDAY', label: t('schedule.wednesday') },
        { key: 'THURSDAY', label: t('schedule.thursday') },
        { key: 'FRIDAY', label: t('schedule.friday') },
        { key: 'SATURDAY', label: t('schedule.saturday') },
        { key: 'SUNDAY', label: t('schedule.sunday') }
    ];

    const slotDurationOptions = [
        { value: 15, label: `15 ${t('schedule.minutes')}` },
        { value: 30, label: `30 ${t('schedule.minutes')}` },
        { value: 45, label: `45 ${t('schedule.minutes')}` },
        { value: 60, label: `60 ${t('schedule.minutes')}` }
    ];

    useEffect(() => {
        if (doctorId) {
            fetchAvailabilities();
        }
    }, [doctorId, fetchAvailabilities]);

    useEffect(() => {
        localStorage.setItem('weeklyAvailabilitySlotDuration', globalSlotDuration.toString());
    }, [globalSlotDuration]);

    const getTodayDefaultStartTime = () => {
        const now = new Date();
        const currentMinutes = now.getHours() * 60 + now.getMinutes();
        
        const roundedMinutes = Math.ceil(currentMinutes / 30) * 30;
        
        return minutesToTime(roundedMinutes);
    };

    useEffect(() => {
        setWeekSchedule(prevSchedule => {
            const schedule = {};
            const today = new Date();
            const currentDayOfWeek = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'][today.getDay()];
            
            daysOfWeek.forEach(day => {
                const availability = availabilities.find(av => av.dayOfWeek === day.key);
                const isPast = isPastDay(day.key);
                const hasManualChanges = manualChangesRef.current.has(day.key);
                const isToday = selectedWeekOffset === 0 && day.key === currentDayOfWeek;
                
                if (hasManualChanges && !initialLoadRef.current && prevSchedule[day.key]) {
                    schedule[day.key] = {
                        ...prevSchedule[day.key],
                        slotDuration: globalSlotDuration
                    };
                    return;
                }
                
                if (availability && !isPast) {
                    schedule[day.key] = {
                        enabled: isToday, 
                        startTime: isToday ? getTodayDefaultStartTime() : '08:00',
                        endTime: isToday ? minutesToTime(timeToMinutes(getTodayDefaultStartTime()) + globalSlotDuration) : '08:30',
                        slotDuration: globalSlotDuration,
                        id: availability.id
                    };
                } else {
                    const defaultStartTime = isToday ? getTodayDefaultStartTime() : '08:00';
                    const defaultEndTime = minutesToTime(timeToMinutes(defaultStartTime) + globalSlotDuration);
                    
                    schedule[day.key] = {
                        enabled: isToday, 
                        startTime: defaultStartTime,
                        endTime: defaultEndTime,
                        slotDuration: globalSlotDuration,
                        id: isPast ? null : (availability?.id || null)
                    };
                }
            });
            
            initialLoadRef.current = false;
            return schedule;
        });
    }, [availabilities, selectedWeekOffset, globalSlotDuration]);

    const performDayToggle = (dayKey, willBeEnabled) => {
        manualChangesRef.current.add(dayKey);
        
        setWeekSchedule(prev => {
            const currentSchedule = prev[dayKey] || {};
            
            if (willBeEnabled) {
                const today = new Date();
                const currentDayOfWeek = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'][today.getDay()];
                const isToday = selectedWeekOffset === 0 && dayKey === currentDayOfWeek;
                
                const defaultStartTime = isToday ? getTodayDefaultStartTime() : '08:00';
                const currentStartTime = currentSchedule.startTime || defaultStartTime;
                const endTimeOptions = generateTimeOptions(dayKey, true, currentStartTime, globalSlotDuration);
                const validEndTime = endTimeOptions.length > 0 ? endTimeOptions[0] : minutesToTime(timeToMinutes(currentStartTime) + globalSlotDuration);
                
                const startMinutes = timeToMinutes(currentStartTime);
                const endMinutes = timeToMinutes(validEndTime);
                const finalEndTime = endMinutes <= startMinutes ? 
                    minutesToTime(startMinutes + globalSlotDuration) : validEndTime;
                
                const updatedSchedule = {
                    ...currentSchedule,
                    enabled: true,
                    startTime: currentStartTime,
                    endTime: finalEndTime,
                    slotDuration: globalSlotDuration
                };
                
                return {
                    ...prev,
                    [dayKey]: updatedSchedule
                };
            }
            
            return {
                ...prev,
                [dayKey]: {
                    ...currentSchedule,
                    enabled: false
                }
            };
        });
    };

    const handleTimeChange = (dayKey, field, value) => {
        if (field === 'slotDuration') {

            setGlobalSlotDuration(value);
            
            setWeekSchedule(prev => {
                const newSchedule = { ...prev };
                
                Object.keys(newSchedule).forEach(key => {
                    if (newSchedule[key].enabled) {
                        const startMinutes = timeToMinutes(newSchedule[key].startTime);
                        const newEndTime = minutesToTime(startMinutes + value);
                        
                        newSchedule[key] = {
                            ...newSchedule[key],
                            slotDuration: value,
                            endTime: newEndTime
                        };
                    }
                });
                
                return newSchedule;
            });
        } else {
            setWeekSchedule(prev => {
                const updatedSchedule = {
                    ...prev[dayKey],
                    [field]: value
                };
                
                if (field === 'startTime') {
                    const currentStartTime = value;
                    const currentSlotDuration = globalSlotDuration;
                    
                    const endTimeOptions = generateTimeOptions(dayKey, true, currentStartTime, currentSlotDuration);
                    const currentEndTime = updatedSchedule.endTime;
                    const startMinutes = timeToMinutes(currentStartTime);
                    const endMinutes = timeToMinutes(currentEndTime);   
                    if (endMinutes < startMinutes + currentSlotDuration && endTimeOptions.length > 0) {
                        updatedSchedule.endTime = endTimeOptions[0];
                    }
                }
                
                return {
                    ...prev,
                    [dayKey]: updatedSchedule
                };
            });
        }
    };

    const validateSchedule = () => {
        const now = new Date();
        const currentTime = now.toTimeString().slice(0, 5);
        const currentDayOfWeek = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'][now.getDay()];
        
        for (const [dayKey, schedule] of Object.entries(weekSchedule)) {
            if (isPastDay(dayKey)) {
                continue;
            }
            
            if (schedule.enabled) {
                const startMinutes = timeToMinutes(schedule.startTime);
                const endMinutes = timeToMinutes(schedule.endTime);
                
                if (startMinutes >= endMinutes) {
                    throw new Error(`${daysOfWeek.find(d => d.key === dayKey).label}: Start time must be before end time`);
                }
                   
                const duration = endMinutes - startMinutes;
                
                if (duration < globalSlotDuration) {
                    throw new Error(`${daysOfWeek.find(d => d.key === dayKey).label}: Working hours (${Math.floor(duration/60)}h ${duration%60}m) too short for ${globalSlotDuration}-minute slots. Minimum required: ${globalSlotDuration} minutes.`);
                }
            }
        }
    };

    const showConfirmation = (title, message, type = 'success') => {
        setConfirmationPopup({
            isOpen: true,
            title,
            message,
            type
        });
    };

    const timeToMinutes = (timeStr) => {
        const [hours, minutes] = timeStr.split(':').map(Number);
        return hours * 60 + minutes;
    };

    const minutesToTime = (totalMinutes) => {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    };

    const generateTimeOptions = (dayKey, isEndTime = false, startTime = null, slotDuration = 30) => {
        const options = [];
        const today = new Date();
        const currentDayOfWeek = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'][today.getDay()];
        const isToday = selectedWeekOffset === 0 && dayKey === currentDayOfWeek;
        
        let startHour = 6;
        let startMinute = 0;
        
        if (isToday && !isEndTime) {
            const currentHour = today.getHours();
            const currentMinute = today.getMinutes();
            
            const slotMinutes = Math.ceil((currentMinute + 1) / slotDuration) * slotDuration;
            if (slotMinutes >= 60) {
                startHour = currentHour + 1;
                startMinute = 0;
            } else {
                startHour = currentHour;
                startMinute = slotMinutes;
            }
            
            if (startHour >= 23) {
                return [];
            }
        } else if (isEndTime && startTime) {
            const [startHours, startMinutes] = startTime.split(':').map(Number);
            const startTotalMinutes = startHours * 60 + startMinutes + slotDuration; 
            startHour = Math.floor(startTotalMinutes / 60);
            startMinute = startTotalMinutes % 60;
            
            if (startHour >= 24) {
                return [];
            }
            
            if (isToday) {
                const currentHour = today.getHours();
                const currentMinute = today.getMinutes();
                const currentTotalMinutes = currentHour * 60 + currentMinute;
                const calculatedEndMinutes = startHour * 60 + startMinute;
                
                if (calculatedEndMinutes <= currentTotalMinutes) {
                    const adjustedMinutes = Math.ceil((currentMinute + 1) / slotDuration) * slotDuration;
                    if (adjustedMinutes >= 60) {
                        startHour = currentHour + 1;
                        startMinute = 0;
                    } else {
                        startHour = currentHour;
                        startMinute = adjustedMinutes;
                    }
                    
                    if (startHour >= 24) {
                        return [];
                    }
                }
            }
        }
        
        for (let hour = startHour; hour <= 23; hour++) {
            for (let minute = (hour === startHour ? startMinute : 0); minute < 60; minute += slotDuration) {
                const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
                options.push(timeString);
            }
        }
        
        return options;
    };

    const handleSave = async () => {
        try {
            setSaving(true);
        
            try {
                validateSchedule();
            } catch (validationError) {
                showConfirmation(
                    'Validation Error ⚠️',
                    validationError.message,
                    'error'
                );
                setSaving(false);
                return;
            }
            
            const promises = [];
            
            for (const [dayKey, schedule] of Object.entries(weekSchedule)) {
                if (isPastDay(dayKey)) {
                    continue;
                }
                
                if (schedule.enabled) {
                    const availabilityData = {
                        dayOfWeek: dayKey,
                        startTime: schedule.startTime,
                        endTime: schedule.endTime,
                        slotDuration: globalSlotDuration
                    };
                    
                    if (schedule.id) {
                        promises.push(updateAvailability(schedule.id, availabilityData));
                    } else {
                        promises.push(createAvailability(availabilityData));
                    }
                } else if (schedule.id) {
                    promises.push(deleteAvailabilityForDay(dayKey));
                }
            }
            
            await Promise.all(promises);
            
            try {
                const { startOfSelectedWeek, endOfSelectedWeek } = getSelectedWeekDates();
                let startDate = startOfSelectedWeek;
                
                if (selectedWeekOffset === 0) {
                    const today = new Date();
                    startDate = today > startOfSelectedWeek ? today : startOfSelectedWeek;
                }
                
                await generateScheduleFromAvailability(
                    doctorId,
                    startDate.toISOString().split('T')[0],
                    endOfSelectedWeek.toISOString().split('T')[0]
                );
                
                console.log('Successfully generated schedule slots for selected week');
            } catch (slotGenerationErr) {
                console.error('Error generating schedule slots:', slotGenerationErr);
                showConfirmation(
                    'Availability Saved with Warning',
                    'Your availability has been saved, but there was an issue generating schedule slots for this week. You may need to generate them manually.',
                    'warning'
                );
                return; 
            }
            
            showConfirmation(
                'Availability Saved Successfully! 🎉',
                'Your availability has been saved and schedule slots have been generated.',
                'success'
            );
            
            manualChangesRef.current.clear();
            
            setTimeout(() => {
                onSave?.();
                onClose?.();
            }, 1500);
        } catch (err) {
            console.error('Error saving availability:', err);
            showConfirmation(
                'Error Saving Availability ❌',
                err.message || 'Failed to save availability. Please try again.',
                'error'
            );
        } finally {
            setSaving(false);
        }
    };

    const getDayColor = (dayKey) => {
        return weekSchedule[dayKey]?.enabled ? '#15803d' : '#9ca3af';
    };

    const getSelectedWeekDates = () => {
        const today = new Date();
        const startOfSelectedWeek = new Date(today);
        const day = today.getDay();
        const diff = today.getDate() - day + (day === 0 ? -6 : 1);
        startOfSelectedWeek.setDate(diff + (selectedWeekOffset * 7));
        
        const endOfSelectedWeek = new Date(startOfSelectedWeek);
        endOfSelectedWeek.setDate(startOfSelectedWeek.getDate() + 6);
        
        return { startOfSelectedWeek, endOfSelectedWeek };
    };

    const isPastDay = (dayKey) => {
        if (selectedWeekOffset > 0) {
            return false;
        }
        
        const today = new Date();
        const currentDayOfWeek = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'][today.getDay()];
        
        const dayOrder = {
            'MONDAY': 1,
            'TUESDAY': 2,
            'WEDNESDAY': 3,
            'THURSDAY': 4,
            'FRIDAY': 5,
            'SATURDAY': 6,
            'SUNDAY': 7
        };
        
        return dayOrder[dayKey] < dayOrder[currentDayOfWeek];
    };

    const getDayDisplayLabel = (dayKey) => {
        const today = new Date();
        const currentDayOfWeek = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'][today.getDay()];
        
        if (selectedWeekOffset === 0 && dayKey === currentDayOfWeek) {
            return `${daysOfWeek.find(d => d.key === dayKey).label} (${t('schedule.today')})`;
        }
        return daysOfWeek.find(d => d.key === dayKey).label;
    };

    const getCurrentWeekRange = () => {
        try {
            const { startOfSelectedWeek, endOfSelectedWeek } = getSelectedWeekDates();
            
            const locale = i18n.language === 'bg' ? 'bg-BG' : 'en-US';
            const formatDate = (date) => {
                return date.toLocaleDateString(locale, { 
                    month: 'short', 
                    day: 'numeric' 
                });
            };
            
            const weekLabel = selectedWeekOffset === 0 ? t('schedule.currentWeek') : 
                             selectedWeekOffset === 1 ? t('schedule.nextWeek') : 
                             `${t('schedule.week')} +${selectedWeekOffset}`;
            
            return `${weekLabel}: ${formatDate(startOfSelectedWeek)} - ${formatDate(endOfSelectedWeek)}`;
        } catch (err) {
            console.error('Error calculating week range:', err);
            return t('schedule.week');
        }
    };

    if (loading) {
        return (
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 1000
            }}>
                <div style={{
                    background: 'white',
                    borderRadius: '12px',
                    padding: '2rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem'
                }}>
                    <div style={{
                        width: '24px',
                        height: '24px',
                        border: '3px solid #f3f3f3',
                        borderTop: '3px solid #15803d',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite'
                    }} />
                    <span>Loading availability... (doctorId: {doctorId})</span>
                </div>
            </div>
        );
    }
    if (!doctorId) {
        return (
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 1000
            }}>
                <div style={{
                    background: 'white',
                    borderRadius: '12px',
                    padding: '2rem',
                    textAlign: 'center'
                }}>
                    <h3 style={{ color: '#dc2626', marginBottom: '1rem' }}>Error</h3>
                    <p style={{ marginBottom: '1rem' }}>Doctor ID is missing. Please try again.</p>
                    <button
                        onClick={onClose}
                        style={{
                            padding: '0.5rem 1rem',
                            background: '#dc2626',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        Close
                    </button>
                </div>
            </div>
        );
    }

    const modalContent = (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999,
            padding: '1rem'
        }}>
            <div style={{
                background: 'white',
                borderRadius: '16px',
                padding: '2rem',
                maxWidth: '800px',
                width: '100%',
                maxHeight: '90vh',
                overflow: 'auto',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
            }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '2rem',
                    borderBottom: '2px solid #f0f0f0',
                    paddingBottom: '1rem'
                }}>
                    <h2 style={{
                        margin: 0,
                        color: '#15803d',
                        fontSize: '1.5rem',
                        fontWeight: '600'
                    }}>
                        🗓️ {t('schedule.weeklyAvailabilityManager')}
                    </h2>
                    <button
                        onClick={onClose}
                        style={{
                            background: 'none',
                            border: 'none',
                            fontSize: '1.5rem',
                            cursor: 'pointer',
                            color: '#666',
                            padding: '0.5rem'
                        }}
                    >
                        ✕
                    </button>
                </div>

                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '1rem',
                    marginBottom: '2rem',
                    padding: '1rem',
                    background: '#f8fafc',
                    borderRadius: '12px',
                    border: '1px solid #e2e8f0'
                }}>
                    <button
                        onClick={() => {
                            setSelectedWeekOffset(Math.max(0, selectedWeekOffset - 1));
                            manualChangesRef.current.clear(); 
                        }}
                        disabled={selectedWeekOffset === 0}
                        style={{
                            background: selectedWeekOffset === 0 ? '#e5e7eb' : '#15803d',
                            color: selectedWeekOffset === 0 ? '#9ca3af' : 'white',
                            border: 'none',
                            borderRadius: '8px',
                            padding: '0.75rem 1rem',
                            cursor: selectedWeekOffset === 0 ? 'not-allowed' : 'pointer',
                            fontSize: '0.9rem',
                            fontWeight: '500',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}
                    >
                        ← {t('schedule.previousWeek')}
                    </button>
                    
                    <div style={{
                        fontWeight: '600',
                        color: '#374151',
                        fontSize: '1rem',
                        textAlign: 'center',
                        minWidth: '200px'
                    }}>
                        {getCurrentWeekRange()}
                    </div>
                    
                    <button
                        onClick={() => {
                            setSelectedWeekOffset(selectedWeekOffset + 1);
                            manualChangesRef.current.clear(); 
                        }}
                        disabled={selectedWeekOffset >= 4}
                        style={{
                            background: selectedWeekOffset >= 4 ? '#e5e7eb' : '#15803d',
                            color: selectedWeekOffset >= 4 ? '#9ca3af' : 'white',
                            border: 'none',
                            borderRadius: '8px',
                            padding: '0.75rem 1rem',
                            cursor: selectedWeekOffset >= 4 ? 'not-allowed' : 'pointer',
                            fontSize: '0.9rem',
                            fontWeight: '500',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}
                    >
                        {t('schedule.nextWeek')} →
                    </button>
                </div>

                {error && (
                    <div style={{
                        background: '#fef2f2',
                        border: '1px solid #fecaca',
                        color: '#dc2626',
                        padding: '1rem',
                        borderRadius: '8px',
                        marginBottom: '1rem'
                    }}>
                        <strong>{t('errors.error')}:</strong> {error}
                        {error.includes('Access denied') && (
                            <div style={{ marginTop: '0.5rem', fontSize: '0.9em' }}>
                                {t('errors.makeSureLoggedInDoctor')}
                            </div>
                        )}
                    </div>
                )}

                <div style={{ marginBottom: '2rem' }}>
                    <p style={{ color: '#666', margin: '0 0 1rem 0' }}>
                        {t('schedule.configureWeekSlots')}
                    </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {daysOfWeek.filter(day => !isPastDay(day.key)).map(day => {
                        const daySchedule = weekSchedule[day.key] || {};
                        
                        return (
                            <div key={day.key} style={{
                                border: `2px solid ${getDayColor(day.key)}`,
                                borderRadius: '12px',
                                padding: '1rem',
                                background: daySchedule.enabled ? '#f0fdf4' : '#f9fafb'
                            }}>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '1rem',
                                    marginBottom: daySchedule.enabled ? '1rem' : '0'
                                }}>
                                    <label style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        cursor: 'pointer',
                                        minWidth: '160px',
                                        fontWeight: '600',
                                        color: getDayColor(day.key)
                                    }}>
                                        <div
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                
                                                const willBeEnabled = !daySchedule.enabled;
                                                performDayToggle(day.key, willBeEnabled);
                                            }}
                                            style={{
                                                width: '20px',
                                                height: '20px',
                                                border: '2px solid #15803d',
                                                borderRadius: '4px',
                                                cursor: 'pointer',
                                                marginRight: '0.5rem',
                                                flexShrink: 0,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                backgroundColor: daySchedule.enabled ? '#15803d' : 'white',
                                                transition: 'all 0.2s ease',
                                                position: 'relative'
                                            }}
                                        >
                                            {daySchedule.enabled && (
                                                <svg
                                                    width="12"
                                                    height="12"
                                                    viewBox="0 0 12 12"
                                                    fill="none"
                                                    style={{ color: 'white' }}
                                                >
                                                    <path
                                                        d="M10 3L4.5 8.5L2 6"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg>
                                            )}
                                        </div>
                                        {getDayDisplayLabel(day.key)}
                                    </label>
                                    
                                    {!daySchedule.enabled && (
                                        <span style={{ color: '#9ca3af', fontStyle: 'italic' }}>
                                            {t('schedule.notAvailable')}
                                        </span>
                                    )}
                                </div>

                                {daySchedule.enabled && (
                                    <div style={{
                                        display: 'grid',
                                        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                                        gap: '1rem',
                                        alignItems: 'end'
                                    }}>
                                        <div>
                                            <label style={{
                                                display: 'block',
                                                marginBottom: '0.5rem',
                                                fontSize: '0.9rem',
                                                color: '#374151',
                                                fontWeight: '500'
                                            }}>
                                                {t('schedule.startTime')}
                                            </label>
                                            <select
                                                value={daySchedule.startTime || generateTimeOptions(day.key, false, null, globalSlotDuration)[0] || '08:00'}
                                                onChange={(e) => handleTimeChange(day.key, 'startTime', e.target.value)}
                                                style={{
                                                    width: '100%',
                                                    padding: '0.5rem',
                                                    border: '1px solid #d1d5db',
                                                    borderRadius: '6px',
                                                    fontSize: '1rem',
                                                    background: 'white'
                                                }}
                                            >
                                                {generateTimeOptions(day.key, false, null, globalSlotDuration).map(time => (
                                                    <option key={time} value={time}>
                                                        {time}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div>
                                            <label style={{
                                                display: 'block',
                                                marginBottom: '0.5rem',
                                                fontSize: '0.9rem',
                                                color: '#374151',
                                                fontWeight: '500'
                                            }}>
                                                {t('schedule.endTime')}
                                            </label>
                                            <select
                                                value={(() => {
                                                    const currentStartTime = daySchedule.startTime || generateTimeOptions(day.key, false, null, globalSlotDuration)[0] || '08:00';
                                                    const endTimeOptions = generateTimeOptions(day.key, true, currentStartTime, globalSlotDuration);
                                                    const defaultEndTime = endTimeOptions.length > 0 ? endTimeOptions[0] : '17:00';
                                                    
                                                    if (daySchedule.endTime) {
                                                        const startMinutes = timeToMinutes(currentStartTime);
                                                        const endMinutes = timeToMinutes(daySchedule.endTime);
                                                        if (endMinutes <= startMinutes) {
                                                            return defaultEndTime;
                                                        }
                                                        return daySchedule.endTime;
                                                    }
                                                    return defaultEndTime;
                                                })()}
                                                onChange={(e) => handleTimeChange(day.key, 'endTime', e.target.value)}
                                                style={{
                                                    width: '100%',
                                                    padding: '0.5rem',
                                                    border: '1px solid #d1d5db',
                                                    borderRadius: '6px',
                                                    fontSize: '1rem',
                                                    background: 'white'
                                                }}
                                            >
                                                {(() => {
                                                    const currentStartTime = daySchedule.startTime || generateTimeOptions(day.key, false, null, globalSlotDuration)[0] || '08:00';
                                                    return generateTimeOptions(day.key, true, currentStartTime, globalSlotDuration);
                                                })().map(time => (
                                                    <option key={time} value={time}>
                                                        {time}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div>
                                            <label style={{
                                                display: 'block',
                                                marginBottom: '0.5rem',
                                                fontSize: '0.9rem',
                                                color: '#374151',
                                                fontWeight: '500'
                                            }}>
                                                {t('schedule.slotDuration')}
                                            </label>
                                            <select
                                                value={globalSlotDuration}
                                                onChange={(e) => handleTimeChange(day.key, 'slotDuration', parseInt(e.target.value))}
                                                style={{
                                                    width: '100%',
                                                    padding: '0.5rem',
                                                    border: '1px solid #d1d5db',
                                                    borderRadius: '6px',
                                                    fontSize: '1rem',
                                                    background: 'white'
                                                }}
                                            >
                                                {slotDurationOptions.map(option => (
                                                    <option key={option.value} value={option.value}>
                                                        {option.label}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: '1rem',
                    marginTop: '2rem',
                    paddingTop: '1rem',
                    borderTop: '2px solid #f0f0f0'
                }}>
                    <button
                        onClick={() => setShowSlotDisplay(true)}
                        style={{
                            padding: '0.75rem 1.5rem',
                            border: '1px solid #15803d',
                            borderRadius: '8px',
                            background: 'white',
                            color: '#15803d',
                            cursor: 'pointer',
                            fontSize: '1rem',
                            fontWeight: '500'
                        }}
                    >
                        📋 {t('schedule.viewGeneratedSlots')}
                    </button>
                    
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <button
                            onClick={onClose}
                            style={{
                                padding: '0.75rem 1.5rem',
                                border: '1px solid #d1d5db',
                                borderRadius: '8px',
                                background: 'white',
                                color: '#374151',
                                cursor: 'pointer',
                                fontSize: '1rem',
                                fontWeight: '500'
                            }}
                        >
                            {t('common.cancel')}
                        </button>
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                try {
                                    handleSave();
                                } catch (error) {
                                    console.error('Error in handleSave:', error);
                                    showConfirmation(
                                        t('errors.unexpectedError'),
                                        t('errors.unexpectedErrorOccurred'),
                                        'error'
                                    );
                                }
                            }}
                            disabled={saving}
                            style={{
                                padding: '0.75rem 1.5rem',
                                border: 'none',
                                borderRadius: '8px',
                                background: saving ? '#9ca3af' : '#15803d',
                                color: 'white',
                                cursor: saving ? 'not-allowed' : 'pointer',
                                fontSize: '1rem',
                                fontWeight: '500',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}
                        >
                            {saving && (
                                <div style={{
                                    width: '16px',
                                    height: '16px',
                                    border: '2px solid rgba(255, 255, 255, 0.3)',
                                    borderTop: '2px solid white',
                                    borderRadius: '50%',
                                    animation: 'spin 1s linear infinite'
                                }} />
                            )}
                            {saving ? t('schedule.saving') : t('schedule.saveWeekSlots')}
                        </button>
                    </div>
                </div>
            </div>

            {showSlotDisplay && (
                <WeeklySlotDisplay
                    doctorId={doctorId}
                    weekOffset={selectedWeekOffset}
                    onClose={() => setShowSlotDisplay(false)}
                />
            )}

            <ConfirmationPopup
                isOpen={confirmationPopup.isOpen}
                onClose={() => setConfirmationPopup({ ...confirmationPopup, isOpen: false })}
                title={confirmationPopup.title}
                message={confirmationPopup.message}
                type={confirmationPopup.type}
            />

            <style jsx>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
    
    return createPortal(modalContent, document.body);
};

export default WeeklyAvailabilityManager;
