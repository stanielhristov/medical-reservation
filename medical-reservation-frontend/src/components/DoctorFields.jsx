import { MEDICAL_SPECIALIZATIONS } from '../utils/countryData';

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
                    Medical License Number <span style={{ color: '#dc2626' }}>*</span>
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
                    placeholder="Enter your medical license number"
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
                    Specialization <span style={{ color: '#dc2626' }}>*</span>
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
                    <option value="">Select a specialization</option>
                    {MEDICAL_SPECIALIZATIONS.map(spec => (
                        <option key={spec} value={spec}>
                            {spec}
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
                    Education
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
                    placeholder="Enter your medical education background"
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
                    Experience
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
                    placeholder="Describe your professional experience"
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
                    Professional Bio
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
                    placeholder="Write a brief professional bio for patients to read"
                />
            </div>
        </>
    );
};

export default DoctorFields;
