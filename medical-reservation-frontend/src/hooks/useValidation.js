import { useCallback } from 'react';

export const useValidation = () => {
    const calculateAge = useCallback((dateOfBirth) => {
        if (!dateOfBirth) return null;
        const today = new Date();
        const birthDate = new Date(dateOfBirth);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        
        return age;
    }, []);

    const validateDateOfBirth = useCallback((dateOfBirth) => {
        if (!dateOfBirth) return { isValid: false, message: 'Date of birth is required' };
        
        const birthDate = new Date(dateOfBirth);
        const today = new Date();
        const age = calculateAge(dateOfBirth);
        
        if (birthDate > today) {
            return { isValid: false, message: 'Date of birth cannot be in the future' };
        }
        
        if (age > 120) {
            return { isValid: false, message: 'Please enter a valid date of birth' };
        }
        
        if (age < 0) {
            return { isValid: false, message: 'Please enter a valid date of birth' };
        }
        
        if (age < 18) {
            return { isValid: false, message: 'You must be at least 18 years old to register' };
        }
        
        return { isValid: true, message: '' };
    }, [calculateAge]);

    const validatePassword = useCallback((password) => {
        if (!password) return { isValid: false, message: 'Password is required' };
        if (password.length < 6) return { isValid: false, message: 'Password must be at least 6 characters long' };
        return { isValid: true, message: '' };
    }, []);

    const validateEmail = useCallback((email) => {
        if (!email) return { isValid: false, message: 'Email is required' };
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) return { isValid: false, message: 'Please enter a valid email address' };
        return { isValid: true, message: '' };
    }, []);

    const validateRequired = useCallback((value, fieldName) => {
        if (!value || value.trim() === '') {
            return { isValid: false, message: `${fieldName} is required` };
        }
        return { isValid: true, message: '' };
    }, []);

    return {
        calculateAge,
        validateDateOfBirth,
        validatePassword,
        validateEmail,
        validateRequired
    };
};
