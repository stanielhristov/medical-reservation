import React, { useState, useEffect } from 'react';
import { getDoctorScheduleWithStatus } from '../api/schedule';

const PatientCalendarView = ({ doctorId, doctorName, onSlotSelect, selectedDate, onDateChange }) => {
    const [slots, setSlots] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (doctorId && selectedDate) {
            fetchSlotsForDate();
        }
    }, [doctorId, selectedDate]);

    const fetchSlotsForDate = async () => {
        setLoading(true);
        setError(null);
        
        try {
            const startDate = new Date(selectedDate);
            const endDate = new Date(selectedDate);
            endDate.setHours(23, 59, 59, 999);
            
            const slotsData = await getDoctorScheduleWithStatus(
                doctorId,
                startDate.toISOString(),
                endDate.toISOString()
            );
            
            setSlots(slotsData);
        } catch (err) {
            console.error('Error fetching slots:', err);
            setError('Failed to load schedule');
            setSlots([]);
        } finally {
            setLoading(false);
        }
    };

    const formatTime = (dateTimeStr) => {
        const date = new Date(dateTimeStr);
        return date.toLocaleTimeString('en-GB', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });
    };

    const getSlotStyle = (slot) => {
        const baseStyle = {
            padding: '1rem',
            borderRadius: '12px',
            border: '2px solid',
            margin: '0.5rem 0',
            cursor: slot.status === 'FREE' ? 'pointer' : 'not-allowed',
            transition: 'all 0.2s ease',
            textAlign: 'center'
        };

        switch (slot.status) {
            case 'FREE':
                return {
                    ...baseStyle,
                    borderColor: '#10b981',
                    backgroundColor: '#ecfdf5',
                    color: '#065f46'
                };
            case 'BOOKED':
                return {
                    ...baseStyle,
                    borderColor: '#f59e0b',
                    backgroundColor: '#fffbeb',
                    color: '#92400e'
                };
            case 'BLOCKED':
                return {
                    ...baseStyle,
                    borderColor: '#ef4444',
                    backgroundColor: '#fef2f2',
                    color: '#991b1b'
                };
            case 'UNAVAILABLE':
                return {
                    ...baseStyle,
                    borderColor: '#f97316',
                    backgroundColor: '#fff7ed',
                    color: '#9a3412',
                    opacity: 0.7
                };
            default:
                return {
                    ...baseStyle,
                    borderColor: '#9ca3af',
                    backgroundColor: '#f9fafb',
                    color: '#6b7280'
                };
        }
    };

    const getSlotIcon = (status) => {
        switch (status) {
            case 'FREE':
                return '✅';
            case 'BOOKED':
                return '📅';
            case 'BLOCKED':
                return '🚫';
            case 'UNAVAILABLE':
                return '⏸️';
            default:
                return '❓';
        }
    };

    const getSlotLabel = (status) => {
        switch (status) {
            case 'FREE':
                return 'Available';
            case 'BOOKED':
                return 'Booked';
            case 'BLOCKED':
                return 'Blocked';
            case 'UNAVAILABLE':
                return 'Unavailable';
            default:
                return 'Unknown';
        }
    };

    const handleSlotClick = (slot) => {
        if (slot.status === 'FREE' && onSlotSelect) {
            onSlotSelect(slot);
        }
    };

    const formatSelectedDate = () => {
        return new Date(selectedDate).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const getTodayDate = () => {
        const today = new Date();
        return today.toISOString().split('T')[0];
    };

    const getMaxDate = () => {
        const maxDate = new Date();
        maxDate.setDate(maxDate.getDate() + 30); 
        return maxDate.toISOString().split('T')[0];
    };

    return (
        <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '2rem',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
            maxWidth: '600px',
            margin: '0 auto'
        }}>
            <div style={{
                marginBottom: '2rem',
                textAlign: 'center'
            }}>
                <h2 style={{
                    color: '#15803d',
                    margin: '0 0 1rem 0',
                    fontSize: '1.5rem'
                }}>
                    📅 Schedule with Dr. {doctorName}
                </h2>
                
                <div style={{ marginBottom: '1rem' }}>
                    <label style={{
                        display: 'block',
                        marginBottom: '0.5rem',
                        color: '#374151',
                        fontWeight: '500'
                    }}>
                        Select Date:
                    </label>
                    <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => onDateChange?.(e.target.value)}
                        min={getTodayDate()}
                        max={getMaxDate()}
                        style={{
                            padding: '0.75rem 1rem',
                            border: '2px solid #d1d5db',
                            borderRadius: '8px',
                            fontSize: '1rem',
                            textAlign: 'center'
                        }}
                    />
                </div>
                
                <p style={{
                    color: '#6b7280',
                    margin: 0,
                    fontSize: '1.1rem',
                    fontWeight: '500'
                }}>
                    {formatSelectedDate()}
                </p>
            </div>

            {}
            <div style={{
                display: 'flex',
                justifyContent: 'space-around',
                marginBottom: '2rem',
                padding: '1rem',
                background: '#f8fafc',
                borderRadius: '12px',
                border: '1px solid #e2e8f0'
            }}>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>✅</div>
                    <div style={{ fontSize: '0.9rem', color: '#065f46', fontWeight: '500' }}>Available</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>📅</div>
                    <div style={{ fontSize: '0.9rem', color: '#92400e', fontWeight: '500' }}>Booked</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>🚫</div>
                    <div style={{ fontSize: '0.9rem', color: '#991b1b', fontWeight: '500' }}>Blocked</div>
                </div>
            </div>

            {loading && (
                <div style={{
                    textAlign: 'center',
                    padding: '3rem',
                    color: '#6b7280'
                }}>
                    <div style={{
                        width: '40px',
                        height: '40px',
                        border: '4px solid #f3f3f3',
                        borderTop: '4px solid #15803d',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite',
                        margin: '0 auto 1rem'
                    }} />
                    Loading schedule...
                </div>
            )}

            {error && (
                <div style={{
                    background: '#fef2f2',
                    border: '1px solid #fecaca',
                    color: '#dc2626',
                    padding: '1rem',
                    borderRadius: '8px',
                    textAlign: 'center',
                    marginBottom: '1rem'
                }}>
                    {error}
                </div>
            )}

            {!loading && !error && slots.length === 0 && (
                <div style={{
                    textAlign: 'center',
                    padding: '3rem',
                    color: '#9ca3af'
                }}>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📭</div>
                    <h3 style={{ margin: '0 0 0.5rem 0', color: '#6b7280' }}>No appointments available</h3>
                    <p style={{ margin: 0 }}>Please select a different date or contact the clinic.</p>
                </div>
            )}

            {!loading && !error && slots.length > 0 && (
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '1rem'
                }}>
                    {slots.map(slot => (
                        <div
                            key={slot.id}
                            style={getSlotStyle(slot)}
                            onClick={() => handleSlotClick(slot)}
                            onMouseEnter={(e) => {
                                if (slot.status === 'FREE') {
                                    e.target.style.transform = 'translateY(-2px)';
                                    e.target.style.boxShadow = '0 8px 25px rgba(16, 185, 129, 0.25)';
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (slot.status === 'FREE') {
                                    e.target.style.transform = 'translateY(0)';
                                    e.target.style.boxShadow = 'none';
                                }
                            }}
                        >
                            <div style={{
                                fontSize: '1.5rem',
                                marginBottom: '0.5rem'
                            }}>
                                {getSlotIcon(slot.status)}
                            </div>
                            
                            <div style={{
                                fontSize: '1.1rem',
                                fontWeight: '600',
                                marginBottom: '0.25rem'
                            }}>
                                {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
                            </div>
                            
                            <div style={{
                                fontSize: '0.9rem',
                                fontWeight: '500',
                                opacity: 0.8
                            }}>
                                {getSlotLabel(slot.status)}
                            </div>
                            
                            {slot.status === 'BLOCKED' && slot.blockedReason && (
                                <div style={{
                                    fontSize: '0.8rem',
                                    marginTop: '0.5rem',
                                    fontStyle: 'italic',
                                    opacity: 0.7
                                }}>
                                    {slot.blockedReason}
                                </div>
                            )}
                            
                            {slot.status === 'FREE' && (
                                <div style={{
                                    fontSize: '0.8rem',
                                    marginTop: '0.5rem',
                                    fontWeight: '500',
                                    color: '#065f46'
                                }}>
                                    Click to book
                                </div>
                            )}
                        </div>
                    ))}
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
};

export default PatientCalendarView;
