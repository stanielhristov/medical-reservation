import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useDoctorPatients } from '../../hooks/useDoctorPatients';
import PatientFilters from '../../components/PatientFilters';
import PatientCard from '../../components/PatientCard';
import PatientDetails from '../../components/PatientDetails';
import MedicalRecordModal from '../../components/MedicalRecordModal';
import LoadingSpinner from '../../components/LoadingSpinner';

const DoctorPatientsRefactored = () => {
    const { user } = useAuth();
    const {
        loading,
        error,
        patients,
        searchTerm,
        setSearchTerm,
        selectedFilter,
        setSelectedFilter,
        selectedPatient,
        setSelectedPatient,
        showAddRecord,
        setShowAddRecord,
        filteredPatients,
        handleSaveRecord,
        filters,
        refetchPatients
    } = useDoctorPatients();

    const getPatientCounts = () => {
        const now = new Date();
        return {
            all: patients.length,
            recent: patients.filter(p => p.lastVisit && (now - p.lastVisit) <= 30 * 24 * 60 * 60 * 1000).length,
            chronic: patients.filter(p => p.conditions && p.conditions.length > 0).length,
            followup: patients.filter(p => p.nextAppointment && p.nextAppointment > now).length
        };
    };

    if (loading) {
        return <LoadingSpinner message="Loading patients..." />;
    }

    if (error) {
        return (
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '50vh',
                padding: '2rem',
                textAlign: 'center'
            }}>
                <div style={{
                    background: 'rgba(239, 68, 68, 0.1)',
                    border: '2px solid rgba(239, 68, 68, 0.2)',
                    borderRadius: '16px',
                    padding: '2rem',
                    maxWidth: '500px'
                }}>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚠️</div>
                    <h3 style={{ color: '#dc2626', margin: '0 0 1rem' }}>Unable to Load Patients</h3>
                    <p style={{ color: '#6b7280', margin: '0 0 1.5rem' }}>{error}</p>
                    <button
                        onClick={refetchPatients}
                        style={{
                            padding: '0.75rem 1.5rem',
                            background: '#dc2626',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontWeight: '500'
                        }}
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 50%, #bbf7d0 100%)',
            position: 'relative'
        }}>
            <main style={{
                maxWidth: '1400px',
                margin: '0 auto',
                padding: '2rem',
                position: 'relative',
                zIndex: 1
            }}>
                <div style={{
                    background: 'rgba(255, 255, 255, 0.98)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '24px',
                    padding: '3rem',
                    marginBottom: '2rem',
                    textAlign: 'center'
                }}>
                    <h1 style={{
                        fontSize: '2.5rem',
                        fontWeight: '800',
                        color: '#374151',
                        margin: '0 0 1rem'
                    }}>
                        Patient Management
                    </h1>
                </div>

                <PatientFilters
                    filters={filters}
                    selectedFilter={selectedFilter}
                    onFilterChange={setSelectedFilter}
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                    patientCounts={getPatientCounts()}
                />

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: selectedPatient ? '1fr 1fr' : '1fr',
                    gap: '2rem',
                    alignItems: 'flex-start'
                }}>
                    <div>
                        {filteredPatients.map(patient => (
                            <PatientCard
                                key={patient.id}
                                patient={patient}
                                onClick={setSelectedPatient}
                                isSelected={selectedPatient?.id === patient.id}
                            />
                        ))}
                    </div>

                    {selectedPatient && (
                        <div style={{ position: 'sticky', top: '2rem' }}>
                            <PatientDetails
                                patient={selectedPatient}
                                onAddRecord={() => setShowAddRecord(true)}
                                onClose={() => setSelectedPatient(null)}
                            />
                        </div>
                    )}
                </div>
            </main>

            <MedicalRecordModal
                isOpen={showAddRecord}
                onClose={() => setShowAddRecord(false)}
                onSave={handleSaveRecord}
                patient={selectedPatient}
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

export default DoctorPatientsRefactored;