import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getActiveDoctors, getAvailableSpecializations } from '../../api/doctors';
import { getDoctorRatingStats, getMyRatingForDoctor, createRating, updateRating } from '../../api/ratings';
import StarRating from '../../components/StarRating';
import RatingModal from '../../components/RatingModal';
import RatingCommentsModal from '../../components/RatingCommentsModal';

const PatientDoctors = () => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
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

    useEffect(() => {
        fetchDoctors();
        fetchSpecializations();
    }, []);

    const fetchDoctors = async () => {
        try {
            const doctorsData = await getActiveDoctors();

            const transformedDoctors = await Promise.all(doctorsData.map(async (doctor) => {
                // Fetch rating stats for each doctor
                try {
                    const ratingStats = await getDoctorRatingStats(doctor.id);
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
                        location: "Medical Center",
                        nextAvailable: "Contact for availability",
                        image: "👨‍⚕️",
                        about: doctor.bio || "Experienced healthcare professional",
                        education: doctor.education || "Licensed Medical Professional",
                        consultationFee: "$120"
                    };
                } catch (error) {
                    console.error(`Error fetching rating stats for doctor ${doctor.id}:`, error);
                    return {
                        id: doctor.id,
                        name: doctor.fullName,
                        specialization: doctor.specialization,
                        experience: doctor.experience || "N/A",
                        rating: doctor.rating || 0,
                        reviews: doctor.totalRatings || 0,
                        location: "Medical Center",
                        nextAvailable: "Contact for availability",
                        image: "👨‍⚕️",
                        about: doctor.bio || "Experienced healthcare professional",
                        education: doctor.education || "Licensed Medical Professional",
                        consultationFee: "$120"
                    };
                }
            }));
            
            setDoctors(transformedDoctors);
        } catch (error) {
            console.error('Error fetching doctors:', error);
            setDoctors([]);
        } finally {
            setLoading(false);
        }
    };

    const fetchSpecializations = async () => {
        try {
            const availableSpecializations = await getAvailableSpecializations();
            setSpecializations(['All Specializations', ...availableSpecializations]);
        } catch (error) {
            console.error('Error fetching specializations:', error);
            // Keep default specializations on error
            setSpecializations([
                'All Specializations',
                'Cardiology',
                'Dermatology', 
                'General Practice',
                'Neurology',
                'Orthopedics',
                'Pediatrics',
                'Psychiatry',
                'Radiology'
            ]);
        }
    };

    const filteredDoctors = doctors.filter(doctor => {
        const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesSpecialization = selectedSpecialization === '' || 
                                     selectedSpecialization === 'All Specializations' ||
                                     doctor.specialization === selectedSpecialization;
        return matchesSearch && matchesSpecialization;
    });

    const handleBookAppointment = (doctor) => {
        setSelectedDoctor(doctor);
        setShowBookingModal(true);
    };

    const handleRateDoctor = async (doctor) => {
        setSelectedDoctorForRating(doctor);
        
        // Check if user already has a rating for this doctor
        try {
            const existingRating = await getMyRatingForDoctor(doctor.id);
            setUserRating(existingRating);
        } catch (error) {
            console.error('Error fetching user rating:', error);
            setUserRating(null);
        }
        
        setShowRatingModal(true);
    };

    const handleSubmitRating = async (ratingData) => {
        setRatingLoading(true);
        try {
            if (userRating) {
                // Update existing rating
                await updateRating(userRating.id, {
                    rating: ratingData.rating,
                    comment: ratingData.comment
                });
            } else {
                // Create new rating
                await createRating({
                    doctorId: ratingData.doctorId,
                    rating: ratingData.rating,
                    comment: ratingData.comment
                });
            }
            
            // Refresh doctor data to show updated ratings
            await fetchDoctors();
            
            setShowRatingModal(false);
            setSelectedDoctorForRating(null);
            setUserRating(null);
        } catch (error) {
            console.error('Error submitting rating:', error);
            alert('Failed to submit rating. Please try again.');
        } finally {
            setRatingLoading(false);
        }
    };

    const handleShowComments = (doctor) => {
        setSelectedDoctorForComments(doctor);
        setShowCommentsModal(true);
    };

    if (loading) {
        return (
            <div style={{
                minHeight: '100vh',
                width: '100vw',
                background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 50%, #bbf7d0 100%)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                boxSizing: 'border-box'
            }}>
                <div style={{
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '24px',
                    padding: '3rem',
                    textAlign: 'center',
                    boxShadow: '0 20px 40px rgba(34, 197, 94, 0.1), 0 8px 32px rgba(0, 0, 0, 0.05)',
                    border: '1px solid rgba(34, 197, 94, 0.1)'
                }}>
                    <div style={{
                        width: '60px',
                        height: '60px',
                        border: '4px solid rgba(34, 197, 94, 0.2)',
                        borderTop: '4px solid #22c55e',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite',
                        margin: '0 auto 1.5rem'
                    }} />
                    <p style={{ color: '#6b7280', margin: 0, fontSize: '1rem', fontWeight: '500' }}>Loading doctors...</p>
                </div>
            </div>
        );
    }

    return (
        <div style={{
            position: 'relative'
        }}>
            {/* Background decorations */}
            <div style={{
                position: 'absolute',
                top: '5%',
                right: '8%',
                width: '300px',
                height: '300px',
                background: 'radial-gradient(circle, rgba(34, 197, 94, 0.1) 0%, rgba(34, 197, 94, 0.05) 50%, transparent 100%)',
                borderRadius: '50%',
                zIndex: 0
            }} />
            
            <div style={{
                position: 'absolute',
                bottom: '10%',
                left: '5%',
                width: '250px',
                height: '250px',
                background: 'radial-gradient(circle, rgba(5, 150, 105, 0.08) 0%, rgba(5, 150, 105, 0.03) 50%, transparent 100%)',
                borderRadius: '50%',
                zIndex: 0
            }} />

            {/* Main Content */}
            <main style={{
                padding: '2.5rem 0',
                position: 'relative',
                zIndex: 1
            }}>
                {/* Header Section */}
                <section style={{
                    background: 'rgba(255, 255, 255, 0.98)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '32px',
                    padding: '3rem',
                    marginBottom: '3rem',
                    boxShadow: '0 32px 64px rgba(34, 197, 94, 0.12), 0 16px 32px rgba(0, 0, 0, 0.06)',
                    border: '1px solid rgba(34, 197, 94, 0.15)',
                    textAlign: 'center'
                }}>
                    <div style={{
                        width: '100px',
                        height: '100px',
                        background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                        borderRadius: '20px',
                        margin: '0 auto 2rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 16px 40px rgba(34, 197, 94, 0.3)'
                    }}>
                        <span style={{ fontSize: '3rem', color: 'white' }}>👨‍⚕️</span>
                    </div>
                    
                    <h1 style={{
                        fontSize: '2.5rem',
                        fontWeight: '800',
                        color: '#374151',
                        margin: '0 0 1rem',
                        letterSpacing: '-0.025em'
                    }}>
                        Find Your Perfect Doctor
                    </h1>
                    
                    <p style={{
                        fontSize: '1.2rem',
                        color: '#6b7280',
                        margin: 0,
                        maxWidth: '600px',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        lineHeight: '1.6'
                    }}>
                        Browse through our network of qualified healthcare professionals and book appointments with ease
                    </p>
                </section>

                {/* Search and Filter Section */}
                <section style={{
                    background: 'rgba(255, 255, 255, 0.98)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '24px',
                    padding: '2rem',
                    marginBottom: '3rem',
                    boxShadow: '0 12px 32px rgba(34, 197, 94, 0.1)',
                    border: '1px solid rgba(34, 197, 94, 0.15)'
                }}>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '1.5rem',
                        alignItems: 'end'
                    }}>
                        <div>
                            <label style={{
                                display: 'block',
                                marginBottom: '0.5rem',
                                fontWeight: '600',
                                color: '#374151'
                            }}>
                                Search Doctors
                            </label>
                            <input
                                type="text"
                                placeholder="Search by name or specialization..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '1rem',
                                    border: '2px solid rgba(34, 197, 94, 0.2)',
                                    borderRadius: '12px',
                                    fontSize: '1rem',
                                    background: 'rgba(255, 255, 255, 0.8)',
                                    backdropFilter: 'blur(10px)',
                                    outline: 'none',
                                    transition: 'all 0.3s ease'
                                }}
                                onFocus={(e) => {
                                    e.target.style.borderColor = '#22c55e';
                                    e.target.style.boxShadow = '0 0 0 3px rgba(34, 197, 94, 0.1)';
                                }}
                                onBlur={(e) => {
                                    e.target.style.borderColor = 'rgba(34, 197, 94, 0.2)';
                                    e.target.style.boxShadow = 'none';
                                }}
                            />
                        </div>
                        
                        <div>
                            <label style={{
                                display: 'block',
                                marginBottom: '0.5rem',
                                fontWeight: '600',
                                color: '#374151'
                            }}>
                                Specialization
                            </label>
                            <select
                                value={selectedSpecialization}
                                onChange={(e) => setSelectedSpecialization(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '1rem',
                                    border: '2px solid rgba(34, 197, 94, 0.2)',
                                    borderRadius: '12px',
                                    fontSize: '1rem',
                                    background: 'rgba(255, 255, 255, 0.8)',
                                    backdropFilter: 'blur(10px)',
                                    outline: 'none',
                                    cursor: 'pointer'
                                }}
                            >
                                {specializations.map(spec => (
                                    <option key={spec} value={spec === 'All Specializations' ? '' : spec}>
                                        {spec}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </section>

                {/* Doctors Grid */}
                <section>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
                        gap: '2rem'
                    }}>
                        {filteredDoctors.map((doctor) => (
                            <div
                                key={doctor.id}
                                style={{
                                    background: 'rgba(255, 255, 255, 0.98)',
                                    backdropFilter: 'blur(20px)',
                                    borderRadius: '24px',
                                    padding: '2rem',
                                    boxShadow: '0 12px 32px rgba(34, 197, 94, 0.1)',
                                    border: '1px solid rgba(34, 197, 94, 0.15)',
                                    transition: 'all 0.4s ease',
                                    cursor: 'pointer',
                                    position: 'relative',
                                    overflow: 'hidden'
                                }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.transform = 'translateY(-8px)';
                                    e.currentTarget.style.boxShadow = '0 20px 48px rgba(34, 197, 94, 0.2)';
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 12px 32px rgba(34, 197, 94, 0.1)';
                                }}
                            >
                                <div style={{
                                    position: 'absolute',
                                    top: '10px',
                                    right: '10px',
                                    width: '80px',
                                    height: '80px',
                                    background: 'radial-gradient(circle, rgba(34, 197, 94, 0.1) 0%, transparent 70%)',
                                    borderRadius: '50%'
                                }} />
                                
                                {/* Doctor Header */}
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '1rem',
                                    marginBottom: '1.5rem'
                                }}>
                                    <div style={{
                                        width: '60px',
                                        height: '60px',
                                        background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                                        borderRadius: '16px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '1.8rem',
                                        boxShadow: '0 8px 24px rgba(34, 197, 94, 0.3)'
                                    }}>
                                        {doctor.image}
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <h3 style={{
                                            fontSize: '1.3rem',
                                            fontWeight: '700',
                                            color: '#374151',
                                            margin: '0 0 0.25rem'
                                        }}>
                                            {doctor.name}
                                        </h3>
                                        <p style={{
                                            color: '#059669',
                                            fontWeight: '600',
                                            margin: '0 0 0.25rem',
                                            fontSize: '1rem'
                                        }}>
                                            {doctor.specialization}
                                        </p>
                                        <p style={{
                                            color: '#6b7280',
                                            fontSize: '0.9rem',
                                            margin: 0
                                        }}>
                                            {doctor.experience} experience
                                        </p>
                                    </div>
                                </div>

                                {/* Rating and Reviews */}
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    marginBottom: '1rem'
                                }}>
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '1rem'
                                    }}>
                                        <div
                                            onClick={() => handleShowComments(doctor)}
                                            style={{
                                                cursor: 'pointer',
                                                padding: '0.25rem',
                                                borderRadius: '8px',
                                                transition: 'all 0.2s ease',
                                                background: 'transparent'
                                            }}
                                            onMouseEnter={e => {
                                                e.target.style.background = 'rgba(34, 197, 94, 0.1)';
                                                e.target.style.transform = 'scale(1.02)';
                                            }}
                                            onMouseLeave={e => {
                                                e.target.style.background = 'transparent';
                                                e.target.style.transform = 'scale(1)';
                                            }}
                                            title="Click to view patient reviews"
                                        >
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                <StarRating
                                                    rating={doctor.rating}
                                                    totalRatings={doctor.reviews}
                                                    interactive={false}
                                                    size="medium"
                                                    showValue={true}
                                                />
                                                <span style={{
                                                    fontSize: '0.8rem',
                                                    color: '#6b7280',
                                                    opacity: 0.7
                                                }}>
                                                    💬
                                                </span>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => handleRateDoctor(doctor)}
                                            style={{
                                                background: doctorRatingStats[doctor.id]?.userHasRated 
                                                    ? 'rgba(59, 130, 246, 0.1)' 
                                                    : 'rgba(34, 197, 94, 0.1)',
                                                color: doctorRatingStats[doctor.id]?.userHasRated 
                                                    ? '#3b82f6' 
                                                    : '#059669',
                                                border: `1px solid ${doctorRatingStats[doctor.id]?.userHasRated 
                                                    ? 'rgba(59, 130, 246, 0.3)' 
                                                    : 'rgba(34, 197, 94, 0.3)'}`,
                                                borderRadius: '6px',
                                                padding: '0.4rem 0.8rem',
                                                fontSize: '0.8rem',
                                                fontWeight: '600',
                                                cursor: 'pointer',
                                                transition: 'all 0.2s ease'
                                            }}
                                            onMouseEnter={e => {
                                                e.target.style.transform = 'scale(1.05)';
                                            }}
                                            onMouseLeave={e => {
                                                e.target.style.transform = 'scale(1)';
                                            }}
                                        >
                                            {doctorRatingStats[doctor.id]?.userHasRated ? 'Update Rating' : 'Rate Doctor'}
                                        </button>
                                    </div>
                                    <div style={{
                                        padding: '0.5rem 1rem',
                                        background: 'rgba(34, 197, 94, 0.1)',
                                        color: '#16a34a',
                                        borderRadius: '20px',
                                        fontSize: '0.85rem',
                                        fontWeight: '600'
                                    }}>
                                        {doctor.consultationFee}
                                    </div>
                                </div>

                                {/* About */}
                                <p style={{
                                    color: '#6b7280',
                                    fontSize: '0.95rem',
                                    lineHeight: '1.5',
                                    marginBottom: '1rem'
                                }}>
                                    {doctor.about}
                                </p>

                                {/* Details */}
                                <div style={{
                                    background: 'rgba(34, 197, 94, 0.05)',
                                    borderRadius: '12px',
                                    padding: '1rem',
                                    marginBottom: '1.5rem'
                                }}>
                                    <div style={{
                                        display: 'grid',
                                        gridTemplateColumns: '1fr 1fr',
                                        gap: '0.5rem',
                                        fontSize: '0.9rem'
                                    }}>
                                        <div>
                                            <span style={{ color: '#6b7280' }}>Location:</span>
                                            <div style={{ color: '#374151', fontWeight: '600' }}>{doctor.location}</div>
                                        </div>
                                        <div>
                                            <span style={{ color: '#6b7280' }}>Next Available:</span>
                                            <div style={{ color: '#22c55e', fontWeight: '600' }}>{doctor.nextAvailable}</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Book Appointment Button */}
                                <button
                                    onClick={() => handleBookAppointment(doctor)}
                                    style={{
                                        width: '100%',
                                        padding: '1rem',
                                        background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '12px',
                                        fontSize: '1rem',
                                        fontWeight: '600',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease',
                                        boxShadow: '0 4px 12px rgba(34, 197, 94, 0.3)'
                                    }}
                                    onMouseEnter={e => {
                                        e.target.style.transform = 'translateY(-2px)';
                                        e.target.style.boxShadow = '0 6px 16px rgba(34, 197, 94, 0.4)';
                                    }}
                                    onMouseLeave={e => {
                                        e.target.style.transform = 'translateY(0)';
                                        e.target.style.boxShadow = '0 4px 12px rgba(34, 197, 94, 0.3)';
                                    }}
                                >
                                    📅 Book Appointment
                                </button>
                            </div>
                        ))}
                    </div>

                    {filteredDoctors.length === 0 && (
                        <div style={{
                            background: 'rgba(255, 255, 255, 0.98)',
                            backdropFilter: 'blur(20px)',
                            borderRadius: '24px',
                            padding: '3rem',
                            textAlign: 'center',
                            boxShadow: '0 12px 32px rgba(34, 197, 94, 0.1)',
                            border: '1px solid rgba(34, 197, 94, 0.15)'
                        }}>
                            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
                            <h3 style={{
                                fontSize: '1.5rem',
                                fontWeight: '600',
                                color: '#374151',
                                margin: '0 0 0.5rem'
                            }}>
                                No doctors found
                            </h3>
                            <p style={{ color: '#6b7280', margin: 0 }}>
                                Try adjusting your search criteria or browse all doctors
                            </p>
                        </div>
                    )}
                </section>
            </main>

            {/* Booking Modal */}
            {showBookingModal && selectedDoctor && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0, 0, 0, 0.7)',
                    backdropFilter: 'blur(10px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000,
                    padding: '2rem'
                }}>
                    <div style={{
                        background: 'white',
                        borderRadius: '24px',
                        padding: '2.5rem',
                        maxWidth: '500px',
                        width: '100%',
                        boxShadow: '0 32px 64px rgba(0, 0, 0, 0.2)',
                        position: 'relative'
                    }}>
                        <button
                            onClick={() => setShowBookingModal(false)}
                            style={{
                                position: 'absolute',
                                top: '1rem',
                                right: '1rem',
                                background: 'none',
                                border: 'none',
                                fontSize: '1.5rem',
                                cursor: 'pointer',
                                color: '#6b7280'
                            }}
                        >
                            ✕
                        </button>

                        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                            <div style={{
                                width: '80px',
                                height: '80px',
                                background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                                borderRadius: '16px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '2rem',
                                margin: '0 auto 1rem'
                            }}>
                                {selectedDoctor.image}
                            </div>
                            <h3 style={{
                                fontSize: '1.5rem',
                                fontWeight: '700',
                                color: '#374151',
                                margin: '0 0 0.5rem'
                            }}>
                                Book Appointment
                            </h3>
                            <p style={{ color: '#6b7280', margin: 0 }}>
                                {selectedDoctor.name} - {selectedDoctor.specialization}
                            </p>
                        </div>

                        <div style={{
                            background: 'rgba(34, 197, 94, 0.1)',
                            borderRadius: '12px',
                            padding: '1.5rem',
                            textAlign: 'center',
                            marginBottom: '2rem'
                        }}>
                            <p style={{
                                color: '#16a34a',
                                fontWeight: '600',
                                margin: 0,
                                fontSize: '1.1rem'
                            }}>
                                🎉 Booking functionality will be integrated with the appointment system!
                            </p>
                            <p style={{
                                color: '#059669',
                                margin: '0.5rem 0 0',
                                fontSize: '0.9rem'
                            }}>
                                This will connect to the appointments page for scheduling.
                            </p>
                        </div>

                        <div style={{
                            display: 'flex',
                            gap: '1rem'
                        }}>
                            <button
                                onClick={() => setShowBookingModal(false)}
                                style={{
                                    flex: 1,
                                    padding: '1rem',
                                    background: 'rgba(107, 114, 128, 0.1)',
                                    color: '#374151',
                                    border: '1px solid rgba(107, 114, 128, 0.2)',
                                    borderRadius: '12px',
                                    fontSize: '1rem',
                                    fontWeight: '600',
                                    cursor: 'pointer'
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    setShowBookingModal(false);
                                    alert(`Booking appointment with ${selectedDoctor.name}`);
                                }}
                                style={{
                                    flex: 1,
                                    padding: '1rem',
                                    background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '12px',
                                    fontSize: '1rem',
                                    fontWeight: '600',
                                    cursor: 'pointer'
                                }}
                            >
                                Confirm Booking
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Rating Comments Modal */}
            <RatingCommentsModal
                isOpen={showCommentsModal}
                onClose={() => {
                    setShowCommentsModal(false);
                    setSelectedDoctorForComments(null);
                }}
                doctor={selectedDoctorForComments}
            />

            {/* Rating Modal */}
            <RatingModal
                isOpen={showRatingModal}
                onClose={() => {
                    setShowRatingModal(false);
                    setSelectedDoctorForRating(null);
                    setUserRating(null);
                }}
                doctor={selectedDoctorForRating}
                existingRating={userRating}
                onSubmit={handleSubmitRating}
                loading={ratingLoading}
            />

            <style jsx>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
};

export default PatientDoctors;
