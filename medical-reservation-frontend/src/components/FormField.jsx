import React from 'react';

const FormField = ({ 
    label, 
    name, 
    type = 'text', 
    value, 
    onChange, 
    required = false, 
    disabled = false,
    readOnly = false,
    placeholder = '',
    minLength,
    children,
    helpText 
}) => {
    const inputStyle = {
        width: '100%',
        padding: '1rem',
        border: disabled || readOnly 
            ? '2px solid rgba(107, 114, 128, 0.15)' 
            : '2px solid rgba(34, 197, 94, 0.2)',
        borderRadius: '12px',
        fontSize: '1rem',
        transition: 'all 0.3s ease',
        background: disabled || readOnly 
            ? 'linear-gradient(135deg, rgba(241, 245, 249, 0.9) 0%, rgba(248, 250, 252, 0.9) 100%)'
            : 'rgba(255, 255, 255, 0.8)',
        color: disabled || readOnly ? '#4b5563' : '#000',
        cursor: disabled || readOnly ? 'not-allowed' : 'text',
        outline: 'none',
        ...(disabled || readOnly ? { boxShadow: 'inset 0 2px 4px rgba(107, 114, 128, 0.05)' } : {})
    };

    const handleFocus = (e) => {
        if (!disabled && !readOnly) {
            e.target.style.borderColor = '#22c55e';
            e.target.style.boxShadow = '0 0 0 3px rgba(34, 197, 94, 0.1)';
        }
    };

    const handleBlur = (e) => {
        if (!disabled && !readOnly) {
            e.target.style.borderColor = 'rgba(34, 197, 94, 0.2)';
            e.target.style.boxShadow = 'none';
        }
    };

    return (
        <div>
            <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                color: disabled || readOnly ? '#6b7280' : '#374151',
                fontWeight: '600',
                fontSize: '0.95rem'
            }}>
                {label} {required && '*'}
            </label>
            
            <div style={{ position: 'relative' }}>
                {children ? (
                    children
                ) : (
                    <input
                        type={type}
                        name={name}
                        value={value}
                        onChange={onChange}
                        required={required}
                        disabled={disabled}
                        readOnly={readOnly}
                        placeholder={placeholder}
                        minLength={minLength}
                        style={inputStyle}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                    />
                )}
                
                {(disabled || readOnly) && (
                    <div style={{
                        position: 'absolute',
                        top: '0',
                        left: '0',
                        right: '0',
                        bottom: '0',
                        background: 'repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(107, 114, 128, 0.02) 2px, rgba(107, 114, 128, 0.02) 4px)',
                        borderRadius: '12px',
                        pointerEvents: 'none'
                    }} />
                )}
            </div>
            
            {helpText && (
                <p style={{
                    fontSize: '0.75rem',
                    color: '#9ca3af',
                    margin: '0.25rem 0 0 0',
                    fontStyle: 'italic',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem'
                }}>
                    {helpText}
                </p>
            )}
        </div>
    );
};

export default FormField;
