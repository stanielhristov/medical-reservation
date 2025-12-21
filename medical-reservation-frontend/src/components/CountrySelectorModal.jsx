import { useState, useMemo, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import { COUNTRIES } from '../utils/countryData';
import { translateCountryName } from '../utils/countryUtils';

const REGIONS = {
    popular: ['US', 'GB', 'CA', 'AU', 'DE', 'FR', 'IT', 'ES', 'BG', 'NL', 'CH'],
    europe: ['AL', 'AD', 'AT', 'BY', 'BE', 'BA', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HU', 'IS', 'IE', 'IT', 'LV', 'LI', 'LT', 'LU', 'MK', 'MT', 'MD', 'MC', 'ME', 'NL', 'NO', 'PL', 'PT', 'RO', 'RU', 'SM', 'RS', 'SK', 'SI', 'ES', 'SE', 'CH', 'UA', 'GB', 'VA'],
    northAmerica: ['US', 'CA', 'MX', 'GT', 'BZ', 'HN', 'SV', 'NI', 'CR', 'PA', 'CU', 'JM', 'HT', 'DO', 'PR', 'BS', 'BB', 'DM', 'GD', 'KN', 'LC', 'VC', 'TT', 'AG', 'AI', 'AW', 'KY', 'TC', 'VG', 'VI', 'GP', 'MQ', 'MS', 'SX', 'BL', 'MF', 'CW', 'GL', 'BM', 'PM'],
    southAmerica: ['AR', 'BO', 'BR', 'CL', 'CO', 'EC', 'GY', 'PY', 'PE', 'SR', 'UY', 'VE', 'GF', 'FK'],
    asia: ['AF', 'AM', 'AZ', 'BH', 'BD', 'BT', 'BN', 'KH', 'CN', 'CY', 'GE', 'IN', 'ID', 'IR', 'IQ', 'IL', 'JP', 'JO', 'KZ', 'KW', 'KG', 'LA', 'LB', 'MY', 'MV', 'MN', 'MM', 'NP', 'KP', 'OM', 'PK', 'PS', 'PH', 'QA', 'SA', 'SG', 'KR', 'LK', 'SY', 'TW', 'TJ', 'TH', 'TL', 'TR', 'TM', 'AE', 'UZ', 'VN', 'YE'],
    africa: ['DZ', 'AO', 'BJ', 'BW', 'BF', 'BI', 'CV', 'CM', 'CF', 'TD', 'KM', 'CG', 'CD', 'CI', 'DJ', 'EG', 'GQ', 'ER', 'SZ', 'ET', 'GA', 'GM', 'GH', 'GN', 'GW', 'KE', 'LS', 'LR', 'LY', 'MG', 'MW', 'ML', 'MR', 'MU', 'MA', 'MZ', 'NA', 'NE', 'NG', 'RW', 'ST', 'SN', 'SC', 'SL', 'SO', 'ZA', 'SS', 'SD', 'TZ', 'TG', 'TN', 'UG', 'ZM', 'ZW'],
    oceania: ['AU', 'FJ', 'KI', 'MH', 'FM', 'NR', 'NZ', 'PW', 'PG', 'WS', 'SB', 'TO', 'TV', 'VU']
};

const CountrySelectorModal = ({ 
    isOpen, 
    onClose, 
    onSelect, 
    selectedCountryCode 
}) => {
    const { t } = useTranslation();
    const [searchQuery, setSearchQuery] = useState('');
    const [activeRegion, setActiveRegion] = useState('popular');
    const searchInputRef = useRef(null);
    const scrollContainerRef = useRef(null);

    useEffect(() => {
        if (isOpen && searchInputRef.current) {
            setTimeout(() => searchInputRef.current?.focus(), 100);
        }
        if (isOpen) {
            setSearchQuery('');
            setActiveRegion('popular');
        }
    }, [isOpen]);

    // Handle body scroll lock
    useEffect(() => {
        if (!isOpen) return;
        
        const originalOverflow = document.body.style.overflow;
        const originalPaddingRight = document.body.style.paddingRight;
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        
        document.body.style.overflow = 'hidden';
        if (scrollbarWidth > 0) {
            document.body.style.paddingRight = `${scrollbarWidth}px`;
        }
        
        return () => {
            document.body.style.overflow = originalOverflow;
            document.body.style.paddingRight = originalPaddingRight;
        };
    }, [isOpen]);

    // Handle escape key
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) {
            document.addEventListener('keydown', handleEsc);
        }
        return () => {
            document.removeEventListener('keydown', handleEsc);
        };
    }, [isOpen, onClose]);

    // Filter and sort countries alphabetically
    const filteredCountries = useMemo(() => {
        let countries;
        const query = searchQuery.toLowerCase().trim();
        
        if (query) {
            countries = COUNTRIES.filter(country => {
                const translatedName = translateCountryName(country.code, country.name).toLowerCase();
                return (
                    translatedName.includes(query) ||
                    country.name.toLowerCase().includes(query) ||
                    country.code.toLowerCase().includes(query) ||
                    country.phone.includes(query)
                );
            });
        } else {
            const regionCodes = REGIONS[activeRegion] || [];
            countries = COUNTRIES.filter(country => regionCodes.includes(country.code));
        }
        
        // Sort alphabetically by translated name
        return countries.sort((a, b) => {
            const nameA = translateCountryName(a.code, a.name).toLowerCase();
            const nameB = translateCountryName(b.code, b.name).toLowerCase();
            return nameA.localeCompare(nameB);
        });
    }, [searchQuery, activeRegion]);

    const handleCountrySelect = (countryCode) => {
        onSelect(countryCode);
        onClose();
    };

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    if (!isOpen) return null;

    const regions = [
        { key: 'popular', label: t('countrySelector.popular') },
        { key: 'europe', label: t('countrySelector.europe') },
        { key: 'northAmerica', label: t('countrySelector.northAmerica') },
        { key: 'southAmerica', label: t('countrySelector.southAmerica') },
        { key: 'asia', label: t('countrySelector.asia') },
        { key: 'africa', label: t('countrySelector.africa') },
        { key: 'oceania', label: t('countrySelector.oceania') }
    ];

    const modalContent = (
        <div 
            onClick={handleBackdropClick}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 99999,
                padding: '1rem',
                boxSizing: 'border-box'
            }}
        >
            <div 
                onClick={(e) => e.stopPropagation()}
                style={{
                    backgroundColor: '#ffffff',
                    borderRadius: '20px',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                    maxWidth: '500px',
                    width: '100%',
                    maxHeight: '80vh',
                    display: 'flex',
                    flexDirection: 'column',
                    border: '1px solid rgba(34, 197, 94, 0.2)'
                }}
            >
                {/* Header */}
                <div style={{
                    background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                    padding: '1.5rem',
                    borderRadius: '20px 20px 0 0',
                    position: 'relative'
                }}>
                    <button
                        onClick={onClose}
                        style={{
                            position: 'absolute',
                            top: '1rem',
                            right: '1rem',
                            background: 'rgba(255, 255, 255, 0.2)',
                            border: 'none',
                            fontSize: '1.25rem',
                            cursor: 'pointer',
                            color: 'white',
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            outline: 'none',
                            WebkitTapHighlightColor: 'transparent'
                        }}
                    >
                        ✕
                    </button>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{
                            width: '48px',
                            height: '48px',
                            background: 'rgba(255, 255, 255, 0.2)',
                            borderRadius: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '1.5rem'
                        }}>
                            🌍
                        </div>
                        <div>
                            <h2 style={{
                                fontSize: '1.25rem',
                                fontWeight: '700',
                                color: 'white',
                                margin: 0
                            }}>
                                {t('countrySelector.title')}
                            </h2>
                            <p style={{
                                color: 'rgba(255, 255, 255, 0.8)',
                                margin: '0.25rem 0 0 0',
                                fontSize: '0.85rem'
                            }}>
                                {t('countrySelector.subtitle')}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Search Bar */}
                <div style={{ 
                    padding: '1rem',
                    borderBottom: '1px solid #e5e7eb',
                    backgroundColor: '#ffffff'
                }}>
                    <div style={{ position: 'relative' }}>
                        <span style={{
                            position: 'absolute',
                            left: '0.875rem',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            color: '#22c55e',
                            fontSize: '1rem'
                        }}>
                            🔍
                        </span>
                        <input
                            ref={searchInputRef}
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder={t('countrySelector.searchPlaceholder')}
                            style={{
                                width: '100%',
                                padding: '0.75rem 2.5rem 0.75rem 2.5rem',
                                border: '2px solid #e5e7eb',
                                borderRadius: '10px',
                                fontSize: '0.95rem',
                                backgroundColor: '#f9fafb',
                                outline: 'none',
                                boxSizing: 'border-box',
                                color: '#374151'
                            }}
                            onFocus={e => {
                                e.target.style.borderColor = '#22c55e';
                                e.target.style.backgroundColor = 'white';
                            }}
                            onBlur={e => {
                                e.target.style.borderColor = '#e5e7eb';
                                e.target.style.backgroundColor = '#f9fafb';
                            }}
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery('')}
                                style={{
                                    position: 'absolute',
                                    right: '0.75rem',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    background: '#e5e7eb',
                                    border: 'none',
                                    width: '20px',
                                    height: '20px',
                                    borderRadius: '50%',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '0.65rem',
                                    color: '#6b7280',
                                    outline: 'none',
                                    WebkitTapHighlightColor: 'transparent'
                                }}
                            >
                                ✕
                            </button>
                        )}
                    </div>
                </div>

                {/* Region Tabs */}
                {!searchQuery && (
                    <div style={{
                        padding: '0.75rem 1rem',
                        borderBottom: '1px solid #e5e7eb',
                        backgroundColor: '#ffffff',
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '0.5rem',
                        justifyContent: 'center'
                    }}>
                        {regions.map(region => (
                            <button
                                key={region.key}
                                onClick={() => setActiveRegion(region.key)}
                                style={{
                                    padding: '0.5rem 0.875rem',
                                    border: activeRegion === region.key 
                                        ? '2px solid #22c55e' 
                                        : '2px solid transparent',
                                    borderRadius: '8px',
                                    fontSize: '0.8rem',
                                    fontWeight: '600',
                                    backgroundColor: activeRegion === region.key 
                                        ? 'rgba(34, 197, 94, 0.1)'
                                        : '#f3f4f6',
                                    color: activeRegion === region.key ? '#16a34a' : '#6b7280',
                                    cursor: 'pointer',
                                    whiteSpace: 'nowrap',
                                    outline: 'none',
                                    WebkitTapHighlightColor: 'transparent'
                                }}
                            >
                                {region.label}
                            </button>
                        ))}
                    </div>
                )}

                {/* Countries List - Dropdown Style */}
                <div 
                    ref={scrollContainerRef}
                    style={{
                        flex: 1,
                        overflowY: 'auto',
                        backgroundColor: '#ffffff',
                        overscrollBehavior: 'contain'
                    }}
                >
                    {filteredCountries.length === 0 ? (
                        <div style={{
                            textAlign: 'center',
                            padding: '2rem',
                            color: '#6b7280'
                        }}>
                            <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem', opacity: 0.5 }}>
                                🔍
                            </div>
                            <p style={{ margin: 0, fontSize: '0.95rem', fontWeight: '500' }}>
                                {t('countrySelector.noResults')}
                            </p>
                            <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.8rem', opacity: 0.7 }}>
                                {t('countrySelector.tryDifferentSearch')}
                            </p>
                        </div>
                    ) : (
                        <div style={{ padding: '0.5rem 0' }}>
                            {filteredCountries.map(country => {
                                const isSelected = selectedCountryCode === country.code;
                                return (
                                    <button
                                        key={country.code}
                                        onClick={() => handleCountrySelect(country.code)}
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem 1rem',
                                            border: 'none',
                                            borderLeft: isSelected ? '4px solid #22c55e' : '4px solid transparent',
                                            backgroundColor: isSelected ? 'rgba(34, 197, 94, 0.08)' : 'transparent',
                                            color: '#374151',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.75rem',
                                            textAlign: 'left',
                                            transition: 'background-color 0.15s ease',
                                            outline: 'none',
                                            WebkitTapHighlightColor: 'transparent'
                                        }}
                                        onMouseEnter={e => {
                                            if (!isSelected) {
                                                e.currentTarget.style.backgroundColor = '#f9fafb';
                                            }
                                        }}
                                        onMouseLeave={e => {
                                            if (!isSelected) {
                                                e.currentTarget.style.backgroundColor = 'transparent';
                                            }
                                        }}
                                    >
                                        <span style={{ fontSize: '1.5rem', flexShrink: 0 }}>
                                            {country.flag}
                                        </span>
                                        <div style={{ flex: 1, minWidth: 0 }}>
                                            <div style={{
                                                fontWeight: isSelected ? '600' : '500',
                                                color: isSelected ? '#16a34a' : '#374151',
                                                fontSize: '0.95rem',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap'
                                            }}>
                                                {translateCountryName(country.code, country.name)}
                                            </div>
                                            <div style={{
                                                fontSize: '0.75rem',
                                                color: '#9ca3af',
                                                marginTop: '0.125rem'
                                            }}>
                                                {country.code} • {country.phone}
                                            </div>
                                        </div>
                                        {isSelected && (
                                            <div style={{
                                                width: '22px',
                                                height: '22px',
                                                backgroundColor: '#22c55e',
                                                borderRadius: '50%',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                color: 'white',
                                                fontSize: '0.7rem',
                                                fontWeight: 'bold',
                                                flexShrink: 0
                                            }}>
                                                ✓
                                            </div>
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div style={{
                    padding: '0.75rem 1rem',
                    borderTop: '1px solid #e5e7eb',
                    backgroundColor: '#f9fafb',
                    borderRadius: '0 0 20px 20px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <span style={{ fontSize: '0.8rem', color: '#6b7280' }}>
                        {filteredCountries.length} {searchQuery ? t('countrySelector.countriesFound') : t('countrySelector.countriesInRegion')}
                    </span>
                    <button
                        onClick={onClose}
                        style={{
                            padding: '0.5rem 1rem',
                            backgroundColor: '#e5e7eb',
                            color: '#374151',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontWeight: '600',
                            fontSize: '0.85rem',
                            outline: 'none',
                            WebkitTapHighlightColor: 'transparent'
                        }}
                    >
                        {t('common.close')}
                    </button>
                </div>
            </div>
        </div>
    );

    // Use portal to render modal at document body level
    return createPortal(modalContent, document.body);
};

export default CountrySelectorModal;
