import { useTranslation } from 'react-i18next';

const getFilterIcon = (iconId, isSelected, color) => {
    const strokeColor = isSelected ? color : '#6b7280';
    
    switch (iconId) {
        case 'users':
            return (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
            );
        case 'clock':
            return (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                </svg>
            );
        case 'hospital':
            return (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 21h18"/>
                    <path d="M5 21V7l8-4v18"/>
                    <path d="M19 21V11l-6-3.5"/>
                    <path d="M9 9v.01"/>
                    <path d="M9 12v.01"/>
                    <path d="M9 15v.01"/>
                    <path d="M9 18v.01"/>
                </svg>
            );
        case 'clipboard':
            return (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                    <line x1="16" y1="13" x2="8" y2="13"/>
                    <line x1="16" y1="17" x2="8" y2="17"/>
                    <polyline points="10 9 9 9 8 9"/>
                </svg>
            );
        default:
            return (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                </svg>
            );
    }
};

const PatientFilters = ({ 
    filters, 
    selectedFilter, 
    onFilterChange, 
    searchTerm, 
    onSearchChange,
    patientCounts = {}
}) => {
    const { t } = useTranslation();
    return (
        <div style={{
            background: 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(20px)',
            borderRadius: '20px',
            padding: '1.5rem',
            marginBottom: '2rem',
            boxShadow: '0 8px 24px rgba(5, 150, 105, 0.1)',
            border: '1px solid rgba(5, 150, 105, 0.1)'
        }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1.5rem',
                flexWrap: 'wrap',
                gap: '1rem'
            }}>
                <h3 style={{
                    fontSize: '1.2rem',
                    fontWeight: '600',
                    color: '#374151',
                    margin: 0
                }}>
                    {t('patients.filterPatients')}
                </h3>
                
                <div style={{ position: 'relative', minWidth: '250px' }}>
                    <input
                        type="text"
                        placeholder={t('patients.searchPatients')}
                        value={searchTerm}
                        onChange={(e) => onSearchChange(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '0.75rem 1rem 0.75rem 2.5rem',
                            border: '2px solid rgba(5, 150, 105, 0.2)',
                            borderRadius: '12px',
                            fontSize: '0.9rem',
                            outline: 'none',
                            background: '#f9fafb',
                            boxSizing: 'border-box',
                            transition: 'border-color 0.2s ease'
                        }}
                        onFocus={e => {
                            e.target.style.borderColor = '#059669';
                        }}
                        onBlur={e => {
                            e.target.style.borderColor = 'rgba(5, 150, 105, 0.2)';
                        }}
                    />
                    <span style={{
                        position: 'absolute',
                        left: '0.75rem',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        display: 'flex',
                        alignItems: 'center'
                    }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="11" cy="11" r="8"/>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                        </svg>
                    </span>
                </div>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1rem'
            }}>
                {filters.map(filter => {
                    const count = patientCounts[filter.id] || 0;
                    const isSelected = selectedFilter === filter.id;
                    
                    return (
                        <button
                            key={filter.id}
                            onClick={() => onFilterChange(filter.id)}
                            style={{
                                background: isSelected 
                                    ? `${filter.color}15` 
                                    : 'rgba(107, 114, 128, 0.05)',
                                border: isSelected 
                                    ? `2px solid ${filter.color}` 
                                    : '2px solid rgba(107, 114, 128, 0.1)',
                                borderRadius: '12px',
                                padding: '1rem',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                textAlign: 'center',
                                transform: isSelected ? 'translateY(-2px)' : 'translateY(0)',
                                boxShadow: isSelected ? `0 4px 12px ${filter.color}30` : 'none'
                            }}
                            onMouseEnter={e => {
                                if (!isSelected) {
                                    e.target.style.background = `${filter.color}10`;
                                    e.target.style.transform = 'translateY(-2px)';
                                }
                            }}
                            onMouseLeave={e => {
                                if (!isSelected) {
                                    e.target.style.background = 'rgba(107, 114, 128, 0.05)';
                                    e.target.style.transform = 'translateY(0)';
                                }
                            }}
                        >
                            <div style={{ 
                                marginBottom: '0.5rem',
                                display: 'flex',
                                justifyContent: 'center'
                            }}>
                                {getFilterIcon(filter.icon, isSelected, filter.color)}
                            </div>
                            <div style={{
                                color: isSelected ? filter.color : '#374151',
                                fontWeight: '600',
                                fontSize: '1.2rem',
                                marginBottom: '0.25rem'
                            }}>
                                {count}
                            </div>
                            <div style={{
                                color: isSelected ? filter.color : '#6b7280',
                                fontSize: '0.85rem',
                                fontWeight: '500'
                            }}>
                                {filter.name}
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default PatientFilters;
