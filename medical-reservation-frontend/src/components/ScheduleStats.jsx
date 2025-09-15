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
                        <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{view.icon}</div>
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
