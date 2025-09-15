import { useValidation } from '../hooks/useValidation';

const DateOfBirthInput = ({ value, onChange, disabled, error }) => {
    const { calculateAge } = useValidation();

    return (
        <div style={{ marginBottom: '1.25rem' }}>
            <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: '500',
                color: '#374151',
                fontSize: '0.9rem'
            }}>
                📅 Date of Birth <span style={{ color: '#dc2626' }}>*</span>
            </label>
            <div style={{ position: 'relative' }}>
                <input
                    type="date"
                    value={value}
                    onChange={onChange}
                    required
                    disabled={disabled}
                    style={{
                        width: '100%',
                        padding: '0.875rem 1rem',
                        border: error ? '2px solid #ef4444' : '1px solid #e5e7eb',
                        borderRadius: '12px',
                        fontSize: '0.95rem',
                        background: '#f9fafb',
                        outline: 'none',
                        boxSizing: 'border-box',
                        color: '#374151',
                        transition: 'all 0.2s ease',
                        paddingRight: '3rem'
                    }}
                    max={new Date(new Date().setFullYear(new Date().getFullYear() - 18)).toISOString().split('T')[0]}
                />
                {value && calculateAge(value) !== null && (
                    <div style={{
                        position: 'absolute',
                        right: '1rem',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: '#10b981',
                        color: 'white',
                        padding: '0.25rem 0.5rem',
                        borderRadius: '8px',
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        pointerEvents: 'none'
                    }}>
                        {calculateAge(value)} years
                    </div>
                )}
            </div>
            {error && (
                <div style={{
                    marginTop: '0.5rem',
                    color: '#ef4444',
                    fontSize: '0.875rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem'
                }}>
                    ⚠️ {error}
                </div>
            )}
            {value && !error && calculateAge(value) !== null && (
                <div style={{
                    marginTop: '0.5rem',
                    color: '#10b981',
                    fontSize: '0.875rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem'
                }}>
                    ✓ Age: {calculateAge(value)} years old
                </div>
            )}
        </div>
    );
};

export default DateOfBirthInput;
