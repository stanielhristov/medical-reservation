import React from 'react';
import { useTranslation } from 'react-i18next';

const ProfileTabs = ({ activeTab, setActiveTab, isDoctor, isPatient }) => {
    const { t } = useTranslation();
    return (
        <div style={{
            display: 'flex',
            gap: '0.5rem',
            background: 'rgba(255, 255, 255, 0.7)',
            padding: '0.5rem',
            borderRadius: '16px',
            marginBottom: '2rem'
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
                        height: '8px',
                        border: `2px solid ${activeTab === 'profile' ? 'white' : '#6b7280'}`,
                        borderBottom: 'none',
                        borderRadius: '6px 6px 0 0'
                    }} />
                    <div style={{
                        position: 'absolute',
                        top: '8px',
                        left: '0px',
                        width: '16px',
                        height: '6px',
                        background: activeTab === 'profile' ? 'white' : '#6b7280',
                        borderRadius: '0 0 2px 2px'
                    }} />
                    <div style={{
                        position: 'absolute',
                        top: '6px',
                        left: '6px',
                        width: '4px',
                        height: '4px',
                        background: activeTab === 'profile' ? '#10b981' : '#f3f4f6',
                        borderRadius: '50%'
                    }} />
                </div>
                {t('profile.profileInfo')}
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
                {t('profile.changePassword')}
            </button>
            {isPatient && (
                <button
                    onClick={() => setActiveTab('medical')}
                    style={{
                        flex: 1,
                        padding: '1rem 2rem',
                        background: activeTab === 'medical' 
                            ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' 
                            : 'transparent',
                        color: activeTab === 'medical' ? 'white' : '#6b7280',
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
                            background: activeTab === 'medical' ? 'white' : '#6b7280',
                            borderRadius: '2px'
                        }} />
                        <div style={{
                            position: 'absolute',
                            top: '6px',
                            left: '2px',
                            width: '12px',
                            height: '2px',
                            background: activeTab === 'medical' ? 'white' : '#6b7280',
                            borderRadius: '1px'
                        }} />
                        <div style={{
                            position: 'absolute',
                            top: '10px',
                            left: '4px',
                            width: '8px',
                            height: '2px',
                            background: activeTab === 'medical' ? 'white' : '#6b7280',
                            borderRadius: '1px'
                        }} />
                        <div style={{
                            position: 'absolute',
                            top: '13px',
                            left: '2px',
                            width: '4px',
                            height: '1px',
                            background: activeTab === 'medical' ? 'white' : '#6b7280'
                        }} />
                    </div>
                    {t('profile.medicalInfo')}
                </button>
            )}
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
                    {t('profile.doctorInfo')}
                </button>
            )}
            <button
                onClick={() => setActiveTab('settings')}
                style={{
                    flex: 1,
                    padding: '1rem 2rem',
                    background: activeTab === 'settings' 
                        ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' 
                        : 'transparent',
                    color: activeTab === 'settings' ? 'white' : '#6b7280',
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
                <div style={{
                    width: '16px',
                    height: '16px',
                    position: 'relative'
                }}>
                    <div style={{
                        position: 'absolute',
                        top: '1px',
                        left: '1px',
                        width: '14px',
                        height: '14px',
                        border: `2px solid ${activeTab === 'settings' ? 'white' : '#6b7280'}`,
                        borderRadius: '50%'
                    }} />
                    <div style={{
                        position: 'absolute',
                        top: '6px',
                        left: '6px',
                        width: '4px',
                        height: '4px',
                        background: activeTab === 'settings' ? 'white' : '#6b7280',
                        borderRadius: '50%'
                    }} />
                    <div style={{
                        position: 'absolute',
                        top: '0px',
                        left: '7px',
                        width: '2px',
                        height: '4px',
                        background: activeTab === 'settings' ? 'white' : '#6b7280',
                        borderRadius: '1px'
                    }} />
                    <div style={{
                        position: 'absolute',
                        top: '12px',
                        left: '7px',
                        width: '2px',
                        height: '4px',
                        background: activeTab === 'settings' ? 'white' : '#6b7280',
                        borderRadius: '1px'
                    }} />
                    <div style={{
                        position: 'absolute',
                        top: '7px',
                        left: '0px',
                        width: '4px',
                        height: '2px',
                        background: activeTab === 'settings' ? 'white' : '#6b7280',
                        borderRadius: '1px'
                    }} />
                    <div style={{
                        position: 'absolute',
                        top: '7px',
                        right: '0px',
                        width: '4px',
                        height: '2px',
                        background: activeTab === 'settings' ? 'white' : '#6b7280',
                        borderRadius: '1px'
                    }} />
                </div>
                {t('profile.accountSettings')}
            </button>
        </div>
    );
};

export default ProfileTabs;
