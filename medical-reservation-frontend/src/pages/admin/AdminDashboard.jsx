import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminDashboard } from '../../hooks/useAdminDashboard';
import LoadingSpinner from '../../components/LoadingSpinner';
import AdminWelcomeSection from '../../components/AdminWelcomeSection';
import AdminStatisticsCards from '../../components/AdminStatisticsCards';
import RecentUsersSection from '../../components/RecentUsersSection';
import PendingDoctorRequestsSection from '../../components/PendingDoctorRequestsSection';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const {
        statistics,
        recentUsers,
        pendingDoctorRequests,
        loading,
        error,
        formatDate,
        getRoleColor,
        getStatusColor
    } = useAdminDashboard();

    const handleNavigation = (path) => {
        navigate(path);
    };

    if (loading) {
        return <LoadingSpinner message="Loading admin dashboard..." />;
    }

    if (error) {
        return (
            <div style={{
                background: 'rgba(254, 242, 242, 0.95)',
                backdropFilter: 'blur(20px)',
                borderRadius: '24px',
                padding: '3rem',
                textAlign: 'center',
                boxShadow: '0 20px 40px rgba(239, 68, 68, 0.1), 0 8px 32px rgba(0, 0, 0, 0.05)',
                border: '1px solid rgba(239, 68, 68, 0.2)',
                maxWidth: '500px',
                margin: '2rem auto'
            }}>
                <div style={{
                    width: '60px',
                    height: '60px',
                    background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                    borderRadius: '50%',
                    margin: '0 auto 1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem',
                    color: 'white',
                    boxShadow: '0 8px 20px rgba(239, 68, 68, 0.3)'
                }}>
                    ⚠️
                </div>
                <h2 style={{
                    fontSize: '1.5rem',
                    fontWeight: '700',
                    color: '#dc2626',
                    margin: '0 0 1rem'
                }}>
                    Error Loading Dashboard
                </h2>
                <p style={{
                    color: '#6b7280',
                    margin: '0 0 1.5rem',
                    lineHeight: '1.5'
                }}>
                    {error}
                </p>
                <button
                    onClick={() => window.location.reload()}
                    style={{
                        padding: '0.8rem 1.5rem',
                        background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '12px',
                        cursor: 'pointer',
                        fontSize: '1rem',
                        fontWeight: '600',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)'
                    }}
                >
                    Try Again
                </button>
            </div>
        );
    }

    return (
        <div style={{ position: 'relative' }}>
            <div style={{
                position: 'absolute',
                top: '8%',
                right: '5%',
                width: '280px',
                height: '280px',
                background: 'radial-gradient(circle, rgba(16, 185, 129, 0.12) 0%, rgba(16, 185, 129, 0.06) 50%, transparent 100%)',
                borderRadius: '50%',
                zIndex: 0
            }} />
            <div style={{
                position: 'absolute',
                bottom: '12%',
                left: '3%',
                width: '220px',
                height: '220px',
                background: 'radial-gradient(circle, rgba(5, 150, 105, 0.1) 0%, rgba(5, 150, 105, 0.04) 50%, transparent 100%)',
                borderRadius: '50%',
                zIndex: 0
            }} />

            <main style={{
                padding: '2.5rem 0',
                position: 'relative',
                zIndex: 1
            }}>
                <AdminWelcomeSection />

                <AdminStatisticsCards 
                    statistics={statistics}
                    onNavigation={handleNavigation}
                />

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
                    gap: '2rem'
                }}>
                    <RecentUsersSection
                        recentUsers={recentUsers}
                        getRoleColor={getRoleColor}
                        getStatusColor={getStatusColor}
                        formatDate={formatDate}
                        onNavigation={handleNavigation}
                    />

                    <PendingDoctorRequestsSection
                        pendingDoctorRequests={pendingDoctorRequests}
                        formatDate={formatDate}
                        onNavigation={handleNavigation}
                    />
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;
