import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        // Load user data from localStorage
        const userData = localStorage.getItem('user');
        
        if (userData) {
            setUser(JSON.parse(userData));
        }
        setLoading(false);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/');
    };

    if (loading) {
        return (
            <div style={{
                minHeight: '100vh',
                width: '100vw',
                background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
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
                        width: '50px',
                        height: '50px',
                        border: '3px solid rgba(34, 197, 94, 0.2)',
                        borderTop: '3px solid #22c55e',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite',
                        margin: '0 auto 1rem'
                    }} />
                    <p style={{ color: '#6b7280', margin: 0, fontSize: '0.95rem' }}>Loading your dashboard...</p>
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div style={{
                minHeight: '100vh',
                width: '100vw',
                background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
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
                        width: '80px',
                        height: '80px',
                        background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                        borderRadius: '20px',
                        margin: '0 auto 2rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 8px 24px rgba(34, 197, 94, 0.2)'
                    }}>
                        <span style={{ fontSize: '2.5rem', color: 'white' }}>🔐</span>
                    </div>
                    <h2 style={{
                        fontSize: '1.5rem',
                        fontWeight: '600',
                        color: '#374151',
                        margin: '0 0 1rem'
                    }}>
                        Authentication Required
                    </h2>
                    <p style={{ color: '#6b7280', margin: '0 0 2rem' }}>
                        Please log in to access your dashboard.
                    </p>
                    <button
                        onClick={() => navigate('/')}
                        style={{
                            padding: '0.875rem 2rem',
                            background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '12px',
                            cursor: 'pointer',
                            fontWeight: '500',
                            fontSize: '1rem',
                            transition: 'all 0.2s ease',
                            boxShadow: '0 4px 12px rgba(34, 197, 94, 0.2)'
                        }}
                    >
                        Go to Landing Page
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div style={{
            minHeight: '100vh',
            width: '100vw',
            background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
            position: 'relative',
            overflow: 'hidden',
            boxSizing: 'border-box'
        }}>
            {/* Minimalistic background decoration */}
            <div style={{
                position: 'absolute',
                top: '10%',
                right: '8%',
                width: '200px',
                height: '200px',
                background: 'rgba(34, 197, 94, 0.08)',
                borderRadius: '50%',
                zIndex: 0
            }} />
            
            <div style={{
                position: 'absolute',
                bottom: '15%',
                left: '5%',
                width: '150px',
                height: '150px',
                background: 'rgba(22, 163, 74, 0.06)',
                borderRadius: '50%',
                zIndex: 0
            }} />

            {/* Header */}
            <header style={{
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(20px)',
                padding: '1.25rem 2rem',
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
                            width: '48px',
                            height: '48px',
                            background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                            borderRadius: '14px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 4px 15px rgba(34, 197, 94, 0.2)'
                        }}>
                            <span style={{ fontSize: '1.5rem', color: 'white' }}>🩺</span>
                        </div>
                        <h1 style={{
                            fontSize: '1.4rem',
                            fontWeight: '600',
                            color: '#374151',
                            margin: 0,
                            letterSpacing: '-0.025em'
                        }}>
                            Medical Portal
                        </h1>
                    </div>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                        <span style={{ color: '#6b7280', fontSize: '0.95rem' }}>
                            Welcome, {user.username || user.fullName || 'User'}!
                        </span>
                        <button 
                            onClick={handleLogout}
                            style={{
                                padding: '0.75rem 1.25rem',
                                background: 'rgba(248, 113, 113, 0.1)',
                                color: '#dc2626',
                                border: '1px solid rgba(248, 113, 113, 0.2)',
                                borderRadius: '10px',
                                cursor: 'pointer',
                                fontWeight: '500',
                                fontSize: '0.9rem',
                                transition: 'all 0.2s ease'
                            }}
                            onMouseEnter={e => {
                                e.target.style.background = 'rgba(248, 113, 113, 0.15)';
                                e.target.style.transform = 'translateY(-1px)';
                            }}
                            onMouseLeave={e => {
                                e.target.style.background = 'rgba(248, 113, 113, 0.1)';
                                e.target.style.transform = 'translateY(0)';
                            }}
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main style={{
                maxWidth: '1200px',
                margin: '0 auto',
                padding: '2rem',
                position: 'relative',
                zIndex: 1,
                width: '100%',
                boxSizing: 'border-box'
            }}>
                {/* Welcome Section */}
                <div style={{
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '24px',
                    padding: '3rem',
                    marginBottom: '2rem',
                    boxShadow: '0 20px 40px rgba(34, 197, 94, 0.1), 0 8px 32px rgba(0, 0, 0, 0.05)',
                    border: '1px solid rgba(34, 197, 94, 0.1)',
                    textAlign: 'center'
                }}>
                    <div style={{
                        width: '80px',
                        height: '80px',
                        background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                        borderRadius: '20px',
                        margin: '0 auto 2rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 8px 24px rgba(34, 197, 94, 0.2)'
                    }}>
                        <span style={{ fontSize: '2.5rem', color: 'white' }}>👋</span>
                    </div>
                    <h2 style={{
                        fontSize: '2rem',
                        fontWeight: '600',
                        color: '#374151',
                        margin: '0 0 1rem',
                        letterSpacing: '-0.025em'
                    }}>
                        Welcome to Your Dashboard
                    </h2>
                    <p style={{
                        fontSize: '1.1rem',
                        color: '#6b7280',
                        margin: '0 0 2rem',
                        maxWidth: '600px',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        lineHeight: 1.6
                    }}>
                        Manage your medical appointments, view your health records, and stay connected with healthcare providers.
                    </p>
                </div>

                {/* Quick Actions Grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '1.5rem',
                    marginBottom: '2rem',
                    width: '100%'
                }}>
                    {/* Book Appointment */}
                    <div style={{
                        background: 'rgba(255, 255, 255, 0.95)',
                        backdropFilter: 'blur(20px)',
                        borderRadius: '20px',
                        padding: '2rem',
                        boxShadow: '0 8px 24px rgba(34, 197, 94, 0.08)',
                        border: '1px solid rgba(34, 197, 94, 0.1)',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer'
                    }}
                    onMouseEnter={e => {
                        e.target.style.transform = 'translateY(-4px)';
                        e.target.style.boxShadow = '0 12px 32px rgba(34, 197, 94, 0.12)';
                    }}
                    onMouseLeave={e => {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = '0 8px 24px rgba(34, 197, 94, 0.08)';
                    }}>
                        <div style={{
                            width: '56px',
                            height: '56px',
                            background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                            borderRadius: '16px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: '1.5rem',
                            boxShadow: '0 6px 20px rgba(34, 197, 94, 0.25)'
                        }}>
                            <span style={{ fontSize: '1.8rem', color: 'white' }}>📅</span>
                        </div>
                        <h3 style={{
                            fontSize: '1.3rem',
                            fontWeight: '600',
                            color: '#374151',
                            margin: '0 0 1rem',
                            letterSpacing: '-0.025em'
                        }}>
                            Book Appointment
                        </h3>
                        <p style={{
                            color: '#6b7280',
                            margin: '0 0 1.5rem',
                            lineHeight: '1.6',
                            fontSize: '0.95rem'
                        }}>
                            Schedule a new medical appointment with available doctors and specialists.
                        </p>
                        <button style={{
                            background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                            color: 'white',
                            border: 'none',
                            padding: '0.75rem 1.5rem',
                            borderRadius: '10px',
                            cursor: 'pointer',
                            fontWeight: '500',
                            fontSize: '0.95rem',
                            transition: 'all 0.2s ease',
                            boxShadow: '0 4px 12px rgba(34, 197, 94, 0.2)'
                        }}>
                            Book Now
                        </button>
                    </div>

                    {/* View Appointments */}
                    <div style={{
                        background: 'rgba(255, 255, 255, 0.95)',
                        backdropFilter: 'blur(20px)',
                        borderRadius: '20px',
                        padding: '2rem',
                        boxShadow: '0 8px 24px rgba(34, 197, 94, 0.08)',
                        border: '1px solid rgba(34, 197, 94, 0.1)',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer'
                    }}
                    onMouseEnter={e => {
                        e.target.style.transform = 'translateY(-4px)';
                        e.target.style.boxShadow = '0 12px 32px rgba(34, 197, 94, 0.12)';
                    }}
                    onMouseLeave={e => {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = '0 8px 24px rgba(34, 197, 94, 0.08)';
                    }}>
                        <div style={{
                            width: '56px',
                            height: '56px',
                            background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                            borderRadius: '16px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: '1.5rem',
                            boxShadow: '0 6px 20px rgba(5, 150, 105, 0.25)'
                        }}>
                            <span style={{ fontSize: '1.8rem', color: 'white' }}>📋</span>
                        </div>
                        <h3 style={{
                            fontSize: '1.3rem',
                            fontWeight: '600',
                            color: '#374151',
                            margin: '0 0 1rem',
                            letterSpacing: '-0.025em'
                        }}>
                            My Appointments
                        </h3>
                        <p style={{
                            color: '#6b7280',
                            margin: '0 0 1.5rem',
                            lineHeight: '1.6',
                            fontSize: '0.95rem'
                        }}>
                            View and manage your upcoming and past medical appointments.
                        </p>
                        <button style={{
                            background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                            color: 'white',
                            border: 'none',
                            padding: '0.75rem 1.5rem',
                            borderRadius: '10px',
                            cursor: 'pointer',
                            fontWeight: '500',
                            fontSize: '0.95rem',
                            transition: 'all 0.2s ease',
                            boxShadow: '0 4px 12px rgba(5, 150, 105, 0.2)'
                        }}>
                            View All
                        </button>
                    </div>

                    {/* Health Records */}
                    <div style={{
                        background: 'rgba(255, 255, 255, 0.95)',
                        backdropFilter: 'blur(20px)',
                        borderRadius: '20px',
                        padding: '2rem',
                        boxShadow: '0 8px 24px rgba(34, 197, 94, 0.08)',
                        border: '1px solid rgba(34, 197, 94, 0.1)',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer'
                    }}
                    onMouseEnter={e => {
                        e.target.style.transform = 'translateY(-4px)';
                        e.target.style.boxShadow = '0 12px 32px rgba(34, 197, 94, 0.12)';
                    }}
                    onMouseLeave={e => {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = '0 8px 24px rgba(34, 197, 94, 0.08)';
                    }}>
                        <div style={{
                            width: '56px',
                            height: '56px',
                            background: 'linear-gradient(135deg, #15803d 0%, #14532d 100%)',
                            borderRadius: '16px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: '1.5rem',
                            boxShadow: '0 6px 20px rgba(21, 128, 61, 0.25)'
                        }}>
                            <span style={{ fontSize: '1.8rem', color: 'white' }}>📊</span>
                        </div>
                        <h3 style={{
                            fontSize: '1.3rem',
                            fontWeight: '600',
                            color: '#374151',
                            margin: '0 0 1rem',
                            letterSpacing: '-0.025em'
                        }}>
                            Health Records
                        </h3>
                        <p style={{
                            color: '#6b7280',
                            margin: '0 0 1.5rem',
                            lineHeight: '1.6',
                            fontSize: '0.95rem'
                        }}>
                            Access your medical history, test results, and health information.
                        </p>
                        <button style={{
                            background: 'linear-gradient(135deg, #15803d 0%, #14532d 100%)',
                            color: 'white',
                            border: 'none',
                            padding: '0.75rem 1.5rem',
                            borderRadius: '10px',
                            cursor: 'pointer',
                            fontWeight: '500',
                            fontSize: '0.95rem',
                            transition: 'all 0.2s ease',
                            boxShadow: '0 4px 12px rgba(21, 128, 61, 0.2)'
                        }}>
                            View Records
                        </button>
                    </div>

                    {/* Contact Support */}
                    <div style={{
                        background: 'rgba(255, 255, 255, 0.95)',
                        backdropFilter: 'blur(20px)',
                        borderRadius: '20px',
                        padding: '2rem',
                        boxShadow: '0 8px 24px rgba(34, 197, 94, 0.08)',
                        border: '1px solid rgba(34, 197, 94, 0.1)',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer'
                    }}
                    onMouseEnter={e => {
                        e.target.style.transform = 'translateY(-4px)';
                        e.target.style.boxShadow = '0 12px 32px rgba(34, 197, 94, 0.12)';
                    }}
                    onMouseLeave={e => {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = '0 8px 24px rgba(34, 197, 94, 0.08)';
                    }}>
                        <div style={{
                            width: '56px',
                            height: '56px',
                            background: 'linear-gradient(135deg, #4ade80 0%, #22c55e 100%)',
                            borderRadius: '16px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: '1.5rem',
                            boxShadow: '0 6px 20px rgba(74, 222, 128, 0.25)'
                        }}>
                            <span style={{ fontSize: '1.8rem', color: 'white' }}>💬</span>
                        </div>
                        <h3 style={{
                            fontSize: '1.3rem',
                            fontWeight: '600',
                            color: '#374151',
                            margin: '0 0 1rem',
                            letterSpacing: '-0.025em'
                        }}>
                            Contact Support
                        </h3>
                        <p style={{
                            color: '#6b7280',
                            margin: '0 0 1.5rem',
                            lineHeight: '1.6',
                            fontSize: '0.95rem'
                        }}>
                            Get help from our support team for any questions or issues.
                        </p>
                        <button style={{
                            background: 'linear-gradient(135deg, #4ade80 0%, #22c55e 100%)',
                            color: 'white',
                            border: 'none',
                            padding: '0.75rem 1.5rem',
                            borderRadius: '10px',
                            cursor: 'pointer',
                            fontWeight: '500',
                            fontSize: '0.95rem',
                            transition: 'all 0.2s ease',
                            boxShadow: '0 4px 12px rgba(74, 222, 128, 0.2)'
                        }}>
                            Contact Us
                        </button>
                    </div>
                </div>
            </main>

            <style jsx>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
}