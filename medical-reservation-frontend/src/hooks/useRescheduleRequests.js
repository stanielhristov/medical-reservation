import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
    getDoctorRescheduleRequests, 
    getPendingRescheduleRequestsForDoctor,
    getPatientRescheduleRequests,
    countPendingRequestsForDoctor
} from '../api/rescheduleRequests';
import { getDoctorByUserId } from '../api/doctors';

export const useRescheduleRequests = (userType = 'doctor') => {
    const [loading, setLoading] = useState(true);
    const [requests, setRequests] = useState([]);
    const [pendingCount, setPendingCount] = useState(0);
    const [doctorId, setDoctorId] = useState(null);
    const { user } = useAuth();

    useEffect(() => {
        if (user?.id) {
            if (userType === 'doctor') {
                fetchDoctorProfile();
            } else {
                fetchRequests();
            }
        }
    }, [user?.id, userType]);

    useEffect(() => {
        if (doctorId && userType === 'doctor') {
            fetchRequests();
            fetchPendingCount();
        }
    }, [doctorId, userType]);

    const fetchDoctorProfile = async () => {
        try {
            console.log('Fetching doctor profile for user ID:', user.id);
            const doctorProfile = await getDoctorByUserId(user.id);
            if (doctorProfile?.id) {
                console.log('Doctor profile found, doctor ID:', doctorProfile.id);
                setDoctorId(doctorProfile.id);
            } else {
                console.error('Doctor profile not found for user:', user.id);
                setLoading(false);
            }
        } catch (error) {
            console.error('Error fetching doctor profile:', error);
            setLoading(false);
        }
    };

    const fetchRequests = async () => {
        try {
            setLoading(true);
            let response;
            
            if (userType === 'doctor') {
                if (!doctorId) return;
                console.log('Fetching reschedule requests for doctor ID:', doctorId);
                response = await getDoctorRescheduleRequests(doctorId);
                console.log('Received reschedule requests:', response?.length || 0, 'requests');
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
            if (!doctorId) return;
            const response = await getPendingRescheduleRequestsForDoctor(doctorId);
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
            if (!doctorId) return;
            const count = await countPendingRequestsForDoctor(doctorId);
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
        if (userType === 'doctor' && doctorId) {
            fetchRequests();
            fetchPendingCount();
        } else if (userType === 'patient') {
            fetchRequests();
        }
    };

    return {
        loading,
        requests,
        pendingCount,
        doctorId,
        getFilteredRequests,
        refreshRequests,
        fetchPendingRequests
    };
};
