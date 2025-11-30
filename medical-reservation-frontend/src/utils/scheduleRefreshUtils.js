const SCHEDULE_REFRESH_EVENT = 'scheduleRefresh';

export const triggerScheduleRefresh = (doctorId) => {
    const event = new CustomEvent(SCHEDULE_REFRESH_EVENT, {
        detail: { doctorId, timestamp: Date.now() }
    });
    window.dispatchEvent(event);
    
    localStorage.setItem('scheduleRefreshTrigger', JSON.stringify({
        doctorId,
        timestamp: Date.now()
    }));
};

export const onScheduleRefresh = (callback) => {
    const handleRefresh = (event) => {
        callback(event.detail);
    };
    
    window.addEventListener(SCHEDULE_REFRESH_EVENT, handleRefresh);
    
    return () => {
        window.removeEventListener(SCHEDULE_REFRESH_EVENT, handleRefresh);
    };
};

export const checkScheduleRefreshNeeded = (doctorId, lastRefreshTime) => {
    try {
        const stored = localStorage.getItem('scheduleRefreshTrigger');
        if (!stored) return false;
        
        const { doctorId: storedDoctorId, timestamp } = JSON.parse(stored);
        
        return storedDoctorId === doctorId && timestamp > lastRefreshTime;
    } catch (error) {
        console.error('Error checking schedule refresh:', error);
        return false;
    }
};
