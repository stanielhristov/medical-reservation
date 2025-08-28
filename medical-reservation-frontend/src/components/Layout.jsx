import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getRoleRoutes } from '../utils/roleBasedNavigation';

const Layout = ({ children }) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const handleHomeNavigation = () => {
        // Navigate to appropriate dashboard based on user role
        if (user?.role === 'ADMIN') {
            navigate('/admin/dashboard');
        } else if (user?.role === 'DOCTOR') {
            navigate('/doctor/dashboard');
        } else {
            navigate('/patient/dashboard');
        }
    };

    const navigationRoutes = user ? getRoleRoutes(user.role) : [];

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 30%, #bbf7d0 70%, #a7f3d0 100%)',
            position: 'relative'
        }}>
            {/* Background decorations */}
            <div style={{
                position: 'absolute',
                top: '5%',
                right: '8%',
                width: '200px',
                height: '200px',
                background: 'radial-gradient(circle, rgba(34, 197, 94, 0.08) 0%, transparent 70%)',
                borderRadius: '50%',
                zIndex: 0
            }} />
            
            <div style={{
                position: 'absolute',
                bottom: '15%',
                left: '5%',
                width: '150px',
                height: '150px',
                background: 'radial-gradient(circle, rgba(22, 163, 74, 0.06) 0%, transparent 70%)',
                borderRadius: '50%',
                zIndex: 0
            }} />

            {/* Enhanced Navigation Header */}
            <nav style={{
                background: 'rgba(255, 255, 255, 0.98)',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 8px 32px rgba(34, 197, 94, 0.12), 0 4px 16px rgba(0, 0, 0, 0.04)',
                borderBottom: '1px solid rgba(34, 197, 94, 0.15)',
                position: 'relative',
                zIndex: 1
            }}>
                <div style={{
                    maxWidth: '1400px',
                    margin: '0 auto',
                    padding: '0 2rem'
                }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        height: '80px'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            {/* Healthcare Portal Brand */}
                            <button
                                onClick={handleHomeNavigation}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '1rem',
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    padding: '0.5rem',
                                    borderRadius: '12px',
                                    transition: 'all 0.3s ease'
                                }}
                                onMouseEnter={e => {
                                    e.target.closest('button').style.background = 'rgba(34, 197, 94, 0.05)';
                                }}
                                onMouseLeave={e => {
                                    e.target.closest('button').style.background = 'none';
                                }}
                            >
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
                                        fontSize: '1.4rem',
                                        fontWeight: '700',
                                        color: '#374151',
                                        margin: '0 0 0.25rem',
                                        letterSpacing: '-0.025em'
                                    }}>
                                        Healthcare Portal
                                    </h1>
                                    <p style={{
                                        fontSize: '0.8rem',
                                        color: '#6b7280',
                                        margin: 0,
                                        fontWeight: '500',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.05em'
                                    }}>
                                        {user?.role === 'ADMIN' ? 'ADMINISTRATIVE PANEL' : 
                                         user?.role === 'DOCTOR' ? 'MEDICAL WORKSPACE' : 
                                         'PATIENT DASHBOARD'}
                                    </p>
                                </div>
                            </button>
                            
                            {/* Navigation Links */}
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                marginLeft: '3rem'
                            }}>
                                {navigationRoutes.map((route) => (
                                    <Link
                                        key={route.path}
                                        to={route.path}
                                        style={{
                                            color: '#4b5563',
                                            fontWeight: '500',
                                            fontSize: '0.95rem',
                                            padding: '0.75rem 1.25rem',
                                            borderRadius: '12px',
                                            textDecoration: 'none',
                                            transition: 'all 0.3s ease',
                                            position: 'relative',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.5rem'
                                        }}
                                        onMouseEnter={e => {
                                            e.target.style.background = 'rgba(34, 197, 94, 0.1)';
                                            e.target.style.color = '#22c55e';
                                            e.target.style.transform = 'translateY(-1px)';
                                        }}
                                        onMouseLeave={e => {
                                            e.target.style.background = 'transparent';
                                            e.target.style.color = '#4b5563';
                                            e.target.style.transform = 'translateY(0)';
                                        }}
                                    >
                                        <span style={{ fontSize: '1.1rem' }}>
                                            {route.name === 'Dashboard' ? '🏠' :
                                             route.name === 'Appointments' ? '📅' :
                                             route.name === 'Doctors' ? '👨‍⚕️' :
                                             route.name === 'Patients' ? '👥' :
                                             route.name === 'Schedule' ? '🗓️' :
                                             route.name === 'Medical History' ? '📋' :
                                             route.name === 'Notifications' ? '🔔' :
                                             route.name === 'Users' ? '👤' : '📊'}
                                        </span>
                                        {route.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                        
                        {/* User Info and Actions */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                            {user && (
                                <>
                                    {/* User Profile Card */}
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '1rem',
                                        background: 'rgba(34, 197, 94, 0.08)',
                                        padding: '0.75rem 1.25rem',
                                        borderRadius: '16px',
                                        border: '1px solid rgba(34, 197, 94, 0.2)',
                                        backdropFilter: 'blur(10px)'
                                    }}>
                                        <div style={{
                                            width: '40px',
                                            height: '40px',
                                            background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                                            borderRadius: '12px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            boxShadow: '0 4px 12px rgba(34, 197, 94, 0.3)',
                                            position: 'relative'
                                        }}>
                                            <span style={{ fontSize: '1.3rem', color: 'white' }}>
                                                {user.role === 'ADMIN' ? '👑' :
                                                 user.role === 'DOCTOR' ? '👨‍⚕️' : '👤'}
                                            </span>
                                        </div>
                                        <div>
                                            <div style={{ 
                                                color: '#374151', 
                                                fontSize: '0.95rem',
                                                fontWeight: '600',
                                                margin: 0
                                            }}>
                                                {user.fullName || user.email || 'User'}
                                            </div>
                                            <div style={{ 
                                                color: '#22c55e', 
                                                fontSize: '0.8rem',
                                                fontWeight: '500',
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.05em',
                                                margin: 0
                                            }}>
                                                {user.role}
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Enhanced Logout Button */}
                                    <button 
                                        onClick={handleLogout}
                                        style={{
                                            padding: '0.875rem 1.5rem',
                                            background: 'rgba(248, 113, 113, 0.1)',
                                            color: '#dc2626',
                                            border: '1px solid rgba(248, 113, 113, 0.3)',
                                            borderRadius: '14px',
                                            cursor: 'pointer',
                                            fontWeight: '600',
                                            fontSize: '0.9rem',
                                            transition: 'all 0.3s ease',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.5rem',
                                            backdropFilter: 'blur(10px)'
                                        }}
                                        onMouseEnter={e => {
                                            e.target.style.background = 'rgba(248, 113, 113, 0.2)';
                                            e.target.style.transform = 'translateY(-2px)';
                                            e.target.style.boxShadow = '0 6px 20px rgba(248, 113, 113, 0.2)';
                                        }}
                                        onMouseLeave={e => {
                                            e.target.style.background = 'rgba(248, 113, 113, 0.1)';
                                            e.target.style.transform = 'translateY(0)';
                                            e.target.style.boxShadow = 'none';
                                        }}
                                    >
                                        <span style={{ fontSize: '1.1rem' }}>🚪</span>
                                        Logout
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Enhanced Main Content */}
            <main style={{
                maxWidth: '1400px',
                margin: '0 auto',
                padding: '2rem',
                position: 'relative',
                zIndex: 1,
                minHeight: 'calc(100vh - 80px)'
            }}>
                <div style={{
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '24px',
                    padding: '2rem',
                    boxShadow: '0 20px 40px rgba(34, 197, 94, 0.08), 0 8px 32px rgba(0, 0, 0, 0.04)',
                    border: '1px solid rgba(34, 197, 94, 0.12)',
                    minHeight: 'calc(100vh - 160px)'
                }}>
                    {children}
                </div>
            </main>
        </div>
    );
};

export default Layout;
