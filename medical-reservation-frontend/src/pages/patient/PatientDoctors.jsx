import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { usePatientDoctors } from '../../hooks/usePatientDoctors';
import LoadingSpinner from '../../components/LoadingSpinner';
import DoctorSearchHeader from '../../components/DoctorSearchHeader';
import DoctorSearchFilters from '../../components/DoctorSearchFilters';
import DoctorCard from '../../components/DoctorCard';
import StarRating from '../../components/StarRating';
import RatingModal from '../../components/RatingModal';
import RatingCommentsModal from '../../components/RatingCommentsModal';

const PatientDoctors = () => {
    const { user } = useAuth();
    const {
        loading,
        error,
        searchTerm,
        setSearchTerm,
        selectedSpecialization,
        setSelectedSpecialization,
        specializations,
        showBookingModal,
        setShowBookingModal,
        selectedDoctor,
        setSelectedDoctor,
        showRatingModal,
        setShowRatingModal,
        selectedDoctorForRating,
        userRating,
        ratingLoading,
        showCommentsModal,
        setShowCommentsModal,
        selectedDoctorForComments,
        filteredDoctors,
        handleRateDoctor,
        submitRating,
        handleViewComments,
        refreshDoctors
    } = usePatientDoctors(user);

    const handleBookAppointment = (doctor) => {
        setSelectedDoctor(doctor);
        setShowBookingModal(true);
    };

    if (loading) {
        return <LoadingSpinner message="Loading doctors..." />;
    }

    if (error) {
        return (
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '50vh',
                padding: '2rem',
                textAlign: 'center'
            }}>
                <div style={{
                    background: 'rgba(239, 68, 68, 0.1)',
                    border: '2px solid rgba(239, 68, 68, 0.2)',
                    borderRadius: '16px',
                    padding: '2rem',
                    maxWidth: '500px'
                }}>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚠️</div>
                    <h3 style={{ color: '#dc2626', margin: '0 0 1rem' }}>Unable to Load Doctors</h3>
                    <p style={{ color: '#6b7280', margin: '0 0 1.5rem' }}>{error}</p>
                    <button
                        onClick={refreshDoctors}
                        style={{
                            padding: '0.75rem 1.5rem',
                            background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '12px',
                            cursor: 'pointer',
                            fontSize: '1rem',
                            fontWeight: '600'
                        }}
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div style={{ position: 'relative' }}>
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

            <main style={{
                padding: '2.5rem 0',
                position: 'relative',
                zIndex: 1
            }}>
                <DoctorSearchHeader onRefresh={refreshDoctors} />

                <DoctorSearchFilters
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    selectedSpecialization={selectedSpecialization}
                    setSelectedSpecialization={setSelectedSpecialization}
                    specializations={specializations}
                    doctorCount={filteredDoctors.length}
                />

                <section style={{
                    background: 'rgba(255, 255, 255, 0.98)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '24px',
                    padding: '2.5rem',
                    boxShadow: '0 20px 40px rgba(34, 197, 94, 0.12), 0 16px 32px rgba(0, 0, 0, 0.06)',
                    border: '1px solid rgba(34, 197, 94, 0.15)'
                }}>
                    {filteredDoctors.length === 0 ? (
                        <div style={{
                            textAlign: 'center',
                            padding: '4rem 2rem',
                            color: '#6b7280'
                        }}>
                            <div style={{
                                fontSize: '4rem',
                                marginBottom: '1rem',
                                opacity: 0.5
                            }}>
                                👨‍⚕️
                            </div>
                            <h3 style={{
                                fontSize: '1.5rem',
                                fontWeight: '600',
                                margin: '0 0 0.5rem',
                                color: '#374151'
                            }}>
                                No doctors found
                            </h3>
                            <p style={{
                                fontSize: '1rem',
                                margin: '0 0 1.5rem',
                                maxWidth: '400px',
                                marginLeft: 'auto',
                                marginRight: 'auto',
                                lineHeight: '1.5'
                            }}>
                                {searchTerm || selectedSpecialization !== 'All Specializations' && selectedSpecialization !== '' 
                                    ? 'Try adjusting your search criteria or browse all available doctors by clearing the filters.'
                                    : 'No doctors are currently available. Please check back later or contact support.'}
                            </p>
                            <button
                                onClick={refreshDoctors}
                                style={{
                                    padding: '0.75rem 1.5rem',
                                    background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '12px',
                                    cursor: 'pointer',
                                    fontSize: '1rem',
                                    fontWeight: '600'
                                }}
                            >
                                Refresh
                            </button>
                        </div>
                    ) : (
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
                            gap: '2rem'
                        }}>
                            {filteredDoctors.map(doctor => (
                                <DoctorCard
                                    key={doctor.id}
                                    doctor={doctor}
                                    onBookAppointment={handleBookAppointment}
                                    onRateDoctor={handleRateDoctor}
                                    onViewComments={handleViewComments}
                                />
                            ))}
                        </div>
                    )}
                </section>

                {showBookingModal && selectedDoctor && (
                    <div style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'rgba(0, 0, 0, 0.6)',
                        backdropFilter: 'blur(5px)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 1000,
                        padding: '2rem'
                    }} onClick={() => setShowBookingModal(false)}>
                        <div style={{
                            background: 'white',
                            borderRadius: '24px',
                            padding: '2.5rem',
                            maxWidth: '600px',
                            width: '100%',
                            boxShadow: '0 25px 50px rgba(0,0,0,0.25)',
                            position: 'relative',
                            animation: 'fadeInUp 0.3s ease-out',
                            border: '1px solid rgba(34, 197, 94, 0.2)'
                        }} onClick={e => e.stopPropagation()}>
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
                                    color: '#9ca3af',
                                    padding: '0.5rem',
                                    borderRadius: '8px'
                                }}
                            >
                                ✕
                            </button>

                            <h3 style={{
                                fontSize: '1.8rem',
                                fontWeight: '700',
                                color: '#374151',
                                margin: '0 0 1.5rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem'
                            }}>
                                📅 Book Appointment with Dr. {selectedDoctor.name}
                            </h3>

                            <p style={{
                                color: '#6b7280',
                                margin: '0 0 1.5rem',
                                lineHeight: '1.5'
                            }}>
                                Select your preferred date and time to schedule an appointment with Dr. {selectedDoctor.name}.
                            </p>

                            <div style={{
                                background: 'rgba(34, 197, 94, 0.05)',
                                borderRadius: '12px',
                                padding: '1.5rem',
                                marginBottom: '1.5rem',
                                border: '1px solid rgba(34, 197, 94, 0.2)'
                            }}>
                                <p style={{
                                    color: '#374151',
                                    margin: 0,
                                    fontWeight: '600',
                                    textAlign: 'center'
                                }}>
                                    Booking functionality will be implemented here
                                </p>
                            </div>

                            <div style={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                gap: '1rem'
                            }}>
                                <button
                                    onClick={() => setShowBookingModal(false)}
                                    style={{
                                        padding: '0.8rem 1.5rem',
                                        background: 'rgba(107, 114, 128, 0.1)',
                                        color: '#374151',
                                        border: '2px solid rgba(107, 114, 128, 0.2)',
                                        borderRadius: '12px',
                                        cursor: 'pointer',
                                        fontSize: '1rem',
                                        fontWeight: '600',
                                        transition: 'all 0.3s ease'
                                    }}
                                >
                                    Cancel
                                </button>
                                <button
                                    style={{
                                        padding: '0.8rem 1.5rem',
                                        background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '12px',
                                        cursor: 'pointer',
                                        fontSize: '1rem',
                                        fontWeight: '600',
                                        transition: 'all 0.3s ease',
                                        boxShadow: '0 4px 12px rgba(34, 197, 94, 0.3)'
                                    }}
                                >
                                    Confirm Booking
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                <RatingModal
                    isOpen={showRatingModal}
                    onClose={() => setShowRatingModal(false)}
                    doctor={filteredDoctors.find(d => d.id === selectedDoctorForRating)}
                    existingRating={userRating}
                    onSubmit={submitRating}
                    loading={ratingLoading}
                />

                <RatingCommentsModal
                    isOpen={showCommentsModal}
                    onClose={() => setShowCommentsModal(false)}
                    doctor={filteredDoctors.find(d => d.id === selectedDoctorForComments)}
                />
            </main>
        </div>
    );
};

export default PatientDoctors;
