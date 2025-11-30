import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import { useDoctorPatients } from '../../hooks/useDoctorPatients';
import PatientFilters from '../../components/PatientFilters';
import PatientCard from '../../components/PatientCard';
import PatientDetails from '../../components/PatientDetails';
import MedicalRecordModal from '../../components/MedicalRecordModal';
import LoadingSpinner from '../../components/LoadingSpinner';

const DoctorPatientsRefactored = () => {
    const { t } = useTranslation();
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
        return <LoadingSpinner message={t('loading.loadingPatients')} />;
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
                    <h3 style={{ color: '#dc2626', margin: '0 0 1rem' }}>{t('errors.unableToLoadPatients')}</h3>
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
                        {t('common.tryAgain')}
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
                maxWidth: selectedPatient ? '1600px' : '1400px',
                margin: '0 auto',
                padding: '2rem',
                position: 'relative',
                zIndex: 1,
                transition: 'max-width 0.3s ease'
            }}>
                {!selectedPatient ? (
                    <div style={{
                        animation: 'fadeIn 0.3s ease-in-out'
                    }}>
                        <section style={{
                            background: 'rgba(255, 255, 255, 0.98)',
                            backdropFilter: 'blur(20px)',
                            borderRadius: '32px',
                            padding: '3rem',
                            marginBottom: '3rem',
                            boxShadow: '0 32px 64px rgba(5, 150, 105, 0.12), 0 16px 32px rgba(0, 0, 0, 0.06)',
                            border: '1px solid rgba(5, 150, 105, 0.15)',
                            textAlign: 'center'
                        }}>
                            <div style={{
                                width: '100px',
                                height: '100px',
                                background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                                borderRadius: '25px',
                                margin: '0 auto 2rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxShadow: '0 20px 40px rgba(5, 150, 105, 0.3)'
                            }}>
                                <span style={{ fontSize: '3rem', color: 'white' }}>👥</span>
                            </div>
                            
                            <h1 style={{
                                fontSize: '2.5rem',
                                fontWeight: '800',
                                color: '#374151',
                                margin: '0 0 0.5rem',
                                letterSpacing: '-0.02em'
                            }}>
                                {t('patients.patientManagement')}
                            </h1>
                            
                            <p style={{
                                fontSize: '1.2rem',
                                color: '#6b7280',
                                margin: '0 0 2.5rem',
                                fontWeight: '500'
                            }}>
                                {t('patients.patientManagementDescription')}
                            </p>
                        </section>

                        <PatientFilters
                            filters={filters}
                            selectedFilter={selectedFilter}
                            onFilterChange={setSelectedFilter}
                            searchTerm={searchTerm}
                            onSearchChange={setSearchTerm}
                            patientCounts={getPatientCounts()}
                        />

                        <div>
                            {filteredPatients.map(patient => (
                                <PatientCard
                                    key={patient.id}
                                    patient={patient}
                                    onClick={setSelectedPatient}
                                    isSelected={false}
                                />
                            ))}
                        </div>
                    </div>
                ) : (
                    <div style={{
                        animation: 'fadeIn 0.3s ease-in-out'
                    }}>
                        {/* Back Navigation Header */}
                        <div style={{
                            background: 'rgba(255, 255, 255, 0.98)',
                            backdropFilter: 'blur(20px)',
                            borderRadius: '24px',
                            padding: '2rem 3rem',
                            marginBottom: '2rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem'
                        }}>
                            <button
                                onClick={() => setSelectedPatient(null)}
                                style={{
                                    background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '12px',
                                    padding: '0.75rem 1.5rem',
                                    cursor: 'pointer',
                                    fontWeight: '600',
                                    fontSize: '0.9rem',
                                    transition: 'all 0.2s ease',
                                    boxShadow: '0 4px 12px rgba(5, 150, 105, 0.3)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem'
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
                                ← {t('patients.backToPatients')}
                            </button>
                            <h1 style={{
                                fontSize: '2rem',
                                fontWeight: '700',
                                color: '#374151',
                                margin: '0',
                                flex: 1
                            }}>
                                {t('patients.patientDetailsTitle')} - {selectedPatient.name}
                            </h1>
                        </div>

                        {/* Full Page Patient Details */}
                        <PatientDetails
                            patient={selectedPatient}
                            onAddRecord={() => setShowAddRecord(true)}
                            onClose={() => setSelectedPatient(null)}
                        />
                    </div>
                )}
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
                @keyframes fadeIn {
                    0% { 
                        opacity: 0; 
                        transform: translateY(20px);
                    }
                    100% { 
                        opacity: 1; 
                        transform: translateY(0);
                    }
                }
            `}</style>
        </div>
    );
};

export default DoctorPatientsRefactored;