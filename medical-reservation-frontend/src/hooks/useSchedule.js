import { useState, useCallback, useEffect } from 'react';
import { 
    getDoctorSchedule, 
    createSchedule, 
    updateSchedule, 
    deleteSchedule,
    markSlotAvailable,
    markSlotUnavailable,
    deleteMultipleSchedules,
    getDoctorScheduleWithStatusForDoctor
} from '../api/schedule';
import { onScheduleRefresh } from '../utils/scheduleRefreshUtils';

export const useSchedule = (doctorId) => {
    const [schedules, setSchedules] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedSchedules, setSelectedSchedules] = useState(new Set());

    const fetchSchedules = useCallback(async () => {
        if (!doctorId) return;
        
        try {
            setLoading(true);
            setError(null);
            
            const now = new Date();
            const startDate = new Date(now.getFullYear(), now.getMonth() - 1, 1); 
            const endDate = new Date(now.getFullYear(), now.getMonth() + 3, 0); 
            
            const scheduleData = await getDoctorScheduleWithStatusForDoctor(
                doctorId, 
                startDate.toISOString(), 
                endDate.toISOString()
            );
            setSchedules(scheduleData);
        } catch (err) {
            console.error('Error fetching schedule:', err);
            setError(err.message);
            setSchedules([]);
        } finally {
            setLoading(false);
        }
    }, [doctorId]);

    const addSchedule = useCallback(async (scheduleData) => {
        try {
            const newScheduleData = {
                doctorId: doctorId,
                startTime: new Date(scheduleData.startTime).toISOString(),
                endTime: new Date(scheduleData.endTime).toISOString(),
                available: scheduleData.available
            };

            const created = await createSchedule(newScheduleData);
            setSchedules(prev => [...prev, created]);
            return created;
        } catch (err) {
            console.error('Error creating schedule:', err);
            setError(err.message);
            throw err;
        }
    }, [doctorId]);

    const editSchedule = useCallback(async (scheduleData) => {
        try {
            const updatedScheduleData = {
                id: scheduleData.id,
                startTime: new Date(scheduleData.startTime).toISOString(),
                endTime: new Date(scheduleData.endTime).toISOString(),
                available: scheduleData.available
            };

            const updated = await updateSchedule(updatedScheduleData);
            setSchedules(prev => prev.map(s => s.id === scheduleData.id ? updated : s));
            return updated;
        } catch (err) {
            console.error('Error updating schedule:', err);
            setError(err.message);
            throw err;
        }
    }, []);

    const removeSchedule = useCallback(async (scheduleId) => {
        try {
            await deleteSchedule(scheduleId);
            setSchedules(prev => prev.filter(s => s.id !== scheduleId));
        } catch (err) {
            console.error('Error deleting schedule:', err);
            setError(err.message);
            throw err;
        }
    }, []);

    const toggleAvailability = useCallback(async (schedule) => {
        try {
            if (schedule.available || schedule.status === 'FREE') {
                await markSlotUnavailable(schedule.id);
                setSchedules(prev => prev.map(s => 
                    s.id === schedule.id 
                        ? { ...s, available: false, status: 'UNAVAILABLE' }
                        : s
                ));
            } else {
                await markSlotAvailable(schedule.id);
                setSchedules(prev => prev.map(s => 
                    s.id === schedule.id 
                        ? { ...s, available: true, status: 'FREE' }
                        : s
                ));
            }
        } catch (err) {
            console.error('Error toggling availability:', err);
            setError(err.message);
            throw err;
        }
    }, []);

    const getFilteredSchedules = useCallback((view, currentDate) => {
        const now = new Date();
        const startOfWeek = new Date(currentDate);
        startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 7);

        const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

        switch (view) {
            case 'week':
                return schedules.filter(schedule => {
                    const scheduleDate = new Date(schedule.startTime);
                    return scheduleDate >= startOfWeek && scheduleDate < endOfWeek;
                });
            case 'month':
                return schedules.filter(schedule => {
                    const scheduleDate = new Date(schedule.startTime);
                    return scheduleDate >= startOfMonth && scheduleDate <= endOfMonth;
                });
            case 'upcoming':
                return schedules.filter(schedule => 
                    new Date(schedule.startTime) > now
                ).sort((a, b) => new Date(a.startTime) - new Date(b.startTime));
            case 'available':
                return schedules.filter(schedule => schedule.available);
            default:
                return schedules;
        }
    }, [schedules]);

    const toggleScheduleSelection = useCallback((scheduleId) => {
        setSelectedSchedules(prev => {
            const newSet = new Set(prev);
            if (newSet.has(scheduleId)) {
                newSet.delete(scheduleId);
            } else {
                newSet.add(scheduleId);
            }
            return newSet;
        });
    }, []);

    const selectAllSchedules = useCallback((scheduleIds) => {
        setSelectedSchedules(new Set(scheduleIds));
    }, []);

    const clearSelection = useCallback(() => {
        setSelectedSchedules(new Set());
    }, []);

    const isScheduleSelected = useCallback((scheduleId) => {
        return selectedSchedules.has(scheduleId);
    }, [selectedSchedules]);

    const getSelectedCount = useCallback(() => {
        return selectedSchedules.size;
    }, [selectedSchedules]);

    const deleteBulkSchedules = useCallback(async (scheduleIds) => {
        if (!scheduleIds || scheduleIds.length === 0) return;
        
        try {
            await deleteMultipleSchedules(scheduleIds);
            setSchedules(prev => prev.filter(s => !scheduleIds.includes(s.id)));
            setSelectedSchedules(new Set()); 
        } catch (err) {
            console.error('Error deleting schedules:', err);
            setError(err.message);
            throw err;
        }
    }, []);

    useEffect(() => {
        if (!doctorId) return;

        const cleanup = onScheduleRefresh((eventData) => {
            if (!eventData.doctorId || eventData.doctorId === doctorId) {
                console.log('Schedule refresh triggered, refetching schedules...');
                fetchSchedules();
            }
        });

        return cleanup;
    }, [doctorId, fetchSchedules]);

    return {
        schedules,
        loading,
        error,
        fetchSchedules,
        addSchedule,
        editSchedule,
        removeSchedule,
        toggleAvailability,
        getFilteredSchedules,
        selectedSchedules,
        toggleScheduleSelection,
        selectAllSchedules,
        clearSelection,
        isScheduleSelected,
        getSelectedCount,
        deleteBulkSchedules
    };
};
