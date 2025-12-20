const getViewIcon = (iconId, isSelected) => {
    const color = isSelected ? 'white' : '#22c55e';
    
    switch (iconId) {
        case '📅':
            return (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
            );
        case '🗓️':
            return (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                    <line x1="8" y1="14" x2="8" y2="14"/>
                    <line x1="12" y1="14" x2="12" y2="14"/>
                    <line x1="16" y1="14" x2="16" y2="14"/>
                </svg>
            );
        case '⏰':
            return (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                </svg>
            );
        case '✅':
            return (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
            );
        default:
            return (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
            );
    }
};

const ScheduleStats = ({ schedules, views, currentDate, selectedView, onViewChange }) => {
    const getScheduleCount = (view) => {
        const now = new Date();
        
        switch (view.id) {
            case 'week':
                const startOfWeek = new Date(currentDate);
                startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
                const endOfWeek = new Date(startOfWeek);
                endOfWeek.setDate(startOfWeek.getDate() + 7);
                return schedules.filter(schedule => {
                    const scheduleDate = new Date(schedule.startTime);
                    return scheduleDate >= startOfWeek && scheduleDate < endOfWeek;
                }).length;
            case 'month':
                const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
                const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
                return schedules.filter(schedule => {
                    const scheduleDate = new Date(schedule.startTime);
                    return scheduleDate >= startOfMonth && scheduleDate <= endOfMonth;
                }).length;
            case 'upcoming':
                return schedules.filter(schedule => 
                    new Date(schedule.startTime) > now
                ).length;
            case 'available':
                return schedules.filter(schedule => schedule.available).length;
            default:
                return 0;
        }
    };

    return (
        <section style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.5rem',
            marginBottom: '3rem'
        }}>
            {views.map(view => {
                const count = getScheduleCount(view);
                
                return (
                    <div key={view.id} style={{
                        background: 'rgba(255, 255, 255, 0.98)',
                        backdropFilter: 'blur(20px)',
                        borderRadius: '20px',
                        padding: '1.5rem',
                        boxShadow: selectedView === view.id 
                            ? `0 12px 32px ${view.color}30`
                            : '0 8px 24px rgba(21, 128, 61, 0.1)',
                        border: selectedView === view.id 
                            ? `2px solid ${view.color}`
                            : `1px solid ${view.color}20`,
                        textAlign: 'center',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer',
                        transform: selectedView === view.id ? 'translateY(-4px)' : 'translateY(0)'
                    }}
                    onClick={() => onViewChange(view.id)}
                    onMouseEnter={e => {
                        if (selectedView !== view.id) {
                            e.currentTarget.style.transform = 'translateY(-4px)';
                            e.currentTarget.style.boxShadow = `0 12px 32px ${view.color}30`;
                        }
                    }}
                    onMouseLeave={e => {
                        if (selectedView !== view.id) {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 8px 24px rgba(21, 128, 61, 0.1)';
                        }
                    }}>
                        <div style={{ 
                            width: '50px',
                            height: '50px',
                            background: selectedView === view.id 
                                ? 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)'
                                : 'rgba(34, 197, 94, 0.1)',
                            borderRadius: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 0.5rem'
                        }}>
                            {getViewIcon(view.icon, selectedView === view.id)}
                        </div>
                        <div style={{ 
                            color: selectedView === view.id ? view.color : '#374151', 
                            fontWeight: '700', 
                            fontSize: '1.5rem' 
                        }}>
                            {count}
                        </div>
                        <div style={{ color: '#6b7280', fontSize: '0.9rem' }}>{view.name}</div>
                    </div>
                );
            })}
        </section>
    );
};

export default ScheduleStats;
