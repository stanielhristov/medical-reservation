import { useState, useEffect, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import { getDoctorPatients, getDoctorByUserId } from '../api/doctors';
import { getPatientMedicalHistory, createMedicalHistory } from '../api/medicalHistory';

export const useDoctorPatients = () => {
    const { t } = useTranslation();
    const [loading, setLoading] = useState(true);
    const [patients, setPatients] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('all');
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [showAddRecord, setShowAddRecord] = useState(false);
    const [error, setError] = useState(null);
    const { user } = useAuth();

    const fetchPatients = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            
            const doctorData = await getDoctorByUserId(user.id);
            
            const patientsData = await getDoctorPatients(doctorData.id);
            
            const transformedPatients = await Promise.all(patientsData.map(async (patient) => {
                try {
                    const medicalHistory = await getPatientMedicalHistory(patient.id);
                    
                    return {
                        id: patient.id,
                        name: patient.fullName || t('patients.unknownPatient'),
                        age: patient.age || null,
                        gender: patient.gender || t('common.notProvided'),
                        phone: patient.phoneNumber || 'N/A',
                        email: patient.email || 'N/A',
                        address: patient.address || t('patients.addressNotProvided'),
                        bloodType: patient.bloodType || null,
                        allergies: patient.allergies || [t('patients.noneKnown')],
                        conditions: patient.conditions || [],
                        lastVisit: patient.lastVisit ? new Date(patient.lastVisit) : null,
                        nextAppointment: patient.nextAppointment ? new Date(patient.nextAppointment) : null,
                        visitCount: patient.visitCount || 0,
                        status: patient.status?.toLowerCase() || 'active',
                        emergencyPhone: patient.emergencyPhone || patient.emergencyContact,
                        emergencyContactName: patient.emergencyContactName,
                        emergencyContactRelationship: patient.emergencyContactRelationship,
                        chronicConditions: patient.chronicConditions,
                        currentMedications: patient.currentMedications,
                        pastSurgeries: patient.pastSurgeries,
                        familyMedicalHistory: patient.familyMedicalHistory,
                        height: patient.height,
                        weight: patient.weight,
                        bmi: patient.bmi,
                        medicalRecords: medicalHistory.map(record => {
                            const mapBackendTypeToCategory = (backendType) => {
                                switch (backendType?.toLowerCase()) {
                                    case 'consultation':
                                        return 'consultation';
                                    case 'checkup':
                                        return 'checkup';
                                    case 'followup':
                                        return 'followup';
                                    case 'visit':
                                        return 'visits';
                                    case 'lab_result':
                                    case 'test':
                                    case 'lab':
                                        return 'test';
                                    case 'procedure':
                                        return 'procedure';
                                    case 'emergency':
                                        return 'emergency';
                                    case 'surgery':
                                        return 'procedures';
                                    case 'prescription':
                                    case 'medication':
                                        return 'prescription';
                                    case 'vaccination':
                                    case 'vaccine':
                                        return 'vaccines';
                                    case 'document':
                                        return 'documents';
                                    default:
                                        return backendType || 'consultation';
                                }
                            };
                            
                            const backendType = record.recordType?.toLowerCase() || 'consultation';
                            return {
                                id: record.id,
                                date: new Date(record.recordDate || record.createdAt),
                                type: mapBackendTypeToCategory(backendType),
                                originalType: backendType,
                                title: record.title || record.diagnosis || 'Medical Record',
                                description: record.description || record.notes || 'No description available',
                                diagnosis: record.diagnosis || 'No diagnosis',
                                treatment: record.treatment || 'No treatment specified',
                                prescription: record.medications || record.prescription || 'No prescription'
                            };
                        })
                    };
                } catch (recordError) {
                    console.warn(`Failed to load medical history for patient ${patient.id}:`, recordError);
                    return {
                        id: patient.id,
                        name: patient.fullName || t('patients.unknownPatient'),
                        age: patient.age || null,
                        gender: patient.gender || t('common.notProvided'),
                        phone: patient.phoneNumber || 'N/A',
                        email: patient.email || 'N/A',
                        address: patient.address || t('patients.addressNotProvided'),
                        bloodType: patient.bloodType || null,
                        allergies: patient.allergies || [t('patients.noneKnown')],
                        conditions: patient.conditions || [],
                        lastVisit: patient.lastVisit ? new Date(patient.lastVisit) : null,
                        nextAppointment: patient.nextAppointment ? new Date(patient.nextAppointment) : null,
                        visitCount: patient.visitCount || 0,
                        status: patient.status?.toLowerCase() || 'active',
                        emergencyPhone: patient.emergencyPhone || patient.emergencyContact,
                        emergencyContactName: patient.emergencyContactName,
                        emergencyContactRelationship: patient.emergencyContactRelationship,
                        chronicConditions: patient.chronicConditions,
                        currentMedications: patient.currentMedications,
                        pastSurgeries: patient.pastSurgeries,
                        familyMedicalHistory: patient.familyMedicalHistory,
                        height: patient.height,
                        weight: patient.weight,
                        bmi: patient.bmi,
                        medicalRecords: []
                    };
                }
            }));
            
            setPatients(transformedPatients);
        } catch (error) {
            console.error('Error fetching patients:', error);
            setError(t('errors.unableToLoadPatients'));
            setPatients([]);
        } finally {
            setLoading(false);
        }
    }, [user?.id]);

    useEffect(() => {
        if (user?.id && user?.role === 'DOCTOR') {
            fetchPatients();
        }
    }, [user?.id, user?.role, fetchPatients]);

    const getFilteredPatients = useMemo(() => {
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
                filtered = filtered.filter(patient => 
                    patient.lastVisit && 
                    (now - patient.lastVisit) <= 30 * 24 * 60 * 60 * 1000 
                );
                break;
            case 'chronic':
                filtered = filtered.filter(patient => 
                    patient.conditions && patient.conditions.length > 0
                );
                break;
            case 'followup':
                filtered = filtered.filter(patient => 
                    patient.nextAppointment && patient.nextAppointment > now
                );
                break;
            default:
                break;
        }

        return filtered;
    }, [patients, searchTerm, selectedFilter]);

    const handleSaveRecord = useCallback(async (recordData) => {
        try {
            const doctorData = await getDoctorByUserId(user.id);
            
            const mapTypeToBackend = (type) => {
                switch (type?.toLowerCase()) {
                    case 'consultation':
                        return 'consultation';
                    case 'checkup':
                    case 'routine checkup':
                        return 'checkup';
                    case 'followup':
                    case 'follow-up visit':
                        return 'followup';
                    case 'test':
                    case 'lab':
                    case 'lab_result':
                    case 'test/lab results':
                        return 'lab_result';
                    case 'procedure':
                    case 'medical procedure':
                        return 'procedure';
                    case 'emergency':
                    case 'emergency visit':
                        return 'emergency';
                    case 'prescription':
                        return 'prescription';
                    default:
                        return type || 'consultation';
                }
            };
            
            const medicalHistoryData = {
                patientId: recordData.patientId,
                doctorId: doctorData.id,
                title: recordData.title,
                description: recordData.description,
                diagnosis: recordData.diagnosis,
                treatment: recordData.treatment,
                medications: recordData.prescription || null,
                recordType: mapTypeToBackend(recordData.type),
                recordDate: recordData.date || new Date().toISOString()
            };
            
            await createMedicalHistory(medicalHistoryData);
            
            setShowAddRecord(false);
            
            await fetchPatients();
            
            if (selectedPatient && selectedPatient.id === recordData.patientId) {
                const updatedMedicalHistory = await getPatientMedicalHistory(recordData.patientId);
                const mapBackendTypeToCategory = (backendType) => {
                    switch (backendType?.toLowerCase()) {
                        case 'consultation':
                            return 'consultation';
                        case 'checkup':
                            return 'checkup';
                        case 'followup':
                            return 'followup';
                        case 'visit':
                            return 'visits';
                        case 'lab_result':
                        case 'test':
                        case 'lab':
                            return 'test';
                        case 'procedure':
                            return 'procedure';
                        case 'emergency':
                            return 'emergency';
                        case 'surgery':
                            return 'procedures';
                        case 'prescription':
                        case 'medication':
                            return 'prescription';
                        case 'vaccination':
                        case 'vaccine':
                            return 'vaccines';
                        case 'document':
                            return 'documents';
                        default:
                            return backendType || 'consultation';
                    }
                };
                
                setSelectedPatient(prev => ({
                    ...prev,
                    medicalRecords: updatedMedicalHistory.map(record => {
                        const backendType = record.recordType?.toLowerCase() || 'consultation';
                        return {
                            id: record.id,
                            date: new Date(record.recordDate || record.createdAt),
                            type: mapBackendTypeToCategory(backendType),
                            originalType: backendType,
                            title: record.title || record.diagnosis || 'Medical Record',
                            description: record.description || record.notes || 'No description available',
                            diagnosis: record.diagnosis || 'No diagnosis',
                            treatment: record.treatment || 'No treatment specified',
                            prescription: record.medications || record.prescription || 'No prescription'
                        };
                    })
                }));
            }
        } catch (error) {
            console.error('Error saving medical record:', error);
            throw error;
        }
    }, [user?.id, fetchPatients, selectedPatient]);

    const filters = [
        { id: 'all', name: t('patients.allPatients'), icon: 'users', color: '#22c55e' },
        { id: 'recent', name: t('patients.recentVisits'), icon: 'clock', color: '#22c55e' },
        { id: 'chronic', name: t('patients.chronicConditions'), icon: 'hospital', color: '#22c55e' },
        { id: 'followup', name: t('patients.followupRequired'), icon: 'clipboard', color: '#22c55e' }
    ];

    return {
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
        filteredPatients: getFilteredPatients,
        handleSaveRecord,
        filters,
        refetchPatients: fetchPatients
    };
};
