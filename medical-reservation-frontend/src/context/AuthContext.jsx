import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from '../api/axios';
import { jwtDecode } from 'jwt-decode';
import { logout as logoutAPI } from '../api/auth';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');
        
        if (token && userData) {
            try {
                const decodedToken = jwtDecode(token);
                const currentTime = Date.now() / 1000;
                
                if (decodedToken.exp > currentTime) {
                    // Token is still valid
                    const parsedUser = JSON.parse(userData);
                    setUser({
                        ...parsedUser,
                        token: token
                    });
                    
                    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                } else {
                    // Token expired
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                }
            } catch (error) {
                console.error('Error decoding token:', error);
                localStorage.removeItem('token');
                localStorage.removeItem('user');
            }
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            const response = await axios.post('/auth/login', { email, password });
            const { token, email: userEmail, fullName, role, userId } = response.data;
            
            const userData = {
                id: userId,
                email: userEmail,
                fullName,
                role
            };
            
            // Store token and user data
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(userData));
            
            // Set axios default header
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            
            // Set user state
            setUser({
                ...userData,
                token
            });
            
            return { success: true, role };
        } catch (error) {
            console.error('Login error:', error);
            return { 
                success: false, 
                message: error.response?.data?.message || 'Login failed' 
            };
        }
    };

    const register = async (userData) => {
        try {
            await axios.post('/auth/register', userData);
            return { success: true };
        } catch (error) {
            console.error('Registration error:', error);
            return { 
                success: false, 
                message: error.response?.data?.message || 'Registration failed' 
            };
        }
    };

    const logout = async () => {
        try {
            // Call backend logout endpoint
            await logoutAPI();
        } catch (error) {
            console.error('Backend logout failed:', error);
            // Continue with local logout even if backend call fails
        } finally {
            // Always clear local state regardless of backend response
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            delete axios.defaults.headers.common['Authorization'];
            setUser(null);
        }
    };

    const hasRole = (role) => {
        return user?.role === role;
    };

    const hasAnyRole = (roles) => {
        return roles.includes(user?.role);
    };

    const value = {
        user,
        loading,
        login,
        register,
        logout,
        hasRole,
        hasAnyRole,
        isAuthenticated: !!user
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
