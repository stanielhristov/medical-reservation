import { useTranslation } from 'react-i18next';

const ScheduleList = ({ 
    schedules, 
    onDelete, 
    onToggleAvailability, 
    loading,
    
    selectedSchedules = new Set(),
    onToggleSelection,
    onSelectAll,
    onClearSelection,
    onBulkDelete
}) => {
    const { t } = useTranslation();
    const formatDateTime = (dateTimeString) => {
        const date = new Date(dateTimeString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = date.toLocaleDateString('en-US', { month: 'short' });
        const year = date.getFullYear();
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        
        return `${day} ${month} ${year} – ${hours}:${minutes}`;
    };

    const getDuration = (startTime, endTime) => {
        const start = new Date(startTime);
        const end = new Date(endTime);
        const diffInMinutes = (end - start) / (1000 * 60);
        const hours = Math.floor(diffInMinutes / 60);
        const minutes = diffInMinutes % 60;
        
        if (hours > 0 && minutes > 0) {
            return `${hours}h ${minutes}m`;
        } else if (hours > 0) {
            return `${hours}h`;
        } else {
            return `${minutes}m`;
        }
    };

    if (loading) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '3rem',
                background: 'rgba(255, 255, 255, 0.98)',
                backdropFilter: 'blur(20px)',
                borderRadius: '20px',
                boxShadow: '0 8px 24px rgba(21, 128, 61, 0.1)'
            }}>
                <div style={{
                    width: '60px',
                    height: '60px',
                    border: '4px solid rgba(21, 128, 61, 0.2)',
                    borderTop: '4px solid #15803d',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                }} />
            </div>
        );
    }

    if (schedules.length === 0) {
        return (
            <div style={{
                background: 'rgba(255, 255, 255, 0.98)',
                backdropFilter: 'blur(20px)',
                borderRadius: '20px',
                padding: '3rem',
                textAlign: 'center',
                boxShadow: '0 8px 24px rgba(21, 128, 61, 0.1)',
                border: '1px solid rgba(21, 128, 61, 0.1)'
            }}>
                <div style={{
                    width: '80px',
                    height: '80px',
                    background: 'rgba(34, 197, 94, 0.1)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1.5rem'
                }}>
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                        <line x1="16" y1="2" x2="16" y2="6"/>
                        <line x1="8" y1="2" x2="8" y2="6"/>
                        <line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                </div>
                <h3 style={{
                    fontSize: '1.5rem',
                    fontWeight: '600',
                    color: '#374151',
                    margin: '0 0 1rem'
                }}>
                    {t('schedule.noScheduleFound')}
                </h3>
                <p style={{
                    color: '#6b7280',
                    margin: 0,
                    fontSize: '1rem'
                }}>
                    {t('schedule.noTimeSlotsAvailable')}
                </p>
            </div>
        );
    }

    const selectedCount = selectedSchedules.size;
    const allSelected = schedules.length > 0 && schedules.every(schedule => selectedSchedules.has(schedule.id));
    const someSelected = schedules.some(schedule => selectedSchedules.has(schedule.id));

    const handleSelectAll = () => {
        if (allSelected) {
            onClearSelection?.();
        } else {
            onSelectAll?.(schedules.map(s => s.id));
        }
    };

    const handleBulkDelete = () => {
        if (selectedCount === 0) return;
        
        const selectedIds = Array.from(selectedSchedules);
        onBulkDelete?.(selectedIds);
    };

    return (
        <div>
            {}
            <div style={{
                background: 'rgba(255, 255, 255, 0.98)',
                backdropFilter: 'blur(20px)',
                borderRadius: '16px',
                padding: '1rem 1.5rem',
                marginBottom: '1rem',
                boxShadow: '0 4px 16px rgba(21, 128, 61, 0.08)',
                border: '1px solid rgba(21, 128, 61, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1rem'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <label style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        fontWeight: '500',
                        color: '#374151'
                    }}>
                        <input
                            type="checkbox"
                            checked={allSelected}
                            ref={checkbox => {
                                if (checkbox) checkbox.indeterminate = someSelected && !allSelected;
                            }}
                            onChange={handleSelectAll}
                            style={{
                                width: '18px',
                                height: '18px',
                                cursor: 'pointer',
                                accentColor: '#15803d'
                            }}
                        />
                        {t('schedule.selectAll')} ({schedules.length})
                    </label>

                    {selectedCount > 0 && (
                        <span style={{
                            padding: '0.25rem 0.75rem',
                            borderRadius: '12px',
                            fontSize: '0.8rem',
                            fontWeight: '600',
                            background: 'rgba(21, 128, 61, 0.1)',
                            color: '#15803d'
                        }}>
                            {selectedCount} {t('schedule.selected')}
                        </span>
                    )}
                </div>

                {selectedCount > 0 && (
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button
                            onClick={onClearSelection}
                            style={{
                                background: 'rgba(107, 114, 128, 0.1)',
                                border: '1px solid rgba(107, 114, 128, 0.2)',
                                borderRadius: '8px',
                                padding: '0.5rem 1rem',
                                cursor: 'pointer',
                                color: '#6b7280',
                                fontSize: '0.9rem',
                                fontWeight: '500',
                                transition: 'all 0.2s ease'
                            }}
                            onMouseEnter={e => {
                                e.target.style.background = 'rgba(107, 114, 128, 0.15)';
                            }}
                            onMouseLeave={e => {
                                e.target.style.background = 'rgba(107, 114, 128, 0.1)';
                            }}
                        >
                            {t('schedule.clearSelection')}
                        </button>
                        <button
                            onClick={handleBulkDelete}
                            style={{
                                background: 'rgba(239, 68, 68, 0.1)',
                                border: '1px solid rgba(239, 68, 68, 0.2)',
                                borderRadius: '8px',
                                padding: '0.5rem 1rem',
                                cursor: 'pointer',
                                color: '#dc2626',
                                fontSize: '0.9rem',
                                fontWeight: '500',
                                transition: 'all 0.2s ease',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}
                            onMouseEnter={e => {
                                e.target.style.background = 'rgba(239, 68, 68, 0.15)';
                            }}
                            onMouseLeave={e => {
                                e.target.style.background = 'rgba(239, 68, 68, 0.1)';
                            }}
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="3 6 5 6 21 6"/>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                            </svg>
                            {t('schedule.deleteSelected')} ({selectedCount})
                        </button>
                    </div>
                )}
            </div>

            {}
            <div style={{
                display: 'grid',
                gap: '1rem'
            }}>
                {schedules.map((schedule) => {
                const duration = getDuration(schedule.startTime, schedule.endTime);
                const isPast = new Date(schedule.endTime) < new Date();

                const isSelected = selectedSchedules.has(schedule.id);

                return (
                    <div key={schedule.id} style={{
                        background: 'rgba(255, 255, 255, 0.98)',
                        backdropFilter: 'blur(20px)',
                        borderRadius: '16px',
                        padding: '1.5rem',
                        boxShadow: isSelected 
                            ? '0 8px 24px rgba(21, 128, 61, 0.25)' 
                            : '0 4px 16px rgba(21, 128, 61, 0.08)',
                        border: isSelected 
                            ? '2px solid #15803d' 
                            : `1px solid ${schedule.available ? '#22c55e' : '#ef4444'}20`,
                        transition: 'all 0.2s ease',
                        opacity: isPast ? 0.7 : 1,
                        position: 'relative'
                    }}
                    onMouseEnter={e => {
                        if (!isSelected) {
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = '0 8px 24px rgba(21, 128, 61, 0.15)';
                        }
                    }}
                    onMouseLeave={e => {
                        if (!isSelected) {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 4px 16px rgba(21, 128, 61, 0.08)';
                        }
                    }}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'flex-start',
                            marginBottom: '1rem'
                        }}>
                            <div style={{ 
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: '1rem',
                                flex: 1
                            }}>
                                {}
                                <label style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    cursor: 'pointer',
                                    marginTop: '0.25rem'
                                }}>
                                    <input
                                        type="checkbox"
                                        checked={isSelected}
                                        onChange={() => onToggleSelection?.(schedule.id)}
                                        style={{
                                            width: '18px',
                                            height: '18px',
                                            cursor: 'pointer',
                                            accentColor: '#15803d'
                                        }}
                                    />
                                </label>

                                <div style={{ flex: 1 }}>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    marginBottom: '0.5rem'
                                }}>
                                    <span style={{
                                        padding: '0.25rem 0.75rem',
                                        borderRadius: '20px',
                                        fontSize: '0.8rem',
                                        fontWeight: '600',
                                        background: 
                                            schedule.status === 'BOOKED' ? 'rgba(59, 130, 246, 0.1)' :
                                            schedule.status === 'BLOCKED' ? 'rgba(156, 163, 175, 0.1)' :
                                            schedule.status === 'PAST' ? 'rgba(107, 114, 128, 0.1)' :
                                            schedule.available ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                                        color: 
                                            schedule.status === 'BOOKED' ? '#2563eb' :
                                            schedule.status === 'BLOCKED' ? '#6b7280' :
                                            schedule.status === 'PAST' ? '#6b7280' :
                                            schedule.available ? '#15803d' : '#dc2626'
                                    }}>
                                        {schedule.status === 'BOOKED' ? t('schedule.reserved') :
                                         schedule.status === 'BLOCKED' ? t('schedule.blocked') :
                                         schedule.status === 'PAST' ? t('schedule.past') :
                                         schedule.available ? t('schedule.available') : t('schedule.unavailable')}
                                    </span>
                                    {isPast && (
                                        <span style={{
                                            padding: '0.25rem 0.75rem',
                                            borderRadius: '20px',
                                            fontSize: '0.8rem',
                                            fontWeight: '600',
                                            background: 'rgba(107, 114, 128, 0.1)',
                                            color: '#6b7280'
                                        }}>
                                            {t('schedule.past')}
                                        </span>
                                    )}
                                </div>
                                
                                {}
                                {schedule.status === 'BOOKED' && schedule.patientName && (
                                    <div style={{
                                        padding: '0.75rem',
                                        background: 'rgba(59, 130, 246, 0.05)',
                                        borderRadius: '12px',
                                        border: '1px solid rgba(59, 130, 246, 0.1)',
                                        marginBottom: '1rem'
                                    }}>
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.5rem',
                                            marginBottom: '0.25rem'
                                        }}>
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                                                <circle cx="12" cy="7" r="4"/>
                                            </svg>
                                            <span style={{
                                                color: '#1f2937',
                                                fontWeight: '600',
                                                fontSize: '0.9rem'
                                            }}>
                                                {t('schedule.reservedBy')}
                                            </span>
                                        </div>
                                        <div style={{
                                            color: '#2563eb',
                                            fontWeight: '600',
                                            fontSize: '1rem',
                                            marginLeft: '1.5rem'
                                        }}>
                                            {schedule.patientName}
                                        </div>
                                    </div>
                                )}

                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                                    gap: '1rem'
                                }}>
                                    <div>
                                        <div style={{ 
                                            color: '#6b7280', 
                                            fontSize: '0.8rem', 
                                            fontWeight: '500' 
                                        }}>
                                            {t('schedule.startTime')}
                                        </div>
                                        <div style={{ 
                                            color: '#374151', 
                                            fontWeight: '600',
                                            fontSize: '0.9rem'
                                        }}>
                                            {formatDateTime(schedule.startTime)}
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <div style={{ 
                                            color: '#6b7280', 
                                            fontSize: '0.8rem', 
                                            fontWeight: '500' 
                                        }}>
                                            {t('schedule.endTime')}
                                        </div>
                                        <div style={{ 
                                            color: '#374151', 
                                            fontWeight: '600',
                                            fontSize: '0.9rem'
                                        }}>
                                            {formatDateTime(schedule.endTime)}
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <div style={{ 
                                            color: '#6b7280', 
                                            fontSize: '0.8rem', 
                                            fontWeight: '500' 
                                        }}>
                                            {t('schedule.duration')}
                                        </div>
                                        <div style={{ 
                                            color: '#374151', 
                                            fontWeight: '600',
                                            fontSize: '0.9rem'
                                        }}>
                                            {duration}
                                        </div>
                                    </div>
                                </div>
                                </div>
                            </div>

                            <div style={{ 
                                display: 'flex', 
                                gap: '0.5rem',
                                flexShrink: 0,
                                marginLeft: '1rem'
                            }}>
                                {}
                                {(schedule.status === 'FREE' || schedule.status === 'UNAVAILABLE') && (
                                    <button
                                        onClick={() => onToggleAvailability(schedule)}
                                        style={{
                                            background: schedule.available 
                                                ? 'rgba(239, 68, 68, 0.1)' 
                                                : 'rgba(34, 197, 94, 0.1)',
                                            border: `1px solid ${schedule.available ? '#ef4444' : '#22c55e'}20`,
                                            borderRadius: '8px',
                                            padding: '0.5rem',
                                            cursor: 'pointer',
                                            color: schedule.available ? '#dc2626' : '#15803d',
                                            transition: 'all 0.2s ease',
                                            fontSize: '0.8rem'
                                        }}
                                        title={schedule.available ? t('schedule.markAsUnavailable') : t('schedule.markAsAvailable')}
                                    >
                                        {schedule.available ? (
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <circle cx="12" cy="12" r="10"/>
                                                <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/>
                                            </svg>
                                        ) : (
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                                                <polyline points="22 4 12 14.01 9 11.01"/>
                                            </svg>
                                        )}
                                    </button>
                                )}
                                
                                {}
                                {schedule.status === 'BOOKED' && (
                                    <div style={{
                                        background: 'rgba(59, 130, 246, 0.1)',
                                        border: '1px solid rgba(59, 130, 246, 0.2)',
                                        borderRadius: '8px',
                                        padding: '0.5rem',
                                        color: '#2563eb',
                                        fontSize: '0.8rem',
                                        fontWeight: '500'
                                    }}>
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '0.25rem' }}>
                                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                                            <line x1="16" y1="2" x2="16" y2="6"/>
                                            <line x1="8" y1="2" x2="8" y2="6"/>
                                            <line x1="3" y1="10" x2="21" y2="10"/>
                                        </svg>
                                        {t('schedule.booked')}
                                    </div>
                                )}
                                
                                {}
                                {schedule.status === 'BLOCKED' && (
                                    <div style={{
                                        background: 'rgba(156, 163, 175, 0.1)',
                                        border: '1px solid rgba(156, 163, 175, 0.2)',
                                        borderRadius: '8px',
                                        padding: '0.5rem',
                                        color: '#6b7280',
                                        fontSize: '0.8rem',
                                        fontWeight: '500'
                                    }}>
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '0.25rem' }}>
                                            <circle cx="12" cy="12" r="10"/>
                                            <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/>
                                        </svg>
                                        {t('schedule.blocked')}
                                    </div>
                                )}
                                
                                {}
                                {(schedule.status !== 'BLOCKED' && schedule.status !== 'PAST') && (
                                    <button
                                        onClick={() => onDelete(schedule)}
                                        style={{
                                            background: schedule.status === 'BOOKED' 
                                                ? 'rgba(239, 68, 68, 0.15)' 
                                                : 'rgba(239, 68, 68, 0.1)',
                                            border: schedule.status === 'BOOKED' 
                                                ? '2px solid rgba(239, 68, 68, 0.4)' 
                                                : '1px solid rgba(239, 68, 68, 0.2)',
                                            borderRadius: '8px',
                                            padding: '0.5rem',
                                            cursor: 'pointer',
                                            color: '#dc2626',
                                            transition: 'all 0.2s ease',
                                            fontWeight: schedule.status === 'BOOKED' ? '600' : 'normal'
                                        }}
                                        title={schedule.status === 'BOOKED' 
                                            ? t('schedule.cancelAppointmentAndDelete')
                                            : t('schedule.deleteSchedule')}
                                    >
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="3 6 5 6 21 6"/>
                                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                                            <line x1="10" y1="11" x2="10" y2="17"/>
                                            <line x1="14" y1="11" x2="14" y2="17"/>
                                        </svg>
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                );
            })}
            </div>
        </div>
    );
};

export default ScheduleList;
