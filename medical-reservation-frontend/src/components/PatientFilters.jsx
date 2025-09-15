const PatientFilters = ({ 
    filters, 
    selectedFilter, 
    onFilterChange, 
    searchTerm, 
    onSearchChange,
    patientCounts = {}
}) => {
    return (
        <div style={{
            background: 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(20px)',
            borderRadius: '20px',
            padding: '1.5rem',
            marginBottom: '2rem',
            boxShadow: '0 8px 24px rgba(5, 150, 105, 0.1)',
            border: '1px solid rgba(5, 150, 105, 0.1)'
        }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1.5rem',
                flexWrap: 'wrap',
                gap: '1rem'
            }}>
                <h3 style={{
                    fontSize: '1.2rem',
                    fontWeight: '600',
                    color: '#374151',
                    margin: 0
                }}>
                    Filter Patients
                </h3>
                
                <div style={{ position: 'relative', minWidth: '250px' }}>
                    <input
                        type="text"
                        placeholder="Search patients..."
                        value={searchTerm}
                        onChange={(e) => onSearchChange(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '0.75rem 1rem 0.75rem 2.5rem',
                            border: '2px solid rgba(5, 150, 105, 0.2)',
                            borderRadius: '12px',
                            fontSize: '0.9rem',
                            outline: 'none',
                            background: '#f9fafb',
                            boxSizing: 'border-box',
                            transition: 'border-color 0.2s ease'
                        }}
                        onFocus={e => {
                            e.target.style.borderColor = '#059669';
                        }}
                        onBlur={e => {
                            e.target.style.borderColor = 'rgba(5, 150, 105, 0.2)';
                        }}
                    />
                    <span style={{
                        position: 'absolute',
                        left: '0.75rem',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: '#6b7280',
                        fontSize: '1rem'
                    }}>
                        🔍
                    </span>
                </div>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1rem'
            }}>
                {filters.map(filter => {
                    const count = patientCounts[filter.id] || 0;
                    const isSelected = selectedFilter === filter.id;
                    
                    return (
                        <button
                            key={filter.id}
                            onClick={() => onFilterChange(filter.id)}
                            style={{
                                background: isSelected 
                                    ? `${filter.color}15` 
                                    : 'rgba(107, 114, 128, 0.05)',
                                border: isSelected 
                                    ? `2px solid ${filter.color}` 
                                    : '2px solid rgba(107, 114, 128, 0.1)',
                                borderRadius: '12px',
                                padding: '1rem',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                textAlign: 'center',
                                transform: isSelected ? 'translateY(-2px)' : 'translateY(0)',
                                boxShadow: isSelected ? `0 4px 12px ${filter.color}30` : 'none'
                            }}
                            onMouseEnter={e => {
                                if (!isSelected) {
                                    e.target.style.background = `${filter.color}10`;
                                    e.target.style.transform = 'translateY(-2px)';
                                }
                            }}
                            onMouseLeave={e => {
                                if (!isSelected) {
                                    e.target.style.background = 'rgba(107, 114, 128, 0.05)';
                                    e.target.style.transform = 'translateY(0)';
                                }
                            }}
                        >
                            <div style={{ 
                                fontSize: '1.5rem', 
                                marginBottom: '0.5rem' 
                            }}>
                                {filter.icon}
                            </div>
                            <div style={{
                                color: isSelected ? filter.color : '#374151',
                                fontWeight: '600',
                                fontSize: '1.2rem',
                                marginBottom: '0.25rem'
                            }}>
                                {count}
                            </div>
                            <div style={{
                                color: isSelected ? filter.color : '#6b7280',
                                fontSize: '0.85rem',
                                fontWeight: '500'
                            }}>
                                {filter.name}
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default PatientFilters;
