import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios.js';

export default function RegisterForm() {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState('USER');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);
        setLoading(true);

        // Password validation
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            setLoading(false);
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters long');
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post('/auth/register', {
                fullName,
                email,
                phoneNumber,
                password,
                role,
            });

            setSuccess('Registration successful! Redirecting to login...');
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            width: '100vw',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px',
            position: 'relative',
            overflow: 'hidden',
            boxSizing: 'border-box'
        }}>
            {/* Animated background elements */}
            <div style={{
                position: 'absolute',
                top: '-50%',
                left: '-50%',
                width: '200%',
                height: '200%',
                background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
                animation: 'float 20s ease-in-out infinite',
                zIndex: 0
            }} />
            
            <div style={{
                position: 'absolute',
                top: '20%',
                right: '15%',
                width: '120px',
                height: '120px',
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '50%',
                animation: 'pulse 6s ease-in-out infinite',
                zIndex: 0
            }} />
            
            <div style={{
                position: 'absolute',
                bottom: '30%',
                left: '15%',
                width: '180px',
                height: '180px',
                background: 'rgba(255,255,255,0.05)',
                borderRadius: '50%',
                animation: 'float 18s ease-in-out infinite reverse',
                zIndex: 0
            }} />

            <div style={{
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(20px)',
                borderRadius: '20px',
                boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)',
                padding: '3rem',
                width: '100%',
                maxWidth: '500px',
                minWidth: '350px',
                position: 'relative',
                zIndex: 1,
                border: '1px solid rgba(255, 255, 255, 0.2)',
                maxHeight: '90vh',
                overflowY: 'auto',
                boxSizing: 'border-box'
            }}>
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                    <div style={{
                        width: '80px',
                        height: '80px',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        borderRadius: '50%',
                        margin: '0 auto 1rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 10px 30px rgba(102, 126, 234, 0.3)'
                    }}>
                        <span style={{ fontSize: '2rem', color: 'white' }}>📋</span>
                    </div>
                    <h1 style={{
                        fontSize: '2rem',
                        fontWeight: '700',
                        color: '#2d3748',
                        margin: '0 0 0.5rem',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}>
                        Create Account
                    </h1>
                    <p style={{
                        color: '#718096',
                        fontSize: '1rem',
                        margin: 0
                    }}>
                        Join our medical portal community
                    </p>
                </div>

                {/* Error Message */}
                {error && (
                    <div style={{
                        background: 'linear-gradient(135deg, #fed7d7 0%, #feb2b2 100%)',
                        color: '#c53030',
                        padding: '1rem',
                        borderRadius: '12px',
                        marginBottom: '1.5rem',
                        border: '1px solid #feb2b2',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                    }}>
                        <span style={{ fontSize: '1.2rem' }}>⚠️</span>
                        {error}
                    </div>
                )}

                {/* Success Message */}
                {success && (
                    <div style={{
                        background: 'linear-gradient(135deg, #c6f6d5 0%, #9ae6b4 100%)',
                        color: '#22543d',
                        padding: '1rem',
                        borderRadius: '12px',
                        marginBottom: '1.5rem',
                        border: '1px solid #9ae6b4',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                    }}>
                        <span style={{ fontSize: '1.2rem' }}>✅</span>
                        {success}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    {/* Full Name Field */}
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{
                            display: 'block',
                            marginBottom: '0.75rem',
                            fontWeight: '600',
                            color: '#2d3748',
                            fontSize: '0.95rem'
                        }}>
                            <span style={{ marginRight: '0.5rem' }}>👤</span>
                            Full Name
                        </label>
                        <div style={{
                            position: 'relative',
                            background: 'linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%)',
                            borderRadius: '12px',
                            border: '2px solid transparent',
                            backgroundClip: 'padding-box',
                            transition: 'all 0.3s ease'
                        }}>
                            <input
                                type="text"
                                value={fullName}
                                onChange={e => setFullName(e.target.value)}
                                required
                                disabled={loading}
                                style={{
                                    width: '100%',
                                    padding: '1rem 1rem 1rem 3rem',
                                    border: 'none',
                                    borderRadius: '12px',
                                    fontSize: '1rem',
                                    background: 'transparent',
                                    outline: 'none',
                                    boxSizing: 'border-box',
                                    color: '#2d3748'
                                }}
                                placeholder="Enter your full name"
                            />
                            <span style={{
                                position: 'absolute',
                                left: '1rem',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                fontSize: '1.2rem',
                                color: '#a0aec0'
                            }}>
                                👤
                            </span>
                        </div>
                    </div>

                    {/* Email Field */}
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{
                            display: 'block',
                            marginBottom: '0.75rem',
                            fontWeight: '600',
                            color: '#2d3748',
                            fontSize: '0.95rem'
                        }}>
                            <span style={{ marginRight: '0.5rem' }}>📧</span>
                            Email Address
                        </label>
                        <div style={{
                            position: 'relative',
                            background: 'linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%)',
                            borderRadius: '12px',
                            border: '2px solid transparent',
                            backgroundClip: 'padding-box',
                            transition: 'all 0.3s ease'
                        }}>
                            <input
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                                disabled={loading}
                                style={{
                                    width: '100%',
                                    padding: '1rem 1rem 1rem 3rem',
                                    border: 'none',
                                    borderRadius: '12px',
                                    fontSize: '1rem',
                                    background: 'transparent',
                                    outline: 'none',
                                    boxSizing: 'border-box',
                                    color: '#2d3748'
                                }}
                                placeholder="Enter your email address"
                            />
                            <span style={{
                                position: 'absolute',
                                left: '1rem',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                fontSize: '1.2rem',
                                color: '#a0aec0'
                            }}>
                                📧
                            </span>
                        </div>
                    </div>

                    {/* Phone Number Field */}
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{
                            display: 'block',
                            marginBottom: '0.75rem',
                            fontWeight: '600',
                            color: '#2d3748',
                            fontSize: '0.95rem'
                        }}>
                            <span style={{ marginRight: '0.5rem' }}>📱</span>
                            Phone Number
                        </label>
                        <div style={{
                            position: 'relative',
                            background: 'linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%)',
                            borderRadius: '12px',
                            border: '2px solid transparent',
                            backgroundClip: 'padding-box',
                            transition: 'all 0.3s ease'
                        }}>
                            <input
                                type="tel"
                                value={phoneNumber}
                                onChange={e => setPhoneNumber(e.target.value)}
                                required
                                disabled={loading}
                                style={{
                                    width: '100%',
                                    padding: '1rem 1rem 1rem 3rem',
                                    border: 'none',
                                    borderRadius: '12px',
                                    fontSize: '1rem',
                                    background: 'transparent',
                                    outline: 'none',
                                    boxSizing: 'border-box',
                                    color: '#2d3748'
                                }}
                                placeholder="Enter your phone number"
                            />
                            <span style={{
                                position: 'absolute',
                                left: '1rem',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                fontSize: '1.2rem',
                                color: '#a0aec0'
                            }}>
                                📱
                            </span>
                        </div>
                    </div>

                    {/* Password Field */}
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{
                            display: 'block',
                            marginBottom: '0.75rem',
                            fontWeight: '600',
                            color: '#2d3748',
                            fontSize: '0.95rem'
                        }}>
                            <span style={{ marginRight: '0.5rem' }}>🔒</span>
                            Password
                        </label>
                        <div style={{
                            position: 'relative',
                            background: 'linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%)',
                            borderRadius: '12px',
                            border: '2px solid transparent',
                            backgroundClip: 'padding-box',
                            transition: 'all 0.3s ease'
                        }}>
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required
                                disabled={loading}
                                style={{
                                    width: '100%',
                                    padding: '1rem 3rem 1rem 3rem',
                                    border: 'none',
                                    borderRadius: '12px',
                                    fontSize: '1rem',
                                    background: 'transparent',
                                    outline: 'none',
                                    boxSizing: 'border-box',
                                    color: '#2d3748'
                                }}
                                placeholder="Enter your password"
                            />
                            <span style={{
                                position: 'absolute',
                                left: '1rem',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                fontSize: '1.2rem',
                                color: '#a0aec0'
                            }}>
                                🔒
                            </span>
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                style={{
                                    position: 'absolute',
                                    right: '1rem',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    fontSize: '1.2rem',
                                    color: '#a0aec0',
                                    padding: '0.25rem'
                                }}
                            >
                                {showPassword ? '🙈' : '👁️'}
                            </button>
                        </div>
                    </div>

                    {/* Confirm Password Field */}
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{
                            display: 'block',
                            marginBottom: '0.75rem',
                            fontWeight: '600',
                            color: '#2d3748',
                            fontSize: '0.95rem'
                        }}>
                            <span style={{ marginRight: '0.5rem' }}>🔐</span>
                            Confirm Password
                        </label>
                        <div style={{
                            position: 'relative',
                            background: 'linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%)',
                            borderRadius: '12px',
                            border: '2px solid transparent',
                            backgroundClip: 'padding-box',
                            transition: 'all 0.3s ease'
                        }}>
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
                                required
                                disabled={loading}
                                style={{
                                    width: '100%',
                                    padding: '1rem 3rem 1rem 3rem',
                                    border: 'none',
                                    borderRadius: '12px',
                                    fontSize: '1rem',
                                    background: 'transparent',
                                    outline: 'none',
                                    boxSizing: 'border-box',
                                    color: '#2d3748'
                                }}
                                placeholder="Confirm your password"
                            />
                            <span style={{
                                position: 'absolute',
                                left: '1rem',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                fontSize: '1.2rem',
                                color: '#a0aec0'
                            }}>
                                🔐
                            </span>
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                style={{
                                    position: 'absolute',
                                    right: '1rem',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    fontSize: '1.2rem',
                                    color: '#a0aec0',
                                    padding: '0.25rem'
                                }}
                            >
                                {showConfirmPassword ? '🙈' : '👁️'}
                            </button>
                        </div>
                    </div>

                    {/* Role Selection */}
                    <div style={{ marginBottom: '2rem' }}>
                        <label style={{
                            display: 'block',
                            marginBottom: '0.75rem',
                            fontWeight: '600',
                            color: '#2d3748',
                            fontSize: '0.95rem'
                        }}>
                            <span style={{ marginRight: '0.5rem' }}>👨‍⚕️</span>
                            Account Type
                        </label>
                        <div style={{
                            position: 'relative',
                            background: 'linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%)',
                            borderRadius: '12px',
                            border: '2px solid transparent',
                            backgroundClip: 'padding-box',
                            transition: 'all 0.3s ease'
                        }}>
                            <select
                                value={role}
                                onChange={e => setRole(e.target.value)}
                                disabled={loading}
                                style={{
                                    width: '100%',
                                    padding: '1rem 1rem 1rem 3rem',
                                    border: 'none',
                                    borderRadius: '12px',
                                    fontSize: '1rem',
                                    background: 'transparent',
                                    outline: 'none',
                                    boxSizing: 'border-box',
                                    color: '#2d3748',
                                    cursor: 'pointer'
                                }}
                            >
                                <option value="USER">👤 Patient</option>
                                <option value="DOCTOR">👨‍⚕️ Doctor</option>
                            </select>
                            <span style={{
                                position: 'absolute',
                                left: '1rem',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                fontSize: '1.2rem',
                                color: '#a0aec0'
                            }}>
                                👨‍⚕️
                            </span>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button 
                        type="submit" 
                        disabled={loading}
                        style={{
                            width: '100%',
                            padding: '1rem',
                            background: loading 
                                ? 'linear-gradient(135deg, #cbd5e0 0%, #a0aec0 100%)'
                                : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '12px',
                            fontSize: '1.1rem',
                            fontWeight: '600',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            transition: 'all 0.3s ease',
                            boxShadow: loading 
                                ? '0 4px 15px rgba(160, 174, 192, 0.3)'
                                : '0 8px 25px rgba(102, 126, 234, 0.3)',
                            position: 'relative',
                            overflow: 'hidden'
                        }}
                        onMouseEnter={e => {
                            if (!loading) {
                                e.target.style.transform = 'translateY(-2px)';
                                e.target.style.boxShadow = '0 12px 35px rgba(102, 126, 234, 0.4)';
                            }
                        }}
                        onMouseLeave={e => {
                            if (!loading) {
                                e.target.style.transform = 'translateY(0)';
                                e.target.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.3)';
                            }
                        }}
                    >
                        {loading ? (
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                                <div style={{
                                    width: '20px',
                                    height: '20px',
                                    border: '2px solid rgba(255,255,255,0.3)',
                                    borderTop: '2px solid white',
                                    borderRadius: '50%',
                                    animation: 'spin 1s linear infinite'
                                }} />
                                Creating Account...
                            </div>
                        ) : (
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                                <span>✨</span>
                                Create Account
                            </div>
                        )}
                    </button>
                </form>

                {/* Footer */}
                <div style={{ 
                    textAlign: 'center', 
                    marginTop: '2rem',
                    paddingTop: '2rem',
                    borderTop: '1px solid #e2e8f0'
                }}>
                    <p style={{ color: '#718096', marginBottom: '1rem' }}>
                        Already have an account?
                    </p>
                    <a 
                        href="/login" 
                        style={{
                            color: '#667eea',
                            textDecoration: 'none',
                            fontWeight: '600',
                            fontSize: '1rem',
                            padding: '0.75rem 1.5rem',
                            borderRadius: '8px',
                            background: 'linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%)',
                            border: '2px solid #e2e8f0',
                            transition: 'all 0.3s ease',
                            display: 'inline-block'
                        }}
                        onMouseEnter={e => {
                            e.target.style.background = 'linear-gradient(135deg, #edf2f7 0%, #e2e8f0 100%)';
                            e.target.style.transform = 'translateY(-1px)';
                        }}
                        onMouseLeave={e => {
                            e.target.style.background = 'linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%)';
                            e.target.style.transform = 'translateY(0)';
                        }}
                    >
                        Sign In
                    </a>
                </div>
            </div>

            <style jsx>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    33% { transform: translateY(-20px) rotate(1deg); }
                    66% { transform: translateY(10px) rotate(-1deg); }
                }
                
                @keyframes pulse {
                    0%, 100% { transform: scale(1); opacity: 0.1; }
                    50% { transform: scale(1.1); opacity: 0.2; }
                }
                
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
}
