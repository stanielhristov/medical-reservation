import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useAvailability } from '../hooks/useAvailability';
import { generateScheduleFromAvailability } from '../api/schedule';
import WeeklySlotDisplay from './WeeklySlotDisplay';
import ConfirmationPopup from './ConfirmationPopup';

const WeeklyAvailabilityManager = ({ doctorId, onClose, onSave }) => {
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

    const [deleteConfirmation, setDeleteConfirmation] = useState({
        isOpen: false,
        dayKey: null,
        dayLabel: ''
    });

    const [pendingToggle, setPendingToggle] = useState(null);

    const daysOfWeek = [
        { key: 'MONDAY', label: 'Monday' },
        { key: 'TUESDAY', label: 'Tuesday' },
        { key: 'WEDNESDAY', label: 'Wednesday' },
        { key: 'THURSDAY', label: 'Thursday' },
        { key: 'FRIDAY', label: 'Friday' },
        { key: 'SATURDAY', label: 'Saturday' },
        { key: 'SUNDAY', label: 'Sunday' }
    ];

    const slotDurationOptions = [
        { value: 15, label: '15 minutes' },
        { value: 30, label: '30 minutes' },
        { value: 45, label: '45 minutes' },
        { value: 60, label: '60 minutes' }
    ];

    useEffect(() => {
        if (doctorId) {
            fetchAvailabilities();
        }
    }, [doctorId, fetchAvailabilities]);

    useEffect(() => {
        const schedule = {};
        daysOfWeek.forEach(day => {
            const defaultStartTime = generateTimeOptions(day.key, false, null, 30)[0] || '09:00';
            const endTimeOptions = generateTimeOptions(day.key, true, defaultStartTime, 30);
            
            const startMinutes = timeToMinutes(defaultStartTime);
            let finalEndTime;
            
            if (endTimeOptions.length > 0) {
                finalEndTime = endTimeOptions[0];
                const endMinutes = timeToMinutes(finalEndTime);
                if (endMinutes <= startMinutes) {
                    finalEndTime = minutesToTime(startMinutes + 30);
                }
            } else {
                finalEndTime = minutesToTime(startMinutes + 30);
            }
            
            const endMinutes = timeToMinutes(finalEndTime);
            if (endMinutes > 23 * 60 + 30) {
                finalEndTime = '23:30';
            }
            
            schedule[day.key] = {
                enabled: false,
                startTime: defaultStartTime,
                endTime: finalEndTime,
                slotDuration: 30,
                id: null
            };
        });
        setWeekSchedule(schedule);
    }, [selectedWeekOffset]);

    useEffect(() => {
        const schedule = {};
        daysOfWeek.forEach(day => {
            const availability = availabilities.find(av => av.dayOfWeek === day.key);
            const isPast = isPastDay(day.key);
            
            if (availability && !isPast) {
                schedule[day.key] = {
                    enabled: true,
                    startTime: availability.startTime,
                    endTime: availability.endTime,
                    slotDuration: availability.slotDuration,
                    id: availability.id
                };
            } else {
                const defaultStartTime = generateTimeOptions(day.key, false, null, 30)[0] || '09:00';
                const endTimeOptions = generateTimeOptions(day.key, true, defaultStartTime, 30);
                const startMinutes = timeToMinutes(defaultStartTime);
                let finalEndTime;
                
                if (endTimeOptions.length > 0) {
                    finalEndTime = endTimeOptions[0];
                    const endMinutes = timeToMinutes(finalEndTime);
                    if (endMinutes <= startMinutes) {
                        finalEndTime = minutesToTime(startMinutes + 30);
                    }
                } else {
                    finalEndTime = minutesToTime(startMinutes + 30);
                }

                const endMinutes = timeToMinutes(finalEndTime);
                if (endMinutes > 23 * 60 + 30) {
                    finalEndTime = '23:30';
                }
                schedule[day.key] = {
                    enabled: false,
                    startTime: defaultStartTime,
                    endTime: finalEndTime,
                    slotDuration: 30,
                    id: isPast ? null : (availability?.id || null)
                };
            }
        });
        setWeekSchedule(schedule);
    }, [availabilities]);


    const performDayToggle = (dayKey, willBeEnabled) => {
        setWeekSchedule(prev => {
            const currentSchedule = prev[dayKey];
            
            if (willBeEnabled) {
                const currentStartTime = currentSchedule.startTime || generateTimeOptions(dayKey, false, null, currentSchedule.slotDuration || 30)[0] || '09:00';
                const endTimeOptions = generateTimeOptions(dayKey, true, currentStartTime, currentSchedule.slotDuration || 30);
                const validEndTime = endTimeOptions.length > 0 ? endTimeOptions[0] : '17:00';
                
                const startMinutes = timeToMinutes(currentStartTime);
                const endMinutes = timeToMinutes(validEndTime);
                const finalEndTime = endMinutes <= startMinutes ? 
                    minutesToTime(startMinutes + (currentSchedule.slotDuration || 30)) : validEndTime;
                
                return {
                    ...prev,
                    [dayKey]: {
                        ...currentSchedule,
                        enabled: true,
                        startTime: currentStartTime,
                        endTime: finalEndTime
                    }
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

    const handleDeleteConfirm = () => {
        const { dayKey } = deleteConfirmation;
        performDayToggle(dayKey, false);
        setDeleteConfirmation({ isOpen: false, dayKey: null, dayLabel: '' });
        setPendingToggle(null);
    };

    const handleDeleteCancel = () => {
        setDeleteConfirmation({ isOpen: false, dayKey: null, dayLabel: '' });
        setPendingToggle(null);
    };

    const handleTimeChange = (dayKey, field, value) => {
        setWeekSchedule(prev => {
            const updatedSchedule = {
                ...prev[dayKey],
                [field]: value
            };
            
            if (field === 'startTime' || field === 'slotDuration') {
                const currentStartTime = field === 'startTime' ? value : updatedSchedule.startTime;
                const currentSlotDuration = field === 'slotDuration' ? value : updatedSchedule.slotDuration || 30;
                
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
                
                if (duration < schedule.slotDuration) {
                    throw new Error(`${daysOfWeek.find(d => d.key === dayKey).label}: Working hours (${Math.floor(duration/60)}h ${duration%60}m) too short for ${schedule.slotDuration}-minute slots. Minimum required: ${schedule.slotDuration} minutes.`);
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
                        slotDuration: schedule.slotDuration
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
            return `${daysOfWeek.find(d => d.key === dayKey).label} (Today)`;
        }
        return daysOfWeek.find(d => d.key === dayKey).label;
    };

    const getCurrentWeekRange = () => {
        try {
            const { startOfSelectedWeek, endOfSelectedWeek } = getSelectedWeekDates();
            
            const formatDate = (date) => {
                return date.toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric' 
                });
            };
            
            const weekLabel = selectedWeekOffset === 0 ? 'Current Week' : 
                             selectedWeekOffset === 1 ? 'Next Week' : 
                             `Week +${selectedWeekOffset}`;
            
            return `${weekLabel}: ${formatDate(startOfSelectedWeek)} - ${formatDate(endOfSelectedWeek)}`;
        } catch (err) {
            console.error('Error calculating week range:', err);
            return 'Selected Week';
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
                        🗓️ Weekly Availability Manager
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
                        onClick={() => setSelectedWeekOffset(Math.max(0, selectedWeekOffset - 1))}
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
                        ← Previous Week
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
                        onClick={() => setSelectedWeekOffset(selectedWeekOffset + 1)}
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
                        Next Week →
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
                        <strong>Error:</strong> {error}
                        {error.includes('Access denied') && (
                            <div style={{ marginTop: '0.5rem', fontSize: '0.9em' }}>
                                Make sure you are logged in with a doctor account.
                            </div>
                        )}
                    </div>
                )}

                <div style={{ marginBottom: '2rem' }}>
                    <p style={{ color: '#666', margin: '0 0 1rem 0' }}>
                        Configure your available time slots for the selected week. Use the navigation above to choose different weeks.
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
                                        <input
                                            type="checkbox"
                                            checked={daySchedule.enabled || false}
                                            readOnly
                                            onClick={(e) => {
                                                e.preventDefault();
                                                
                                                const currentSchedule = weekSchedule[day.key];
                                                const willBeEnabled = !currentSchedule.enabled;
                                                
                                                if (!willBeEnabled && currentSchedule.enabled) {
                                                    const dayLabel = daysOfWeek.find(d => d.key === day.key)?.label || day.key;
                                                    setPendingToggle(day.key);
                                                    setDeleteConfirmation({
                                                        isOpen: true,
                                                        dayKey: day.key,
                                                        dayLabel: dayLabel
                                                    });
                                                    return;
                                                }
                                                
                                                if (willBeEnabled) {
                                                    performDayToggle(day.key, willBeEnabled);
                                                }
                                            }}
                                            style={{
                                                width: '18px',
                                                height: '18px',
                                                accentColor: '#15803d',
                                                cursor: 'pointer'
                                            }}
                                        />
                                        {getDayDisplayLabel(day.key)}
                                    </label>
                                    
                                    {!daySchedule.enabled && (
                                        <span style={{ color: '#9ca3af', fontStyle: 'italic' }}>
                                            Not available
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
                                                Start Time
                                            </label>
                                            <select
                                                value={daySchedule.startTime || generateTimeOptions(day.key, false, null, daySchedule.slotDuration || 30)[0] || '09:00'}
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
                                                {generateTimeOptions(day.key, false, null, daySchedule.slotDuration || 30).map(time => (
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
                                                End Time
                                            </label>
                                            <select
                                                value={(() => {
                                                    const currentStartTime = daySchedule.startTime || generateTimeOptions(day.key, false, null, daySchedule.slotDuration || 30)[0] || '09:00';
                                                    const endTimeOptions = generateTimeOptions(day.key, true, currentStartTime, daySchedule.slotDuration || 30);
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
                                                    const currentStartTime = daySchedule.startTime || generateTimeOptions(day.key, false, null, daySchedule.slotDuration || 30)[0] || '09:00';
                                                    return generateTimeOptions(day.key, true, currentStartTime, daySchedule.slotDuration || 30);
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
                                                Slot Duration
                                            </label>
                                            <select
                                                value={daySchedule.slotDuration || 30}
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
                        📋 View Generated Slots
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
                            Cancel
                        </button>
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                try {
                                    handleSave();
                                } catch (error) {
                                    console.error('Error in handleSave:', error);
                                    showConfirmation(
                                        'Unexpected Error ❌',
                                        'An unexpected error occurred. Please try again.',
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
                            {saving ? 'Saving...' : 'Save Week Slots'}
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

            {deleteConfirmation.isOpen && (
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
                    zIndex: 10000
                }}>
                    <div style={{
                        background: 'white',
                        borderRadius: '16px',
                        padding: '2rem',
                        maxWidth: '400px',
                        width: '90%',
                        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
                        textAlign: 'center'
                    }}>
                        <div style={{
                            fontSize: '3rem',
                            marginBottom: '1rem'
                        }}>
                            🗑️
                        </div>
                        
                        <h3 style={{
                            margin: '0 0 1rem 0',
                            color: '#dc2626',
                            fontSize: '1.25rem',
                            fontWeight: '600'
                        }}>
                            Delete Availability Slot
                        </h3>
                        
                        <p style={{
                            margin: '0 0 2rem 0',
                            color: '#374151',
                            lineHeight: '1.5'
                        }}>
                            Are you sure you want to delete the availability slot for <strong>{deleteConfirmation.dayLabel}</strong>? 
                            This will remove all scheduled appointments for this day and cannot be undone.
                        </p>
                        
                        <div style={{
                            display: 'flex',
                            gap: '1rem',
                            justifyContent: 'center'
                        }}>
                            <button
                                onClick={handleDeleteCancel}
                                style={{
                                    padding: '0.75rem 1.5rem',
                                    border: '1px solid #d1d5db',
                                    borderRadius: '8px',
                                    background: 'white',
                                    color: '#374151',
                                    cursor: 'pointer',
                                    fontSize: '1rem',
                                    fontWeight: '500',
                                    transition: 'all 0.2s ease'
                                }}
                                onMouseOver={(e) => {
                                    e.target.style.background = '#f9fafb';
                                }}
                                onMouseOut={(e) => {
                                    e.target.style.background = 'white';
                                }}
                            >
                                Cancel
                            </button>
                            
                            <button
                                onClick={handleDeleteConfirm}
                                style={{
                                    padding: '0.75rem 1.5rem',
                                    border: 'none',
                                    borderRadius: '8px',
                                    background: '#dc2626',
                                    color: 'white',
                                    cursor: 'pointer',
                                    fontSize: '1rem',
                                    fontWeight: '500',
                                    transition: 'all 0.2s ease'
                                }}
                                onMouseOver={(e) => {
                                    e.target.style.background = '#b91c1c';
                                }}
                                onMouseOut={(e) => {
                                    e.target.style.background = '#dc2626';
                                }}
                            >
                                Delete
                            </button>
                        </div>
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
    
    return createPortal(modalContent, document.body);
};

export default WeeklyAvailabilityManager;
