import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { getUserProfile, updateUserProfile, changePassword } from '../api/profile';
import { getDoctorByUserId, updateDoctor } from '../api/doctors';

const COUNTRIES = [
    { code: 'US', name: 'United States', flag: '🇺🇸', phone: '+1' },
    { code: 'GB', name: 'United Kingdom', flag: '🇬🇧', phone: '+44' },
    { code: 'CA', name: 'Canada', flag: '🇨🇦', phone: '+1' },
    { code: 'AU', name: 'Australia', flag: '🇦🇺', phone: '+61' },
    { code: 'DE', name: 'Germany', flag: '🇩🇪', phone: '+49' },
    { code: 'FR', name: 'France', flag: '🇫🇷', phone: '+33' },
    { code: 'IT', name: 'Italy', flag: '🇮🇹', phone: '+39' },
    { code: 'ES', name: 'Spain', flag: '🇪🇸', phone: '+34' },
    { code: 'NL', name: 'Netherlands', flag: '🇳🇱', phone: '+31' },
    { code: 'CH', name: 'Switzerland', flag: '🇨🇭', phone: '+41' },
    { code: 'IN', name: 'India', flag: '🇮🇳', phone: '+91' },
    { code: 'CN', name: 'China', flag: '🇨🇳', phone: '+86' },
    { code: 'JP', name: 'Japan', flag: '🇯🇵', phone: '+81' },
    { code: 'BR', name: 'Brazil', flag: '🇧🇷', phone: '+55' },
    { code: 'MX', name: 'Mexico', flag: '🇲🇽', phone: '+52' },
    { code: 'AF', name: 'Afghanistan', flag: '🇦🇫', phone: '+93' },
    { code: 'AL', name: 'Albania', flag: '🇦🇱', phone: '+355' },
    { code: 'DZ', name: 'Algeria', flag: '🇩🇿', phone: '+213' },
    { code: 'AR', name: 'Argentina', flag: '🇦🇷', phone: '+54' },
    { code: 'AM', name: 'Armenia', flag: '🇦🇲', phone: '+374' },
    { code: 'AT', name: 'Austria', flag: '🇦🇹', phone: '+43' },
    { code: 'AZ', name: 'Azerbaijan', flag: '🇦🇿', phone: '+994' },
    { code: 'BH', name: 'Bahrain', flag: '🇧🇭', phone: '+973' },
    { code: 'BD', name: 'Bangladesh', flag: '🇧🇩', phone: '+880' },
    { code: 'BY', name: 'Belarus', flag: '🇧🇾', phone: '+375' },
    { code: 'BE', name: 'Belgium', flag: '🇧🇪', phone: '+32' },
    { code: 'BG', name: 'Bulgaria', flag: '🇧🇬', phone: '+359' },
    { code: 'CL', name: 'Chile', flag: '🇨🇱', phone: '+56' },
    { code: 'CO', name: 'Colombia', flag: '🇨🇴', phone: '+57' },
    { code: 'HR', name: 'Croatia', flag: '🇭🇷', phone: '+385' },
    { code: 'CZ', name: 'Czech Republic', flag: '🇨🇿', phone: '+420' },
    { code: 'DK', name: 'Denmark', flag: '🇩🇰', phone: '+45' },
    { code: 'EG', name: 'Egypt', flag: '🇪🇬', phone: '+20' },
    { code: 'EE', name: 'Estonia', flag: '🇪🇪', phone: '+372' },
    { code: 'FI', name: 'Finland', flag: '🇫🇮', phone: '+358' },
    { code: 'GE', name: 'Georgia', flag: '🇬🇪', phone: '+995' },
    { code: 'GR', name: 'Greece', flag: '🇬🇷', phone: '+30' },
    { code: 'HU', name: 'Hungary', flag: '🇭🇺', phone: '+36' },
    { code: 'IS', name: 'Iceland', flag: '🇮🇸', phone: '+354' },
    { code: 'ID', name: 'Indonesia', flag: '🇮🇩', phone: '+62' },
    { code: 'IR', name: 'Iran', flag: '🇮🇷', phone: '+98' },
    { code: 'IQ', name: 'Iraq', flag: '🇮🇶', phone: '+964' },
    { code: 'IE', name: 'Ireland', flag: '🇮🇪', phone: '+353' },
    { code: 'IL', name: 'Israel', flag: '🇮🇱', phone: '+972' },
    { code: 'JO', name: 'Jordan', flag: '🇯🇴', phone: '+962' },
    { code: 'KZ', name: 'Kazakhstan', flag: '🇰🇿', phone: '+7' },
    { code: 'KE', name: 'Kenya', flag: '🇰🇪', phone: '+254' },
    { code: 'KR', name: 'South Korea', flag: '🇰🇷', phone: '+82' },
    { code: 'KW', name: 'Kuwait', flag: '🇰🇼', phone: '+965' },
    { code: 'LV', name: 'Latvia', flag: '🇱🇻', phone: '+371' },
    { code: 'LB', name: 'Lebanon', flag: '🇱🇧', phone: '+961' },
    { code: 'LT', name: 'Lithuania', flag: '🇱🇹', phone: '+370' },
    { code: 'LU', name: 'Luxembourg', flag: '🇱🇺', phone: '+352' },
    { code: 'MY', name: 'Malaysia', flag: '🇲🇾', phone: '+60' },
    { code: 'MT', name: 'Malta', flag: '🇲🇹', phone: '+356' },
    { code: 'MA', name: 'Morocco', flag: '🇲🇦', phone: '+212' },
    { code: 'NZ', name: 'New Zealand', flag: '🇳🇿', phone: '+64' },
    { code: 'NG', name: 'Nigeria', flag: '🇳🇬', phone: '+234' },
    { code: 'NO', name: 'Norway', flag: '🇳🇴', phone: '+47' },
    { code: 'OM', name: 'Oman', flag: '🇴🇲', phone: '+968' },
    { code: 'PK', name: 'Pakistan', flag: '🇵🇰', phone: '+92' },
    { code: 'PE', name: 'Peru', flag: '🇵🇪', phone: '+51' },
    { code: 'PH', name: 'Philippines', flag: '🇵🇭', phone: '+63' },
    { code: 'PL', name: 'Poland', flag: '🇵🇱', phone: '+48' },
    { code: 'PT', name: 'Portugal', flag: '🇵🇹', phone: '+351' },
    { code: 'QA', name: 'Qatar', flag: '🇶🇦', phone: '+974' },
    { code: 'RO', name: 'Romania', flag: '🇷🇴', phone: '+40' },
    { code: 'RU', name: 'Russia', flag: '🇷🇺', phone: '+7' },
    { code: 'SA', name: 'Saudi Arabia', flag: '🇸🇦', phone: '+966' },
    { code: 'RS', name: 'Serbia', flag: '🇷🇸', phone: '+381' },
    { code: 'SG', name: 'Singapore', flag: '🇸🇬', phone: '+65' },
    { code: 'SK', name: 'Slovakia', flag: '🇸🇰', phone: '+421' },
    { code: 'SI', name: 'Slovenia', flag: '🇸🇮', phone: '+386' },
    { code: 'ZA', name: 'South Africa', flag: '🇿🇦', phone: '+27' },
    { code: 'LK', name: 'Sri Lanka', flag: '🇱🇰', phone: '+94' },
    { code: 'SE', name: 'Sweden', flag: '🇸🇪', phone: '+46' },
    { code: 'TH', name: 'Thailand', flag: '🇹🇭', phone: '+66' },
    { code: 'TR', name: 'Turkey', flag: '🇹🇷', phone: '+90' },
    { code: 'UA', name: 'Ukraine', flag: '🇺🇦', phone: '+380' },
    { code: 'AE', name: 'United Arab Emirates', flag: '🇦🇪', phone: '+971' },
    { code: 'UY', name: 'Uruguay', flag: '🇺🇾', phone: '+598' },
    { code: 'UZ', name: 'Uzbekistan', flag: '🇺🇿', phone: '+998' },
    { code: 'VE', name: 'Venezuela', flag: '🇻🇪', phone: '+58' },
    { code: 'VN', name: 'Vietnam', flag: '🇻🇳', phone: '+84' },
    { code: 'ZW', name: 'Zimbabwe', flag: '🇿🇼', phone: '+263' }
];

const COUNTRY_MAP = new Map(COUNTRIES.map(country => [country.code, country]));

const parseAddress = (addressString) => {
    if (!addressString || typeof addressString !== 'string') {
        return {
            street: '',
            city: '',
            stateProvince: '',
            postalCode: '',
            countryCode: 'US'
        };
    }

    const parts = addressString.split(',').map(part => part.trim()).filter(part => part);
    
    if (parts.length === 0) {
        return {
            street: '',
            city: '',
            stateProvince: '',
            postalCode: '',
            countryCode: 'US'
        };
    }

    let countryCode = 'US';
    let addressParts = [...parts];
    
    if (parts.length > 0) {
        const lastPart = parts[parts.length - 1];
        const foundCountry = COUNTRIES.find(country => 
            country.name.toLowerCase() === lastPart.toLowerCase()
        );
        if (foundCountry) {
            countryCode = foundCountry.code;
            addressParts = parts.slice(0, -1);
        }
    }

    const result = {
        street: '',
        city: '',
        stateProvince: '',
        postalCode: '',
        countryCode: countryCode
    };

    if (addressParts.length >= 1) result.street = addressParts[0];
    if (addressParts.length >= 2) result.city = addressParts[1];
    if (addressParts.length >= 3) result.stateProvince = addressParts[2];
    if (addressParts.length >= 4) result.postalCode = addressParts[3];

    return result;
};

const EditProfilePage = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [activeTab, setActiveTab] = useState('profile');
    const [doctorData, setDoctorData] = useState(null);
    const [isDoctor, setIsDoctor] = useState(false);

    const [profileData, setProfileData] = useState({
        fullName: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        address: '',
        emergencyContact: ''
    });
    

    const [originalProfileData, setOriginalProfileData] = useState({
        fullName: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        address: '',
        emergencyContact: ''
    });

    const [addressData, setAddressData] = useState({
        street: '',
        city: '',
        stateProvince: '',
        postalCode: '',
        countryCode: 'US'
    });

    const [originalAddressData, setOriginalAddressData] = useState({
        street: '',
        city: '',
        stateProvince: '',
        postalCode: '',
        countryCode: 'US'
    });

    const [doctorProfileData, setDoctorProfileData] = useState({
        specialization: '',
        bio: '',
        licenseNumber: '',
        education: '',
        experience: ''
    });

    const [originalDoctorProfileData, setOriginalDoctorProfileData] = useState({
        specialization: '',
        bio: '',
        licenseNumber: '',
        education: '',
        experience: ''
    });

    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    
    const [message, setMessage] = useState({ type: '', text: '' });
    const [messageTimeout, setMessageTimeout] = useState(null);

    const setMessageWithAutoFade = useCallback((type, text, duration = 3000) => {
        if (messageTimeout) {
            clearTimeout(messageTimeout);
        }

        setMessage({ type, text, fadeOut: false });

        if (type === 'success') {
            const timeout = setTimeout(() => {
                setMessage(prev => ({ ...prev, fadeOut: true }));

                setTimeout(() => {
                    setMessage({ type: '', text: '' });
                    setMessageTimeout(null);
                }, 500);
            }, duration);
            setMessageTimeout(timeout);
        }
    }, [messageTimeout]);

    const hasProfileDataChanged = useMemo(() => {
        const profileChanged = 
            profileData.fullName !== originalProfileData.fullName ||
            profileData.phone !== originalProfileData.phone ||
            profileData.dateOfBirth !== originalProfileData.dateOfBirth ||
            profileData.emergencyContact !== originalProfileData.emergencyContact;

        const addressChanged = 
            addressData.street !== originalAddressData.street ||
            addressData.city !== originalAddressData.city ||
            addressData.stateProvince !== originalAddressData.stateProvince ||
            addressData.postalCode !== originalAddressData.postalCode ||
            addressData.countryCode !== originalAddressData.countryCode;

        return profileChanged || addressChanged;
    }, [profileData, originalProfileData, addressData, originalAddressData]);

    const hasDoctorDataChanged = useMemo(() => {
        return doctorProfileData.specialization !== originalDoctorProfileData.specialization ||
               doctorProfileData.bio !== originalDoctorProfileData.bio ||
               doctorProfileData.licenseNumber !== originalDoctorProfileData.licenseNumber ||
               doctorProfileData.education !== originalDoctorProfileData.education ||
               doctorProfileData.experience !== originalDoctorProfileData.experience;
    }, [doctorProfileData, originalDoctorProfileData]);

    const hasPasswordDataInput = useMemo(() => {
        return passwordData.currentPassword !== '' ||
               passwordData.newPassword !== '' ||
               passwordData.confirmPassword !== '';
    }, [passwordData]);

    useEffect(() => {
        return () => {
            if (messageTimeout) {
                clearTimeout(messageTimeout);
            }
        };
    }, [messageTimeout]);

    useEffect(() => {
        fetchUserProfile();
        if (user?.role === 'DOCTOR') {
            setIsDoctor(true);
            fetchDoctorProfile();
        }
    }, []);

    const fetchUserProfile = async () => {
        try {
            if (!user?.id) {
                console.error('User ID not available');
                return;
            }

            const profile = await getUserProfile(user.id);
            const profileDataObj = {
                fullName: profile.fullName || '',
                email: profile.email || '',
                phone: profile.phone || '',
                dateOfBirth: profile.dateOfBirth ? profile.dateOfBirth.split('T')[0] : '',
                address: profile.address || '',
                emergencyContact: profile.emergencyContact || ''
            };
            
            setProfileData(profileDataObj);
            setOriginalProfileData(profileDataObj);
            
            const parsedAddress = parseAddress(profile.address);
            setAddressData(parsedAddress);
            setOriginalAddressData(parsedAddress);
        } catch (error) {
            console.error('Error fetching profile:', error);
            setMessage({ type: 'error', text: 'Failed to load profile data' });
        } finally {
            setLoading(false);
        }
    };

    const fetchDoctorProfile = async () => {
        try {
            if (!user?.id) {
                console.error('User ID not available');
                return;
            }

            const doctor = await getDoctorByUserId(user.id);
            setDoctorData(doctor);
            const doctorDataObj = {
                specialization: doctor.specialization || '',
                bio: doctor.bio || '',
                licenseNumber: doctor.licenseNumber || '',
                education: doctor.education || '',
                experience: doctor.experience || ''
            };
            setDoctorProfileData(doctorDataObj);
            setOriginalDoctorProfileData(doctorDataObj);
        } catch (error) {
            console.error('Error fetching doctor profile:', error);
        }
    };

    const handleProfileSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        if (messageTimeout) {
            clearTimeout(messageTimeout);
            setMessageTimeout(null);
        }
        setMessage({ type: '', text: '' });

        try {
            const selectedAddressCountry = COUNTRY_MAP.get(addressData.countryCode) || COUNTRIES[0];
            const addressParts = [
                addressData.street,
                addressData.city,
                addressData.stateProvince,
                addressData.postalCode,
                selectedAddressCountry.name
            ].filter(part => part && part.trim() !== '');
            const formattedAddress = addressParts.length > 0 ? addressParts.join(', ') : '';

            const { email, ...profileDataWithoutEmail } = profileData;

            profileDataWithoutEmail.address = formattedAddress;

            if (user?.role === 'USER') {
                const { emergencyContact, ...profileDataForPatient } = profileDataWithoutEmail;
                await updateUserProfile(user.id, profileDataForPatient);
            } else {
                await updateUserProfile(user.id, profileDataWithoutEmail);
            }
            setMessageWithAutoFade('success', 'Profile updated successfully!');

            if (profileData.fullName !== user.fullName) {
                const updatedUser = { ...user, fullName: profileData.fullName };
                localStorage.setItem('user', JSON.stringify(updatedUser));
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            setMessage({ type: 'error', text: error.message || 'Failed to update profile' });
        } finally {
            setSaving(false);
        }
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        // Clear any existing message and timeout
        if (messageTimeout) {
            clearTimeout(messageTimeout);
            setMessageTimeout(null);
        }
        setMessage({ type: '', text: '' });

        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setMessage({ type: 'error', text: 'New passwords do not match' });
            setSaving(false);
            return;
        }

        if (passwordData.newPassword.length < 6) {
            setMessage({ type: 'error', text: 'New password must be at least 6 characters long' });
            setSaving(false);
            return;
        }

        try {
            await changePassword(user.id, {
                currentPassword: passwordData.currentPassword,
                newPassword: passwordData.newPassword
            });
            setMessageWithAutoFade('success', 'Password changed successfully!');
            setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
        } catch (error) {
            console.error('Error changing password:', error);
            setMessage({ type: 'error', text: error.message || 'Failed to change password' });
        } finally {
            setSaving(false);
        }
    };

    const handleDoctorProfileSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        if (messageTimeout) {
            clearTimeout(messageTimeout);
            setMessageTimeout(null);
        }
        setMessage({ type: '', text: '' });

        try {
            if (!doctorData?.id) {
                throw new Error('Doctor profile not found');
            }
            
            await updateDoctor(doctorData.id, doctorProfileData);
            setMessageWithAutoFade('success', 'Doctor profile updated successfully!');
        } catch (error) {
            console.error('Error updating doctor profile:', error);
            setMessage({ type: 'error', text: error.message || 'Failed to update doctor profile' });
        } finally {
            setSaving(false);
        }
    };

    const handleInputChange = (e, formType) => {
        const { name, value } = e.target;
        if (formType === 'profile') {
            if (name === 'email') {
                return;
            }
            setProfileData(prev => ({ ...prev, [name]: value }));
        } else if (formType === 'doctor') {
            setDoctorProfileData(prev => ({ ...prev, [name]: value }));
        } else {
            setPasswordData(prev => ({ ...prev, [name]: value }));
        }
    };

    // Address change handlers
    const handleAddressChange = useCallback((field, value) => {
        setAddressData(prev => ({ ...prev, [field]: value }));
    }, []);

    const handleStreetChange = useCallback((e) => {
        handleAddressChange('street', e.target.value);
    }, [handleAddressChange]);

    const handleCityChange = useCallback((e) => {
        handleAddressChange('city', e.target.value);
    }, [handleAddressChange]);

    const handleStateProvinceChange = useCallback((e) => {
        handleAddressChange('stateProvince', e.target.value);
    }, [handleAddressChange]);

    const handlePostalCodeChange = useCallback((e) => {
        handleAddressChange('postalCode', e.target.value);
    }, [handleAddressChange]);

    const handleAddressCountryChange = useCallback((countryCode) => {
        handleAddressChange('countryCode', countryCode);
    }, [handleAddressChange]);

    // Memoized address input component
    const AddressInput = useCallback(({ 
        street, onStreetChange, 
        city, onCityChange, 
        stateProvince, onStateProvinceChange, 
        postalCode, onPostalCodeChange, 
        countryCode, onCountryChange, 
        disabled 
    }) => {
        const selectedCountry = useMemo(() => 
            COUNTRY_MAP.get(countryCode) || COUNTRIES[0], 
            [countryCode]
        );
        
        const handleCountryChange = useCallback((e) => {
            onCountryChange(e.target.value);
        }, [onCountryChange]);
        
        return (
            <div style={{ marginBottom: '1.5rem' }}>
                <label style={{
                    display: 'block',
                    marginBottom: '0.75rem',
                    fontWeight: '600',
                    color: '#374151',
                    fontSize: '0.95rem'
                }}>
                    Address
                </label>
                
                {/* Street Address */}
                <div style={{ marginBottom: '0.75rem' }}>
                    <input
                        type="text"
                        value={street}
                        onChange={onStreetChange}
                        disabled={disabled}
                        placeholder="Street address"
                        style={{
                            width: '100%',
                            padding: '1rem',
                            border: '2px solid rgba(34, 197, 94, 0.2)',
                            borderRadius: '12px',
                            fontSize: '1rem',
                            transition: 'all 0.3s ease',
                            background: 'rgba(255, 255, 255, 0.8)',
                            outline: 'none'
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
                </div>

                {/* City and State/Province Row */}
                <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.75rem' }}>
                    <input
                        type="text"
                        value={city}
                        onChange={onCityChange}
                        disabled={disabled}
                        placeholder="City"
                        style={{
                            flex: 2,
                            padding: '1rem',
                            border: '2px solid rgba(34, 197, 94, 0.2)',
                            borderRadius: '12px',
                            fontSize: '1rem',
                            transition: 'all 0.3s ease',
                            background: 'rgba(255, 255, 255, 0.8)',
                            outline: 'none'
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
                    <input
                        type="text"
                        value={stateProvince}
                        onChange={onStateProvinceChange}
                        disabled={disabled}
                        placeholder="State/Province"
                        style={{
                            flex: 1,
                            padding: '1rem',
                            border: '2px solid rgba(34, 197, 94, 0.2)',
                            borderRadius: '12px',
                            fontSize: '1rem',
                            transition: 'all 0.3s ease',
                            background: 'rgba(255, 255, 255, 0.8)',
                            outline: 'none'
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
                </div>

                {/* Postal Code and Country Row */}
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <input
                        type="text"
                        value={postalCode}
                        onChange={onPostalCodeChange}
                        disabled={disabled}
                        placeholder="Postal/ZIP Code"
                        style={{
                            flex: 1,
                            padding: '1rem',
                            border: '2px solid rgba(34, 197, 94, 0.2)',
                            borderRadius: '12px',
                            fontSize: '1rem',
                            transition: 'all 0.3s ease',
                            background: 'rgba(255, 255, 255, 0.8)',
                            outline: 'none'
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
                    <div style={{ flex: 2, position: 'relative' }}>
                        <select
                            value={countryCode}
                            onChange={handleCountryChange}
                            disabled={disabled}
                            style={{
                                width: '100%',
                                padding: '1rem',
                                border: '2px solid rgba(34, 197, 94, 0.2)',
                                borderRadius: '12px',
                                fontSize: '1rem',
                                background: 'rgba(255, 255, 255, 0.8)',
                                outline: 'none',
                                color: '#374151',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease'
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
                            {COUNTRIES.map(country => (
                                <option key={country.code} value={country.code}>
                                    {country.flag} {country.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                
                <div style={{
                    fontSize: '0.8rem',
                    color: '#6b7280',
                    marginTop: '0.5rem',
                    marginLeft: '0.5rem'
                }}>
                    Selected country: {selectedCountry.flag} {selectedCountry.name}
                </div>
            </div>
        );
    }, []);

    if (loading) {
        return (
            <div style={{
                minHeight: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 50%, #bbf7d0 100%)'
            }}>
                <div style={{
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '24px',
                    padding: '3rem',
                    textAlign: 'center',
                    boxShadow: '0 20px 40px rgba(34, 197, 94, 0.1)',
                    border: '1px solid rgba(34, 197, 94, 0.1)'
                }}>
                    <div style={{
                        width: '60px',
                        height: '60px',
                        border: '4px solid rgba(34, 197, 94, 0.2)',
                        borderTop: '4px solid #22c55e',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite',
                        margin: '0 auto 1.5rem'
                    }} />
                    <p style={{ color: '#6b7280', margin: 0, fontSize: '1rem', fontWeight: '500' }}>
                        Loading profile...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 30%, #bbf7d0 70%, #a7f3d0 100%)',
            padding: '2rem 1rem'
        }}>
            <div style={{
                maxWidth: '900px',
                margin: '0 auto'
            }}>
                {/* Header */}
                <div style={{
                    background: 'rgba(255, 255, 255, 0.98)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '24px',
                    padding: '2.5rem',
                    marginBottom: '2rem',
                    boxShadow: '0 20px 40px rgba(34, 197, 94, 0.1)',
                    border: '1px solid rgba(34, 197, 94, 0.15)',
                    textAlign: 'center'
                }}>
                    <div style={{
                        width: '80px',
                        height: '80px',
                        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                        borderRadius: '20px',
                        margin: '0 auto 1.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 12px 32px rgba(16, 185, 129, 0.3)',
                        border: '2px solid #047857',
                        position: 'relative'
                    }}>
                        {/* Settings/Gear Icon */}
                        <div style={{
                            width: '40px',
                            height: '40px',
                            position: 'relative'
                        }}>
                            {/* Outer gear ring */}
                            <div style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                width: '32px',
                                height: '32px',
                                transform: 'translate(-50%, -50%)',
                                border: '4px solid white',
                                borderRadius: '50%'
                            }} />
                            {/* Inner circle */}
                            <div style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                width: '16px',
                                height: '16px',
                                transform: 'translate(-50%, -50%)',
                                background: 'white',
                                borderRadius: '50%'
                            }} />
                            {/* Gear teeth */}
                            <div style={{
                                position: 'absolute',
                                top: '2px',
                                left: '50%',
                                width: '4px',
                                height: '8px',
                                background: 'white',
                                transform: 'translateX(-50%)',
                                borderRadius: '2px'
                            }} />
                            <div style={{
                                position: 'absolute',
                                bottom: '2px',
                                left: '50%',
                                width: '4px',
                                height: '8px',
                                background: 'white',
                                transform: 'translateX(-50%)',
                                borderRadius: '2px'
                            }} />
                            <div style={{
                                position: 'absolute',
                                left: '2px',
                                top: '50%',
                                width: '8px',
                                height: '4px',
                                background: 'white',
                                transform: 'translateY(-50%)',
                                borderRadius: '2px'
                            }} />
                            <div style={{
                                position: 'absolute',
                                right: '2px',
                                top: '50%',
                                width: '8px',
                                height: '4px',
                                background: 'white',
                                transform: 'translateY(-50%)',
                                borderRadius: '2px'
                            }} />
                        </div>
                    </div>
                    <h1 style={{
                        fontSize: '2.2rem',
                        fontWeight: '700',
                        color: '#374151',
                        margin: '0 0 0.5rem',
                        letterSpacing: '-0.025em'
                    }}>
                        Edit Profile
                    </h1>
                    <p style={{
                        fontSize: '1.1rem',
                        color: '#6b7280',
                        margin: 0
                    }}>
                        Update your personal information and account settings
                    </p>
                </div>

                {/* Tab Navigation */}
                <div style={{
                    background: 'rgba(255, 255, 255, 0.98)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '20px',
                    padding: '1rem',
                    marginBottom: '2rem',
                    boxShadow: '0 8px 32px rgba(34, 197, 94, 0.1)',
                    border: '1px solid rgba(34, 197, 94, 0.15)',
                    display: 'flex',
                    gap: '0.5rem'
                }}>
                    <button
                        onClick={() => setActiveTab('profile')}
                        style={{
                            flex: 1,
                            padding: '1rem 2rem',
                            background: activeTab === 'profile' 
                                ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' 
                                : 'transparent',
                            color: activeTab === 'profile' ? 'white' : '#6b7280',
                            border: 'none',
                            borderRadius: '14px',
                            cursor: 'pointer',
                            fontWeight: '600',
                            fontSize: '1rem',
                            transition: 'all 0.3s ease',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem'
                        }}
                    >
                        {/* User icon */}
                        <div style={{
                            width: '16px',
                            height: '16px',
                            position: 'relative'
                        }}>
                            <div style={{
                                position: 'absolute',
                                top: '1px',
                                left: '4px',
                                width: '8px',
                                height: '6px',
                                background: activeTab === 'profile' ? 'white' : '#6b7280',
                                borderRadius: '4px 4px 0 0'
                            }} />
                            <div style={{
                                position: 'absolute',
                                top: '8px',
                                left: '2px',
                                width: '12px',
                                height: '6px',
                                background: activeTab === 'profile' ? 'white' : '#6b7280',
                                borderRadius: '0 0 4px 4px'
                            }} />
                        </div>
                        Profile Information
                    </button>
                    <button
                        onClick={() => setActiveTab('password')}
                        style={{
                            flex: 1,
                            padding: '1rem 2rem',
                            background: activeTab === 'password' 
                                ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' 
                                : 'transparent',
                            color: activeTab === 'password' ? 'white' : '#6b7280',
                            border: 'none',
                            borderRadius: '14px',
                            cursor: 'pointer',
                            fontWeight: '600',
                            fontSize: '1rem',
                            transition: 'all 0.3s ease',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem'
                        }}
                    >
                        {/* Lock icon */}
                        <div style={{
                            width: '16px',
                            height: '16px',
                            position: 'relative'
                        }}>
                            <div style={{
                                position: 'absolute',
                                top: '2px',
                                left: '4px',
                                width: '8px',
                                height: '6px',
                                border: `2px solid ${activeTab === 'password' ? 'white' : '#6b7280'}`,
                                borderBottom: 'none',
                                borderRadius: '4px 4px 0 0'
                            }} />
                            <div style={{
                                position: 'absolute',
                                top: '8px',
                                left: '2px',
                                width: '12px',
                                height: '6px',
                                background: activeTab === 'password' ? 'white' : '#6b7280',
                                borderRadius: '2px'
                            }} />
                        </div>
                        Change Password
                    </button>
                    {isDoctor && (
                        <button
                            onClick={() => setActiveTab('doctor')}
                            style={{
                                flex: 1,
                                padding: '1rem 2rem',
                                background: activeTab === 'doctor' 
                                    ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' 
                                    : 'transparent',
                                color: activeTab === 'doctor' ? 'white' : '#6b7280',
                                border: 'none',
                                borderRadius: '14px',
                                cursor: 'pointer',
                                fontWeight: '600',
                                fontSize: '1rem',
                                transition: 'all 0.3s ease',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.5rem'
                            }}
                        >
                            {/* Stethoscope icon */}
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
                                    background: activeTab === 'doctor' ? 'white' : '#6b7280',
                                    borderRadius: '2px'
                                }} />
                                <div style={{
                                    position: 'absolute',
                                    top: '10px',
                                    left: '2px',
                                    width: '12px',
                                    height: '2px',
                                    background: activeTab === 'doctor' ? 'white' : '#6b7280',
                                    borderRadius: '1px'
                                }} />
                                <div style={{
                                    position: 'absolute',
                                    top: '12px',
                                    left: '0px',
                                    width: '4px',
                                    height: '4px',
                                    border: `2px solid ${activeTab === 'doctor' ? 'white' : '#6b7280'}`,
                                    borderRadius: '50%'
                                }} />
                                <div style={{
                                    position: 'absolute',
                                    top: '12px',
                                    right: '0px',
                                    width: '4px',
                                    height: '4px',
                                    border: `2px solid ${activeTab === 'doctor' ? 'white' : '#6b7280'}`,
                                    borderRadius: '50%'
                                }} />
                            </div>
                            Doctor Info
                        </button>
                    )}
                </div>

                {/* Message Display */}
                {message.text && (
                    <div style={{
                        background: message.type === 'success' 
                            ? 'rgba(34, 197, 94, 0.1)' 
                            : 'rgba(239, 68, 68, 0.1)',
                        color: message.type === 'success' ? '#16a34a' : '#dc2626',
                        padding: '1rem 1.5rem',
                        borderRadius: '12px',
                        marginBottom: '2rem',
                        border: `1px solid ${message.type === 'success' 
                            ? 'rgba(34, 197, 94, 0.2)' 
                            : 'rgba(239, 68, 68, 0.2)'}`,
                        fontSize: '0.95rem',
                        fontWeight: '500',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        transition: 'opacity 0.5s ease-out, transform 0.5s ease-out',
                        animation: message.fadeOut ? 'fadeOut 0.5s ease-out forwards' : 'slideInDown 0.3s ease-out',
                        opacity: message.fadeOut ? 0 : 1,
                        transform: message.fadeOut ? 'translateY(-10px)' : 'translateY(0)'
                    }}>
                        <span style={{ fontSize: '1.1rem' }}>
                            {message.type === 'success' ? '✅' : '⚠️'}
                        </span>
                        {message.text}
                    </div>
                )}

                {/* Form Content */}
                <div style={{
                    background: 'rgba(255, 255, 255, 0.98)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '24px',
                    padding: '2.5rem',
                    boxShadow: '0 20px 40px rgba(34, 197, 94, 0.1)',
                    border: '1px solid rgba(34, 197, 94, 0.15)'
                }}>
                    {activeTab === 'profile' ? (
                        <form onSubmit={handleProfileSubmit}>
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                                gap: '1.5rem',
                                marginBottom: '2rem'
                            }}>
                                <div>
                                    <label style={{
                                        display: 'block',
                                        marginBottom: '0.5rem',
                                        color: '#374151',
                                        fontWeight: '600',
                                        fontSize: '0.95rem'
                                    }}>
                                        Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        value={profileData.fullName}
                                        onChange={(e) => handleInputChange(e, 'profile')}
                                        required
                                        style={{
                                            width: '100%',
                                            padding: '1rem',
                                            border: '2px solid rgba(34, 197, 94, 0.2)',
                                            borderRadius: '12px',
                                            fontSize: '1rem',
                                            transition: 'all 0.3s ease',
                                            background: 'rgba(255, 255, 255, 0.8)',
                                            outline: 'none'
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
                                </div>
                                
                                <div>
                                    <label style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        marginBottom: '0.5rem',
                                        color: '#6b7280',
                                        fontWeight: '600',
                                        fontSize: '0.95rem'
                                    }}>
                                        Email
                                        {/* Lock icon to indicate security restriction */}
                                        <div style={{
                                            width: '14px',
                                            height: '14px',
                                            position: 'relative',
                                            opacity: '0.7'
                                        }}>
                                            <div style={{
                                                position: 'absolute',
                                                top: '2px',
                                                left: '3px',
                                                width: '8px',
                                                height: '5px',
                                                border: '1.5px solid #6b7280',
                                                borderBottom: 'none',
                                                borderRadius: '3px 3px 0 0'
                                            }} />
                                            <div style={{
                                                position: 'absolute',
                                                top: '6px',
                                                left: '1px',
                                                width: '12px',
                                                height: '6px',
                                                background: '#6b7280',
                                                borderRadius: '1px'
                                            }} />
                                        </div>
                                        <span style={{
                                            fontSize: '0.8rem',
                                            color: '#9ca3af',
                                            fontWeight: '400',
                                            fontStyle: 'italic'
                                        }}>
                                        </span>
                                    </label>
                                    <div style={{ position: 'relative' }}>
                                        <input
                                            type="email"
                                            name="email"
                                            value={profileData.email}
                                            readOnly
                                            disabled
                                            style={{
                                                width: '100%',
                                                padding: '1rem',
                                                border: '2px solid rgba(107, 114, 128, 0.15)',
                                                borderRadius: '12px',
                                                fontSize: '1rem',
                                                transition: 'all 0.3s ease',
                                                background: 'linear-gradient(135deg, rgba(241, 245, 249, 0.9) 0%, rgba(248, 250, 252, 0.9) 100%)',
                                                color: '#4b5563',
                                                cursor: 'not-allowed',
                                                outline: 'none',
                                                boxShadow: 'inset 0 2px 4px rgba(107, 114, 128, 0.05)',
                                                position: 'relative'
                                            }}
                                        />
                                        {/* Security overlay pattern */}
                                        <div style={{
                                            position: 'absolute',
                                            top: '0',
                                            left: '0',
                                            right: '0',
                                            bottom: '0',
                                            background: 'repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(107, 114, 128, 0.02) 2px, rgba(107, 114, 128, 0.02) 4px)',
                                            borderRadius: '12px',
                                            pointerEvents: 'none'
                                        }} />
                                    </div>
                                    <p style={{
                                        fontSize: '0.75rem',
                                        color: '#9ca3af',
                                        margin: '0.25rem 0 0 0',
                                        fontStyle: 'italic',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.25rem'
                                    }}>
                                        {/* Shield icon */}
                                        <div style={{
                                            width: '10px',
                                            height: '12px',
                                            position: 'relative'
                                        }}>
                                            <div style={{
                                                position: 'absolute',
                                                top: '0',
                                                left: '1px',
                                                width: '8px',
                                                height: '10px',
                                                border: '1px solid #9ca3af',
                                                borderRadius: '4px 4px 0 4px',
                                                background: 'rgba(156, 163, 175, 0.1)'
                                            }} />
                                            <div style={{
                                                position: 'absolute',
                                                top: '3px',
                                                left: '3px',
                                                width: '4px',
                                                height: '2px',
                                                background: '#9ca3af',
                                                borderRadius: '1px'
                                            }} />
                                        </div>
                                        Email cannot be changed
                                    </p>
                                </div>
                                
                                <div>
                                    <label style={{
                                        display: 'block',
                                        marginBottom: '0.5rem',
                                        color: '#374151',
                                        fontWeight: '600',
                                        fontSize: '0.95rem'
                                    }}>
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={profileData.phone}
                                        onChange={(e) => handleInputChange(e, 'profile')}
                                        style={{
                                            width: '100%',
                                            padding: '1rem',
                                            border: '2px solid rgba(34, 197, 94, 0.2)',
                                            borderRadius: '12px',
                                            fontSize: '1rem',
                                            transition: 'all 0.3s ease',
                                            background: 'rgba(255, 255, 255, 0.8)',
                                            outline: 'none'
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
                                </div>
                                
                                <div>
                                    <label style={{
                                        display: 'block',
                                        marginBottom: '0.5rem',
                                        color: '#374151',
                                        fontWeight: '600',
                                        fontSize: '0.95rem'
                                    }}>
                                        Date of Birth
                                    </label>
                                    <input
                                        type="date"
                                        name="dateOfBirth"
                                        value={profileData.dateOfBirth}
                                        onChange={(e) => handleInputChange(e, 'profile')}
                                        style={{
                                            width: '100%',
                                            padding: '1rem',
                                            border: '2px solid rgba(34, 197, 94, 0.2)',
                                            borderRadius: '12px',
                                            fontSize: '1rem',
                                            transition: 'all 0.3s ease',
                                            background: 'rgba(255, 255, 255, 0.8)',
                                            outline: 'none'
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
                                </div>
                            </div>
                            
                            {/* Address Fields */}
                            <AddressInput
                                street={addressData.street}
                                onStreetChange={handleStreetChange}
                                city={addressData.city}
                                onCityChange={handleCityChange}
                                stateProvince={addressData.stateProvince}
                                onStateProvinceChange={handleStateProvinceChange}
                                postalCode={addressData.postalCode}
                                onPostalCodeChange={handlePostalCodeChange}
                                countryCode={addressData.countryCode}
                                onCountryChange={handleAddressCountryChange}
                                disabled={saving}
                            />
                            
                            {/* Emergency Contact - Only visible for DOCTOR and ADMIN roles, not for patients (USER role) */}
                            {user?.role !== 'USER' && (
                                <div style={{ marginBottom: '2rem' }}>
                                    <label style={{
                                        display: 'block',
                                        marginBottom: '0.5rem',
                                        color: '#374151',
                                        fontWeight: '600',
                                        fontSize: '0.95rem'
                                    }}>
                                        Emergency Contact
                                    </label>
                                    <input
                                        type="text"
                                        name="emergencyContact"
                                        value={profileData.emergencyContact}
                                        onChange={(e) => handleInputChange(e, 'profile')}
                                        placeholder="Name and phone number"
                                        style={{
                                            width: '100%',
                                            padding: '1rem',
                                            border: '2px solid rgba(34, 197, 94, 0.2)',
                                            borderRadius: '12px',
                                            fontSize: '1rem',
                                            transition: 'all 0.3s ease',
                                            background: 'rgba(255, 255, 255, 0.8)',
                                            outline: 'none'
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
                                </div>
                            )}
                            
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
                                    disabled={saving || !hasProfileDataChanged}
                                    style={{
                                        padding: '1rem 2rem',
                                        background: (saving || !hasProfileDataChanged)
                                            ? 'rgba(107, 114, 128, 0.3)' 
                                            : 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '12px',
                                        cursor: (saving || !hasProfileDataChanged) ? 'not-allowed' : 'pointer',
                                        fontWeight: '600',
                                        fontSize: '1rem',
                                        transition: 'all 0.3s ease',
                                        boxShadow: (saving || !hasProfileDataChanged) ? 'none' : '0 4px 12px rgba(34, 197, 94, 0.3)',
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
                                            {/* Save icon */}
                                            <div style={{
                                                width: '16px',
                                                height: '16px',
                                                position: 'relative'
                                            }}>
                                                <div style={{
                                                    position: 'absolute',
                                                    top: '2px',
                                                    left: '2px',
                                                    width: '12px',
                                                    height: '10px',
                                                    border: '2px solid white',
                                                    borderTop: 'none',
                                                    borderRadius: '0 0 2px 2px'
                                                }} />
                                                <div style={{
                                                    position: 'absolute',
                                                    top: '0px',
                                                    left: '4px',
                                                    width: '8px',
                                                    height: '4px',
                                                    background: 'white',
                                                    borderRadius: '2px 2px 0 0'
                                                }} />
                                                <div style={{
                                                    position: 'absolute',
                                                    top: '6px',
                                                    left: '6px',
                                                    width: '4px',
                                                    height: '4px',
                                                    background: 'white',
                                                    borderRadius: '1px'
                                                }} />
                                            </div>
                                            Save Changes
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    ) : activeTab === 'password' ? (
                        <form onSubmit={handlePasswordSubmit}>
                            <div style={{
                                maxWidth: '500px',
                                margin: '0 auto'
                            }}>
                                <div style={{ marginBottom: '1.5rem' }}>
                                    <label style={{
                                        display: 'block',
                                        marginBottom: '0.5rem',
                                        color: '#374151',
                                        fontWeight: '600',
                                        fontSize: '0.95rem'
                                    }}>
                                        Current Password *
                                    </label>
                                    <input
                                        type="password"
                                        name="currentPassword"
                                        value={passwordData.currentPassword}
                                        onChange={(e) => handleInputChange(e, 'password')}
                                        required
                                        style={{
                                            width: '100%',
                                            padding: '1rem',
                                            border: '2px solid rgba(34, 197, 94, 0.2)',
                                            borderRadius: '12px',
                                            fontSize: '1rem',
                                            transition: 'all 0.3s ease',
                                            background: 'rgba(255, 255, 255, 0.8)',
                                            outline: 'none'
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
                                </div>
                                
                                <div style={{ marginBottom: '1.5rem' }}>
                                    <label style={{
                                        display: 'block',
                                        marginBottom: '0.5rem',
                                        color: '#374151',
                                        fontWeight: '600',
                                        fontSize: '0.95rem'
                                    }}>
                                        New Password *
                                    </label>
                                    <input
                                        type="password"
                                        name="newPassword"
                                        value={passwordData.newPassword}
                                        onChange={(e) => handleInputChange(e, 'password')}
                                        required
                                        minLength="6"
                                        style={{
                                            width: '100%',
                                            padding: '1rem',
                                            border: '2px solid rgba(34, 197, 94, 0.2)',
                                            borderRadius: '12px',
                                            fontSize: '1rem',
                                            transition: 'all 0.3s ease',
                                            background: 'rgba(255, 255, 255, 0.8)',
                                            outline: 'none'
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
                                </div>
                                
                                <div style={{ marginBottom: '2rem' }}>
                                    <label style={{
                                        display: 'block',
                                        marginBottom: '0.5rem',
                                        color: '#374151',
                                        fontWeight: '600',
                                        fontSize: '0.95rem'
                                    }}>
                                        Confirm New Password *
                                    </label>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        value={passwordData.confirmPassword}
                                        onChange={(e) => handleInputChange(e, 'password')}
                                        required
                                        style={{
                                            width: '100%',
                                            padding: '1rem',
                                            border: '2px solid rgba(34, 197, 94, 0.2)',
                                            borderRadius: '12px',
                                            fontSize: '1rem',
                                            transition: 'all 0.3s ease',
                                            background: 'rgba(255, 255, 255, 0.8)',
                                            outline: 'none'
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
                                        disabled={saving || !hasPasswordDataInput}
                                        style={{
                                            padding: '1rem 2rem',
                                            background: (saving || !hasPasswordDataInput)
                                                ? 'rgba(107, 114, 128, 0.3)' 
                                                : 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '12px',
                                            cursor: (saving || !hasPasswordDataInput) ? 'not-allowed' : 'pointer',
                                            fontWeight: '600',
                                            fontSize: '1rem',
                                            transition: 'all 0.3s ease',
                                            boxShadow: (saving || !hasPasswordDataInput) ? 'none' : '0 4px 12px rgba(34, 197, 94, 0.3)',
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
                                                Changing...
                                            </>
                                        ) : (
                                            <>
                                                {/* Lock/Key icon */}
                                                <div style={{
                                                    width: '16px',
                                                    height: '16px',
                                                    position: 'relative'
                                                }}>
                                                    <div style={{
                                                        position: 'absolute',
                                                        top: '2px',
                                                        left: '4px',
                                                        width: '8px',
                                                        height: '6px',
                                                        border: '2px solid white',
                                                        borderBottom: 'none',
                                                        borderRadius: '4px 4px 0 0'
                                                    }} />
                                                    <div style={{
                                                        position: 'absolute',
                                                        top: '8px',
                                                        left: '2px',
                                                        width: '12px',
                                                        height: '6px',
                                                        background: 'white',
                                                        borderRadius: '2px'
                                                    }} />
                                                    <div style={{
                                                        position: 'absolute',
                                                        top: '10px',
                                                        left: '7px',
                                                        width: '2px',
                                                        height: '2px',
                                                        background: '#10b981',
                                                        borderRadius: '50%'
                                                    }} />
                                                </div>
                                                Change Password
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </form>
                    ) : activeTab === 'doctor' ? (
                        <form onSubmit={handleDoctorProfileSubmit}>
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                                gap: '1.5rem',
                                marginBottom: '2rem'
                            }}>
                                {/* Specialization */}
                                <div>
                                    <label style={{
                                        display: 'block',
                                        marginBottom: '0.5rem',
                                        color: '#374151',
                                        fontWeight: '600',
                                        fontSize: '0.95rem'
                                    }}>
                                        Specialization *
                                    </label>
                                    <input
                                        type="text"
                                        name="specialization"
                                        value={doctorProfileData.specialization}
                                        onChange={(e) => handleInputChange(e, 'doctor')}
                                        required
                                        placeholder="e.g. Cardiology, Dermatology, etc."
                                        style={{
                                            width: '100%',
                                            padding: '1rem',
                                            border: '2px solid rgba(34, 197, 94, 0.2)',
                                            borderRadius: '12px',
                                            fontSize: '1rem',
                                            transition: 'all 0.3s ease',
                                            background: 'rgba(255, 255, 255, 0.8)',
                                            outline: 'none'
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
                                </div>

                                {/* License Number */}
                                <div>
                                    <label style={{
                                        display: 'block',
                                        marginBottom: '0.5rem',
                                        color: '#374151',
                                        fontWeight: '600',
                                        fontSize: '0.95rem'
                                    }}>
                                        License Number *
                                    </label>
                                    <input
                                        type="text"
                                        name="licenseNumber"
                                        value={doctorProfileData.licenseNumber}
                                        onChange={(e) => handleInputChange(e, 'doctor')}
                                        required
                                        placeholder="Medical license number"
                                        style={{
                                            width: '100%',
                                            padding: '1rem',
                                            border: '2px solid rgba(34, 197, 94, 0.2)',
                                            borderRadius: '12px',
                                            fontSize: '1rem',
                                            transition: 'all 0.3s ease',
                                            background: 'rgba(255, 255, 255, 0.8)',
                                            outline: 'none'
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
                                </div>

                                {/* Rating (Read-only) */}
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

                                {/* Status (Read-only) */}
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

                            {/* Education */}
                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{
                                    display: 'block',
                                    marginBottom: '0.5rem',
                                    color: '#374151',
                                    fontWeight: '600',
                                    fontSize: '0.95rem'
                                }}>
                                    Education
                                </label>
                                <textarea
                                    name="education"
                                    value={doctorProfileData.education}
                                    onChange={(e) => handleInputChange(e, 'doctor')}
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
                            </div>

                            {/* Experience */}
                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{
                                    display: 'block',
                                    marginBottom: '0.5rem',
                                    color: '#374151',
                                    fontWeight: '600',
                                    fontSize: '0.95rem'
                                }}>
                                    Experience
                                </label>
                                <textarea
                                    name="experience"
                                    value={doctorProfileData.experience}
                                    onChange={(e) => handleInputChange(e, 'doctor')}
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
                            </div>

                            {/* Bio */}
                            <div style={{ marginBottom: '2rem' }}>
                                <label style={{
                                    display: 'block',
                                    marginBottom: '0.5rem',
                                    color: '#374151',
                                    fontWeight: '600',
                                    fontSize: '0.95rem'
                                }}>
                                    Professional Bio
                                </label>
                                <textarea
                                    name="bio"
                                    value={doctorProfileData.bio}
                                    onChange={(e) => handleInputChange(e, 'doctor')}
                                    rows="4"
                                    placeholder="Brief description of your medical background, specialties, and approach to patient care..."
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
                                            {/* Stethoscope icon */}
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
                                            Update Doctor Profile
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    ) : null}
                </div>
            </div>

            <style jsx>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                
                @keyframes slideInDown {
                    0% {
                        opacity: 0;
                        transform: translateY(-20px);
                    }
                    100% {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                @keyframes fadeOut {
                    0% {
                        opacity: 1;
                        transform: translateY(0);
                    }
                    100% {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                }
            `}</style>
        </div>
    );
};

export default EditProfilePage;
