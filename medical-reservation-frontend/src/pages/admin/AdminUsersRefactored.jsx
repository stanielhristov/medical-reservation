import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminAPI } from '../../api/admin';
import AdminHeader from '../../components/AdminHeader';
import UserFilters from '../../components/UserFilters';
import UserTable from '../../components/UserTable';
import ConfirmActionModal from '../../components/ConfirmActionModal';

const AdminUsersRefactored = () => {
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
    const [actionType, setActionType] = useState('');
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

    const getUserCounts = () => {
        return {
            all: users.length,
            USER: users.filter(u => u.role === 'USER').length,
            DOCTOR: users.filter(u => u.role === 'DOCTOR').length,
            ADMIN: users.filter(u => u.role === 'ADMIN').length,
            active: users.filter(u => u.isActive).length,
            inactive: users.filter(u => !u.isActive).length
        };
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

    if (loading) {
        return (
            <div style={{
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 50%, #bbf7d0 100%)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <div style={{
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '24px',
                    padding: '3rem',
                    textAlign: 'center',
                    boxShadow: '0 20px 40px rgba(5, 150, 105, 0.15)'
                }}>
                    <div style={{
                        width: '60px',
                        height: '60px',
                        border: '4px solid rgba(5, 150, 105, 0.2)',
                        borderTop: '4px solid #059669',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite',
                        margin: '0 auto 1.5rem'
                    }} />
                    <p style={{ color: '#6b7280', margin: 0 }}>Loading users...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div style={{
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 50%, #bbf7d0 100%)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <div style={{
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '24px',
                    padding: '3rem',
                    textAlign: 'center',
                    boxShadow: '0 20px 40px rgba(239, 68, 68, 0.15)',
                    maxWidth: '500px'
                }}>
                    <div style={{
                        width: '80px',
                        height: '80px',
                        background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
                        borderRadius: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '2rem',
                        margin: '0 auto 1.5rem',
                        color: 'white'
                    }}>
                        ⚠️
                    </div>
                    <h3 style={{
                        fontSize: '1.5rem',
                        fontWeight: '700',
                        color: '#374151',
                        margin: '0 0 1rem'
                    }}>
                        Error Loading Users
                    </h3>
                    <p style={{ color: '#6b7280', margin: '0 0 2rem' }}>
                        {error}
                    </p>
                    <button
                        onClick={loadUsers}
                        style={{
                            background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            padding: '0.75rem 1.5rem',
                            cursor: 'pointer',
                            fontWeight: '600',
                            fontSize: '1rem',
                            transition: 'all 0.2s ease'
                        }}
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 50%, #bbf7d0 100%)',
            position: 'relative',
            overflow: 'hidden'
        }}>
            <div style={{
                position: 'absolute',
                top: '10%',
                right: '5%',
                width: '200px',
                height: '200px',
                background: 'radial-gradient(circle, rgba(5, 150, 105, 0.1) 0%, transparent 70%)',
                borderRadius: '50%',
                zIndex: 0
            }} />
            
            <div style={{
                position: 'absolute',
                bottom: '15%',
                left: '3%',
                width: '150px',
                height: '150px',
                background: 'radial-gradient(circle, rgba(21, 128, 61, 0.08) 0%, transparent 70%)',
                borderRadius: '50%',
                zIndex: 0
            }} />

            <main style={{
                maxWidth: '1400px',
                margin: '0 auto',
                padding: '2rem',
                position: 'relative',
                zIndex: 1
            }}>
                <AdminHeader />
                
                <UserFilters
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                    roleFilter={roleFilter}
                    onRoleFilterChange={setRoleFilter}
                    statusFilter={statusFilter}
                    onStatusFilterChange={setStatusFilter}
                    userCounts={getUserCounts()}
                />

                {/* Deactivation Types Information Panel */}
                <div style={{
                    background: 'rgba(255, 255, 255, 0.98)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '16px',
                    padding: '1.5rem',
                    marginBottom: '1.5rem',
                    boxShadow: '0 8px 24px rgba(5, 150, 105, 0.1)',
                    border: '1px solid rgba(5, 150, 105, 0.1)'
                }}>
                    <h3 style={{
                        fontSize: '1rem',
                        fontWeight: '600',
                        color: '#374151',
                        margin: '0 0 1rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                    }}>
                        ℹ️ Deactivation Types Guide
                    </h3>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '1rem',
                        fontSize: '0.875rem'
                    }}>
                        <div style={{
                            background: 'rgba(245, 158, 11, 0.05)',
                            border: '1px solid rgba(245, 158, 11, 0.2)',
                            borderRadius: '8px',
                            padding: '0.75rem'
                        }}>
                            <div style={{
                                fontWeight: '600',
                                color: '#d97706',
                                marginBottom: '0.25rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.25rem'
                            }}>
                                👤 Self-deactivated
                            </div>
                            <div style={{ color: '#374151', fontSize: '0.8rem' }}>
                                User deactivated their own account. They can reactivate by logging in again.
                            </div>
                        </div>
                        <div style={{
                            background: 'rgba(239, 68, 68, 0.05)',
                            border: '1px solid rgba(239, 68, 68, 0.2)',
                            borderRadius: '8px',
                            padding: '0.75rem'
                        }}>
                            <div style={{
                                fontWeight: '600',
                                color: '#dc2626',
                                marginBottom: '0.25rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.25rem'
                            }}>
                                🛡️ Admin-deactivated
                            </div>
                            <div style={{ color: '#374151', fontSize: '0.8rem' }}>
                                Account deactivated by an administrator. Only admins can reactivate these accounts.
                            </div>
                        </div>
                    </div>
                </div>

                <UserTable
                    users={filteredUsers}
                    onUserAction={openConfirmModal}
                    loading={false}
                />
            </main>

            <ConfirmActionModal
                isOpen={showConfirmModal}
                onClose={closeConfirmModal}
                onConfirm={handleUserAction}
                user={selectedUser}
                actionType={actionType}
                loading={actionLoading}
            />

            <style jsx>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
};

export default AdminUsersRefactored;