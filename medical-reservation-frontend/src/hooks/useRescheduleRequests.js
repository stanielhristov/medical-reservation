import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
    getDoctorRescheduleRequests, 
    getPendingRescheduleRequestsForDoctor,
    getPatientRescheduleRequests,
    countPendingRequestsForDoctor
} from '../api/rescheduleRequests';

export const useRescheduleRequests = (userType = 'doctor') => {
    const [loading, setLoading] = useState(true);
    const [requests, setRequests] = useState([]);
    const [pendingCount, setPendingCount] = useState(0);
    const { user } = useAuth();

    useEffect(() => {
        if (user?.id) {
            fetchRequests();
            if (userType === 'doctor') {
                fetchPendingCount();
            }
        }
    }, [user?.id, userType]);

    const fetchRequests = async () => {
        try {
            setLoading(true);
            let response;
            
            if (userType === 'doctor') {
                response = await getDoctorRescheduleRequests(user.id);
            } else {
                response = await getPatientRescheduleRequests(user.id);
            }
            
            setRequests(response || []);
        } catch (error) {
            console.error('Error fetching reschedule requests:', error);
            setRequests([]);
        } finally {
            setLoading(false);
        }
    };

    const fetchPendingRequests = async () => {
        try {
            setLoading(true);
            const response = await getPendingRescheduleRequestsForDoctor(user.id);
            setRequests(response || []);
        } catch (error) {
            console.error('Error fetching pending reschedule requests:', error);
            setRequests([]);
        } finally {
            setLoading(false);
        }
    };

    const fetchPendingCount = async () => {
        try {
            const count = await countPendingRequestsForDoctor(user.id);
            setPendingCount(count || 0);
        } catch (error) {
            console.error('Error fetching pending count:', error);
            setPendingCount(0);
        }
    };

    const getFilteredRequests = (status) => {
        if (!status || status === 'all') {
            return requests;
        }
        return requests.filter(request => request.status === status.toUpperCase());
    };

    const refreshRequests = () => {
        fetchRequests();
        if (userType === 'doctor') {
            fetchPendingCount();
        }
    };

    return {
        loading,
        requests,
        pendingCount,
        getFilteredRequests,
        refreshRequests,
        fetchPendingRequests
    };
};
