import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { COUNTRIES, COUNTRY_MAP } from '../utils/countryData';

const AddressInput = ({ 
    street, onStreetChange, 
    city, onCityChange, 
    stateProvince, onStateProvinceChange, 
    postalCode, onPostalCodeChange, 
    countryCode, onCountryChange, 
    disabled 
}) => {
    const { t } = useTranslation();
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
                <div style={{ flex: 2, position: 'relative' }}>
                    <select
                        value={countryCode || 'US'}
                        onChange={handleCountryChange}
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
            </div>
            
            <div style={{
                fontSize: '0.8rem',
                color: '#6b7280',
                marginTop: '0.5rem',
                marginLeft: '0.5rem'
            }}>
                Selected country: {selectedCountry.flag} {selectedCountry.name}
            </div>
        </div>
    );
};

export default AddressInput;
