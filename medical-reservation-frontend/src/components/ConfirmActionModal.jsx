import { useTranslation } from 'react-i18next';

const ConfirmActionModal = ({ 
    isOpen, 
    onClose, 
    onConfirm, 
    user = null, 
    actionType = '', 
    loading = false 
}) => {
    const { t } = useTranslation();

    if (!isOpen || !user) return null;

    const userName = user.fullName || user.email;

    const getActionConfig = (action) => {
        switch (action) {
            case 'activate':
                return {
                    title: t('adminUsers.activateUserAccount'),
                    message: t('adminUsers.confirmActivate', { name: userName }),
                    confirmText: t('admin.activate'),
                    confirmColor: '#16a34a',
                    icon: '✅'
                };
            case 'deactivate':
                return {
                    title: t('adminUsers.deactivateUserAccount'),
                    message: t('adminUsers.confirmDeactivate', { name: userName }),
                    confirmText: t('admin.deactivate'),
                    confirmColor: '#dc2626',
                    icon: '⏸️'
                };
            case 'delete':
                return {
                    title: t('adminUsers.deleteUserAccount'),
                    message: t('adminUsers.confirmDelete', { name: userName }),
                    confirmText: t('common.delete'),
                    confirmColor: '#dc2626',
                    icon: '🗑️'
                };
            default:
                return {
                    title: t('adminUsers.confirmAction'),
                    message: t('adminUsers.confirmActionMessage'),
                    confirmText: t('common.confirm'),
                    confirmColor: '#059669',
                    icon: '❓'
                };
        }
    };

    const config = getActionConfig(actionType);

    return (
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
            zIndex: 1000,
            padding: '1rem'
        }}>
            <div style={{
                background: 'white',
                borderRadius: '20px',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
                maxWidth: '500px',
                width: '100%',
                position: 'relative'
            }}>
                <div style={{ padding: '2rem' }}>
                    <button
                        onClick={onClose}
                        disabled={loading}
                        style={{
                            position: 'absolute',
                            top: '1rem',
                            right: '1rem',
                            background: 'none',
                            border: 'none',
                            fontSize: '1.5rem',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            color: '#6b7280',
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'background 0.2s ease',
                            opacity: loading ? 0.5 : 1
                        }}
                        onMouseEnter={e => {
                            if (!loading) {
                                e.target.style.background = 'rgba(107, 114, 128, 0.1)';
                            }
                        }}
                        onMouseLeave={e => {
                            if (!loading) {
                                e.target.style.background = 'none';
                            }
                        }}
                    >
                        ✕
                    </button>

                    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                        <div style={{
                            width: '80px',
                            height: '80px',
                            background: actionType === 'activate' 
                                ? 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)'
                                : 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
                            borderRadius: '16px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '2rem',
                            margin: '0 auto 1rem',
                            color: 'white'
                        }}>
                            {config.icon}
                        </div>
                        <h3 style={{
                            fontSize: '1.5rem',
                            fontWeight: '700',
                            color: '#374151',
                            margin: '0 0 0.5rem'
                        }}>
                            {config.title}
                        </h3>
                        <p style={{ 
                            color: '#6b7280', 
                            margin: 0,
                            lineHeight: '1.5'
                        }}>
                            {config.message}
                        </p>
                    </div>

                    <div style={{
                        background: 'rgba(107, 114, 128, 0.05)',
                        borderRadius: '12px',
                        padding: '1rem',
                        marginBottom: '2rem'
                    }}>
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
                                <div style={{
                                    display: 'flex',
                                    gap: '0.5rem',
                                    marginTop: '0.25rem'
                                }}>
                                    <span style={{
                                        padding: '0.125rem 0.5rem',
                                        borderRadius: '12px',
                                        fontSize: '0.7rem',
                                        fontWeight: '600',
                                        background: user.role === 'ADMIN' ? 'rgba(220, 38, 38, 0.1)' :
                                                   user.role === 'DOCTOR' ? 'rgba(139, 92, 246, 0.1)' :
                                                   'rgba(59, 130, 246, 0.1)',
                                        color: user.role === 'ADMIN' ? '#dc2626' :
                                              user.role === 'DOCTOR' ? '#8b5cf6' :
                                              '#3b82f6'
                                    }}>
                                        {user.role ? t(`adminUsers.role${user.role}`) : t('adminUsers.unknown')}
                                    </span>
                                    <span style={{
                                        padding: '0.125rem 0.5rem',
                                        borderRadius: '12px',
                                        fontSize: '0.7rem',
                                        fontWeight: '600',
                                        background: user.isActive ? 'rgba(34, 197, 94, 0.1)' : 'rgba(107, 114, 128, 0.1)',
                                        color: user.isActive ? '#22c55e' : '#6b7280'
                                    }}>
                                        {user.isActive ? t('adminUsers.active') : t('adminUsers.inactive')}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style={{ 
                        display: 'flex', 
                        gap: '1rem',
                        justifyContent: 'flex-end'
                    }}>
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={loading}
                            style={{
                                padding: '0.75rem 1.5rem',
                                background: 'rgba(107, 114, 128, 0.1)',
                                color: '#6b7280',
                                border: '1px solid rgba(107, 114, 128, 0.2)',
                                borderRadius: '8px',
                                cursor: loading ? 'not-allowed' : 'pointer',
                                fontWeight: '500',
                                fontSize: '1rem',
                                transition: 'all 0.2s ease',
                                opacity: loading ? 0.5 : 1
                            }}
                            onMouseEnter={e => {
                                if (!loading) {
                                    e.target.style.background = 'rgba(107, 114, 128, 0.15)';
                                }
                            }}
                            onMouseLeave={e => {
                                if (!loading) {
                                    e.target.style.background = 'rgba(107, 114, 128, 0.1)';
                                }
                            }}
                        >
                            {t('common.cancel')}
                        </button>
                        
                        <button
                            type="button"
                            onClick={() => onConfirm(actionType, user.id)}
                            disabled={loading}
                            style={{
                                padding: '0.75rem 1.5rem',
                                background: loading 
                                    ? 'rgba(107, 114, 128, 0.3)'
                                    : config.confirmColor,
                                color: 'white',
                                border: 'none',
                                borderRadius: '8px',
                                cursor: loading ? 'not-allowed' : 'pointer',
                                fontWeight: '600',
                                fontSize: '1rem',
                                transition: 'all 0.2s ease',
                                boxShadow: loading 
                                    ? 'none'
                                    : `0 4px 12px ${config.confirmColor}30`,
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}
                            onMouseEnter={e => {
                                if (!loading) {
                                    e.target.style.transform = 'translateY(-1px)';
                                    e.target.style.boxShadow = `0 6px 16px ${config.confirmColor}40`;
                                }
                            }}
                            onMouseLeave={e => {
                                if (!loading) {
                                    e.target.style.transform = 'translateY(0)';
                                    e.target.style.boxShadow = `0 4px 12px ${config.confirmColor}30`;
                                }
                            }}
                        >
                            {loading && (
                                <div style={{
                                    width: '16px',
                                    height: '16px',
                                    border: '2px solid rgba(255, 255, 255, 0.3)',
                                    borderTop: '2px solid white',
                                    borderRadius: '50%',
                                    animation: 'spin 1s linear infinite'
                                }} />
                            )}
                            {loading ? t('admin.processing') : config.confirmText}
                        </button>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
};

export default ConfirmActionModal;
