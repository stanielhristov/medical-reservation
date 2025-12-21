export const categories = [
    { id: 'all', name: 'All Records' },
    { id: 'consultation', name: 'Consultation' },
    { id: 'test', name: 'Test/Lab Results' },
    { id: 'procedure', name: 'Medical Procedure' },
    { id: 'checkup', name: 'Routine Checkup' },
    { id: 'emergency', name: 'Emergency Visit' },
    { id: 'followup', name: 'Follow-up Visit' },
    { id: 'prescription', name: 'Prescription' }
];

export const getRecordTypeColor = (type) => {
    switch (type) {
        case 'consultation':
            return { primary: '#059669', secondary: 'rgba(5, 150, 105, 0.1)' };
        case 'test':
            return { primary: '#3b82f6', secondary: 'rgba(59, 130, 246, 0.1)' };
        case 'procedure':
            return { primary: '#8b5cf6', secondary: 'rgba(139, 92, 246, 0.1)' };
        case 'checkup':
            return { primary: '#f59e0b', secondary: 'rgba(245, 158, 11, 0.1)' };
        case 'emergency':
            return { primary: '#dc2626', secondary: 'rgba(220, 38, 38, 0.1)' };
        case 'followup':
            return { primary: '#6366f1', secondary: 'rgba(99, 102, 241, 0.1)' };
        case 'prescription':
            return { primary: '#10b981', secondary: 'rgba(16, 185, 129, 0.1)' };
        default:
            return { primary: '#22c55e', secondary: 'rgba(34, 197, 94, 0.1)' };
    }
};

export const getRecordStats = (records) => {
    const stats = categories.slice(1).map(category => ({
        ...category,
        count: records.filter(record => record.type === category.id).length
    }));
    
    return stats;
};
