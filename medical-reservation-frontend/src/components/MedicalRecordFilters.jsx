import React from 'react';
import { useTranslation } from 'react-i18next';
import { categories } from '../utils/medicalHistoryUtils';

const MedicalRecordFilters = ({ selectedCategory, onCategoryChange, medicalRecords }) => {
    const { t } = useTranslation();
    
    const getCategoryCount = (categoryId) => {
        if (categoryId === 'all') return medicalRecords.length;
        return medicalRecords.filter(record => record.type === categoryId).length;
    };

    const getCategoryLabel = (categoryId) => {
        const translatedLabel = t(`medicalHistory.category.${categoryId}`);
        
        if (translatedLabel.includes('medicalHistory.category')) {
            const category = categories.find(c => c.id === categoryId);
            return category?.name || categoryId;
        }
        
        return translatedLabel;
    };

    const selectedLabel = getCategoryLabel(selectedCategory);
    const selectedCount = getCategoryCount(selectedCategory);

    return (
        <section style={{
            background: 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(20px)',
            borderRadius: '16px',
            padding: '1.5rem',
            marginBottom: '2rem',
            boxShadow: '0 10px 30px rgba(34, 197, 94, 0.1), 0 8px 20px rgba(0, 0, 0, 0.04)',
            border: '1px solid rgba(34, 197, 94, 0.15)'
        }}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1rem'
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem'
                }}>
                    <label style={{
                        fontSize: '0.95rem',
                        fontWeight: '600',
                        color: '#374151'
                    }}>
                        {t('medicalHistory.filterByCategory')}
                    </label>
                    <div style={{ position: 'relative' }}>
                        <select
                            value={selectedCategory}
                            onChange={(e) => onCategoryChange(e.target.value)}
                            style={{
                                appearance: 'none',
                                padding: '0.75rem 2.5rem 0.75rem 1rem',
                                fontSize: '0.95rem',
                                fontWeight: '500',
                                color: '#374151',
                                background: 'white',
                                border: '2px solid rgba(5, 150, 105, 0.2)',
                                borderRadius: '10px',
                                cursor: 'pointer',
                                outline: 'none',
                                minWidth: '200px',
                                transition: 'all 0.2s ease'
                            }}
                            onFocus={e => {
                                e.target.style.borderColor = '#059669';
                                e.target.style.boxShadow = '0 0 0 3px rgba(5, 150, 105, 0.1)';
                            }}
                            onBlur={e => {
                                e.target.style.borderColor = 'rgba(5, 150, 105, 0.2)';
                                e.target.style.boxShadow = 'none';
                            }}
                        >
                            {categories.map(category => (
                                <option key={category.id} value={category.id}>
                                    {getCategoryLabel(category.id)} ({getCategoryCount(category.id)})
                                </option>
                            ))}
                        </select>
                        <div style={{
                            position: 'absolute',
                            right: '0.75rem',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            pointerEvents: 'none',
                            color: '#059669'
                        }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="6,9 12,15 18,9"/>
                            </svg>
                        </div>
                    </div>
                </div>

                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.5rem 1rem',
                    background: 'rgba(5, 150, 105, 0.1)',
                    borderRadius: '8px'
                }}>
                    <span style={{
                        fontSize: '0.85rem',
                        color: '#6b7280'
                    }}>
                        {t('medicalHistory.showing') || 'Showing'}:
                    </span>
                    <span style={{
                        fontSize: '0.95rem',
                        fontWeight: '600',
                        color: '#059669'
                    }}>
                        {selectedCount} {selectedCount === 1 ? (t('medicalHistory.record') || 'record') : (t('medicalHistory.records') || 'records')}
                    </span>
                </div>
            </div>
        </section>
    );
};

export default MedicalRecordFilters;
