import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { getPatientDashboard } from '../../api/patients';

const PatientDashboard = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [nextAppointment, setNextAppointment] = useState(null);
    const [recentAppointments, setRecentAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            if (!user?.id) {
                console.error('User ID not available');
                return;
            }

            const dashboardData = await getPatientDashboard(user.id);
            
            setNextAppointment(dashboardData.nextAppointment || null);
            
            setRecentAppointments(dashboardData.recentAppointments || []);
            
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            setNextAppointment(null);
            setRecentAppointments([]);
        } finally {
            setLoading(false);
        }
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

    return (
        <div style={{
            position: 'relative'
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

            {/* Main Content */}
            <main style={{
                padding: '2.5rem 0',
                position: 'relative',
                zIndex: 1
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
                            background: '#10b981',
                            borderRadius: '24px',
                            margin: '0 auto 2.5rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 16px 40px rgba(16, 185, 129, 0.3)',
                            border: '3px solid #047857',
                            position: 'relative'
                        }}>
                            {/* Perfect Medical Cross */}
                            <div style={{
                                width: '60px',
                                height: '60px',
                                position: 'relative',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                {/* Vertical bar of cross - perfectly centered */}
                                <div style={{
                                    position: 'absolute',
                                    top: '10px',
                                    left: '50%',
                                    width: '10px',
                                    height: '40px',
                                    background: 'white',
                                    borderRadius: '3px',
                                    transform: 'translateX(-50%)',
                                    boxShadow: '0 3px 12px rgba(0,0,0,0.15)'
                                }} />
                                {/* Horizontal bar of cross - perfectly centered */}
                                <div style={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '10px',
                                    width: '40px',
                                    height: '10px',
                                    background: 'white',
                                    borderRadius: '3px',
                                    transform: 'translateY(-50%)',
                                    boxShadow: '0 3px 12px rgba(0,0,0,0.15)'
                                }} />
                                {/* Small medical pulse line accent */}
                                <div style={{
                                    position: 'absolute',
                                    top: '15px',
                                    left: '50%',
                                    width: '20px',
                                    height: '2px',
                                    background: 'rgba(220, 252, 231, 0.9)',
                                    transform: 'translateX(-50%)',
                                    borderRadius: '1px'
                                }} />
                                <div style={{
                                    position: 'absolute',
                                    top: '15px',
                                    left: '50%',
                                    width: '2px',
                                    height: '6px',
                                    background: 'rgba(220, 252, 231, 0.9)',
                                    transform: 'translateX(-2px)',
                                    borderRadius: '1px'
                                }} />
                                <div style={{
                                    position: 'absolute',
                                    top: '15px',
                                    left: '50%',
                                    width: '2px',
                                    height: '4px',
                                    background: 'rgba(220, 252, 231, 0.9)',
                                    transform: 'translateX(2px)',
                                    borderRadius: '1px'
                                }} />
                                <div style={{
                                    position: 'absolute',
                                    top: '15px',
                                    left: '50%',
                                    width: '2px',
                                    height: '8px',
                                    background: 'rgba(220, 252, 231, 0.9)',
                                    transform: 'translateX(6px)',
                                    borderRadius: '1px'
                                }} />
                            </div>
                        </div>
                        
                        <h1 style={{
                            fontSize: '2.8rem',
                            fontWeight: '800',
                            color: '#374151',
                            margin: '0 0 1rem',
                            letterSpacing: '-0.03em',
                            lineHeight: '1.1'
                        }}>
                            Welcome to Your Dashboard,
                            <br />
                            <span style={{
                                background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text'
                            }}>
                                {user?.fullName?.split(' ')[0] || user?.email?.split('@')[0] || 'Patient'}!
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
                            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                            gap: '1.5rem',
                            maxWidth: '900px',
                            margin: '0 auto'
                        }}>
                            <div style={{
                                background: 'rgba(34, 197, 94, 0.1)',
                                padding: '1.5rem',
                                borderRadius: '16px',
                                border: '1px solid rgba(34, 197, 94, 0.2)'
                            }}>
                                <div style={{ color: '#22c55e', fontSize: '2rem', marginBottom: '0.5rem' }}>📅</div>
                                <div style={{ color: '#374151', fontWeight: '700', fontSize: '1.5rem' }}>
                                    {nextAppointment ? new Date(nextAppointment.appointmentTime).toLocaleDateString() : 'None scheduled'}
                                </div>
                                <div style={{ color: '#6b7280', fontSize: '0.9rem' }}>Next Appointment</div>
                            </div>
                            <div style={{
                                background: 'rgba(5, 150, 105, 0.1)',
                                padding: '1.5rem',
                                borderRadius: '16px',
                                border: '1px solid rgba(5, 150, 105, 0.2)'
                            }}>
                                <div style={{ color: '#059669', fontSize: '2rem', marginBottom: '0.5rem' }}>✅</div>
                                <div style={{ color: '#374151', fontWeight: '700', fontSize: '1.5rem' }}>
                                    {recentAppointments.filter(apt => apt.status === 'COMPLETED').length}
                                </div>
                                <div style={{ color: '#6b7280', fontSize: '0.9rem' }}>Completed Appointments</div>
                            </div>
                            <div style={{
                                background: 'rgba(239, 68, 68, 0.1)',
                                padding: '1.5rem',
                                borderRadius: '16px',
                                border: '1px solid rgba(239, 68, 68, 0.2)'
                            }}>
                                <div style={{ color: '#ef4444', fontSize: '2rem', marginBottom: '0.5rem' }}>🔔</div>
                                <div style={{ color: '#374151', fontWeight: '700', fontSize: '1.5rem' }}>0</div>
                                <div style={{ color: '#6b7280', fontSize: '0.9rem' }}>New Notifications</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Next Appointment Card */}
                {nextAppointment && (
                    <section style={{
                        background: 'rgba(255, 255, 255, 0.98)',
                        backdropFilter: 'blur(20px)',
                        borderRadius: '24px',
                        padding: '2.5rem',
                        marginBottom: '3rem',
                        boxShadow: '0 20px 40px rgba(34, 197, 94, 0.12), 0 8px 32px rgba(0, 0, 0, 0.06)',
                        border: '1px solid rgba(34, 197, 94, 0.15)',
                        position: 'relative',
                        overflow: 'hidden'
                    }}>
                        <div style={{
                            position: 'absolute',
                            top: '10px',
                            right: '10px',
                            width: '150px',
                            height: '150px',
                            background: 'radial-gradient(circle, rgba(34, 197, 94, 0.1) 0%, transparent 70%)',
                            borderRadius: '50%'
                        }} />
                        
                        <h2 style={{
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
                            }}>📅</span>
                            Upcoming Appointment
                        </h2>
                        
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'flex-start',
                            flexWrap: 'wrap',
                            gap: '2rem'
                        }}>
                            <div style={{ flex: 1, minWidth: '300px' }}>
                                <h3 style={{
                                    fontSize: '1.5rem',
                                    fontWeight: '600',
                                    color: '#374151',
                                    margin: '0 0 0.5rem'
                                }}>
                                    {nextAppointment.doctorName}
                                </h3>
                                <p style={{
                                    color: '#6b7280',
                                    fontSize: '1.1rem',
                                    margin: '0 0 0.5rem',
                                    fontWeight: '500'
                                }}>
                                    {nextAppointment.specialization}
                                </p>
                                <p style={{
                                    color: '#6b7280',
                                    fontSize: '1rem',
                                    margin: '0 0 1rem'
                                }}>
                                    {new Date(nextAppointment.appointmentTime).toLocaleDateString()} at{' '}
                                    {new Date(nextAppointment.appointmentTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </p>
                                <span style={{
                                    display: 'inline-block',
                                    padding: '0.5rem 1rem',
                                    fontSize: '0.85rem',
                                    fontWeight: '600',
                                    borderRadius: '8px',
                                    background: nextAppointment.status === 'CONFIRMED' 
                                        ? 'rgba(34, 197, 94, 0.1)' 
                                        : 'rgba(251, 191, 36, 0.1)',
                                    color: nextAppointment.status === 'CONFIRMED' 
                                        ? '#16a34a' 
                                        : '#d97706',
                                    border: `1px solid ${nextAppointment.status === 'CONFIRMED' 
                                        ? 'rgba(34, 197, 94, 0.2)' 
                                        : 'rgba(251, 191, 36, 0.2)'}`
                                }}>
                                    {nextAppointment.status}
                                </span>
                            </div>
                            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                                <button style={{
                                    padding: '1rem 2rem',
                                    background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '12px',
                                    cursor: 'pointer',
                                    fontWeight: '600',
                                    fontSize: '0.95rem',
                                    transition: 'all 0.3s ease',
                                    boxShadow: '0 4px 12px rgba(34, 197, 94, 0.2)'
                                }}>
                                    View Details
                                </button>
                                <button style={{
                                    padding: '1rem 2rem',
                                    background: 'rgba(107, 114, 128, 0.1)',
                                    color: '#374151',
                                    border: '1px solid rgba(107, 114, 128, 0.2)',
                                    borderRadius: '12px',
                                    cursor: 'pointer',
                                    fontWeight: '600',
                                    fontSize: '0.95rem',
                                    transition: 'all 0.3s ease'
                                }}>
                                    Reschedule
                                </button>
                            </div>
                        </div>
                    </section>
                )}

                {/* Quick Actions Grid */}
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

                        {/* View Doctors */}
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
                        onClick={() => handleNavigation('/patient/doctors')}
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
                                <span style={{ fontSize: '2.2rem', color: 'white' }}>👨‍⚕️</span>
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
                                <span>🔍</span>
                                Browse Doctors
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
                    </div>
                </section>

                {/* Recent Appointments Section */}
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
                        }}>📋</span>
                        Recent Appointments
                    </h3>
                    
                    <div style={{
                        display: 'grid',
                        gap: '1rem'
                    }}>
                        {recentAppointments.length > 0 ? (
                            recentAppointments.map((appointment) => (
                                <div key={appointment.id} style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '1rem',
                                    padding: '1.5rem',
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
                                        <div style={{ 
                                            color: '#374151', 
                                            fontWeight: '600', 
                                            fontSize: '1.1rem',
                                            marginBottom: '0.25rem'
                                        }}>
                                            {appointment.doctorName}
                                        </div>
                                        <div style={{ 
                                            color: '#6b7280', 
                                            fontSize: '0.9rem',
                                            marginBottom: '0.25rem'
                                        }}>
                                            {appointment.specialization}
                                        </div>
                                        <div style={{ color: '#6b7280', fontSize: '0.85rem' }}>
                                            {new Date(appointment.appointmentTime).toLocaleDateString()}
                                        </div>
                                    </div>
                                    <div>
                                        <span style={{
                                            padding: '0.5rem 1rem',
                                            fontSize: '0.8rem',
                                            fontWeight: '600',
                                            borderRadius: '8px',
                                            background: appointment.status === 'COMPLETED' 
                                                ? 'rgba(34, 197, 94, 0.1)' 
                                                : 'rgba(107, 114, 128, 0.1)',
                                            color: appointment.status === 'COMPLETED' 
                                                ? '#16a34a' 
                                                : '#374151',
                                            border: `1px solid ${appointment.status === 'COMPLETED' 
                                                ? 'rgba(34, 197, 94, 0.2)' 
                                                : 'rgba(107, 114, 128, 0.2)'}`
                                        }}>
                                            {appointment.status}
                                        </span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div style={{
                                padding: '3rem',
                                textAlign: 'center',
                                color: '#6b7280',
                                fontSize: '1.1rem'
                            }}>
                                No recent appointments
                            </div>
                        )}
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
};

export default PatientDashboard;
