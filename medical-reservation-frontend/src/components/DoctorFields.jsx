import { useTranslation } from 'react-i18next';
import { MEDICAL_SPECIALIZATIONS } from '../utils/countryData';
import { translateSpecialization } from '../utils/specializationUtils';

const DoctorFields = ({
    licenseNumber,
    onLicenseNumberChange,
    specialization,
    onSpecializationChange,
    education,
    onEducationChange,
    experience,
    onExperienceChange,
    bio,
    onBioChange,
    disabled
}) => {
    const { t } = useTranslation();
    return (
        <>
            <div style={{ marginBottom: '1.25rem' }}>
                <label style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontWeight: '500',
                    color: '#374151',
                    fontSize: '0.9rem'
                }}>
                    {t('auth.medicalLicenseNumber')} <span style={{ color: '#dc2626' }}>*</span>
                </label>
                <input
                    type="text"
                    value={licenseNumber}
                    onChange={onLicenseNumberChange}
                    required
                    disabled={disabled}
                    style={{
                        width: '100%',
                        padding: '0.875rem 1rem',
                        border: '1px solid #e5e7eb',
                        borderRadius: '12px',
                        fontSize: '0.95rem',
                        background: '#f9fafb',
                        outline: 'none',
                        boxSizing: 'border-box',
                        color: '#374151',
                        transition: 'all 0.2s ease'
                    }}
                    placeholder={t('auth.medicalLicensePlaceholder')}
                />
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
                <label style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontWeight: '500',
                    color: '#374151',
                    fontSize: '0.9rem'
                }}>
                    {t('auth.specializationLabel')} <span style={{ color: '#dc2626' }}>*</span>
                </label>
                <select
                    value={specialization}
                    onChange={onSpecializationChange}
                    required
                    disabled={disabled}
                    style={{
                        width: '100%',
                        padding: '0.875rem 1rem',
                        border: '1px solid #e5e7eb',
                        borderRadius: '12px',
                        fontSize: '0.95rem',
                        background: '#f9fafb',
                        outline: 'none',
                        boxSizing: 'border-box',
                        color: '#374151',
                        transition: 'all 0.2s ease',
                        appearance: 'none',
                        backgroundImage: 'url("data:image/svg+xml,%3csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 20 20\'%3e%3cpath stroke=\'%236b7280\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'1.5\' d=\'M6 8l4 4 4-4\'/%3e%3c/svg%3e")',
                        backgroundPosition: 'right 0.5rem center',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: '1.5em 1.5em',
                        paddingRight: '2.5rem'
                    }}
                >
                    <option value="">{t('profile.selectSpecialization')}</option>
                    {MEDICAL_SPECIALIZATIONS.map(spec => (
                        <option key={spec} value={spec}>
                            {translateSpecialization(spec)}
                        </option>
                    ))}
                </select>
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
                <label style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontWeight: '500',
                    color: '#374151',
                    fontSize: '0.9rem'
                }}>
                    {t('auth.educationLabel')}
                </label>
                <textarea
                    value={education}
                    onChange={onEducationChange}
                    disabled={disabled}
                    rows={3}
                    style={{
                        width: '100%',
                        padding: '0.875rem 1rem',
                        border: '1px solid #e5e7eb',
                        borderRadius: '12px',
                        fontSize: '0.95rem',
                        background: '#f9fafb',
                        outline: 'none',
                        boxSizing: 'border-box',
                        color: '#374151',
                        transition: 'all 0.2s ease',
                        resize: 'vertical',
                        minHeight: '80px'
                    }}
                    placeholder={t('auth.educationPlaceholder')}
                />
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
                <label style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontWeight: '500',
                    color: '#374151',
                    fontSize: '0.9rem'
                }}>
                    {t('auth.experienceLabel')}
                </label>
                <textarea
                    value={experience}
                    onChange={onExperienceChange}
                    disabled={disabled}
                    rows={3}
                    style={{
                        width: '100%',
                        padding: '0.875rem 1rem',
                        border: '1px solid #e5e7eb',
                        borderRadius: '12px',
                        fontSize: '0.95rem',
                        background: '#f9fafb',
                        outline: 'none',
                        boxSizing: 'border-box',
                        color: '#374151',
                        transition: 'all 0.2s ease',
                        resize: 'vertical',
                        minHeight: '80px'
                    }}
                    placeholder={t('auth.experiencePlaceholder')}
                />
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
                <label style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontWeight: '500',
                    color: '#374151',
                    fontSize: '0.9rem'
                }}>
                    {t('auth.professionalBio')}
                </label>
                <textarea
                    value={bio}
                    onChange={onBioChange}
                    disabled={disabled}
                    rows={4}
                    style={{
                        width: '100%',
                        padding: '0.875rem 1rem',
                        border: '1px solid #e5e7eb',
                        borderRadius: '12px',
                        fontSize: '0.95rem',
                        background: '#f9fafb',
                        outline: 'none',
                        boxSizing: 'border-box',
                        color: '#374151',
                        transition: 'all 0.2s ease',
                        resize: 'vertical',
                        minHeight: '100px'
                    }}
                    placeholder={t('auth.professionalBioPlaceholder')}
                />
            </div>
        </>
    );
};

export default DoctorFields;
