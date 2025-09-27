import { useState, useCallback } from 'react';
import { 
    createDoctorAvailability, 
    getDoctorAvailability, 
    getDoctorAvailabilityForDay,
    updateDoctorAvailability, 
    deleteDoctorAvailability,
    deleteDoctorAvailabilityForDay,
    generateSlotsFromAvailability
} from '../api/availability';

export const useAvailability = (doctorId) => {
    const [availabilities, setAvailabilities] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchAvailabilities = useCallback(async () => {
        if (!doctorId) return;
        
        try {
            setLoading(true);
            setError(null);
            const data = await getDoctorAvailability(doctorId);
            setAvailabilities(data);
        } catch (err) {
            console.error('Error fetching availabilities:', err);
            
            if (err.response?.status === 403) {
                setError('Access denied. Please ensure you are logged in as a doctor.');
            } else if (err.response?.status === 401) {
                setError('Authentication required. Please log in again.');
            } else {
                setError(err.message || 'Failed to fetch availability data');
            }
            setAvailabilities([]);
        } finally {
            setLoading(false);
        }
    }, [doctorId]);

    const fetchAvailabilityForDay = useCallback(async (dayOfWeek) => {
        if (!doctorId) return null;
        
        try {
            const data = await getDoctorAvailabilityForDay(doctorId, dayOfWeek);
            return data;
        } catch (err) {
            console.error('Error fetching availability for day:', err);
            setError(err.message);
            return null;
        }
    }, [doctorId]);

    const createAvailability = useCallback(async (availabilityData) => {
        try {
            setError(null);
            const created = await createDoctorAvailability({
                ...availabilityData,
                doctorId: doctorId
            });
            
            setAvailabilities(prev => {
                const filtered = prev.filter(av => av.dayOfWeek !== created.dayOfWeek);
                return [...filtered, created].sort((a, b) => {
                    const days = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];
                    return days.indexOf(a.dayOfWeek) - days.indexOf(b.dayOfWeek);
                });
            });
            
            return created;
        } catch (err) {
            console.error('Error creating availability:', err);
            setError(err.message);
            throw err;
        }
    }, [doctorId]);

    const updateAvailability = useCallback(async (availabilityId, availabilityData) => {
        try {
            setError(null);
            const updated = await updateDoctorAvailability(availabilityId, availabilityData);
            
            setAvailabilities(prev => 
                prev.map(av => av.id === availabilityId ? updated : av)
            );
            
            return updated;
        } catch (err) {
            console.error('Error updating availability:', err);
            setError(err.message);
            throw err;
        }
    }, []);

    const deleteAvailability = useCallback(async (availabilityId) => {
        try {
            setError(null);
            await deleteDoctorAvailability(availabilityId);
            
            setAvailabilities(prev => prev.filter(av => av.id !== availabilityId));
        } catch (err) {
            console.error('Error deleting availability:', err);
            setError(err.message);
            throw err;
        }
    }, []);

    const deleteAvailabilityForDay = useCallback(async (dayOfWeek) => {
        if (!doctorId) return;
        
        try {
            setError(null);
            await deleteDoctorAvailabilityForDay(doctorId, dayOfWeek);
            
            setAvailabilities(prev => prev.filter(av => av.dayOfWeek !== dayOfWeek));
        } catch (err) {
            console.error('Error deleting availability for day:', err);
            setError(err.message);
            throw err;
        }
    }, [doctorId]);

    const generateSlots = useCallback(async (startDate, endDate) => {
        if (!doctorId) return [];
        
        try {
            setError(null);
            const slots = await generateSlotsFromAvailability(doctorId, startDate, endDate);
            return slots;
        } catch (err) {
            console.error('Error generating slots:', err);
            setError(err.message);
            throw err;
        }
    }, [doctorId]);

    const getAvailabilityByDay = useCallback((dayOfWeek) => {
        return availabilities.find(av => av.dayOfWeek === dayOfWeek) || null;
    }, [availabilities]);

    const hasAvailabilitySetup = useCallback(() => {
        return availabilities.length > 0;
    }, [availabilities]);

    return {
        availabilities,
        loading,
        error,
        fetchAvailabilities,
        fetchAvailabilityForDay,
        createAvailability,
        updateAvailability,
        deleteAvailability,
        deleteAvailabilityForDay,
        generateSlots,
        getAvailabilityByDay,
        hasAvailabilitySetup
    };
};
