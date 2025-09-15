import React from 'react';
import { categories } from '../utils/medicalHistoryUtils';

const MedicalRecordFilters = ({ selectedCategory, onCategoryChange, medicalRecords }) => {
    const getCategoryCount = (categoryId) => {
        if (categoryId === 'all') return medicalRecords.length;
        return medicalRecords.filter(record => record.type === categoryId).length;
    };

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
            <h3 style={{
                fontSize: '1.3rem',
                fontWeight: '700',
                color: '#374151',
                margin: '0 0 1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
            }}>
                <span>🏷️</span>
                Filter by Category
            </h3>
            
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1rem'
            }}>
                {categories.map(category => {
                    const count = getCategoryCount(category.id);
                    const isSelected = selectedCategory === category.id;
                    
                    return (
                        <button
                            key={category.id}
                            onClick={() => onCategoryChange(category.id)}
                            style={{
                                padding: '1rem 1.5rem',
                                background: isSelected 
                                    ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                                    : 'rgba(255, 255, 255, 0.8)',
                                color: isSelected ? 'white' : '#374151',
                                border: isSelected 
                                    ? 'none' 
                                    : '2px solid rgba(16, 185, 129, 0.2)',
                                borderRadius: '16px',
                                cursor: 'pointer',
                                fontWeight: '600',
                                fontSize: '0.9rem',
                                transition: 'all 0.3s ease',
                                boxShadow: isSelected 
                                    ? '0 8px 25px rgba(16, 185, 129, 0.3)'
                                    : '0 4px 12px rgba(16, 185, 129, 0.1)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                gap: '0.75rem'
                            }}
                            onMouseEnter={e => {
                                if (!isSelected) {
                                    e.target.style.background = 'rgba(16, 185, 129, 0.1)';
                                    e.target.style.borderColor = 'rgba(16, 185, 129, 0.3)';
                                    e.target.style.transform = 'translateY(-2px)';
                                }
                            }}
                            onMouseLeave={e => {
                                if (!isSelected) {
                                    e.target.style.background = 'rgba(255, 255, 255, 0.8)';
                                    e.target.style.borderColor = 'rgba(16, 185, 129, 0.2)';
                                    e.target.style.transform = 'translateY(0)';
                                }
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <span style={{ fontSize: '1.2rem' }}>{category.icon}</span>
                                <span>{category.name}</span>
                            </div>
                            <span style={{
                                background: isSelected 
                                    ? 'rgba(255, 255, 255, 0.2)' 
                                    : 'rgba(16, 185, 129, 0.1)',
                                color: isSelected ? 'white' : '#059669',
                                padding: '0.25rem 0.5rem',
                                borderRadius: '12px',
                                fontSize: '0.8rem',
                                fontWeight: '700',
                                minWidth: '24px',
                                textAlign: 'center'
                            }}>
                                {count}
                            </span>
                        </button>
                    );
                })}
            </div>
        </section>
    );
};

export default MedicalRecordFilters;
