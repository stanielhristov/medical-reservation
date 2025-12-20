import { useTranslation } from 'react-i18next';

const UserFilters = ({ 
    searchTerm, 
    onSearchChange, 
    roleFilter, 
    onRoleFilterChange, 
    statusFilter, 
    onStatusFilterChange,
    userCounts = {} 
}) => {
    const { t } = useTranslation();

    const roleOptions = [
        { value: 'all', label: t('adminUsers.allRoles'), count: userCounts.all || 0 },
        { value: 'USER', label: t('adminUsers.patients'), count: userCounts.USER || 0 },
        { value: 'DOCTOR', label: t('adminUsers.doctors'), count: userCounts.DOCTOR || 0 },
        { value: 'ADMIN', label: t('adminUsers.admins'), count: userCounts.ADMIN || 0 }
    ];

    const statusOptions = [
        { value: 'all', label: t('adminUsers.allStatus'), count: userCounts.all || 0 },
        { value: 'active', label: t('adminUsers.active'), count: userCounts.active || 0 },
        { value: 'inactive', label: t('adminUsers.inactive'), count: userCounts.inactive || 0 }
    ];

    return (
        <div style={{
            background: 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(20px)',
            borderRadius: '20px',
            padding: '1.5rem',
            marginBottom: '2rem',
            boxShadow: '0 8px 24px rgba(5, 150, 105, 0.1)',
            border: '1px solid rgba(5, 150, 105, 0.1)'
        }}>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '1rem',
                marginBottom: '1.5rem'
            }}>
                <div>
                    <label style={{
                        display: 'block',
                        marginBottom: '0.5rem',
                        fontWeight: '600',
                        color: '#374151',
                        fontSize: '0.9rem'
                    }}>
                        {t('adminUsers.searchUsers')}
                    </label>
                    <div style={{ position: 'relative' }}>
                        <input
                            type="text"
                            placeholder={t('adminUsers.searchPlaceholder')}
                            value={searchTerm}
                            onChange={(e) => onSearchChange(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '0.75rem 1rem 0.75rem 2.5rem',
                                border: '2px solid rgba(5, 150, 105, 0.2)',
                                borderRadius: '12px',
                                fontSize: '0.9rem',
                                outline: 'none',
                                background: '#f9fafb',
                                boxSizing: 'border-box',
                                transition: 'border-color 0.2s ease'
                            }}
                            onFocus={e => {
                                e.target.style.borderColor = '#059669';
                            }}
                            onBlur={e => {
                                e.target.style.borderColor = 'rgba(5, 150, 105, 0.2)';
                            }}
                        />
                        <span style={{
                            position: 'absolute',
                            left: '0.75rem',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            color: '#6b7280',
                            fontSize: '1rem'
                        }}>
                            🔍
                        </span>
                    </div>
                </div>

                <div>
                    <label style={{
                        display: 'block',
                        marginBottom: '0.5rem',
                        fontWeight: '600',
                        color: '#374151',
                        fontSize: '0.9rem'
                    }}>
                        {t('adminUsers.filterByRole')}
                    </label>
                    <select
                        value={roleFilter}
                        onChange={(e) => onRoleFilterChange(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            border: '2px solid rgba(5, 150, 105, 0.2)',
                            borderRadius: '12px',
                            fontSize: '0.9rem',
                            outline: 'none',
                            background: '#f9fafb',
                            boxSizing: 'border-box',
                            transition: 'border-color 0.2s ease'
                        }}
                        onFocus={e => {
                            e.target.style.borderColor = '#059669';
                        }}
                        onBlur={e => {
                            e.target.style.borderColor = 'rgba(5, 150, 105, 0.2)';
                        }}
                    >
                        {roleOptions.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label} ({option.count})
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label style={{
                        display: 'block',
                        marginBottom: '0.5rem',
                        fontWeight: '600',
                        color: '#374151',
                        fontSize: '0.9rem'
                    }}>
                        {t('adminUsers.filterByStatus')}
                    </label>
                    <select
                        value={statusFilter}
                        onChange={(e) => onStatusFilterChange(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            border: '2px solid rgba(5, 150, 105, 0.2)',
                            borderRadius: '12px',
                            fontSize: '0.9rem',
                            outline: 'none',
                            background: '#f9fafb',
                            boxSizing: 'border-box',
                            transition: 'border-color 0.2s ease'
                        }}
                        onFocus={e => {
                            e.target.style.borderColor = '#059669';
                        }}
                        onBlur={e => {
                            e.target.style.borderColor = 'rgba(5, 150, 105, 0.2)';
                        }}
                    >
                        {statusOptions.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label} ({option.count})
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '1rem'
            }}>
                <div style={{
                    display: 'flex',
                    gap: '1rem',
                    flexWrap: 'wrap'
                }}>
                    {roleOptions.slice(1).map(role => (
                        <div key={role.value} style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            padding: '0.5rem 1rem',
                            background: roleFilter === role.value ? '#059669' : 'rgba(5, 150, 105, 0.1)',
                            color: roleFilter === role.value ? 'white' : '#059669',
                            borderRadius: '20px',
                            fontSize: '0.8rem',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
                        }}
                        onClick={() => onRoleFilterChange(role.value)}
                        onMouseEnter={e => {
                            if (roleFilter !== role.value) {
                                e.target.style.background = 'rgba(5, 150, 105, 0.15)';
                            }
                        }}
                        onMouseLeave={e => {
                            if (roleFilter !== role.value) {
                                e.target.style.background = 'rgba(5, 150, 105, 0.1)';
                            }
                        }}>
                            <span>{role.label}</span>
                            <span style={{
                                background: roleFilter === role.value ? 'rgba(255, 255, 255, 0.2)' : '#059669',
                                color: roleFilter === role.value ? 'white' : 'white',
                                padding: '0.125rem 0.375rem',
                                borderRadius: '10px',
                                fontSize: '0.7rem'
                            }}>
                                {role.count}
                            </span>
                        </div>
                    ))}
                </div>

                <div style={{
                    fontSize: '0.9rem',
                    color: '#6b7280',
                    fontWeight: '500'
                }}>
                    {t('adminUsers.totalUsers')}: {userCounts.all || 0}
                </div>
            </div>
        </div>
    );
};

export default UserFilters;
