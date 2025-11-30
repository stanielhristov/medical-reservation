import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAdminDashboard } from '../../hooks/useAdminDashboard';
import LoadingSpinner from '../../components/LoadingSpinner';
import AdminWelcomeSection from '../../components/AdminWelcomeSection';
import AdminStatisticsCards from '../../components/AdminStatisticsCards';
import RecentUsersSection from '../../components/RecentUsersSection';
import PendingDoctorRequestsSection from '../../components/PendingDoctorRequestsSection';

const AdminDashboard = () => {
    const { t } = useTranslation();
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
        return <LoadingSpinner message={t('loading.loadingAdminDashboard')} />;
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
                    {t('admin.errorLoadingDashboard')}
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
                    {t('admin.tryAgain')}
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

                {/* Quick Actions Section */}
                <div style={{
                    background: 'rgba(255, 255, 255, 0.98)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '24px',
                    padding: '2rem',
                    boxShadow: '0 12px 30px rgba(0, 0, 0, 0.08), 0 6px 20px rgba(0, 0, 0, 0.04)',
                    border: '1px solid rgba(226, 232, 240, 0.5)',
                    marginBottom: '2rem'
                }}>
                    <h2 style={{
                        fontSize: '1.5rem',
                        fontWeight: '700',
                        color: '#1f2937',
                        margin: '0 0 1.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                        }}>
                        <span style={{
                            fontSize: '1.2rem'
                        }}>⚡</span>
                        {t('admin.quickActions')}
                    </h2>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '1rem'
                    }}>
                        <button
                            onClick={() => handleNavigation('/admin/comments')}
                            style={{
                                background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '16px',
                                padding: '1.5rem',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                boxShadow: '0 8px 20px rgba(245, 158, 11, 0.3)',
                                textAlign: 'left'
                            }}
                            onMouseEnter={e => {
                                e.target.style.transform = 'translateY(-4px)';
                                e.target.style.boxShadow = '0 12px 30px rgba(245, 158, 11, 0.4)';
                            }}
                            onMouseLeave={e => {
                                e.target.style.transform = 'translateY(0)';
                                e.target.style.boxShadow = '0 8px 20px rgba(245, 158, 11, 0.3)';
                            }}
                        >
                            <div style={{
                                fontSize: '1.5rem',
                                marginBottom: '0.5rem'
                            }}>
                                💬
                            </div>
                            <div style={{
                                fontSize: '1rem',
                                fontWeight: '600',
                                marginBottom: '0.25rem'
                            }}>
                                {t('admin.manageComments')}
                            </div>
                            <div style={{
                                fontSize: '0.85rem',
                                opacity: 0.9
                            }}>
                                {t('admin.manageCommentsDesc')}
                            </div>
                        </button>
                        
                        <button
                            onClick={() => handleNavigation('/admin/users')}
                            style={{
                                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '16px',
                                padding: '1.5rem',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                boxShadow: '0 8px 20px rgba(16, 185, 129, 0.3)',
                                textAlign: 'left'
                            }}
                            onMouseEnter={e => {
                                e.target.style.transform = 'translateY(-4px)';
                                e.target.style.boxShadow = '0 12px 30px rgba(16, 185, 129, 0.4)';
                            }}
                            onMouseLeave={e => {
                                e.target.style.transform = 'translateY(0)';
                                e.target.style.boxShadow = '0 8px 20px rgba(16, 185, 129, 0.3)';
                            }}
                        >
                            <div style={{
                                fontSize: '1.5rem',
                                marginBottom: '0.5rem'
                            }}>
                                👥
                            </div>
                            <div style={{
                                fontSize: '1rem',
                                fontWeight: '600',
                                marginBottom: '0.25rem'
                            }}>
                                {t('admin.manageUsers')}
                            </div>
                            <div style={{
                                fontSize: '0.85rem',
                                opacity: 0.9
                            }}>
                                {t('admin.manageUsersDesc')}
                            </div>
                        </button>
                        
                        <button
                            onClick={() => handleNavigation('/admin/doctors')}
                            style={{
                                background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '16px',
                                padding: '1.5rem',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                boxShadow: '0 8px 20px rgba(139, 92, 246, 0.3)',
                                textAlign: 'left'
                            }}
                            onMouseEnter={e => {
                                e.target.style.transform = 'translateY(-4px)';
                                e.target.style.boxShadow = '0 12px 30px rgba(139, 92, 246, 0.4)';
                            }}
                            onMouseLeave={e => {
                                e.target.style.transform = 'translateY(0)';
                                e.target.style.boxShadow = '0 8px 20px rgba(139, 92, 246, 0.3)';
                            }}
                        >
                            <div style={{
                                fontSize: '1.5rem',
                                marginBottom: '0.5rem'
                            }}>
                                👩‍⚕️
                            </div>
                            <div style={{
                                fontSize: '1rem',
                                fontWeight: '600',
                                marginBottom: '0.25rem'
                            }}>
                                {t('admin.doctorRequests')}
                            </div>
                            <div style={{
                                fontSize: '0.85rem',
                                opacity: 0.9
                            }}>
                                {t('admin.doctorRequestsDesc')}
                            </div>
                        </button>
                    </div>
                </div>

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
