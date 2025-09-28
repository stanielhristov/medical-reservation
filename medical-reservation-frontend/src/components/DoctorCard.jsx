import React from 'react';
import StarRating from './StarRating';

const DoctorCard = ({ 
    doctor, 
    onBookAppointment, 
    onRateDoctor, 
    onViewComments 
}) => {
    return (
        <div style={{
            background: 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(20px)',
            borderRadius: '24px',
            padding: '2rem',
            boxShadow: '0 12px 30px rgba(34, 197, 94, 0.1), 0 6px 20px rgba(0, 0, 0, 0.05)',
            border: '1px solid rgba(34, 197, 94, 0.15)',
            transition: 'all 0.3s ease',
            position: 'relative',
            overflow: 'hidden'
        }}
        onMouseEnter={e => {
            e.target.style.transform = 'translateY(-6px)';
            e.target.style.boxShadow = '0 20px 40px rgba(34, 197, 94, 0.15), 0 10px 30px rgba(0, 0, 0, 0.08)';
        }}
        onMouseLeave={e => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 12px 30px rgba(34, 197, 94, 0.1), 0 6px 20px rgba(0, 0, 0, 0.05)';
        }}
        >
            <div style={{
                position: 'absolute',
                top: '-30px',
                right: '-30px',
                width: '120px',
                height: '120px',
                background: 'rgba(34, 197, 94, 0.05)',
                borderRadius: '50%',
                zIndex: 0
            }} />

            <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1.5rem',
                    marginBottom: '1.5rem'
                }}>
                    <div style={{
                        width: '80px',
                        height: '80px',
                        background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                        borderRadius: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '2.5rem',
                        boxShadow: '0 8px 20px rgba(34, 197, 94, 0.3)'
                    }}>
                        {doctor.image}
                    </div>
                    
                    <div style={{ flex: 1 }}>
                        <h3 style={{
                            fontSize: '1.4rem',
                            fontWeight: '700',
                            color: '#374151',
                            margin: '0 0 0.25rem'
                        }}>
                            Dr. {doctor.name}
                        </h3>
                        <p style={{
                            fontSize: '1rem',
                            color: '#22c55e',
                            margin: '0 0 0.5rem',
                            fontWeight: '600'
                        }}>
                            {doctor.specialization}
                        </p>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem',
                            fontSize: '0.9rem',
                            color: '#6b7280'
                        }}>
                            <span>📍 {doctor.location}</span>
                            <span>💼 {doctor.experience}</span>
                        </div>
                    </div>
                </div>

                <div style={{
                    background: 'rgba(34, 197, 94, 0.05)',
                    borderRadius: '16px',
                    padding: '1.25rem',
                    marginBottom: '1.5rem',
                    border: '1px solid rgba(34, 197, 94, 0.1)'
                }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '1rem'
                    }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}>
                            <StarRating 
                                rating={doctor.rating} 
                                readonly 
                                size="medium" 
                                showValue={true}
                                interactive={false}
                            />
                        </div>
                        
                        <button
                            onClick={() => onViewComments(doctor.id)}
                            style={{
                                background: 'none',
                                border: 'none',
                                color: '#22c55e',
                                fontSize: '0.9rem',
                                fontWeight: '600',
                                cursor: 'pointer',
                                textDecoration: 'underline',
                                padding: '0'
                            }}
                        >
                            {doctor.reviews} reviews
                        </button>
                    </div>
                    
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                        gap: '1rem',
                        fontSize: '0.9rem'
                    }}>
                        <div>
                            <span style={{ color: '#6b7280', fontWeight: '600' }}>Next Available:</span>
                            <p style={{ color: '#374151', margin: '0.25rem 0 0', fontWeight: '500' }}>
                                {doctor.nextAvailable}
                            </p>
                        </div>
                        <div>
                            <span style={{ color: '#6b7280', fontWeight: '600' }}>Consultation:</span>
                            <p style={{ color: '#22c55e', margin: '0.25rem 0 0', fontWeight: '700' }}>
                                {doctor.consultationFee}
                            </p>
                        </div>
                    </div>
                </div>

                <p style={{
                    fontSize: '0.95rem',
                    color: '#4b5563',
                    margin: '0 0 1.5rem',
                    lineHeight: '1.6',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                }}>
                    {doctor.about}
                </p>

                <div style={{
                    display: 'flex',
                    gap: '1rem',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap'
                }}>
                    <button
                        onClick={() => onRateDoctor(doctor.id)}
                        style={{
                            padding: '0.7rem 1.25rem',
                            background: 'rgba(34, 197, 94, 0.1)',
                            color: '#16a34a',
                            border: '2px solid rgba(34, 197, 94, 0.2)',
                            borderRadius: '12px',
                            cursor: 'pointer',
                            fontSize: '0.9rem',
                            fontWeight: '600',
                            transition: 'all 0.3s ease',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}
                        onMouseEnter={e => {
                            e.target.style.background = 'rgba(34, 197, 94, 0.2)';
                            e.target.style.transform = 'translateY(-2px)';
                        }}
                        onMouseLeave={e => {
                            e.target.style.background = 'rgba(34, 197, 94, 0.1)';
                            e.target.style.transform = 'translateY(0)';
                        }}
                    >
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            style={{ display: 'block' }}
                        >
                            <path
                                d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                                fill="#22c55e"
                                stroke="#22c55e"
                                strokeWidth="1"
                            />
                        </svg>
                        Rate Doctor
                    </button>
                    
                    <button
                        onClick={() => onBookAppointment(doctor)}
                        style={{
                            padding: '0.7rem 1.5rem',
                            background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '12px',
                            cursor: 'pointer',
                            fontSize: '0.9rem',
                            fontWeight: '600',
                            transition: 'all 0.3s ease',
                            boxShadow: '0 4px 12px rgba(34, 197, 94, 0.3)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}
                        onMouseEnter={e => {
                            e.target.style.transform = 'translateY(-2px)';
                            e.target.style.boxShadow = '0 6px 20px rgba(34, 197, 94, 0.4)';
                        }}
                        onMouseLeave={e => {
                            e.target.style.transform = 'translateY(0)';
                            e.target.style.boxShadow = '0 4px 12px rgba(34, 197, 94, 0.3)';
                        }}
                    >
                        <span>📅</span>
                        Book Appointment
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DoctorCard;
