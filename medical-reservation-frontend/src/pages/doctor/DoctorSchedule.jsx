import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getDoctorByUserId } from '../../api/doctors';
import { useSchedule } from '../../hooks/useSchedule';
import ScheduleHeader from '../../components/ScheduleHeader';
import ScheduleStats from '../../components/ScheduleStats';
import ScheduleControls from '../../components/ScheduleControls';
import ScheduleList from '../../components/ScheduleList';
import ScheduleModal from '../../components/ScheduleModal';
import DeleteConfirmationDialog from '../../components/DeleteConfirmationDialog';

const DoctorScheduleRefactored = () => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [selectedView, setSelectedView] = useState('week');
    const [currentDate, setCurrentDate] = useState(new Date());
    const [showAddModal, setShowAddModal] = useState(false);
    const [deleteConfirmation, setDeleteConfirmation] = useState({
        isOpen: false,
        schedule: null
    });
    const [doctorId, setDoctorId] = useState(null);

    const {
        schedules,
        loading: scheduleLoading,
        fetchSchedules,
        addSchedule,
        removeSchedule,
        toggleAvailability,
        getFilteredSchedules
    } = useSchedule(doctorId);

    const views = [
        { id: 'week', name: 'Week View', icon: '📅', color: '#15803d' },
        { id: 'month', name: 'Month View', icon: '🗓️', color: '#059669' },
        { id: 'upcoming', name: 'Upcoming Slots', icon: '⏰', color: '#0d9488' },
        { id: 'available', name: 'Available Only', icon: '✅', color: '#047857' }
    ];

    useEffect(() => {
        fetchDoctorAndSchedule();
    }, [user]);

    useEffect(() => {
        if (doctorId) {
            fetchSchedules();
        }
    }, [doctorId, fetchSchedules]);

    const fetchDoctorAndSchedule = async () => {
        try {
            if (!user?.id) {
                console.error('User ID not available');
                return;
            }

            const doctorProfile = await getDoctorByUserId(user.id);
            if (!doctorProfile?.id) {
                console.error('Doctor profile not found');
                return;
            }

            setDoctorId(doctorProfile.id);
        } catch (error) {
            console.error('Error fetching doctor profile:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddSchedule = () => {
        setShowAddModal(true);
    };


    const handleSaveSchedule = async (scheduleData) => {
        try {
            {
                await addSchedule(scheduleData);
            }
            setShowAddModal(false);
        } catch (error) {
            console.error('Error saving schedule:', error);
        }
    };

    const handleDeleteSchedule = (schedule) => {
        setDeleteConfirmation({
            isOpen: true,
            schedule: schedule
        });
    };

    const handleDeleteConfirm = async () => {
        try {
            if (deleteConfirmation.schedule) {
                await removeSchedule(deleteConfirmation.schedule.id);
            }
        } catch (error) {
            console.error('Error deleting schedule:', error);
        } finally {
            setDeleteConfirmation({ isOpen: false, schedule: null });
        }
    };

    const handleDeleteCancel = () => {
        setDeleteConfirmation({ isOpen: false, schedule: null });
    };

    const handleToggleAvailability = async (schedule) => {
        try {
            await toggleAvailability(schedule);
        } catch (error) {
            console.error('Error toggling availability:', error);
        }
    };

    const handleRefresh = () => {
        fetchSchedules();
    };

    const filteredSchedules = getFilteredSchedules(selectedView, currentDate);

    if (loading) {
        return (
            <div style={{
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 50%, #bbf7d0 100%)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <div style={{
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '24px',
                    padding: '3rem',
                    textAlign: 'center',
                    boxShadow: '0 20px 40px rgba(21, 128, 61, 0.15)'
                }}>
                    <div style={{
                        width: '60px',
                        height: '60px',
                        border: '4px solid rgba(21, 128, 61, 0.2)',
                        borderTop: '4px solid #15803d',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite',
                        margin: '0 auto 1.5rem'
                    }} />
                    <p style={{ color: '#6b7280', margin: 0 }}>Loading schedule...</p>
                </div>
            </div>
        );
    }

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 50%, #bbf7d0 100%)',
            position: 'relative',
            overflow: 'hidden'
        }}>
            <div style={{
                position: 'absolute',
                top: '10%',
                right: '5%',
                width: '200px',
                height: '200px',
                background: 'radial-gradient(circle, rgba(21, 128, 61, 0.1) 0%, transparent 70%)',
                borderRadius: '50%',
                zIndex: 0
            }} />
            
            <div style={{
                position: 'absolute',
                bottom: '15%',
                left: '3%',
                width: '150px',
                height: '150px',
                background: 'radial-gradient(circle, rgba(5, 150, 105, 0.08) 0%, transparent 70%)',
                borderRadius: '50%',
                zIndex: 0
            }} />

            <main style={{
                maxWidth: '1400px',
                margin: '0 auto',
                padding: '2rem',
                position: 'relative',
                zIndex: 1
            }}>
                <ScheduleHeader />
                
                <ScheduleStats
                    schedules={schedules}
                    views={views}
                    currentDate={currentDate}
                    selectedView={selectedView}
                    onViewChange={setSelectedView}
                />

                <ScheduleControls
                    selectedView={selectedView}
                    currentDate={currentDate}
                    onDateChange={setCurrentDate}
                    onAddSchedule={handleAddSchedule}
                    onRefresh={handleRefresh}
                />

                <ScheduleList
                    schedules={filteredSchedules}
                    onDelete={handleDeleteSchedule}
                    onToggleAvailability={handleToggleAvailability}
                    loading={scheduleLoading}
                />
            </main>

            <ScheduleModal
                isOpen={showAddModal}
                onClose={() => {
                    setShowAddModal(false);
                }}
                onSave={handleSaveSchedule}
                schedule={null}
                title={'Add New Time Slot'}
            />

            <DeleteConfirmationDialog
                isOpen={deleteConfirmation.isOpen}
                onConfirm={handleDeleteConfirm}
                onCancel={handleDeleteCancel}
                title="Delete Schedule"
                message="Are you sure you want to delete this schedule? This action cannot be undone."
                confirmText="Yes"
                cancelText="No"
            />

            <style jsx>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
};

export default DoctorScheduleRefactored;