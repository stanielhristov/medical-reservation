const ScheduleList = ({ 
    schedules, 
    onDelete, 
    onToggleAvailability, 
    loading,
    // Selection props
    selectedSchedules = new Set(),
    onToggleSelection,
    onSelectAll,
    onClearSelection,
    onBulkDelete
}) => {
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
                    background: 'rgba(21, 128, 61, 0.1)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1.5rem',
                    fontSize: '2rem'
                }}>
                    📅
                </div>
                <h3 style={{
                    fontSize: '1.5rem',
                    fontWeight: '600',
                    color: '#374151',
                    margin: '0 0 1rem'
                }}>
                    No Schedule Found
                </h3>
                <p style={{
                    color: '#6b7280',
                    margin: 0,
                    fontSize: '1rem'
                }}>
                    No time slots available for the selected view. Add some schedule entries to get started.
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
            {/* Bulk Actions Toolbar */}
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
                        Select All ({schedules.length})
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
                            {selectedCount} selected
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
                            Clear Selection
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
                            🗑️ Delete Selected ({selectedCount})
                        </button>
                    </div>
                )}
            </div>

            {/* Schedule List */}
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
                                {/* Selection Checkbox */}
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
                                        {schedule.status === 'BOOKED' ? '👤 Reserved' :
                                         schedule.status === 'BLOCKED' ? '🚫 Blocked' :
                                         schedule.status === 'PAST' ? '⏰ Past' :
                                         schedule.available ? '✅ Available' : '❌ Unavailable'}
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
                                            Past
                                        </span>
                                    )}
                                </div>
                                
                                {/* Patient Information for Reserved Slots */}
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
                                            <span style={{ fontSize: '0.9rem' }}>👤</span>
                                            <span style={{
                                                color: '#1f2937',
                                                fontWeight: '600',
                                                fontSize: '0.9rem'
                                            }}>
                                                Reserved by:
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
                                            Start Time
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
                                            End Time
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
                                            Duration
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
                                {/* Show availability toggle only for FREE, UNAVAILABLE slots */}
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
                                        title={schedule.available ? 'Mark as Unavailable' : 'Mark as Available'}
                                    >
                                        {schedule.available ? '🚫' : '✅'}
                                    </button>
                                )}
                                
                                {/* Show different information for booked slots */}
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
                                        📅 Booked
                                    </div>
                                )}
                                
                                {/* Show different information for blocked slots */}
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
                                        🚫 Blocked
                                    </div>
                                )}
                                
                                {/* Allow deletion for all slots except BLOCKED and PAST */}
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
                                            ? "Cancel appointment and delete schedule" 
                                            : "Delete Schedule"}
                                    >
                                        {schedule.status === 'BOOKED' ? '❌' : '🗑️'}
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
