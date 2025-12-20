import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { getAvailableSlots } from '../api/schedule';
import { createRescheduleRequest } from '../api/rescheduleRequests';
import { translateAppointmentType } from '../utils/appointmentUtils';
import LoadingSpinner from './LoadingSpinner';

const RescheduleModal = ({ isOpen, onClose, appointment, onSuccess }) => {
    const { t, i18n } = useTranslation();
    const [selectedDate, setSelectedDate] = useState('');
    const [availableSlots, setAvailableSlots] = useState([]);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [reason, setReason] = useState('');
    const [loading, setLoading] = useState(false);
    const [slotsLoading, setSlotsLoading] = useState(false);
    const [datesLoading, setDatesLoading] = useState(false);
    const [availableDates, setAvailableDates] = useState([]);
    const [error, setError] = useState('');

    const getTodayDate = () => {
        const today = new Date();
        return today.toISOString().split('T')[0];
    };

    const getMaxDate = () => {
        const maxDate = new Date();
        maxDate.setDate(maxDate.getDate() + 30);
        return maxDate.toISOString().split('T')[0];
    };

    const getDateRange = () => {
        const dates = [];
        const today = new Date();
        for (let i = 0; i <= 30; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);
            dates.push(date);
        }
        return dates;
    };

    useEffect(() => {
        if (selectedDate && appointment) {
            fetchAvailableSlots();
        }
    }, [selectedDate, appointment]);

    useEffect(() => {
        if (isOpen && appointment) {
            fetchAvailableDates();
        }
    }, [isOpen, appointment]);

    const fetchAvailableDates = async () => {
        if (!appointment?.doctorId) return;
        
        try {
            setDatesLoading(true);
            setError('');
            
            const dateRange = getDateRange();
            const datePromises = dateRange.map(async (date) => {
                try {
                    const startDate = new Date(date);
                    startDate.setHours(0, 0, 0, 0);
                    
                    const endDate = new Date(date);
                    endDate.setHours(23, 59, 59, 999);
                    
                    const slots = await getAvailableSlots(appointment.doctorId, startDate, endDate);
                    const availableSlots = slots.filter(slot => 
                        slot.available && 
                        
                        !(new Date(slot.startTime).getTime() === new Date(appointment.date).getTime())
                    );
                    
                    return {
                        date: date.toISOString().split('T')[0],
                        dateObj: date,
                        hasSlots: availableSlots.length > 0,
                        slotsCount: availableSlots.length
                    };
                } catch (error) {
                    return {
                        date: date.toISOString().split('T')[0],
                        dateObj: date,
                        hasSlots: false,
                        slotsCount: 0
                    };
                }
            });
            
            const results = await Promise.all(datePromises);
            setAvailableDates(results);
            
            if (!selectedDate) {
                const todayString = new Date().toISOString().split('T')[0];
                const todayAvailable = results.find(d => d.date === todayString && d.hasSlots);
                const firstAvailableDate = results.find(d => d.hasSlots);
                
                if (todayAvailable) {
                    setSelectedDate(todayAvailable.date);
                } else if (firstAvailableDate) {
                    setSelectedDate(firstAvailableDate.date);
                }
            }
        } catch (error) {
            console.error('Error fetching available dates:', error);
            setError(t('reschedule.failedToLoadDates'));
        } finally {
            setDatesLoading(false);
        }
    };

    const fetchAvailableSlots = async () => {
        try {
            setSlotsLoading(true);
            setError('');
            setSelectedSlot(null);
            
            const startDate = new Date(selectedDate);
            startDate.setHours(0, 0, 0, 0);
            
            const endDate = new Date(selectedDate);
            endDate.setHours(23, 59, 59, 999);
            
            const slots = await getAvailableSlots(appointment.doctorId, startDate, endDate);
            setAvailableSlots(slots.filter(slot => 
                slot.available && 
                
                !(new Date(slot.startTime).getTime() === new Date(appointment.date).getTime())
            ));
        } catch (error) {
            console.error('Error fetching available slots:', error);
            setError(t('reschedule.failedToLoadSlots'));
            setAvailableSlots([]);
        } finally {
            setSlotsLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedSlot) {
            setError(t('reschedule.selectTimeSlot'));
            return;
        }

        try {
            setLoading(true);
            setError('');
            
            console.log('Creating reschedule request with:', {
                appointmentId: appointment.id,
                selectedSlot: selectedSlot,
                startTime: new Date(selectedSlot.startTime),
                endTime: new Date(selectedSlot.endTime),
                startTimeISO: new Date(selectedSlot.startTime).toISOString(),
                endTimeISO: new Date(selectedSlot.endTime).toISOString(),
                currentTime: new Date().toISOString(),
                reason: reason.trim() || null
            });
            
            await createRescheduleRequest(
                appointment.id,
                new Date(selectedSlot.startTime),
                new Date(selectedSlot.endTime),
                reason.trim() || null
            );
            
            onSuccess && onSuccess();
        
            alert(t('reschedule.requestSubmittedSuccess'));
            
            onClose();
        
            setSelectedDate('');
            setSelectedSlot(null);
            setReason('');
            setAvailableSlots([]);
            setAvailableDates([]);
        } catch (error) {
            console.error('Error creating reschedule request:', error);
            setError(error.message || t('reschedule.failedToSubmitRequest'));
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        if (!loading) {
            onClose();
            
            setSelectedDate('');
            setSelectedSlot(null);
            setReason('');
            setAvailableSlots([]);
            setAvailableDates([]);
            setError('');
        }
    };

    const formatDate = (date) => {
        const locale = i18n.language === 'bg' ? 'bg-BG' : 'en-US';
        return date.toLocaleDateString(locale, {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const formatShortDate = (date) => {
        const today = new Date();
        const isToday = date.toDateString() === today.toDateString();
        const locale = i18n.language === 'bg' ? 'bg-BG' : 'en-US';
        
        if (isToday) {
            return t('appointments.today');
        }
        
        return date.toLocaleDateString(locale, {
            weekday: 'short',
            month: 'short',
            day: 'numeric'
        });
    };

    const formatTime = (dateString) => {
        const locale = i18n.language === 'bg' ? 'bg-BG' : 'en-US';
        return new Date(dateString).toLocaleTimeString(locale, {
            hour: '2-digit',
            minute: '2-digit',
            hour12: i18n.language !== 'bg'
        });
    };

    const formatSlotTime = (startTime, endTime) => {
        const start = new Date(startTime);
        const end = new Date(endTime);
        return `${start.toLocaleTimeString('en-GB', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: false
        })} - ${end.toLocaleTimeString('en-GB', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: false
        })}`;
    };

    if (!isOpen) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '1rem'
        }}>
            <div style={{
                backgroundColor: 'white',
                borderRadius: '24px',
                padding: '2rem',
                maxWidth: '600px',
                width: '100%',
                maxHeight: '90vh',
                overflowY: 'auto',
                boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)'
            }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '2rem'
                }}>
                    <h2 style={{
                        fontSize: '1.8rem',
                        fontWeight: '700',
                        color: '#374151',
                        margin: 0
                    }}>
                        {t('reschedule.rescheduleAppointment')}
                    </h2>
                    <button
                        onClick={handleClose}
                        disabled={loading}
                        style={{
                            background: 'none',
                            border: 'none',
                            fontSize: '1.5rem',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            color: '#9ca3af',
                            padding: '0.5rem'
                        }}
                    >
                        ✕
                    </button>
                </div>

                {appointment && (
                    <div style={{
                        backgroundColor: '#f8fafc',
                        borderRadius: '16px',
                        padding: '1.5rem',
                        marginBottom: '2rem',
                        border: '1px solid #e2e8f0'
                    }}>
                        <h3 style={{
                            fontSize: '1.2rem',
                            fontWeight: '600',
                            color: '#374151',
                            marginBottom: '1rem'
                        }}>
                            {t('reschedule.currentAppointment')}
                        </h3>
                        <div style={{ color: '#6b7280' }}>
                            <p style={{ margin: '0.5rem 0' }}>
                                <strong>{t('appointments.doctor')}:</strong> {appointment.doctorName}
                            </p>
                            <p style={{ margin: '0.5rem 0' }}>
                                <strong>{t('appointments.dateAndTime')}:</strong> {formatDate(appointment.date)} {i18n.language === 'bg' ? 'в' : 'at'} {formatTime(appointment.date)}
                            </p>
                            <p style={{ margin: '0.5rem 0' }}>
                                <strong>{t('appointments.service')}:</strong> {translateAppointmentType(appointment.type)}
                            </p>
                        </div>
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '2rem' }}>
                        <label style={{
                            display: 'block',
                            fontSize: '1rem',
                            fontWeight: '600',
                            color: '#374151',
                            marginBottom: '1rem'
                        }}>
                            {t('reschedule.selectNewDate')} <span style={{ color: '#dc2626' }}>*</span>
                        </label>
                        
                        {datesLoading ? (
                            <div style={{
                                textAlign: 'center',
                                padding: '2rem',
                                color: '#6b7280'
                            }}>
                                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>📅</div>
                                <p>{t('reschedule.loadingAvailableDates')}</p>
                            </div>
                        ) : availableDates.length === 0 ? (
                            <div style={{
                                textAlign: 'center',
                                padding: '2rem',
                                background: 'rgba(239, 68, 68, 0.05)',
                                border: '1px solid rgba(239, 68, 68, 0.2)',
                                borderRadius: '12px',
                                color: '#6b7280'
                            }}>
                                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>📅</div>
                                <p><strong>{t('reschedule.noAvailableDatesFound')}</strong></p>
                                <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>
                                    {t('reschedule.noAvailableDatesDescription')}
                                </p>
                            </div>
                        ) : (
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
                                gap: '0.75rem',
                                maxHeight: '240px',
                                overflowY: 'auto',
                                padding: '1rem',
                                background: '#f8fafc',
                                borderRadius: '12px',
                                border: '1px solid #e2e8f0'
                            }}>
                                {availableDates.map((dateInfo) => (
                                    <div
                                        key={dateInfo.date}
                                        onClick={dateInfo.hasSlots ? () => setSelectedDate(dateInfo.date) : undefined}
                                        style={{
                                            padding: '0.75rem',
                                            border: dateInfo.hasSlots 
                                                ? (selectedDate === dateInfo.date ? '2px solid #3b82f6' : '2px solid rgba(34, 197, 94, 0.2)')
                                                : '2px solid rgba(239, 68, 68, 0.2)',
                                            borderRadius: '8px',
                                            background: !dateInfo.hasSlots 
                                                ? 'rgba(239, 68, 68, 0.05)'
                                                : selectedDate === dateInfo.date 
                                                    ? 'rgba(59, 130, 246, 0.1)' 
                                                    : 'white',
                                            cursor: dateInfo.hasSlots ? 'pointer' : 'not-allowed',
                                            fontSize: '0.85rem',
                                            fontWeight: '500',
                                            textAlign: 'center',
                                            transition: 'all 0.2s ease',
                                            opacity: dateInfo.hasSlots ? 1 : 0.6,
                                            position: 'relative'
                                        }}
                                    >
                                        <div style={{
                                            color: !dateInfo.hasSlots ? '#9ca3af' : selectedDate === dateInfo.date ? '#1d4ed8' : '#374151',
                                            fontWeight: selectedDate === dateInfo.date ? '600' : '500'
                                        }}>
                                            {formatShortDate(dateInfo.dateObj)}
                                        </div>
                                        <div style={{
                                            fontSize: '0.7rem',
                                            marginTop: '0.25rem',
                                            color: dateInfo.hasSlots ? '#22c55e' : '#ef4444',
                                            fontWeight: '600'
                                        }}>
                                            {dateInfo.hasSlots 
                                                ? `${dateInfo.slotsCount} ${dateInfo.slotsCount > 1 ? t('reschedule.slots') : t('reschedule.slot')}`
                                                : t('reschedule.noSlots')
                                            }
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {selectedDate && (
                        <div style={{ marginBottom: '2rem' }}>
                            <label style={{
                                display: 'block',
                                fontSize: '1rem',
                                fontWeight: '600',
                                color: '#374151',
                                marginBottom: '0.5rem'
                            }}>
                                {t('reschedule.availableTimeSlots')} <span style={{ color: '#dc2626' }}>*</span>
                            </label>
                            
                            {slotsLoading ? (
                                <div style={{
                                    textAlign: 'center',
                                    padding: '2rem',
                                    color: '#6b7280'
                                }}>
                                    <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⏳</div>
                                    <p>{t('reschedule.loadingAvailableSlots')}</p>
                                </div>
                            ) : availableSlots.length === 0 ? (
                                <div style={{
                                    textAlign: 'center',
                                    padding: '2rem',
                                    background: 'rgba(239, 68, 68, 0.05)',
                                    border: '1px solid rgba(239, 68, 68, 0.2)',
                                    borderRadius: '12px',
                                    color: '#6b7280'
                                }}>
                                    <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>📅</div>
                                    <p><strong>{t('appointments.noSlotsForDate')}</strong></p>
                                    <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>
                                        {t('appointments.noSlotsDescription', { doctorName: appointment?.doctorName || appointment?.doctor?.fullName || t('doctors.doctor') })}
                                    </p>
                                </div>
                            ) : (
                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                                    gap: '1rem'
                                }}>
                                    {availableSlots.map((slot, index) => (
                                        <div
                                            key={index}
                                            onClick={() => setSelectedSlot(slot)}
                                            style={{
                                                padding: '1rem',
                                                border: selectedSlot?.id === slot.id 
                                                    ? '2px solid #3b82f6' 
                                                    : '2px solid rgba(59, 130, 246, 0.2)',
                                                borderRadius: '12px',
                                                background: selectedSlot?.id === slot.id 
                                                    ? 'rgba(59, 130, 246, 0.1)' 
                                                    : 'white',
                                                cursor: loading ? 'not-allowed' : 'pointer',
                                                fontSize: '1rem',
                                                fontWeight: '600',
                                                color: selectedSlot?.id === slot.id ? '#1d4ed8' : '#374151',
                                                transition: 'all 0.2s ease',
                                                textAlign: 'center',
                                                boxShadow: selectedSlot?.id === slot.id 
                                                    ? '0 4px 12px rgba(59, 130, 246, 0.15)' 
                                                    : '0 2px 4px rgba(0, 0, 0, 0.05)',
                                                transform: selectedSlot?.id === slot.id ? 'translateY(-2px)' : 'translateY(0)'
                                            }}
                                        >
                                            {formatSlotTime(slot.startTime, slot.endTime)}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    <div style={{ marginBottom: '2rem' }}>
                        <label style={{
                            display: 'block',
                            fontSize: '1rem',
                            fontWeight: '600',
                            color: '#374151',
                            marginBottom: '0.5rem'
                        }}>
                            {t('reschedule.reasonForRescheduling')}
                        </label>
                        <textarea
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            placeholder={t('reschedule.reasonForReschedulingPlaceholder')}
                            disabled={loading}
                            rows={3}
                            style={{
                                width: '100%',
                                padding: '1rem',
                                border: '2px solid rgba(59, 130, 246, 0.2)',
                                borderRadius: '12px',
                                fontSize: '1rem',
                                resize: 'vertical',
                                minHeight: '80px',
                                outline: 'none',
                                boxSizing: 'border-box',
                                transition: 'border-color 0.2s ease',
                                fontFamily: 'inherit'
                            }}
                            onFocus={e => {
                                e.target.style.borderColor = '#3b82f6';
                            }}
                            onBlur={e => {
                                e.target.style.borderColor = 'rgba(59, 130, 246, 0.2)';
                            }}
                        />
                    </div>

                    {error && (
                        <div style={{
                            backgroundColor: '#fef2f2',
                            border: '1px solid #fecaca',
                            borderRadius: '12px',
                            padding: '1rem',
                            marginBottom: '1.5rem',
                            color: '#dc2626'
                        }}>
                            {error}
                        </div>
                    )}

                    <div style={{
                        display: 'flex',
                        gap: '1rem',
                        justifyContent: 'flex-end'
                    }}>
                        <button
                            type="button"
                            onClick={handleClose}
                            disabled={loading}
                            style={{
                                padding: '1rem 2rem',
                                border: '2px solid #e5e7eb',
                                borderRadius: '12px',
                                backgroundColor: 'white',
                                color: '#374151',
                                fontSize: '1rem',
                                fontWeight: '600',
                                cursor: loading ? 'not-allowed' : 'pointer'
                            }}
                        >
                            {t('common.cancel')}
                        </button>
                        <button
                            type="submit"
                            disabled={loading || !selectedSlot}
                            style={{
                                padding: '1rem 2rem',
                                border: 'none',
                                borderRadius: '12px',
                                background: loading || !selectedSlot 
                                    ? 'rgba(107, 114, 128, 0.3)' 
                                    : 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                                color: 'white',
                                fontSize: '1rem',
                                fontWeight: '600',
                                cursor: loading || !selectedSlot ? 'not-allowed' : 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                transition: 'all 0.3s ease',
                                boxShadow: loading || !selectedSlot 
                                    ? 'none' 
                                    : '0 4px 12px rgba(59, 130, 246, 0.3)'
                            }}
                        >
                            {loading ? (
                                <>
                                    <div style={{
                                        width: '16px',
                                        height: '16px',
                                        border: '2px solid rgba(255, 255, 255, 0.3)',
                                        borderTop: '2px solid white',
                                        borderRadius: '50%',
                                        animation: 'spin 1s linear infinite'
                                    }} />
                                    {t('reschedule.submitting')}
                                </>
                            ) : (
                                <>
                                    📅 {t('reschedule.submitRequest')}
                                </>
                            )}
                        </button>
                    </div>
                </form>

                <div style={{
                    marginTop: '2rem',
                    padding: '1rem',
                    backgroundColor: '#f0f9ff',
                    borderRadius: '12px',
                    border: '1px solid #bae6fd'
                }}>
                    <p style={{
                        margin: 0,
                        fontSize: '0.9rem',
                        color: '#0369a1'
                    }}>
                        <strong>{t('reschedule.note')}:</strong> {t('reschedule.rescheduleNote')}
                    </p>
                </div>
            </div>

            <style>
                {`
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                `}
            </style>
        </div>
    );
};

export default RescheduleModal;
