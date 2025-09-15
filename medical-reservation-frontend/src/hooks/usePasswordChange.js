import { useState, useMemo } from 'react';
import { changePassword } from '../api/profile';

export const usePasswordChange = () => {
    const [saving, setSaving] = useState(false);
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const hasPasswordDataInput = useMemo(() => {
        return passwordData.currentPassword !== '' ||
               passwordData.newPassword !== '' ||
               passwordData.confirmPassword !== '';
    }, [passwordData]);

    const changeUserPassword = async () => {
        setSaving(true);
        try {
            if (passwordData.newPassword !== passwordData.confirmPassword) {
                throw new Error('New passwords do not match');
            }

            if (passwordData.newPassword.length < 8) {
                throw new Error('New password must be at least 8 characters long');
            }

            await changePassword(passwordData.currentPassword, passwordData.newPassword);
            
            setPasswordData({
                currentPassword: '',
                newPassword: '',
                confirmPassword: ''
            });
            
            return true;
        } catch (error) {
            console.error('Error changing password:', error);
            throw error;
        } finally {
            setSaving(false);
        }
    };

    return {
        saving,
        passwordData,
        setPasswordData,
        hasPasswordDataInput,
        changeUserPassword
    };
};
