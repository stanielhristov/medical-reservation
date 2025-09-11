import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminAPI } from '../../api/admin';

const AdminUsers = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');
    const [selectedUser, setSelectedUser] = useState(null);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [actionType, setActionType] = useState(''); // 'activate', 'deactivate', or 'delete'
    const [actionLoading, setActionLoading] = useState(false);

    useEffect(() => {
        loadUsers();
    }, []);

    useEffect(() => {
        applyFilters();
    }, [users, searchTerm, roleFilter, statusFilter]);

    const loadUsers = async () => {
        try {
            setLoading(true);
            const response = await adminAPI.getAllUsers();
            setUsers(response.data);
        } catch (err) {
            console.error('Error loading users:', err);
            setError('Failed to load users');
        } finally {
            setLoading(false);
        }
    };

    const applyFilters = () => {
        let filtered = [...users];

        if (searchTerm) {
            filtered = filtered.filter(user => 
                user.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.phoneNumber?.includes(searchTerm)
            );
        }

        if (roleFilter !== 'all') {
            filtered = filtered.filter(user => user.role === roleFilter);
        }

        if (statusFilter !== 'all') {
            filtered = filtered.filter(user => 
                statusFilter === 'active' ? user.isActive : !user.isActive
            );
        }

        setFilteredUsers(filtered);
    };

    const openConfirmModal = (user, action) => {
        setSelectedUser(user);
        setActionType(action);
        setShowConfirmModal(true);
    };

    const closeConfirmModal = () => {
        setShowConfirmModal(false);
        setSelectedUser(null);
        setActionType('');
    };

    const handleUserAction = async (action, userId) => {
        try {
            setActionLoading(true);
            
            switch (action) {
                case 'activate':
                    await adminAPI.activateUser(userId);
                    break;
                case 'deactivate':
                    await adminAPI.deactivateUser(userId);
                    break;
                case 'delete':
                    await adminAPI.deleteUser(userId);
                    break;
                default:
                    throw new Error('Unknown action');
            }
            
            await loadUsers();
            closeConfirmModal();
        } catch (err) {
            console.error(`Error performing ${action}:`, err);
            
            // Get more specific error message
            let errorMessage = `Failed to ${action} user. Please try again.`;
            if (err.response?.data?.message) {
                errorMessage = err.response.data.message;
            } else if (err.response?.data) {
                errorMessage = err.response.data;
            } else if (err.message) {
                errorMessage = err.message;
            }
            
            setError(errorMessage);
        } finally {
            setActionLoading(false);
        }
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

    const getRoleColor = (role) => {
        switch (role) {
            case 'ADMIN': return 'bg-red-100 text-red-800';
            case 'DOCTOR': return 'bg-purple-100 text-purple-800';
            case 'USER': return 'bg-blue-100 text-blue-800';
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
                    <p style={{ color: '#6b7280', margin: 0, fontSize: '1rem', fontWeight: '500' }}>Loading users...</p>
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
                    onClick={loadUsers}
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
                            {/* User Management Icon */}
                            <div style={{
                                width: '60px',
                                height: '60px',
                                position: 'relative',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                {/* Main user */}
                                <div style={{
                                    position: 'absolute',
                                    top: '12px',
                                    left: '24px',
                                    width: '12px',
                                    height: '8px',
                                    background: 'white',
                                    borderRadius: '6px 6px 0 0'
                                }} />
                                <div style={{
                                    position: 'absolute',
                                    top: '20px',
                                    left: '20px',
                                    width: '20px',
                                    height: '12px',
                                    background: 'white',
                                    borderRadius: '0 0 10px 10px'
                                }} />
                                {/* Side users */}
                                <div style={{
                                    position: 'absolute',
                                    top: '15px',
                                    left: '8px',
                                    width: '8px',
                                    height: '6px',
                                    background: 'rgba(220, 252, 231, 0.9)',
                                    borderRadius: '4px 4px 0 0'
                                }} />
                                <div style={{
                                    position: 'absolute',
                                    top: '21px',
                                    left: '6px',
                                    width: '12px',
                                    height: '8px',
                                    background: 'rgba(220, 252, 231, 0.9)',
                                    borderRadius: '0 0 6px 6px'
                                }} />
                                <div style={{
                                    position: 'absolute',
                                    top: '15px',
                                    left: '44px',
                                    width: '8px',
                                    height: '6px',
                                    background: 'rgba(220, 252, 231, 0.9)',
                                    borderRadius: '4px 4px 0 0'
                                }} />
                                <div style={{
                                    position: 'absolute',
                                    top: '21px',
                                    left: '42px',
                                    width: '12px',
                                    height: '8px',
                                    background: 'rgba(220, 252, 231, 0.9)',
                                    borderRadius: '0 0 6px 6px'
                                }} />
                                {/* Management icon */}
                                <div style={{
                                    position: 'absolute',
                                    top: '35px',
                                    left: '22px',
                                    width: '16px',
                                    height: '2px',
                                    background: 'rgba(220, 252, 231, 0.9)',
                                    borderRadius: '1px'
                                }} />
                                <div style={{
                                    position: 'absolute',
                                    top: '39px',
                                    left: '22px',
                                    width: '16px',
                                    height: '2px',
                                    background: 'rgba(220, 252, 231, 0.9)',
                                    borderRadius: '1px'
                                }} />
                                <div style={{
                                    position: 'absolute',
                                    top: '43px',
                                    left: '22px',
                                    width: '10px',
                                    height: '2px',
                                    background: 'rgba(220, 252, 231, 0.9)',
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
                            User Management
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
                            Comprehensive user account management and role administration. 
                            Monitor user activity and maintain system security ({users.length} total users).
                        </p>
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
                        Filter Users
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
                                placeholder="Search users..."
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
                            }}>Role</label>
                            <select
                                value={roleFilter}
                                onChange={(e) => setRoleFilter(e.target.value)}
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
                                <option value="all">All Roles</option>
                                <option value="USER">Patients</option>
                                <option value="DOCTOR">Doctors</option>
                                <option value="ADMIN">Admins</option>
                            </select>
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
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'end' }}>
                            <button
                                onClick={() => {
                                    setSearchTerm('');
                                    setRoleFilter('all');
                                    setStatusFilter('all');
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
                        Showing {filteredUsers.length} of {users.length} users
                    </div>
                </section>

                {/* Users Table */}
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
                        }}>👥</span>
                        All Users
                    </h3>
                    
                    <div style={{
                        display: 'grid',
                        gap: '1rem'
                    }}>
                        {filteredUsers.length > 0 ? (
                            filteredUsers.map((user) => (
                                <div key={user.id} style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    gap: '1rem',
                                    padding: '1.5rem',
                                    background: 'rgba(34, 197, 94, 0.05)',
                                    borderRadius: '12px',
                                    border: '1px solid rgba(34, 197, 94, 0.1)',
                                    transition: 'all 0.3s ease'
                                }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.background = 'rgba(34, 197, 94, 0.08)';
                                    e.currentTarget.style.transform = 'translateY(-1px)';
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.background = 'rgba(34, 197, 94, 0.05)';
                                    e.currentTarget.style.transform = 'translateY(0)';
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1 }}>
                                        <div style={{
                                            width: '50px',
                                            height: '50px',
                                            background: user.role === 'ADMIN' 
                                                ? 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'
                                                : user.role === 'DOCTOR'
                                                ? 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)'
                                                : 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                                            borderRadius: '12px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: 'white',
                                            fontWeight: '700',
                                            fontSize: '1.2rem'
                                        }}>
                                            {user.fullName?.charAt(0) || '?'}
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ 
                                                color: '#374151', 
                                                fontWeight: '700', 
                                                fontSize: '1.1rem',
                                                marginBottom: '0.25rem'
                                            }}>
                                                {user.fullName || 'No name'}
                                            </div>
                                            <div style={{ 
                                                color: '#6b7280', 
                                                fontSize: '0.9rem',
                                                marginBottom: '0.25rem'
                                            }}>
                                                {user.email}
                                            </div>
                                            <div style={{ 
                                                color: '#6b7280', 
                                                fontSize: '0.85rem'
                                            }}>
                                                {user.phoneNumber || 'No phone'} • Joined {formatDate(user.createdAt)}
                                            </div>
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', minWidth: '120px' }}>
                                            <span style={{
                                                display: 'inline-block',
                                                padding: '0.5rem 1rem',
                                                fontSize: '0.8rem',
                                                fontWeight: '600',
                                                borderRadius: '8px',
                                                background: user.role === 'ADMIN' 
                                                    ? 'rgba(239, 68, 68, 0.1)'
                                                    : user.role === 'DOCTOR'
                                                    ? 'rgba(139, 92, 246, 0.1)'
                                                    : 'rgba(59, 130, 246, 0.1)',
                                                color: user.role === 'ADMIN' 
                                                    ? '#dc2626'
                                                    : user.role === 'DOCTOR'
                                                    ? '#7c3aed'
                                                    : '#2563eb',
                                                border: `1px solid ${user.role === 'ADMIN' 
                                                    ? 'rgba(239, 68, 68, 0.2)'
                                                    : user.role === 'DOCTOR'
                                                    ? 'rgba(139, 92, 246, 0.2)'
                                                    : 'rgba(59, 130, 246, 0.2)'}`
                                            }}>
                                                {user.role}
                                            </span>
                                            <span style={{
                                                display: 'inline-block',
                                                padding: '0.4rem 0.8rem',
                                                fontSize: '0.75rem',
                                                fontWeight: '600',
                                                borderRadius: '6px',
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
                                                {user.isActive ? '✅ Active' : '❌ Inactive'}
                                            </span>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        <button
                                            onClick={() => openConfirmModal(user, user.isActive ? 'deactivate' : 'activate')}
                                            disabled={actionLoading}
                                            style={{
                                                background: user.isActive 
                                                    ? 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'
                                                    : 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                                                color: 'white',
                                                border: 'none',
                                                padding: '0.75rem 1rem',
                                                borderRadius: '8px',
                                                cursor: 'pointer',
                                                fontWeight: '600',
                                                fontSize: '0.85rem',
                                                transition: 'all 0.3s ease',
                                                boxShadow: user.isActive 
                                                    ? '0 4px 12px rgba(239, 68, 68, 0.25)'
                                                    : '0 4px 12px rgba(34, 197, 94, 0.25)',
                                                opacity: actionLoading ? 0.5 : 1,
                                                minWidth: '100px',
                                                textAlign: 'center'
                                            }}
                                            onMouseEnter={e => {
                                                if (!actionLoading) {
                                                    e.target.style.transform = 'translateY(-1px)';
                                                    e.target.style.boxShadow = user.isActive 
                                                        ? '0 6px 16px rgba(239, 68, 68, 0.3)'
                                                        : '0 6px 16px rgba(34, 197, 94, 0.3)';
                                                }
                                            }}
                                            onMouseLeave={e => {
                                                if (!actionLoading) {
                                                    e.target.style.transform = 'translateY(0)';
                                                    e.target.style.boxShadow = user.isActive 
                                                        ? '0 4px 12px rgba(239, 68, 68, 0.25)'
                                                        : '0 4px 12px rgba(34, 197, 94, 0.25)';
                                                }
                                            }}
                                        >
                                            {user.isActive ? '❌ Deactivate' : '✅ Activate'}
                                        </button>
                                        
                                        {user.role !== 'ADMIN' && (
                                            <button
                                                onClick={() => openConfirmModal(user, 'delete')}
                                                disabled={actionLoading}
                                                style={{
                                                    background: 'linear-gradient(135deg, #991b1b 0%, #7f1d1d 100%)',
                                                    color: 'white',
                                                    border: 'none',
                                                    padding: '0.75rem 1rem',
                                                    borderRadius: '8px',
                                                    cursor: 'pointer',
                                                    fontWeight: '600',
                                                    fontSize: '0.85rem',
                                                    transition: 'all 0.3s ease',
                                                    boxShadow: '0 4px 12px rgba(153, 27, 27, 0.25)',
                                                    opacity: actionLoading ? 0.5 : 1,
                                                    minWidth: '100px',
                                                    textAlign: 'center'
                                                }}
                                                onMouseEnter={e => {
                                                    if (!actionLoading) {
                                                        e.target.style.transform = 'translateY(-1px)';
                                                        e.target.style.boxShadow = '0 6px 16px rgba(153, 27, 27, 0.3)';
                                                    }
                                                }}
                                                onMouseLeave={e => {
                                                    if (!actionLoading) {
                                                        e.target.style.transform = 'translateY(0)';
                                                        e.target.style.boxShadow = '0 4px 12px rgba(153, 27, 27, 0.25)';
                                                    }
                                                }}
                                            >
                                                🗑️ Delete
                                            </button>
                                        )}
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
                                <div style={{
                                    width: '60px',
                                    height: '60px',
                                    background: 'rgba(107, 114, 128, 0.1)',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    margin: '0 auto 1rem'
                                }}>
                                    <span style={{ fontSize: '1.5rem' }}>👥</span>
                                </div>
                                No users found matching your criteria.
                            </div>
                        )}
                    </div>
                </section>

            {/* Confirmation Modal */}
            {showConfirmModal && selectedUser && (
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
                            background: actionType === 'activate' 
                                ? 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)'
                                : actionType === 'delete'
                                ? 'linear-gradient(135deg, #991b1b 0%, #7f1d1d 100%)'
                                : 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 1rem',
                            boxShadow: actionType === 'activate' 
                                ? '0 8px 24px rgba(34, 197, 94, 0.3)'
                                : actionType === 'delete'
                                ? '0 8px 24px rgba(153, 27, 27, 0.3)'
                                : '0 8px 24px rgba(239, 68, 68, 0.3)'
                        }}>
                            <div style={{
                                fontSize: '1.5rem',
                                color: 'white'
                            }}>
                                {actionType === 'activate' ? '✅' : actionType === 'delete' ? '🗑️' : '❌'}
                            </div>
                        </div>
                        
                        <h3 style={{
                            fontSize: '1.5rem',
                            fontWeight: '600',
                            color: '#374151',
                            margin: '0 0 1rem'
                        }}>
                            {actionType === 'activate' ? 'Activate User' : actionType === 'delete' ? 'Delete User' : 'Deactivate User'}
                        </h3>
                        
                        <p style={{
                            color: '#6b7280',
                            margin: '0 0 1rem',
                            lineHeight: '1.6'
                        }}>
                            Are you sure you want to <strong>{actionType}</strong> this user account?
                            {actionType === 'deactivate' && (
                                <span style={{ display: 'block', marginTop: '0.5rem', fontSize: '0.9rem', fontStyle: 'italic' }}>
                                    Deactivated users will not be able to log in to the system.
                                </span>
                            )}
                            {actionType === 'activate' && (
                                <span style={{ display: 'block', marginTop: '0.5rem', fontSize: '0.9rem', fontStyle: 'italic' }}>
                                    User will regain access to log in and use the system.
                                </span>
                            )}
                            {actionType === 'delete' && (
                                <span style={{ display: 'block', marginTop: '0.5rem', fontSize: '0.9rem', fontStyle: 'italic', color: '#dc2626', fontWeight: '600' }}>
                                    ⚠️ WARNING: This action cannot be undone! All user data will be permanently removed.
                                    <br />
                                    <span style={{ fontSize: '0.8rem', fontWeight: '400' }}>
                                        Note: Users with existing appointments cannot be deleted and should be deactivated instead.
                                    </span>
                                </span>
                            )}
                        </p>
                        
                        <div style={{
                            background: 'rgba(34, 197, 94, 0.05)',
                            borderRadius: '8px',
                            padding: '1rem',
                            margin: '0 0 2rem',
                            border: '1px solid rgba(34, 197, 94, 0.1)'
                        }}>
                            <div style={{
                                fontWeight: '600',
                                color: '#374151',
                                marginBottom: '0.25rem'
                            }}>
                                {selectedUser.fullName}
                            </div>
                            <div style={{
                                color: '#6b7280',
                                fontSize: '0.9rem',
                                marginBottom: '0.25rem'
                            }}>
                                {selectedUser.email}
                            </div>
                            <div style={{
                                color: '#6b7280',
                                fontSize: '0.85rem'
                            }}>
                                Role: {selectedUser.role} • Status: {selectedUser.isActive ? 'Active' : 'Inactive'}
                            </div>
                        </div>
                        
                        <div style={{
                            display: 'flex',
                            gap: '1rem',
                            justifyContent: 'center'
                        }}>
                            <button
                                onClick={closeConfirmModal}
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
                                onClick={() => handleUserAction(actionType, selectedUser.id)}
                                disabled={actionLoading}
                                style={{
                                    padding: '0.75rem 1.5rem',
                                    background: actionType === 'activate' 
                                        ? 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)'
                                        : actionType === 'delete'
                                        ? 'linear-gradient(135deg, #991b1b 0%, #7f1d1d 100%)'
                                        : 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    fontWeight: '500',
                                    transition: 'all 0.3s ease',
                                    boxShadow: actionType === 'activate' 
                                        ? '0 4px 12px rgba(34, 197, 94, 0.25)'
                                        : actionType === 'delete'
                                        ? '0 4px 12px rgba(153, 27, 27, 0.25)'
                                        : '0 4px 12px rgba(220, 38, 38, 0.25)',
                                    opacity: actionLoading ? 0.5 : 1
                                }}
                                onMouseEnter={e => {
                                    if (!actionLoading) {
                                        e.target.style.transform = 'translateY(-1px)';
                                        e.target.style.boxShadow = actionType === 'activate' 
                                            ? '0 6px 16px rgba(34, 197, 94, 0.3)'
                                            : actionType === 'delete'
                                            ? '0 6px 16px rgba(153, 27, 27, 0.3)'
                                            : '0 6px 16px rgba(220, 38, 38, 0.3)';
                                    }
                                }}
                                onMouseLeave={e => {
                                    if (!actionLoading) {
                                        e.target.style.transform = 'translateY(0)';
                                        e.target.style.boxShadow = actionType === 'activate' 
                                            ? '0 4px 12px rgba(34, 197, 94, 0.25)'
                                            : actionType === 'delete'
                                            ? '0 4px 12px rgba(153, 27, 27, 0.25)'
                                            : '0 4px 12px rgba(220, 38, 38, 0.25)';
                                    }
                                }}
                            >
                                {actionLoading ? 'Processing...' : `Yes, ${actionType === 'activate' ? 'Activate' : actionType === 'delete' ? 'Delete Permanently' : 'Deactivate'}`}
                            </button>
                        </div>
                    </div>
                </div>
            )}
            </main>

            <style>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
};

export default AdminUsers;
