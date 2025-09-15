import React from 'react';

const FeaturesSection = () => {
    const features = [
        {
            icon: '🩺',
            title: 'Expert Medical Care',
            description: 'Connect with qualified doctors and healthcare professionals for comprehensive medical care.',
            gradient: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)'
        },
        {
            icon: '📅',
            title: 'Easy Appointment Booking',
            description: 'Schedule appointments with your preferred doctors at your convenience. No more waiting in long queues.',
            gradient: 'linear-gradient(135deg, #059669 0%, #047857 100%)'
        },
        {
            icon: '📱',
            title: 'Digital Health Records',
            description: 'Access your complete medical history, prescriptions, and test results anytime, anywhere.',
            gradient: 'linear-gradient(135deg, #15803d 0%, #14532d 100%)'
        },
        {
            icon: '🔔',
            title: 'Smart Notifications',
            description: 'Get reminders for appointments, medication schedules, and follow-up visits.',
            gradient: 'linear-gradient(135deg, #4ade80 0%, #22c55e 100%)'
        },
        {
            icon: '💊',
            title: 'Prescription Management',
            description: 'Track your medications, dosages, and get refill reminders from your healthcare providers.',
            gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
        },
        {
            icon: '📊',
            title: 'Health Analytics',
            description: 'Monitor your health trends and get insights from your medical data and appointment history.',
            gradient: 'linear-gradient(135deg, #34d399 0%, #10b981 100%)'
        }
    ];

    return (
        <section id="features" style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 2rem 4rem',
            position: 'relative',
            zIndex: 1
        }}>
            <div style={{
                textAlign: 'center',
                marginBottom: '4rem'
            }}>
                <h2 style={{
                    fontSize: '2.5rem',
                    fontWeight: '800',
                    color: '#374151',
                    margin: '0 0 1rem',
                    letterSpacing: '-0.02em'
                }}>
                    Everything You Need for
                    <br />
                    <span style={{
                        background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                    }}>
                        Better Healthcare
                    </span>
                </h2>
                <p style={{
                    fontSize: '1.2rem',
                    color: '#6b7280',
                    margin: 0,
                    maxWidth: '600px',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    lineHeight: '1.6'
                }}>
                    Our comprehensive platform provides all the tools you need to manage your health journey effectively.
                </p>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                gap: '2rem',
                justifyItems: 'center'
            }}>
                {features.map((feature, index) => (
                    <div
                        key={index}
                        style={{
                            background: 'rgba(255, 255, 255, 0.95)',
                            backdropFilter: 'blur(20px)',
                            borderRadius: '24px',
                            padding: '2.5rem',
                            boxShadow: '0 20px 40px rgba(34, 197, 94, 0.08), 0 8px 32px rgba(0, 0, 0, 0.04)',
                            border: '1px solid rgba(34, 197, 94, 0.1)',
                            transition: 'all 0.4s ease',
                            cursor: 'pointer',
                            position: 'relative',
                            overflow: 'hidden',
                            maxWidth: '400px',
                            width: '100%'
                        }}
                        onMouseEnter={e => {
                            e.target.style.transform = 'translateY(-8px)';
                            e.target.style.boxShadow = '0 25px 50px rgba(34, 197, 94, 0.15), 0 12px 40px rgba(0, 0, 0, 0.08)';
                        }}
                        onMouseLeave={e => {
                            e.target.style.transform = 'translateY(0)';
                            e.target.style.boxShadow = '0 20px 40px rgba(34, 197, 94, 0.08), 0 8px 32px rgba(0, 0, 0, 0.04)';
                        }}
                    >
                        <div style={{
                            position: 'absolute',
                            top: '-30px',
                            right: '-30px',
                            width: '100px',
                            height: '100px',
                            background: 'rgba(34, 197, 94, 0.05)',
                            borderRadius: '50%'
                        }} />
                        
                        <div style={{
                            width: '80px',
                            height: '80px',
                            background: feature.gradient,
                            borderRadius: '20px',
                            margin: '0 auto 1.5rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 12px 30px rgba(34, 197, 94, 0.25)',
                            position: 'relative',
                            zIndex: 1
                        }}>
                            <span style={{ fontSize: '2.5rem', color: 'white' }}>{feature.icon}</span>
                        </div>
                        
                        <h3 style={{
                            fontSize: '1.4rem',
                            fontWeight: '700',
                            color: '#374151',
                            margin: '0 0 1rem',
                            textAlign: 'center',
                            position: 'relative',
                            zIndex: 1
                        }}>
                            {feature.title}
                        </h3>
                        
                        <p style={{
                            fontSize: '1rem',
                            color: '#6b7280',
                            margin: 0,
                            lineHeight: '1.6',
                            textAlign: 'center',
                            position: 'relative',
                            zIndex: 1
                        }}>
                            {feature.description}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default FeaturesSection;
