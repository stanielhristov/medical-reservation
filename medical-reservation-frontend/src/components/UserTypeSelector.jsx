const UserTypeSelector = ({ value, onChange, disabled }) => {
    return (
        <div style={{ marginBottom: '2rem' }}>
            <label style={{
                display: 'block',
                marginBottom: '0.75rem',
                fontWeight: '600',
                color: '#374151',
                fontSize: '1rem'
            }}>
                I want to register as:
            </label>
            <div style={{ display: 'flex', gap: '1rem' }}>
                <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '1rem 1.5rem',
                    border: `2px solid ${value === 'USER' ? '#22c55e' : '#e5e7eb'}`,
                    borderRadius: '12px',
                    cursor: 'pointer',
                    backgroundColor: value === 'USER' ? 'rgba(34, 197, 94, 0.05)' : '#f9fafb',
                    transition: 'all 0.2s ease',
                    flex: 1,
                    justifyContent: 'center'
                }}>
                    <input
                        type="radio"
                        name="userType"
                        value="USER"
                        checked={value === 'USER'}
                        onChange={(e) => onChange(e.target.value)}
                        disabled={disabled}
                        style={{ display: 'none' }}
                    />
                    <span style={{ fontSize: '1.25rem' }}>👤</span>
                    <span style={{ fontWeight: '500', fontSize: '0.95rem' }}>Patient</span>
                </label>
                <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '1rem 1.5rem',
                    border: `2px solid ${value === 'DOCTOR' ? '#22c55e' : '#e5e7eb'}`,
                    borderRadius: '12px',
                    cursor: 'pointer',
                    backgroundColor: value === 'DOCTOR' ? 'rgba(34, 197, 94, 0.05)' : '#f9fafb',
                    transition: 'all 0.2s ease',
                    flex: 1,
                    justifyContent: 'center'
                }}>
                    <input
                        type="radio"
                        name="userType"
                        value="DOCTOR"
                        checked={value === 'DOCTOR'}
                        onChange={(e) => onChange(e.target.value)}
                        disabled={disabled}
                        style={{ display: 'none' }}
                    />
                    <span style={{ fontSize: '1.25rem' }}>👨‍⚕️</span>
                    <span style={{ fontWeight: '500', fontSize: '0.95rem' }}>Doctor</span>
                </label>
            </div>
        </div>
    );
};

export default UserTypeSelector;
