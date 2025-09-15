import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useDashboard } from '../../hooks/useDashboard';
import LoadingSpinner from '../../components/LoadingSpinner';
import DashboardWelcome from '../../components/DashboardWelcome';
import QuickActions from '../../components/QuickActions';
import NextAppointmentCard from '../../components/NextAppointmentCard';
import RecentAppointmentsList from '../../components/RecentAppointmentsList';

const PatientDashboard = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    
    const {
        loading,
        nextAppointment,
        recentAppointments
    } = useDashboard(user);

    const handleNavigation = (path) => {
        navigate(path);
    };

    if (loading) {
        return <LoadingSpinner message="Loading your dashboard..." />;
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
                <DashboardWelcome user={user} />

                <QuickActions onNavigate={handleNavigation} />

                <NextAppointmentCard 
                    appointment={nextAppointment}
                    onViewDetails={() => navigate('/patient/appointments')}
                />

                <RecentAppointmentsList 
                    appointments={recentAppointments}
                    onViewAll={() => navigate('/patient/appointments')}
                />
            </main>
        </div>
    );
};

export default PatientDashboard;
