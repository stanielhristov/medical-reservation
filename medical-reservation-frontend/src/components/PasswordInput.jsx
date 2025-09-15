import { useState } from 'react';

const PasswordInput = ({ 
    label, 
    value, 
    onChange, 
    placeholder, 
    required = false, 
    disabled = false 
}) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div style={{ marginBottom: '1.25rem' }}>
            <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: '500',
                color: '#374151',
                fontSize: '0.9rem'
            }}>
                {label} {required && <span style={{ color: '#dc2626' }}>*</span>}
            </label>
            <div style={{
                position: 'relative',
                background: '#f9fafb',
                borderRadius: '12px',
                border: '1px solid #e5e7eb',
                transition: 'all 0.2s ease'
            }}>
                <input
                    type={showPassword ? "text" : "password"}
                    value={value}
                    onChange={onChange}
                    required={required}
                    disabled={disabled}
                    style={{
                        width: '100%',
                        padding: '0.875rem 3rem 0.875rem 1rem',
                        border: 'none',
                        borderRadius: '12px',
                        fontSize: '0.95rem',
                        background: 'transparent',
                        outline: 'none',
                        boxSizing: 'border-box',
                        color: '#374151'
                    }}
                    placeholder={placeholder}
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                        position: 'absolute',
                        right: '1rem',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '1.1rem',
                        color: '#9ca3af',
                        padding: '0.25rem'
                    }}
                >
                    {showPassword ? '🙈' : '👁️'}
                </button>
            </div>
        </div>
    );
};

export default PasswordInput;
