import { useState, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { COUNTRIES, COUNTRY_MAP } from '../utils/countryData';
import { translateCountryName } from '../utils/countryUtils';
import CountrySelectorModal from './CountrySelectorModal';

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
    const { t } = useTranslation();
    const [isCountryModalOpen, setIsCountryModalOpen] = useState(false);
    
    const selectedCountry = useMemo(() =>
        COUNTRY_MAP.get(countryCode) || COUNTRIES[0], 
        [countryCode]
    );
    
    const handleCountrySelect = useCallback((newCountryCode) => {
        onCountryChange(newCountryCode);
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
                <button
                    type="button"
                    onClick={() => !disabled && setIsCountryModalOpen(true)}
                    disabled={disabled}
                    style={{
                        minWidth: '120px',
                        padding: '0.875rem 0.75rem',
                        border: '2px solid rgba(34, 197, 94, 0.2)',
                        borderRadius: '12px',
                        fontSize: '0.9rem',
                        background: '#f9fafb',
                        outline: 'none',
                        boxSizing: 'border-box',
                        color: '#374151',
                        cursor: disabled ? 'not-allowed' : 'pointer',
                        transition: 'all 0.2s ease',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '0.5rem',
                        opacity: disabled ? 0.6 : 1
                    }}
                    onMouseEnter={e => {
                        if (!disabled) {
                            e.target.style.borderColor = '#22c55e';
                            e.target.style.background = 'white';
                        }
                    }}
                    onMouseLeave={e => {
                        e.target.style.borderColor = 'rgba(34, 197, 94, 0.2)';
                        e.target.style.background = '#f9fafb';
                    }}
                >
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ fontSize: '1.25rem' }}>{selectedCountry.flag}</span>
                        <span style={{ fontWeight: '500' }}>{selectedCountry.phone}</span>
                    </span>
                    <span style={{ color: '#9ca3af', fontSize: '0.75rem' }}>▼</span>
                </button>
                
                <input
                    type="tel"
                    value={value}
                    onChange={onChange}
                    required={required}
                    disabled={disabled}
                    style={{
                        flex: 1,
                        padding: '0.875rem 1rem',
                        border: '2px solid rgba(34, 197, 94, 0.2)',
                        borderRadius: '12px',
                        fontSize: '0.95rem',
                        background: '#f9fafb',
                        outline: 'none',
                        boxSizing: 'border-box',
                        color: '#374151',
                        transition: 'all 0.2s ease'
                    }}
                    placeholder={placeholder || t('common.enterPhoneNumber')}
                    onFocus={e => {
                        e.target.style.borderColor = '#22c55e';
                        e.target.style.background = 'white';
                    }}
                    onBlur={e => {
                        e.target.style.borderColor = 'rgba(34, 197, 94, 0.2)';
                        e.target.style.background = '#f9fafb';
                    }}
                />
            </div>

            <CountrySelectorModal
                isOpen={isCountryModalOpen}
                onClose={() => setIsCountryModalOpen(false)}
                onSelect={handleCountrySelect}
                selectedCountryCode={countryCode}
            />
        </div>
    );
};

export default PhoneInput;
