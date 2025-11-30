import React from 'react';
import { useTranslation } from 'react-i18next';
import { translateSpecialization } from '../utils/specializationUtils';

const DoctorSearchFilters = ({ 
    searchTerm, 
    setSearchTerm, 
    selectedSpecialization, 
    setSelectedSpecialization, 
    specializations, 
    englishSpecializations = null,
    doctorCount 
}) => {
    const { t } = useTranslation();
    return (
        <section style={{
            background: 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(20px)',
            borderRadius: '24px',
            padding: '2rem',
            marginBottom: '2rem',
            boxShadow: '0 20px 40px rgba(34, 197, 94, 0.12), 0 16px 32px rgba(0, 0, 0, 0.06)',
            border: '1px solid rgba(34, 197, 94, 0.15)'
        }}>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '1.5rem',
                alignItems: 'end'
            }}>
                <div>
                    <label style={{
                        display: 'block',
                        marginBottom: '0.5rem',
                        color: '#374151',
                        fontWeight: '600',
                        fontSize: '1rem'
                    }}>
                        🔍 {t('doctors.searchDoctors')}
                    </label>
                    <input
                        type="text"
                        placeholder={t('doctors.searchPlaceholder')}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '0.8rem 1rem',
                            border: '2px solid rgba(34, 197, 94, 0.2)',
                            borderRadius: '12px',
                            fontSize: '1rem',
                            transition: 'all 0.3s ease',
                            boxSizing: 'border-box'
                        }}
                        onFocus={e => {
                            e.target.style.borderColor = 'rgba(34, 197, 94, 0.4)';
                            e.target.style.boxShadow = '0 0 0 3px rgba(34, 197, 94, 0.1)';
                        }}
                        onBlur={e => {
                            e.target.style.borderColor = 'rgba(34, 197, 94, 0.2)';
                            e.target.style.boxShadow = 'none';
                        }}
                    />
                </div>
                
                <div>
                    <label style={{
                        display: 'block',
                        marginBottom: '0.5rem',
                        color: '#374151',
                        fontWeight: '600',
                        fontSize: '1rem'
                    }}>
                        🏥 {t('doctors.specialization')}
                    </label>
                    <select
                        value={selectedSpecialization}
                        onChange={(e) => setSelectedSpecialization(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '0.8rem 1rem',
                            border: '2px solid rgba(34, 197, 94, 0.2)',
                            borderRadius: '12px',
                            fontSize: '1rem',
                            transition: 'all 0.3s ease',
                            boxSizing: 'border-box',
                            background: 'white'
                        }}
                        onFocus={e => {
                            e.target.style.borderColor = 'rgba(34, 197, 94, 0.4)';
                            e.target.style.boxShadow = '0 0 0 3px rgba(34, 197, 94, 0.1)';
                        }}
                        onBlur={e => {
                            e.target.style.borderColor = 'rgba(34, 197, 94, 0.2)';
                            e.target.style.boxShadow = 'none';
                        }}
                    >
                        {specializations.map((translatedSpec, index) => {
                            // Use English value for option value (for filtering), translated text for display
                            const englishSpec = englishSpecializations && englishSpecializations[index] !== undefined
                                ? englishSpecializations[index]
                                : (index === 0 ? 'All Specializations' : translatedSpec);
                            const englishValue = englishSpec === 'All Specializations' ? '' : englishSpec;
                            const displayText = translatedSpec;
                            return (
                                <option key={`${englishSpec}-${index}`} value={englishValue}>
                                    {displayText}
                                </option>
                            );
                        })}
                    </select>
                </div>
                
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    justifySelf: 'end'
                }}>
                    <div style={{
                        background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                        color: 'white',
                        padding: '0.8rem 1.5rem',
                        borderRadius: '12px',
                        fontSize: '1rem',
                        fontWeight: '600',
                        boxShadow: '0 4px 12px rgba(34, 197, 94, 0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                    }}>
                        <span>👨‍⚕️</span>
                        <span>{doctorCount} {doctorCount === 1 ? t('doctors.doctor') : t('doctors.doctors')} {t('doctors.found')}</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DoctorSearchFilters;
