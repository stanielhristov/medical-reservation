import { useState, useEffect, useCallback, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { getPatientMedicalHistory } from '../api/medicalHistory';
import { getPatientAppointments } from '../api/appointments';
import i18n from '../i18n/config';

export const useMedicalHistory = () => {
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [medicalRecords, setMedicalRecords] = useState([]);
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null);
    const { user } = useAuth();

    const mapRecordTypeFromBackend = useCallback((backendType) => {
        switch (backendType?.toLowerCase()) {
            case 'consultation':
            case 'visit':
            case 'checkup':
            case 'routine checkup':
            case 'followup':
            case 'follow-up visit':
                return 'visits';
            case 'lab_result':
            case 'lab':
            case 'test':
            case 'test/lab results':
                return 'tests';
            case 'prescription':
            case 'medication':
                return 'prescriptions';
            case 'procedure':
            case 'medical procedure':
            case 'surgery':
            case 'emergency':
            case 'emergency visit':
                return 'procedures';
            case 'vaccination':
            case 'vaccine':
                return 'vaccines';
            case 'document':
                return 'documents';
            default:
                return 'visits';
        }
    }, []);

    const fetchMedicalHistory = useCallback(async () => {
        try {
            setLoading(true);
            
            const [medicalHistoryResponse, appointmentsResponse] = await Promise.all([
                getPatientMedicalHistory(user.id).catch(err => {
                    console.warn('Error fetching medical history:', err);
                    return [];
                }),
                getPatientAppointments(user.id).catch(err => {
                    console.warn('Error fetching appointments:', err);
                    return [];
                })
            ]);
            
            const transformedRecords = medicalHistoryResponse.map(record => {
                const recordType = mapRecordTypeFromBackend(record.recordType || record.type);
                return {
                    id: record.id,
                    type: recordType,
                    title: record.title || record.diagnosis || 'Medical Record',
                    doctor: record.doctor?.fullName || record.doctorName || 'Unknown Doctor',
                    date: new Date(record.recordDate || record.createdAt),
                    summary: record.description || record.notes || 'No summary available',
                    details: record.treatment || record.medications || record.notes || 'No details available',
                    attachments: [],
                    category: recordType,
                    status: record.status?.toLowerCase() || 'completed',
                    isAppointment: false
                };
            });
            
            const appointmentRecords = appointmentsResponse
                .filter(appointment => {
                    const status = appointment.status?.toLowerCase();
                    return status === 'completed' || status === 'confirmed' || status === 'cancelled';
                })
                .map(appointment => {
                    const appointmentDate = new Date(appointment.appointmentTime || appointment.appointmentDate || appointment.date);
                    return {
                        id: `appointment-${appointment.id}`,
                        type: 'visits',
                        title: appointment.serviceName || appointment.type || 'Doctor Visit',
                        doctor: appointment.doctor?.fullName || appointment.doctorName || 'Unknown Doctor',
                        date: appointmentDate,
                        summary: appointment.notes || appointment.reason || 'Doctor consultation',
                        details: `Appointment type: ${appointment.serviceName || appointment.type || 'Consultation'}\nDuration: ${appointment.duration || '30 minutes'}\nLocation: ${appointment.doctorLocation || appointment.location || 'Not specified'}`,
                        attachments: [],
                        category: 'visits',
                        status: appointment.status?.toLowerCase() || 'completed',
                        isAppointment: true,
                        appointmentId: appointment.id,
                        appointmentType: appointment.serviceName || appointment.type,
                        appointmentDuration: appointment.duration,
                        appointmentLocation: appointment.doctorLocation || appointment.location
                    };
                });
            
            const allRecords = [...transformedRecords, ...appointmentRecords].sort((a, b) => {
                return new Date(b.date) - new Date(a.date);
            });
            
            setMedicalRecords(allRecords);
        } catch (error) {
            console.error('Error fetching medical history:', error);
            setMedicalRecords([]);
        } finally {
            setLoading(false);
        }
    }, [user?.id, mapRecordTypeFromBackend]);

    useEffect(() => {
        if (user?.id) {
            fetchMedicalHistory();
        }
    }, [user?.id, fetchMedicalHistory]);

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
        if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
            return 'Invalid Date';
        }
        const currentLang = i18n.language || 'en';
        const locale = currentLang === 'bg' ? 'bg-BG' : 'en-US';
        return date.toLocaleDateString(locale, {
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
