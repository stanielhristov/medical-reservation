import { useState } from 'react';

const MedicalRecordModal = ({ 
    isOpen, 
    onClose, 
    onSave, 
    patient = null 
}) => {
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState(null);

    if (!isOpen || !patient) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setIsSaving(true);
        
        try {
            const formData = new FormData(e.target);
            const recordData = {
                patientId: patient.id,
                type: formData.get('type'),
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
        { value: 'consultation', label: 'Consultation', icon: '💬' },
        { value: 'test', label: 'Test/Lab Results', icon: '🧪' },
        { value: 'procedure', label: 'Medical Procedure', icon: '⚕️' },
        { value: 'checkup', label: 'Routine Checkup', icon: '🔍' },
        { value: 'emergency', label: 'Emergency Visit', icon: '🚨' },
        { value: 'followup', label: 'Follow-up Visit', icon: '📋' }
    ];

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
            padding: '1rem'
        }}>
            <div style={{
                background: 'white',
                borderRadius: '20px',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
                maxWidth: '700px',
                width: '100%',
                maxHeight: '90vh',
                overflowY: 'auto',
                position: 'relative'
            }}>
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
                            📋
                        </div>
                        <h3 style={{
                            fontSize: '1.5rem',
                            fontWeight: '700',
                            color: '#374151',
                            margin: '0 0 0.5rem'
                        }}>
                            Add Medical Record
                        </h3>
                        <p style={{ color: '#6b7280', margin: 0 }}>
                            Create a new medical record for {patient.name}
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
                                    Record Type <span style={{ color: '#dc2626' }}>*</span>
                                </label>
                                <select
                                    name="type"
                                    required
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
                                    <option value="">Select type...</option>
                                    {recordTypes.map(type => (
                                        <option key={type.value} value={type.value}>
                                            {type.icon} {type.label}
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
                                    Title <span style={{ color: '#dc2626' }}>*</span>
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    required
                                    placeholder="Enter record title"
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

                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{
                                display: 'block',
                                marginBottom: '0.5rem',
                                fontWeight: '600',
                                color: '#374151',
                                fontSize: '0.9rem'
                            }}>
                                Description <span style={{ color: '#dc2626' }}>*</span>
                            </label>
                            <textarea
                                name="description"
                                required
                                rows={3}
                                placeholder="Describe the medical visit, symptoms, or procedure"
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
                                Diagnosis <span style={{ color: '#dc2626' }}>*</span>
                            </label>
                            <textarea
                                name="diagnosis"
                                required
                                rows={2}
                                placeholder="Enter the medical diagnosis"
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
                                Treatment Plan <span style={{ color: '#dc2626' }}>*</span>
                            </label>
                            <textarea
                                name="treatment"
                                required
                                rows={3}
                                placeholder="Describe the treatment plan or recommendations"
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
                                Prescription
                            </label>
                            <textarea
                                name="prescription"
                                rows={2}
                                placeholder="Enter prescription details (optional)"
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
                                Cancel
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
                                {isSaving ? 'Saving...' : 'Save Medical Record'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default MedicalRecordModal;
