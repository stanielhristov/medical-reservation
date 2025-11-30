import { useTranslation } from 'react-i18next';

const ScheduleControls = ({ 
    selectedView, 
    currentDate, 
    onDateChange, 
    onManageAvailability
}) => {
    const { t, i18n } = useTranslation();
    console.log('ScheduleControls rendering with:', {
        onManageAvailability: !!onManageAvailability
    });
    const formatDateForView = () => {
        const locale = i18n.language === 'bg' ? 'bg-BG' : 'en-US';
        const options = { 
            year: 'numeric', 
            month: 'long', 
            ...(selectedView === 'week' && { day: 'numeric' })
        };
        return currentDate.toLocaleDateString(locale, options);
    };

    const navigateDate = (direction) => {
        const newDate = new Date(currentDate);
        
        if (selectedView === 'week') {
            newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7));
        } else if (selectedView === 'month') {
            newDate.setMonth(newDate.getMonth() + (direction === 'next' ? 1 : -1));
        }
        
        onDateChange(newDate);
    };

    return (
        <section style={{
            background: 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(20px)',
            borderRadius: '20px',
            padding: '2rem',
            marginBottom: '2rem',
            boxShadow: '0 8px 24px rgba(21, 128, 61, 0.1)',
            border: '1px solid rgba(21, 128, 61, 0.1)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                {(selectedView === 'week' || selectedView === 'month') && (
                    <>
                        <button
                            onClick={() => navigateDate('prev')}
                            style={{
                                background: 'rgba(21, 128, 61, 0.1)',
                                border: '1px solid rgba(21, 128, 61, 0.2)',
                                borderRadius: '8px',
                                padding: '0.5rem 1rem',
                                cursor: 'pointer',
                                fontSize: '1rem',
                                color: '#15803d',
                                transition: 'all 0.2s ease'
                            }}
                            onMouseEnter={e => {
                                e.target.style.background = 'rgba(21, 128, 61, 0.15)';
                            }}
                            onMouseLeave={e => {
                                e.target.style.background = 'rgba(21, 128, 61, 0.1)';
                            }}
                        >
                            ← {t('schedule.previous')}
                        </button>
                        
                        <div style={{
                            fontSize: '1.2rem',
                            fontWeight: '600',
                            color: '#374151',
                            minWidth: '200px',
                            textAlign: 'center'
                        }}>
                            {formatDateForView()}
                        </div>
                        
                        <button
                            onClick={() => navigateDate('next')}
                            style={{
                                background: 'rgba(21, 128, 61, 0.1)',
                                border: '1px solid rgba(21, 128, 61, 0.2)',
                                borderRadius: '8px',
                                padding: '0.5rem 1rem',
                                cursor: 'pointer',
                                fontSize: '1rem',
                                color: '#15803d',
                                transition: 'all 0.2s ease'
                            }}
                            onMouseEnter={e => {
                                e.target.style.background = 'rgba(21, 128, 61, 0.15)';
                            }}
                            onMouseLeave={e => {
                                e.target.style.background = 'rgba(21, 128, 61, 0.1)';
                            }}
                        >
                            {t('schedule.next')} →
                        </button>
                    </>
                )}
                
                {(selectedView === 'upcoming' || selectedView === 'available') && (
                    <div style={{
                        fontSize: '1.2rem',
                        fontWeight: '600',
                        color: '#374151'
                    }}>
                        {selectedView === 'upcoming' ? t('schedule.upcomingAppointments') : t('schedule.availableSlots')}
                    </div>
                )}
            </div>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                {onManageAvailability && (
                    <button
                        type="button"
                        onClick={() => {
                            onManageAvailability();
                        }}
                        style={{
                            background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                            border: 'none',
                            borderRadius: '8px',
                            padding: '0.75rem 1.5rem',
                            cursor: 'pointer',
                            fontSize: '1rem',
                            color: 'white',
                            fontWeight: '600',
                            transition: 'all 0.2s ease',
                            boxShadow: '0 4px 12px rgba(5, 150, 105, 0.3)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}
                        onMouseEnter={e => {
                            e.target.style.transform = 'translateY(-2px)';
                            e.target.style.boxShadow = '0 6px 20px rgba(5, 150, 105, 0.4)';
                        }}
                        onMouseLeave={e => {
                            e.target.style.transform = 'translateY(0)';
                            e.target.style.boxShadow = '0 4px 12px rgba(5, 150, 105, 0.3)';
                        }}
                    >
                        🗓️ {t('schedule.availableSlots')}
                    </button>
                )}
            </div>
        </section>
    );
};

export default ScheduleControls;
