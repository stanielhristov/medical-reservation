import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';

const MedicalRecordViewModal = ({ isOpen, onClose, record }) => {
    const { t, i18n } = useTranslation();

    useEffect(() => {
        if (!isOpen) return;
        
        const originalOverflow = document.body.style.overflow;
        const originalPaddingRight = document.body.style.paddingRight;
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        
        document.body.style.overflow = 'hidden';
        if (scrollbarWidth > 0) {
            document.body.style.paddingRight = `${scrollbarWidth}px`;
        }
        
        const handleEscape = (e) => {
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', handleEscape);
        
        return () => {
            document.body.style.overflow = originalOverflow;
            document.body.style.paddingRight = originalPaddingRight;
            document.removeEventListener('keydown', handleEscape);
        };
    }, [isOpen, onClose]);

    if (!isOpen || !record) return null;

    const formatDate = (date) => {
        if (!date) return '';
        const d = new Date(date);
        const locale = i18n.language === 'bg' ? 'bg-BG' : 'en-US';
        return d.toLocaleDateString(locale, {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const getRecordTypeColor = (type) => {
        const typeToCheck = (record.originalType || type)?.toLowerCase();
        switch (typeToCheck) {
            case 'consultation': return '#059669';
            case 'test':
            case 'lab_result': return '#3b82f6';
            case 'procedure': return '#8b5cf6';
            case 'emergency': return '#dc2626';
            case 'checkup': return '#f59e0b';
            case 'prescription': return '#10b981';
            case 'followup': return '#6366f1';
            default: return '#6b7280';
        }
    };

    const getRecordTypeDisplayName = () => {
        const typeToCheck = (record.originalType || record.type)?.toLowerCase();
        switch (typeToCheck) {
            case 'consultation':
                return t('medicalHistory.recordType.consultation');
            case 'checkup':
            case 'routine checkup':
                return t('medicalHistory.recordType.checkup');
            case 'followup':
            case 'follow-up visit':
                return t('medicalHistory.recordType.followup');
            case 'test':
            case 'lab':
            case 'lab_result':
                return t('medicalHistory.recordType.test');
            case 'procedure':
            case 'medical procedure':
                return t('medicalHistory.recordType.procedure');
            case 'emergency':
            case 'emergency visit':
                return t('medicalHistory.recordType.emergency');
            case 'prescription':
                return t('medicalHistory.recordType.prescription');
            default:
                return typeToCheck || 'Record';
        }
    };

    const typeColor = getRecordTypeColor(record.type);
    const recordType = (record.originalType || record.type)?.toLowerCase();

    // Field component for consistent styling
    const Field = ({ label, value, isHighlighted, highlightColor }) => {
        if (!value || value === 'None' || value === 'No prescription') return null;
        
        return (
            <div style={{
                background: isHighlighted ? `${highlightColor}10` : '#f9fafb',
                borderRadius: '12px',
                padding: '1.25rem',
                border: isHighlighted ? `2px solid ${highlightColor}30` : '1px solid #e5e7eb'
            }}>
                <label style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontWeight: '600',
                    color: isHighlighted ? highlightColor : '#374151',
                    fontSize: '0.9rem'
                }}>
                    {label}
                </label>
                <div style={{
                    fontSize: '0.95rem',
                    color: '#374151',
                    lineHeight: '1.6',
                    whiteSpace: 'pre-wrap'
                }}>
                    {value}
                </div>
            </div>
        );
    };

    // Render content based on record type - matching the add modal fields
    const renderRecordContent = () => {
        switch (recordType) {
            case 'prescription':
                return (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <Field 
                            label={t('medicalRecord.prescription.reason')}
                            value={record.description}
                        />
                        <Field 
                            label={t('medicalRecord.prescription.diagnosis')}
                            value={record.diagnosis}
                        />
                        <Field 
                            label={t('medicalRecord.prescription.details')}
                            value={record.prescription || record.medications}
                            isHighlighted
                            highlightColor="#10b981"
                        />
                        <Field 
                            label={t('medicalRecord.prescription.instructions')}
                            value={record.treatment}
                        />
                    </div>
                );

            case 'test':
            case 'lab_result':
                return (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <Field 
                            label={t('medicalRecord.test.description')}
                            value={record.description}
                        />
                        <Field 
                            label={t('medicalRecord.test.results')}
                            value={record.diagnosis}
                            isHighlighted
                            highlightColor="#3b82f6"
                        />
                        <Field 
                            label={t('medicalRecord.test.interpretation')}
                            value={record.treatment}
                        />
                    </div>
                );

            case 'procedure':
                return (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <Field 
                            label={t('medicalRecord.procedure.description')}
                            value={record.description}
                        />
                        <Field 
                            label={t('medicalRecord.procedure.findings')}
                            value={record.diagnosis}
                            isHighlighted
                            highlightColor="#8b5cf6"
                        />
                        <Field 
                            label={t('medicalRecord.procedure.postCare')}
                            value={record.treatment}
                        />
                        <Field 
                            label={t('medicalRecord.procedure.medications')}
                            value={record.prescription || record.medications}
                        />
                    </div>
                );

            case 'emergency':
                return (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {/* Emergency alert banner */}
                        <div style={{
                            background: 'rgba(239, 68, 68, 0.1)',
                            borderRadius: '12px',
                            padding: '1rem',
                            border: '2px solid rgba(239, 68, 68, 0.2)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem'
                        }}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"/>
                                <line x1="12" y1="8" x2="12" y2="12"/>
                                <line x1="12" y1="16" x2="12.01" y2="16"/>
                            </svg>
                            <span style={{ color: '#dc2626', fontWeight: '600' }}>
                                {t('medicalRecord.types.emergency')}
                            </span>
                        </div>
                        <Field 
                            label={t('medicalRecord.procedure.description')}
                            value={record.description}
                        />
                        <Field 
                            label={t('medicalRecord.procedure.findings')}
                            value={record.diagnosis}
                            isHighlighted
                            highlightColor="#dc2626"
                        />
                        <Field 
                            label={t('medicalRecord.procedure.postCare')}
                            value={record.treatment}
                        />
                        <Field 
                            label={t('medicalRecord.procedure.medications')}
                            value={record.prescription || record.medications}
                        />
                    </div>
                );

            // Default for consultation, checkup, followup
            default:
                return (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <Field 
                            label={t('medicalRecord.default.description')}
                            value={record.description}
                        />
                        <Field 
                            label={t('medicalRecord.default.diagnosis')}
                            value={record.diagnosis}
                        />
                        <Field 
                            label={t('medicalRecord.default.treatment')}
                            value={record.treatment}
                        />
                        <Field 
                            label={t('medicalRecord.default.prescription')}
                            value={record.prescription || record.medications}
                            isHighlighted
                            highlightColor="#10b981"
                        />
                    </div>
                );
        }
    };

    const modalContent = (
        <div 
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
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
                    background: 'white',
                    borderRadius: '20px',
                    width: '100%',
                    maxWidth: '600px',
                    maxHeight: '90vh',
                    overflow: 'hidden',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >
                {/* Header */}
                <div style={{
                    padding: '1.5rem 2rem',
                    borderBottom: '1px solid #e5e7eb',
                    background: `linear-gradient(135deg, ${typeColor}10 0%, ${typeColor}05 100%)`
                }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1 }}>
                            <div style={{
                                width: '12px',
                                height: '12px',
                                background: typeColor,
                                borderRadius: '50%',
                                flexShrink: 0
                            }} />
                            <div style={{ flex: 1 }}>
                                <h2 style={{
                                    fontSize: '1.25rem',
                                    fontWeight: '700',
                                    color: '#374151',
                                    margin: '0 0 0.25rem'
                                }}>
                                    {record.title}
                                </h2>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    color: '#6b7280',
                                    fontSize: '0.9rem',
                                    flexWrap: 'wrap'
                                }}>
                                    <span>{formatDate(record.date)}</span>
                                    <span>•</span>
                                    <span style={{ 
                                        color: typeColor,
                                        fontWeight: '500'
                                    }}>
                                        {getRecordTypeDisplayName()}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            style={{
                                background: 'rgba(107, 114, 128, 0.1)',
                                border: 'none',
                                borderRadius: '10px',
                                padding: '0.5rem',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transition: 'all 0.2s ease',
                                flexShrink: 0
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.background = 'rgba(107, 114, 128, 0.2)';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.background = 'rgba(107, 114, 128, 0.1)';
                            }}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"/>
                                <line x1="6" y1="6" x2="18" y2="18"/>
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div style={{
                    padding: '1.5rem 2rem',
                    overflowY: 'auto',
                    flex: 1
                }}>
                    {renderRecordContent()}
                </div>

                {/* Footer */}
                <div style={{
                    padding: '1rem 2rem',
                    borderTop: '1px solid #e5e7eb',
                    display: 'flex',
                    justifyContent: 'flex-end'
                }}>
                    <button
                        onClick={onClose}
                        style={{
                            background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '10px',
                            padding: '0.75rem 1.5rem',
                            fontSize: '0.95rem',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={e => {
                            e.currentTarget.style.transform = 'translateY(-1px)';
                            e.currentTarget.style.boxShadow = '0 4px 12px rgba(5, 150, 105, 0.3)';
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = 'none';
                        }}
                    >
                        {t('common.close') || 'Close'}
                    </button>
                </div>
            </div>
        </div>
    );

    return createPortal(modalContent, document.body);
};

export default MedicalRecordViewModal;
