import { useTranslation } from 'react-i18next';

const UserTable = ({ users, onUserAction, loading }) => {
    const { t, i18n } = useTranslation();

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString(i18n.language === 'bg' ? 'bg-BG' : 'en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getRoleStyle = (role) => {
        switch (role) {
            case 'ADMIN': 
                return { 
                    background: 'rgba(220, 38, 38, 0.1)', 
                    color: '#dc2626'
                };
            case 'DOCTOR': 
                return { 
                    background: 'rgba(139, 92, 246, 0.1)', 
                    color: '#8b5cf6'
                };
            case 'USER': 
                return { 
                    background: 'rgba(59, 130, 246, 0.1)', 
                    color: '#3b82f6'
                };
            default: 
                return { 
                    background: 'rgba(107, 114, 128, 0.1)', 
                    color: '#6b7280'
                };
        }
    };

    if (loading) {
        return (
            <div style={{
                background: 'rgba(255, 255, 255, 0.98)',
                backdropFilter: 'blur(20px)',
                borderRadius: '20px',
                padding: '3rem',
                textAlign: 'center',
                boxShadow: '0 8px 24px rgba(5, 150, 105, 0.1)',
                border: '1px solid rgba(5, 150, 105, 0.1)'
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
                <p style={{ color: '#6b7280', margin: 0 }}>{t('loading.loadingUsers')}</p>
            </div>
        );
    }

    if (users.length === 0) {
        return (
            <div style={{
                background: 'rgba(255, 255, 255, 0.98)',
                backdropFilter: 'blur(20px)',
                borderRadius: '20px',
                padding: '3rem',
                textAlign: 'center',
                boxShadow: '0 8px 24px rgba(5, 150, 105, 0.1)',
                border: '1px solid rgba(5, 150, 105, 0.1)'
            }}>
                <div style={{
                    width: '80px',
                    height: '80px',
                    background: 'rgba(5, 150, 105, 0.1)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1.5rem',
                    fontSize: '2rem'
                                }}>
                                    👥
                                </div>
                <h3 style={{
                    fontSize: '1.5rem',
                    fontWeight: '600',
                    color: '#374151',
                    margin: '0 0 1rem'
                }}>
                    {t('adminUsers.noUsersFound')}
                </h3>
                <p style={{
                    color: '#6b7280',
                    margin: 0,
                    fontSize: '1rem'
                }}>
                    {t('adminUsers.noUsersMatchFilter')}
                </p>
            </div>
        );
    }

    return (
        <div style={{
            background: 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(20px)',
            borderRadius: '20px',
            boxShadow: '0 8px 24px rgba(5, 150, 105, 0.1)',
            border: '1px solid rgba(5, 150, 105, 0.1)',
            overflow: 'hidden'
        }}>
            <div style={{
                padding: '1.5rem 2rem',
                borderBottom: '1px solid rgba(5, 150, 105, 0.1)',
                background: 'rgba(5, 150, 105, 0.02)'
            }}>
                <h3 style={{
                    fontSize: '1.3rem',
                    fontWeight: '700',
                    color: '#374151',
                    margin: 0,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                }}>
                    {t('adminUsers.users')} ({users.length})
                </h3>
            </div>

            <div style={{ overflowX: 'auto' }}>
                <table style={{
                    width: '100%',
                    borderCollapse: 'collapse'
                }}>
                    <thead>
                        <tr style={{
                            background: 'rgba(5, 150, 105, 0.05)',
                            borderBottom: '1px solid rgba(5, 150, 105, 0.1)'
                        }}>
                            <th style={{
                                padding: '1rem',
                                textAlign: 'left',
                                fontWeight: '600',
                                color: '#374151',
                                fontSize: '0.9rem'
                            }}>
                                {t('adminUsers.user')}
                            </th>
                            <th style={{
                                padding: '1rem',
                                textAlign: 'left',
                                fontWeight: '600',
                                color: '#374151',
                                fontSize: '0.9rem'
                            }}>
                                {t('adminUsers.role')}
                            </th>
                            <th style={{
                                padding: '1rem',
                                textAlign: 'left',
                                fontWeight: '600',
                                color: '#374151',
                                fontSize: '0.9rem'
                            }}>
                                {t('common.status')}
                            </th>
                            <th style={{
                                padding: '1rem',
                                textAlign: 'left',
                                fontWeight: '600',
                                color: '#374151',
                                fontSize: '0.9rem'
                            }}>
                                {t('adminUsers.joined')}
                            </th>
                            <th style={{
                                padding: '1rem',
                                textAlign: 'left',
                                fontWeight: '600',
                                color: '#374151',
                                fontSize: '0.9rem'
                            }}>
                                {t('common.actions')}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => {
                            const roleStyle = getRoleStyle(user.role);
                            
                            return (
                                <tr key={user.id} style={{
                                    borderBottom: index < users.length - 1 ? '1px solid rgba(5, 150, 105, 0.05)' : 'none',
                                    transition: 'background 0.2s ease'
                                }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.background = 'rgba(5, 150, 105, 0.02)';
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.background = 'transparent';
                                }}>
                                    <td style={{ padding: '1rem' }}>
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.75rem'
                                        }}>
                                            <div style={{
                                                width: '40px',
                                                height: '40px',
                                                background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                                                borderRadius: '10px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                color: 'white',
                                                fontSize: '0.9rem',
                                                fontWeight: '600'
                                            }}>
                                                {user.fullName ? user.fullName.split(' ').map(n => n[0]).join('') : 'U'}
                                            </div>
                                            <div>
                                                <div style={{
                                                    fontWeight: '600',
                                                    color: '#374151',
                                                    fontSize: '0.9rem'
                                                }}>
                                                    {user.fullName || t('adminUsers.unknownUser')}
                                                </div>
                                                <div style={{
                                                    color: '#6b7280',
                                                    fontSize: '0.8rem'
                                                }}>
                                                    {user.email}
                                                </div>
                                                {user.phoneNumber && (
                                                    <div style={{
                                                        color: '#6b7280',
                                                        fontSize: '0.75rem'
                                                    }}>
                                                        {user.phoneNumber}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </td>
                                    
                                    <td style={{ padding: '1rem' }}>
                                        <span style={{
                                            padding: '0.375rem 0.75rem',
                                            borderRadius: '20px',
                                            fontSize: '0.75rem',
                                            fontWeight: '600',
                                            background: roleStyle.background,
                                            color: roleStyle.color,
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '0.25rem'
                                        }}>
                                            {user.role ? t(`adminUsers.role${user.role}`) : t('adminUsers.unknown')}
                                        </span>
                                    </td>
                                    
                                    <td style={{ padding: '1rem' }}>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', alignItems: 'flex-start' }}>
                                            <span style={{
                                                padding: '0.375rem 0.75rem',
                                                borderRadius: '20px',
                                                fontSize: '0.75rem',
                                                fontWeight: '600',
                                                background: user.isActive ? 'rgba(34, 197, 94, 0.1)' : 'rgba(107, 114, 128, 0.1)',
                                                color: user.isActive ? '#22c55e' : '#6b7280',
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                gap: '0.25rem',
                                                width: 'fit-content'
                                            }}>
                                                {user.isActive ? t('adminUsers.active') : t('adminUsers.inactive')}
                                            </span>
                                            {!user.isActive && user.deactivationType && (
                                                <span style={{
                                                    padding: '0.25rem 0.5rem',
                                                    borderRadius: '12px',
                                                    fontSize: '0.65rem',
                                                    fontWeight: '500',
                                                    background: user.deactivationType === 'SELF_DEACTIVATED' 
                                                        ? 'rgba(245, 158, 11, 0.1)' 
                                                        : 'rgba(239, 68, 68, 0.1)',
                                                    color: user.deactivationType === 'SELF_DEACTIVATED' 
                                                        ? '#d97706' 
                                                        : '#dc2626',
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    gap: '0.25rem',
                                                    width: 'fit-content'
                                                }}>
                                                    {user.deactivationType === 'SELF_DEACTIVATED' 
                                                        ? `👤 ${t('admin.selfDeactivated')}` 
                                                        : `🛡️ ${t('admin.adminDeactivated')}`}
                                                </span>
                                            )}
                                        </div>
                                    </td>
                                    
                                    <td style={{ padding: '1rem' }}>
                                        <div style={{
                                            color: '#6b7280',
                                            fontSize: '0.8rem'
                                        }}>
                                            {formatDate(user.createdAt)}
                                        </div>
                                    </td>
                                    
                                    <td style={{ padding: '1rem' }}>
                                        <div style={{
                                            display: 'flex',
                                            gap: '0.5rem'
                                        }}>
                                            {user.isActive ? (
                                                <button
                                                    onClick={() => onUserAction(user, 'deactivate')}
                                                    style={{
                                                        background: 'rgba(239, 68, 68, 0.1)',
                                                        border: '1px solid rgba(239, 68, 68, 0.2)',
                                                        borderRadius: '6px',
                                                        padding: '0.375rem 0.75rem',
                                                        cursor: 'pointer',
                                                        color: '#dc2626',
                                                        fontSize: '0.75rem',
                                                        fontWeight: '500',
                                                        transition: 'all 0.2s ease',
                                                        minWidth: '85px',
                                                        textAlign: 'center'
                                                    }}
                                                    onMouseEnter={e => {
                                                        e.target.style.background = 'rgba(239, 68, 68, 0.15)';
                                                    }}
                                                    onMouseLeave={e => {
                                                        e.target.style.background = 'rgba(239, 68, 68, 0.1)';
                                                    }}
                                                >
                                                    {t('admin.deactivate')}
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => onUserAction(user, 'activate')}
                                                    style={{
                                                        background: 'rgba(34, 197, 94, 0.1)',
                                                        border: '1px solid rgba(34, 197, 94, 0.2)',
                                                        borderRadius: '6px',
                                                        padding: '0.375rem 0.75rem',
                                                        cursor: 'pointer',
                                                        color: '#16a34a',
                                                        fontSize: '0.75rem',
                                                        fontWeight: '500',
                                                        transition: 'all 0.2s ease',
                                                        minWidth: '85px',
                                                        textAlign: 'center'
                                                    }}
                                                    onMouseEnter={e => {
                                                        e.target.style.background = 'rgba(34, 197, 94, 0.15)';
                                                    }}
                                                    onMouseLeave={e => {
                                                        e.target.style.background = 'rgba(34, 197, 94, 0.1)';
                                                    }}
                                                >
                                                    {t('admin.activate')}
                                                </button>
                                            )}
                                            
                                            <button
                                                onClick={() => onUserAction(user, 'delete')}
                                                style={{
                                                    background: 'rgba(239, 68, 68, 0.1)',
                                                    border: '1px solid rgba(239, 68, 68, 0.2)',
                                                    borderRadius: '6px',
                                                    padding: '0.375rem 0.75rem',
                                                    cursor: 'pointer',
                                                    color: '#dc2626',
                                                    fontSize: '0.75rem',
                                                    fontWeight: '500',
                                                    transition: 'all 0.2s ease',
                                                    minWidth: '85px',
                                                    textAlign: 'center'
                                                }}
                                                onMouseEnter={e => {
                                                    e.target.style.background = 'rgba(239, 68, 68, 0.15)';
                                                }}
                                                onMouseLeave={e => {
                                                    e.target.style.background = 'rgba(239, 68, 68, 0.1)';
                                                }}
                                                title={t('admin.deleteUser')}
                                            >
                                                {t('common.delete')}
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserTable;
