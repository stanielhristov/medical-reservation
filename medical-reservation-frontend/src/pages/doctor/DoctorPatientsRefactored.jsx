import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import PatientFilters from '../../components/PatientFilters';
import PatientCard from '../../components/PatientCard';
import PatientDetails from '../../components/PatientDetails';
import MedicalRecordModal from '../../components/MedicalRecordModal';

const DoctorPatientsRefactored = () => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('all');
    const [patients, setPatients] = useState([]);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [showAddRecord, setShowAddRecord] = useState(false);

    const filters = [
        { id: 'all', name: 'All Patients', icon: '👥', color: '#059669' },
        { id: 'recent', name: 'Recent Visits', icon: '⏰', color: '#3b82f6' },
        { id: 'chronic', name: 'Chronic Conditions', icon: '🏥', color: '#dc2626' },
        { id: 'followup', name: 'Follow-up Required', icon: '📋', color: '#f59e0b' }
    ];

    useEffect(() => {
        fetchPatients();
    }, []);

    const fetchPatients = async () => {
        try {
            // Mock data implementation
            setPatients([
                {
                    id: 1,
                    name: "John Smith",
                    age: 45,
                    gender: "Male",
                    phone: "(555) 123-4567",
                    email: "john.smith@email.com",
                    address: "123 Main St, City, State 12345",
                    bloodType: "O+",
                    allergies: ["Penicillin", "Shellfish"],
                    conditions: ["Hypertension", "Type 2 Diabetes"],
                    lastVisit: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
                    nextAppointment: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
                    visitCount: 12,
                    status: "active",
                    medicalRecords: [
                        {
                            id: 1,
                            date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
                            type: "consultation",
                            title: "Blood Pressure Check",
                            description: "Routine follow-up for hypertension management",
                            diagnosis: "Hypertension - well controlled",
                            treatment: "Continue current medication regimen",
                            prescription: "Lisinopril 10mg daily"
                        }
                    ]
                }
            ]);
        } catch (error) {
            console.error('Error fetching patients:', error);
        } finally {
            setLoading(false);
        }
    };

    const getFilteredPatients = () => {
        let filtered = patients;

        if (searchTerm) {
            filtered = filtered.filter(patient =>
                patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                patient.phone.includes(searchTerm)
            );
        }

        const now = new Date();
        switch (selectedFilter) {
            case 'recent':
                return filtered.filter(patient => 
                    new Date(patient.lastVisit) >= new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
                );
            case 'chronic':
                return filtered.filter(patient => patient.status === 'chronic');
            case 'followup':
                return filtered.filter(patient => 
                    new Date(patient.nextAppointment) <= new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)
                );
            default:
                return filtered;
        }
    };

    const getPatientCounts = () => {
        const now = new Date();
        return {
            all: patients.length,
            recent: patients.filter(p => new Date(p.lastVisit) >= new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)).length,
            chronic: patients.filter(p => p.status === 'chronic').length,
            followup: patients.filter(p => new Date(p.nextAppointment) <= new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)).length
        };
    };

    const handleSaveRecord = (recordData) => {
        setPatients(prevPatients => 
            prevPatients.map(patient => 
                patient.id === selectedPatient.id
                    ? {
                        ...patient,
                        medicalRecords: [...patient.medicalRecords, { ...recordData, id: Date.now() }]
                    }
                    : patient
            )
        );
        setShowAddRecord(false);
    };

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
                    textAlign: 'center'
                }}>
                    <div style={{
                        width: '60px',
                        height: '60px',
                        border: '4px solid rgba(5, 150, 105, 0.2)',
                        borderTop: '4px solid #059669',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite',
                        margin: '0 auto 1.5rem'
                    }} />
                    <p>Loading patients...</p>
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
                        {getFilteredPatients().map(patient => (
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