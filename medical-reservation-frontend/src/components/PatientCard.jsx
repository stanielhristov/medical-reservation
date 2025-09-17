const PatientCard = ({ patient, onClick, isSelected = false }) => {
    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'active': return '#059669';
            case 'chronic': return '#dc2626';
            case 'followup': return '#f59e0b';
            default: return '#6b7280';
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'active': return 'Active';
            case 'chronic': return 'Chronic';
            case 'followup': return 'Follow-up';
            default: return 'Unknown';
        }
    };

    const daysSinceLastVisit = patient.lastVisit ? 
        Math.floor((new Date() - new Date(patient.lastVisit)) / (1000 * 60 * 60 * 24)) : null;
    const daysUntilNextAppointment = patient.nextAppointment ? 
        Math.floor((new Date(patient.nextAppointment) - new Date()) / (1000 * 60 * 60 * 24)) : null;

    return (
        <div
            onClick={() => onClick(patient)}
            style={{
                background: isSelected 
                    ? 'rgba(5, 150, 105, 0.05)' 
                    : 'rgba(255, 255, 255, 0.98)',
                backdropFilter: 'blur(20px)',
                borderRadius: '16px',
                padding: '1.5rem',
                marginBottom: '1rem',
                boxShadow: isSelected 
                    ? '0 8px 24px rgba(5, 150, 105, 0.2)' 
                    : '0 4px 16px rgba(5, 150, 105, 0.08)',
                border: isSelected 
                    ? '2px solid #059669' 
                    : '1px solid rgba(5, 150, 105, 0.1)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                position: 'relative'
            }}
            onMouseEnter={e => {
                if (!isSelected) {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(5, 150, 105, 0.15)';
                }
            }}
            onMouseLeave={e => {
                if (!isSelected) {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 16px rgba(5, 150, 105, 0.08)';
                }
            }}
        >
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '1rem'
            }}>
                <div style={{ flex: 1 }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        marginBottom: '0.5rem'
                    }}>
                        <div style={{
                            width: '48px',
                            height: '48px',
                            background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                            borderRadius: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontSize: '1.2rem',
                            fontWeight: '600'
                        }}>
                            {patient.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        
                        <div>
                            <h3 style={{
                                fontSize: '1.1rem',
                                fontWeight: '700',
                                color: '#374151',
                                margin: '0 0 0.25rem'
                            }}>
                                {patient.name}
                            </h3>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}>
                                <span style={{
                                    fontSize: '0.85rem',
                                    color: '#6b7280'
                                }}>
                                    {patient.age} years • {patient.gender}
                                </span>
                                <span style={{
                                    padding: '0.125rem 0.5rem',
                                    borderRadius: '12px',
                                    fontSize: '0.7rem',
                                    fontWeight: '600',
                                    background: `${getStatusColor(patient.status)}20`,
                                    color: getStatusColor(patient.status)
                                }}>
                                    {getStatusText(patient.status)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{
                    textAlign: 'right',
                    fontSize: '0.8rem',
                    color: '#6b7280'
                }}>
                    <div style={{ marginBottom: '0.25rem' }}>
                        Total Visits: {patient.visitCount}
                    </div>
                    <div>
                        Blood Type: {patient.bloodType}
                    </div>
                </div>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                gap: '1rem',
                marginBottom: '1rem'
            }}>
                <div>
                    <div style={{
                        fontSize: '0.7rem',
                        fontWeight: '600',
                        color: '#6b7280',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        marginBottom: '0.25rem'
                    }}>
                        Last Visit
                    </div>
                    <div style={{
                        fontSize: '0.85rem',
                        color: '#374151',
                        fontWeight: '500'
                    }}>
                        {patient.lastVisit ? (
                            <>
                                {formatDate(patient.lastVisit)}
                                <span style={{
                                    color: '#6b7280',
                                    fontSize: '0.75rem',
                                    marginLeft: '0.25rem'
                                }}>
                                    ({daysSinceLastVisit} days ago)
                                </span>
                            </>
                        ) : (
                            <span style={{ color: '#9ca3af', fontStyle: 'italic' }}>
                                No visits yet
                            </span>
                        )}
                    </div>
                </div>

                <div>
                    <div style={{
                        fontSize: '0.7rem',
                        fontWeight: '600',
                        color: '#6b7280',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        marginBottom: '0.25rem'
                    }}>
                        Next Appointment
                    </div>
                    <div style={{
                        fontSize: '0.85rem',
                        color: '#374151',
                        fontWeight: '500'
                    }}>
                        {patient.nextAppointment ? (
                            <>
                                {formatDate(patient.nextAppointment)}
                                <span style={{
                                    color: daysUntilNextAppointment <= 7 ? '#059669' : '#6b7280',
                                    fontSize: '0.75rem',
                                    marginLeft: '0.25rem',
                                    fontWeight: daysUntilNextAppointment <= 7 ? '600' : '400'
                                }}>
                                    ({daysUntilNextAppointment > 0 ? `in ${daysUntilNextAppointment} days` : 'overdue'})
                                </span>
                            </>
                        ) : (
                            <span style={{ color: '#9ca3af', fontStyle: 'italic' }}>
                                No appointment scheduled
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {patient.conditions && patient.conditions.length > 0 && patient.conditions[0] !== 'None' && (
                <div style={{ marginBottom: '1rem' }}>
                    <div style={{
                        fontSize: '0.7rem',
                        fontWeight: '600',
                        color: '#6b7280',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        marginBottom: '0.5rem'
                    }}>
                        Conditions
                    </div>
                    <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '0.5rem'
                    }}>
                        {patient.conditions.slice(0, 3).map((condition, index) => (
                            <span
                                key={index}
                                style={{
                                    padding: '0.25rem 0.5rem',
                                    borderRadius: '8px',
                                    fontSize: '0.75rem',
                                    fontWeight: '500',
                                    background: '#dc262620',
                                    color: '#dc2626'
                                }}
                            >
                                {condition}
                            </span>
                        ))}
                        {patient.conditions.length > 3 && (
                            <span style={{
                                padding: '0.25rem 0.5rem',
                                borderRadius: '8px',
                                fontSize: '0.75rem',
                                fontWeight: '500',
                                background: '#6b728020',
                                color: '#6b7280'
                            }}>
                                +{patient.conditions.length - 3} more
                            </span>
                        )}
                    </div>
                </div>
            )}

            {patient.allergies && patient.allergies.length > 0 && patient.allergies[0] !== 'None known' && (
                <div>
                    <div style={{
                        fontSize: '0.7rem',
                        fontWeight: '600',
                        color: '#6b7280',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        marginBottom: '0.5rem'
                    }}>
                        Allergies
                    </div>
                    <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '0.5rem'
                    }}>
                        {patient.allergies.slice(0, 2).map((allergy, index) => (
                            <span
                                key={index}
                                style={{
                                    padding: '0.25rem 0.5rem',
                                    borderRadius: '8px',
                                    fontSize: '0.75rem',
                                    fontWeight: '500',
                                    background: '#f59e0b20',
                                    color: '#f59e0b'
                                }}
                            >
                                {allergy}
                            </span>
                        ))}
                        {patient.allergies.length > 2 && (
                            <span style={{
                                padding: '0.25rem 0.5rem',
                                borderRadius: '8px',
                                fontSize: '0.75rem',
                                fontWeight: '500',
                                background: '#6b728020',
                                color: '#6b7280'
                            }}>
                                +{patient.allergies.length - 2} more
                            </span>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default PatientCard;
