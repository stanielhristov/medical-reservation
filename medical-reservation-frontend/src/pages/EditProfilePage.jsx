import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { getUserProfile, updateUserProfile, changePassword } from '../api/profile';
import { getDoctorByUserId, updateDoctor } from '../api/doctors';

const EditProfilePage = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [activeTab, setActiveTab] = useState('profile');
    const [doctorData, setDoctorData] = useState(null);
    const [isDoctor, setIsDoctor] = useState(false);
    
    // Profile form state
    const [profileData, setProfileData] = useState({
        fullName: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        address: '',
        emergencyContact: ''
    });
    
    // Doctor-specific form state
    const [doctorProfileData, setDoctorProfileData] = useState({
        specialization: '',
        bio: '',
        licenseNumber: '',
        education: '',
        experience: ''
    });
    
    // Password form state
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    
    const [message, setMessage] = useState({ type: '', text: '' });

    useEffect(() => {
        fetchUserProfile();
        // Check if user is a doctor
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
            setProfileData({
                fullName: profile.fullName || '',
                email: profile.email || '',
                phone: profile.phone || '',
                dateOfBirth: profile.dateOfBirth ? profile.dateOfBirth.split('T')[0] : '',
                address: profile.address || '',
                emergencyContact: profile.emergencyContact || ''
            });
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
            setDoctorProfileData({
                specialization: doctor.specialization || '',
                bio: doctor.bio || '',
                licenseNumber: doctor.licenseNumber || '',
                education: doctor.education || '',
                experience: doctor.experience || ''
            });
        } catch (error) {
            console.error('Error fetching doctor profile:', error);
            // If doctor profile doesn't exist, that's okay for regular users
        }
    };

    const handleProfileSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setMessage({ type: '', text: '' });

        try {
            // Create a copy of profileData without email for security
            const { email, ...profileDataWithoutEmail } = profileData;
            await updateUserProfile(user.id, profileDataWithoutEmail);
            setMessage({ type: 'success', text: 'Profile updated successfully!' });
            
            // Update user context only if fullName changed (email cannot change)
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
            setMessage({ type: 'success', text: 'Password changed successfully!' });
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
        setMessage({ type: '', text: '' });

        try {
            if (!doctorData?.id) {
                throw new Error('Doctor profile not found');
            }
            
            await updateDoctor(doctorData.id, doctorProfileData);
            setMessage({ type: 'success', text: 'Doctor profile updated successfully!' });
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
            // Prevent email changes for security reasons
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
                        fontWeight: '500'
                    }}>
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
                            
                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{
                                    display: 'block',
                                    marginBottom: '0.5rem',
                                    color: '#374151',
                                    fontWeight: '600',
                                    fontSize: '0.95rem'
                                }}>
                                    Address
                                </label>
                                <textarea
                                    name="address"
                                    value={profileData.address}
                                    onChange={(e) => handleInputChange(e, 'profile')}
                                    rows="3"
                                    style={{
                                        width: '100%',
                                        padding: '1rem',
                                        border: '2px solid rgba(34, 197, 94, 0.2)',
                                        borderRadius: '12px',
                                        fontSize: '1rem',
                                        transition: 'all 0.3s ease',
                                        background: 'rgba(255, 255, 255, 0.8)',
                                        outline: 'none',
                                        resize: 'vertical'
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
                                    disabled={saving}
                                    style={{
                                        padding: '1rem 2rem',
                                        background: saving 
                                            ? 'rgba(107, 114, 128, 0.3)' 
                                            : 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '12px',
                                        cursor: saving ? 'not-allowed' : 'pointer',
                                        fontWeight: '600',
                                        fontSize: '1rem',
                                        transition: 'all 0.3s ease',
                                        boxShadow: saving ? 'none' : '0 4px 12px rgba(34, 197, 94, 0.3)',
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
                                        disabled={saving}
                                        style={{
                                            padding: '1rem 2rem',
                                            background: saving 
                                                ? 'rgba(107, 114, 128, 0.3)' 
                                                : 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '12px',
                                            cursor: saving ? 'not-allowed' : 'pointer',
                                            fontWeight: '600',
                                            fontSize: '1rem',
                                            transition: 'all 0.3s ease',
                                            boxShadow: saving ? 'none' : '0 4px 12px rgba(34, 197, 94, 0.3)',
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
                        <div>Doctor form will go here</div>
                    ) : null}
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
};

export default EditProfilePage;
