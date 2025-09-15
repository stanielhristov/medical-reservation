import { useState, useEffect, useCallback, useMemo } from 'react';

export const useMedicalHistory = () => {
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [medicalRecords, setMedicalRecords] = useState([]);
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null);

    useEffect(() => {
        fetchMedicalHistory();
    }, []);

    const fetchMedicalHistory = useCallback(async () => {
        try {
            setMedicalRecords([
                {
                    id: 1,
                    type: 'visits',
                    title: 'Annual Physical Examination',
                    doctor: 'Dr. Sarah Johnson',
                    date: new Date(2024, 0, 15),
                    summary: 'Routine annual checkup. Patient in good health overall. Blood pressure slightly elevated.',
                    details: 'Comprehensive physical examination including cardiovascular, respiratory, and neurological assessments. Blood pressure: 135/85. Weight: 165 lbs. Height: 5\'8". All other vital signs within normal range.',
                    attachments: ['Blood_work_results.pdf', 'EKG_reading.pdf'],
                    category: 'General Medicine',
                    status: 'completed'
                },
                {
                    id: 2,
                    type: 'tests',
                    title: 'Complete Blood Count (CBC)',
                    doctor: 'Dr. Michael Chen',
                    date: new Date(2024, 0, 20),
                    summary: 'Blood work ordered during annual physical. All values within normal range.',
                    details: 'White Blood Cells: 7,200/μL (Normal), Red Blood Cells: 4.8 million/μL (Normal), Hemoglobin: 14.2 g/dL (Normal), Platelet Count: 280,000/μL (Normal)',
                    attachments: ['CBC_detailed_report.pdf'],
                    category: 'Laboratory',
                    status: 'completed'
                },
                {
                    id: 3,
                    type: 'prescriptions',
                    title: 'Lisinopril 10mg - Blood Pressure Management',
                    doctor: 'Dr. Sarah Johnson',
                    date: new Date(2024, 1, 1),
                    summary: 'Prescribed for mild hypertension following annual physical examination.',
                    details: 'Medication: Lisinopril 10mg, Once daily in the morning. Duration: 90 days with 2 refills. Instructions: Take with or without food. Monitor blood pressure weekly.',
                    attachments: ['Prescription_copy.pdf'],
                    category: 'Cardiology',
                    status: 'active'
                },
                {
                    id: 4,
                    type: 'procedures',
                    title: 'Dermatology Consultation - Skin Check',
                    doctor: 'Dr. Emily Rodriguez',
                    date: new Date(2023, 11, 10),
                    summary: 'Routine skin cancer screening. Two small moles removed for biopsy.',
                    details: 'Full body skin examination performed. Two suspicious moles identified on back and removed via excision. Samples sent for histopathological analysis. Results: Benign nevus.',
                    attachments: ['Biopsy_results.pdf', 'Post_procedure_care.pdf'],
                    category: 'Dermatology',
                    status: 'completed'
                },
                {
                    id: 5,
                    type: 'vaccines',
                    title: 'Annual Flu Vaccination',
                    doctor: 'Dr. Lisa Martinez',
                    date: new Date(2023, 9, 15),
                    summary: 'Seasonal influenza vaccine administered. No adverse reactions observed.',
                    details: 'Vaccine: Quadrivalent Influenza Vaccine (2023-2024 season). Lot number: FLU2023-456. Administration site: Left deltoid muscle. Patient monitored for 15 minutes post-vaccination.',
                    attachments: ['Vaccination_record.pdf'],
                    category: 'Preventive Care',
                    status: 'completed'
                },
                {
                    id: 6,
                    type: 'documents',
                    title: 'Insurance Card & Medical ID',
                    doctor: 'Patient Upload',
                    date: new Date(2024, 1, 5),
                    summary: 'Personal medical documents and insurance information.',
                    details: 'Health insurance card, medical ID bracelet information, and emergency contact details.',
                    attachments: ['Insurance_card_front.jpg', 'Insurance_card_back.jpg', 'Medical_ID_info.pdf'],
                    category: 'Personal Documents',
                    status: 'active'
                }
            ]);
        } catch (error) {
            console.error('Error fetching medical history:', error);
        } finally {
            setLoading(false);
        }
    }, []);

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
