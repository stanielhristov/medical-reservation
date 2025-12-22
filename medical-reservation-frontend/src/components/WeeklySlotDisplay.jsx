import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { getDoctorScheduleWithStatusForDoctor } from '../api/schedule';

const WeeklySlotDisplay = ({ doctorId, onClose }) => {
    const { t, i18n } = useTranslation();
    const [weekSlots, setWeekSlots] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getCurrentWeekRange = () => {
        const today = new Date();
        const startOfWeek = new Date(today);
        const day = today.getDay();
        const diff = today.getDate() - day + (day === 0 ? -6 : 1);
        startOfWeek.setDate(diff);
        
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
        
        return { startOfWeek, endOfWeek };
    };

    const formatWeekRange = () => {
        const { startOfWeek, endOfWeek } = getCurrentWeekRange();
        const locale = i18n.language === 'bg' ? 'bg-BG' : 'en-US';
        const formatDate = (date) => {
            return date.toLocaleDateString(locale, { 
                month: 'short', 
                day: 'numeric' 
            });
        };
        return `${formatDate(startOfWeek)} - ${formatDate(endOfWeek)}`;
    };

    useEffect(() => {
        const fetchWeekSlots = async () => {
            if (!doctorId) return;

            try {
                setLoading(true);
                setError(null);

                const { startOfWeek, endOfWeek } = getCurrentWeekRange();

                const startDateTime = new Date(startOfWeek);
                startDateTime.setHours(0, 0, 0, 0);
                
                const endDateTime = new Date(endOfWeek);
                endDateTime.setHours(23, 59, 59, 999);

                const slots = await getDoctorScheduleWithStatusForDoctor(
                    doctorId,
                    startDateTime.toISOString(),
                    endDateTime.toISOString()
                );

                setWeekSlots(slots || []);
            } catch (err) {
                console.error('Error fetching week slots:', err);
                setError(t('schedule.failedToLoadWeekSlots'));
            } finally {
                setLoading(false);
            }
        };

        fetchWeekSlots();
    }, [doctorId, t]);

    const groupSlotsByDay = () => {
        const daysOfWeek = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];
        const dayTranslationKeys = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
        
        const grouped = {};
        
        daysOfWeek.forEach((day, index) => {
            grouped[day] = {
                label: t(`schedule.${dayTranslationKeys[index]}`),
                slots: []
            };
        });

        weekSlots.forEach(slot => {
            const slotDate = new Date(slot.startTime);
            const dayOfWeek = slotDate.toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase();
            
            if (grouped[dayOfWeek]) {
                grouped[dayOfWeek].slots.push(slot);
            }
        });

        return grouped;
    };

    const formatTime = (timeString) => {
        return new Date(timeString).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });
    };

    const getSlotStatusColor = (slot) => {
        switch (slot.status) {
            case 'FREE': return '#10b981'; 
            case 'BOOKED': return '#f59e0b'; 
            case 'BLOCKED': return '#ef4444'; 
            case 'PAST': return '#9ca3af'; 
            default: return '#ef4444'; 
        }
    };

    const getSlotStatusText = (slot) => {
        switch (slot.status) {
            case 'FREE': return t('schedule.available');
            case 'BOOKED': return t('schedule.booked');
            case 'BLOCKED': return slot.blockedReason || t('schedule.blocked');
            case 'PAST': return t('schedule.past');
            default: return t('schedule.unavailable');
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
                    <span>{t('schedule.loadingWeekSlots')}</span>
                </div>
            </div>
        );
    }

    const groupedSlots = groupSlotsByDay();

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
            zIndex: 1000,
            padding: '1rem'
        }}>
            <div style={{
                background: 'white',
                borderRadius: '16px',
                padding: '2rem',
                maxWidth: '900px',
                width: '100%',
                maxHeight: '90vh',
                overflow: 'auto',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)'
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
                        📅 {t('schedule.weekSlotsOverview')}
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
                    background: '#f0fdf4', 
                    border: '1px solid #bbf7d0', 
                    borderRadius: '8px', 
                    padding: '0.75rem',
                    marginBottom: '2rem',
                    fontSize: '0.9rem',
                    color: '#166534'
                }}>
                    📅 {t('schedule.currentWeekLabel')}: {formatWeekRange()} • {t('schedule.totalSlots')}: {weekSlots.length}
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
                        <strong>{t('schedule.error')}:</strong> {error}
                    </div>
                )}

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {Object.entries(groupedSlots).map(([dayKey, dayData]) => (
                        <div key={dayKey} style={{
                            border: '2px solid #e5e7eb',
                            borderRadius: '12px',
                            padding: '1rem',
                            background: dayData.slots.length > 0 ? '#f9fafb' : '#f3f4f6'
                        }}>
                            <h3 style={{
                                margin: '0 0 1rem 0',
                                color: '#374151',
                                fontSize: '1.1rem',
                                fontWeight: '600'
                            }}>
                                {dayData.label} ({dayData.slots.length} {t('schedule.slots')})
                            </h3>
                            
                            {dayData.slots.length === 0 ? (
                                <p style={{ 
                                    color: '#9ca3af', 
                                    fontStyle: 'italic',
                                    margin: 0 
                                }}>
                                    {t('schedule.noSlotsForDay')}
                                </p>
                            ) : (
                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
                                    gap: '0.5rem'
                                }}>
                                    {dayData.slots.map((slot, index) => (
                                        <div key={index} style={{
                                            background: 'white',
                                            border: `2px solid ${getSlotStatusColor(slot)}`,
                                            borderRadius: '8px',
                                            padding: '0.5rem',
                                            fontSize: '0.9rem',
                                            textAlign: 'center'
                                        }}>
                                            <div style={{ fontWeight: '600' }}>
                                                {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
                                            </div>
                                            <div style={{ 
                                                color: getSlotStatusColor(slot),
                                                fontSize: '0.8rem',
                                                marginTop: '0.25rem'
                                            }}>
                                                {getSlotStatusText(slot)}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    marginTop: '2rem',
                    paddingTop: '1rem',
                    borderTop: '2px solid #f0f0f0'
                }}>
                    <button
                        onClick={onClose}
                        style={{
                            padding: '0.75rem 1.5rem',
                            border: 'none',
                            borderRadius: '8px',
                            background: '#15803d',
                            color: 'white',
                            cursor: 'pointer',
                            fontSize: '1rem',
                            fontWeight: '500'
                        }}
                    >
                        {t('common.close')}
                    </button>
                </div>
            </div>

            <style jsx>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
};

export default WeeklySlotDisplay;
