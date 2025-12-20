import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useProfile } from '../hooks/useProfile';
import { usePasswordChange } from '../hooks/usePasswordChange';
import { useMessage } from '../hooks/useMessage';
import ProfileHeader from '../components/ProfileHeader';
import ProfileTabs from '../components/ProfileTabs';
import MessageDisplay from '../components/MessageDisplay';
import ProfileForm from '../components/ProfileForm';
import PasswordForm from '../components/PasswordForm';
import DoctorProfileForm from '../components/DoctorProfileForm';
import MedicalProfileForm from '../components/MedicalProfileForm';
import AccountSettings from '../components/AccountSettings';

const EditProfilePage = () => {
    const { t } = useTranslation();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('profile');

    const { message, setMessageWithAutoFade } = useMessage();
    
    const {
        loading,
        saving: profileSaving,
        isDoctor,
        doctorData,
        profileData,
        setProfileData,
        medicalData,
        setMedicalData,
        addressData,
        setAddressData,
        doctorProfileData,
        setDoctorProfileData,
        hasProfileDataChanged,
        hasMedicalDataChanged,
        hasDoctorDataChanged,
        updateProfile,
        updateMedicalInfo,
        updateDoctorProfile
    } = useProfile(user);

    const {
        saving: passwordSaving,
        passwordData,
        setPasswordData,
        hasPasswordDataInput,
        changeUserPassword
    } = usePasswordChange();

    const handleInputChange = (e, formType) => {
        const { name, value } = e.target;
        
        if (formType === 'profile') {
            setProfileData(prev => ({ ...prev, [name]: value }));
        } else if (formType === 'medical') {
            setMedicalData(prev => ({ ...prev, [name]: value }));
        } else if (formType === 'doctor') {
            setDoctorProfileData(prev => ({ ...prev, [name]: value }));
        } else if (formType === 'password') {
            setPasswordData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleAddressChange = (field, value) => {
        setAddressData(prev => ({ ...prev, [field]: value }));
    };

    const handleProfileSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateProfile();
            setMessageWithAutoFade('success', t('profile.profileUpdatedSuccessfully'));
        } catch (error) {
            setMessageWithAutoFade('error', error.message || t('profile.errorUpdatingProfile'));
        }
    };

    const handleMedicalInfoSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateMedicalInfo();
            setMessageWithAutoFade('success', t('profile.medicalInfoUpdatedSuccessfully'));
        } catch (error) {
            setMessageWithAutoFade('error', error.message || t('profile.errorUpdatingMedicalInfo'));
        }
    };

    const handleDoctorProfileSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateDoctorProfile();
            setMessageWithAutoFade('success', t('profile.doctorProfileUpdatedSuccessfully'));
        } catch (error) {
            setMessageWithAutoFade('error', error.message || t('profile.errorUpdatingDoctorProfile'));
        }
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        try {
            await changeUserPassword();
            setMessageWithAutoFade('success', t('profile.passwordChangedSuccessfully'));
        } catch (error) {
            setMessageWithAutoFade('error', error.message || t('profile.errorChangingPassword'));
        }
    };

    if (loading) {
        return (
            <div style={{
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 30%, #bbf7d0 70%, #a7f3d0 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2rem'
            }}>
                <div style={{
                    background: 'rgba(255, 255, 255, 0.98)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '24px',
                    padding: '3rem',
                    boxShadow: '0 20px 40px rgba(34, 197, 94, 0.1)',
                    border: '1px solid rgba(34, 197, 94, 0.15)',
                    textAlign: 'center',
                    maxWidth: '400px',
                    width: '100%'
                }}>
                    <div style={{
                        width: '64px',
                        height: '64px',
                        border: '4px solid rgba(34, 197, 94, 0.3)',
                        borderTop: '4px solid #22c55e',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite',
                        margin: '0 auto 1.5rem'
                    }} />
                    <h2 style={{
                        color: '#065f46',
                        margin: '0 0 0.5rem 0',
                        fontSize: '1.5rem',
                        fontWeight: '700'
                    }}>
                        {t('profile.loadingProfile')}
                    </h2>
                    <p style={{
                        color: '#6b7280',
                        margin: '0',
                        fontSize: '1rem'
                    }}>
                        {t('profile.loadingProfileDescription')}
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
                <ProfileHeader />

                <ProfileTabs 
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    isDoctor={isDoctor}
                    isPatient={user?.role === 'USER'}
                />

                <MessageDisplay message={message} />

                <div style={{
                    background: 'rgba(255, 255, 255, 0.98)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '24px',
                    padding: '2.5rem',
                    boxShadow: '0 20px 40px rgba(34, 197, 94, 0.1)',
                    border: '1px solid rgba(34, 197, 94, 0.15)'
                }}>
                    {activeTab === 'profile' ? (
                        <ProfileForm
                            profileData={profileData}
                            addressData={addressData}
                            onInputChange={handleInputChange}
                            onAddressChange={handleAddressChange}
                            onSubmit={handleProfileSubmit}
                            saving={profileSaving}
                            hasProfileDataChanged={hasProfileDataChanged}
                            user={user}
                        />
                    ) : activeTab === 'password' ? (
                        <PasswordForm
                            passwordData={passwordData}
                            onInputChange={handleInputChange}
                            onSubmit={handlePasswordSubmit}
                            saving={passwordSaving}
                            hasPasswordDataInput={hasPasswordDataInput}
                        />
                    ) : activeTab === 'medical' ? (
                        <MedicalProfileForm
                            medicalData={medicalData}
                            onInputChange={(e) => handleInputChange(e, 'medical')}
                            onSubmit={handleMedicalInfoSubmit}
                            saving={profileSaving}
                            hasMedicalDataChanged={hasMedicalDataChanged}
                        />
                    ) : activeTab === 'doctor' ? (
                        <DoctorProfileForm
                            doctorProfileData={doctorProfileData}
                            doctorData={doctorData}
                            onInputChange={handleInputChange}
                            onSubmit={handleDoctorProfileSubmit}
                            saving={profileSaving}
                            hasDoctorDataChanged={hasDoctorDataChanged}
                        />
                    ) : activeTab === 'settings' ? (
                        <AccountSettings />
                    ) : null}
                </div>
            </div>
        </div>
    );
};

export default EditProfilePage;
