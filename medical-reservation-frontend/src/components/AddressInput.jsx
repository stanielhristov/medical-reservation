import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { COUNTRIES, COUNTRY_MAP } from '../utils/countryData';
import { translateCountryName } from '../utils/countryUtils';
import CountrySelectorModal from './CountrySelectorModal';

const AddressInput = ({ 
    street, onStreetChange, 
    city, onCityChange, 
    stateProvince, onStateProvinceChange, 
    postalCode, onPostalCodeChange, 
    countryCode, onCountryChange, 
    disabled 
}) => {
    const { t } = useTranslation();
    const [isCountryModalOpen, setIsCountryModalOpen] = useState(false);
    
    const selectedCountry = useMemo(() => 
        COUNTRY_MAP.get(countryCode) || COUNTRIES[0], 
        [countryCode]
    );

    const handleCountrySelect = (code) => {
        onCountryChange(code);
    };
    
    return (
        <div style={{ marginBottom: '1.25rem' }}>
            <label style={{
                display: 'block',
                marginBottom: '0.75rem',
                fontWeight: '500',
                color: '#374151',
                fontSize: '0.9rem'
            }}>
                {t('common.address')}
            </label>
            
            <div style={{ marginBottom: '0.75rem' }}>
                <input
                    type="text"
                    value={street || ''}
                    onChange={(e) => onStreetChange(e.target.value)}
                    disabled={disabled}
                    style={{
                        width: '100%',
                        padding: '0.875rem 1rem',
                        border: '1px solid #e5e7eb',
                        borderRadius: '12px',
                        fontSize: '0.95rem',
                        background: disabled ? '#f3f4f6' : '#ffffff',
                        outline: 'none',
                        boxSizing: 'border-box',
                        color: '#374151',
                        transition: 'all 0.2s ease'
                    }}
                    placeholder={t('auth.street')}
                />
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.75rem' }}>
                <input
                    type="text"
                    value={city || ''}
                    onChange={(e) => onCityChange(e.target.value)}
                    disabled={disabled}
                    style={{
                        flex: 2,
                        padding: '0.875rem 1rem',
                        border: '1px solid #e5e7eb',
                        borderRadius: '12px',
                        fontSize: '0.95rem',
                        background: disabled ? '#f3f4f6' : '#ffffff',
                        outline: 'none',
                        boxSizing: 'border-box',
                        color: '#374151',
                        transition: 'all 0.2s ease'
                    }}
                    placeholder={t('auth.city')}
                />
                <input
                    type="text"
                    value={stateProvince || ''}
                    onChange={(e) => onStateProvinceChange(e.target.value)}
                    disabled={disabled}
                    style={{
                        flex: 1,
                        padding: '0.875rem 1rem',
                        border: '1px solid #e5e7eb',
                        borderRadius: '12px',
                        fontSize: '0.95rem',
                        background: disabled ? '#f3f4f6' : '#ffffff',
                        outline: 'none',
                        boxSizing: 'border-box',
                        color: '#374151',
                        transition: 'all 0.2s ease'
                    }}
                    placeholder={t('auth.stateProvince')}
                />
            </div>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
                <input
                    type="text"
                    value={postalCode || ''}
                    onChange={(e) => onPostalCodeChange(e.target.value)}
                    disabled={disabled}
                    style={{
                        flex: 1,
                        padding: '0.875rem 1rem',
                        border: '1px solid #e5e7eb',
                        borderRadius: '12px',
                        fontSize: '0.95rem',
                        background: disabled ? '#f3f4f6' : '#ffffff',
                        outline: 'none',
                        boxSizing: 'border-box',
                        color: '#374151',
                        transition: 'all 0.2s ease'
                    }}
                    placeholder={t('auth.postalCode')}
                />
                <button
                    type="button"
                    onClick={() => !disabled && setIsCountryModalOpen(true)}
                    disabled={disabled}
                    style={{
                        flex: 2,
                        padding: '0.875rem 1rem',
                        border: '2px solid #e5e7eb',
                        borderRadius: '12px',
                        fontSize: '0.95rem',
                        background: disabled ? '#f3f4f6' : '#ffffff',
                        outline: 'none',
                        boxSizing: 'border-box',
                        color: '#374151',
                        cursor: disabled ? 'not-allowed' : 'pointer',
                        transition: 'all 0.2s ease',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '0.75rem',
                        textAlign: 'left'
                    }}
                    onMouseEnter={e => {
                        if (!disabled) {
                            e.currentTarget.style.borderColor = '#22c55e';
                            e.currentTarget.style.background = 'rgba(34, 197, 94, 0.02)';
                        }
                    }}
                    onMouseLeave={e => {
                        if (!disabled) {
                            e.currentTarget.style.borderColor = '#e5e7eb';
                            e.currentTarget.style.background = '#ffffff';
                        }
                    }}
                    onFocus={e => {
                        if (!disabled) {
                            e.currentTarget.style.borderColor = '#22c55e';
                            e.currentTarget.style.boxShadow = '0 0 0 3px rgba(34, 197, 94, 0.1)';
                        }
                    }}
                    onBlur={e => {
                        if (!disabled) {
                            e.currentTarget.style.borderColor = '#e5e7eb';
                            e.currentTarget.style.boxShadow = 'none';
                        }
                    }}
                >
                    <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '0.75rem',
                        overflow: 'hidden'
                    }}>
                        <span style={{ 
                            fontSize: '1.5rem',
                            flexShrink: 0
                        }}>
                            {selectedCountry.flag}
                        </span>
                        <span style={{
                            fontWeight: '500',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                        }}>
                            {translateCountryName(selectedCountry.code, selectedCountry.name)}
                        </span>
                    </div>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        flexShrink: 0
                    }}>
                        <span style={{
                            fontSize: '0.75rem',
                            color: '#9ca3af',
                            fontWeight: '500'
                        }}>
                            {selectedCountry.phone}
                        </span>
                        <div style={{
                            width: '24px',
                            height: '24px',
                            background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                            borderRadius: '6px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontSize: '0.7rem'
                        }}>
                            ▼
                        </div>
                    </div>
                </button>
            </div>
            
            <div style={{
                fontSize: '0.8rem',
                color: '#6b7280',
                marginTop: '0.5rem',
                marginLeft: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
            }}>
                <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    padding: '0.25rem 0.5rem',
                    background: 'rgba(34, 197, 94, 0.1)',
                    borderRadius: '6px',
                    color: '#16a34a',
                    fontWeight: '500'
                }}>
                    {selectedCountry.flag} {translateCountryName(selectedCountry.code, selectedCountry.name)}
                </span>
                <span style={{ color: '#9ca3af' }}>•</span>
                <span>{t('countrySelector.clickToChange')}</span>
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

export default AddressInput;
