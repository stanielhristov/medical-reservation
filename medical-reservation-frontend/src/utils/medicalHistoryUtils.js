export const categories = [
    { id: 'all', name: 'All Records', icon: '📋' },
    { id: 'visits', name: 'Doctor Visits', icon: '🩺' },
    { id: 'tests', name: 'Lab Tests', icon: '🧪' },
    { id: 'prescriptions', name: 'Prescriptions', icon: '💊' },
    { id: 'procedures', name: 'Procedures', icon: '🏥' },
    { id: 'vaccines', name: 'Vaccinations', icon: '💉' },
    { id: 'documents', name: 'Documents', icon: '📄' }
];

export const getRecordTypeColor = (type) => {
    switch (type) {
        case 'visits':
            return { primary: '#3b82f6', secondary: 'rgba(59, 130, 246, 0.1)' };
        case 'tests':
            return { primary: '#10b981', secondary: 'rgba(16, 185, 129, 0.1)' };
        case 'prescriptions':
            return { primary: '#f59e0b', secondary: 'rgba(245, 158, 11, 0.1)' };
        case 'procedures':
            return { primary: '#8b5cf6', secondary: 'rgba(139, 92, 246, 0.1)' };
        case 'vaccines':
            return { primary: '#ef4444', secondary: 'rgba(239, 68, 68, 0.1)' };
        case 'documents':
            return { primary: '#6b7280', secondary: 'rgba(107, 114, 128, 0.1)' };
        default:
            return { primary: '#374151', secondary: 'rgba(55, 65, 81, 0.1)' };
    }
};

export const getRecordStats = (records) => {
    const stats = categories.slice(1).map(category => ({
        ...category,
        count: records.filter(record => record.type === category.id).length
    }));
    
    return stats;
};
