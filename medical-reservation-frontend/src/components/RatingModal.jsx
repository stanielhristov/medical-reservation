import React, { useState, useEffect } from 'react';
import StarRating from './StarRating';

const RatingModal = ({ 
    isOpen, 
    onClose, 
    doctor, 
    existingRating, 
    onSubmit,
    loading = false 
}) => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    useEffect(() => {
        if (existingRating) {
            setRating(existingRating.rating);
            setComment(existingRating.comment || '');
        } else {
            setRating(0);
            setComment('');
        }
    }, [existingRating, isOpen]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (rating === 0) {
            alert('Please select a rating');
            return;
        }
        
        onSubmit({
            rating,
            comment: comment.trim(),
            doctorId: doctor.id
        });
    };

    const handleClose = () => {
        setRating(0);
        setComment('');
        onClose();
    };

    if (!isOpen) return null;

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
                maxWidth: '500px',
                width: '100%',
                maxHeight: '90vh',
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
                        {existingRating ? 'Update Rating' : 'Rate Doctor'}
                    </h2>
                    <button
                        onClick={handleClose}
                        disabled={loading}
                        style={{
                            background: 'none',
                            border: 'none',
                            fontSize: '1.5rem',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            color: '#6b7280',
                            padding: '0.25rem',
                            opacity: loading ? 0.5 : 1
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
                            margin: 0
                        }}>
                            {doctor.specialization}
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit}>
                    {/* Rating Selection */}
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{
                            display: 'block',
                            fontSize: '1rem',
                            fontWeight: '600',
                            color: '#374151',
                            marginBottom: '0.75rem'
                        }}>
                            Your Rating *
                        </label>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            padding: '1rem',
                            background: 'rgba(34, 197, 94, 0.02)',
                            borderRadius: '8px',
                            border: '2px dashed rgba(34, 197, 94, 0.2)'
                        }}>
                            <StarRating
                                rating={rating}
                                onRatingChange={setRating}
                                interactive={true}
                                size="large"
                                showValue={false}
                                disabled={loading}
                            />
                        </div>
                        {rating > 0 && (
                            <p style={{
                                textAlign: 'center',
                                margin: '0.5rem 0 0',
                                color: '#059669',
                                fontSize: '0.9rem',
                                fontWeight: '500'
                            }}>
                                {rating === 1 && '⭐ Poor'}
                                {rating === 2 && '⭐⭐ Fair'}
                                {rating === 3 && '⭐⭐⭐ Good'}
                                {rating === 4 && '⭐⭐⭐⭐ Very Good'}
                                {rating === 5 && '⭐⭐⭐⭐⭐ Excellent'}
                            </p>
                        )}
                    </div>

                    {/* Comment */}
                    <div style={{ marginBottom: '2rem' }}>
                        <label style={{
                            display: 'block',
                            fontSize: '1rem',
                            fontWeight: '600',
                            color: '#374151',
                            marginBottom: '0.75rem'
                        }}>
                            Comment (Optional)
                        </label>
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Share your experience with this doctor..."
                            disabled={loading}
                            rows={4}
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                border: '2px solid rgba(34, 197, 94, 0.2)',
                                borderRadius: '8px',
                                fontSize: '0.9rem',
                                resize: 'vertical',
                                fontFamily: 'inherit',
                                opacity: loading ? 0.5 : 1,
                                cursor: loading ? 'not-allowed' : 'text'
                            }}
                            maxLength={1000}
                        />
                        <div style={{
                            textAlign: 'right',
                            fontSize: '0.8rem',
                            color: '#6b7280',
                            marginTop: '0.25rem'
                        }}>
                            {comment.length}/1000
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div style={{
                        display: 'flex',
                        gap: '1rem',
                        justifyContent: 'flex-end'
                    }}>
                        <button
                            type="button"
                            onClick={handleClose}
                            disabled={loading}
                            style={{
                                padding: '0.75rem 1.5rem',
                                border: '2px solid rgba(34, 197, 94, 0.3)',
                                background: 'white',
                                color: '#059669',
                                borderRadius: '8px',
                                fontWeight: '600',
                                cursor: loading ? 'not-allowed' : 'pointer',
                                opacity: loading ? 0.5 : 1,
                                transition: 'all 0.2s ease'
                            }}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading || rating === 0}
                            style={{
                                padding: '0.75rem 1.5rem',
                                border: 'none',
                                background: rating === 0 ? '#d1d5db' : '#059669',
                                color: 'white',
                                borderRadius: '8px',
                                fontWeight: '600',
                                cursor: loading || rating === 0 ? 'not-allowed' : 'pointer',
                                opacity: loading ? 0.5 : 1,
                                transition: 'all 0.2s ease'
                            }}
                        >
                            {loading ? 'Submitting...' : existingRating ? 'Update Rating' : 'Submit Rating'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RatingModal;
