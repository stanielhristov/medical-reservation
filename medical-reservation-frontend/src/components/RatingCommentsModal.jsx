import React, { useState, useEffect } from 'react';
import { getDoctorRatings } from '../api/ratings';
import StarRating from './StarRating';

const RatingCommentsModal = ({ 
    isOpen, 
    onClose, 
    doctor 
}) => {
    const [ratings, setRatings] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isOpen && doctor) {
            fetchRatings();
        }
    }, [isOpen, doctor]);

    const fetchRatings = async () => {
        if (!doctor?.id) {
            console.error('No doctor ID available for fetching ratings');
            setRatings([]);
            return;
        }
        
        setLoading(true);
        try {
            const ratingsData = await getDoctorRatings(doctor.id);
            setRatings(ratingsData);
        } catch (error) {
            console.error('Error fetching ratings:', error);
            setRatings([]);
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        setRatings([]);
        onClose();
    };

    if (!isOpen || !doctor) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '1rem'
        }}>
            <div style={{
                background: 'white',
                borderRadius: '16px',
                padding: '2rem',
                maxWidth: '700px',
                width: '100%',
                maxHeight: '80vh',
                overflow: 'auto',
                boxShadow: '0 20px 48px rgba(0, 0, 0, 0.2)'
            }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '1.5rem'
                }}>
                    <h2 style={{
                        fontSize: '1.5rem',
                        fontWeight: '700',
                        color: '#374151',
                        margin: 0
                    }}>
                        Patient Reviews
                    </h2>
                    <button
                        onClick={handleClose}
                        style={{
                            background: 'none',
                            border: 'none',
                            fontSize: '1.5rem',
                            cursor: 'pointer',
                            color: '#6b7280',
                            padding: '0.25rem'
                        }}
                    >
                        ✕
                    </button>
                </div>

                {/* Doctor Info */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    marginBottom: '2rem',
                    padding: '1rem',
                    background: 'rgba(34, 197, 94, 0.05)',
                    borderRadius: '12px'
                }}>
                    <div style={{
                        fontSize: '2rem'
                    }}>
                        👨‍⚕️
                    </div>
                    <div>
                        <h3 style={{
                            fontSize: '1.1rem',
                            fontWeight: '600',
                            color: '#374151',
                            margin: '0 0 0.25rem'
                        }}>
                            Dr. {doctor.name || doctor.fullName}
                        </h3>
                        <p style={{
                            color: '#059669',
                            fontWeight: '500',
                            margin: '0 0 0.25rem'
                        }}>
                            {doctor.specialization}
                        </p>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}>
                            <StarRating
                                rating={doctor.rating}
                                totalRatings={doctor.reviews}
                                interactive={false}
                                size="small"
                                showValue={true}
                            />
                        </div>
                    </div>
                </div>

                {/* Ratings Content */}
                {loading ? (
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: '3rem',
                        color: '#6b7280'
                    }}>
                        <div style={{
                            width: '40px',
                            height: '40px',
                            border: '3px solid rgba(34, 197, 94, 0.2)',
                            borderTop: '3px solid #22c55e',
                            borderRadius: '50%',
                            animation: 'spin 1s linear infinite',
                            marginRight: '1rem'
                        }} />
                        Loading reviews...
                    </div>
                ) : ratings.length > 0 ? (
                    <div style={{
                        maxHeight: '400px',
                        overflowY: 'auto'
                    }}>
                        {ratings.map((rating, index) => (
                            <div
                                key={rating.id || index}
                                style={{
                                    padding: '1.5rem',
                                    marginBottom: '1rem',
                                    background: 'rgba(249, 250, 251, 0.8)',
                                    borderRadius: '12px',
                                    border: '1px solid rgba(34, 197, 94, 0.1)'
                                }}
                            >
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'flex-start',
                                    marginBottom: '0.75rem'
                                }}>
                                    <div>
                                        <div style={{
                                            fontWeight: '600',
                                            color: '#374151',
                                            marginBottom: '0.25rem'
                                        }}>
                                            {rating.userFullName || 'Anonymous Patient'}
                                        </div>
                                        <StarRating
                                            rating={rating.rating}
                                            interactive={false}
                                            size="small"
                                            showValue={false}
                                        />
                                    </div>
                                    <div style={{
                                        fontSize: '0.8rem',
                                        color: '#6b7280'
                                    }}>
                                        {rating.createdAt ? new Date(rating.createdAt).toLocaleDateString() : 'Recent'}
                                    </div>
                                </div>
                                
                                {rating.comment && (
                                    <p style={{
                                        color: '#6b7280',
                                        lineHeight: '1.5',
                                        margin: 0,
                                        fontStyle: rating.comment ? 'normal' : 'italic'
                                    }}>
                                        "{rating.comment}"
                                    </p>
                                )}
                                
                                {!rating.comment && (
                                    <p style={{
                                        color: '#9ca3af',
                                        lineHeight: '1.5',
                                        margin: 0,
                                        fontStyle: 'italic'
                                    }}>
                                        No comment provided
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div style={{
                        textAlign: 'center',
                        padding: '3rem',
                        color: '#6b7280'
                    }}>
                        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💬</div>
                        <h3 style={{
                            fontSize: '1.2rem',
                            fontWeight: '600',
                            color: '#374151',
                            margin: '0 0 0.5rem'
                        }}>
                            No Reviews Yet
                        </h3>
                        <p style={{ margin: 0 }}>
                            Be the first to share your experience with this doctor
                        </p>
                    </div>
                )}

                <style jsx>{`
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                `}</style>
            </div>
        </div>
    );
};

export default RatingCommentsModal;
