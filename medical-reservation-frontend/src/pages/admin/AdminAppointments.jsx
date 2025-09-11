import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminAPI } from '../../api/admin';

const AdminAppointments = () => {
    const navigate = useNavigate();
    const [appointments, setAppointments] = useState([]);
    const [filteredAppointments, setFilteredAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [dateFilter, setDateFilter] = useState('all');
    const [statistics, setStatistics] = useState({
        total: 0,
        scheduled: 0,
        completed: 0,
        cancelled: 0,
        today: 0
    });

    useEffect(() => {
        loadAppointments();
    }, []);

    useEffect(() => {
        applyFilters();
        calculateStatistics();
    }, [appointments, searchTerm, statusFilter, dateFilter]);

    const loadAppointments = async () => {
        try {
            setLoading(true);
            // Since there's no specific admin appointments endpoint, we'll use the admin stats
            // In a real implementation, you'd have an endpoint that returns all appointments
            const statsResponse = await adminAPI.getStatistics();
            setStatistics(prev => ({
                ...prev,
                total: statsResponse.data.totalAppointments
            }));
            
            // For now, we'll show a placeholder since we don't have the actual appointments endpoint
            // You would implement this endpoint in the backend to return all appointments
            setAppointments([]);
        } catch (err) {
            console.error('Error loading appointments:', err);
            setError('Failed to load appointments');
        } finally {
            setLoading(false);
        }
    };

    const applyFilters = () => {
        let filtered = [...appointments];

        // Search filter
        if (searchTerm) {
            filtered = filtered.filter(appointment => 
                appointment.patientName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                appointment.doctorName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                appointment.service?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Status filter
        if (statusFilter !== 'all') {
            filtered = filtered.filter(appointment => appointment.status === statusFilter);
        }

        // Date filter
        if (dateFilter !== 'all') {
            const today = new Date();
            const appointmentDate = new Date();
            
            switch (dateFilter) {
                case 'today':
                    filtered = filtered.filter(appointment => {
                        const appDate = new Date(appointment.appointmentTime);
                        return appDate.toDateString() === today.toDateString();
                    });
                    break;
                case 'week':
                    const weekLater = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
                    filtered = filtered.filter(appointment => {
                        const appDate = new Date(appointment.appointmentTime);
                        return appDate >= today && appDate <= weekLater;
                    });
                    break;
                case 'month':
                    const monthLater = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());
                    filtered = filtered.filter(appointment => {
                        const appDate = new Date(appointment.appointmentTime);
                        return appDate >= today && appDate <= monthLater;
                    });
                    break;
                default:
                    break;
            }
        }

        setFilteredAppointments(filtered);
    };

    const calculateStatistics = () => {
        const stats = {
            total: appointments.length,
            scheduled: appointments.filter(app => app.status === 'SCHEDULED').length,
            completed: appointments.filter(app => app.status === 'COMPLETED').length,
            cancelled: appointments.filter(app => app.status === 'CANCELLED').length,
            today: appointments.filter(app => {
                const today = new Date();
                const appDate = new Date(app.appointmentTime);
                return appDate.toDateString() === today.toDateString();
            }).length
        };
        setStatistics(stats);
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'SCHEDULED': return 'bg-blue-100 text-blue-800';
            case 'COMPLETED': return 'bg-green-100 text-green-800';
            case 'CANCELLED': return 'bg-red-100 text-red-800';
            case 'NO_SHOW': return 'bg-yellow-100 text-yellow-800';
            default: return 'bg-gray-100 text-gray-800';
        }
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
                    <p style={{ color: '#6b7280', margin: 0, fontSize: '1rem', fontWeight: '500' }}>Loading appointments...</p>
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
                    onClick={loadAppointments}
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
                            {/* Calendar Icon */}
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
                                    top: '10px',
                                    left: '10px',
                                    width: '40px',
                                    height: '35px',
                                    background: 'white',
                                    borderRadius: '4px',
                                    boxShadow: '0 3px 12px rgba(0,0,0,0.15)'
                                }}>
                                    {/* Calendar header */}
                                    <div style={{
                                        position: 'absolute',
                                        top: '0',
                                        left: '0',
                                        width: '40px',
                                        height: '8px',
                                        background: 'rgba(220, 252, 231, 0.9)',
                                        borderRadius: '4px 4px 0 0'
                                    }} />
                                    {/* Calendar rings */}
                                    <div style={{
                                        position: 'absolute',
                                        top: '-3px',
                                        left: '8px',
                                        width: '3px',
                                        height: '6px',
                                        background: 'rgba(220, 252, 231, 0.9)',
                                        borderRadius: '1px'
                                    }} />
                                    <div style={{
                                        position: 'absolute',
                                        top: '-3px',
                                        left: '29px',
                                        width: '3px',
                                        height: '6px',
                                        background: 'rgba(220, 252, 231, 0.9)',
                                        borderRadius: '1px'
                                    }} />
                                    {/* Calendar grid */}
                                    <div style={{
                                        position: 'absolute',
                                        top: '12px',
                                        left: '5px',
                                        width: '30px',
                                        height: '2px',
                                        background: 'rgba(220, 252, 231, 0.7)',
                                        borderRadius: '1px'
                                    }} />
                                    <div style={{
                                        position: 'absolute',
                                        top: '18px',
                                        left: '5px',
                                        width: '30px',
                                        height: '2px',
                                        background: 'rgba(220, 252, 231, 0.7)',
                                        borderRadius: '1px'
                                    }} />
                                    <div style={{
                                        position: 'absolute',
                                        top: '24px',
                                        left: '5px',
                                        width: '15px',
                                        height: '2px',
                                        background: 'rgba(220, 252, 231, 0.7)',
                                        borderRadius: '1px'
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
                            Appointments Overview
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
                            Comprehensive system-wide appointment monitoring and management. 
                            Track all medical consultations across the platform ({statistics.total} total appointments).
                        </p>

                        {/* Quick Stats */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                            gap: '1.5rem',
                            maxWidth: '1000px',
                            margin: '0 auto'
                        }}>
                            <div style={{
                                background: 'rgba(107, 114, 128, 0.1)',
                                padding: '1.5rem',
                                borderRadius: '16px',
                                border: '1px solid rgba(107, 114, 128, 0.2)'
                            }}>
                                <div style={{ color: '#6b7280', fontSize: '2rem', marginBottom: '0.5rem' }}>📊</div>
                                <div style={{ color: '#374151', fontWeight: '700', fontSize: '1.5rem' }}>
                                    {statistics.total}
                                </div>
                                <div style={{ color: '#6b7280', fontSize: '0.9rem' }}>Total</div>
                            </div>
                            <div style={{
                                background: 'rgba(59, 130, 246, 0.1)',
                                padding: '1.5rem',
                                borderRadius: '16px',
                                border: '1px solid rgba(59, 130, 246, 0.2)'
                            }}>
                                <div style={{ color: '#3b82f6', fontSize: '2rem', marginBottom: '0.5rem' }}>⏰</div>
                                <div style={{ color: '#374151', fontWeight: '700', fontSize: '1.5rem' }}>
                                    {statistics.scheduled}
                                </div>
                                <div style={{ color: '#6b7280', fontSize: '0.9rem' }}>Scheduled</div>
                            </div>
                            <div style={{
                                background: 'rgba(34, 197, 94, 0.1)',
                                padding: '1.5rem',
                                borderRadius: '16px',
                                border: '1px solid rgba(34, 197, 94, 0.2)'
                            }}>
                                <div style={{ color: '#22c55e', fontSize: '2rem', marginBottom: '0.5rem' }}>✅</div>
                                <div style={{ color: '#374151', fontWeight: '700', fontSize: '1.5rem' }}>
                                    {statistics.completed}
                                </div>
                                <div style={{ color: '#6b7280', fontSize: '0.9rem' }}>Completed</div>
                            </div>
                            <div style={{
                                background: 'rgba(239, 68, 68, 0.1)',
                                padding: '1.5rem',
                                borderRadius: '16px',
                                border: '1px solid rgba(239, 68, 68, 0.2)'
                            }}>
                                <div style={{ color: '#ef4444', fontSize: '2rem', marginBottom: '0.5rem' }}>❌</div>
                                <div style={{ color: '#374151', fontWeight: '700', fontSize: '1.5rem' }}>
                                    {statistics.cancelled}
                                </div>
                                <div style={{ color: '#6b7280', fontSize: '0.9rem' }}>Cancelled</div>
                            </div>
                            <div style={{
                                background: 'rgba(168, 85, 247, 0.1)',
                                padding: '1.5rem',
                                borderRadius: '16px',
                                border: '1px solid rgba(168, 85, 247, 0.2)'
                            }}>
                                <div style={{ color: '#a855f7', fontSize: '2rem', marginBottom: '0.5rem' }}>📅</div>
                                <div style={{ color: '#374151', fontWeight: '700', fontSize: '1.5rem' }}>
                                    {statistics.today}
                                </div>
                                <div style={{ color: '#6b7280', fontSize: '0.9rem' }}>Today</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Filters Section */}
                <section style={{
                    background: 'rgba(255, 255, 255, 0.98)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '24px',
                    padding: '2.5rem',
                    marginBottom: '3rem',
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
                        }}>🔍</span>
                        Filter Appointments
                    </h3>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '1.5rem'
                    }}>
                        <div>
                            <label style={{
                                display: 'block',
                                fontSize: '0.9rem',
                                fontWeight: '600',
                                color: '#374151',
                                marginBottom: '0.5rem'
                            }}>Search</label>
                            <input
                                type="text"
                                placeholder="Search appointments..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={{
                                    width: '100%',
                                    border: '1px solid rgba(34, 197, 94, 0.2)',
                                    borderRadius: '12px',
                                    padding: '0.75rem 1rem',
                                    fontSize: '0.9rem',
                                    background: 'rgba(34, 197, 94, 0.02)',
                                    transition: 'all 0.3s ease',
                                    outline: 'none'
                                }}
                                onFocus={e => {
                                    e.target.style.border = '1px solid rgba(34, 197, 94, 0.4)';
                                    e.target.style.boxShadow = '0 0 0 3px rgba(34, 197, 94, 0.1)';
                                }}
                                onBlur={e => {
                                    e.target.style.border = '1px solid rgba(34, 197, 94, 0.2)';
                                    e.target.style.boxShadow = 'none';
                                }}
                            />
                        </div>
                        <div>
                            <label style={{
                                display: 'block',
                                fontSize: '0.9rem',
                                fontWeight: '600',
                                color: '#374151',
                                marginBottom: '0.5rem'
                            }}>Status</label>
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                style={{
                                    width: '100%',
                                    border: '1px solid rgba(34, 197, 94, 0.2)',
                                    borderRadius: '12px',
                                    padding: '0.75rem 1rem',
                                    fontSize: '0.9rem',
                                    background: 'rgba(34, 197, 94, 0.02)',
                                    transition: 'all 0.3s ease',
                                    outline: 'none'
                                }}
                                onFocus={e => {
                                    e.target.style.border = '1px solid rgba(34, 197, 94, 0.4)';
                                    e.target.style.boxShadow = '0 0 0 3px rgba(34, 197, 94, 0.1)';
                                }}
                                onBlur={e => {
                                    e.target.style.border = '1px solid rgba(34, 197, 94, 0.2)';
                                    e.target.style.boxShadow = 'none';
                                }}
                            >
                                <option value="all">All Status</option>
                                <option value="SCHEDULED">Scheduled</option>
                                <option value="COMPLETED">Completed</option>
                                <option value="CANCELLED">Cancelled</option>
                                <option value="NO_SHOW">No Show</option>
                            </select>
                        </div>
                        <div>
                            <label style={{
                                display: 'block',
                                fontSize: '0.9rem',
                                fontWeight: '600',
                                color: '#374151',
                                marginBottom: '0.5rem'
                            }}>Date Range</label>
                            <select
                                value={dateFilter}
                                onChange={(e) => setDateFilter(e.target.value)}
                                style={{
                                    width: '100%',
                                    border: '1px solid rgba(34, 197, 94, 0.2)',
                                    borderRadius: '12px',
                                    padding: '0.75rem 1rem',
                                    fontSize: '0.9rem',
                                    background: 'rgba(34, 197, 94, 0.02)',
                                    transition: 'all 0.3s ease',
                                    outline: 'none'
                                }}
                                onFocus={e => {
                                    e.target.style.border = '1px solid rgba(34, 197, 94, 0.4)';
                                    e.target.style.boxShadow = '0 0 0 3px rgba(34, 197, 94, 0.1)';
                                }}
                                onBlur={e => {
                                    e.target.style.border = '1px solid rgba(34, 197, 94, 0.2)';
                                    e.target.style.boxShadow = 'none';
                                }}
                            >
                                <option value="all">All Dates</option>
                                <option value="today">Today</option>
                                <option value="week">This Week</option>
                                <option value="month">This Month</option>
                            </select>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'end' }}>
                            <button
                                onClick={() => {
                                    setSearchTerm('');
                                    setStatusFilter('all');
                                    setDateFilter('all');
                                }}
                                style={{
                                    width: '100%',
                                    background: 'linear-gradient(135deg, #6b7280 0%, #4b5563 100%)',
                                    color: 'white',
                                    border: 'none',
                                    padding: '0.75rem 1rem',
                                    borderRadius: '12px',
                                    cursor: 'pointer',
                                    fontWeight: '600',
                                    fontSize: '0.9rem',
                                    transition: 'all 0.3s ease',
                                    boxShadow: '0 4px 12px rgba(107, 114, 128, 0.25)'
                                }}
                                onMouseEnter={e => {
                                    e.target.style.transform = 'translateY(-1px)';
                                    e.target.style.boxShadow = '0 6px 16px rgba(107, 114, 128, 0.3)';
                                }}
                                onMouseLeave={e => {
                                    e.target.style.transform = 'translateY(0)';
                                    e.target.style.boxShadow = '0 4px 12px rgba(107, 114, 128, 0.25)';
                                }}
                            >
                                Clear Filters
                            </button>
                        </div>
                    </div>
                    <div style={{
                        marginTop: '1.5rem',
                        padding: '1rem',
                        background: 'rgba(34, 197, 94, 0.05)',
                        borderRadius: '8px',
                        border: '1px solid rgba(34, 197, 94, 0.1)',
                        color: '#16a34a',
                        fontSize: '0.9rem',
                        fontWeight: '500'
                    }}>
                        Showing {filteredAppointments.length} of {appointments.length} appointments
                    </div>
                </section>

                {/* Appointments Table */}
                <section style={{
                    background: 'rgba(255, 255, 255, 0.98)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '24px',
                    padding: '2.5rem',
                    boxShadow: '0 20px 40px rgba(34, 197, 94, 0.12), 0 8px 32px rgba(0, 0, 0, 0.06)',
                    border: '1px solid rgba(34, 197, 94, 0.15)',
                    overflow: 'hidden'
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
                        All Appointments
                    </h3>
                    
                    {/* Implementation Notice */}
                    <div style={{
                        background: 'rgba(168, 85, 247, 0.05)',
                        border: '1px solid rgba(168, 85, 247, 0.2)',
                        borderRadius: '16px',
                        padding: '2rem',
                        textAlign: 'center'
                    }}>
                        <div style={{
                            width: '60px',
                            height: '60px',
                            background: 'linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 1.5rem',
                            boxShadow: '0 8px 24px rgba(168, 85, 247, 0.3)'
                        }}>
                            <span style={{ fontSize: '1.5rem', color: 'white' }}>⚙️</span>
                        </div>
                        <h4 style={{
                            fontSize: '1.5rem',
                            fontWeight: '700',
                            color: '#6b21a8',
                            margin: '0 0 1rem'
                        }}>Implementation Note</h4>
                        <p style={{
                            color: '#7c2d12',
                            margin: '0 0 1.5rem',
                            fontSize: '1rem',
                            lineHeight: '1.6'
                        }}>
                            This page requires a backend endpoint to fetch all appointments. Currently showing appointment statistics only.
                        </p>
                        <p style={{
                            color: '#92400e',
                            fontSize: '0.9rem',
                            margin: 0,
                            lineHeight: '1.5'
                        }}>
                            To complete this feature, add an endpoint like <code style={{
                                background: 'rgba(168, 85, 247, 0.1)',
                                padding: '0.25rem 0.5rem',
                                borderRadius: '4px',
                                fontFamily: 'monospace',
                                color: '#6b21a8'
                            }}>/api/admin/appointments</code> that returns all appointments with patient and doctor information.
                        </p>
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

export default AdminAppointments;
