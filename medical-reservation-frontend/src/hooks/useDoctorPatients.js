import { useState, useEffect, useCallback, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { getDoctorPatients, getDoctorByUserId } from '../api/doctors';
import { getPatientMedicalHistory } from '../api/medicalHistory';

export const useDoctorPatients = () => {
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
            
            // First get the doctor's data using their user ID
            const doctorData = await getDoctorByUserId(user.id);
            
            // Then get patients for this doctor
            const patientsData = await getDoctorPatients(doctorData.id);
            
            // Transform backend data to match frontend structure
            const transformedPatients = await Promise.all(patientsData.map(async (patient) => {
                try {
                    // Get medical history for each patient
                    const medicalHistory = await getPatientMedicalHistory(patient.id);
                    
                    return {
                        id: patient.id,
                        name: patient.fullName || 'Unknown Patient',
                        age: patient.age || null,
                        gender: patient.gender || 'Not specified',
                        phone: patient.phoneNumber || 'N/A',
                        email: patient.email || 'N/A',
                        address: patient.address || 'Address not provided',
                        bloodType: patient.bloodType || null,
                        allergies: patient.allergies || ['None known'],
                        conditions: patient.conditions || [],
                        lastVisit: patient.lastVisit ? new Date(patient.lastVisit) : null,
                        nextAppointment: patient.nextAppointment ? new Date(patient.nextAppointment) : null,
                        visitCount: patient.visitCount || 0,
                        status: patient.status?.toLowerCase() || 'active',
                        // Additional comprehensive medical information
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
                        medicalRecords: medicalHistory.map(record => ({
                            id: record.id,
                            date: new Date(record.recordDate || record.createdAt),
                            type: record.recordType?.toLowerCase() || 'consultation',
                            title: record.title || record.diagnosis || 'Medical Record',
                            description: record.notes || record.description || 'No description available',
                            diagnosis: record.diagnosis || 'No diagnosis',
                            treatment: record.treatment || 'No treatment specified',
                            prescription: record.prescription || 'No prescription'
                        }))
                    };
                } catch (recordError) {
                    console.warn(`Failed to load medical history for patient ${patient.id}:`, recordError);
                    return {
                        id: patient.id,
                        name: patient.fullName || 'Unknown Patient',
                        age: patient.age || null,
                        gender: patient.gender || 'Not specified',
                        phone: patient.phoneNumber || 'N/A',
                        email: patient.email || 'N/A',
                        address: patient.address || 'Address not provided',
                        bloodType: patient.bloodType || null,
                        allergies: patient.allergies || ['None known'],
                        conditions: patient.conditions || [],
                        lastVisit: patient.lastVisit ? new Date(patient.lastVisit) : null,
                        nextAppointment: patient.nextAppointment ? new Date(patient.nextAppointment) : null,
                        visitCount: patient.visitCount || 0,
                        status: patient.status?.toLowerCase() || 'active',
                        // Additional comprehensive medical information
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
            setError('Failed to load patients. Please try again.');
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

        // Apply search filter
        if (searchTerm) {
            filtered = filtered.filter(patient =>
                patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                patient.phone.includes(searchTerm)
            );
        }

        // Apply status filter
        const now = new Date();
        switch (selectedFilter) {
            case 'recent':
                filtered = filtered.filter(patient => 
                    patient.lastVisit && 
                    (now - patient.lastVisit) <= 30 * 24 * 60 * 60 * 1000 // Last 30 days
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
                // 'all' - no additional filtering
                break;
        }

        return filtered;
    }, [patients, searchTerm, selectedFilter]);

    const handleSaveRecord = useCallback(async (recordData) => {
        try {
            // This would need to call a create medical record API
            console.log('Saving medical record:', recordData);
            // For now, just close the modal
            setShowAddRecord(false);
            // Refresh patients to get updated medical records
            await fetchPatients();
        } catch (error) {
            console.error('Error saving medical record:', error);
            throw error;
        }
    }, [fetchPatients]);

    const filters = [
        { id: 'all', name: 'All Patients', icon: '👥', color: '#059669' },
        { id: 'recent', name: 'Recent Visits', icon: '⏰', color: '#3b82f6' },
        { id: 'chronic', name: 'Chronic Conditions', icon: '🏥', color: '#dc2626' },
        { id: 'followup', name: 'Follow-up Required', icon: '📋', color: '#f59e0b' }
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
