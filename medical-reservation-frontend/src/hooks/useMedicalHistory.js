import { useState, useEffect, useCallback, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { getPatientMedicalHistory } from '../api/medicalHistory';

export const useMedicalHistory = () => {
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [medicalRecords, setMedicalRecords] = useState([]);
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null);
    const { user } = useAuth();

    useEffect(() => {
        if (user?.id) {
            fetchMedicalHistory();
        }
    }, [user?.id]);

    const fetchMedicalHistory = useCallback(async () => {
        try {
            setLoading(true);
            const response = await getPatientMedicalHistory(user.id);
            // Transform backend data to match frontend structure
            const transformedRecords = response.map(record => ({
                id: record.id,
                type: mapRecordTypeFromBackend(record.recordType),
                title: record.title || record.diagnosis || 'Medical Record',
                doctor: record.doctor?.fullName || 'Unknown Doctor',
                date: new Date(record.recordDate || record.createdAt),
                summary: record.notes || record.description || 'No summary available',
                details: record.treatment || record.prescription || record.notes || 'No details available',
                attachments: record.attachments || [],
                category: record.category || 'General Medicine',
                status: record.status?.toLowerCase() || 'completed'
            }));
            setMedicalRecords(transformedRecords);
        } catch (error) {
            console.error('Error fetching medical history:', error);
            setMedicalRecords([]);
        } finally {
            setLoading(false);
        }
    }, [user?.id]);

    // Helper function to map backend record types to frontend types
    const mapRecordTypeFromBackend = (backendType) => {
        switch (backendType?.toLowerCase()) {
            case 'consultation':
            case 'visit':
                return 'visits';
            case 'lab_result':
            case 'test':
                return 'tests';
            case 'prescription':
            case 'medication':
                return 'prescriptions';
            case 'procedure':
            case 'surgery':
                return 'procedures';
            case 'vaccination':
            case 'vaccine':
                return 'vaccines';
            case 'document':
                return 'documents';
            default:
                return 'visits';
        }
    };

    const filteredRecords = useMemo(() => {
        return medicalRecords.filter(record => 
            selectedCategory === 'all' || record.type === selectedCategory
        );
    }, [medicalRecords, selectedCategory]);

    const getStatusColor = useCallback((status) => {
        switch (status?.toLowerCase()) {
            case 'active':
                return { bg: 'rgba(34, 197, 94, 0.1)', color: '#16a34a', border: 'rgba(34, 197, 94, 0.2)' };
            case 'completed':
                return { bg: 'rgba(59, 130, 246, 0.1)', color: '#2563eb', border: 'rgba(59, 130, 246, 0.2)' };
            default:
                return { bg: 'rgba(107, 114, 128, 0.1)', color: '#374151', border: 'rgba(107, 114, 128, 0.2)' };
        }
    }, []);

    const getTypeIcon = useCallback((type) => {
        switch (type) {
            case 'visits': return '🩺';
            case 'tests': return '🧪';
            case 'prescriptions': return '💊';
            case 'procedures': return '🏥';
            case 'vaccines': return '💉';
            case 'documents': return '📄';
            default: return '📋';
        }
    }, []);

    const formatDate = useCallback((date) => {
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }, []);

    return {
        loading,
        selectedCategory,
        setSelectedCategory,
        medicalRecords,
        showUploadModal,
        setShowUploadModal,
        selectedRecord,
        setSelectedRecord,
        filteredRecords,
        getStatusColor,
        getTypeIcon,
        formatDate,
        refetchHistory: fetchMedicalHistory
    };
};
