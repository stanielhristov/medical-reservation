import React from 'react';
import { useNavigate } from 'react-router-dom';

const MedicalProfileForm = ({ 
    medicalData, 
    onInputChange, 
    onSubmit, 
    saving, 
    hasMedicalDataChanged
}) => {
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        onInputChange(e, 'medical');
    };

    return (
        <form onSubmit={onSubmit}>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '1.5rem',
                marginBottom: '2rem'
            }}>

                {/* Blood Type */}
                <div style={{ position: 'relative' }}>
                    <label style={{
                        display: 'block',
                        fontSize: '0.875rem',
                        fontWeight: '600',
                        color: '#374151',
                        marginBottom: '0.5rem'
                    }}>
                        Blood Type
                    </label>
                    <select
                        name="bloodType"
                        value={medicalData.bloodType || ''}
                        onChange={handleInputChange}
                        disabled={saving}
                        style={{
                            width: '100%',
                            padding: '0.875rem 1rem',
                            fontSize: '1rem',
                            lineHeight: '1.5',
                            color: '#374151',
                            backgroundColor: saving ? '#f9fafb' : '#ffffff',
                            backgroundImage: 'url("data:image/svg+xml,%3csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 20 20\'%3e%3cpath stroke=\'%236b7280\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'1.5\' d=\'m6 8 4 4 4-4\'/%3e%3c/svg%3e")',
                            backgroundPosition: 'right 0.75rem center',
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: '1.5em 1.5em',
                            border: '2px solid #e5e7eb',
                            borderRadius: '12px',
                            transition: 'all 0.2s ease-in-out',
                            appearance: 'none',
                            cursor: saving ? 'not-allowed' : 'pointer'
                        }}
                        onFocus={e => {
                            e.target.style.borderColor = '#22c55e';
                            e.target.style.boxShadow = '0 0 0 3px rgba(34, 197, 94, 0.1)';
                        }}
                        onBlur={e => {
                            e.target.style.borderColor = '#e5e7eb';
                            e.target.style.boxShadow = 'none';
                        }}
                    >
                        <option value="">Select Blood Type</option>
                        <option value="A_POSITIVE">A+</option>
                        <option value="A_NEGATIVE">A-</option>
                        <option value="B_POSITIVE">B+</option>
                        <option value="B_NEGATIVE">B-</option>
                        <option value="AB_POSITIVE">AB+</option>
                        <option value="AB_NEGATIVE">AB-</option>
                        <option value="O_POSITIVE">O+</option>
                        <option value="O_NEGATIVE">O-</option>
                    </select>
                </div>

                {/* Height */}
                <div style={{ position: 'relative' }}>
                    <label style={{
                        display: 'block',
                        fontSize: '0.875rem',
                        fontWeight: '600',
                        color: '#374151',
                        marginBottom: '0.5rem'
                    }}>
                        Height (cm)
                    </label>
                    <input
                        type="number"
                        step="0.1"
                        name="height"
                        value={medicalData.height || ''}
                        onChange={handleInputChange}
                        disabled={saving}
                        placeholder="e.g., 175.5"
                        style={{
                            width: '100%',
                            padding: '0.875rem 1rem',
                            fontSize: '1rem',
                            lineHeight: '1.5',
                            color: '#374151',
                            backgroundColor: saving ? '#f9fafb' : '#ffffff',
                            border: '2px solid #e5e7eb',
                            borderRadius: '12px',
                            transition: 'all 0.2s ease-in-out',
                            outline: 'none'
                        }}
                        onFocus={e => {
                            e.target.style.borderColor = '#22c55e';
                            e.target.style.boxShadow = '0 0 0 3px rgba(34, 197, 94, 0.1)';
                        }}
                        onBlur={e => {
                            e.target.style.borderColor = '#e5e7eb';
                            e.target.style.boxShadow = 'none';
                        }}
                    />
                </div>

                {/* Weight */}
                <div style={{ position: 'relative' }}>
                    <label style={{
                        display: 'block',
                        fontSize: '0.875rem',
                        fontWeight: '600',
                        color: '#374151',
                        marginBottom: '0.5rem'
                    }}>
                        Weight (kg)
                    </label>
                    <input
                        type="number"
                        step="0.1"
                        name="weight"
                        value={medicalData.weight || ''}
                        onChange={handleInputChange}
                        disabled={saving}
                        placeholder="e.g., 70.5"
                        style={{
                            width: '100%',
                            padding: '0.875rem 1rem',
                            fontSize: '1rem',
                            lineHeight: '1.5',
                            color: '#374151',
                            backgroundColor: saving ? '#f9fafb' : '#ffffff',
                            border: '2px solid #e5e7eb',
                            borderRadius: '12px',
                            transition: 'all 0.2s ease-in-out',
                            outline: 'none'
                        }}
                        onFocus={e => {
                            e.target.style.borderColor = '#22c55e';
                            e.target.style.boxShadow = '0 0 0 3px rgba(34, 197, 94, 0.1)';
                        }}
                        onBlur={e => {
                            e.target.style.borderColor = '#e5e7eb';
                            e.target.style.boxShadow = 'none';
                        }}
                    />
                </div>

                {/* BMI (read-only, calculated) */}
                <div style={{ position: 'relative' }}>
                    <label style={{
                        display: 'block',
                        fontSize: '0.875rem',
                        fontWeight: '600',
                        color: '#374151',
                        marginBottom: '0.5rem'
                    }}>
                        BMI (calculated)
                    </label>
                    <input
                        type="text"
                        value={medicalData.bmi || 'N/A'}
                        disabled
                        style={{
                            width: '100%',
                            padding: '0.875rem 1rem',
                            fontSize: '1rem',
                            lineHeight: '1.5',
                            color: '#6b7280',
                            backgroundColor: '#f9fafb',
                            border: '2px solid #e5e7eb',
                            borderRadius: '12px',
                            outline: 'none'
                        }}
                    />
                </div>
            </div>

            {/* Text areas for medical history */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr',
                gap: '1.5rem',
                marginBottom: '2rem'
            }}>
                {/* Chronic Conditions */}
                <div style={{ position: 'relative' }}>
                    <label style={{
                        display: 'block',
                        fontSize: '0.875rem',
                        fontWeight: '600',
                        color: '#374151',
                        marginBottom: '0.5rem'
                    }}>
                        Chronic Conditions
                    </label>
                    <textarea
                        name="chronicConditions"
                        value={medicalData.chronicConditions || ''}
                        onChange={handleInputChange}
                        disabled={saving}
                        placeholder="List any chronic conditions, long-term illnesses, or ongoing health issues..."
                        rows={4}
                        style={{
                            width: '100%',
                            padding: '0.875rem 1rem',
                            fontSize: '1rem',
                            lineHeight: '1.5',
                            color: '#374151',
                            backgroundColor: saving ? '#f9fafb' : '#ffffff',
                            border: '2px solid #e5e7eb',
                            borderRadius: '12px',
                            transition: 'all 0.2s ease-in-out',
                            outline: 'none',
                            resize: 'vertical'
                        }}
                        onFocus={e => {
                            e.target.style.borderColor = '#22c55e';
                            e.target.style.boxShadow = '0 0 0 3px rgba(34, 197, 94, 0.1)';
                        }}
                        onBlur={e => {
                            e.target.style.borderColor = '#e5e7eb';
                            e.target.style.boxShadow = 'none';
                        }}
                    />
                </div>

                {/* Allergies */}
                <div style={{ position: 'relative' }}>
                    <label style={{
                        display: 'block',
                        fontSize: '0.875rem',
                        fontWeight: '600',
                        color: '#374151',
                        marginBottom: '0.5rem'
                    }}>
                        Allergies
                    </label>
                    <textarea
                        name="allergies"
                        value={medicalData.allergies || ''}
                        onChange={handleInputChange}
                        disabled={saving}
                        placeholder="List any known allergies to medications, foods, environmental factors, etc..."
                        rows={3}
                        style={{
                            width: '100%',
                            padding: '0.875rem 1rem',
                            fontSize: '1rem',
                            lineHeight: '1.5',
                            color: '#374151',
                            backgroundColor: saving ? '#f9fafb' : '#ffffff',
                            border: '2px solid #e5e7eb',
                            borderRadius: '12px',
                            transition: 'all 0.2s ease-in-out',
                            outline: 'none',
                            resize: 'vertical'
                        }}
                        onFocus={e => {
                            e.target.style.borderColor = '#22c55e';
                            e.target.style.boxShadow = '0 0 0 3px rgba(34, 197, 94, 0.1)';
                        }}
                        onBlur={e => {
                            e.target.style.borderColor = '#e5e7eb';
                            e.target.style.boxShadow = 'none';
                        }}
                    />
                </div>

                {/* Current Medications */}
                <div style={{ position: 'relative' }}>
                    <label style={{
                        display: 'block',
                        fontSize: '0.875rem',
                        fontWeight: '600',
                        color: '#374151',
                        marginBottom: '0.5rem'
                    }}>
                        Current Medications
                    </label>
                    <textarea
                        name="currentMedications"
                        value={medicalData.currentMedications || ''}
                        onChange={handleInputChange}
                        disabled={saving}
                        placeholder="List all current medications, dosages, and frequency..."
                        rows={4}
                        style={{
                            width: '100%',
                            padding: '0.875rem 1rem',
                            fontSize: '1rem',
                            lineHeight: '1.5',
                            color: '#374151',
                            backgroundColor: saving ? '#f9fafb' : '#ffffff',
                            border: '2px solid #e5e7eb',
                            borderRadius: '12px',
                            transition: 'all 0.2s ease-in-out',
                            outline: 'none',
                            resize: 'vertical'
                        }}
                        onFocus={e => {
                            e.target.style.borderColor = '#22c55e';
                            e.target.style.boxShadow = '0 0 0 3px rgba(34, 197, 94, 0.1)';
                        }}
                        onBlur={e => {
                            e.target.style.borderColor = '#e5e7eb';
                            e.target.style.boxShadow = 'none';
                        }}
                    />
                </div>

                {/* Past Surgeries */}
                <div style={{ position: 'relative' }}>
                    <label style={{
                        display: 'block',
                        fontSize: '0.875rem',
                        fontWeight: '600',
                        color: '#374151',
                        marginBottom: '0.5rem'
                    }}>
                        Past Surgeries
                    </label>
                    <textarea
                        name="pastSurgeries"
                        value={medicalData.pastSurgeries || ''}
                        onChange={handleInputChange}
                        disabled={saving}
                        placeholder="List any previous surgeries, procedures, or operations with dates..."
                        rows={3}
                        style={{
                            width: '100%',
                            padding: '0.875rem 1rem',
                            fontSize: '1rem',
                            lineHeight: '1.5',
                            color: '#374151',
                            backgroundColor: saving ? '#f9fafb' : '#ffffff',
                            border: '2px solid #e5e7eb',
                            borderRadius: '12px',
                            transition: 'all 0.2s ease-in-out',
                            outline: 'none',
                            resize: 'vertical'
                        }}
                        onFocus={e => {
                            e.target.style.borderColor = '#22c55e';
                            e.target.style.boxShadow = '0 0 0 3px rgba(34, 197, 94, 0.1)';
                        }}
                        onBlur={e => {
                            e.target.style.borderColor = '#e5e7eb';
                            e.target.style.boxShadow = 'none';
                        }}
                    />
                </div>

                {/* Family Medical History */}
                <div style={{ position: 'relative' }}>
                    <label style={{
                        display: 'block',
                        fontSize: '0.875rem',
                        fontWeight: '600',
                        color: '#374151',
                        marginBottom: '0.5rem'
                    }}>
                        Family Medical History
                    </label>
                    <textarea
                        name="familyMedicalHistory"
                        value={medicalData.familyMedicalHistory || ''}
                        onChange={handleInputChange}
                        disabled={saving}
                        placeholder="Notable family medical history including hereditary conditions, major illnesses in family members..."
                        rows={4}
                        style={{
                            width: '100%',
                            padding: '0.875rem 1rem',
                            fontSize: '1rem',
                            lineHeight: '1.5',
                            color: '#374151',
                            backgroundColor: saving ? '#f9fafb' : '#ffffff',
                            border: '2px solid #e5e7eb',
                            borderRadius: '12px',
                            transition: 'all 0.2s ease-in-out',
                            outline: 'none',
                            resize: 'vertical'
                        }}
                        onFocus={e => {
                            e.target.style.borderColor = '#22c55e';
                            e.target.style.boxShadow = '0 0 0 3px rgba(34, 197, 94, 0.1)';
                        }}
                        onBlur={e => {
                            e.target.style.borderColor = '#e5e7eb';
                            e.target.style.boxShadow = 'none';
                        }}
                    />
                </div>
            </div>

            <div style={{
                display: 'flex',
                gap: '1rem',
                justifyContent: 'flex-end'
            }}>
                <button
                    type="button"
                    onClick={() => navigate(-1)}
                    style={{
                        padding: '1rem 2rem',
                        background: 'rgba(107, 114, 128, 0.1)',
                        color: '#374151',
                        border: '1px solid rgba(107, 114, 128, 0.2)',
                        borderRadius: '12px',
                        cursor: 'pointer',
                        fontWeight: '600',
                        fontSize: '1rem',
                        transition: 'all 0.3s ease'
                    }}
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={saving || !hasMedicalDataChanged}
                    style={{
                        padding: '1rem 2rem',
                        background: (saving || !hasMedicalDataChanged)
                            ? 'rgba(107, 114, 128, 0.3)' 
                            : 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '12px',
                        cursor: (saving || !hasMedicalDataChanged) ? 'not-allowed' : 'pointer',
                        fontWeight: '600',
                        fontSize: '1rem',
                        transition: 'all 0.3s ease',
                        boxShadow: (saving || !hasMedicalDataChanged) ? 'none' : '0 4px 12px rgba(34, 197, 94, 0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                    }}
                >
                    {saving ? (
                        <>
                            <div style={{
                                width: '16px',
                                height: '16px',
                                border: '2px solid rgba(255, 255, 255, 0.3)',
                                borderTop: '2px solid white',
                                borderRadius: '50%',
                                animation: 'spin 1s linear infinite'
                            }} />
                            Saving...
                        </>
                    ) : (
                        <>
                            <div style={{
                                width: '16px',
                                height: '16px',
                                position: 'relative'
                            }}>
                                <div style={{
                                    position: 'absolute',
                                    top: '2px',
                                    left: '8px',
                                    width: '2px',
                                    height: '10px',
                                    background: 'white',
                                    borderRadius: '1px'
                                }} />
                                <div style={{
                                    position: 'absolute',
                                    top: '6px',
                                    left: '4px',
                                    width: '10px',
                                    height: '2px',
                                    background: 'white',
                                    borderRadius: '1px'
                                }} />
                                <div style={{
                                    position: 'absolute',
                                    top: '2px',
                                    left: '2px',
                                    width: '6px',
                                    height: '6px',
                                    border: '2px solid white',
                                    borderRadius: '50%',
                                    background: 'transparent'
                                }} />
                                <div style={{
                                    position: 'absolute',
                                    top: '10px',
                                    left: '2px',
                                    width: '6px',
                                    height: '6px',
                                    border: '2px solid white',
                                    borderRadius: '50%',
                                    background: 'transparent'
                                }} />
                            </div>
                            Save Medical Info
                        </>
                    )}
                </button>
            </div>
        </form>
    );
};

export default MedicalProfileForm;
