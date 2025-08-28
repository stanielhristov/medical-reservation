import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function HomePage() {
    const navigate = useNavigate();
    const { user, loading, logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const handleNavigation = (path) => {
        navigate(path);
    };

    if (loading) {
        return (
            <div style={{
                minHeight: '100vh',
                width: '100vw',
                background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 50%, #bbf7d0 100%)',
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
                        width: '60px',
                        height: '60px',
                        border: '4px solid rgba(34, 197, 94, 0.2)',
                        borderTop: '4px solid #22c55e',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite',
                        margin: '0 auto 1.5rem'
                    }} />
                    <p style={{ color: '#6b7280', margin: 0, fontSize: '1rem', fontWeight: '500' }}>Loading your dashboard...</p>
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div style={{
                minHeight: '100vh',
                width: '100vw',
                background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 50%, #bbf7d0 100%)',
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
                        boxShadow: '0 8px 24px rgba(34, 197, 94, 0.3)'
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
            background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 30%, #bbf7d0 70%, #a7f3d0 100%)',
            position: 'relative',
            overflow: 'hidden',
            boxSizing: 'border-box'
        }}>
            {/* Enhanced background decorations */}
            <div style={{
                position: 'absolute',
                top: '8%',
                right: '5%',
                width: '280px',
                height: '280px',
                background: 'radial-gradient(circle, rgba(34, 197, 94, 0.12) 0%, rgba(34, 197, 94, 0.06) 50%, transparent 100%)',
                borderRadius: '50%',
                zIndex: 0
            }} />
            
            <div style={{
                position: 'absolute',
                bottom: '12%',
                left: '3%',
                width: '220px',
                height: '220px',
                background: 'radial-gradient(circle, rgba(22, 163, 74, 0.1) 0%, rgba(22, 163, 74, 0.04) 50%, transparent 100%)',
                borderRadius: '50%',
                zIndex: 0
            }} />

            <div style={{
                position: 'absolute',
                top: '45%',
                left: '85%',
                width: '180px',
                height: '180px',
                background: 'radial-gradient(circle, rgba(16, 185, 129, 0.08) 0%, rgba(16, 185, 129, 0.03) 50%, transparent 100%)',
                borderRadius: '50%',
                zIndex: 0
            }} />

            <div style={{
                position: 'absolute',
                top: '25%',
                left: '8%',
                width: '120px',
                height: '120px',
                background: 'radial-gradient(circle, rgba(5, 150, 105, 0.06) 0%, rgba(5, 150, 105, 0.02) 50%, transparent 100%)',
                borderRadius: '50%',
                zIndex: 0
            }} />

            {/* Enhanced Header */}
            <header style={{
                background: 'rgba(255, 255, 255, 0.98)',
                backdropFilter: 'blur(20px)',
                padding: '1.5rem 2rem',
                boxShadow: '0 8px 32px rgba(34, 197, 94, 0.12), 0 4px 16px rgba(0, 0, 0, 0.04)',
                position: 'relative',
                zIndex: 1,
                width: '100%',
                boxSizing: 'border-box',
                borderBottom: '1px solid rgba(34, 197, 94, 0.15)'
            }}>
                <div style={{
                    maxWidth: '1400px',
                    margin: '0 auto',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                        <div style={{
                            width: '56px',
                            height: '56px',
                            background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                            borderRadius: '16px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 8px 24px rgba(34, 197, 94, 0.3)',
                            position: 'relative'
                        }}>
                            <span style={{ fontSize: '1.75rem', color: 'white' }}>🩺</span>
                            <div style={{
                                position: 'absolute',
                                top: '-2px',
                                right: '-2px',
                                width: '16px',
                                height: '16px',
                                background: '#10b981',
                                borderRadius: '50%',
                                border: '2px solid white'
                            }} />
                        </div>
                        <div>
                            <h1 style={{
                                fontSize: '1.6rem',
                                fontWeight: '700',
                                color: '#374151',
                                margin: '0 0 0.25rem',
                                letterSpacing: '-0.025em'
                            }}>
                                Healthcare Portal
                            </h1>
                            <p style={{
                                fontSize: '0.85rem',
                                color: '#6b7280',
                                margin: 0,
                                fontWeight: '500'
                            }}>
                                Healthcare Management System
                            </p>
                        </div>
                    </div>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem',
                            background: 'rgba(34, 197, 94, 0.05)',
                            padding: '0.75rem 1.25rem',
                            borderRadius: '12px',
                            border: '1px solid rgba(34, 197, 94, 0.1)'
                        }}>
                            <div style={{
                                width: '36px',
                                height: '36px',
                                background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                                borderRadius: '8px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxShadow: '0 4px 12px rgba(34, 197, 94, 0.2)'
                            }}>
                                <span style={{ fontSize: '1.2rem', color: 'white' }}>👤</span>
                            </div>
                            <div>
                                <span style={{ 
                                    color: '#374151', 
                                    fontSize: '0.95rem',
                                    fontWeight: '600',
                                    display: 'block'
                                }}>
                                    {user.fullName || user.email || 'User'}
                                </span>
                                <span style={{ 
                                    color: '#22c55e', 
                                    fontSize: '0.8rem',
                                    fontWeight: '500',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.05em'
                                }}>
                                    {user.role || 'USER'}
                                </span>
                            </div>
                        </div>
                        
                        <button 
                            onClick={handleLogout}
                            style={{
                                padding: '0.875rem 1.5rem',
                                background: 'rgba(248, 113, 113, 0.1)',
                                color: '#dc2626',
                                border: '1px solid rgba(248, 113, 113, 0.2)',
                                borderRadius: '12px',
                                cursor: 'pointer',
                                fontWeight: '600',
                                fontSize: '0.9rem',
                                transition: 'all 0.3s ease',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}
                            onMouseEnter={e => {
                                e.target.style.background = 'rgba(248, 113, 113, 0.15)';
                                e.target.style.transform = 'translateY(-2px)';
                                e.target.style.boxShadow = '0 6px 20px rgba(248, 113, 113, 0.15)';
                            }}
                            onMouseLeave={e => {
                                e.target.style.background = 'rgba(248, 113, 113, 0.1)';
                                e.target.style.transform = 'translateY(0)';
                                e.target.style.boxShadow = 'none';
                            }}
                        >
                            <span>🚪</span>
                            Logout
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main style={{
                maxWidth: '1400px',
                margin: '0 auto',
                padding: '2.5rem 2rem',
                position: 'relative',
                zIndex: 1,
                width: '100%',
                boxSizing: 'border-box'
            }}>
                {/* Enhanced Welcome Section */}
                <section style={{
                    background: 'rgba(255, 255, 255, 0.98)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '32px',
                    padding: '4rem 3rem',
                    marginBottom: '3rem',
                    boxShadow: '0 32px 64px rgba(34, 197, 94, 0.12), 0 16px 32px rgba(0, 0, 0, 0.06)',
                    border: '1px solid rgba(34, 197, 94, 0.15)',
                    textAlign: 'center',
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
                        background: 'radial-gradient(circle, rgba(34, 197, 94, 0.05) 0%, transparent 70%)',
                        borderRadius: '50%',
                        zIndex: 0
                    }} />
                    
                    <div style={{ position: 'relative', zIndex: 1 }}>
                        <div style={{
                            width: '120px',
                            height: '120px',
                            background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                            borderRadius: '24px',
                            margin: '0 auto 2.5rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 16px 40px rgba(34, 197, 94, 0.3)',
                            position: 'relative'
                        }}>
                            <span style={{ fontSize: '3.5rem', color: 'white' }}>👋</span>
                            <div style={{
                                position: 'absolute',
                                inset: '-4px',
                                background: 'linear-gradient(45deg, transparent, rgba(255,255,255,0.3), transparent)',
                                borderRadius: '28px',
                                zIndex: -1
                            }} />
                        </div>
                        
                        <h1 style={{
                            fontSize: '2.8rem',
                            fontWeight: '800',
                            color: '#374151',
                            margin: '0 0 1rem',
                            letterSpacing: '-0.03em',
                            lineHeight: '1.1'
                        }}>
                            Welcome Back,
                            <br />
                            <span style={{
                                background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text'
                            }}>
                                {user.fullName?.split(' ')[0] || 'User'}!
                            </span>
                        </h1>
                        
                        <p style={{
                            fontSize: '1.25rem',
                            color: '#6b7280',
                            margin: '0 0 3rem',
                            maxWidth: '700px',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            lineHeight: '1.6',
                            fontWeight: '400'
                        }}>
                            Your comprehensive healthcare dashboard is ready. Manage appointments, access health records, 
                            and stay connected with your healthcare providers all in one place.
                        </p>

                        {/* Quick Stats */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                            gap: '1.5rem',
                            maxWidth: '800px',
                            margin: '0 auto'
                        }}>
                            <div style={{
                                background: 'rgba(34, 197, 94, 0.1)',
                                padding: '1.5rem',
                                borderRadius: '16px',
                                border: '1px solid rgba(34, 197, 94, 0.2)'
                            }}>
                                <div style={{ color: '#22c55e', fontSize: '2rem', marginBottom: '0.5rem' }}>📅</div>
                                <div style={{ color: '#374151', fontWeight: '700', fontSize: '1.5rem' }}>2</div>
                                <div style={{ color: '#6b7280', fontSize: '0.9rem' }}>Upcoming Appointments</div>
                            </div>
                            <div style={{
                                background: 'rgba(59, 130, 246, 0.1)',
                                padding: '1.5rem',
                                borderRadius: '16px',
                                border: '1px solid rgba(59, 130, 246, 0.2)'
                            }}>
                                <div style={{ color: '#3b82f6', fontSize: '2rem', marginBottom: '0.5rem' }}>📋</div>
                                <div style={{ color: '#374151', fontWeight: '700', fontSize: '1.5rem' }}>8</div>
                                <div style={{ color: '#6b7280', fontSize: '0.9rem' }}>Health Records</div>
                            </div>
                            <div style={{
                                background: 'rgba(168, 85, 247, 0.1)',
                                padding: '1.5rem',
                                borderRadius: '16px',
                                border: '1px solid rgba(168, 85, 247, 0.2)'
                            }}>
                                <div style={{ color: '#a855f7', fontSize: '2rem', marginBottom: '0.5rem' }}>🩺</div>
                                <div style={{ color: '#374151', fontWeight: '700', fontSize: '1.5rem' }}>3</div>
                                <div style={{ color: '#6b7280', fontSize: '0.9rem' }}>Preferred Doctors</div>
                            </div>
                            <div style={{
                                background: 'rgba(239, 68, 68, 0.1)',
                                padding: '1.5rem',
                                borderRadius: '16px',
                                border: '1px solid rgba(239, 68, 68, 0.2)'
                            }}>
                                <div style={{ color: '#ef4444', fontSize: '2rem', marginBottom: '0.5rem' }}>🔔</div>
                                <div style={{ color: '#374151', fontWeight: '700', fontSize: '1.5rem' }}>1</div>
                                <div style={{ color: '#6b7280', fontSize: '0.9rem' }}>New Notifications</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Enhanced Quick Actions Grid */}
                <section style={{ marginBottom: '3rem' }}>
                    <div style={{
                        textAlign: 'center',
                        marginBottom: '3rem'
                    }}>
                        <h2 style={{
                            fontSize: '2.2rem',
                            fontWeight: '700',
                            color: '#374151',
                            margin: '0 0 1rem',
                            letterSpacing: '-0.025em'
                        }}>
                            Quick Actions
                        </h2>
                        <p style={{
                            fontSize: '1.1rem',
                            color: '#6b7280',
                            margin: 0,
                            maxWidth: '600px',
                            marginLeft: 'auto',
                            marginRight: 'auto'
                        }}>
                            Access your most important healthcare features with one click
                        </p>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                        gap: '2rem',
                        width: '100%'
                    }}>
                        {/* Book Appointment */}
                        <div style={{
                            background: 'rgba(255, 255, 255, 0.98)',
                            backdropFilter: 'blur(20px)',
                            borderRadius: '24px',
                            padding: '2.5rem',
                            boxShadow: '0 12px 32px rgba(34, 197, 94, 0.1)',
                            border: '1px solid rgba(34, 197, 94, 0.15)',
                            transition: 'all 0.4s ease',
                            cursor: 'pointer',
                            position: 'relative',
                            overflow: 'hidden'
                        }}
                        onClick={() => handleNavigation('/patient/appointments')}
                        onMouseEnter={e => {
                            e.currentTarget.style.transform = 'translateY(-8px)';
                            e.currentTarget.style.boxShadow = '0 20px 48px rgba(34, 197, 94, 0.2)';
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 12px 32px rgba(34, 197, 94, 0.1)';
                        }}>
                            <div style={{
                                position: 'absolute',
                                top: '10px',
                                right: '10px',
                                width: '100px',
                                height: '100px',
                                background: 'radial-gradient(circle, rgba(34, 197, 94, 0.1) 0%, transparent 70%)',
                                borderRadius: '50%'
                            }} />
                            
                            <div style={{
                                width: '72px',
                                height: '72px',
                                background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                                borderRadius: '20px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: '2rem',
                                boxShadow: '0 12px 32px rgba(34, 197, 94, 0.3)',
                                position: 'relative'
                            }}>
                                <span style={{ fontSize: '2.2rem', color: 'white' }}>📅</span>
                                <div style={{
                                    position: 'absolute',
                                    inset: '-2px',
                                    background: 'linear-gradient(45deg, transparent, rgba(255,255,255,0.2), transparent)',
                                    borderRadius: '22px',
                                    zIndex: -1
                                }} />
                            </div>
                            
                            <h3 style={{
                                fontSize: '1.5rem',
                                fontWeight: '700',
                                color: '#374151',
                                margin: '0 0 1rem',
                                letterSpacing: '-0.025em'
                            }}>
                                Book Appointment
                            </h3>
                            
                            <p style={{
                                color: '#6b7280',
                                margin: '0 0 2rem',
                                lineHeight: '1.6',
                                fontSize: '1rem'
                            }}>
                                Schedule a new medical appointment with available doctors and specialists. Choose your preferred time and doctor.
                            </p>
                            
                            <button style={{
                                background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                                color: 'white',
                                border: 'none',
                                padding: '1rem 2rem',
                                borderRadius: '14px',
                                cursor: 'pointer',
                                fontWeight: '600',
                                fontSize: '1rem',
                                transition: 'all 0.3s ease',
                                boxShadow: '0 6px 20px rgba(34, 197, 94, 0.25)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem'
                            }}>
                                <span>🚀</span>
                                Book Now
                            </button>
                        </div>

                        {/* View Appointments */}
                        <div style={{
                            background: 'rgba(255, 255, 255, 0.98)',
                            backdropFilter: 'blur(20px)',
                            borderRadius: '24px',
                            padding: '2.5rem',
                            boxShadow: '0 12px 32px rgba(5, 150, 105, 0.1)',
                            border: '1px solid rgba(5, 150, 105, 0.15)',
                            transition: 'all 0.4s ease',
                            cursor: 'pointer',
                            position: 'relative',
                            overflow: 'hidden'
                        }}
                        onClick={() => handleNavigation('/patient/appointments')}
                        onMouseEnter={e => {
                            e.currentTarget.style.transform = 'translateY(-8px)';
                            e.currentTarget.style.boxShadow = '0 20px 48px rgba(5, 150, 105, 0.2)';
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 12px 32px rgba(5, 150, 105, 0.1)';
                        }}>
                            <div style={{
                                position: 'absolute',
                                top: '10px',
                                right: '10px',
                                width: '100px',
                                height: '100px',
                                background: 'radial-gradient(circle, rgba(5, 150, 105, 0.1) 0%, transparent 70%)',
                                borderRadius: '50%'
                            }} />
                            
                            <div style={{
                                width: '72px',
                                height: '72px',
                                background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                                borderRadius: '20px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: '2rem',
                                boxShadow: '0 12px 32px rgba(5, 150, 105, 0.3)',
                                position: 'relative'
                            }}>
                                <span style={{ fontSize: '2.2rem', color: 'white' }}>📋</span>
                                <div style={{
                                    position: 'absolute',
                                    inset: '-2px',
                                    background: 'linear-gradient(45deg, transparent, rgba(255,255,255,0.2), transparent)',
                                    borderRadius: '22px',
                                    zIndex: -1
                                }} />
                            </div>
                            
                            <h3 style={{
                                fontSize: '1.5rem',
                                fontWeight: '700',
                                color: '#374151',
                                margin: '0 0 1rem',
                                letterSpacing: '-0.025em'
                            }}>
                                My Appointments
                            </h3>
                            
                            <p style={{
                                color: '#6b7280',
                                margin: '0 0 2rem',
                                lineHeight: '1.6',
                                fontSize: '1rem'
                            }}>
                                View and manage your upcoming and past medical appointments. Track your healthcare journey.
                            </p>
                            
                            <button style={{
                                background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                                color: 'white',
                                border: 'none',
                                padding: '1rem 2rem',
                                borderRadius: '14px',
                                cursor: 'pointer',
                                fontWeight: '600',
                                fontSize: '1rem',
                                transition: 'all 0.3s ease',
                                boxShadow: '0 6px 20px rgba(5, 150, 105, 0.25)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem'
                            }}>
                                <span>📊</span>
                                View All
                            </button>
                        </div>

                        {/* Health Records */}
                        <div style={{
                            background: 'rgba(255, 255, 255, 0.98)',
                            backdropFilter: 'blur(20px)',
                            borderRadius: '24px',
                            padding: '2.5rem',
                            boxShadow: '0 12px 32px rgba(21, 128, 61, 0.1)',
                            border: '1px solid rgba(21, 128, 61, 0.15)',
                            transition: 'all 0.4s ease',
                            cursor: 'pointer',
                            position: 'relative',
                            overflow: 'hidden'
                        }}
                        onClick={() => handleNavigation('/patient/medical-history')}
                        onMouseEnter={e => {
                            e.currentTarget.style.transform = 'translateY(-8px)';
                            e.currentTarget.style.boxShadow = '0 20px 48px rgba(21, 128, 61, 0.2)';
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 12px 32px rgba(21, 128, 61, 0.1)';
                        }}>
                            <div style={{
                                position: 'absolute',
                                top: '10px',
                                right: '10px',
                                width: '100px',
                                height: '100px',
                                background: 'radial-gradient(circle, rgba(21, 128, 61, 0.1) 0%, transparent 70%)',
                                borderRadius: '50%'
                            }} />
                            
                            <div style={{
                                width: '72px',
                                height: '72px',
                                background: 'linear-gradient(135deg, #15803d 0%, #14532d 100%)',
                                borderRadius: '20px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: '2rem',
                                boxShadow: '0 12px 32px rgba(21, 128, 61, 0.3)',
                                position: 'relative'
                            }}>
                                <span style={{ fontSize: '2.2rem', color: 'white' }}>📊</span>
                                <div style={{
                                    position: 'absolute',
                                    inset: '-2px',
                                    background: 'linear-gradient(45deg, transparent, rgba(255,255,255,0.2), transparent)',
                                    borderRadius: '22px',
                                    zIndex: -1
                                }} />
                            </div>
                            
                            <h3 style={{
                                fontSize: '1.5rem',
                                fontWeight: '700',
                                color: '#374151',
                                margin: '0 0 1rem',
                                letterSpacing: '-0.025em'
                            }}>
                                Health Records
                            </h3>
                            
                            <p style={{
                                color: '#6b7280',
                                margin: '0 0 2rem',
                                lineHeight: '1.6',
                                fontSize: '1rem'
                            }}>
                                Access your comprehensive medical history, test results, prescriptions, and health information.
                            </p>
                            
                            <button style={{
                                background: 'linear-gradient(135deg, #15803d 0%, #14532d 100%)',
                                color: 'white',
                                border: 'none',
                                padding: '1rem 2rem',
                                borderRadius: '14px',
                                cursor: 'pointer',
                                fontWeight: '600',
                                fontSize: '1rem',
                                transition: 'all 0.3s ease',
                                boxShadow: '0 6px 20px rgba(21, 128, 61, 0.25)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem'
                            }}>
                                <span>📋</span>
                                View Records
                            </button>
                        </div>

                        {/* Find Doctors */}
                        <div style={{
                            background: 'rgba(255, 255, 255, 0.98)',
                            backdropFilter: 'blur(20px)',
                            borderRadius: '24px',
                            padding: '2.5rem',
                            boxShadow: '0 12px 32px rgba(74, 222, 128, 0.1)',
                            border: '1px solid rgba(74, 222, 128, 0.15)',
                            transition: 'all 0.4s ease',
                            cursor: 'pointer',
                            position: 'relative',
                            overflow: 'hidden'
                        }}
                        onClick={() => handleNavigation('/patient/doctors')}
                        onMouseEnter={e => {
                            e.currentTarget.style.transform = 'translateY(-8px)';
                            e.currentTarget.style.boxShadow = '0 20px 48px rgba(74, 222, 128, 0.2)';
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 12px 32px rgba(74, 222, 128, 0.1)';
                        }}>
                            <div style={{
                                position: 'absolute',
                                top: '10px',
                                right: '10px',
                                width: '100px',
                                height: '100px',
                                background: 'radial-gradient(circle, rgba(74, 222, 128, 0.1) 0%, transparent 70%)',
                                borderRadius: '50%'
                            }} />
                            
                            <div style={{
                                width: '72px',
                                height: '72px',
                                background: 'linear-gradient(135deg, #4ade80 0%, #22c55e 100%)',
                                borderRadius: '20px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: '2rem',
                                boxShadow: '0 12px 32px rgba(74, 222, 128, 0.3)',
                                position: 'relative'
                            }}>
                                <span style={{ fontSize: '2.2rem', color: 'white' }}>👨‍⚕️</span>
                                <div style={{
                                    position: 'absolute',
                                    inset: '-2px',
                                    background: 'linear-gradient(45deg, transparent, rgba(255,255,255,0.2), transparent)',
                                    borderRadius: '22px',
                                    zIndex: -1
                                }} />
                            </div>
                            
                            <h3 style={{
                                fontSize: '1.5rem',
                                fontWeight: '700',
                                color: '#374151',
                                margin: '0 0 1rem',
                                letterSpacing: '-0.025em'
                            }}>
                                Find Doctors
                            </h3>
                            
                            <p style={{
                                color: '#6b7280',
                                margin: '0 0 2rem',
                                lineHeight: '1.6',
                                fontSize: '1rem'
                            }}>
                                Browse through our network of qualified healthcare professionals and specialists.
                            </p>
                            
                            <button style={{
                                background: 'linear-gradient(135deg, #4ade80 0%, #22c55e 100%)',
                                color: 'white',
                                border: 'none',
                                padding: '1rem 2rem',
                                borderRadius: '14px',
                                cursor: 'pointer',
                                fontWeight: '600',
                                fontSize: '1rem',
                                transition: 'all 0.3s ease',
                                boxShadow: '0 6px 20px rgba(74, 222, 128, 0.25)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem'
                            }}>
                                <span>🔍</span>
                                Browse Doctors
                            </button>
                        </div>

                        {/* Notifications */}
                        <div style={{
                            background: 'rgba(255, 255, 255, 0.98)',
                            backdropFilter: 'blur(20px)',
                            borderRadius: '24px',
                            padding: '2.5rem',
                            boxShadow: '0 12px 32px rgba(239, 68, 68, 0.1)',
                            border: '1px solid rgba(239, 68, 68, 0.15)',
                            transition: 'all 0.4s ease',
                            cursor: 'pointer',
                            position: 'relative',
                            overflow: 'hidden'
                        }}
                        onClick={() => handleNavigation('/patient/notifications')}
                        onMouseEnter={e => {
                            e.currentTarget.style.transform = 'translateY(-8px)';
                            e.currentTarget.style.boxShadow = '0 20px 48px rgba(239, 68, 68, 0.2)';
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 12px 32px rgba(239, 68, 68, 0.1)';
                        }}>
                            <div style={{
                                position: 'absolute',
                                top: '10px',
                                right: '10px',
                                width: '100px',
                                height: '100px',
                                background: 'radial-gradient(circle, rgba(239, 68, 68, 0.1) 0%, transparent 70%)',
                                borderRadius: '50%'
                            }} />
                            
                            <div style={{
                                width: '72px',
                                height: '72px',
                                background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                                borderRadius: '20px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: '2rem',
                                boxShadow: '0 12px 32px rgba(239, 68, 68, 0.3)',
                                position: 'relative'
                            }}>
                                <span style={{ fontSize: '2.2rem', color: 'white' }}>🔔</span>
                                <div style={{
                                    position: 'absolute',
                                    top: '8px',
                                    right: '8px',
                                    width: '12px',
                                    height: '12px',
                                    background: '#fbbf24',
                                    borderRadius: '50%',
                                    border: '2px solid white'
                                }} />
                                <div style={{
                                    position: 'absolute',
                                    inset: '-2px',
                                    background: 'linear-gradient(45deg, transparent, rgba(255,255,255,0.2), transparent)',
                                    borderRadius: '22px',
                                    zIndex: -1
                                }} />
                            </div>
                            
                            <h3 style={{
                                fontSize: '1.5rem',
                                fontWeight: '700',
                                color: '#374151',
                                margin: '0 0 1rem',
                                letterSpacing: '-0.025em'
                            }}>
                                Notifications
                            </h3>
                            
                            <p style={{
                                color: '#6b7280',
                                margin: '0 0 2rem',
                                lineHeight: '1.6',
                                fontSize: '1rem'
                            }}>
                                Stay updated with appointment reminders, health alerts, and important medical updates.
                            </p>
                            
                            <button style={{
                                background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                                color: 'white',
                                border: 'none',
                                padding: '1rem 2rem',
                                borderRadius: '14px',
                                cursor: 'pointer',
                                fontWeight: '600',
                                fontSize: '1rem',
                                transition: 'all 0.3s ease',
                                boxShadow: '0 6px 20px rgba(239, 68, 68, 0.25)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem'
                            }}>
                                <span>📬</span>
                                View All
                            </button>
                        </div>

                        {/* Support */}
                        <div style={{
                            background: 'rgba(255, 255, 255, 0.98)',
                            backdropFilter: 'blur(20px)',
                            borderRadius: '24px',
                            padding: '2.5rem',
                            boxShadow: '0 12px 32px rgba(59, 130, 246, 0.1)',
                            border: '1px solid rgba(59, 130, 246, 0.15)',
                            transition: 'all 0.4s ease',
                            cursor: 'pointer',
                            position: 'relative',
                            overflow: 'hidden'
                        }}
                        onClick={() => handleNavigation('/contact')}
                        onMouseEnter={e => {
                            e.currentTarget.style.transform = 'translateY(-8px)';
                            e.currentTarget.style.boxShadow = '0 20px 48px rgba(59, 130, 246, 0.2)';
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 12px 32px rgba(59, 130, 246, 0.1)';
                        }}>
                            <div style={{
                                position: 'absolute',
                                top: '10px',
                                right: '10px',
                                width: '100px',
                                height: '100px',
                                background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
                                borderRadius: '50%'
                            }} />
                            
                            <div style={{
                                width: '72px',
                                height: '72px',
                                background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                                borderRadius: '20px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: '2rem',
                                boxShadow: '0 12px 32px rgba(59, 130, 246, 0.3)',
                                position: 'relative'
                            }}>
                                <span style={{ fontSize: '2.2rem', color: 'white' }}>💬</span>
                                <div style={{
                                    position: 'absolute',
                                    inset: '-2px',
                                    background: 'linear-gradient(45deg, transparent, rgba(255,255,255,0.2), transparent)',
                                    borderRadius: '22px',
                                    zIndex: -1
                                }} />
                            </div>
                            
                            <h3 style={{
                                fontSize: '1.5rem',
                                fontWeight: '700',
                                color: '#374151',
                                margin: '0 0 1rem',
                                letterSpacing: '-0.025em'
                            }}>
                                Support Center
                            </h3>
                            
                            <p style={{
                                color: '#6b7280',
                                margin: '0 0 2rem',
                                lineHeight: '1.6',
                                fontSize: '1rem'
                            }}>
                                Get help from our dedicated support team for any questions or technical assistance.
                            </p>
                            
                            <button style={{
                                background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                                color: 'white',
                                border: 'none',
                                padding: '1rem 2rem',
                                borderRadius: '14px',
                                cursor: 'pointer',
                                fontWeight: '600',
                                fontSize: '1rem',
                                transition: 'all 0.3s ease',
                                boxShadow: '0 6px 20px rgba(59, 130, 246, 0.25)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem'
                            }}>
                                <span>🆘</span>
                                Get Help
                            </button>
                        </div>
                    </div>
                </section>

                {/* Recent Activity Section */}
                <section style={{
                    background: 'rgba(255, 255, 255, 0.98)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '24px',
                    padding: '2.5rem',
                    boxShadow: '0 12px 32px rgba(34, 197, 94, 0.1)',
                    border: '1px solid rgba(34, 197, 94, 0.15)'
                }}>
                    <h3 style={{
                        fontSize: '1.8rem',
                        fontWeight: '700',
                        color: '#374151',
                        margin: '0 0 2rem',
                        letterSpacing: '-0.025em',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem'
                    }}>
                        <span style={{
                            width: '48px',
                            height: '48px',
                            background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                            borderRadius: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontSize: '1.5rem'
                        }}>⚡</span>
                        Recent Activity
                    </h3>
                    
                    <div style={{
                        display: 'grid',
                        gap: '1rem'
                    }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem',
                            padding: '1rem',
                            background: 'rgba(34, 197, 94, 0.05)',
                            borderRadius: '12px',
                            border: '1px solid rgba(34, 197, 94, 0.1)'
                        }}>
                            <div style={{
                                width: '40px',
                                height: '40px',
                                background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                                borderRadius: '10px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white'
                            }}>✅</div>
                            <div style={{ flex: 1 }}>
                                <div style={{ color: '#374151', fontWeight: '600' }}>Appointment Scheduled</div>
                                <div style={{ color: '#6b7280', fontSize: '0.9rem' }}>Dr. Sarah Johnson - Cardiology - Dec 28, 2024</div>
                            </div>
                            <div style={{ color: '#6b7280', fontSize: '0.85rem' }}>2 hours ago</div>
                        </div>
                        
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem',
                            padding: '1rem',
                            background: 'rgba(59, 130, 246, 0.05)',
                            borderRadius: '12px',
                            border: '1px solid rgba(59, 130, 246, 0.1)'
                        }}>
                            <div style={{
                                width: '40px',
                                height: '40px',
                                background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                                borderRadius: '10px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white'
                            }}>📋</div>
                            <div style={{ flex: 1 }}>
                                <div style={{ color: '#374151', fontWeight: '600' }}>Lab Results Available</div>
                                <div style={{ color: '#6b7280', fontSize: '0.9rem' }}>Blood work and cholesterol panel results</div>
                            </div>
                            <div style={{ color: '#6b7280', fontSize: '0.85rem' }}>1 day ago</div>
                        </div>
                        
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem',
                            padding: '1rem',
                            background: 'rgba(168, 85, 247, 0.05)',
                            borderRadius: '12px',
                            border: '1px solid rgba(168, 85, 247, 0.1)'
                        }}>
                            <div style={{
                                width: '40px',
                                height: '40px',
                                background: 'linear-gradient(135deg, #a855f7 0%, #9333ea 100%)',
                                borderRadius: '10px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white'
                            }}>💊</div>
                            <div style={{ flex: 1 }}>
                                <div style={{ color: '#374151', fontWeight: '600' }}>Prescription Refilled</div>
                                <div style={{ color: '#6b7280', fontSize: '0.9rem' }}>Lisinopril 10mg - 30 day supply</div>
                            </div>
                            <div style={{ color: '#6b7280', fontSize: '0.85rem' }}>3 days ago</div>
                        </div>
                    </div>
                </section>
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