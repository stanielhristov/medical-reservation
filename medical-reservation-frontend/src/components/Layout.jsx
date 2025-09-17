import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getRoleRoutes } from '../utils/roleBasedNavigation';
import { getUnreadNotificationCount } from '../api/notifications';

const Layout = ({ children }) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
    const [unreadNotificationCount, setUnreadNotificationCount] = useState(0);

    const handleLogout = () => {
        setShowLogoutConfirm(true);
    };

    const confirmLogout = () => {
        logout();
        navigate('/');
        setShowLogoutConfirm(false);
    };

    const cancelLogout = () => {
        setShowLogoutConfirm(false);
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

    // Fetch unread notification count
    useEffect(() => {
        const fetchUnreadCount = async () => {
            if (user?.id) {
                try {
                    const count = await getUnreadNotificationCount(user.id);
                    setUnreadNotificationCount(count);
                } catch (error) {
                    console.error('Error fetching unread notification count:', error);
                    setUnreadNotificationCount(0);
                }
            }
        };

        fetchUnreadCount();
        
        const interval = setInterval(fetchUnreadCount, 30000);
        
        return () => clearInterval(interval);
    }, [user?.id]);

    useEffect(() => {
        const handleNotificationUpdate = () => {
            if (user?.id) {
                getUnreadNotificationCount(user.id)
                    .then(count => setUnreadNotificationCount(count))
                    .catch(error => console.error('Error refreshing notification count:', error));
            }
        };

        window.addEventListener('refreshNotificationCount', handleNotificationUpdate);
        
        return () => {
            window.removeEventListener('refreshNotificationCount', handleNotificationUpdate);
        };
    }, [user?.id]);

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
                                                        {/* Red notification badge */}
                                                        {route.name === 'Notifications' && unreadNotificationCount > 0 && (
                                                            <div style={{
                                                                position: 'absolute',
                                                                top: '-3px',
                                                                right: '-3px',
                                                                minWidth: unreadNotificationCount > 99 ? '18px' : '14px',
                                                                height: '14px',
                                                                background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                                                                borderRadius: '7px',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                fontSize: '9px',
                                                                fontWeight: '700',
                                                                color: 'white',
                                                                border: '1px solid white',
                                                                boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                                                                zIndex: 10
                                                            }}>
                                                                {unreadNotificationCount > 99 ? '99+' : unreadNotificationCount}
                                                            </div>
                                                        )}
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

            {/* Logout Confirmation Popup */}
            {showLogoutConfirm && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 1000
                }}>
                    <div style={{
                        background: 'white',
                        borderRadius: '16px',
                        padding: '2rem',
                        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
                        maxWidth: '400px',
                        width: '90%',
                        textAlign: 'center'
                    }}>
                        <div style={{
                            width: '60px',
                            height: '60px',
                            background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 1rem',
                            boxShadow: '0 8px 24px rgba(34, 197, 94, 0.3)'
                        }}>
                            <div style={{
                                width: '24px',
                                height: '24px',
                                position: 'relative'
                            }}>
                                {/* Logout icon in white */}
                                <div style={{
                                    position: 'absolute',
                                    top: '4px',
                                    left: '2px',
                                    width: '12px',
                                    height: '16px',
                                    border: '3px solid white',
                                    borderRight: 'none',
                                    borderRadius: '6px 0 0 6px'
                                }} />
                                <div style={{
                                    position: 'absolute',
                                    top: '10px',
                                    left: '12px',
                                    width: '6px',
                                    height: '3px',
                                    background: 'white',
                                    borderRadius: '2px'
                                }} />
                                <div style={{
                                    position: 'absolute',
                                    top: '8px',
                                    left: '16px',
                                    width: '3px',
                                    height: '3px',
                                    borderTop: '3px solid white',
                                    borderRight: '3px solid white',
                                    transform: 'rotate(-45deg)'
                                }} />
                            </div>
                        </div>
                        
                        <h3 style={{
                            fontSize: '1.5rem',
                            fontWeight: '600',
                            color: '#374151',
                            margin: '0 0 1rem'
                        }}>
                            Confirm Logout
                        </h3>
                        
                        <p style={{
                            color: '#6b7280',
                            margin: '0 0 2rem',
                            lineHeight: '1.6'
                        }}>
                            Are you sure you want to logout from your profile?
                        </p>
                        
                        <div style={{
                            display: 'flex',
                            gap: '1rem',
                            justifyContent: 'center'
                        }}>
                            <button
                                onClick={cancelLogout}
                                style={{
                                    padding: '0.75rem 1.5rem',
                                    background: 'rgba(107, 114, 128, 0.1)',
                                    color: '#6b7280',
                                    border: '1px solid rgba(107, 114, 128, 0.2)',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    fontWeight: '500',
                                    transition: 'all 0.3s ease'
                                }}
                                onMouseEnter={e => {
                                    e.target.style.background = 'rgba(107, 114, 128, 0.15)';
                                }}
                                onMouseLeave={e => {
                                    e.target.style.background = 'rgba(107, 114, 128, 0.1)';
                                }}
                            >
                                Cancel
                            </button>
                            
                            <button
                                onClick={confirmLogout}
                                style={{
                                    padding: '0.75rem 1.5rem',
                                    background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    fontWeight: '500',
                                    transition: 'all 0.3s ease',
                                    boxShadow: '0 4px 12px rgba(220, 38, 38, 0.25)'
                                }}
                                onMouseEnter={e => {
                                    e.target.style.transform = 'translateY(-1px)';
                                    e.target.style.boxShadow = '0 6px 16px rgba(220, 38, 38, 0.3)';
                                }}
                                onMouseLeave={e => {
                                    e.target.style.transform = 'translateY(0)';
                                    e.target.style.boxShadow = '0 4px 12px rgba(220, 38, 38, 0.25)';
                                }}
                            >
                                Yes, Logout
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Layout;
