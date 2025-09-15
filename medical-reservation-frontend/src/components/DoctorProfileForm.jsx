import React from 'react';
import FormField from './FormField';

const DoctorProfileForm = ({ 
    doctorProfileData,
    doctorData, 
    onInputChange, 
    onSubmit, 
    saving, 
    hasDoctorDataChanged 
}) => {
    const handleInputChange = (e) => {
        onInputChange(e, 'doctor');
    };

    return (
        <form onSubmit={onSubmit}>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '1.5rem',
                marginBottom: '2rem'
            }}>
                <FormField
                    label="Specialization"
                    name="specialization"
                    value={doctorProfileData.specialization}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g. Cardiology, Dermatology, etc."
                />

                <FormField
                    label="License Number"
                    name="licenseNumber"
                    value={doctorProfileData.licenseNumber}
                    onChange={handleInputChange}
                    required
                    placeholder="Medical license number"
                />

                {doctorData?.rating !== undefined && (
                    <div>
                        <label style={{
                            display: 'block',
                            marginBottom: '0.5rem',
                            color: '#374151',
                            fontWeight: '600',
                            fontSize: '0.95rem'
                        }}>
                            Current Rating
                        </label>
                        <div style={{
                            width: '100%',
                            padding: '1rem',
                            border: '2px solid rgba(107, 114, 128, 0.15)',
                            borderRadius: '12px',
                            fontSize: '1rem',
                            background: 'linear-gradient(135deg, rgba(241, 245, 249, 0.9) 0%, rgba(248, 250, 252, 0.9) 100%)',
                            color: '#4b5563',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}>
                            <span style={{ fontSize: '1.2rem' }}>⭐</span>
                            <span style={{ fontWeight: '600' }}>
                                {doctorData.rating?.toFixed(1) || '0.0'}
                            </span>
                            <span style={{ color: '#6b7280' }}>
                                ({doctorData.totalRatings || 0} reviews)
                            </span>
                        </div>
                    </div>
                )}

                <div>
                    <label style={{
                        display: 'block',
                        marginBottom: '0.5rem',
                        color: '#374151',
                        fontWeight: '600',
                        fontSize: '0.95rem'
                    }}>
                        Account Status
                    </label>
                    <div style={{
                        width: '100%',
                        padding: '1rem',
                        border: '2px solid rgba(107, 114, 128, 0.15)',
                        borderRadius: '12px',
                        fontSize: '1rem',
                        background: 'linear-gradient(135deg, rgba(241, 245, 249, 0.9) 0%, rgba(248, 250, 252, 0.9) 100%)',
                        color: '#4b5563',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                    }}>
                        <span style={{ 
                            fontSize: '1rem',
                            color: doctorData?.isActive ? '#22c55e' : '#ef4444'
                        }}>
                            {doctorData?.isActive ? '✅' : '❌'}
                        </span>
                        <span style={{ 
                            fontWeight: '600',
                            color: doctorData?.isActive ? '#22c55e' : '#ef4444'
                        }}>
                            {doctorData?.isActive ? 'Active' : 'Inactive'}
                        </span>
                    </div>
                </div>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
                <FormField
                    label="Education"
                    name="education"
                    value={doctorProfileData.education}
                    onChange={handleInputChange}
                    placeholder="Medical degree, university, graduation year..."
                >
                    <textarea
                        name="education"
                        value={doctorProfileData.education}
                        onChange={handleInputChange}
                        rows="3"
                        placeholder="Medical degree, university, graduation year..."
                        style={{
                            width: '100%',
                            padding: '1rem',
                            border: '2px solid rgba(34, 197, 94, 0.2)',
                            borderRadius: '12px',
                            fontSize: '1rem',
                            transition: 'all 0.3s ease',
                            background: 'rgba(255, 255, 255, 0.8)',
                            outline: 'none',
                            resize: 'vertical',
                            fontFamily: 'inherit'
                        }}
                        onFocus={(e) => {
                            e.target.style.borderColor = '#22c55e';
                            e.target.style.boxShadow = '0 0 0 3px rgba(34, 197, 94, 0.1)';
                        }}
                        onBlur={(e) => {
                            e.target.style.borderColor = 'rgba(34, 197, 94, 0.2)';
                            e.target.style.boxShadow = 'none';
                        }}
                    />
                </FormField>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
                <FormField
                    label="Experience"
                    name="experience"
                    value={doctorProfileData.experience}
                    onChange={handleInputChange}
                    placeholder="Years of experience, previous positions, certifications..."
                >
                    <textarea
                        name="experience"
                        value={doctorProfileData.experience}
                        onChange={handleInputChange}
                        rows="3"
                        placeholder="Years of experience, previous positions, certifications..."
                        style={{
                            width: '100%',
                            padding: '1rem',
                            border: '2px solid rgba(34, 197, 94, 0.2)',
                            borderRadius: '12px',
                            fontSize: '1rem',
                            transition: 'all 0.3s ease',
                            background: 'rgba(255, 255, 255, 0.8)',
                            outline: 'none',
                            resize: 'vertical',
                            fontFamily: 'inherit'
                        }}
                        onFocus={(e) => {
                            e.target.style.borderColor = '#22c55e';
                            e.target.style.boxShadow = '0 0 0 3px rgba(34, 197, 94, 0.1)';
                        }}
                        onBlur={(e) => {
                            e.target.style.borderColor = 'rgba(34, 197, 94, 0.2)';
                            e.target.style.boxShadow = 'none';
                        }}
                    />
                </FormField>
            </div>

            <div style={{ marginBottom: '2rem' }}>
                <FormField
                    label="Bio"
                    name="bio"
                    value={doctorProfileData.bio}
                    onChange={handleInputChange}
                    placeholder="Brief professional bio..."
                >
                    <textarea
                        name="bio"
                        value={doctorProfileData.bio}
                        onChange={handleInputChange}
                        rows="4"
                        placeholder="Brief professional bio..."
                        style={{
                            width: '100%',
                            padding: '1rem',
                            border: '2px solid rgba(34, 197, 94, 0.2)',
                            borderRadius: '12px',
                            fontSize: '1rem',
                            transition: 'all 0.3s ease',
                            background: 'rgba(255, 255, 255, 0.8)',
                            outline: 'none',
                            resize: 'vertical',
                            fontFamily: 'inherit'
                        }}
                        onFocus={(e) => {
                            e.target.style.borderColor = '#22c55e';
                            e.target.style.boxShadow = '0 0 0 3px rgba(34, 197, 94, 0.1)';
                        }}
                        onBlur={(e) => {
                            e.target.style.borderColor = 'rgba(34, 197, 94, 0.2)';
                            e.target.style.boxShadow = 'none';
                        }}
                    />
                </FormField>
            </div>
            
            <div style={{
                display: 'flex',
                gap: '1rem',
                justifyContent: 'center'
            }}>
                <button
                    type="submit"
                    disabled={saving || !hasDoctorDataChanged}
                    style={{
                        padding: '1rem 2rem',
                        background: (saving || !hasDoctorDataChanged)
                            ? 'rgba(107, 114, 128, 0.3)' 
                            : 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '12px',
                        cursor: (saving || !hasDoctorDataChanged) ? 'not-allowed' : 'pointer',
                        fontWeight: '600',
                        fontSize: '1rem',
                        transition: 'all 0.3s ease',
                        boxShadow: (saving || !hasDoctorDataChanged) ? 'none' : '0 4px 12px rgba(34, 197, 94, 0.3)',
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
                                    left: '6px',
                                    width: '4px',
                                    height: '8px',
                                    background: 'white',
                                    borderRadius: '2px'
                                }} />
                                <div style={{
                                    position: 'absolute',
                                    top: '10px',
                                    left: '2px',
                                    width: '12px',
                                    height: '2px',
                                    background: 'white',
                                    borderRadius: '1px'
                                }} />
                                <div style={{
                                    position: 'absolute',
                                    top: '12px',
                                    left: '0px',
                                    width: '4px',
                                    height: '4px',
                                    border: '2px solid white',
                                    borderRadius: '50%'
                                }} />
                                <div style={{
                                    position: 'absolute',
                                    top: '12px',
                                    right: '0px',
                                    width: '4px',
                                    height: '4px',
                                    border: '2px solid white',
                                    borderRadius: '50%'
                                }} />
                            </div>
                            Save Doctor Info
                        </>
                    )}
                </button>
            </div>
        </form>
    );
};

export default DoctorProfileForm;
