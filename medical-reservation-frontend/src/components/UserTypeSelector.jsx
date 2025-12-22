import { useTranslation } from 'react-i18next';

const UserTypeSelector = ({ value, onChange, disabled }) => {
    const { t } = useTranslation();
    
    const PatientIcon = ({ isSelected }) => (
        <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            background: isSelected 
                ? 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)'
                : 'rgba(34, 197, 94, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease'
        }}>
            <svg 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke={isSelected ? 'white' : '#22c55e'}
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
            >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
            </svg>
        </div>
    );

    const DoctorIcon = ({ isSelected }) => (
        <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            background: isSelected 
                ? 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)'
                : 'rgba(34, 197, 94, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease'
        }}>
            <svg 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke={isSelected ? 'white' : '#22c55e'}
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
            >
                <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"/>
                <path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4"/>
                <circle cx="20" cy="10" r="2"/>
            </svg>
        </div>
    );
    
    return (
        <div style={{ marginBottom: '2rem' }}>
            <label style={{
                display: 'block',
                marginBottom: '1rem',
                fontWeight: '600',
                color: '#374151',
                fontSize: '1rem'
            }}>
                {t('auth.iWantToRegisterAs')}
            </label>
            <div style={{ display: 'flex', gap: '1rem' }}>
                <label style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '1.5rem',
                    border: `2px solid ${value === 'USER' ? '#22c55e' : '#e5e7eb'}`,
                    borderRadius: '16px',
                    cursor: disabled ? 'not-allowed' : 'pointer',
                    backgroundColor: value === 'USER' ? 'rgba(34, 197, 94, 0.05)' : '#f9fafb',
                    transition: 'all 0.2s ease',
                    flex: 1,
                    opacity: disabled ? 0.6 : 1,
                    boxShadow: value === 'USER' ? '0 4px 12px rgba(34, 197, 94, 0.15)' : 'none'
                }}
                onMouseEnter={e => {
                    if (!disabled && value !== 'USER') {
                        e.currentTarget.style.borderColor = 'rgba(34, 197, 94, 0.5)';
                        e.currentTarget.style.backgroundColor = 'rgba(34, 197, 94, 0.02)';
                    }
                }}
                onMouseLeave={e => {
                    if (!disabled && value !== 'USER') {
                        e.currentTarget.style.borderColor = '#e5e7eb';
                        e.currentTarget.style.backgroundColor = '#f9fafb';
                    }
                }}
                >
                    <input
                        type="radio"
                        name="userType"
                        value="USER"
                        checked={value === 'USER'}
                        onChange={(e) => onChange(e.target.value)}
                        disabled={disabled}
                        style={{ display: 'none' }}
                    />
                    <PatientIcon isSelected={value === 'USER'} />
                    <span style={{ 
                        fontWeight: '600', 
                        fontSize: '1rem',
                        color: value === 'USER' ? '#16a34a' : '#374151'
                    }}>
                        {t('auth.patient')}
                    </span>
                </label>
                <label style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '1.5rem',
                    border: `2px solid ${value === 'DOCTOR' ? '#22c55e' : '#e5e7eb'}`,
                    borderRadius: '16px',
                    cursor: disabled ? 'not-allowed' : 'pointer',
                    backgroundColor: value === 'DOCTOR' ? 'rgba(34, 197, 94, 0.05)' : '#f9fafb',
                    transition: 'all 0.2s ease',
                    flex: 1,
                    opacity: disabled ? 0.6 : 1,
                    boxShadow: value === 'DOCTOR' ? '0 4px 12px rgba(34, 197, 94, 0.15)' : 'none'
                }}
                onMouseEnter={e => {
                    if (!disabled && value !== 'DOCTOR') {
                        e.currentTarget.style.borderColor = 'rgba(34, 197, 94, 0.5)';
                        e.currentTarget.style.backgroundColor = 'rgba(34, 197, 94, 0.02)';
                    }
                }}
                onMouseLeave={e => {
                    if (!disabled && value !== 'DOCTOR') {
                        e.currentTarget.style.borderColor = '#e5e7eb';
                        e.currentTarget.style.backgroundColor = '#f9fafb';
                    }
                }}
                >
                    <input
                        type="radio"
                        name="userType"
                        value="DOCTOR"
                        checked={value === 'DOCTOR'}
                        onChange={(e) => onChange(e.target.value)}
                        disabled={disabled}
                        style={{ display: 'none' }}
                    />
                    <DoctorIcon isSelected={value === 'DOCTOR'} />
                    <span style={{ 
                        fontWeight: '600', 
                        fontSize: '1rem',
                        color: value === 'DOCTOR' ? '#16a34a' : '#374151'
                    }}>
                        {t('auth.doctor')}
                    </span>
                </label>
            </div>
        </div>
    );
};

export default UserTypeSelector;
