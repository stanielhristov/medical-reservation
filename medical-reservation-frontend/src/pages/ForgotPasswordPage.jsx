import { useState } from 'react';
import { Link } from 'react-router-dom';
import { forgotPassword } from '../api/auth';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');
        setLoading(true);

        try {
            await forgotPassword(email);
            setMessage('If an account with this email exists, we have sent a password reset link! Please check your email for further instructions.');
            setEmail('');
        } catch (err) {
            setError(err.message || 'Failed to send password reset email. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            width: '100vw',
            background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px',
            position: 'relative',
            overflow: 'hidden',
            boxSizing: 'border-box'
        }}>
            {/* Background decoration */}
            <div style={{
                position: 'absolute',
                top: '10%',
                right: '15%',
                width: '200px',
                height: '200px',
                background: 'rgba(34, 197, 94, 0.08)',
                borderRadius: '50%',
                zIndex: 0
            }} />
            
            <div style={{
                position: 'absolute',
                bottom: '20%',
                left: '10%',
                width: '120px',
                height: '120px',
                background: 'rgba(22, 163, 74, 0.06)',
                borderRadius: '50%',
                zIndex: 0
            }} />

            <div style={{
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(20px)',
                borderRadius: '24px',
                boxShadow: '0 20px 40px rgba(34, 197, 94, 0.1), 0 8px 32px rgba(0, 0, 0, 0.05)',
                padding: '3rem',
                width: '100%',
                maxWidth: '420px',
                minWidth: '320px',
                position: 'relative',
                zIndex: 1,
                border: '1px solid rgba(34, 197, 94, 0.1)',
                boxSizing: 'border-box'
            }}>
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                    <div style={{
                        width: '72px',
                        height: '72px',
                        background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                        borderRadius: '20px',
                        margin: '0 auto 1.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 8px 24px rgba(34, 197, 94, 0.2)'
                    }}>
                        <span style={{ fontSize: '2rem', color: 'white' }}>🔐</span>
                    </div>
                    <h1 style={{
                        fontSize: '1.75rem',
                        fontWeight: '600',
                        color: '#374151',
                        margin: '0 0 0.5rem',
                        letterSpacing: '-0.025em'
                    }}>
                        Forgot Password
                    </h1>
                    <p style={{
                        color: '#6b7280',
                        fontSize: '0.95rem',
                        margin: 0,
                        lineHeight: 1.5
                    }}>
                        Enter your email address and we'll send you a link to reset your password
                    </p>
                </div>

                {/* Success Message */}
                {message && (
                    <div style={{
                        background: 'rgba(34, 197, 94, 0.1)',
                        color: '#15803d',
                        padding: '1rem',
                        borderRadius: '12px',
                        marginBottom: '1.5rem',
                        border: '1px solid rgba(34, 197, 94, 0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        fontSize: '0.9rem'
                    }}>
                        <span style={{ fontSize: '1.1rem' }}>✅</span>
                        {message}
                    </div>
                )}

                {/* Error Message */}
                {error && (
                    <div style={{
                        background: 'rgba(248, 113, 113, 0.1)',
                        color: '#dc2626',
                        padding: '1rem',
                        borderRadius: '12px',
                        marginBottom: '1.5rem',
                        border: '1px solid rgba(248, 113, 113, 0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        fontSize: '0.9rem'
                    }}>
                        <span style={{ fontSize: '1.1rem' }}>⚠️</span>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    {/* Email Field */}
                    <div style={{ marginBottom: '2rem' }}>
                        <label style={{
                            display: 'block',
                            marginBottom: '0.5rem',
                            fontWeight: '500',
                            color: '#374151',
                            fontSize: '0.9rem'
                        }}>
                            Email Address
                        </label>
                        <div style={{
                            position: 'relative',
                            background: '#f9fafb',
                            borderRadius: '12px',
                            border: '1px solid #e5e7eb',
                            transition: 'all 0.2s ease'
                        }}>
                            <input
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                                disabled={loading}
                                style={{
                                    width: '100%',
                                    padding: '0.875rem 1rem',
                                    border: 'none',
                                    borderRadius: '12px',
                                    fontSize: '0.95rem',
                                    background: 'transparent',
                                    outline: 'none',
                                    boxSizing: 'border-box',
                                    color: '#374151'
                                }}
                                placeholder="Enter your email address"
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button 
                        type="submit" 
                        disabled={loading}
                        style={{
                            width: '100%',
                            padding: '0.875rem',
                            background: loading 
                                ? '#d1d5db'
                                : 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '12px',
                            fontSize: '1rem',
                            fontWeight: '500',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            transition: 'all 0.2s ease',
                            boxShadow: loading 
                                ? 'none'
                                : '0 4px 12px rgba(34, 197, 94, 0.2)',
                            position: 'relative',
                            overflow: 'hidden',
                            marginBottom: '1.5rem'
                        }}
                        onMouseEnter={e => {
                            if (!loading) {
                                e.target.style.transform = 'translateY(-1px)';
                                e.target.style.boxShadow = '0 6px 20px rgba(34, 197, 94, 0.25)';
                            }
                        }}
                        onMouseLeave={e => {
                            if (!loading) {
                                e.target.style.transform = 'translateY(0)';
                                e.target.style.boxShadow = '0 4px 12px rgba(34, 197, 94, 0.2)';
                            }
                        }}
                    >
                        {loading ? (
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                                <div style={{
                                    width: '18px',
                                    height: '18px',
                                    border: '2px solid rgba(255,255,255,0.3)',
                                    borderTop: '2px solid white',
                                    borderRadius: '50%',
                                    animation: 'spin 1s linear infinite'
                                }} />
                                Sending Email...
                            </div>
                        ) : (
                            'Send Reset Email'
                        )}
                    </button>

                    {/* Back to Login Link */}
                    <div style={{ textAlign: 'center' }}>
                        <Link 
                            to="/login"
                            style={{
                                color: '#22c55e',
                                textDecoration: 'none',
                                fontSize: '0.9rem',
                                fontWeight: '500',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                transition: 'all 0.2s ease'
                            }}
                            onMouseEnter={e => {
                                e.target.style.color = '#16a34a';
                                e.target.style.textDecoration = 'underline';
                            }}
                            onMouseLeave={e => {
                                e.target.style.color = '#22c55e';
                                e.target.style.textDecoration = 'none';
                            }}
                        >
                            <span>←</span>
                            Back to Login
                        </Link>
                    </div>
                </form>
            </div>

            <style jsx>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
}
