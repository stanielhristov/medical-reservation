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
                        color: '#10b981',
                        padding: '0.25rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    {showPassword ? (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                            <line x1="1" y1="1" x2="23" y2="23"/>
                        </svg>
                    ) : (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                            <circle cx="12" cy="12" r="3"/>
                        </svg>
                    )}
                </button>
            </div>
        </div>
    );
};

export default PasswordInput;
