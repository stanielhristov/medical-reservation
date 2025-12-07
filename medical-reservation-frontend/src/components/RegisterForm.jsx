import { useState, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { register } from '../api/auth.js';
import { COUNTRY_MAP } from '../utils/countryData';
import { formatAddress } from '../utils/addressUtils';
import { useValidation } from '../hooks/useValidation';
import PhoneInput from './PhoneInput';
import AddressInput from './AddressInput';
import UserTypeSelector from './UserTypeSelector';
import DateOfBirthInput from './DateOfBirthInput';
import PasswordInput from './PasswordInput';
import DoctorFields from './DoctorFields';
import LanguageSwitcher from './LanguageSwitcher';

export default function RegisterForm() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { validateDateOfBirth, validatePassword } = useValidation();

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        password: '',
        confirmPassword: '',
        role: 'USER',
        dateOfBirth: '',
        gender: '',
        emergencyPhone: ''
    });

    const [addressData, setAddressData] = useState({
        street: '',
        city: '',
        stateProvince: '',
        postalCode: '',
        countryCode: 'BG'
    });

    const [phoneCountry, setPhoneCountry] = useState('BG');
    const [emergencyPhoneCountry, setEmergencyPhoneCountry] = useState('BG');

    const [doctorData, setDoctorData] = useState({
        specialization: '',
        bio: '',
        licenseNumber: '',
        education: '',
        experience: ''
    });

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [loading, setLoading] = useState(false);
    const [dateError, setDateError] = useState('');

    const handleFormChange = useCallback((field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    }, []);

    const handleAddressChange = useCallback((field, value) => {
        setAddressData(prev => ({ ...prev, [field]: value }));
    }, []);

    const handleDoctorChange = useCallback((field, value) => {
        setDoctorData(prev => ({ ...prev, [field]: value }));
    }, []);

    const handleDateOfBirthChange = useCallback((e) => {
        const newDate = e.target.value;
        handleFormChange('dateOfBirth', newDate);
        
        const validation = validateDateOfBirth(newDate);
        if (!validation.isValid) {
            setDateError(validation.message);
        } else {
            setDateError('');
        }
    }, [handleFormChange, validateDateOfBirth]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);
        setLoading(true);

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            setLoading(false);
            return;
        }

        const dateValidation = validateDateOfBirth(formData.dateOfBirth);
        if (!dateValidation.isValid) {
            setError(dateValidation.message);
            setLoading(false);
            return;
        }

        if (dateError) {
            setError('Please fix the date of birth error before submitting');
            setLoading(false);
            return;
        }

        const passwordValidation = validatePassword(formData.password);
        if (!passwordValidation.isValid) {
            setError(passwordValidation.message);
            setLoading(false);
            return;
        }

        if (formData.role === 'DOCTOR') {
            if (!doctorData.specialization.trim()) {
                setError(t('auth.specializationRequired'));
                setLoading(false);
                return;
            }
            if (!doctorData.licenseNumber.trim()) {
                setError(t('auth.licenseRequired'));
                setLoading(false);
                return;
            }
        }

        try {
            const selectedPhoneCountry = COUNTRY_MAP.get(phoneCountry);
            const formattedPhoneNumber = formData.phoneNumber ? 
                `${selectedPhoneCountry.phone}${formData.phoneNumber}` : null;

            const selectedAddressCountry = COUNTRY_MAP.get(addressData.countryCode);
            const formattedAddress = formatAddress(addressData, selectedAddressCountry);
            
            const requestData = {
                fullName: formData.fullName,
                email: formData.email,
                phoneNumber: formattedPhoneNumber,
                password: formData.password,
                role: formData.role,
                dateOfBirth: formData.dateOfBirth,
                gender: formData.gender,
                address: formattedAddress,
            };

            if (formData.role === 'DOCTOR') {
                const selectedEmergencyCountry = COUNTRY_MAP.get(emergencyPhoneCountry);
                const formattedEmergencyPhone = formData.emergencyPhone ? 
                    `${selectedEmergencyCountry.phone}${formData.emergencyPhone}` : null;
                
                requestData.emergencyPhone = formattedEmergencyPhone;
                requestData.specialization = doctorData.specialization || null;
                requestData.bio = doctorData.bio || null;
                requestData.licenseNumber = doctorData.licenseNumber || null;
                requestData.education = doctorData.education || null;
                requestData.experience = doctorData.experience || null;
            }

            await register(requestData);

            if (formData.role === 'DOCTOR') {
                setSuccess(t('auth.doctorRegistrationSuccess'));
            } else {
                setSuccess(t('auth.registrationSuccess'));
            }
            
            setTimeout(() => {
                navigate('/login');
            }, 3000);
        } catch (err) {
            setError(err.message || t('auth.registrationFailed'));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            width: '100vw',
            background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
            position: 'relative',
            overflow: 'hidden',
            boxSizing: 'border-box'
        }}>
            {/* Header with Language Switcher */}
            <header style={{
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(20px)',
                padding: '1.5rem 2rem',
                boxShadow: '0 8px 32px rgba(34, 197, 94, 0.1)',
                border: '1px solid rgba(34, 197, 94, 0.1)',
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 1000
            }}>
                <div style={{
                    maxWidth: '1200px',
                    margin: '0 auto',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <Link to="/" style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        textDecoration: 'none',
                        color: '#374151'
                    }}>
                        <div style={{
                            width: '50px',
                            height: '50px',
                            background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                            borderRadius: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 8px 20px rgba(34, 197, 94, 0.3)'
                        }}>
                            <span style={{ fontSize: '1.5rem', color: 'white' }}>🏥</span>
                        </div>
                        <h1 style={{
                            fontSize: '1.8rem',
                            fontWeight: '800',
                            color: '#374151',
                            margin: 0,
                            letterSpacing: '-0.02em'
                        }}>
                            {t('landing.medReserve')}
                        </h1>
                    </Link>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <LanguageSwitcher />
                        <Link to="/" style={{
                            color: '#6b7280',
                            textDecoration: 'none',
                            fontWeight: '600',
                            fontSize: '1rem',
                            transition: 'all 0.3s ease',
                            padding: '0.5rem 1rem',
                            borderRadius: '8px'
                        }}>
                            {t('nav.home')}
                        </Link>
                    </div>
                </div>
            </header>

            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                padding: '100px 20px 20px',
                position: 'relative',
                boxSizing: 'border-box'
            }}>
            <div style={{
                position: 'absolute',
                top: '15%',
                right: '10%',
                width: '180px',
                height: '180px',
                background: 'rgba(34, 197, 94, 0.08)',
                borderRadius: '50%',
                zIndex: 0
            }} />
            
            <div style={{
                position: 'absolute',
                bottom: '25%',
                left: '15%',
                width: '140px',
                height: '140px',
                background: 'rgba(22, 163, 74, 0.06)',
                borderRadius: '50%',
                zIndex: 0
            }} />

            <div style={{
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(20px)',
                borderRadius: '24px',
                boxShadow: '0 20px 40px rgba(34, 197, 94, 0.1), 0 8px 32px rgba(0, 0, 0, 0.05)',
                padding: '3rem',
                width: '100%',
                maxWidth: '480px',
                minWidth: '350px',
                position: 'relative',
                zIndex: 1,
                border: '1px solid rgba(34, 197, 94, 0.1)',
                maxHeight: '90vh',
                overflowY: 'auto',
                boxSizing: 'border-box'
            }}>
                <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                    <div style={{
                        width: '72px',
                        height: '72px',
                        background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                        borderRadius: '20px',
                        margin: '0 auto 1.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 8px 24px rgba(34, 197, 94, 0.2)'
                    }}>
                        <span style={{ fontSize: '2rem', color: 'white' }}>👤</span>
                    </div>
                    <h1 style={{
                        fontSize: '1.75rem',
                        fontWeight: '600',
                        color: '#374151',
                        margin: '0 0 0.5rem',
                        letterSpacing: '-0.025em'
                    }}>
                        {t('auth.registerTitle')}
                    </h1>
                    <p style={{
                        color: '#6b7280',
                        fontSize: '0.95rem',
                        margin: 0,
                        lineHeight: 1.5
                    }}>
                        {t('auth.joinPortal')}
                    </p>
                </div>

                {error && (
                    <div style={{
                        background: 'rgba(248, 113, 113, 0.1)',
                        color: '#dc2626',
                        padding: '1rem',
                        borderRadius: '12px',
                        marginBottom: '1.5rem',
                        border: '1px solid rgba(248, 113, 113, 0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        fontSize: '0.9rem'
                    }}>
                        <span style={{ fontSize: '1.1rem' }}>⚠️</span>
                        {error}
                    </div>
                )}

                {success && (
                    <div style={{
                        background: 'rgba(34, 197, 94, 0.1)',
                        color: '#16a34a',
                        padding: '1rem',
                        borderRadius: '12px',
                        marginBottom: '1.5rem',
                        border: '1px solid rgba(34, 197, 94, 0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        fontSize: '0.9rem'
                    }}>
                        <span style={{ fontSize: '1.1rem' }}>✅</span>
                        {success}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <UserTypeSelector
                        value={formData.role}
                        onChange={(value) => handleFormChange('role', value)}
                        disabled={loading}
                    />

                    <div style={{ marginBottom: '1.25rem' }}>
                        <label style={{
                            display: 'block',
                            marginBottom: '0.5rem',
                            fontWeight: '500',
                            color: '#374151',
                            fontSize: '0.9rem'
                        }}>
                            {t('auth.fullName')}
                        </label>
                        <input
                            type="text"
                            value={formData.fullName}
                            onChange={e => handleFormChange('fullName', e.target.value)}
                            required
                            disabled={loading}
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
                            placeholder={t('auth.enterFullName')}
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
                            {t('auth.emailAddress')}
                        </label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={e => handleFormChange('email', e.target.value)}
                            required
                            disabled={loading}
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
                            placeholder={t('auth.enterEmailAddress')}
                        />
                    </div>

                    <PhoneInput
                        label={t('auth.phoneNumber')}
                        value={formData.phoneNumber}
                        onChange={(e) => handleFormChange('phoneNumber', e.target.value)}
                        countryCode={phoneCountry}
                        onCountryChange={setPhoneCountry}
                        disabled={loading}
                        required={true}
                        placeholder={t('common.phone')}
                    />

                    <DateOfBirthInput
                        value={formData.dateOfBirth}
                        onChange={handleDateOfBirthChange}
                        disabled={loading}
                        error={dateError}
                    />

                    <div style={{ marginBottom: '1.25rem' }}>
                        <label style={{
                            display: 'block',
                            marginBottom: '0.5rem',
                            fontWeight: '500',
                            color: '#374151',
                            fontSize: '0.9rem'
                        }}>
                            {t('auth.gender')}
                        </label>
                        <select
                            value={formData.gender}
                            onChange={e => handleFormChange('gender', e.target.value)}
                            required
                            disabled={loading}
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
                                cursor: 'pointer'
                            }}
                        >
                            <option value="">{t('auth.gender')}</option>
                            <option value="MALE">{t('auth.male')}</option>
                            <option value="FEMALE">{t('auth.female')}</option>
                        </select>
                    </div>

                    <AddressInput
                        street={addressData.street}
                        onStreetChange={(e) => handleAddressChange('street', e.target.value)}
                        city={addressData.city}
                        onCityChange={(e) => handleAddressChange('city', e.target.value)}
                        stateProvince={addressData.stateProvince}
                        onStateProvinceChange={(e) => handleAddressChange('stateProvince', e.target.value)}
                        postalCode={addressData.postalCode}
                        onPostalCodeChange={(e) => handleAddressChange('postalCode', e.target.value)}
                        countryCode={addressData.countryCode}
                        onCountryChange={(value) => handleAddressChange('countryCode', value)}
                        disabled={loading}
                    />

                    {formData.role === 'DOCTOR' && (
                        <PhoneInput
                            label="Emergency Phone Number"
                            value={formData.emergencyPhone}
                            onChange={(e) => handleFormChange('emergencyPhone', e.target.value)}
                            countryCode={emergencyPhoneCountry}
                            onCountryChange={setEmergencyPhoneCountry}
                            disabled={loading}
                            required={false}
                            placeholder="Enter emergency phone number"
                        />
                    )}

                    {formData.role === 'DOCTOR' && (
                        <DoctorFields
                            licenseNumber={doctorData.licenseNumber}
                            onLicenseNumberChange={(e) => handleDoctorChange('licenseNumber', e.target.value)}
                            specialization={doctorData.specialization}
                            onSpecializationChange={(e) => handleDoctorChange('specialization', e.target.value)}
                            education={doctorData.education}
                            onEducationChange={(e) => handleDoctorChange('education', e.target.value)}
                            experience={doctorData.experience}
                            onExperienceChange={(e) => handleDoctorChange('experience', e.target.value)}
                            bio={doctorData.bio}
                            onBioChange={(e) => handleDoctorChange('bio', e.target.value)}
                            disabled={loading}
                        />
                    )}

                    <PasswordInput
                        label={t('auth.password')}
                        value={formData.password}
                        onChange={(e) => handleFormChange('password', e.target.value)}
                        placeholder={t('auth.enterPassword')}
                        required={true}
                        disabled={loading}
                    />

                    <PasswordInput
                        label={t('auth.confirmPasswordLabel')}
                        value={formData.confirmPassword}
                        onChange={(e) => handleFormChange('confirmPassword', e.target.value)}
                        placeholder={t('auth.confirmPasswordPlaceholder')}
                        required={true}
                        disabled={loading}
                    />

                    <button 
                        type="submit" 
                        disabled={loading}
                        style={{
                            width: '100%',
                            padding: '0.875rem',
                            background: loading 
                                ? '#d1d5db'
                                : 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '12px',
                            fontSize: '1rem',
                            fontWeight: '500',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            transition: 'all 0.2s ease',
                            boxShadow: loading 
                                ? 'none'
                                : '0 4px 12px rgba(34, 197, 94, 0.2)',
                            position: 'relative',
                            overflow: 'hidden'
                        }}
                        onMouseEnter={e => {
                            if (!loading) {
                                e.target.style.transform = 'translateY(-1px)';
                                e.target.style.boxShadow = '0 6px 20px rgba(34, 197, 94, 0.25)';
                            }
                        }}
                        onMouseLeave={e => {
                            if (!loading) {
                                e.target.style.transform = 'translateY(0)';
                                e.target.style.boxShadow = '0 4px 12px rgba(34, 197, 94, 0.2)';
                            }
                        }}
                    >
                        {loading ? (
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                                <div style={{
                                    width: '18px',
                                    height: '18px',
                                    border: '2px solid rgba(255,255,255,0.3)',
                                    borderTop: '2px solid white',
                                    borderRadius: '50%',
                                    animation: 'spin 1s linear infinite'
                                }} />
                                {t('auth.creatingAccount')}
                            </div>
                        ) : (
                            t('auth.createAccountButton')
                        )}
                    </button>
                </form>

                <div style={{ 
                    marginTop: '2.5rem',
                    paddingTop: '2.5rem',
                    borderTop: '1px solid rgba(34, 197, 94, 0.15)',
                    position: 'relative'
                }}>
                    <div style={{
                        position: 'absolute',
                        top: '-10px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '80px',
                        height: '80px',
                        background: 'radial-gradient(circle, rgba(34, 197, 94, 0.08) 0%, transparent 70%)',
                        borderRadius: '50%',
                        zIndex: 0
                    }} />

                    <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
                        <div style={{
                            width: '56px',
                            height: '56px',
                            background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                            borderRadius: '16px',
                            margin: '0 auto 1.5rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 8px 24px rgba(34, 197, 94, 0.25)',
                            position: 'relative'
                        }}>
                            <span style={{ fontSize: '1.75rem', color: 'white' }}>🔐</span>
                            <div style={{
                                position: 'absolute',
                                inset: '-2px',
                                background: 'linear-gradient(45deg, transparent, rgba(255,255,255,0.2), transparent)',
                                borderRadius: '18px',
                                zIndex: -1
                            }} />
                        </div>

                        <h3 style={{
                            fontSize: '1.25rem',
                            fontWeight: '700',
                            color: '#374151',
                            margin: '0 0 0.75rem',
                            letterSpacing: '-0.025em'
                        }}>
                            {t('auth.alreadyMember')}
                        </h3>
                        
                        <p style={{ 
                            color: '#6b7280', 
                            marginBottom: '2rem', 
                            fontSize: '0.95rem',
                            lineHeight: '1.5',
                            maxWidth: '280px',
                            margin: '0 auto 2rem'
                        }}>
                            {t('auth.welcomeBackSignIn')}
                        </p>

                        <a 
                            href="/login" 
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.75rem',
                                padding: '1rem 2rem',
                                background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(22, 163, 74, 0.1) 100%)',
                                color: '#22c55e',
                                textDecoration: 'none',
                                fontWeight: '600',
                                fontSize: '1rem',
                                borderRadius: '14px',
                                border: '1px solid rgba(34, 197, 94, 0.2)',
                                transition: 'all 0.3s ease',
                                boxShadow: '0 4px 12px rgba(34, 197, 94, 0.1)',
                                position: 'relative',
                                overflow: 'hidden'
                            }}
                            onMouseEnter={e => {
                                e.target.style.background = 'linear-gradient(135deg, rgba(34, 197, 94, 0.15) 0%, rgba(22, 163, 74, 0.15) 100%)';
                                e.target.style.transform = 'translateY(-2px)';
                                e.target.style.boxShadow = '0 8px 24px rgba(34, 197, 94, 0.2)';
                                e.target.style.borderColor = 'rgba(34, 197, 94, 0.3)';
                            }}
                            onMouseLeave={e => {
                                e.target.style.background = 'linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(22, 163, 74, 0.1) 100%)';
                                e.target.style.transform = 'translateY(0)';
                                e.target.style.boxShadow = '0 4px 12px rgba(34, 197, 94, 0.1)';
                                e.target.style.borderColor = 'rgba(34, 197, 94, 0.2)';
                            }}
                        >
                            <span style={{
                                width: '20px',
                                height: '20px',
                                background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                                borderRadius: '6px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '0.75rem',
                                color: 'white'
                            }}>🚀</span>
                            {t('auth.signInHere')}
                        </a>
                    </div>
                </div>
            </div>

            </div>

            <style jsx>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
}
