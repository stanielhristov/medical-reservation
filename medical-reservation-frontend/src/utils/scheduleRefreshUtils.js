// Utility for managing schedule refresh events across components

// Event name for schedule refresh
const SCHEDULE_REFRESH_EVENT = 'scheduleRefresh';

// Trigger a schedule refresh event
export const triggerScheduleRefresh = (doctorId) => {
    const event = new CustomEvent(SCHEDULE_REFRESH_EVENT, {
        detail: { doctorId, timestamp: Date.now() }
    });
    window.dispatchEvent(event);
    
    // Also store in localStorage as a backup mechanism
    localStorage.setItem('scheduleRefreshTrigger', JSON.stringify({
        doctorId,
        timestamp: Date.now()
    }));
};

// Listen for schedule refresh events
export const onScheduleRefresh = (callback) => {
    const handleRefresh = (event) => {
        callback(event.detail);
    };
    
    window.addEventListener(SCHEDULE_REFRESH_EVENT, handleRefresh);
    
    // Return cleanup function
    return () => {
        window.removeEventListener(SCHEDULE_REFRESH_EVENT, handleRefresh);
    };
};

// Check if schedule needs refresh (for components that might miss the event)
export const checkScheduleRefreshNeeded = (doctorId, lastRefreshTime) => {
    try {
        const stored = localStorage.getItem('scheduleRefreshTrigger');
        if (!stored) return false;
        
        const { doctorId: storedDoctorId, timestamp } = JSON.parse(stored);
        
        // Check if it's for the same doctor and after our last refresh
        return storedDoctorId === doctorId && timestamp > lastRefreshTime;
    } catch (error) {
        console.error('Error checking schedule refresh:', error);
        return false;
    }
};
