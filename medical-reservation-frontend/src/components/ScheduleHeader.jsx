import { useTranslation } from 'react-i18next';

const ScheduleHeader = () => {
    const { t } = useTranslation();
    return (
        <section style={{
            background: 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(20px)',
            borderRadius: '24px',
            padding: '3rem',
            marginBottom: '2rem',
            boxShadow: '0 20px 40px rgba(21, 128, 61, 0.15)',
            border: '1px solid rgba(21, 128, 61, 0.1)',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden'
        }}>
            <div style={{
                position: 'absolute',
                top: '-50%',
                right: '-20%',
                width: '300px',
                height: '300px',
                background: 'radial-gradient(circle, rgba(21, 128, 61, 0.05) 0%, transparent 70%)',
                borderRadius: '50%',
                zIndex: 0
            }} />
            
            <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{
                    width: '100px',
                    height: '100px',
                    background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                    borderRadius: '20px',
                    margin: '0 auto 2rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 16px 40px rgba(34, 197, 94, 0.3)'
                }}>
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                        <line x1="16" y1="2" x2="16" y2="6"/>
                        <line x1="8" y1="2" x2="8" y2="6"/>
                        <line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                </div>
                
                <h1 style={{
                    fontSize: '2.5rem',
                    fontWeight: '800',
                    color: '#374151',
                    margin: '0 0 1rem',
                    letterSpacing: '-0.025em'
                }}>
                    {t('schedule.scheduleManagement')}
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
                    {t('schedule.scheduleManagementDescription')}
                </p>
            </div>
        </section>
    );
};

export default ScheduleHeader;
