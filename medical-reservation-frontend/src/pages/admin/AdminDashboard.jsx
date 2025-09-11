import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminAPI } from '../../api/admin';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [statistics, setStatistics] = useState({
        totalUsers: 0,
        totalPatients: 0,
        totalDoctors: 0,
        totalAppointments: 0
    });
    const [recentUsers, setRecentUsers] = useState([]);
    const [pendingDoctorRequests, setPendingDoctorRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadDashboardData();
    }, []);

    const loadDashboardData = async () => {
        try {
            setLoading(true);
            
            // Load statistics
            const statsResponse = await adminAPI.getStatistics();
            setStatistics(statsResponse.data);

            // Load recent users (first 5)
            const usersResponse = await adminAPI.getAllUsers();
            const sortedUsers = usersResponse.data
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .slice(0, 5);
            setRecentUsers(sortedUsers);

            // Load pending doctor requests
            const doctorRequestsResponse = await adminAPI.getPendingDoctorRequests();
            setPendingDoctorRequests(doctorRequestsResponse.data);

        } catch (err) {
            console.error('Error loading dashboard data:', err);
            setError('Failed to load dashboard data');
        } finally {
            setLoading(false);
        }
    };

    const handleNavigation = (path) => {
        navigate(path);
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
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
                    <p style={{ color: '#6b7280', margin: 0, fontSize: '1rem', fontWeight: '500' }}>Loading admin dashboard...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div style={{
                background: 'rgba(254, 242, 242, 0.95)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(248, 113, 113, 0.2)',
                borderRadius: '16px',
                padding: '2rem',
                boxShadow: '0 8px 32px rgba(248, 113, 113, 0.1)'
            }}>
                <p style={{ color: '#991b1b', margin: '0 0 1rem', fontSize: '1rem', fontWeight: '500' }}>{error}</p>
                <button 
                    onClick={loadDashboardData}
                    style={{
                        background: 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)',
                        color: 'white',
                        border: 'none',
                        padding: '0.75rem 1.5rem',
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
                    Retry
                </button>
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
                            {/* Admin Crown Icon */}
                            <div style={{
                                width: '60px',
                                height: '60px',
                                position: 'relative',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <div style={{
                                    position: 'absolute',
                                    top: '15px',
                                    left: '10px',
                                    width: '40px',
                                    height: '30px',
                                    background: 'white',
                                    borderRadius: '8px 8px 0 0',
                                    boxShadow: '0 3px 12px rgba(0,0,0,0.15)'
                                }}>
                                    {/* Crown peaks */}
                                    <div style={{
                                        position: 'absolute',
                                        top: '-8px',
                                        left: '8px',
                                        width: '8px',
                                        height: '12px',
                                        background: 'white',
                                        borderRadius: '4px 4px 0 0'
                                    }} />
                                    <div style={{
                                        position: 'absolute',
                                        top: '-12px',
                                        left: '16px',
                                        width: '8px',
                                        height: '16px',
                                        background: 'white',
                                        borderRadius: '4px 4px 0 0'
                                    }} />
                                    <div style={{
                                        position: 'absolute',
                                        top: '-8px',
                                        left: '24px',
                                        width: '8px',
                                        height: '12px',
                                        background: 'white',
                                        borderRadius: '4px 4px 0 0'
                                    }} />
                                    {/* Crown gems */}
                                    <div style={{
                                        position: 'absolute',
                                        top: '8px',
                                        left: '18px',
                                        width: '4px',
                                        height: '4px',
                                        background: 'rgba(220, 252, 231, 0.9)',
                                        borderRadius: '50%'
                                    }} />
                                </div>
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
                            Admin Control Center
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
                            Complete system oversight and management. Monitor users, oversee medical operations, 
                            and maintain platform integrity from your centralized dashboard.
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
                                <div style={{ color: '#22c55e', fontSize: '2rem', marginBottom: '0.5rem' }}>👥</div>
                                <div style={{ color: '#374151', fontWeight: '700', fontSize: '1.5rem' }}>
                                    {statistics.totalUsers}
                                </div>
                                <div style={{ color: '#6b7280', fontSize: '0.9rem' }}>Total Users</div>
                            </div>
                            <div style={{
                                background: 'rgba(5, 150, 105, 0.1)',
                                padding: '1.5rem',
                                borderRadius: '16px',
                                border: '1px solid rgba(5, 150, 105, 0.2)'
                            }}>
                                <div style={{ color: '#059669', fontSize: '2rem', marginBottom: '0.5rem' }}>🏥</div>
                                <div style={{ color: '#374151', fontWeight: '700', fontSize: '1.5rem' }}>
                                    {statistics.totalPatients}
                                </div>
                                <div style={{ color: '#6b7280', fontSize: '0.9rem' }}>Patients</div>
                            </div>
                            <div style={{
                                background: 'rgba(21, 128, 61, 0.1)',
                                padding: '1.5rem',
                                borderRadius: '16px',
                                border: '1px solid rgba(21, 128, 61, 0.2)'
                            }}>
                                <div style={{ color: '#15803d', fontSize: '2rem', marginBottom: '0.5rem' }}>👨‍⚕️</div>
                                <div style={{ color: '#374151', fontWeight: '700', fontSize: '1.5rem' }}>
                                    {statistics.totalDoctors}
                                </div>
                                <div style={{ color: '#6b7280', fontSize: '0.9rem' }}>Doctors</div>
                            </div>
                            <div style={{
                                background: 'rgba(16, 185, 129, 0.1)',
                                padding: '1.5rem',
                                borderRadius: '16px',
                                border: '1px solid rgba(16, 185, 129, 0.2)'
                            }}>
                                <div style={{ color: '#10b981', fontSize: '2rem', marginBottom: '0.5rem' }}>📅</div>
                                <div style={{ color: '#374151', fontWeight: '700', fontSize: '1.5rem' }}>
                                    {statistics.totalAppointments}
                                </div>
                                <div style={{ color: '#6b7280', fontSize: '0.9rem' }}>Appointments</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Recent Activity Grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(480px, 1fr))',
                    gap: '2rem',
                    marginBottom: '3rem'
                }}>
                    {/* Recent Users */}
                    <section style={{
                        background: 'rgba(255, 255, 255, 0.98)',
                        backdropFilter: 'blur(20px)',
                        borderRadius: '24px',
                        padding: '2.5rem',
                        boxShadow: '0 20px 40px rgba(34, 197, 94, 0.12), 0 8px 32px rgba(0, 0, 0, 0.06)',
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
                            }}>👥</span>
                            Recent Users
                        </h3>
                        <div style={{
                            display: 'grid',
                            gap: '1rem'
                        }}>
                            {recentUsers.length > 0 ? (
                                recentUsers.map((user) => (
                                    <div key={user.id} style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        gap: '1rem',
                                        padding: '1.5rem',
                                        background: 'rgba(34, 197, 94, 0.05)',
                                        borderRadius: '12px',
                                        border: '1px solid rgba(34, 197, 94, 0.1)'
                                    }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                            <div style={{
                                                width: '40px',
                                                height: '40px',
                                                background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                                                borderRadius: '10px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                color: 'white',
                                                fontWeight: '600'
                                            }}>
                                                {user.fullName?.charAt(0) || '?'}
                                            </div>
                                            <div>
                                                <div style={{ 
                                                    color: '#374151', 
                                                    fontWeight: '600', 
                                                    fontSize: '1rem',
                                                    marginBottom: '0.25rem'
                                                }}>
                                                    {user.fullName || 'No name'}
                                                </div>
                                                <div style={{ color: '#6b7280', fontSize: '0.9rem' }}>
                                                    {user.email}
                                                </div>
                                            </div>
                                        </div>
                                        <div style={{ textAlign: 'right' }}>
                                            <span style={{
                                                display: 'inline-block',
                                                padding: '0.5rem 1rem',
                                                fontSize: '0.8rem',
                                                fontWeight: '600',
                                                borderRadius: '8px',
                                                background: user.isActive 
                                                    ? 'rgba(34, 197, 94, 0.1)' 
                                                    : 'rgba(239, 68, 68, 0.1)',
                                                color: user.isActive 
                                                    ? '#16a34a' 
                                                    : '#dc2626',
                                                border: `1px solid ${user.isActive 
                                                    ? 'rgba(34, 197, 94, 0.2)' 
                                                    : 'rgba(239, 68, 68, 0.2)'}`
                                            }}>
                                                {user.isActive ? 'Active' : 'Inactive'}
                                            </span>
                                            <div style={{ color: '#6b7280', fontSize: '0.8rem', marginTop: '0.5rem' }}>
                                                {formatDate(user.createdAt)}
                                            </div>
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
                                    No recent users
                                </div>
                            )}
                        </div>
                    </section>

                    {/* Pending Doctor Requests */}
                    <section style={{
                        background: 'rgba(255, 255, 255, 0.98)',
                        backdropFilter: 'blur(20px)',
                        borderRadius: '24px',
                        padding: '2.5rem',
                        boxShadow: '0 20px 40px rgba(251, 191, 36, 0.12), 0 8px 32px rgba(0, 0, 0, 0.06)',
                        border: '1px solid rgba(251, 191, 36, 0.15)'
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
                                background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                                borderRadius: '12px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                fontSize: '1.5rem'
                            }}>⏱️</span>
                            Pending Doctor Requests ({pendingDoctorRequests.length})
                        </h3>
                        <div style={{
                            display: 'grid',
                            gap: '1rem'
                        }}>
                            {pendingDoctorRequests.length > 0 ? (
                                pendingDoctorRequests.slice(0, 5).map((request) => (
                                    <div key={request.id} style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        gap: '1rem',
                                        padding: '1.5rem',
                                        background: 'rgba(251, 191, 36, 0.05)',
                                        borderRadius: '12px',
                                        border: '1px solid rgba(251, 191, 36, 0.1)'
                                    }}>
                                        <div>
                                            <div style={{ 
                                                color: '#374151', 
                                                fontWeight: '600', 
                                                fontSize: '1rem',
                                                marginBottom: '0.25rem'
                                            }}>
                                                {request.userName}
                                            </div>
                                            <div style={{ color: '#6b7280', fontSize: '0.9rem' }}>
                                                {request.specialization}
                                            </div>
                                        </div>
                                        <div style={{ textAlign: 'right' }}>
                                            <span style={{
                                                display: 'inline-block',
                                                padding: '0.5rem 1rem',
                                                fontSize: '0.8rem',
                                                fontWeight: '600',
                                                borderRadius: '8px',
                                                background: 'rgba(251, 191, 36, 0.1)',
                                                color: '#d97706',
                                                border: '1px solid rgba(251, 191, 36, 0.2)'
                                            }}>
                                                Pending
                                            </span>
                                            <div style={{ color: '#6b7280', fontSize: '0.8rem', marginTop: '0.5rem' }}>
                                                {formatDate(request.createdAt)}
                                            </div>
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
                                    No pending requests
                                </div>
                            )}
                        </div>
                        {pendingDoctorRequests.length > 5 && (
                            <div style={{
                                marginTop: '1.5rem',
                                textAlign: 'center',
                                padding: '1rem',
                                background: 'rgba(251, 191, 36, 0.05)',
                                borderRadius: '8px',
                                border: '1px solid rgba(251, 191, 36, 0.1)'
                            }}>
                                <p style={{ color: '#d97706', fontSize: '0.9rem', margin: 0, fontWeight: '500' }}>
                                    +{pendingDoctorRequests.length - 5} more requests awaiting review
                                </p>
                            </div>
                        )}
                    </section>
                </div>

                {/* Quick Actions Section */}
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
                            Admin Management Tools
                        </h2>
                        <p style={{
                            fontSize: '1.1rem',
                            color: '#6b7280',
                            margin: 0,
                            maxWidth: '600px',
                            marginLeft: 'auto',
                            marginRight: 'auto'
                        }}>
                            Access comprehensive system management tools and oversight functions
                        </p>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                        gap: '2rem',
                        width: '100%'
                    }}>
                        {/* Manage Users */}
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
                        onClick={() => handleNavigation('/admin/users')}
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
                                <span style={{ fontSize: '2.2rem', color: 'white' }}>👥</span>
                            </div>
                            
                            <h3 style={{
                                fontSize: '1.5rem',
                                fontWeight: '700',
                                color: '#374151',
                                margin: '0 0 1rem',
                                letterSpacing: '-0.025em'
                            }}>
                                Manage Users
                            </h3>
                            
                            <p style={{
                                color: '#6b7280',
                                margin: '0 0 2rem',
                                lineHeight: '1.6',
                                fontSize: '1rem'
                            }}>
                                Oversee user accounts, manage roles, activate/deactivate accounts, and maintain user database integrity.
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
                                <span>⚙️</span>
                                Manage Users
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
                        onClick={() => handleNavigation('/admin/appointments')}
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
                                <span style={{ fontSize: '2.2rem', color: 'white' }}>📅</span>
                            </div>
                            
                            <h3 style={{
                                fontSize: '1.5rem',
                                fontWeight: '700',
                                color: '#374151',
                                margin: '0 0 1rem',
                                letterSpacing: '-0.025em'
                            }}>
                                View Appointments
                            </h3>
                            
                            <p style={{
                                color: '#6b7280',
                                margin: '0 0 2rem',
                                lineHeight: '1.6',
                                fontSize: '1rem'
                            }}>
                                Monitor all system appointments, track scheduling patterns, and oversee medical appointment operations.
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
                                View System
                            </button>
                        </div>

                        {/* Manage Doctors */}
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
                        onClick={() => handleNavigation('/admin/doctors')}
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
                                <span style={{ fontSize: '2.2rem', color: 'white' }}>👨‍⚕️</span>
                            </div>
                            
                            <h3 style={{
                                fontSize: '1.5rem',
                                fontWeight: '700',
                                color: '#374151',
                                margin: '0 0 1rem',
                                letterSpacing: '-0.025em'
                            }}>
                                Manage Doctors
                            </h3>
                            
                            <p style={{
                                color: '#6b7280',
                                margin: '0 0 2rem',
                                lineHeight: '1.6',
                                fontSize: '1rem'
                            }}>
                                Review doctor registration requests, approve/reject applications, and manage medical professional credentials.
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
                                <span>🩺</span>
                                Manage Doctors
                            </button>
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
};

export default AdminDashboard;
