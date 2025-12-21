import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';

const MedicalRecordModal = ({ 
    isOpen, 
    onClose, 
    onSave, 
    patient = null 
}) => {
    const { t } = useTranslation();
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState(null);
    const [selectedType, setSelectedType] = useState('');

    useEffect(() => {
        if (!isOpen) {
            setSelectedType('');
            setError(null);
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

    if (!isOpen || !patient) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setIsSaving(true);
        
        try {
            const formData = new FormData(e.target);
            const recordData = {
                patientId: patient.id,
                type: selectedType, // Use the React state directly instead of formData
                title: formData.get('title'),
                description: formData.get('description'),
                diagnosis: formData.get('diagnosis'),
                treatment: formData.get('treatment'),
                prescription: formData.get('prescription'),
                date: new Date().toISOString()
            };
            
            await onSave(recordData);
            onClose();
        } catch (err) {
            setError(err.message || 'Failed to save medical record. Please try again.');
            console.error('Error saving medical record:', err);
        } finally {
            setIsSaving(false);
        }
    };

    const recordTypes = [
        { value: 'consultation', label: t('medicalRecord.types.consultation') },
        { value: 'test', label: t('medicalRecord.types.test') },
        { value: 'procedure', label: t('medicalRecord.types.procedure') },
        { value: 'checkup', label: t('medicalRecord.types.checkup') },
        { value: 'emergency', label: t('medicalRecord.types.emergency') },
        { value: 'followup', label: t('medicalRecord.types.followup') },
        { value: 'prescription', label: t('medicalRecord.types.prescription') }
    ];

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
                    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15), 0 10px 30px rgba(34, 197, 94, 0.1)',
                maxWidth: '700px',
                width: '100%',
                    maxHeight: '85vh',
                overflowY: 'auto',
                    position: 'relative',
                    border: '1px solid rgba(34, 197, 94, 0.2)'
                }}
            >
                <div style={{ padding: '2rem' }}>
                    <button
                        onClick={onClose}
                        style={{
                            position: 'absolute',
                            top: '1rem',
                            right: '1rem',
                            background: 'none',
                            border: 'none',
                            fontSize: '1.5rem',
                            cursor: 'pointer',
                            color: '#6b7280',
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'background 0.2s ease'
                        }}
                        onMouseEnter={e => {
                            e.target.style.background = 'rgba(107, 114, 128, 0.1)';
                        }}
                        onMouseLeave={e => {
                            e.target.style.background = 'none';
                        }}
                    >
                        ✕
                    </button>

                    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                        <div style={{
                            width: '80px',
                            height: '80px',
                            background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                            borderRadius: '16px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '2rem',
                            margin: '0 auto 1rem',
                            color: 'white'
                        }}>
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                                <polyline points="14,2 14,8 20,8"/>
                                <line x1="16" y1="13" x2="8" y2="13"/>
                                <line x1="16" y1="17" x2="8" y2="17"/>
                                <polyline points="10,9 9,9 8,9"/>
                            </svg>
                        </div>
                        <h3 style={{
                            fontSize: '1.5rem',
                            fontWeight: '700',
                            color: '#374151',
                            margin: '0 0 0.5rem'
                        }}>
                            {t('medicalRecord.addTitle')}
                        </h3>
                        <p style={{ color: '#6b7280', margin: 0 }}>
                            {t('medicalRecord.createFor', { name: patient.name })}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                            gap: '1rem',
                            marginBottom: '1.5rem'
                        }}>
                            <div>
                                <label style={{
                                    display: 'block',
                                    marginBottom: '0.5rem',
                                    fontWeight: '600',
                                    color: '#374151',
                                    fontSize: '0.9rem'
                                }}>
                                    {t('medicalRecord.recordType')} <span style={{ color: '#dc2626' }}>*</span>
                                </label>
                                <select
                                    name="type"
                                    required
                                    value={selectedType}
                                    onChange={(e) => setSelectedType(e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem',
                                        border: '2px solid rgba(5, 150, 105, 0.2)',
                                        borderRadius: '8px',
                                        fontSize: '1rem',
                                        outline: 'none',
                                        boxSizing: 'border-box',
                                        background: 'white',
                                        transition: 'border-color 0.2s ease'
                                    }}
                                    onFocus={e => {
                                        e.target.style.borderColor = '#059669';
                                    }}
                                    onBlur={e => {
                                        e.target.style.borderColor = 'rgba(5, 150, 105, 0.2)';
                                    }}
                                >
                                    <option value="">{t('medicalRecord.selectType')}</option>
                                    {recordTypes.map(type => (
                                        <option key={type.value} value={type.value}>
                                            {type.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label style={{
                                    display: 'block',
                                    marginBottom: '0.5rem',
                                    fontWeight: '600',
                                    color: '#374151',
                                    fontSize: '0.9rem'
                                }}>
                                    {t('medicalRecord.title')} <span style={{ color: '#dc2626' }}>*</span>
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    required
                                    placeholder={t('medicalRecord.titlePlaceholder')}
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem',
                                        border: '2px solid rgba(5, 150, 105, 0.2)',
                                        borderRadius: '8px',
                                        fontSize: '1rem',
                                        outline: 'none',
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
                            </div>
                        </div>

                        {selectedType === 'prescription' ? (
                            <>
                                <div style={{ marginBottom: '1.5rem' }}>
                                    <label style={{
                                        display: 'block',
                                        marginBottom: '0.5rem',
                                        fontWeight: '600',
                                        color: '#374151',
                                        fontSize: '0.9rem'
                                    }}>
                                        {t('medicalRecord.prescription.reason')} <span style={{ color: '#dc2626' }}>*</span>
                                    </label>
                                    <textarea
                                        name="description"
                                        required
                                        rows={3}
                                        placeholder={t('medicalRecord.prescription.reasonPlaceholder')}
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem',
                                            border: '2px solid rgba(5, 150, 105, 0.2)',
                                            borderRadius: '8px',
                                            fontSize: '1rem',
                                            outline: 'none',
                                            boxSizing: 'border-box',
                                            resize: 'vertical',
                                            minHeight: '80px',
                                            transition: 'border-color 0.2s ease'
                                        }}
                                        onFocus={e => {
                                            e.target.style.borderColor = '#059669';
                                        }}
                                        onBlur={e => {
                                            e.target.style.borderColor = 'rgba(5, 150, 105, 0.2)';
                                        }}
                                    />
                                </div>

                                <div style={{ marginBottom: '1.5rem' }}>
                                    <label style={{
                                        display: 'block',
                                        marginBottom: '0.5rem',
                                        fontWeight: '600',
                                        color: '#374151',
                                        fontSize: '0.9rem'
                                    }}>
                                        {t('medicalRecord.prescription.diagnosis')} <span style={{ color: '#dc2626' }}>*</span>
                                    </label>
                                    <textarea
                                        name="diagnosis"
                                        required
                                        rows={2}
                                        placeholder={t('medicalRecord.prescription.diagnosisPlaceholder')}
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem',
                                            border: '2px solid rgba(5, 150, 105, 0.2)',
                                            borderRadius: '8px',
                                            fontSize: '1rem',
                                            outline: 'none',
                                            boxSizing: 'border-box',
                                            resize: 'vertical',
                                            minHeight: '60px',
                                            transition: 'border-color 0.2s ease'
                                        }}
                                        onFocus={e => {
                                            e.target.style.borderColor = '#059669';
                                        }}
                                        onBlur={e => {
                                            e.target.style.borderColor = 'rgba(5, 150, 105, 0.2)';
                                        }}
                                    />
                                </div>

                                <div style={{ marginBottom: '1.5rem' }}>
                                    <label style={{
                                        display: 'block',
                                        marginBottom: '0.5rem',
                                        fontWeight: '600',
                                        color: '#374151',
                                        fontSize: '0.9rem'
                                    }}>
                                        {t('medicalRecord.prescription.details')} <span style={{ color: '#dc2626' }}>*</span>
                                    </label>
                                    <textarea
                                        name="prescription"
                                        required
                                        rows={4}
                                        placeholder={t('medicalRecord.prescription.detailsPlaceholder')}
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem',
                                            border: '2px solid rgba(5, 150, 105, 0.2)',
                                            borderRadius: '8px',
                                            fontSize: '1rem',
                                            outline: 'none',
                                            boxSizing: 'border-box',
                                            resize: 'vertical',
                                            minHeight: '100px',
                                            transition: 'border-color 0.2s ease'
                                        }}
                                        onFocus={e => {
                                            e.target.style.borderColor = '#059669';
                                        }}
                                        onBlur={e => {
                                            e.target.style.borderColor = 'rgba(5, 150, 105, 0.2)';
                                        }}
                                    />
                                </div>

                                <div style={{ marginBottom: '2rem' }}>
                                    <label style={{
                                        display: 'block',
                                        marginBottom: '0.5rem',
                                        fontWeight: '600',
                                        color: '#374151',
                                        fontSize: '0.9rem'
                                    }}>
                                        {t('medicalRecord.prescription.instructions')}
                                    </label>
                                    <textarea
                                        name="treatment"
                                        rows={3}
                                        placeholder={t('medicalRecord.prescription.instructionsPlaceholder')}
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem',
                                            border: '2px solid rgba(5, 150, 105, 0.2)',
                                            borderRadius: '8px',
                                            fontSize: '1rem',
                                            outline: 'none',
                                            boxSizing: 'border-box',
                                            resize: 'vertical',
                                            minHeight: '80px',
                                            transition: 'border-color 0.2s ease'
                                        }}
                                        onFocus={e => {
                                            e.target.style.borderColor = '#059669';
                                        }}
                                        onBlur={e => {
                                            e.target.style.borderColor = 'rgba(5, 150, 105, 0.2)';
                                        }}
                                    />
                                </div>
                            </>
                        ) : selectedType === 'test' ? (
                            <>
                                <div style={{ marginBottom: '1.5rem' }}>
                                    <label style={{
                                        display: 'block',
                                        marginBottom: '0.5rem',
                                        fontWeight: '600',
                                        color: '#374151',
                                        fontSize: '0.9rem'
                                    }}>
                                        {t('medicalRecord.test.description')} <span style={{ color: '#dc2626' }}>*</span>
                                    </label>
                                    <textarea
                                        name="description"
                                        required
                                        rows={3}
                                        placeholder={t('medicalRecord.test.descriptionPlaceholder')}
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem',
                                            border: '2px solid rgba(5, 150, 105, 0.2)',
                                            borderRadius: '8px',
                                            fontSize: '1rem',
                                            outline: 'none',
                                            boxSizing: 'border-box',
                                            resize: 'vertical',
                                            minHeight: '80px',
                                            transition: 'border-color 0.2s ease'
                                        }}
                                        onFocus={e => {
                                            e.target.style.borderColor = '#059669';
                                        }}
                                        onBlur={e => {
                                            e.target.style.borderColor = 'rgba(5, 150, 105, 0.2)';
                                        }}
                                    />
                                </div>

                                <div style={{ marginBottom: '1.5rem' }}>
                                    <label style={{
                                        display: 'block',
                                        marginBottom: '0.5rem',
                                        fontWeight: '600',
                                        color: '#374151',
                                        fontSize: '0.9rem'
                                    }}>
                                        {t('medicalRecord.test.results')} <span style={{ color: '#dc2626' }}>*</span>
                                    </label>
                                    <textarea
                                        name="diagnosis"
                                        required
                                        rows={3}
                                        placeholder={t('medicalRecord.test.resultsPlaceholder')}
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem',
                                            border: '2px solid rgba(5, 150, 105, 0.2)',
                                            borderRadius: '8px',
                                            fontSize: '1rem',
                                            outline: 'none',
                                            boxSizing: 'border-box',
                                            resize: 'vertical',
                                            minHeight: '80px',
                                            transition: 'border-color 0.2s ease'
                                        }}
                                        onFocus={e => {
                                            e.target.style.borderColor = '#059669';
                                        }}
                                        onBlur={e => {
                                            e.target.style.borderColor = 'rgba(5, 150, 105, 0.2)';
                                        }}
                                    />
                                </div>

                                <div style={{ marginBottom: '1.5rem' }}>
                                    <label style={{
                                        display: 'block',
                                        marginBottom: '0.5rem',
                                        fontWeight: '600',
                                        color: '#374151',
                                        fontSize: '0.9rem'
                                    }}>
                                        {t('medicalRecord.test.interpretation')} <span style={{ color: '#dc2626' }}>*</span>
                                    </label>
                                    <textarea
                                        name="treatment"
                                        required
                                        rows={3}
                                        placeholder={t('medicalRecord.test.interpretationPlaceholder')}
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem',
                                            border: '2px solid rgba(5, 150, 105, 0.2)',
                                            borderRadius: '8px',
                                            fontSize: '1rem',
                                            outline: 'none',
                                            boxSizing: 'border-box',
                                            resize: 'vertical',
                                            minHeight: '80px',
                                            transition: 'border-color 0.2s ease'
                                        }}
                                        onFocus={e => {
                                            e.target.style.borderColor = '#059669';
                                        }}
                                        onBlur={e => {
                                            e.target.style.borderColor = 'rgba(5, 150, 105, 0.2)';
                                        }}
                                    />
                                </div>
                            </>
                        ) : selectedType === 'procedure' || selectedType === 'emergency' ? (
                            <>
                                <div style={{ marginBottom: '1.5rem' }}>
                                    <label style={{
                                        display: 'block',
                                        marginBottom: '0.5rem',
                                        fontWeight: '600',
                                        color: '#374151',
                                        fontSize: '0.9rem'
                                    }}>
                                        {t('medicalRecord.procedure.description')} <span style={{ color: '#dc2626' }}>*</span>
                                    </label>
                                    <textarea
                                        name="description"
                                        required
                                        rows={3}
                                        placeholder={t('medicalRecord.procedure.descriptionPlaceholder')}
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem',
                                            border: '2px solid rgba(5, 150, 105, 0.2)',
                                            borderRadius: '8px',
                                            fontSize: '1rem',
                                            outline: 'none',
                                            boxSizing: 'border-box',
                                            resize: 'vertical',
                                            minHeight: '80px',
                                            transition: 'border-color 0.2s ease'
                                        }}
                                        onFocus={e => {
                                            e.target.style.borderColor = '#059669';
                                        }}
                                        onBlur={e => {
                                            e.target.style.borderColor = 'rgba(5, 150, 105, 0.2)';
                                        }}
                                    />
                                </div>

                                <div style={{ marginBottom: '1.5rem' }}>
                                    <label style={{
                                        display: 'block',
                                        marginBottom: '0.5rem',
                                        fontWeight: '600',
                                        color: '#374151',
                                        fontSize: '0.9rem'
                                    }}>
                                        {t('medicalRecord.procedure.findings')} <span style={{ color: '#dc2626' }}>*</span>
                                    </label>
                                    <textarea
                                        name="diagnosis"
                                        required
                                        rows={3}
                                        placeholder={t('medicalRecord.procedure.findingsPlaceholder')}
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem',
                                            border: '2px solid rgba(5, 150, 105, 0.2)',
                                            borderRadius: '8px',
                                            fontSize: '1rem',
                                            outline: 'none',
                                            boxSizing: 'border-box',
                                            resize: 'vertical',
                                            minHeight: '80px',
                                            transition: 'border-color 0.2s ease'
                                        }}
                                        onFocus={e => {
                                            e.target.style.borderColor = '#059669';
                                        }}
                                        onBlur={e => {
                                            e.target.style.borderColor = 'rgba(5, 150, 105, 0.2)';
                                        }}
                                    />
                                </div>

                                <div style={{ marginBottom: '1.5rem' }}>
                                    <label style={{
                                        display: 'block',
                                        marginBottom: '0.5rem',
                                        fontWeight: '600',
                                        color: '#374151',
                                        fontSize: '0.9rem'
                                    }}>
                                        {t('medicalRecord.procedure.postCare')} <span style={{ color: '#dc2626' }}>*</span>
                                    </label>
                                    <textarea
                                        name="treatment"
                                        required
                                        rows={3}
                                        placeholder={t('medicalRecord.procedure.postCarePlaceholder')}
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem',
                                            border: '2px solid rgba(5, 150, 105, 0.2)',
                                            borderRadius: '8px',
                                            fontSize: '1rem',
                                            outline: 'none',
                                            boxSizing: 'border-box',
                                            resize: 'vertical',
                                            minHeight: '80px',
                                            transition: 'border-color 0.2s ease'
                                        }}
                                        onFocus={e => {
                                            e.target.style.borderColor = '#059669';
                                        }}
                                        onBlur={e => {
                                            e.target.style.borderColor = 'rgba(5, 150, 105, 0.2)';
                                        }}
                                    />
                                </div>

                                <div style={{ marginBottom: '2rem' }}>
                                    <label style={{
                                        display: 'block',
                                        marginBottom: '0.5rem',
                                        fontWeight: '600',
                                        color: '#374151',
                                        fontSize: '0.9rem'
                                    }}>
                                        {t('medicalRecord.procedure.medications')}
                                    </label>
                                    <textarea
                                        name="prescription"
                                        rows={2}
                                        placeholder={t('medicalRecord.procedure.medicationsPlaceholder')}
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem',
                                            border: '2px solid rgba(5, 150, 105, 0.2)',
                                            borderRadius: '8px',
                                            fontSize: '1rem',
                                            outline: 'none',
                                            boxSizing: 'border-box',
                                            resize: 'vertical',
                                            minHeight: '60px',
                                            transition: 'border-color 0.2s ease'
                                        }}
                                        onFocus={e => {
                                            e.target.style.borderColor = '#059669';
                                        }}
                                        onBlur={e => {
                                            e.target.style.borderColor = 'rgba(5, 150, 105, 0.2)';
                                        }}
                                    />
                                </div>
                            </>
                        ) : (
                            <>
                                <div style={{ marginBottom: '1.5rem' }}>
                                    <label style={{
                                        display: 'block',
                                        marginBottom: '0.5rem',
                                        fontWeight: '600',
                                        color: '#374151',
                                        fontSize: '0.9rem'
                                    }}>
                                        {t('medicalRecord.default.description')} <span style={{ color: '#dc2626' }}>*</span>
                                    </label>
                                    <textarea
                                        name="description"
                                        required
                                        rows={3}
                                        placeholder={t('medicalRecord.default.descriptionPlaceholder')}
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem',
                                            border: '2px solid rgba(5, 150, 105, 0.2)',
                                            borderRadius: '8px',
                                            fontSize: '1rem',
                                            outline: 'none',
                                            boxSizing: 'border-box',
                                            resize: 'vertical',
                                            minHeight: '80px',
                                            transition: 'border-color 0.2s ease'
                                        }}
                                        onFocus={e => {
                                            e.target.style.borderColor = '#059669';
                                        }}
                                        onBlur={e => {
                                            e.target.style.borderColor = 'rgba(5, 150, 105, 0.2)';
                                        }}
                                    />
                                </div>

                                <div style={{ marginBottom: '1.5rem' }}>
                                    <label style={{
                                        display: 'block',
                                        marginBottom: '0.5rem',
                                        fontWeight: '600',
                                        color: '#374151',
                                        fontSize: '0.9rem'
                                    }}>
                                        {t('medicalRecord.default.diagnosis')} <span style={{ color: '#dc2626' }}>*</span>
                                    </label>
                                    <textarea
                                        name="diagnosis"
                                        required
                                        rows={2}
                                        placeholder={t('medicalRecord.default.diagnosisPlaceholder')}
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem',
                                            border: '2px solid rgba(5, 150, 105, 0.2)',
                                            borderRadius: '8px',
                                            fontSize: '1rem',
                                            outline: 'none',
                                            boxSizing: 'border-box',
                                            resize: 'vertical',
                                            minHeight: '60px',
                                            transition: 'border-color 0.2s ease'
                                        }}
                                        onFocus={e => {
                                            e.target.style.borderColor = '#059669';
                                        }}
                                        onBlur={e => {
                                            e.target.style.borderColor = 'rgba(5, 150, 105, 0.2)';
                                        }}
                                    />
                                </div>

                                <div style={{ marginBottom: '1.5rem' }}>
                                    <label style={{
                                        display: 'block',
                                        marginBottom: '0.5rem',
                                        fontWeight: '600',
                                        color: '#374151',
                                        fontSize: '0.9rem'
                                    }}>
                                        {t('medicalRecord.default.treatment')} <span style={{ color: '#dc2626' }}>*</span>
                                    </label>
                                    <textarea
                                        name="treatment"
                                        required
                                        rows={3}
                                        placeholder={t('medicalRecord.default.treatmentPlaceholder')}
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem',
                                            border: '2px solid rgba(5, 150, 105, 0.2)',
                                            borderRadius: '8px',
                                            fontSize: '1rem',
                                            outline: 'none',
                                            boxSizing: 'border-box',
                                            resize: 'vertical',
                                            minHeight: '80px',
                                            transition: 'border-color 0.2s ease'
                                        }}
                                        onFocus={e => {
                                            e.target.style.borderColor = '#059669';
                                        }}
                                        onBlur={e => {
                                            e.target.style.borderColor = 'rgba(5, 150, 105, 0.2)';
                                        }}
                                    />
                                </div>

                                <div style={{ marginBottom: '2rem' }}>
                                    <label style={{
                                        display: 'block',
                                        marginBottom: '0.5rem',
                                        fontWeight: '600',
                                        color: '#374151',
                                        fontSize: '0.9rem'
                                    }}>
                                        {t('medicalRecord.default.prescription')}
                                    </label>
                                    <textarea
                                        name="prescription"
                                        rows={2}
                                        placeholder={t('medicalRecord.default.prescriptionPlaceholder')}
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem',
                                            border: '2px solid rgba(5, 150, 105, 0.2)',
                                            borderRadius: '8px',
                                            fontSize: '1rem',
                                            outline: 'none',
                                            boxSizing: 'border-box',
                                            resize: 'vertical',
                                            minHeight: '60px',
                                            transition: 'border-color 0.2s ease'
                                        }}
                                        onFocus={e => {
                                            e.target.style.borderColor = '#059669';
                                        }}
                                        onBlur={e => {
                                            e.target.style.borderColor = 'rgba(5, 150, 105, 0.2)';
                                        }}
                                    />
                                </div>
                            </>
                        )}

                        {error && (
                            <div style={{
                                background: 'rgba(239, 68, 68, 0.1)',
                                border: '1px solid rgba(239, 68, 68, 0.3)',
                                borderRadius: '8px',
                                padding: '1rem',
                                marginBottom: '1.5rem',
                                color: '#dc2626'
                            }}>
                                {error}
                            </div>
                        )}

                        <div style={{ 
                            display: 'flex', 
                            gap: '1rem',
                            justifyContent: 'flex-end'
                        }}>
                            <button
                                type="button"
                                onClick={onClose}
                                disabled={isSaving}
                                style={{
                                    padding: '0.75rem 1.5rem',
                                    background: 'rgba(107, 114, 128, 0.1)',
                                    color: '#6b7280',
                                    border: '1px solid rgba(107, 114, 128, 0.2)',
                                    borderRadius: '8px',
                                    cursor: isSaving ? 'not-allowed' : 'pointer',
                                    fontWeight: '500',
                                    fontSize: '1rem',
                                    transition: 'all 0.2s ease',
                                    opacity: isSaving ? 0.6 : 1
                                }}
                                onMouseEnter={e => {
                                    if (!isSaving) {
                                        e.target.style.background = 'rgba(107, 114, 128, 0.15)';
                                    }
                                }}
                                onMouseLeave={e => {
                                    if (!isSaving) {
                                        e.target.style.background = 'rgba(107, 114, 128, 0.1)';
                                    }
                                }}
                            >
                                {t('medicalRecord.cancel')}
                            </button>
                            
                            <button
                                type="submit"
                                disabled={isSaving}
                                style={{
                                    padding: '0.75rem 1.5rem',
                                    background: isSaving 
                                        ? 'rgba(107, 114, 128, 0.3)' 
                                        : 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '8px',
                                    cursor: isSaving ? 'not-allowed' : 'pointer',
                                    fontWeight: '600',
                                    fontSize: '1rem',
                                    transition: 'all 0.2s ease',
                                    boxShadow: isSaving ? 'none' : '0 4px 12px rgba(5, 150, 105, 0.3)',
                                    opacity: isSaving ? 0.7 : 1
                                }}
                                onMouseEnter={e => {
                                    if (!isSaving) {
                                        e.target.style.transform = 'translateY(-1px)';
                                        e.target.style.boxShadow = '0 6px 16px rgba(5, 150, 105, 0.4)';
                                    }
                                }}
                                onMouseLeave={e => {
                                    if (!isSaving) {
                                        e.target.style.transform = 'translateY(0)';
                                        e.target.style.boxShadow = '0 4px 12px rgba(5, 150, 105, 0.3)';
                                    }
                                }}
                            >
                                {isSaving ? t('medicalRecord.saving') : t('medicalRecord.save')}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );

    return createPortal(modalContent, document.body);
};

export default MedicalRecordModal;
