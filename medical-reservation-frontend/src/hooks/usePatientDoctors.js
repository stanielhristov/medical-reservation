import { useState, useEffect, useCallback, useMemo } from 'react';
import { getActiveDoctors, getAvailableSpecializations } from '../api/doctors';
import { getDoctorRatingStats, getMyRatingForDoctor, createRating, updateRating } from '../api/ratings';
import { getDoctorScheduleWithStatus } from '../api/schedule';

const getNextAvailableSlot = async (doctorId) => {
    try {
        const today = new Date();
        const endDate = new Date();
        endDate.setDate(today.getDate() + 30); 
        
        const slots = await getDoctorScheduleWithStatus(
            doctorId,
            today.toISOString(),
            endDate.toISOString()
        );
        
        const availableSlots = slots.filter(slot => slot.status === 'FREE');
        if (availableSlots.length === 0) {
            return 'No available slots';
        }
        
        availableSlots.sort((a, b) => new Date(a.startTime) - new Date(b.startTime));
        const nextSlot = availableSlots[0];
        
        const startTime = new Date(nextSlot.startTime);
        const now = new Date();
        const isToday = startTime.toDateString() === now.toDateString();
        const isTomorrow = startTime.toDateString() === new Date(now.getTime() + 24 * 60 * 60 * 1000).toDateString();
        
        let datePrefix = '';
        if (isToday) {
            datePrefix = 'Today ';
        } else if (isTomorrow) {
            datePrefix = 'Tomorrow ';
        } else {
            datePrefix = startTime.toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric' 
            }) + ' ';
        }
        
        const timeString = startTime.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
        
        return `${datePrefix}${timeString}`;
    } catch (error) {
        console.error(`Error fetching next available slot for doctor ${doctorId}:`, error);
        return 'Contact for availability';
    }
};

export const usePatientDoctors = (user) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSpecialization, setSelectedSpecialization] = useState('');
    const [doctors, setDoctors] = useState([]);
    const [specializations, setSpecializations] = useState(['All Specializations']);
    const [showBookingModal, setShowBookingModal] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [showRatingModal, setShowRatingModal] = useState(false);
    const [selectedDoctorForRating, setSelectedDoctorForRating] = useState(null);
    const [userRating, setUserRating] = useState(null);
    const [ratingLoading, setRatingLoading] = useState(false);
    const [doctorRatingStats, setDoctorRatingStats] = useState({});
    const [showCommentsModal, setShowCommentsModal] = useState(false);
    const [selectedDoctorForComments, setSelectedDoctorForComments] = useState(null);
    const [message, setMessage] = useState({ text: '', type: '' });
    const [bookingLoading, setBookingLoading] = useState(false);

    const fetchDoctors = useCallback(async () => {
        try {
            setError(null);
            console.log('Fetching doctors...');
            const doctorsData = await getActiveDoctors();
            console.log('Doctors data received:', doctorsData);

            const transformedDoctors = await Promise.all(doctorsData.map(async (doctor) => {
                try {
                    const [ratingStats, nextAvailable] = await Promise.all([
                        getDoctorRatingStats(doctor.id),
                        getNextAvailableSlot(doctor.id)
                    ]);
                    
                    setDoctorRatingStats(prev => ({
                        ...prev,
                        [doctor.id]: ratingStats
                    }));
                    
                    return {
                        id: doctor.id,
                        name: doctor.fullName,
                        specialization: doctor.specialization,
                        experience: doctor.experience || "N/A",
                        rating: ratingStats.averageRating || 0,
                        reviews: ratingStats.totalRatings || 0,
                        location: doctor.location && doctor.location.trim() !== '' ? doctor.location : "Location not specified",
                        nextAvailable: nextAvailable,
                        image: "👨‍⚕️",
                        about: doctor.bio || "Experienced healthcare professional",
                        education: doctor.education || "Licensed Medical Professional",
                        consultationFee: doctor.price ? `$${doctor.price}` : "Price not set"
                    };
                } catch (error) {
                    console.error(`Error fetching data for doctor ${doctor.id}:`, error);
                    const nextAvailable = await getNextAvailableSlot(doctor.id);
                    return {
                        id: doctor.id,
                        name: doctor.fullName,
                        specialization: doctor.specialization,
                        experience: doctor.experience || "N/A",
                        rating: doctor.rating || 0,
                        reviews: doctor.totalRatings || 0,
                        location: doctor.location && doctor.location.trim() !== '' ? doctor.location : "Location not specified",
                        nextAvailable: nextAvailable,
                        image: "👨‍⚕️",
                        about: doctor.bio || "Experienced healthcare professional",
                        education: doctor.education || "Licensed Medical Professional",
                        consultationFee: doctor.price ? `$${doctor.price}` : "Price not set"
                    };
                }
            }));
            
            setDoctors(transformedDoctors);
        } catch (error) {
            console.error('Error fetching doctors:', error);
            console.error('Error details:', error.response?.data || error.message);
            setError(error.response?.data?.message || error.message || 'Failed to load doctors');
            setDoctors([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchDoctors();
        fetchSpecializations();
    }, [fetchDoctors]);

    useEffect(() => {
        const handleVisibilityChange = () => {
            if (!document.hidden) {
                fetchDoctors();
            }
        };

        const handleDoctorProfileUpdate = () => {
            fetchDoctors();
        };

        const handleStorageChange = (e) => {
            if (e.key === 'doctorProfileUpdated') {
                fetchDoctors();
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);
        window.addEventListener('doctorProfileUpdated', handleDoctorProfileUpdate);
        window.addEventListener('storage', handleStorageChange);
        
        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            window.removeEventListener('doctorProfileUpdated', handleDoctorProfileUpdate);
            window.removeEventListener('storage', handleStorageChange);
        };
    }, [fetchDoctors]);

    const fetchSpecializations = useCallback(async () => {
        try {
            const availableSpecializations = await getAvailableSpecializations();
            setSpecializations(['All Specializations', ...availableSpecializations]);
        } catch (error) {
            console.error('Error fetching specializations:', error);
            setSpecializations([
                'All Specializations',
                'Cardiology',
                'Dermatology', 
                'General Practice',
                'Neurology',
                'Orthopedics',
                'Pediatrics',
                'Psychiatry'
            ]);
        }
    }, []);

    const filteredDoctors = useMemo(() => {
        return doctors.filter(doctor => {
            const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                               doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesSpecialization = selectedSpecialization === '' ||
                                         selectedSpecialization === 'All Specializations' ||
                                         doctor.specialization === selectedSpecialization;
            return matchesSearch && matchesSpecialization;
        });
    }, [doctors, searchTerm, selectedSpecialization]);

    const handleRateDoctor = useCallback(async (doctorId) => {
        setSelectedDoctorForRating(doctorId);
        setRatingLoading(true);
        
        try {
            const existingRating = await getMyRatingForDoctor(doctorId);
            setUserRating(existingRating);
        } catch (error) {
            console.error('Error fetching user rating:', error);
            setUserRating(null);
        } finally {
            setRatingLoading(false);
            setShowRatingModal(true);
        }
    }, [user?.id]);

    const submitRating = useCallback(async (ratingData) => {
        const { rating, comment } = ratingData;
        try {
            if (userRating) {
                await updateRating(userRating.id, { rating, comment });
            } else {
                await createRating({
                    doctorId: selectedDoctorForRating,
                    rating,
                    comment
                });
            }
            
            setShowRatingModal(false);
            await fetchDoctors();
        } catch (error) {
            console.error('Error submitting rating:', error);
            throw error;
        }
    }, [userRating, user?.id, selectedDoctorForRating, fetchDoctors]);

    const handleViewComments = useCallback((doctorId) => {
        setSelectedDoctorForComments(doctorId);
        setShowCommentsModal(true);
    }, []);

    const handleBookingSuccess = useCallback((message) => {
        setMessage({ text: message, type: 'success' });
        setShowBookingModal(false);
        setBookingLoading(false);
        fetchDoctors();
        setTimeout(() => setMessage({ text: '', type: '' }), 5000);
    }, [fetchDoctors]);

    const handleBookingError = useCallback((error) => {
        setMessage({ text: error, type: 'error' });
        setBookingLoading(false);
        setTimeout(() => setMessage({ text: '', type: '' }), 5000);
    }, []);

    const clearMessage = useCallback(() => {
        setMessage({ text: '', type: '' });
    }, []);

    return {
        loading,
        error,
        searchTerm,
        setSearchTerm,
        selectedSpecialization,
        setSelectedSpecialization,
        doctors,
        specializations,
        showBookingModal,
        setShowBookingModal,
        selectedDoctor,
        setSelectedDoctor,
        showRatingModal,
        setShowRatingModal,
        selectedDoctorForRating,
        setSelectedDoctorForRating,
        userRating,
        ratingLoading,
        doctorRatingStats,
        showCommentsModal,
        setShowCommentsModal,
        selectedDoctorForComments,
        setSelectedDoctorForComments,
        filteredDoctors,
        handleRateDoctor,
        submitRating,
        handleViewComments,
        handleBookingSuccess,
        handleBookingError,
        clearMessage,
        message,
        bookingLoading,
        refreshDoctors: fetchDoctors
    };
};
