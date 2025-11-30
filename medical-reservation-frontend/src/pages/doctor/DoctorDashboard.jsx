import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useDoctorDashboard } from '../../hooks/useDoctorDashboard';
import LoadingSpinner from '../../components/LoadingSpinner';
import DoctorWelcomeSection from '../../components/DoctorWelcomeSection';
import DoctorQuickActions from '../../components/DoctorQuickActions';
import TodayAppointmentsSection from '../../components/TodayAppointmentsSection';
import UpcomingAppointmentsSection from '../../components/UpcomingAppointmentsSection';

const DoctorDashboard = () => {
    const { t } = useTranslation();
    const { user } = useAuth();
    const navigate = useNavigate();
    const {
        loading,
        todayAppointments,
        upcomingAppointments,
        dashboardStats,
        formatTime,
        formatDate,
        getStatusColor
    } = useDoctorDashboard(user);

    const handleNavigation = (path) => {
        navigate(path);
    };

    if (loading) {
        return <LoadingSpinner message={t('loading.loadingDashboard')} />;
    }

    return (
        <div style={{ position: 'relative' }}>
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

            <main style={{
                padding: '2.5rem 0',
                position: 'relative',
                zIndex: 1
            }}>
                <DoctorWelcomeSection 
                    user={user} 
                    dashboardStats={dashboardStats} 
                />

                <DoctorQuickActions onNavigation={handleNavigation} />

                <TodayAppointmentsSection
                    todayAppointments={todayAppointments}
                    formatTime={formatTime}
                    getStatusColor={getStatusColor}
                    onNavigation={handleNavigation}
                />

                <UpcomingAppointmentsSection
                    upcomingAppointments={upcomingAppointments}
                    formatTime={formatTime}
                    formatDate={formatDate}
                    getStatusColor={getStatusColor}
                    onNavigation={handleNavigation}
                />
            </main>
        </div>
    );
};

export default DoctorDashboard;
