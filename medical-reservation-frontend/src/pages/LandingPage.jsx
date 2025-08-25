import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
    const navigate = useNavigate();

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

    const handleLogin = () => {
        navigate('/login');
    };

    const handleRegister = () => {
        navigate('/register');
    };

    return (
        <div style={{
            minHeight: '100vh',
            width: '100vw',
            background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
            position: 'relative',
            overflow: 'hidden',
            boxSizing: 'border-box'
        }}>
            {/* Background decorations */}
            <div style={{
                position: 'absolute',
                top: '5%',
                right: '5%',
                width: '300px',
                height: '300px',
                background: 'rgba(34, 197, 94, 0.05)',
                borderRadius: '50%',
                zIndex: 0
            }} />
            
            <div style={{
                position: 'absolute',
                bottom: '10%',
                left: '0%',
                width: '250px',
                height: '250px',
                background: 'rgba(22, 163, 74, 0.04)',
                borderRadius: '50%',
                zIndex: 0
            }} />

            <div style={{
                position: 'absolute',
                top: '40%',
                left: '80%',
                width: '150px',
                height: '150px',
                background: 'rgba(16, 185, 129, 0.03)',
                borderRadius: '50%',
                zIndex: 0
            }} />

            {/* Header */}
            <header style={{
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(20px)',
                padding: '1.5rem 2rem',
                boxShadow: '0 4px 20px rgba(34, 197, 94, 0.08)',
                position: 'relative',
                zIndex: 1,
                width: '100%',
                boxSizing: 'border-box',
                borderBottom: '1px solid rgba(34, 197, 94, 0.1)'
            }}>
                <div style={{
                    maxWidth: '1200px',
                    margin: '0 auto',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{
                            width: '56px',
                            height: '56px',
                            background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                            borderRadius: '16px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 6px 20px rgba(34, 197, 94, 0.25)'
                        }}>
                            <span style={{ fontSize: '1.8rem', color: 'white' }}>🩺</span>
                        </div>
                        <div>
                            <h1 style={{
                                fontSize: '1.6rem',
                                fontWeight: '700',
                                color: '#374151',
                                margin: 0,
                                letterSpacing: '-0.025em'
                            }}>
                                MedReserve
                            </h1>
                            <p style={{
                                fontSize: '0.85rem',
                                color: '#6b7280',
                                margin: 0,
                                fontWeight: '500'
                            }}>
                                Your Health, Our Priority
                            </p>
                        </div>
                    </div>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <button 
                            onClick={handleLogin}
                            style={{
                                padding: '0.875rem 1.75rem',
                                background: 'rgba(22, 163, 74, 0.1)',
                                color: '#16a34a',
                                border: '1px solid rgba(22, 163, 74, 0.2)',
                                borderRadius: '12px',
                                cursor: 'pointer',
                                fontWeight: '600',
                                fontSize: '0.95rem',
                                transition: 'all 0.2s ease'
                            }}
                            onMouseEnter={e => {
                                e.target.style.background = 'rgba(22, 163, 74, 0.15)';
                                e.target.style.transform = 'translateY(-2px)';
                                e.target.style.boxShadow = '0 6px 20px rgba(22, 163, 74, 0.15)';
                            }}
                            onMouseLeave={e => {
                                e.target.style.background = 'rgba(22, 163, 74, 0.1)';
                                e.target.style.transform = 'translateY(0)';
                                e.target.style.boxShadow = 'none';
                            }}
                        >
                            Sign In
                        </button>
                        <button 
                            onClick={handleRegister}
                            style={{
                                padding: '0.875rem 1.75rem',
                                background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '12px',
                                cursor: 'pointer',
                                fontWeight: '600',
                                fontSize: '0.95rem',
                                transition: 'all 0.2s ease',
                                boxShadow: '0 4px 15px rgba(34, 197, 94, 0.25)'
                            }}
                            onMouseEnter={e => {
                                e.target.style.transform = 'translateY(-2px)';
                                e.target.style.boxShadow = '0 8px 25px rgba(34, 197, 94, 0.35)';
                            }}
                            onMouseLeave={e => {
                                e.target.style.transform = 'translateY(0)';
                                e.target.style.boxShadow = '0 4px 15px rgba(34, 197, 94, 0.25)';
                            }}
                        >
                            Get Started
                        </button>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section style={{
                maxWidth: '1200px',
                margin: '0 auto',
                padding: '4rem 2rem',
                position: 'relative',
                zIndex: 1,
                textAlign: 'center'
            }}>
                <div style={{
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '32px',
                    padding: '4rem 3rem',
                    boxShadow: '0 32px 64px rgba(34, 197, 94, 0.1), 0 16px 48px rgba(0, 0, 0, 0.05)',
                    border: '1px solid rgba(34, 197, 94, 0.1)',
                    marginBottom: '4rem'
                }}>
                    <div style={{
                        width: '120px',
                        height: '120px',
                        background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                        borderRadius: '30px',
                        margin: '0 auto 3rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 20px 40px rgba(34, 197, 94, 0.3)'
                    }}>
                        <span style={{ fontSize: '4rem', color: 'white' }}>🏥</span>
                    </div>
                    
                    <h1 style={{
                        fontSize: '3.5rem',
                        fontWeight: '800',
                        color: '#374151',
                        margin: '0 0 1.5rem',
                        letterSpacing: '-0.03em',
                        lineHeight: '1.1'
                    }}>
                        Modern Healthcare
                        <br />
                        <span style={{ 
                            background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text'
                        }}>
                            Made Simple
                        </span>
                    </h1>
                    
                    <p style={{
                        fontSize: '1.3rem',
                        color: '#6b7280',
                        margin: '0 0 3rem',
                        maxWidth: '700px',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        lineHeight: '1.6',
                        fontWeight: '400'
                    }}>
                        Experience seamless healthcare management with our comprehensive medical reservation system. 
                        Book appointments, manage records, and stay connected with healthcare providers all in one place.
                    </p>
                    
                    <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <button 
                            onClick={handleRegister}
                            style={{
                                padding: '1.2rem 2.5rem',
                                background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '16px',
                                cursor: 'pointer',
                                fontWeight: '700',
                                fontSize: '1.1rem',
                                transition: 'all 0.3s ease',
                                boxShadow: '0 8px 25px rgba(34, 197, 94, 0.3)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem'
                            }}
                            onMouseEnter={e => {
                                e.target.style.transform = 'translateY(-3px)';
                                e.target.style.boxShadow = '0 12px 35px rgba(34, 197, 94, 0.4)';
                            }}
                            onMouseLeave={e => {
                                e.target.style.transform = 'translateY(0)';
                                e.target.style.boxShadow = '0 8px 25px rgba(34, 197, 94, 0.3)';
                            }}
                        >
                            <span>🚀</span>
                            Start Your Journey
                        </button>
                        <button 
                            onClick={handleLogin}
                            style={{
                                padding: '1.2rem 2.5rem',
                                background: 'rgba(255, 255, 255, 0.9)',
                                color: '#374151',
                                border: '2px solid rgba(34, 197, 94, 0.2)',
                                borderRadius: '16px',
                                cursor: 'pointer',
                                fontWeight: '700',
                                fontSize: '1.1rem',
                                transition: 'all 0.3s ease',
                                backdropFilter: 'blur(10px)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem'
                            }}
                            onMouseEnter={e => {
                                e.target.style.transform = 'translateY(-3px)';
                                e.target.style.background = 'rgba(255, 255, 255, 1)';
                                e.target.style.boxShadow = '0 12px 35px rgba(34, 197, 94, 0.15)';
                            }}
                            onMouseLeave={e => {
                                e.target.style.transform = 'translateY(0)';
                                e.target.style.background = 'rgba(255, 255, 255, 0.9)';
                                e.target.style.boxShadow = 'none';
                            }}
                        >
                            <span>👤</span>
                            I Have an Account
                        </button>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section style={{
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
                        fontWeight: '700',
                        color: '#374151',
                        margin: '0 0 1rem',
                        letterSpacing: '-0.025em'
                    }}>
                        Why Choose MedReserve?
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
                        Discover the features that make healthcare management effortless and efficient
                    </p>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                    gap: '2rem',
                    width: '100%'
                }}>
                    {features.map((feature, index) => (
                        <div 
                            key={index}
                            style={{
                                background: 'rgba(255, 255, 255, 0.95)',
                                backdropFilter: 'blur(20px)',
                                borderRadius: '24px',
                                padding: '2.5rem',
                                boxShadow: '0 16px 32px rgba(34, 197, 94, 0.08)',
                                border: '1px solid rgba(34, 197, 94, 0.1)',
                                transition: 'all 0.4s ease',
                                cursor: 'pointer'
                            }}
                            onMouseEnter={e => {
                                e.target.style.transform = 'translateY(-8px)';
                                e.target.style.boxShadow = '0 24px 48px rgba(34, 197, 94, 0.15)';
                            }}
                            onMouseLeave={e => {
                                e.target.style.transform = 'translateY(0)';
                                e.target.style.boxShadow = '0 16px 32px rgba(34, 197, 94, 0.08)';
                            }}
                        >
                            <div style={{
                                width: '72px',
                                height: '72px',
                                background: feature.gradient,
                                borderRadius: '20px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: '2rem',
                                boxShadow: '0 12px 30px rgba(34, 197, 94, 0.25)'
                            }}>
                                <span style={{ fontSize: '2.2rem', color: 'white' }}>{feature.icon}</span>
                            </div>
                            
                            <h3 style={{
                                fontSize: '1.4rem',
                                fontWeight: '700',
                                color: '#374151',
                                margin: '0 0 1rem',
                                letterSpacing: '-0.025em'
                            }}>
                                {feature.title}
                            </h3>
                            
                            <p style={{
                                color: '#6b7280',
                                margin: 0,
                                lineHeight: '1.7',
                                fontSize: '1rem'
                            }}>
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Call to Action Section */}
            <section style={{
                maxWidth: '1200px',
                margin: '0 auto',
                padding: '2rem 2rem 4rem',
                position: 'relative',
                zIndex: 1
            }}>
                <div style={{
                    background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                    borderRadius: '32px',
                    padding: '4rem 3rem',
                    textAlign: 'center',
                    boxShadow: '0 32px 64px rgba(34, 197, 94, 0.2)',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    {/* Background pattern */}
                    <div style={{
                        position: 'absolute',
                        top: '-50%',
                        right: '-20%',
                        width: '400px',
                        height: '400px',
                        background: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: '50%',
                        zIndex: 0
                    }} />
                    
                    <div style={{
                        position: 'absolute',
                        bottom: '-30%',
                        left: '-10%',
                        width: '300px',
                        height: '300px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        borderRadius: '50%',
                        zIndex: 0
                    }} />

                    <div style={{ position: 'relative', zIndex: 1 }}>
                        <h2 style={{
                            fontSize: '2.8rem',
                            fontWeight: '800',
                            color: 'white',
                            margin: '0 0 1.5rem',
                            letterSpacing: '-0.025em',
                            lineHeight: '1.2'
                        }}>
                            Ready to Transform Your Healthcare Experience?
                        </h2>
                        
                        <p style={{
                            fontSize: '1.3rem',
                            color: 'rgba(255, 255, 255, 0.9)',
                            margin: '0 0 3rem',
                            maxWidth: '700px',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            lineHeight: '1.6'
                        }}>
                            Join thousands of patients and healthcare providers who trust MedReserve for their medical needs.
                        </p>
                        
                        <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <button 
                                onClick={handleRegister}
                                style={{
                                    padding: '1.3rem 3rem',
                                    background: 'rgba(255, 255, 255, 1)',
                                    color: '#16a34a',
                                    border: 'none',
                                    borderRadius: '16px',
                                    cursor: 'pointer',
                                    fontWeight: '700',
                                    fontSize: '1.1rem',
                                    transition: 'all 0.3s ease',
                                    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.75rem'
                                }}
                                onMouseEnter={e => {
                                    e.target.style.transform = 'translateY(-3px)';
                                    e.target.style.boxShadow = '0 12px 35px rgba(0, 0, 0, 0.15)';
                                }}
                                onMouseLeave={e => {
                                    e.target.style.transform = 'translateY(0)';
                                    e.target.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.1)';
                                }}
                            >
                                <span>✨</span>
                                Create Free Account
                            </button>
                            
                            <button 
                                onClick={handleLogin}
                                style={{
                                    padding: '1.3rem 3rem',
                                    background: 'rgba(255, 255, 255, 0.15)',
                                    color: 'white',
                                    border: '2px solid rgba(255, 255, 255, 0.3)',
                                    borderRadius: '16px',
                                    cursor: 'pointer',
                                    fontWeight: '700',
                                    fontSize: '1.1rem',
                                    transition: 'all 0.3s ease',
                                    backdropFilter: 'blur(10px)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.75rem'
                                }}
                                onMouseEnter={e => {
                                    e.target.style.transform = 'translateY(-3px)';
                                    e.target.style.background = 'rgba(255, 255, 255, 0.25)';
                                }}
                                onMouseLeave={e => {
                                    e.target.style.transform = 'translateY(0)';
                                    e.target.style.background = 'rgba(255, 255, 255, 0.15)';
                                }}
                            >
                                <span>🔑</span>
                                Sign In Now
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer style={{
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(20px)',
                padding: '3rem 2rem',
                borderTop: '1px solid rgba(34, 197, 94, 0.1)',
                position: 'relative',
                zIndex: 1
            }}>
                <div style={{
                    maxWidth: '1200px',
                    margin: '0 auto',
                    textAlign: 'center'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '2rem' }}>
                        <div style={{
                            width: '48px',
                            height: '48px',
                            background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                            borderRadius: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 6px 20px rgba(34, 197, 94, 0.25)'
                        }}>
                            <span style={{ fontSize: '1.5rem', color: 'white' }}>🩺</span>
                        </div>
                        <div>
                            <h3 style={{
                                fontSize: '1.3rem',
                                fontWeight: '700',
                                color: '#374151',
                                margin: 0
                            }}>
                                MedReserve
                            </h3>
                            <p style={{
                                fontSize: '0.85rem',
                                color: '#6b7280',
                                margin: 0,
                                fontWeight: '500'
                            }}>
                                Your Health, Our Priority
                            </p>
                        </div>
                    </div>
                    
                    <p style={{
                        color: '#6b7280',
                        margin: '0 0 2rem',
                        fontSize: '1rem',
                        lineHeight: '1.6',
                        maxWidth: '600px',
                        marginLeft: 'auto',
                        marginRight: 'auto'
                    }}>
                        MedReserve is committed to providing accessible, efficient, and secure healthcare management solutions 
                        for patients and healthcare providers worldwide.
                    </p>
                    
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '2rem',
                        flexWrap: 'wrap',
                        marginBottom: '2rem'
                    }}>
                        <a href="#" style={{
                            color: '#6b7280',
                            textDecoration: 'none',
                            fontSize: '0.95rem',
                            fontWeight: '500',
                            transition: 'color 0.2s ease'
                        }}
                        onMouseEnter={e => e.target.style.color = '#22c55e'}
                        onMouseLeave={e => e.target.style.color = '#6b7280'}>
                            Privacy Policy
                        </a>
                        <a href="#" style={{
                            color: '#6b7280',
                            textDecoration: 'none',
                            fontSize: '0.95rem',
                            fontWeight: '500',
                            transition: 'color 0.2s ease'
                        }}
                        onMouseEnter={e => e.target.style.color = '#22c55e'}
                        onMouseLeave={e => e.target.style.color = '#6b7280'}>
                            Terms of Service
                        </a>
                        <a href="#" style={{
                            color: '#6b7280',
                            textDecoration: 'none',
                            fontSize: '0.95rem',
                            fontWeight: '500',
                            transition: 'color 0.2s ease'
                        }}
                        onMouseEnter={e => e.target.style.color = '#22c55e'}
                        onMouseLeave={e => e.target.style.color = '#6b7280'}>
                            Contact Support
                        </a>
                        <a href="#" style={{
                            color: '#6b7280',
                            textDecoration: 'none',
                            fontSize: '0.95rem',
                            fontWeight: '500',
                            transition: 'color 0.2s ease'
                        }}
                        onMouseEnter={e => e.target.style.color = '#22c55e'}
                        onMouseLeave={e => e.target.style.color = '#6b7280'}>
                            About Us
                        </a>
                    </div>
                    
                    <div style={{
                        paddingTop: '2rem',
                        borderTop: '1px solid rgba(34, 197, 94, 0.1)',
                        color: '#9ca3af',
                        fontSize: '0.9rem'
                    }}>
                        © 2024 MedReserve. All rights reserved. Made with ❤️ for better healthcare.
                    </div>
                </div>
            </footer>
        </div>
    );
}
