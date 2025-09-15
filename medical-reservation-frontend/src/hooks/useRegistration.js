import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../api/auth';

export const useRegistration = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const registerUser = useCallback(async (userData) => {
        try {
            setLoading(true);
            setError(null);
            setSuccess(false);

            const result = await register(userData);
            
            if (result.success) {
                setSuccess(true);
                setTimeout(() => {
                    navigate('/login', { 
                        state: { 
                            message: 'Registration successful! Please log in.' 
                        }
                    });
                }, 2000);
            } else {
                setError(result.message || 'Registration failed. Please try again.');
            }
        } catch (err) {
            console.error('Registration error:', err);
            setError(err.response?.data?.message || err.message || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    }, [navigate]);

    const reset = useCallback(() => {
        setLoading(false);
        setError(null);
        setSuccess(false);
    }, []);

    return {
        loading,
        error,
        success,
        registerUser,
        reset
    };
};
