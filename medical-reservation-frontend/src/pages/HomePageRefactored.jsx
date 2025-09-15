import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import AppHeader from '../components/AppHeader';
import WelcomeSection from '../components/WelcomeSection';
import ActionCard from '../components/ActionCard';
import RecentActivity from '../components/RecentActivity';
import LogoutModal from '../components/LogoutModal';

export default function HomePageRefactored() {
    const navigate = useNavigate();
    const { user, loading, logout } = useAuth();
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

    const handleLogout = () => {
        setShowLogoutConfirm(true);
    };

    const confirmLogout = () => {
        logout();
        navigate('/');
        setShowLogoutConfirm(false);
    };

    const cancelLogout = () => {
        setShowLogoutConfirm(false);
    };

    const handleNavigation = (path) => {
        navigate(path);
    };

    const actionCards = [
        {
            title: 'Book Appointment',
            description: 'Schedule a new medical appointment with available doctors and specialists. Choose your preferred time and doctor.',
            icon: '📅',
            buttonText: 'Book Now',
            buttonIcon: '🚀',
            color: '#22c55e',
            colorSecondary: '#16a34a',
            onClick: () => handleNavigation('/patient/appointments')
        },
        {
            title: 'My Appointments',
            description: 'View and manage your upcoming and past medical appointments. Track your healthcare journey.',
            icon: '📋',
            buttonText: 'View All',
            buttonIcon: '📊',
            color: '#059669',
            colorSecondary: '#047857',
            onClick: () => handleNavigation('/patient/appointments')
        },
        {
            title: 'Health Records',
            description: 'Access your comprehensive medical history, test results, prescriptions, and health information.',
            icon: '📊',
            buttonText: 'View Records',
            buttonIcon: '📋',
            color: '#15803d',
            colorSecondary: '#14532d',
            onClick: () => handleNavigation('/patient/medical-history')
        },
        {
            title: 'Find Doctors',
            description: 'Browse through our network of qualified healthcare professionals and specialists.',
            icon: '👨‍⚕️',
            buttonText: 'Browse Doctors',
            buttonIcon: '🔍',
            color: '#4ade80',
            colorSecondary: '#22c55e',
            onClick: () => handleNavigation('/patient/doctors')
        },
        {
            title: 'Notifications',
            description: 'Stay updated with appointment reminders, health alerts, and important medical updates.',
            icon: '🔔',
            buttonText: 'View All',
            buttonIcon: '📬',
            color: '#ef4444',
            colorSecondary: '#dc2626',
            onClick: () => handleNavigation('/patient/notifications')
        },
        {
            title: 'Support Center',
            description: 'Get help from our dedicated support team for any questions or technical assistance.',
            icon: '💬',
            buttonText: 'Get Help',
            buttonIcon: '🆘',
            color: '#3b82f6',
            colorSecondary: '#2563eb',
            onClick: () => handleNavigation('/contact')
        }
    ];

    if (loading) {
        return (
            <div style={{
                minHeight: '100vh',
                width: '100vw',
                background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 50%, #bbf7d0 100%)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                boxSizing: 'border-box'
            }}>
                <div style={{
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '24px',
                    padding: '3rem',
                    textAlign: 'center',
                    boxShadow: '0 20px 40px rgba(34, 197, 94, 0.1), 0 8px 32px rgba(0, 0, 0, 0.05)',
                    border: '1px solid rgba(34, 197, 94, 0.1)'
                }}>
                    <div style={{
                        width: '60px',
                        height: '60px',
                        border: '4px solid rgba(34, 197, 94, 0.2)',
                        borderTop: '4px solid #22c55e',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite',
                        margin: '0 auto 1.5rem'
                    }} />
                    <p style={{ color: '#6b7280', margin: 0, fontSize: '1rem', fontWeight: '500' }}>Loading your dashboard...</p>
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div style={{
                minHeight: '100vh',
                width: '100vw',
                background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 50%, #bbf7d0 100%)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                boxSizing: 'border-box'
            }}>
                <div style={{
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '24px',
                    padding: '3rem',
                    textAlign: 'center',
                    boxShadow: '0 20px 40px rgba(34, 197, 94, 0.1), 0 8px 32px rgba(0, 0, 0, 0.05)',
                    border: '1px solid rgba(34, 197, 94, 0.1)'
                }}>
                    <div style={{
                        width: '80px',
                        height: '80px',
                        background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                        borderRadius: '20px',
                        margin: '0 auto 2rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 8px 24px rgba(34, 197, 94, 0.3)'
                    }}>
                        <span style={{ fontSize: '2.5rem', color: 'white' }}>🔐</span>
                    </div>
                    <h2 style={{
                        fontSize: '1.5rem',
                        fontWeight: '600',
                        color: '#374151',
                        margin: '0 0 1rem'
                    }}>
                        Authentication Required
                    </h2>
                    <p style={{ color: '#6b7280', margin: '0 0 2rem' }}>
                        Please log in to access your dashboard.
                    </p>
                    <button
                        onClick={() => navigate('/')}
                        style={{
                            padding: '0.875rem 2rem',
                            background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '12px',
                            cursor: 'pointer',
                            fontWeight: '500',
                            fontSize: '1rem',
                            transition: 'all 0.2s ease',
                            boxShadow: '0 4px 12px rgba(34, 197, 94, 0.2)'
                        }}
                    >
                        Go to Landing Page
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div style={{
            minHeight: '100vh',
            width: '100vw',
            background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 30%, #bbf7d0 70%, #a7f3d0 100%)',
            position: 'relative',
            overflow: 'hidden',
            boxSizing: 'border-box'
        }}>
            <div style={{
                position: 'absolute',
                top: '8%',
                right: '5%',
                width: '280px',
                height: '280px',
                background: 'radial-gradient(circle, rgba(34, 197, 94, 0.12) 0%, rgba(34, 197, 94, 0.06) 50%, transparent 100%)',
                borderRadius: '50%',
                zIndex: 0
            }} />
            
            <div style={{
                position: 'absolute',
                bottom: '12%',
                left: '3%',
                width: '220px',
                height: '220px',
                background: 'radial-gradient(circle, rgba(22, 163, 74, 0.1) 0%, rgba(22, 163, 74, 0.04) 50%, transparent 100%)',
                borderRadius: '50%',
                zIndex: 0
            }} />

            <div style={{
                position: 'absolute',
                top: '45%',
                left: '85%',
                width: '180px',
                height: '180px',
                background: 'radial-gradient(circle, rgba(16, 185, 129, 0.08) 0%, rgba(16, 185, 129, 0.03) 50%, transparent 100%)',
                borderRadius: '50%',
                zIndex: 0
            }} />

            <div style={{
                position: 'absolute',
                top: '25%',
                left: '8%',
                width: '120px',
                height: '120px',
                background: 'radial-gradient(circle, rgba(5, 150, 105, 0.06) 0%, rgba(5, 150, 105, 0.02) 50%, transparent 100%)',
                borderRadius: '50%',
                zIndex: 0
            }} />

            <AppHeader user={user} onLogout={handleLogout} />

            <main style={{
                maxWidth: '1400px',
                margin: '0 auto',
                padding: '2.5rem 2rem',
                position: 'relative',
                zIndex: 1,
                width: '100%',
                boxSizing: 'border-box'
            }}>
                <WelcomeSection user={user} />

                <section style={{ marginBottom: '3rem' }}>
                    <div style={{
                        textAlign: 'center',
                        marginBottom: '3rem'
                    }}>
                        <h2 style={{
                            fontSize: '2.2rem',
                            fontWeight: '700',
                            color: '#374151',
                            margin: '0 0 1rem',
                            letterSpacing: '-0.025em'
                        }}>
                            Quick Actions
                        </h2>
                        <p style={{
                            fontSize: '1.1rem',
                            color: '#6b7280',
                            margin: 0,
                            maxWidth: '600px',
                            marginLeft: 'auto',
                            marginRight: 'auto'
                        }}>
                            Access your most important healthcare features with one click
                        </p>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                        gap: '2rem',
                        width: '100%'
                    }}>
                        {actionCards.map((card, index) => (
                            <ActionCard key={index} {...card} />
                        ))}
                    </div>
                </section>

                <RecentActivity />
            </main>

            <LogoutModal
                isOpen={showLogoutConfirm}
                onConfirm={confirmLogout}
                onCancel={cancelLogout}
            />

            <style jsx>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
}
