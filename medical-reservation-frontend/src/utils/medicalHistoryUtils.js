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
            return { primary: '#22c55e', secondary: 'rgba(34, 197, 94, 0.1)' };
        case 'tests':
            return { primary: '#22c55e', secondary: 'rgba(34, 197, 94, 0.1)' };
        case 'prescriptions':
            return { primary: '#22c55e', secondary: 'rgba(34, 197, 94, 0.1)' };
        case 'procedures':
            return { primary: '#22c55e', secondary: 'rgba(34, 197, 94, 0.1)' };
        case 'vaccines':
            return { primary: '#22c55e', secondary: 'rgba(34, 197, 94, 0.1)' };
        case 'documents':
            return { primary: '#22c55e', secondary: 'rgba(34, 197, 94, 0.1)' };
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
