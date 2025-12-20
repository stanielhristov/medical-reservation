import React from 'react';
import { useTranslation } from 'react-i18next';

const RecentUsersSection = ({ recentUsers, getRoleColor, getStatusColor, formatDate, onNavigation }) => {
    const { t } = useTranslation();
    
    const getRoleTranslation = (role) => {
        const roleUpper = role?.toUpperCase();
        switch (roleUpper) {
            case 'DOCTOR':
                return t('doctors.title');
            case 'PATIENT':
            case 'USER':
                return t('patients.title');
            case 'ADMIN':
                return t('admin.title');
            default:
                
                const roleLower = role?.toLowerCase();
                if (roleLower === 'doctor') return t('doctors.title');
                if (roleLower === 'patient') return t('patients.title');
                if (roleLower === 'admin') return t('admin.title');
                return role;
        }
    };
    
    const getStatusTranslation = (status) => {
        const statusLower = status?.toLowerCase();
        switch (statusLower) {
            case 'active':
                return t('patients.active');
            case 'inactive':
                return t('profile.inactive');
            default:
                return status;
        }
    };
    return (
        <section style={{
            background: 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(20px)',
            borderRadius: '24px',
            padding: '2.5rem',
            marginBottom: '2rem',
            boxShadow: '0 20px 40px rgba(34, 197, 94, 0.12), 0 16px 32px rgba(0, 0, 0, 0.06)',
            border: '1px solid rgba(34, 197, 94, 0.15)'
        }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '2rem'
            }}>
                <h2 style={{
                    fontSize: '1.8rem',
                    fontWeight: '700',
                    color: '#374151',
                    margin: 0,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem'
                }}>
                    <span style={{
                        width: '40px',
                        height: '40px',
                        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.2rem'
                    }}>
                        👥
                    </span>
                    {t('admin.recentUsers')}
                </h2>
                
                <button
                    onClick={() => onNavigation('/admin/users')}
                    style={{
                        padding: '0.75rem 1.5rem',
                        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '12px',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                    }}
                    onMouseEnter={e => {
                        e.target.style.transform = 'translateY(-2px)';
                        e.target.style.boxShadow = '0 6px 20px rgba(16, 185, 129, 0.4)';
                    }}
                    onMouseLeave={e => {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = '0 4px 12px rgba(16, 185, 129, 0.3)';
                    }}
                >
                    {t('admin.viewAllUsers')}
                    <span>→</span>
                </button>
            </div>

            {recentUsers.length === 0 ? (
                <div style={{
                    textAlign: 'center',
                    padding: '3rem',
                    color: '#6b7280'
                }}>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem', opacity: 0.5 }}>👤</div>
                    <p style={{ fontSize: '1.1rem', fontWeight: '500', margin: 0 }}>
                        {t('admin.noRecentUsersFound')}
                    </p>
                </div>
            ) : (
                <div style={{
                    display: 'grid',
                    gap: '1rem'
                }}>
                    {recentUsers.map(user => {
                        const roleColors = getRoleColor(user.role);
                        
                        const isActive = user.isActive !== undefined ? user.isActive : (user.status?.toLowerCase() === 'active');
                        const statusColors = isActive 
                            ? { bg: 'rgba(34, 197, 94, 0.1)', color: '#16a34a', border: 'rgba(34, 197, 94, 0.2)' }
                            : { bg: 'rgba(239, 68, 68, 0.1)', color: '#dc2626', border: 'rgba(239, 68, 68, 0.2)' };
                        
                        return (
                            <div
                                key={user.id}
                                style={{
                                    background: 'rgba(249, 250, 251, 0.8)',
                                    borderRadius: '16px',
                                    padding: '1.5rem',
                                    border: '1px solid rgba(229, 231, 235, 0.6)',
                                    transition: 'all 0.3s ease',
                                    cursor: 'pointer'
                                }}
                                onMouseEnter={e => {
                                    e.target.style.background = 'rgba(243, 244, 246, 0.9)';
                                    e.target.style.transform = 'translateY(-2px)';
                                    e.target.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.08)';
                                }}
                                onMouseLeave={e => {
                                    e.target.style.background = 'rgba(249, 250, 251, 0.8)';
                                    e.target.style.transform = 'translateY(0)';
                                    e.target.style.boxShadow = 'none';
                                }}
                                onClick={() => onNavigation(`/admin/users/${user.id}`)}
                            >
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'flex-start',
                                    gap: '1rem'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1 }}>
                                        <div style={{
                                            width: '50px',
                                            height: '50px',
                                            background: 'linear-gradient(135deg, #6b7280 0%, #4b5563 100%)',
                                            borderRadius: '12px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '1.5rem',
                                            color: 'white',
                                            boxShadow: '0 4px 12px rgba(107, 114, 128, 0.3)'
                                        }}>
                                            {user.role === 'DOCTOR' ? '👩‍⚕️' : user.role === 'PATIENT' ? '🏥' : '👤'}
                                        </div>
                                        
                                        <div style={{ flex: 1 }}>
                                            <h4 style={{
                                                fontSize: '1.1rem',
                                                fontWeight: '600',
                                                color: '#374151',
                                                margin: '0 0 0.25rem'
                                            }}>
                                                {user.fullName}
                                            </h4>
                                            <p style={{
                                                fontSize: '0.9rem',
                                                color: '#6b7280',
                                                margin: '0 0 0.5rem'
                                            }}>
                                                {user.email}
                                            </p>
                                            <p style={{
                                                fontSize: '0.8rem',
                                                color: '#9ca3af',
                                                margin: 0
                                            }}>
                                                {t('admin.joined')} {formatDate(user.createdAt)}
                                            </p>
                                        </div>
                                    </div>
                                    
                                    <div style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '0.5rem',
                                        alignItems: 'flex-end'
                                    }}>
                                        <div style={{
                                            background: roleColors.bg,
                                            color: roleColors.color,
                                            padding: '0.4rem 0.8rem',
                                            borderRadius: '8px',
                                            fontSize: '0.75rem',
                                            fontWeight: '600',
                                            border: `1px solid ${roleColors.border}`,
                                            textTransform: 'capitalize',
                                            minWidth: '70px',
                                            textAlign: 'center'
                                        }}>
                                            {getRoleTranslation(user.role)}
                                        </div>
                                        
                                        <div style={{
                                            background: statusColors.bg,
                                            color: statusColors.color,
                                            padding: '0.4rem 0.8rem',
                                            borderRadius: '8px',
                                            fontSize: '0.75rem',
                                            fontWeight: '600',
                                            border: `1px solid ${statusColors.border}`,
                                            textTransform: 'capitalize',
                                            minWidth: '70px',
                                            textAlign: 'center'
                                        }}>
                                            {isActive ? t('patients.active') : t('profile.inactive')}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </section>
    );
};

export default RecentUsersSection;
