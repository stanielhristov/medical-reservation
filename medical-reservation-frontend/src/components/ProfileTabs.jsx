import React from 'react';

const ProfileTabs = ({ activeTab, setActiveTab, isDoctor }) => {
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
                Profile Info
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
    );
};

export default ProfileTabs;
