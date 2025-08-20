import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        // Check if user is logged in
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');
        
        if (!token) {
            navigate('/login');
            return;
        }

        if (userData) {
            setUser(JSON.parse(userData));
        }
        setLoading(false);
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    if (loading) {
        return (
            <div style={{
                minHeight: '100vh',
                width: '100vw',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                boxSizing: 'border-box'
            }}>
                <div style={{
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '20px',
                    padding: '3rem',
                    textAlign: 'center',
                    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)'
                }}>
                    <div style={{
                        width: '60px',
                        height: '60px',
                        border: '3px solid rgba(102, 126, 234, 0.3)',
                        borderTop: '3px solid #667eea',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite',
                        margin: '0 auto 1rem'
                    }} />
                    <p style={{ color: '#718096', margin: 0 }}>Loading your dashboard...</p>
                </div>
            </div>
        );
    }

    if (!user) {
        return null;
    }

    return (
        <div style={{
            minHeight: '100vh',
            width: '100vw',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            position: 'relative',
            overflow: 'hidden',
            boxSizing: 'border-box'
        }}>
            {/* Animated background elements */}
            <div style={{
                position: 'absolute',
                top: '-50%',
                left: '-50%',
                width: '200%',
                height: '200%',
                background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
                animation: 'float 20s ease-in-out infinite',
                zIndex: 0
            }} />
            
            <div style={{
                position: 'absolute',
                top: '20%',
                right: '10%',
                width: '150px',
                height: '150px',
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '50%',
                animation: 'pulse 6s ease-in-out infinite',
                zIndex: 0
            }} />

            {/* Header */}
            <header style={{
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(20px)',
                padding: '1rem 2rem',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                position: 'relative',
                zIndex: 1,
                width: '100%',
                boxSizing: 'border-box'
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
                            width: '50px',
                            height: '50px',
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)'
                        }}>
                            <span style={{ fontSize: '1.5rem', color: 'white' }}>🏥</span>
                        </div>
                        <h1 style={{
                            fontSize: '1.5rem',
                            fontWeight: '700',
                            color: '#2d3748',
                            margin: 0,
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                        }}>
                            Medical Portal
                        </h1>
                    </div>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <span style={{ color: '#718096' }}>
                            Welcome, {user.username || user.fullName || 'User'}!
                        </span>
                        <button 
                            onClick={handleLogout}
                            style={{
                                padding: '0.75rem 1.5rem',
                                background: 'linear-gradient(135deg, #fed7d7 0%, #feb2b2 100%)',
                                color: '#c53030',
                                border: 'none',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontWeight: '600',
                                transition: 'all 0.3s ease',
                                boxShadow: '0 4px 15px rgba(254, 178, 178, 0.3)'
                            }}
                            onMouseEnter={e => {
                                e.target.style.transform = 'translateY(-1px)';
                                e.target.style.boxShadow = '0 6px 20px rgba(254, 178, 178, 0.4)';
                            }}
                            onMouseLeave={e => {
                                e.target.style.transform = 'translateY(0)';
                                e.target.style.boxShadow = '0 4px 15px rgba(254, 178, 178, 0.3)';
                            }}
                        >
                            🚪 Logout
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
                    borderRadius: '20px',
                    padding: '3rem',
                    marginBottom: '2rem',
                    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    textAlign: 'center'
                }}>
                    <div style={{
                        width: '100px',
                        height: '100px',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        borderRadius: '50%',
                        margin: '0 auto 2rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 10px 30px rgba(102, 126, 234, 0.3)'
                    }}>
                        <span style={{ fontSize: '3rem', color: 'white' }}>🎉</span>
                    </div>
                    <h2 style={{
                        fontSize: '2.5rem',
                        fontWeight: '700',
                        color: '#2d3748',
                        margin: '0 0 1rem',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}>
                        Welcome to Your Dashboard
                    </h2>
                    <p style={{
                        fontSize: '1.2rem',
                        color: '#718096',
                        margin: '0 0 2rem',
                        maxWidth: '600px',
                        marginLeft: 'auto',
                        marginRight: 'auto'
                    }}>
                        Manage your medical appointments, view your health records, and stay connected with healthcare providers.
                    </p>
                </div>

                {/* Quick Actions Grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '2rem',
                    marginBottom: '2rem',
                    width: '100%'
                }}>
                    {/* Book Appointment */}
                    <div style={{
                        background: 'rgba(255, 255, 255, 0.95)',
                        backdropFilter: 'blur(20px)',
                        borderRadius: '20px',
                        padding: '2rem',
                        boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer'
                    }}
                    onMouseEnter={e => {
                        e.target.style.transform = 'translateY(-5px)';
                        e.target.style.boxShadow = '0 30px 60px rgba(0, 0, 0, 0.2)';
                    }}
                    onMouseLeave={e => {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.15)';
                    }}>
                        <div style={{
                            width: '60px',
                            height: '60px',
                            background: 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: '1rem',
                            boxShadow: '0 8px 25px rgba(72, 187, 120, 0.3)'
                        }}>
                            <span style={{ fontSize: '2rem', color: 'white' }}>📅</span>
                        </div>
                        <h3 style={{
                            fontSize: '1.5rem',
                            fontWeight: '600',
                            color: '#2d3748',
                            margin: '0 0 1rem'
                        }}>
                            Book Appointment
                        </h3>
                        <p style={{
                            color: '#718096',
                            margin: '0 0 1.5rem',
                            lineHeight: '1.6'
                        }}>
                            Schedule a new medical appointment with available doctors and specialists.
                        </p>
                        <button style={{
                            background: 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)',
                            color: 'white',
                            border: 'none',
                            padding: '0.75rem 1.5rem',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontWeight: '600',
                            transition: 'all 0.3s ease'
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
                        boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer'
                    }}
                    onMouseEnter={e => {
                        e.target.style.transform = 'translateY(-5px)';
                        e.target.style.boxShadow = '0 30px 60px rgba(0, 0, 0, 0.2)';
                    }}
                    onMouseLeave={e => {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.15)';
                    }}>
                        <div style={{
                            width: '60px',
                            height: '60px',
                            background: 'linear-gradient(135deg, #4299e1 0%, #3182ce 100%)',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: '1rem',
                            boxShadow: '0 8px 25px rgba(66, 153, 225, 0.3)'
                        }}>
                            <span style={{ fontSize: '2rem', color: 'white' }}>📋</span>
                        </div>
                        <h3 style={{
                            fontSize: '1.5rem',
                            fontWeight: '600',
                            color: '#2d3748',
                            margin: '0 0 1rem'
                        }}>
                            My Appointments
                        </h3>
                        <p style={{
                            color: '#718096',
                            margin: '0 0 1.5rem',
                            lineHeight: '1.6'
                        }}>
                            View and manage your upcoming and past medical appointments.
                        </p>
                        <button style={{
                            background: 'linear-gradient(135deg, #4299e1 0%, #3182ce 100%)',
                            color: 'white',
                            border: 'none',
                            padding: '0.75rem 1.5rem',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontWeight: '600',
                            transition: 'all 0.3s ease'
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
                        boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer'
                    }}
                    onMouseEnter={e => {
                        e.target.style.transform = 'translateY(-5px)';
                        e.target.style.boxShadow = '0 30px 60px rgba(0, 0, 0, 0.2)';
                    }}
                    onMouseLeave={e => {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.15)';
                    }}>
                        <div style={{
                            width: '60px',
                            height: '60px',
                            background: 'linear-gradient(135deg, #ed8936 0%, #dd6b20 100%)',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: '1rem',
                            boxShadow: '0 8px 25px rgba(237, 137, 54, 0.3)'
                        }}>
                            <span style={{ fontSize: '2rem', color: 'white' }}>📊</span>
                        </div>
                        <h3 style={{
                            fontSize: '1.5rem',
                            fontWeight: '600',
                            color: '#2d3748',
                            margin: '0 0 1rem'
                        }}>
                            Health Records
                        </h3>
                        <p style={{
                            color: '#718096',
                            margin: '0 0 1.5rem',
                            lineHeight: '1.6'
                        }}>
                            Access your medical history, test results, and health information.
                        </p>
                        <button style={{
                            background: 'linear-gradient(135deg, #ed8936 0%, #dd6b20 100%)',
                            color: 'white',
                            border: 'none',
                            padding: '0.75rem 1.5rem',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontWeight: '600',
                            transition: 'all 0.3s ease'
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
                        boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer'
                    }}
                    onMouseEnter={e => {
                        e.target.style.transform = 'translateY(-5px)';
                        e.target.style.boxShadow = '0 30px 60px rgba(0, 0, 0, 0.2)';
                    }}
                    onMouseLeave={e => {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.15)';
                    }}>
                        <div style={{
                            width: '60px',
                            height: '60px',
                            background: 'linear-gradient(135deg, #9f7aea 0%, #805ad5 100%)',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: '1rem',
                            boxShadow: '0 8px 25px rgba(159, 122, 234, 0.3)'
                        }}>
                            <span style={{ fontSize: '2rem', color: 'white' }}>💬</span>
                        </div>
                        <h3 style={{
                            fontSize: '1.5rem',
                            fontWeight: '600',
                            color: '#2d3748',
                            margin: '0 0 1rem'
                        }}>
                            Contact Support
                        </h3>
                        <p style={{
                            color: '#718096',
                            margin: '0 0 1.5rem',
                            lineHeight: '1.6'
                        }}>
                            Get help from our support team for any questions or issues.
                        </p>
                        <button style={{
                            background: 'linear-gradient(135deg, #9f7aea 0%, #805ad5 100%)',
                            color: 'white',
                            border: 'none',
                            padding: '0.75rem 1.5rem',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontWeight: '600',
                            transition: 'all 0.3s ease'
                        }}>
                            Contact Us
                        </button>
                    </div>
                </div>
            </main>

            <style jsx>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    33% { transform: translateY(-20px) rotate(1deg); }
                    66% { transform: translateY(10px) rotate(-1deg); }
                }
                
                @keyframes pulse {
                    0%, 100% { transform: scale(1); opacity: 0.1; }
                    50% { transform: scale(1.1); opacity: 0.2; }
                }
                
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
}