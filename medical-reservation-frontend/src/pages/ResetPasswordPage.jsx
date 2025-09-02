import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { resetPassword } from '../api/auth';

export default function ResetPasswordPage() {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const token = searchParams.get('token');

    useEffect(() => {
        if (!token) {
            setError('Invalid reset token. Please request a new password reset link.');
        }
    }, [token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!token) {
            setError('Invalid reset token. Please request a new password reset link.');
            return;
        }

        if (newPassword !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        if (newPassword.length < 6) {
            setError('Password must be at least 6 characters long.');
            return;
        }

        setLoading(true);

        try {
            await resetPassword(token, newPassword, confirmPassword);
            // Show success message and redirect to login
            alert('Password reset successfully! You will be redirected to login.');
            navigate('/login');
        } catch (err) {
            setError(err.message || 'Failed to reset password. Please try again.');
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
                        <span style={{ fontSize: '2rem', color: 'white' }}>🔑</span>
                    </div>
                    <h1 style={{
                        fontSize: '1.75rem',
                        fontWeight: '600',
                        color: '#374151',
                        margin: '0 0 0.5rem',
                        letterSpacing: '-0.025em'
                    }}>
                        Reset Password
                    </h1>
                    <p style={{
                        color: '#6b7280',
                        fontSize: '0.95rem',
                        margin: 0,
                        lineHeight: 1.5
                    }}>
                        Enter your new password below
                    </p>
                </div>

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
                    {/* New Password Field */}
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{
                            display: 'block',
                            marginBottom: '0.5rem',
                            fontWeight: '500',
                            color: '#374151',
                            fontSize: '0.9rem'
                        }}>
                            New Password
                        </label>
                        <div style={{
                            position: 'relative',
                            background: '#f9fafb',
                            borderRadius: '12px',
                            border: '1px solid #e5e7eb',
                            transition: 'all 0.2s ease'
                        }}>
                            <input
                                type={showPassword ? "text" : "password"}
                                value={newPassword}
                                onChange={e => setNewPassword(e.target.value)}
                                required
                                disabled={loading}
                                style={{
                                    width: '100%',
                                    padding: '0.875rem 3rem 0.875rem 1rem',
                                    border: 'none',
                                    borderRadius: '12px',
                                    fontSize: '0.95rem',
                                    background: 'transparent',
                                    outline: 'none',
                                    boxSizing: 'border-box',
                                    color: '#374151'
                                }}
                                placeholder="Enter new password"
                            />
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
                                    fontSize: '1.1rem',
                                    color: '#9ca3af',
                                    padding: '0.25rem'
                                }}
                            >
                                {showPassword ? '🙈' : '👁️'}
                            </button>
                        </div>
                    </div>

                    {/* Confirm Password Field */}
                    <div style={{ marginBottom: '2rem' }}>
                        <label style={{
                            display: 'block',
                            marginBottom: '0.5rem',
                            fontWeight: '500',
                            color: '#374151',
                            fontSize: '0.9rem'
                        }}>
                            Confirm Password
                        </label>
                        <div style={{
                            position: 'relative',
                            background: '#f9fafb',
                            borderRadius: '12px',
                            border: '1px solid #e5e7eb',
                            transition: 'all 0.2s ease'
                        }}>
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
                                required
                                disabled={loading}
                                style={{
                                    width: '100%',
                                    padding: '0.875rem 3rem 0.875rem 1rem',
                                    border: 'none',
                                    borderRadius: '12px',
                                    fontSize: '0.95rem',
                                    background: 'transparent',
                                    outline: 'none',
                                    boxSizing: 'border-box',
                                    color: '#374151'
                                }}
                                placeholder="Confirm new password"
                            />
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
                                    fontSize: '1.1rem',
                                    color: '#9ca3af',
                                    padding: '0.25rem'
                                }}
                            >
                                {showConfirmPassword ? '🙈' : '👁️'}
                            </button>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button 
                        type="submit" 
                        disabled={loading || !token}
                        style={{
                            width: '100%',
                            padding: '0.875rem',
                            background: (loading || !token)
                                ? '#d1d5db'
                                : 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '12px',
                            fontSize: '1rem',
                            fontWeight: '500',
                            cursor: (loading || !token) ? 'not-allowed' : 'pointer',
                            transition: 'all 0.2s ease',
                            boxShadow: (loading || !token)
                                ? 'none'
                                : '0 4px 12px rgba(34, 197, 94, 0.2)',
                            position: 'relative',
                            overflow: 'hidden'
                        }}
                        onMouseEnter={e => {
                            if (!loading && token) {
                                e.target.style.transform = 'translateY(-1px)';
                                e.target.style.boxShadow = '0 6px 20px rgba(34, 197, 94, 0.25)';
                            }
                        }}
                        onMouseLeave={e => {
                            if (!loading && token) {
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
                                Resetting Password...
                            </div>
                        ) : (
                            'Reset Password'
                        )}
                    </button>
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
