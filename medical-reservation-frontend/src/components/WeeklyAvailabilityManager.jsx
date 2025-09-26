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
    const [selectedWeekOffset, setSelectedWeekOffset] = useState(0); // 0 = current week, 1 = next week, etc.
    const [confirmationPopup, setConfirmationPopup] = useState({
        isOpen: false,
        title: '',
        message: '',
        type: 'success'
    });

    // Override alert to use confirmation popup instead
    useEffect(() => {
        const originalAlert = window.alert;
        window.alert = (message) => {
            console.log('🚨 Alert intercepted and converted to popup:', message);
            setConfirmationPopup({
                isOpen: true,
                title: 'System Notice',
                message: String(message),
                type: 'warning'
            });
        };

        console.log('✅ Alert interceptor installed');
        
        return () => {
            console.log('🔄 Alert interceptor removed, restoring original');
            window.alert = originalAlert;
        };
    }, []);

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

    // Reset schedule when week changes
    useEffect(() => {
        // Reset to default schedule when week changes
        const schedule = {};
        daysOfWeek.forEach(day => {
            const defaultStartTime = generateTimeOptions(day.key)[0] || '09:00';
            const defaultEndTime = generateTimeOptions(day.key, true, defaultStartTime)[0] || '17:00';
            
            schedule[day.key] = {
                enabled: false,
                startTime: defaultStartTime,
                endTime: defaultEndTime,
                slotDuration: 30,
                id: null
            };
        });
        setWeekSchedule(schedule);
    }, [selectedWeekOffset]);

    useEffect(() => {
        // Initialize week schedule from existing availabilities
        const schedule = {};
        daysOfWeek.forEach(day => {
            const availability = availabilities.find(av => av.dayOfWeek === day.key);
            const isPast = isPastDay(day.key);
            
            schedule[day.key] = availability && !isPast ? {
                enabled: true,
                startTime: availability.startTime,
                endTime: availability.endTime,
                slotDuration: availability.slotDuration,
                id: availability.id
            } : {
                enabled: false,
                startTime: '09:00',
                endTime: '17:00',
                slotDuration: 30,
                id: isPast ? null : (availability?.id || null)
            };
        });
        setWeekSchedule(schedule);
    }, [availabilities]);

    const handleDayToggle = (dayKey) => {
        setWeekSchedule(prev => ({
            ...prev,
            [dayKey]: {
                ...prev[dayKey],
                enabled: !prev[dayKey].enabled
            }
        }));
    };

    const handleTimeChange = (dayKey, field, value) => {
        setWeekSchedule(prev => ({
            ...prev,
            [dayKey]: {
                ...prev[dayKey],
                [field]: value
            }
        }));
    };

    const validateSchedule = () => {
        const now = new Date();
        const currentTime = now.toTimeString().slice(0, 5); // HH:MM format
        const currentDayOfWeek = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'][now.getDay()];
        
        for (const [dayKey, schedule] of Object.entries(weekSchedule)) {
            // Skip validation for past days
            if (isPastDay(dayKey)) {
                continue;
            }
            
            if (schedule.enabled) {
                if (schedule.startTime >= schedule.endTime) {
                    throw new Error(`${daysOfWeek.find(d => d.key === dayKey).label}: Start time must be before end time`);
                }
                
                // No need to validate past times since dropdown only shows valid options
                
                const startMinutes = timeToMinutes(schedule.startTime);
                const endMinutes = timeToMinutes(schedule.endTime);
                const duration = endMinutes - startMinutes;
                
                if (duration < schedule.slotDuration) {
                    throw new Error(`${daysOfWeek.find(d => d.key === dayKey).label}: Working hours too short for slot duration`);
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

    const generateTimeOptions = (dayKey, isEndTime = false, startTime = null) => {
        const options = [];
        const today = new Date();
        const currentDayOfWeek = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'][today.getDay()];
        const isToday = selectedWeekOffset === 0 && dayKey === currentDayOfWeek;
        
        // Start from earliest hour (6 AM) to latest hour (11 PM)
        let startHour = 6;
        let startMinute = 0;
        
        if (isToday && !isEndTime) {
            // For today's start time, start from next available slot after current time
            const currentHour = today.getHours();
            const currentMinute = today.getMinutes();
            
            // Round up to next 30-minute slot
            if (currentMinute <= 30) {
                startHour = currentHour;
                startMinute = 30;
            } else {
                startHour = currentHour + 1;
                startMinute = 0;
            }
            
            // If it's too late in the day (after 11 PM), no slots available
            if (startHour >= 23) {
                return [];
            }
        } else if (isEndTime && startTime) {
            // For end time, start from 30 minutes after start time
            const [startHours, startMinutes] = startTime.split(':').map(Number);
            const startTotalMinutes = startHours * 60 + startMinutes + 30; // Add 30 minutes minimum
            startHour = Math.floor(startTotalMinutes / 60);
            startMinute = startTotalMinutes % 60;
        }
        
        // Generate 30-minute slots
        for (let hour = startHour; hour <= 23; hour++) {
            for (let minute = (hour === startHour ? startMinute : 0); minute < 60; minute += 30) {
                const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
                options.push(timeString);
            }
        }
        
        return options;
    };

    const handleSave = async () => {
        try {
            setSaving(true);
            
            // Validate schedule and show popup if validation fails
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
                // Skip past days completely
                if (isPastDay(dayKey)) {
                    continue;
                }
                
                if (schedule.enabled) {
                    // Create or update availability
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
                    // Delete existing availability
                    promises.push(deleteAvailabilityForDay(dayKey));
                }
            }
            
            await Promise.all(promises);
            
            // Generate schedule slots for the selected week
            try {
                const { startOfSelectedWeek, endOfSelectedWeek } = getSelectedWeekDates();
                let startDate = startOfSelectedWeek;
                
                // For current week, start from today
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
                // Don't fail the whole operation if slot generation fails
                showConfirmation(
                    'Availability Saved with Warning',
                    'Your availability has been saved, but there was an issue generating schedule slots for this week. You may need to generate them manually.',
                    'warning'
                );
                return; 
            }
            
            // Show success confirmation
            showConfirmation(
                'Availability Saved Successfully! 🎉',
                'Your availability has been saved and schedule slots have been generated.',
                'success'
            );
            
            // Close after a short delay to show the confirmation
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
        const diff = today.getDate() - day + (day === 0 ? -6 : 1); // Monday
        startOfSelectedWeek.setDate(diff + (selectedWeekOffset * 7));
        
        const endOfSelectedWeek = new Date(startOfSelectedWeek);
        endOfSelectedWeek.setDate(startOfSelectedWeek.getDate() + 6);
        
        return { startOfSelectedWeek, endOfSelectedWeek };
    };

    const isPastDay = (dayKey) => {
        // If we're looking at future weeks, no days are past
        if (selectedWeekOffset > 0) {
            return false;
        }
        
        // For current week, check if day is in the past
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
        
        // Only show "Today" for current week
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

    // Add error handling for missing doctorId
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

                {/* Week Navigation */}
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
                        disabled={selectedWeekOffset >= 4} // Limit to 4 weeks ahead
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
                                            onChange={() => handleDayToggle(day.key)}
                                            style={{
                                                width: '18px',
                                                height: '18px',
                                                accentColor: '#15803d'
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
                                                value={daySchedule.startTime || generateTimeOptions(day.key)[0] || '09:00'}
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
                                                {generateTimeOptions(day.key).map(time => (
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
                                                value={daySchedule.endTime || generateTimeOptions(day.key, true, daySchedule.startTime)[0] || '17:00'}
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
                                                {generateTimeOptions(day.key, true, daySchedule.startTime).map(time => (
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
