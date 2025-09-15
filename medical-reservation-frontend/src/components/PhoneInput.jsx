import { useCallback, useMemo } from 'react';
import { COUNTRIES, COUNTRY_MAP } from '../utils/countryData';

const PhoneInput = ({ 
    label, 
    value, 
    onChange, 
    countryCode, 
    onCountryChange, 
    disabled, 
    required = false, 
    placeholder 
}) => {
    const selectedCountry = useMemo(() =>
        COUNTRY_MAP.get(countryCode) || COUNTRIES[0], 
        [countryCode]
    );
    
    const handleCountryChange = useCallback((e) => {
        onCountryChange(e.target.value);
    }, [onCountryChange]);
    
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
            <div style={{ display: 'flex', gap: '0.5rem' }}>
                <div style={{ position: 'relative', minWidth: '120px' }}>
                    <select
                        value={countryCode}
                        onChange={handleCountryChange}
                        disabled={disabled}
                        style={{
                            width: '100%',
                            padding: '0.875rem 0.5rem',
                            border: '1px solid #e5e7eb',
                            borderRadius: '12px',
                            fontSize: '0.9rem',
                            background: '#f9fafb',
                            outline: 'none',
                            boxSizing: 'border-box',
                            color: '#374151',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
                        }}
                    >
                        {COUNTRIES.map(country => (
                            <option key={country.code} value={country.code}>
                                {country.flag} {country.name}
                            </option>
                        ))}
                    </select>
                </div>
                
                <input
                    type="tel"
                    value={value}
                    onChange={onChange}
                    required={required}
                    disabled={disabled}
                    style={{
                        flex: 1,
                        padding: '0.875rem 1rem',
                        border: '1px solid #e5e7eb',
                        borderRadius: '12px',
                        fontSize: '0.95rem',
                        background: '#f9fafb',
                        outline: 'none',
                        boxSizing: 'border-box',
                        color: '#374151',
                        transition: 'all 0.2s ease'
                    }}
                    placeholder={placeholder || 'Enter your phone number'}
                />
            </div>
            <div style={{
                fontSize: '0.8rem',
                color: '#6b7280',
                marginTop: '0.25rem',
                marginLeft: '0.5rem'
            }}>
                Selected: {selectedCountry.flag} {selectedCountry.name} ({selectedCountry.phone})
            </div>
        </div>
    );
};

export default PhoneInput;
