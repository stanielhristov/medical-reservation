import React from 'react';
import FormField from './FormField';

const PasswordForm = ({ 
    passwordData, 
    onInputChange, 
    onSubmit, 
    saving, 
    hasPasswordDataInput 
}) => {
    const handleInputChange = (e) => {
        onInputChange(e, 'password');
    };

    return (
        <form onSubmit={onSubmit}>
            <div style={{
                maxWidth: '500px',
                margin: '0 auto'
            }}>
                <div style={{ marginBottom: '1.5rem' }}>
                    <FormField
                        label="Current Password"
                        name="currentPassword"
                        type="password"
                        value={passwordData.currentPassword}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                
                <div style={{ marginBottom: '1.5rem' }}>
                    <FormField
                        label="New Password"
                        name="newPassword"
                        type="password"
                        value={passwordData.newPassword}
                        onChange={handleInputChange}
                        required
                        minLength="6"
                    />
                </div>
                
                <div style={{ marginBottom: '2rem' }}>
                    <FormField
                        label="Confirm New Password"
                        name="confirmPassword"
                        type="password"
                        value={passwordData.confirmPassword}
                        onChange={handleInputChange}
                        required
                        minLength="6"
                    />
                </div>
                
                <div style={{
                    display: 'flex',
                    gap: '1rem',
                    justifyContent: 'center'
                }}>
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
                                </div>
                                Change Password
                            </>
                        )}
                    </button>
                </div>
            </div>
        </form>
    );
};

export default PasswordForm;
