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
        
        if (selectedView === 'week') {
            // Calculate start and end of the week (7 days from current date)
            const startDate = new Date(currentDate);
            const endDate = new Date(currentDate);
            endDate.setDate(endDate.getDate() + 6);
            
            const startDay = startDate.getDate();
            const endDay = endDate.getDate();
            const startMonth = startDate.toLocaleDateString(locale, { month: 'long' });
            const endMonth = endDate.toLocaleDateString(locale, { month: 'long' });
            const year = endDate.getFullYear();
            
            // If same month, show: "22 - 28 December 2025"
            // If different months, show: "28 December - 3 January 2025"
            if (startDate.getMonth() === endDate.getMonth()) {
                return `${startDay} - ${endDay} ${startMonth} ${year}`;
            } else {
                return `${startDay} ${startMonth} - ${endDay} ${endMonth} ${year}`;
            }
        }
        
        const options = { 
            year: 'numeric', 
            month: 'long'
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
                            minWidth: '280px',
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
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                            <line x1="16" y1="2" x2="16" y2="6"/>
                            <line x1="8" y1="2" x2="8" y2="6"/>
                            <line x1="3" y1="10" x2="21" y2="10"/>
                        </svg>
                        {t('schedule.availableSlots')}
                    </button>
                )}
            </div>
        </section>
    );
};

export default ScheduleControls;
