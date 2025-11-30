import React from 'react';
import { useTranslation } from 'react-i18next';
import FormField from './FormField';
import { MEDICAL_SPECIALIZATIONS } from '../utils/countryData';
import { translateSpecialization } from '../utils/specializationUtils';

const DoctorProfileForm = ({ 
    doctorProfileData,
    doctorData, 
    onInputChange, 
    onSubmit, 
    saving, 
    hasDoctorDataChanged 
}) => {
    const { t } = useTranslation();
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
                    label={t('profile.specialization')}
                    name="specialization"
                    value={doctorProfileData.specialization}
                    onChange={handleInputChange}
                    required
                >
                    <select
                        name="specialization"
                        value={doctorProfileData.specialization}
                        onChange={handleInputChange}
                        required
                        style={{
                            width: '100%',
                            padding: '1rem',
                            border: '2px solid rgba(34, 197, 94, 0.2)',
                            borderRadius: '12px',
                            fontSize: '1rem',
                            transition: 'all 0.3s ease',
                            background: 'rgba(255, 255, 255, 0.8)',
                            outline: 'none',
                            appearance: 'none',
                            backgroundImage: 'url("data:image/svg+xml,%3csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 20 20\'%3e%3cpath stroke=\'%236b7280\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'1.5\' d=\'M6 8l4 4 4-4\'/%3e%3c/svg%3e")',
                            backgroundPosition: 'right 0.5rem center',
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: '1.5em 1.5em',
                            paddingRight: '2.5rem',
                            cursor: 'pointer'
                        }}
                        onFocus={(e) => {
                            e.target.style.borderColor = '#22c55e';
                            e.target.style.boxShadow = '0 0 0 3px rgba(34, 197, 94, 0.1)';
                        }}
                        onBlur={(e) => {
                            e.target.style.borderColor = 'rgba(34, 197, 94, 0.2)';
                            e.target.style.boxShadow = 'none';
                        }}
                    >
                        <option value="">{t('profile.selectSpecialization')}</option>
                        {MEDICAL_SPECIALIZATIONS.map(spec => (
                            <option key={spec} value={spec}>
                                {translateSpecialization(spec)}
                            </option>
                        ))}
                    </select>
                </FormField>

                <FormField
                    label={t('profile.licenseNumber')}
                    name="licenseNumber"
                    value={doctorProfileData.licenseNumber}
                    onChange={handleInputChange}
                    required
                    placeholder={t('profile.licenseNumberPlaceholder')}
                />

                <FormField
                    label={t('profile.consultationFee')}
                    name="price"
                    value={doctorProfileData.price}
                    onChange={handleInputChange}
                    type="number"
                    min="0"
                    step="1"
                    placeholder={t('profile.consultationFeePlaceholder')}
                />

                <FormField
                    label={t('profile.location')}
                    name="location"
                    value={doctorProfileData.location}
                    onChange={handleInputChange}
                    placeholder={t('profile.locationPlaceholder')}
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
                            {t('profile.currentRating')}
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
                                ({doctorData.totalRatings || 0} {doctorData.totalRatings === 1 ? t('doctors.review') : t('doctors.reviews')})
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
                        {t('profile.accountStatus')}
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
                            {doctorData?.isActive ? t('profile.active') : t('profile.inactive')}
                        </span>
                    </div>
                </div>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
                <FormField
                    label={t('profile.education')}
                    name="education"
                    value={doctorProfileData.education}
                    onChange={handleInputChange}
                    placeholder={t('profile.educationPlaceholder')}
                >
                    <textarea
                        name="education"
                        value={doctorProfileData.education}
                        onChange={handleInputChange}
                        rows="3"
                        placeholder={t('profile.educationPlaceholder')}
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
                    label={t('profile.experience')}
                    name="experience"
                    value={doctorProfileData.experience}
                    onChange={handleInputChange}
                    placeholder={t('profile.experiencePlaceholder')}
                >
                    <textarea
                        name="experience"
                        value={doctorProfileData.experience}
                        onChange={handleInputChange}
                        rows="3"
                        placeholder={t('profile.experiencePlaceholder')}
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
                    label={t('profile.bio')}
                    name="bio"
                    value={doctorProfileData.bio}
                    onChange={handleInputChange}
                    placeholder={t('profile.bioPlaceholder')}
                >
                    <textarea
                        name="bio"
                        value={doctorProfileData.bio}
                        onChange={handleInputChange}
                        rows="4"
                        placeholder={t('profile.bioPlaceholder')}
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
                            {t('profile.saving')}
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
                            {t('profile.saveDoctorInfo')}
                        </>
                    )}
                </button>
            </div>
        </form>
    );
};

export default DoctorProfileForm;
