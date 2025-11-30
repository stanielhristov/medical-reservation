import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const StarRating = ({ 
    rating = 0, 
    onRatingChange, 
    interactive = false, 
    size = 'medium',
    showValue = true,
    totalRatings = 0,
    disabled = false
}) => {
    const { t } = useTranslation();
    const [hoverRating, setHoverRating] = useState(0);
    const [currentRating, setCurrentRating] = useState(rating);

    useEffect(() => {
        setCurrentRating(rating);
    }, [rating]);

    const getSizeStyles = () => {
        switch (size) {
            case 'small':
                return { fontSize: '16px', gap: '0.1rem' };
            case 'large':
                return { fontSize: '28px', gap: '0.2rem' };
            default:
                return { fontSize: '20px', gap: '0.15rem' };
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
            const isHovered = interactive && !disabled && hoverRating > 0 && i <= hoverRating;
            
            stars.push(
                <span
                    key={i}
                    onClick={() => handleStarClick(i)}
                    onMouseEnter={() => handleMouseEnter(i)}
                    style={{
                        cursor: interactive && !disabled ? 'pointer' : 'default',
                        transition: 'all 0.2s ease',
                        opacity: disabled ? 0.6 : 1,
                        transform: isHovered ? 'scale(1.1)' : 'scale(1)',
                        display: 'inline-block'
                    }}
                >
                    <svg
                        width={sizeStyles.fontSize}
                        height={sizeStyles.fontSize}
                        viewBox="0 0 24 24"
                        style={{
                            display: 'block'
                        }}
                    >
                        <path
                            d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                            fill={isFilled || isHovered ? '#22c55e' : 'none'}
                            stroke={isFilled || isHovered ? '#22c55e' : '#d1d5db'}
                            strokeWidth="2"
                        />
                    </svg>
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
                            ({totalRatings} {totalRatings === 1 ? t('doctors.review') : t('doctors.reviews')})
                        </span>
                    )}
                </div>
            )}
        </div>
    );
};

export default StarRating;
