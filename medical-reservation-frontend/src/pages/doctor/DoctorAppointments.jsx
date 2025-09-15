import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useDoctorAppointments } from '../../hooks/useDoctorAppointments';
import LoadingSpinner from '../../components/LoadingSpinner';
import DoctorAppointmentHeader from '../../components/DoctorAppointmentHeader';
import DoctorAppointmentTabs from '../../components/DoctorAppointmentTabs';
import DoctorAppointmentCard from '../../components/DoctorAppointmentCard';

const DoctorAppointments = () => {
    const { user } = useAuth();
    const {
        loading,
        selectedView,
        setSelectedView,
        appointments,
        selectedAppointment,
        setSelectedAppointment,
        showNotes,
        setShowNotes,
        notes,
        setNotes,
        filteredAppointments,
        getStatusColor,
        updateAppointmentStatus,
        addNotes,
        formatTime,
        formatDate
    } = useDoctorAppointments();

    if (loading) {
        return <LoadingSpinner message="Loading appointments..." />;
    }

    return (
        <div style={{ position: 'relative' }}>
            <div style={{
                position: 'absolute',
                top: '5%',
                right: '8%',
                width: '300px',
                height: '300px',
                background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, rgba(59, 130, 246, 0.05) 50%, transparent 100%)',
                borderRadius: '50%',
                zIndex: 0
            }} />
            
            <div style={{
                position: 'absolute',
                bottom: '10%',
                left: '5%',
                width: '250px',
                height: '250px',
                background: 'radial-gradient(circle, rgba(37, 99, 235, 0.08) 0%, rgba(37, 99, 235, 0.03) 50%, transparent 100%)',
                borderRadius: '50%',
                zIndex: 0
            }} />

            <main style={{
                padding: '2.5rem 0',
                position: 'relative',
                zIndex: 1
            }}>
                <DoctorAppointmentHeader user={user} appointments={appointments} />

                <DoctorAppointmentTabs
                    selectedView={selectedView}
                    onViewChange={setSelectedView}
                />

                <section style={{
                    background: 'rgba(255, 255, 255, 0.98)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '24px',
                    padding: '2.5rem',
                    boxShadow: '0 20px 40px rgba(59, 130, 246, 0.12), 0 16px 32px rgba(0, 0, 0, 0.06)',
                    border: '1px solid rgba(59, 130, 246, 0.15)'
                }}>
                    {filteredAppointments.length === 0 ? (
                        <div style={{
                            textAlign: 'center',
                            padding: '4rem 2rem',
                            color: '#6b7280'
                        }}>
                            <div style={{
                                fontSize: '4rem',
                                marginBottom: '1rem',
                                opacity: 0.5
                            }}>
                                📅
                            </div>
                            <h3 style={{
                                fontSize: '1.5rem',
                                fontWeight: '600',
                                margin: '0 0 0.5rem',
                                color: '#374151'
                            }}>
                                No appointments found
                            </h3>
                            <p style={{
                                fontSize: '1rem',
                                margin: 0,
                                maxWidth: '400px',
                                marginLeft: 'auto',
                                marginRight: 'auto',
                                lineHeight: '1.5'
                            }}>
                                There are no appointments in the selected category. Check other views or wait for new appointments to be scheduled.
                            </p>
                        </div>
                    ) : (
                        <div style={{
                            display: 'grid',
                            gap: '1.5rem'
                        }}>
                            {filteredAppointments.map(appointment => (
                                <DoctorAppointmentCard
                                    key={appointment.id}
                                    appointment={appointment}
                                    getStatusColor={getStatusColor}
                                    formatTime={formatTime}
                                    formatDate={formatDate}
                                    updateAppointmentStatus={updateAppointmentStatus}
                                    setSelectedAppointment={setSelectedAppointment}
                                />
                            ))}
                        </div>
                    )}
                </section>

                {selectedAppointment && (
                    <div style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'rgba(0, 0, 0, 0.6)',
                        backdropFilter: 'blur(5px)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 1000,
                        padding: '2rem'
                    }} onClick={() => setSelectedAppointment(null)}>
                        <div style={{
                            background: 'white',
                            borderRadius: '24px',
                            padding: '2.5rem',
                            maxWidth: '800px',
                            width: '100%',
                            maxHeight: '90vh',
                            overflow: 'auto',
                            boxShadow: '0 25px 50px rgba(0,0,0,0.25)',
                            position: 'relative',
                            animation: 'fadeInUp 0.3s ease-out',
                            border: '1px solid rgba(59, 130, 246, 0.2)'
                        }} onClick={e => e.stopPropagation()}>
                            <button
                                onClick={() => setSelectedAppointment(null)}
                                style={{
                                    position: 'absolute',
                                    top: '1.5rem',
                                    right: '1.5rem',
                                    background: 'none',
                                    border: 'none',
                                    fontSize: '1.5rem',
                                    cursor: 'pointer',
                                    color: '#9ca3af',
                                    padding: '0.5rem',
                                    borderRadius: '8px',
                                    transition: 'all 0.3s ease'
                                }}
                                onMouseEnter={e => {
                                    e.target.style.background = 'rgba(239, 68, 68, 0.1)';
                                    e.target.style.color = '#ef4444';
                                }}
                                onMouseLeave={e => {
                                    e.target.style.background = 'none';
                                    e.target.style.color = '#9ca3af';
                                }}
                            >
                                ✕
                            </button>

                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1.5rem',
                                marginBottom: '2rem',
                                paddingRight: '3rem'
                            }}>
                                <div style={{
                                    width: '80px',
                                    height: '80px',
                                    background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                                    borderRadius: '20px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '2.5rem',
                                    boxShadow: '0 12px 25px rgba(59, 130, 246, 0.3)'
                                }}>
                                    👤
                                </div>
                                <div>
                                    <h2 style={{
                                        fontSize: '2rem',
                                        fontWeight: '700',
                                        color: '#374151',
                                        margin: '0 0 0.5rem'
                                    }}>
                                        {selectedAppointment.patientName}
                                    </h2>
                                    <p style={{
                                        fontSize: '1.1rem',
                                        color: '#6b7280',
                                        margin: 0,
                                        fontWeight: '500'
                                    }}>
                                        {selectedAppointment.type} • Age: {selectedAppointment.patientAge}
                                    </p>
                                </div>
                            </div>

                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                                gap: '1.5rem',
                                marginBottom: '2rem'
                            }}>
                                <div style={{
                                    background: 'rgba(243, 244, 246, 0.7)',
                                    borderRadius: '16px',
                                    padding: '1.5rem',
                                    border: '1px solid rgba(209, 213, 219, 0.5)'
                                }}>
                                    <h4 style={{
                                        fontSize: '1.1rem',
                                        fontWeight: '600',
                                        color: '#374151',
                                        margin: '0 0 1rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem'
                                    }}>
                                        📞 Contact Information
                                    </h4>
                                    <div style={{ marginBottom: '0.75rem' }}>
                                        <span style={{ fontSize: '0.85rem', color: '#6b7280', fontWeight: '600' }}>Phone: </span>
                                        <span style={{ color: '#374151' }}>{selectedAppointment.patientPhone}</span>
                                    </div>
                                    <div>
                                        <span style={{ fontSize: '0.85rem', color: '#6b7280', fontWeight: '600' }}>Email: </span>
                                        <span style={{ color: '#374151' }}>{selectedAppointment.patientEmail}</span>
                                    </div>
                                </div>

                                <div style={{
                                    background: 'rgba(243, 244, 246, 0.7)',
                                    borderRadius: '16px',
                                    padding: '1.5rem',
                                    border: '1px solid rgba(209, 213, 219, 0.5)'
                                }}>
                                    <h4 style={{
                                        fontSize: '1.1rem',
                                        fontWeight: '600',
                                        color: '#374151',
                                        margin: '0 0 1rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem'
                                    }}>
                                        🕐 Appointment Details
                                    </h4>
                                    <div style={{ marginBottom: '0.75rem' }}>
                                        <span style={{ fontSize: '0.85rem', color: '#6b7280', fontWeight: '600' }}>Date: </span>
                                        <span style={{ color: '#374151' }}>{formatDate(selectedAppointment.appointmentDate)}</span>
                                    </div>
                                    <div style={{ marginBottom: '0.75rem' }}>
                                        <span style={{ fontSize: '0.85rem', color: '#6b7280', fontWeight: '600' }}>Time: </span>
                                        <span style={{ color: '#3b82f6', fontWeight: '600' }}>{formatTime(selectedAppointment.appointmentDate)}</span>
                                    </div>
                                    <div>
                                        <span style={{ fontSize: '0.85rem', color: '#6b7280', fontWeight: '600' }}>Duration: </span>
                                        <span style={{ color: '#374151' }}>{selectedAppointment.duration}</span>
                                    </div>
                                </div>
                            </div>

                            {selectedAppointment.medicalHistory && selectedAppointment.medicalHistory.length > 0 && (
                                <div style={{
                                    background: 'rgba(254, 249, 195, 0.7)',
                                    borderRadius: '16px',
                                    padding: '1.5rem',
                                    marginBottom: '1.5rem',
                                    border: '1px solid rgba(251, 191, 36, 0.3)'
                                }}>
                                    <h4 style={{
                                        fontSize: '1.1rem',
                                        fontWeight: '600',
                                        color: '#374151',
                                        margin: '0 0 1rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem'
                                    }}>
                                        📋 Medical History
                                    </h4>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                                        {selectedAppointment.medicalHistory.map((condition, index) => (
                                            <span
                                                key={index}
                                                style={{
                                                    background: 'rgba(251, 191, 36, 0.2)',
                                                    color: '#92400e',
                                                    padding: '0.5rem 1rem',
                                                    borderRadius: '12px',
                                                    fontSize: '0.9rem',
                                                    fontWeight: '600',
                                                    border: '1px solid rgba(251, 191, 36, 0.3)'
                                                }}
                                            >
                                                {condition}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div style={{
                                background: 'rgba(220, 252, 231, 0.7)',
                                borderRadius: '16px',
                                padding: '1.5rem',
                                marginBottom: '1.5rem',
                                border: '1px solid rgba(34, 197, 94, 0.3)'
                            }}>
                                <h4 style={{
                                    fontSize: '1.1rem',
                                    fontWeight: '600',
                                    color: '#374151',
                                    margin: '0 0 1rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem'
                                }}>
                                    📝 Notes & Reason
                                </h4>
                                <div style={{ marginBottom: '1rem' }}>
                                    <span style={{ fontSize: '0.85rem', color: '#6b7280', fontWeight: '600', display: 'block', marginBottom: '0.5rem' }}>
                                        Reason for Visit:
                                    </span>
                                    <p style={{ color: '#374151', margin: 0, lineHeight: '1.5' }}>
                                        {selectedAppointment.reason}
                                    </p>
                                </div>
                                {selectedAppointment.notes && (
                                    <div>
                                        <span style={{ fontSize: '0.85rem', color: '#6b7280', fontWeight: '600', display: 'block', marginBottom: '0.5rem' }}>
                                            Current Notes:
                                        </span>
                                        <p style={{ color: '#374151', margin: 0, lineHeight: '1.5' }}>
                                            {selectedAppointment.notes}
                                        </p>
                                    </div>
                                )}
                            </div>

                            <div style={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                gap: '1rem',
                                paddingTop: '1rem',
                                borderTop: '1px solid rgba(229, 231, 235, 0.8)'
                            }}>
                                <button
                                    onClick={() => setShowNotes(true)}
                                    style={{
                                        padding: '0.8rem 1.5rem',
                                        background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '12px',
                                        cursor: 'pointer',
                                        fontSize: '1rem',
                                        fontWeight: '600',
                                        transition: 'all 0.3s ease',
                                        boxShadow: '0 4px 12px rgba(5, 150, 105, 0.3)'
                                    }}
                                    onMouseEnter={e => {
                                        e.target.style.transform = 'translateY(-2px)';
                                        e.target.style.boxShadow = '0 6px 20px rgba(5, 150, 105, 0.4)';
                                    }}
                                    onMouseLeave={e => {
                                        e.target.style.transform = 'translateY(0)';
                                        e.target.style.boxShadow = '0 4px 12px rgba(5, 150, 105, 0.3)';
                                    }}
                                >
                                    📝 Add Notes
                                </button>
                                <button
                                    onClick={() => setSelectedAppointment(null)}
                                    style={{
                                        padding: '0.8rem 1.5rem',
                                        background: 'rgba(107, 114, 128, 0.1)',
                                        color: '#374151',
                                        border: '2px solid rgba(107, 114, 128, 0.2)',
                                        borderRadius: '12px',
                                        cursor: 'pointer',
                                        fontSize: '1rem',
                                        fontWeight: '600',
                                        transition: 'all 0.3s ease'
                                    }}
                                    onMouseEnter={e => {
                                        e.target.style.background = 'rgba(107, 114, 128, 0.2)';
                                        e.target.style.transform = 'translateY(-2px)';
                                    }}
                                    onMouseLeave={e => {
                                        e.target.style.background = 'rgba(107, 114, 128, 0.1)';
                                        e.target.style.transform = 'translateY(0)';
                                    }}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {showNotes && (
                    <div style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'rgba(0, 0, 0, 0.6)',
                        backdropFilter: 'blur(5px)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 1001,
                        padding: '2rem'
                    }} onClick={() => setShowNotes(false)}>
                        <div style={{
                            background: 'white',
                            borderRadius: '20px',
                            padding: '2.5rem',
                            maxWidth: '600px',
                            width: '100%',
                            boxShadow: '0 25px 50px rgba(0,0,0,0.25)',
                            position: 'relative',
                            animation: 'fadeInUp 0.3s ease-out',
                            border: '1px solid rgba(59, 130, 246, 0.2)'
                        }} onClick={e => e.stopPropagation()}>
                            <button
                                onClick={() => setShowNotes(false)}
                                style={{
                                    position: 'absolute',
                                    top: '1rem',
                                    right: '1rem',
                                    background: 'none',
                                    border: 'none',
                                    fontSize: '1.5rem',
                                    cursor: 'pointer',
                                    color: '#9ca3af',
                                    padding: '0.5rem',
                                    borderRadius: '8px'
                                }}
                            >
                                ✕
                            </button>

                            <h3 style={{
                                fontSize: '1.8rem',
                                fontWeight: '700',
                                color: '#374151',
                                margin: '0 0 1.5rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem'
                            }}>
                                📝 Add Notes
                            </h3>

                            <p style={{
                                color: '#6b7280',
                                margin: '0 0 1.5rem',
                                lineHeight: '1.5'
                            }}>
                                Add clinical notes, observations, or follow-up instructions for {selectedAppointment?.patientName}.
                            </p>

                            <textarea
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                placeholder="Enter your notes here..."
                                style={{
                                    width: '100%',
                                    minHeight: '120px',
                                    padding: '1rem',
                                    border: '2px solid rgba(59, 130, 246, 0.2)',
                                    borderRadius: '12px',
                                    fontSize: '1rem',
                                    fontFamily: 'inherit',
                                    resize: 'vertical',
                                    marginBottom: '1.5rem',
                                    boxSizing: 'border-box'
                                }}
                            />

                            <div style={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                gap: '1rem'
                            }}>
                                <button
                                    onClick={() => setShowNotes(false)}
                                    style={{
                                        padding: '0.8rem 1.5rem',
                                        background: 'rgba(107, 114, 128, 0.1)',
                                        color: '#374151',
                                        border: '2px solid rgba(107, 114, 128, 0.2)',
                                        borderRadius: '12px',
                                        cursor: 'pointer',
                                        fontSize: '1rem',
                                        fontWeight: '600',
                                        transition: 'all 0.3s ease'
                                    }}
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => {
                                        if (notes.trim() && selectedAppointment) {
                                            addNotes(selectedAppointment.id, notes.trim());
                                        }
                                    }}
                                    disabled={!notes.trim()}
                                    style={{
                                        padding: '0.8rem 1.5rem',
                                        background: notes.trim() 
                                            ? 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)'
                                            : 'rgba(107, 114, 128, 0.3)',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '12px',
                                        cursor: notes.trim() ? 'pointer' : 'not-allowed',
                                        fontSize: '1rem',
                                        fontWeight: '600',
                                        transition: 'all 0.3s ease',
                                        boxShadow: notes.trim() ? '0 4px 12px rgba(59, 130, 246, 0.3)' : 'none'
                                    }}
                                >
                                    Save Notes
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default DoctorAppointments;
