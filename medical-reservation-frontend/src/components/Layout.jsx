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

            {/* Minimalistic Navigation Header */}
            <nav style={{
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(12px)',
                boxShadow: '0 2px 20px rgba(34, 197, 94, 0.08)',
                borderBottom: '1px solid rgba(34, 197, 94, 0.1)',
                position: 'relative',
                zIndex: 1
            }}>
                <div style={{
                    maxWidth: '1400px',
                    margin: '0 auto',
                    padding: '0 1.5rem'
                }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        height: '60px'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            {/* Medical Cross Logo */}
                            <button
                                onClick={handleHomeNavigation}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.75rem',
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    padding: '0.25rem',
                                    borderRadius: '8px',
                                    transition: 'all 0.3s ease'
                                }}
                                onMouseEnter={e => {
                                    e.target.closest('button').style.background = 'rgba(34, 197, 94, 0.05)';
                                }}
                                onMouseLeave={e => {
                                    e.target.closest('button').style.background = 'none';
                                }}
                            >
                                {/* Medical Cross Icon */}
                                <div style={{
                                    width: '36px',
                                    height: '36px',
                                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                                    borderRadius: '8px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    boxShadow: '0 4px 12px rgba(16, 185, 129, 0.25)',
                                    position: 'relative',
                                    border: '1px solid #047857'
                                }}>
                                    {/* Medical Cross */}
                                    <div style={{
                                        position: 'relative',
                                        width: '20px',
                                        height: '20px'
                                    }}>
                                        <div style={{
                                            position: 'absolute',
                                            top: '2px',
                                            left: '8px',
                                            width: '4px',
                                            height: '16px',
                                            background: 'white',
                                            borderRadius: '1px'
                                        }} />
                                        <div style={{
                                            position: 'absolute',
                                            top: '8px',
                                            left: '2px',
                                            width: '16px',
                                            height: '4px',
                                            background: 'white',
                                            borderRadius: '1px'
                                        }} />
                                    </div>
                                </div>
                                <div>
                                    <h1 style={{
                                        fontSize: '1.1rem',
                                        fontWeight: '600',
                                        color: '#374151',
                                        margin: 0,
                                        letterSpacing: '-0.015em'
                                    }}>
                                        Medical Reservation
                                    </h1>
                                </div>
                            </button>
                            
                            {/* Navigation Links */}
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.25rem',
                                marginLeft: '2rem'
                            }}>
                                {navigationRoutes.map((route) => {
                                    const getIcon = (routeName) => {
                                        const iconStyle = {
                                            width: '16px',
                                            height: '16px',
                                            background: '#6b7280',
                                            borderRadius: '2px'
                                        };
                                        
                                        switch(routeName) {
                                            case 'Dashboard':
                                                return (
                                                    <div style={{...iconStyle, background: 'none', border: '2px solid #6b7280', borderRadius: '4px', position: 'relative'}}>
                                                        <div style={{position: 'absolute', top: '2px', left: '2px', width: '8px', height: '6px', background: '#6b7280'}} />
                                                    </div>
                                                );
                                            case 'Appointments':
                                                return (
                                                    <div style={{...iconStyle, background: 'none', border: '2px solid #6b7280', position: 'relative'}}>
                                                        <div style={{position: 'absolute', top: '2px', left: '2px', width: '10px', height: '2px', background: '#6b7280'}} />
                                                        <div style={{position: 'absolute', top: '6px', left: '2px', width: '10px', height: '2px', background: '#6b7280'}} />
                                                    </div>
                                                );
                                            case 'Doctors':
                                                return (
                                                    <div style={{...iconStyle, background: '#6b7280', borderRadius: '50%', position: 'relative'}}>
                                                        <div style={{position: 'absolute', top: '10px', left: '4px', width: '8px', height: '2px', background: 'white'}} />
                                                        <div style={{position: 'absolute', top: '6px', left: '6px', width: '4px', height: '2px', background: 'white'}} />
                                                    </div>
                                                );
                                            case 'Patients':
                                                return (
                                                    <div style={{...iconStyle, background: 'none', position: 'relative'}}>
                                                        <div style={{position: 'absolute', top: '2px', left: '2px', width: '4px', height: '4px', background: '#6b7280', borderRadius: '50%'}} />
                                                        <div style={{position: 'absolute', top: '2px', left: '8px', width: '4px', height: '4px', background: '#6b7280', borderRadius: '50%'}} />
                                                        <div style={{position: 'absolute', top: '8px', left: '1px', width: '6px', height: '4px', background: '#6b7280', borderRadius: '2px'}} />
                                                        <div style={{position: 'absolute', top: '8px', left: '7px', width: '6px', height: '4px', background: '#6b7280', borderRadius: '2px'}} />
                                                    </div>
                                                );
                                            case 'Schedule':
                                                return (
                                                    <div style={{...iconStyle, background: 'none', border: '2px solid #6b7280', position: 'relative'}}>
                                                        <div style={{position: 'absolute', top: '4px', left: '2px', width: '10px', height: '1px', background: '#6b7280'}} />
                                                        <div style={{position: 'absolute', top: '7px', left: '2px', width: '10px', height: '1px', background: '#6b7280'}} />
                                                        <div style={{position: 'absolute', top: '10px', left: '2px', width: '4px', height: '1px', background: '#6b7280'}} />
                                                    </div>
                                                );
                                            case 'Medical History':
                                                return (
                                                    <div style={{...iconStyle, background: 'none', border: '2px solid #6b7280', borderRadius: '2px', position: 'relative'}}>
                                                        <div style={{position: 'absolute', top: '2px', left: '2px', width: '8px', height: '1px', background: '#6b7280'}} />
                                                        <div style={{position: 'absolute', top: '5px', left: '2px', width: '8px', height: '1px', background: '#6b7280'}} />
                                                        <div style={{position: 'absolute', top: '8px', left: '2px', width: '5px', height: '1px', background: '#6b7280'}} />
                                                    </div>
                                                );
                                            case 'Notifications':
                                                return (
                                                    <div style={{...iconStyle, background: '#6b7280', borderRadius: '8px 8px 2px 2px', position: 'relative'}}>
                                                        <div style={{position: 'absolute', top: '8px', left: '6px', width: '4px', height: '4px', background: '#6b7280', borderRadius: '50%'}} />
                                                    </div>
                                                );
                                            case 'Users':
                                                return (
                                                    <div style={{...iconStyle, background: 'none', position: 'relative'}}>
                                                        <div style={{position: 'absolute', top: '2px', left: '4px', width: '8px', height: '6px', background: '#6b7280', borderRadius: '4px 4px 0 0'}} />
                                                        <div style={{position: 'absolute', top: '8px', left: '2px', width: '12px', height: '6px', background: '#6b7280', borderRadius: '0 0 4px 4px'}} />
                                                    </div>
                                                );
                                            default:
                                                return <div style={{...iconStyle}} />;
                                        }
                                    };
                                    
                                    return (
                                        <Link
                                            key={route.path}
                                            to={route.path}
                                            style={{
                                                color: '#4b5563',
                                                fontWeight: '500',
                                                fontSize: '0.9rem',
                                                padding: '0.5rem 1rem',
                                                borderRadius: '8px',
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
                                                // Change icon color on hover
                                                const iconElements = e.target.querySelectorAll('div');
                                                iconElements.forEach(el => {
                                                    if (el.style.background && el.style.background.includes('#6b7280')) {
                                                        el.style.background = el.style.background.replace('#6b7280', '#22c55e');
                                                    }
                                                    if (el.style.border && el.style.border.includes('#6b7280')) {
                                                        el.style.border = el.style.border.replace('#6b7280', '#22c55e');
                                                    }
                                                });
                                            }}
                                            onMouseLeave={e => {
                                                e.target.style.background = 'transparent';
                                                e.target.style.color = '#4b5563';
                                                // Reset icon color
                                                const iconElements = e.target.querySelectorAll('div');
                                                iconElements.forEach(el => {
                                                    if (el.style.background && el.style.background.includes('#22c55e')) {
                                                        el.style.background = el.style.background.replace('#22c55e', '#6b7280');
                                                    }
                                                    if (el.style.border && el.style.border.includes('#22c55e')) {
                                                        el.style.border = el.style.border.replace('#22c55e', '#6b7280');
                                                    }
                                                });
                                            }}
                                        >
                                            {getIcon(route.name)}
                                            {route.name}
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                        
                        {/* User Info and Actions */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            {user && (
                                <>
                                    {/* User Profile Card */}
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        background: 'rgba(34, 197, 94, 0.05)',
                                        padding: '0.5rem 0.75rem',
                                        borderRadius: '8px',
                                        border: '1px solid rgba(34, 197, 94, 0.15)'
                                    }}>
                                        <div style={{
                                            width: '24px',
                                            height: '24px',
                                            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                                            borderRadius: '6px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            position: 'relative'
                                        }}>
                                            {/* User Icon */}
                                            <div style={{
                                                width: '12px',
                                                height: '12px',
                                                background: 'none',
                                                position: 'relative'
                                            }}>
                                                {user.role === 'ADMIN' ? (
                                                    // Crown icon
                                                    <div style={{
                                                        position: 'absolute',
                                                        top: '2px',
                                                        left: '2px',
                                                        width: '8px',
                                                        height: '6px',
                                                        background: 'white',
                                                        borderRadius: '2px 2px 0 0'
                                                    }}>
                                                        <div style={{
                                                            position: 'absolute',
                                                            top: '-2px',
                                                            left: '2px',
                                                            width: '4px',
                                                            height: '2px',
                                                            background: 'white',
                                                            borderRadius: '2px'
                                                        }} />
                                                    </div>
                                                ) : user.role === 'DOCTOR' ? (
                                                    // Medical cross icon
                                                    <>
                                                        <div style={{
                                                            position: 'absolute',
                                                            top: '2px',
                                                            left: '5px',
                                                            width: '2px',
                                                            height: '8px',
                                                            background: 'white',
                                                            borderRadius: '0.5px'
                                                        }} />
                                                        <div style={{
                                                            position: 'absolute',
                                                            top: '5px',
                                                            left: '2px',
                                                            width: '8px',
                                                            height: '2px',
                                                            background: 'white',
                                                            borderRadius: '0.5px'
                                                        }} />
                                                    </>
                                                ) : (
                                                    // User icon
                                                    <>
                                                        <div style={{
                                                            position: 'absolute',
                                                            top: '2px',
                                                            left: '4px',
                                                            width: '4px',
                                                            height: '3px',
                                                            background: 'white',
                                                            borderRadius: '2px 2px 0 0'
                                                        }} />
                                                        <div style={{
                                                            position: 'absolute',
                                                            top: '6px',
                                                            left: '2px',
                                                            width: '8px',
                                                            height: '4px',
                                                            background: 'white',
                                                            borderRadius: '0 0 2px 2px'
                                                        }} />
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                        <div>
                                            <div style={{ 
                                                color: '#374151', 
                                                fontSize: '0.85rem',
                                                fontWeight: '500',
                                                margin: 0,
                                                lineHeight: '1.2'
                                            }}>
                                                {user.fullName || user.email || 'User'}
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Edit Profile Button */}
                                    <button 
                                        onClick={() => navigate('/profile/edit')}
                                        style={{
                                            padding: '0.5rem',
                                            background: 'rgba(34, 197, 94, 0.1)',
                                            color: '#16a34a',
                                            border: '1px solid rgba(34, 197, 94, 0.2)',
                                            borderRadius: '6px',
                                            cursor: 'pointer',
                                            fontSize: '0.8rem',
                                            transition: 'all 0.3s ease',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            width: '32px',
                                            height: '32px'
                                        }}
                                        title="Edit Profile"
                                        onMouseEnter={e => {
                                            e.target.style.background = 'rgba(34, 197, 94, 0.15)';
                                        }}
                                        onMouseLeave={e => {
                                            e.target.style.background = 'rgba(34, 197, 94, 0.1)';
                                        }}
                                    >
                                        {/* User Profile Settings icon */}
                                        <div style={{
                                            width: '14px',
                                            height: '14px',
                                            position: 'relative'
                                        }}>
                                            {/* User head */}
                                            <div style={{
                                                position: 'absolute',
                                                top: '1px',
                                                left: '4px',
                                                width: '6px',
                                                height: '4px',
                                                background: '#16a34a',
                                                borderRadius: '3px 3px 0 0'
                                            }} />
                                            {/* User body */}
                                            <div style={{
                                                position: 'absolute',
                                                top: '6px',
                                                left: '2px',
                                                width: '10px',
                                                height: '6px',
                                                background: '#16a34a',
                                                borderRadius: '0 0 5px 5px'
                                            }} />
                                            {/* Settings gear overlay */}
                                            <div style={{
                                                position: 'absolute',
                                                top: '9px',
                                                left: '9px',
                                                width: '4px',
                                                height: '4px',
                                                border: '1px solid #16a34a',
                                                borderRadius: '50%',
                                                background: 'white'
                                            }} />
                                            <div style={{
                                                position: 'absolute',
                                                top: '10px',
                                                left: '10px',
                                                width: '2px',
                                                height: '2px',
                                                background: '#16a34a',
                                                borderRadius: '50%'
                                            }} />
                                        </div>
                                    </button>
                                    
                                    {/* Logout Button */}
                                    <button 
                                        onClick={handleLogout}
                                        style={{
                                            padding: '0.5rem',
                                            background: 'rgba(239, 68, 68, 0.1)',
                                            color: '#dc2626',
                                            border: '1px solid rgba(239, 68, 68, 0.2)',
                                            borderRadius: '6px',
                                            cursor: 'pointer',
                                            fontSize: '0.8rem',
                                            transition: 'all 0.3s ease',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            width: '32px',
                                            height: '32px'
                                        }}
                                        title="Logout"
                                        onMouseEnter={e => {
                                            e.target.style.background = 'rgba(239, 68, 68, 0.15)';
                                        }}
                                        onMouseLeave={e => {
                                            e.target.style.background = 'rgba(239, 68, 68, 0.1)';
                                        }}
                                    >
                                        {/* Logout icon */}
                                        <div style={{
                                            width: '14px',
                                            height: '14px',
                                            position: 'relative'
                                        }}>
                                            <div style={{
                                                position: 'absolute',
                                                top: '2px',
                                                left: '1px',
                                                width: '8px',
                                                height: '10px',
                                                border: '2px solid #dc2626',
                                                borderRight: 'none',
                                                borderRadius: '4px 0 0 4px'
                                            }} />
                                            <div style={{
                                                position: 'absolute',
                                                top: '6px',
                                                left: '7px',
                                                width: '4px',
                                                height: '2px',
                                                background: '#dc2626',
                                                borderRadius: '1px'
                                            }} />
                                            <div style={{
                                                position: 'absolute',
                                                top: '5px',
                                                left: '10px',
                                                width: '2px',
                                                height: '2px',
                                                borderTop: '2px solid #dc2626',
                                                borderRight: '2px solid #dc2626',
                                                transform: 'rotate(45deg)'
                                            }} />
                                        </div>
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
