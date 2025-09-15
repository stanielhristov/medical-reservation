const RecentActivity = () => {
    const activities = [
        {
            id: 1,
            type: 'appointment',
            title: 'Appointment Scheduled',
            description: 'Dr. Sarah Johnson - Cardiology - Dec 28, 2024',
            icon: '✅',
            color: '#22c55e',
            time: '2 hours ago'
        },
        {
            id: 2,
            type: 'results',
            title: 'Lab Results Available',
            description: 'Blood work and cholesterol panel results',
            icon: '📋',
            color: '#3b82f6',
            time: '1 day ago'
        },
        {
            id: 3,
            type: 'prescription',
            title: 'Prescription Refilled',
            description: 'Lisinopril 10mg - 30 day supply',
            icon: '💊',
            color: '#a855f7',
            time: '3 days ago'
        }
    ];

    return (
        <section style={{
            background: 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(20px)',
            borderRadius: '24px',
            padding: '2.5rem',
            boxShadow: '0 12px 32px rgba(34, 197, 94, 0.1)',
            border: '1px solid rgba(34, 197, 94, 0.15)'
        }}>
            <h3 style={{
                fontSize: '1.8rem',
                fontWeight: '700',
                color: '#374151',
                margin: '0 0 2rem',
                letterSpacing: '-0.025em',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
            }}>
                <span style={{
                    width: '48px',
                    height: '48px',
                    background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '1.5rem'
                }}>⚡</span>
                Recent Activity
            </h3>
            
            <div style={{
                display: 'grid',
                gap: '1rem'
            }}>
                {activities.map((activity) => (
                    <div key={activity.id} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        padding: '1rem',
                        background: `${activity.color}0D`,
                        borderRadius: '12px',
                        border: `1px solid ${activity.color}1A`
                    }}>
                        <div style={{
                            width: '40px',
                            height: '40px',
                            background: `linear-gradient(135deg, ${activity.color} 0%, ${activity.color}CC 100%)`,
                            borderRadius: '10px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white'
                        }}>{activity.icon}</div>
                        <div style={{ flex: 1 }}>
                            <div style={{ color: '#374151', fontWeight: '600' }}>{activity.title}</div>
                            <div style={{ color: '#6b7280', fontSize: '0.9rem' }}>{activity.description}</div>
                        </div>
                        <div style={{ color: '#6b7280', fontSize: '0.85rem' }}>{activity.time}</div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default RecentActivity;
