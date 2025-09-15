import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getDoctorByUserId } from '../../api/doctors';
import { 
    getDoctorSchedule, 
    createSchedule, 
    updateSchedule, 
    deleteSchedule,
    markSlotAvailable,
    markSlotUnavailable 
} from '../../api/schedule';

const DoctorSchedule = () => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [schedules, setSchedules] = useState([]);
    const [selectedView, setSelectedView] = useState('week');
    const [currentDate, setCurrentDate] = useState(new Date());
    const [showAddModal, setShowAddModal] = useState(false);
    const [editingSchedule, setEditingSchedule] = useState(null);
    const [doctorId, setDoctorId] = useState(null);
    const [newSchedule, setNewSchedule] = useState({
        startTime: '',
        endTime: '',
        available: true
    });

    const views = [
        { id: 'week', name: 'Week View', icon: '📅', color: '#15803d' },
        { id: 'month', name: 'Month View', icon: '🗓️', color: '#059669' },
        { id: 'upcoming', name: 'Upcoming Slots', icon: '⏰', color: '#0d9488' },
        { id: 'available', name: 'Available Only', icon: '✅', color: '#047857' }
    ];

    useEffect(() => {
        fetchDoctorAndSchedule();
    }, [user]);

    const fetchDoctorAndSchedule = async () => {
        try {
            if (!user?.id) {
                console.error('User ID not available');
                return;
            }

            // Get doctor profile first
            const doctorProfile = await getDoctorByUserId(user.id);
            if (!doctorProfile?.id) {
                console.error('Doctor profile not found');
                return;
            }

            setDoctorId(doctorProfile.id);
            
            // Fetch doctor's schedule
            const scheduleData = await getDoctorSchedule(doctorProfile.id);
            setSchedules(scheduleData);
            
        } catch (error) {
            console.error('Error fetching schedule:', error);
            // Set mock data for development
            setSchedules([
                {
                    id: 1,
                    doctorId: 1,
                    startTime: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
                    endTime: new Date(Date.now() + 3 * 60 * 60 * 1000).toISOString(),
                    available: true
                },
                {
                    id: 2,
                    doctorId: 1,
                    startTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
                    endTime: new Date(Date.now() + 25 * 60 * 60 * 1000).toISOString(),
                    available: true
                },
                {
                    id: 3,
                    doctorId: 1,
                    startTime: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(),
                    endTime: new Date(Date.now() + 49 * 60 * 60 * 1000).toISOString(),
                    available: false
                }
            ]);
        } finally {
            setLoading(false);
        }
    };

    const getFilteredSchedules = () => {
        const now = new Date();
        const startOfWeek = new Date(currentDate);
        startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 7);

        const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

        switch (selectedView) {
            case 'week':
                return schedules.filter(schedule => {
                    const scheduleDate = new Date(schedule.startTime);
                    return scheduleDate >= startOfWeek && scheduleDate < endOfWeek;
                });
            case 'month':
                return schedules.filter(schedule => {
                    const scheduleDate = new Date(schedule.startTime);
                    return scheduleDate >= startOfMonth && scheduleDate <= endOfMonth;
                });
            case 'upcoming':
                return schedules.filter(schedule => 
                    new Date(schedule.startTime) > now
                ).sort((a, b) => new Date(a.startTime) - new Date(b.startTime));
            case 'available':
                return schedules.filter(schedule => schedule.available);
            default:
                return schedules;
        }
    };

    const handleAddSchedule = async () => {
        try {
            if (!doctorId || !newSchedule.startTime || !newSchedule.endTime) return;

            const scheduleData = {
                doctorId: doctorId,
                startTime: new Date(newSchedule.startTime).toISOString(),
                endTime: new Date(newSchedule.endTime).toISOString(),
                available: newSchedule.available
            };

            const created = await createSchedule(scheduleData);
            setSchedules(prev => [...prev, created]);
            
            setNewSchedule({
                startTime: '',
                endTime: '',
                available: true
            });
            setShowAddModal(false);
        } catch (error) {
            console.error('Error creating schedule:', error);
        }
    };

    const handleUpdateSchedule = async () => {
        try {
            if (!editingSchedule) return;

            const updated = await updateSchedule(editingSchedule.id, {
                doctorId: doctorId,
                startTime: new Date(editingSchedule.startTime).toISOString(),
                endTime: new Date(editingSchedule.endTime).toISOString(),
                available: editingSchedule.available
            });

            setSchedules(prev => prev.map(schedule => 
                schedule.id === editingSchedule.id ? updated : schedule
            ));
            setEditingSchedule(null);
        } catch (error) {
            console.error('Error updating schedule:', error);
        }
    };

    const handleDeleteSchedule = async (scheduleId) => {
        try {
            await deleteSchedule(scheduleId);
            setSchedules(prev => prev.filter(schedule => schedule.id !== scheduleId));
        } catch (error) {
            console.error('Error deleting schedule:', error);
        }
    };

    const toggleAvailability = async (schedule) => {
        try {
            if (schedule.available) {
                await markSlotUnavailable(schedule.id);
            } else {
                await markSlotAvailable(schedule.id);
            }
            
            setSchedules(prev => prev.map(s => 
                s.id === schedule.id ? { ...s, available: !s.available } : s
            ));
        } catch (error) {
            console.error('Error toggling availability:', error);
        }
    };

    const formatDateTime = (dateString) => {
        const date = new Date(dateString);
        return {
            date: date.toLocaleDateString(),
            time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            day: date.toLocaleDateString([], { weekday: 'short' })
        };
    };

    const navigateWeek = (direction) => {
        const newDate = new Date(currentDate);
        newDate.setDate(currentDate.getDate() + (direction * 7));
        setCurrentDate(newDate);
    };

    const navigateMonth = (direction) => {
        const newDate = new Date(currentDate);
        newDate.setMonth(currentDate.getMonth() + direction);
        setCurrentDate(newDate);
    };

    if (loading) {
        return (
            <div style={{
                minHeight: '100vh',
                width: '100vw',
                background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 50%, #bbf7d0 100%)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                boxSizing: 'border-box'
            }}>
                <div style={{
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '24px',
                    padding: '3rem',
                    textAlign: 'center',
                    boxShadow: '0 20px 40px rgba(34, 197, 94, 0.1), 0 8px 32px rgba(0, 0, 0, 0.05)',
                    border: '1px solid rgba(34, 197, 94, 0.1)'
                }}>
                    <div style={{
                        width: '60px',
                        height: '60px',
                        border: '4px solid rgba(34, 197, 94, 0.2)',
                        borderTop: '4px solid #22c55e',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite',
                        margin: '0 auto 1.5rem'
                    }} />
                    <p style={{ color: '#6b7280', margin: 0, fontSize: '1rem', fontWeight: '500' }}>Loading schedule...</p>
                </div>
            </div>
        );
    }

    return (
        <div style={{
            position: 'relative'
        }}>
            {/* Background decorations */}
            <div style={{
                position: 'absolute',
                top: '5%',
                right: '8%',
                width: '300px',
                height: '300px',
                background: 'radial-gradient(circle, rgba(21, 128, 61, 0.1) 0%, rgba(21, 128, 61, 0.05) 50%, transparent 100%)',
                borderRadius: '50%',
                zIndex: 0
            }} />
            
            <div style={{
                position: 'absolute',
                bottom: '10%',
                left: '5%',
                width: '250px',
                height: '250px',
                background: 'radial-gradient(circle, rgba(5, 150, 105, 0.08) 0%, rgba(5, 150, 105, 0.03) 50%, transparent 100%)',
                borderRadius: '50%',
                zIndex: 0
            }} />

            {/* Main Content */}
            <main style={{
                padding: '2.5rem 0',
                position: 'relative',
                zIndex: 1
            }}>
                {/* Header Section */}
                <section style={{
                    background: 'rgba(255, 255, 255, 0.98)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '32px',
                    padding: '3rem',
                    marginBottom: '3rem',
                    boxShadow: '0 32px 64px rgba(21, 128, 61, 0.12), 0 16px 32px rgba(0, 0, 0, 0.06)',
                    border: '1px solid rgba(21, 128, 61, 0.15)',
                    textAlign: 'center'
                }}>
                    <div style={{
                        width: '100px',
                        height: '100px',
                        background: 'linear-gradient(135deg, #15803d 0%, #14532d 100%)',
                        borderRadius: '20px',
                        margin: '0 auto 2rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 16px 40px rgba(21, 128, 61, 0.3)'
                    }}>
                        <span style={{ fontSize: '3rem', color: 'white' }}>🗓️</span>
                    </div>
                    
                    <h1 style={{
                        fontSize: '2.5rem',
                        fontWeight: '800',
                        color: '#374151',
                        margin: '0 0 1rem',
                        letterSpacing: '-0.025em'
                    }}>
                        Schedule Management
                    </h1>
                    
                    <p style={{
                        fontSize: '1.2rem',
                        color: '#6b7280',
                        margin: 0,
                        maxWidth: '600px',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        lineHeight: '1.6'
                    }}>
                        Manage your working hours, availability, and time slots for patient appointments
                    </p>
                </section>

                {/* Statistics Cards */}
                <section style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '1.5rem',
                    marginBottom: '3rem'
                }}>
                    {views.map(view => {
                        let count = 0;
                        const now = new Date();

                        switch (view.id) {
                            case 'week':
                                const startOfWeek = new Date(currentDate);
                                startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
                                const endOfWeek = new Date(startOfWeek);
                                endOfWeek.setDate(startOfWeek.getDate() + 7);
                                count = schedules.filter(schedule => {
                                    const scheduleDate = new Date(schedule.startTime);
                                    return scheduleDate >= startOfWeek && scheduleDate < endOfWeek;
                                }).length;
                                break;
                            case 'month':
                                const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
                                const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
                                count = schedules.filter(schedule => {
                                    const scheduleDate = new Date(schedule.startTime);
                                    return scheduleDate >= startOfMonth && scheduleDate <= endOfMonth;
                                }).length;
                                break;
                            case 'upcoming':
                                count = schedules.filter(schedule => 
                                    new Date(schedule.startTime) > now
                                ).length;
                                break;
                            case 'available':
                                count = schedules.filter(schedule => schedule.available).length;
                                break;
                        }
                        
                        return (
                            <div key={view.id} style={{
                                background: 'rgba(255, 255, 255, 0.98)',
                                backdropFilter: 'blur(20px)',
                                borderRadius: '20px',
                                padding: '1.5rem',
                                boxShadow: '0 8px 24px rgba(21, 128, 61, 0.1)',
                                border: `1px solid ${view.color}20`,
                                textAlign: 'center',
                                transition: 'all 0.3s ease',
                                cursor: 'pointer'
                            }}
                            onClick={() => setSelectedView(view.id)}
                            onMouseEnter={e => {
                                e.currentTarget.style.transform = 'translateY(-4px)';
                                e.currentTarget.style.boxShadow = `0 12px 32px ${view.color}30`;
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 8px 24px rgba(21, 128, 61, 0.1)';
                            }}>
                                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{view.icon}</div>
                                <div style={{ color: '#374151', fontWeight: '700', fontSize: '1.5rem' }}>{count}</div>
                                <div style={{ color: '#6b7280', fontSize: '0.9rem' }}>{view.name}</div>
                            </div>
                        );
                    })}
                </section>

                {/* Controls Section */}
                <section style={{
                    background: 'rgba(255, 255, 255, 0.98)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '24px',
                    padding: '2rem',
                    marginBottom: '3rem',
                    boxShadow: '0 12px 32px rgba(21, 128, 61, 0.1)',
                    border: '1px solid rgba(21, 128, 61, 0.15)'
                }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '1.5rem',
                        flexWrap: 'wrap',
                        gap: '1rem'
                    }}>
                        <h2 style={{
                            fontSize: '1.5rem',
                            fontWeight: '700',
                            color: '#374151',
                            margin: 0
                        }}>
                            Schedule Controls
                        </h2>
                        
                        <button
                            onClick={() => setShowAddModal(true)}
                            style={{
                                padding: '0.75rem 1.5rem',
                                background: 'linear-gradient(135deg, #15803d 0%, #14532d 100%)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '12px',
                                fontSize: '0.9rem',
                                fontWeight: '600',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                boxShadow: '0 4px 12px rgba(21, 128, 61, 0.3)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}
                        >
                            ➕ Add Time Slot
                        </button>
                    </div>
                    
                    <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '0.75rem',
                        marginBottom: '1rem'
                    }}>
                        {views.map(view => (
                            <button
                                key={view.id}
                                onClick={() => setSelectedView(view.id)}
                                style={{
                                    padding: '0.75rem 1.25rem',
                                    background: selectedView === view.id 
                                        ? 'linear-gradient(135deg, #15803d 0%, #14532d 100%)' 
                                        : 'rgba(21, 128, 61, 0.1)',
                                    color: selectedView === view.id ? 'white' : '#14532d',
                                    border: selectedView === view.id 
                                        ? 'none' 
                                        : '1px solid rgba(21, 128, 61, 0.2)',
                                    borderRadius: '20px',
                                    fontSize: '0.9rem',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem'
                                }}
                            >
                                <span>{view.icon}</span>
                                {view.name}
                            </button>
                        ))}
                    </div>

                    {/* Navigation Controls */}
                    {(selectedView === 'week' || selectedView === 'month') && (
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '1rem',
                            background: 'rgba(21, 128, 61, 0.05)',
                            borderRadius: '12px',
                            padding: '1rem'
                        }}>
                            <button
                                onClick={() => selectedView === 'week' ? navigateWeek(-1) : navigateMonth(-1)}
                                style={{
                                    padding: '0.5rem 1rem',
                                    background: 'rgba(21, 128, 61, 0.1)',
                                    color: '#14532d',
                                    border: '1px solid rgba(21, 128, 61, 0.2)',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    fontWeight: '600'
                                }}
                            >
                                ← Previous
                            </button>
                            <span style={{
                                fontWeight: '600',
                                color: '#374151',
                                fontSize: '1.1rem'
                            }}>
                                {selectedView === 'week' 
                                    ? `Week of ${currentDate.toLocaleDateString()}`
                                    : currentDate.toLocaleDateString([], { month: 'long', year: 'numeric' })
                                }
                            </span>
                            <button
                                onClick={() => selectedView === 'week' ? navigateWeek(1) : navigateMonth(1)}
                                style={{
                                    padding: '0.5rem 1rem',
                                    background: 'rgba(21, 128, 61, 0.1)',
                                    color: '#14532d',
                                    border: '1px solid rgba(21, 128, 61, 0.2)',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    fontWeight: '600'
                                }}
                            >
                                Next →
                            </button>
                        </div>
                    )}
                </section>

                {/* Schedule List */}
                <section>
                    <div style={{
                        display: 'grid',
                        gap: '1.5rem'
                    }}>
                        {getFilteredSchedules().length > 0 ? (
                            getFilteredSchedules().map((schedule) => {
                                const timeInfo = formatDateTime(schedule.startTime);
                                const endTimeInfo = formatDateTime(schedule.endTime);
                                const isPast = new Date(schedule.startTime) < new Date();
                                
                                return (
                                    <div
                                        key={schedule.id}
                                        style={{
                                            background: 'rgba(255, 255, 255, 0.98)',
                                            backdropFilter: 'blur(20px)',
                                            borderRadius: '24px',
                                            padding: '2rem',
                                            boxShadow: '0 12px 32px rgba(21, 128, 61, 0.1)',
                                            border: schedule.available 
                                                ? '1px solid rgba(21, 128, 61, 0.15)'
                                                : '2px solid rgba(239, 68, 68, 0.2)',
                                            transition: 'all 0.4s ease',
                                            position: 'relative',
                                            overflow: 'hidden',
                                            opacity: isPast ? 0.7 : 1
                                        }}
                                        onMouseEnter={e => {
                                            e.currentTarget.style.transform = 'translateY(-4px)';
                                            e.currentTarget.style.boxShadow = '0 20px 48px rgba(21, 128, 61, 0.2)';
                                        }}
                                        onMouseLeave={e => {
                                            e.currentTarget.style.transform = 'translateY(0)';
                                            e.currentTarget.style.boxShadow = '0 12px 32px rgba(21, 128, 61, 0.1)';
                                        }}
                                    >
                                        <div style={{
                                            position: 'absolute',
                                            top: '10px',
                                            right: '10px',
                                            width: '80px',
                                            height: '80px',
                                            background: 'radial-gradient(circle, rgba(21, 128, 61, 0.1) 0%, transparent 70%)',
                                            borderRadius: '50%'
                                        }} />
                                        
                                        {/* Schedule Header */}
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'flex-start',
                                            gap: '1rem',
                                            marginBottom: '1.5rem'
                                        }}>
                                            <div style={{
                                                width: '60px',
                                                height: '60px',
                                                background: schedule.available 
                                                    ? 'linear-gradient(135deg, #15803d 0%, #14532d 100%)'
                                                    : 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
                                                borderRadius: '16px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontSize: '1.8rem',
                                                boxShadow: schedule.available
                                                    ? '0 8px 24px rgba(21, 128, 61, 0.3)'
                                                    : '0 8px 24px rgba(220, 38, 38, 0.3)',
                                                flexShrink: 0
                                            }}>
                                                {schedule.available ? '🟢' : '🔴'}
                                            </div>
                                            
                                            <div style={{ flex: 1 }}>
                                                <div style={{
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'flex-start',
                                                    marginBottom: '0.5rem',
                                                    flexWrap: 'wrap',
                                                    gap: '0.5rem'
                                                }}>
                                                    <h3 style={{
                                                        fontSize: '1.3rem',
                                                        fontWeight: '700',
                                                        color: '#374151',
                                                        margin: 0,
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '0.5rem'
                                                    }}>
                                                        {timeInfo.day}, {timeInfo.date}
                                                        {isPast && (
                                                            <span style={{
                                                                padding: '0.25rem 0.5rem',
                                                                background: 'rgba(107, 114, 128, 0.1)',
                                                                color: '#6b7280',
                                                                borderRadius: '6px',
                                                                fontSize: '0.7rem',
                                                                fontWeight: '600'
                                                            }}>
                                                                PAST
                                                            </span>
                                                        )}
                                                    </h3>
                                                    <span style={{
                                                        padding: '0.5rem 1rem',
                                                        fontSize: '0.8rem',
                                                        fontWeight: '600',
                                                        borderRadius: '20px',
                                                        background: schedule.available 
                                                            ? 'rgba(21, 128, 61, 0.1)' 
                                                            : 'rgba(239, 68, 68, 0.1)',
                                                        color: schedule.available 
                                                            ? '#14532d' 
                                                            : '#dc2626',
                                                        border: `1px solid ${schedule.available 
                                                            ? 'rgba(21, 128, 61, 0.2)' 
                                                            : 'rgba(239, 68, 68, 0.2)'}`
                                                    }}>
                                                        {schedule.available ? 'Available' : 'Unavailable'}
                                                    </span>
                                                </div>
                                                
                                                <div style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '1rem',
                                                    fontSize: '0.9rem',
                                                    color: '#6b7280',
                                                    flexWrap: 'wrap'
                                                }}>
                                                    <span>⏰ {timeInfo.time} - {endTimeInfo.time}</span>
                                                    <span>📅 Duration: {Math.round((new Date(schedule.endTime) - new Date(schedule.startTime)) / (1000 * 60))} minutes</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Action Buttons */}
                                        <div style={{
                                            display: 'flex',
                                            gap: '1rem',
                                            flexWrap: 'wrap'
                                        }}>
                                            <button
                                                onClick={() => toggleAvailability(schedule)}
                                                style={{
                                                    padding: '0.75rem 1.5rem',
                                                    background: schedule.available 
                                                        ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
                                                        : 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                                                    color: 'white',
                                                    border: 'none',
                                                    borderRadius: '12px',
                                                    fontSize: '0.9rem',
                                                    fontWeight: '600',
                                                    cursor: 'pointer',
                                                    transition: 'all 0.3s ease',
                                                    boxShadow: schedule.available
                                                        ? '0 4px 12px rgba(245, 158, 11, 0.3)'
                                                        : '0 4px 12px rgba(34, 197, 94, 0.3)'
                                                }}
                                            >
                                                {schedule.available ? '🚫 Mark Unavailable' : '✅ Mark Available'}
                                            </button>
                                            
                                            <button
                                                onClick={() => setEditingSchedule(schedule)}
                                                style={{
                                                    padding: '0.75rem 1.5rem',
                                                    background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                                                    color: 'white',
                                                    border: 'none',
                                                    borderRadius: '12px',
                                                    fontSize: '0.9rem',
                                                    fontWeight: '600',
                                                    cursor: 'pointer',
                                                    transition: 'all 0.3s ease',
                                                    boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)'
                                                }}
                                            >
                                                ✏️ Edit Time
                                            </button>

                                            <button
                                                onClick={() => handleDeleteSchedule(schedule.id)}
                                                style={{
                                                    padding: '0.75rem 1.5rem',
                                                    background: 'rgba(239, 68, 68, 0.1)',
                                                    color: '#dc2626',
                                                    border: '1px solid rgba(239, 68, 68, 0.2)',
                                                    borderRadius: '12px',
                                                    fontSize: '0.9rem',
                                                    fontWeight: '600',
                                                    cursor: 'pointer',
                                                    transition: 'all 0.3s ease'
                                                }}
                                            >
                                                🗑️ Delete
                                            </button>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div style={{
                                background: 'rgba(255, 255, 255, 0.98)',
                                backdropFilter: 'blur(20px)',
                                borderRadius: '24px',
                                padding: '3rem',
                                textAlign: 'center',
                                boxShadow: '0 12px 32px rgba(21, 128, 61, 0.1)',
                                border: '1px solid rgba(21, 128, 61, 0.15)'
                            }}>
                                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🗓️</div>
                                <h3 style={{
                                    fontSize: '1.5rem',
                                    fontWeight: '600',
                                    color: '#374151',
                                    margin: '0 0 0.5rem'
                                }}>
                                    No schedule slots found
                                </h3>
                                <p style={{ color: '#6b7280', margin: 0 }}>
                                    No schedule slots found for the selected view. Add your first time slot to get started.
                                </p>
                            </div>
                        )}
                    </div>
                </section>
            </main>

            {/* Add Schedule Modal */}
            {showAddModal && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0, 0, 0, 0.7)',
                    backdropFilter: 'blur(10px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000,
                    padding: '2rem'
                }}>
                    <div style={{
                        background: 'white',
                        borderRadius: '24px',
                        padding: '2.5rem',
                        maxWidth: '600px',
                        width: '100%',
                        boxShadow: '0 32px 64px rgba(0, 0, 0, 0.2)',
                        position: 'relative'
                    }}>
                        <button
                            onClick={() => {
                                setShowAddModal(false);
                                setNewSchedule({
                                    startTime: '',
                                    endTime: '',
                                    available: true
                                });
                            }}
                            style={{
                                position: 'absolute',
                                top: '1rem',
                                right: '1rem',
                                background: 'none',
                                border: 'none',
                                fontSize: '1.5rem',
                                cursor: 'pointer',
                                color: '#6b7280'
                            }}
                        >
                            ✕
                        </button>

                        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                            <div style={{
                                width: '80px',
                                height: '80px',
                                background: 'linear-gradient(135deg, #15803d 0%, #14532d 100%)',
                                borderRadius: '16px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '2rem',
                                margin: '0 auto 1rem'
                            }}>
                                ➕
                            </div>
                            <h3 style={{
                                fontSize: '1.5rem',
                                fontWeight: '700',
                                color: '#374151',
                                margin: '0 0 0.5rem'
                            }}>
                                Add New Time Slot
                            </h3>
                            <p style={{ color: '#6b7280', margin: 0 }}>
                                Create a new available time slot for patient appointments
                            </p>
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                                gap: '1rem',
                                marginBottom: '1rem'
                            }}>
                                <div>
                                    <label style={{
                                        display: 'block',
                                        marginBottom: '0.5rem',
                                        fontWeight: '600',
                                        color: '#374151'
                                    }}>
                                        Start Time
                                    </label>
                                    <input
                                        type="datetime-local"
                                        value={newSchedule.startTime}
                                        onChange={(e) => setNewSchedule(prev => ({ ...prev, startTime: e.target.value }))}
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem',
                                            border: '2px solid rgba(21, 128, 61, 0.2)',
                                            borderRadius: '8px',
                                            fontSize: '1rem',
                                            outline: 'none'
                                        }}
                                    />
                                </div>
                                <div>
                                    <label style={{
                                        display: 'block',
                                        marginBottom: '0.5rem',
                                        fontWeight: '600',
                                        color: '#374151'
                                    }}>
                                        End Time
                                    </label>
                                    <input
                                        type="datetime-local"
                                        value={newSchedule.endTime}
                                        onChange={(e) => setNewSchedule(prev => ({ ...prev, endTime: e.target.value }))}
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem',
                                            border: '2px solid rgba(21, 128, 61, 0.2)',
                                            borderRadius: '8px',
                                            fontSize: '1rem',
                                            outline: 'none'
                                        }}
                                    />
                                </div>
                            </div>

                            <div>
                                <label style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    cursor: 'pointer',
                                    fontWeight: '600',
                                    color: '#374151'
                                }}>
                                    <input
                                        type="checkbox"
                                        checked={newSchedule.available}
                                        onChange={(e) => setNewSchedule(prev => ({ ...prev, available: e.target.checked }))}
                                        style={{
                                            width: '1.2rem',
                                            height: '1.2rem',
                                            accentColor: '#15803d'
                                        }}
                                    />
                                    Mark as available for appointments
                                </label>
                            </div>
                        </div>

                        <div style={{
                            display: 'flex',
                            gap: '1rem'
                        }}>
                            <button
                                onClick={() => {
                                    setShowAddModal(false);
                                    setNewSchedule({
                                        startTime: '',
                                        endTime: '',
                                        available: true
                                    });
                                }}
                                style={{
                                    flex: 1,
                                    padding: '1rem',
                                    background: 'rgba(107, 114, 128, 0.1)',
                                    color: '#374151',
                                    border: '1px solid rgba(107, 114, 128, 0.2)',
                                    borderRadius: '12px',
                                    fontSize: '1rem',
                                    fontWeight: '600',
                                    cursor: 'pointer'
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleAddSchedule}
                                disabled={!newSchedule.startTime || !newSchedule.endTime}
                                style={{
                                    flex: 1,
                                    padding: '1rem',
                                    background: newSchedule.startTime && newSchedule.endTime
                                        ? 'linear-gradient(135deg, #15803d 0%, #14532d 100%)' 
                                        : 'rgba(107, 114, 128, 0.3)',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '12px',
                                    fontSize: '1rem',
                                    fontWeight: '600',
                                    cursor: newSchedule.startTime && newSchedule.endTime ? 'pointer' : 'not-allowed'
                                }}
                            >
                                Add Time Slot
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Schedule Modal */}
            {editingSchedule && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0, 0, 0, 0.7)',
                    backdropFilter: 'blur(10px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000,
                    padding: '2rem'
                }}>
                    <div style={{
                        background: 'white',
                        borderRadius: '24px',
                        padding: '2.5rem',
                        maxWidth: '600px',
                        width: '100%',
                        boxShadow: '0 32px 64px rgba(0, 0, 0, 0.2)',
                        position: 'relative'
                    }}>
                        <button
                            onClick={() => setEditingSchedule(null)}
                            style={{
                                position: 'absolute',
                                top: '1rem',
                                right: '1rem',
                                background: 'none',
                                border: 'none',
                                fontSize: '1.5rem',
                                cursor: 'pointer',
                                color: '#6b7280'
                            }}
                        >
                            ✕
                        </button>

                        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                            <div style={{
                                width: '80px',
                                height: '80px',
                                background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                                borderRadius: '16px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '2rem',
                                margin: '0 auto 1rem'
                            }}>
                                ✏️
                            </div>
                            <h3 style={{
                                fontSize: '1.5rem',
                                fontWeight: '700',
                                color: '#374151',
                                margin: '0 0 0.5rem'
                            }}>
                                Edit Time Slot
                            </h3>
                            <p style={{ color: '#6b7280', margin: 0 }}>
                                Modify the selected time slot details
                            </p>
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                                gap: '1rem',
                                marginBottom: '1rem'
                            }}>
                                <div>
                                    <label style={{
                                        display: 'block',
                                        marginBottom: '0.5rem',
                                        fontWeight: '600',
                                        color: '#374151'
                                    }}>
                                        Start Time
                                    </label>
                                    <input
                                        type="datetime-local"
                                        value={new Date(editingSchedule.startTime).toISOString().slice(0, 16)}
                                        onChange={(e) => setEditingSchedule(prev => ({ 
                                            ...prev, 
                                            startTime: new Date(e.target.value).toISOString()
                                        }))}
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem',
                                            border: '2px solid rgba(21, 128, 61, 0.2)',
                                            borderRadius: '8px',
                                            fontSize: '1rem',
                                            outline: 'none'
                                        }}
                                    />
                                </div>
                                <div>
                                    <label style={{
                                        display: 'block',
                                        marginBottom: '0.5rem',
                                        fontWeight: '600',
                                        color: '#374151'
                                    }}>
                                        End Time
                                    </label>
                                    <input
                                        type="datetime-local"
                                        value={new Date(editingSchedule.endTime).toISOString().slice(0, 16)}
                                        onChange={(e) => setEditingSchedule(prev => ({ 
                                            ...prev, 
                                            endTime: new Date(e.target.value).toISOString()
                                        }))}
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem',
                                            border: '2px solid rgba(21, 128, 61, 0.2)',
                                            borderRadius: '8px',
                                            fontSize: '1rem',
                                            outline: 'none'
                                        }}
                                    />
                                </div>
                            </div>

                            <div>
                                <label style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    cursor: 'pointer',
                                    fontWeight: '600',
                                    color: '#374151'
                                }}>
                                    <input
                                        type="checkbox"
                                        checked={editingSchedule.available}
                                        onChange={(e) => setEditingSchedule(prev => ({ ...prev, available: e.target.checked }))}
                                        style={{
                                            width: '1.2rem',
                                            height: '1.2rem',
                                            accentColor: '#15803d'
                                        }}
                                    />
                                    Mark as available for appointments
                                </label>
                            </div>
                        </div>

                        <div style={{
                            display: 'flex',
                            gap: '1rem'
                        }}>
                            <button
                                onClick={() => setEditingSchedule(null)}
                                style={{
                                    flex: 1,
                                    padding: '1rem',
                                    background: 'rgba(107, 114, 128, 0.1)',
                                    color: '#374151',
                                    border: '1px solid rgba(107, 114, 128, 0.2)',
                                    borderRadius: '12px',
                                    fontSize: '1rem',
                                    fontWeight: '600',
                                    cursor: 'pointer'
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleUpdateSchedule}
                                style={{
                                    flex: 1,
                                    padding: '1rem',
                                    background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '12px',
                                    fontSize: '1rem',
                                    fontWeight: '600',
                                    cursor: 'pointer'
                                }}
                            >
                                Save Changes
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
};

export default DoctorSchedule;
