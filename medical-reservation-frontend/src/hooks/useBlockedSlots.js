import { useState, useCallback } from 'react';
import { 
    createBlockedSlot, 
    getDoctorBlockedSlots, 
    getDoctorBlockedSlotsInRange,
    updateBlockedSlot, 
    deleteBlockedSlot,
    isSlotBlocked
} from '../api/blockedSlots';

export const useBlockedSlots = (doctorId) => {
    const [blockedSlots, setBlockedSlots] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchBlockedSlots = useCallback(async () => {
        if (!doctorId) return;
        
        try {
            setLoading(true);
            setError(null);
            const data = await getDoctorBlockedSlots(doctorId);
            setBlockedSlots(data);
        } catch (err) {
            console.error('Error fetching blocked slots:', err);
            setError(err.message);
            setBlockedSlots([]);
        } finally {
            setLoading(false);
        }
    }, [doctorId]);

    const fetchBlockedSlotsInRange = useCallback(async (startTime, endTime) => {
        if (!doctorId) return [];
        
        try {
            const data = await getDoctorBlockedSlotsInRange(doctorId, startTime, endTime);
            return data;
        } catch (err) {
            console.error('Error fetching blocked slots in range:', err);
            setError(err.message);
            return [];
        }
    }, [doctorId]);

    const createBlockedSlot = useCallback(async (blockedSlotData) => {
        try {
            setError(null);
            const created = await createBlockedSlot({
                ...blockedSlotData,
                doctorId: doctorId
            });
            
            setBlockedSlots(prev => [...prev, created].sort((a, b) => 
                new Date(a.startTime) - new Date(b.startTime)
            ));
            
            return created;
        } catch (err) {
            console.error('Error creating blocked slot:', err);
            setError(err.message);
            throw err;
        }
    }, [doctorId]);

    const updateBlockedSlotData = useCallback(async (blockedSlotId, blockedSlotData) => {
        try {
            setError(null);
            const updated = await updateBlockedSlot(blockedSlotId, blockedSlotData);
            
            setBlockedSlots(prev => 
                prev.map(slot => slot.id === blockedSlotId ? updated : slot)
                    .sort((a, b) => new Date(a.startTime) - new Date(b.startTime))
            );
            
            return updated;
        } catch (err) {
            console.error('Error updating blocked slot:', err);
            setError(err.message);
            throw err;
        }
    }, []);

    const removeBlockedSlot = useCallback(async (blockedSlotId) => {
        try {
            setError(null);
            await deleteBlockedSlot(blockedSlotId);
            
            setBlockedSlots(prev => prev.filter(slot => slot.id !== blockedSlotId));
        } catch (err) {
            console.error('Error deleting blocked slot:', err);
            setError(err.message);
            throw err;
        }
    }, []);

    const checkSlotBlocked = useCallback(async (startTime, endTime) => {
        if (!doctorId) return false;
        
        try {
            setError(null);
            const blocked = await isSlotBlocked(doctorId, startTime, endTime);
            return blocked;
        } catch (err) {
            console.error('Error checking if slot is blocked:', err);
            setError(err.message);
            return false;
        }
    }, [doctorId]);

    // Helper to get blocked slots for a specific date
    const getBlockedSlotsForDate = useCallback((date) => {
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);

        return blockedSlots.filter(slot => {
            const slotStart = new Date(slot.startTime);
            return slotStart >= startOfDay && slotStart <= endOfDay;
        });
    }, [blockedSlots]);

    const isTimeRangeBlocked = useCallback((startTime, endTime) => {
        return blockedSlots.some(slot => {
            const slotStart = new Date(slot.startTime);
            const slotEnd = new Date(slot.endTime);
            const rangeStart = new Date(startTime);
            const rangeEnd = new Date(endTime);
            
            return rangeStart < slotEnd && rangeEnd > slotStart;
        });
    }, [blockedSlots]);

    return {
        blockedSlots,
        loading,
        error,
        fetchBlockedSlots,
        fetchBlockedSlotsInRange,
        createBlockedSlot,
        updateBlockedSlot: updateBlockedSlotData,
        removeBlockedSlot,
        checkSlotBlocked,
        getBlockedSlotsForDate,
        isTimeRangeBlocked
    };
};
