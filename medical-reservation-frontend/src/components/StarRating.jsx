import React, { useState, useEffect } from 'react';

const StarRating = ({ 
    rating = 0, 
    onRatingChange, 
    interactive = false, 
    size = 'medium',
    showValue = true,
    totalRatings = 0,
    disabled = false
}) => {
    const [hoverRating, setHoverRating] = useState(0);
    const [currentRating, setCurrentRating] = useState(rating);

    useEffect(() => {
        setCurrentRating(rating);
    }, [rating]);

    const getSizeStyles = () => {
        switch (size) {
            case 'small':
                return { fontSize: '0.9rem', gap: '0.1rem' };
            case 'large':
                return { fontSize: '1.5rem', gap: '0.2rem' };
            default:
                return { fontSize: '1.2rem', gap: '0.15rem' };
        }
    };

    const handleStarClick = (starValue) => {
        if (!interactive || disabled) return;
        
        setCurrentRating(starValue);
        if (onRatingChange) {
            onRatingChange(starValue);
        }
    };

    const handleMouseEnter = (starValue) => {
        if (!interactive || disabled) return;
        setHoverRating(starValue);
    };

    const handleMouseLeave = () => {
        if (!interactive || disabled) return;
        setHoverRating(0);
    };

    const displayRating = hoverRating || currentRating;
    const sizeStyles = getSizeStyles();

    const renderStars = () => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            const isFilled = i <= displayRating;
            const isPartiallyFilled = i - 0.5 <= displayRating && displayRating < i;
            
            stars.push(
                <span
                    key={i}
                    onClick={() => handleStarClick(i)}
                    onMouseEnter={() => handleMouseEnter(i)}
                    style={{
                        color: isFilled ? '#f59e0b' : isPartiallyFilled ? '#f59e0b' : '#d1d5db',
                        cursor: interactive && !disabled ? 'pointer' : 'default',
                        transition: 'color 0.2s ease',
                        opacity: disabled ? 0.6 : 1,
                        ...(interactive && !disabled && hoverRating > 0 && i <= hoverRating ? { 
                            color: '#f59e0b',
                            transform: 'scale(1.1)' 
                        } : {})
                    }}
                >
                    ⭐
                </span>
            );
        }
        return stars;
    };

    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: sizeStyles.gap,
                fontSize: sizeStyles.fontSize
            }}
            onMouseLeave={handleMouseLeave}
        >
            <div style={{ display: 'flex', alignItems: 'center', gap: sizeStyles.gap }}>
                {renderStars()}
            </div>
            
            {showValue && (
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    marginLeft: '0.5rem'
                }}>
                    <span style={{ 
                        fontWeight: '600', 
                        color: '#374151',
                        fontSize: size === 'small' ? '0.8rem' : size === 'large' ? '1.1rem' : '0.9rem'
                    }}>
                        {currentRating > 0 ? currentRating.toFixed(1) : '0.0'}
                    </span>
                    {totalRatings > 0 && (
                        <span style={{ 
                            color: '#6b7280', 
                            fontSize: size === 'small' ? '0.7rem' : size === 'large' ? '0.9rem' : '0.8rem'
                        }}>
                            ({totalRatings} {totalRatings === 1 ? 'review' : 'reviews'})
                        </span>
                    )}
                </div>
            )}
        </div>
    );
};

export default StarRating;
