import { useTranslation } from 'react-i18next';
import { getBloodTypeDisplay } from '../utils/bloodTypeUtils';
import { formatDoctorScheduleDateTime } from '../utils/appointmentUtils';

const PatientDetails = ({ patient, onAddRecord, onClose }) => {
    const { t, i18n } = useTranslation();
    if (!patient) return null;

    const formatDate = (date) => {
        const locale = i18n.language === 'bg' ? 'bg-BG' : 'en-US';
        return new Date(date).toLocaleDateString(locale, {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const formatTime = (date) => {
        const locale = i18n.language === 'bg' ? 'bg-BG' : 'en-US';
        return new Date(date).toLocaleTimeString(locale, {
            hour: '2-digit',
            minute: '2-digit',
            hour12: i18n.language !== 'bg'
        });
    };

    const getRecordTypeColor = (type) => {
        switch (type) {
            case 'consultation': return '#059669';
            case 'test': return '#3b82f6';
            case 'procedure': return '#8b5cf6';
            case 'checkup': return '#f59e0b';
            default: return '#6b7280';
        }
    };

    const getRecordTypeIcon = (type) => {
        switch (type) {
            case 'consultation': return '💬';
            case 'test': return '🧪';
            case 'procedure': return '⚕️';
            case 'checkup': return '🔍';
            default: return '📋';
        }
    };

    return (
        <div style={{
            background: 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(20px)',
            borderRadius: '20px',
            padding: '2rem',
            boxShadow: '0 12px 32px rgba(5, 150, 105, 0.1)',
            border: '1px solid rgba(5, 150, 105, 0.1)',
            position: 'relative'
        }}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '2rem',
                paddingBottom: '2rem',
                borderBottom: '1px solid rgba(5, 150, 105, 0.1)'
            }}>
                <div style={{
                    width: '80px',
                    height: '80px',
                    background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                    borderRadius: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '1.8rem',
                    fontWeight: '700',
                    boxShadow: '0 8px 24px rgba(5, 150, 105, 0.3)'
                }}>
                    {patient.name.split(' ').map(n => n[0]).join('')}
                </div>
                
                <div style={{ flex: 1 }}>
                    <h2 style={{
                        fontSize: '1.8rem',
                        fontWeight: '700',
                        color: '#374151',
                        margin: '0 0 0.5rem'
                    }}>
                        {patient.name}
                    </h2>
                    <div style={{
                        display: 'flex',
                        gap: '1rem',
                        fontSize: '0.9rem',
                        color: '#6b7280'
                    }}>
                        <span>{patient.age} {t('patients.yearsOld')}</span>
                        <span>•</span>
                        <span>{patient.gender === 'MALE' ? t('common.male') : 
                                patient.gender === 'FEMALE' ? t('common.female') : 
                                patient.gender === 'Not specified' ? t('common.notProvided') : 
                                patient.gender}</span>
                        <span>•</span>
                        <span>{t('patients.bloodType')}: {getBloodTypeDisplay(patient.bloodType)}</span>
                        <span>•</span>
                        <span>{patient.visitCount} {t('patients.visits')}</span>
                    </div>
                </div>

                <button
                    onClick={onAddRecord}
                    style={{
                        background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '12px',
                        padding: '0.75rem 1.5rem',
                        cursor: 'pointer',
                        fontWeight: '600',
                        fontSize: '0.9rem',
                        transition: 'all 0.2s ease',
                        boxShadow: '0 4px 12px rgba(5, 150, 105, 0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                    }}
                    onMouseEnter={e => {
                        e.target.style.transform = 'translateY(-2px)';
                        e.target.style.boxShadow = '0 6px 20px rgba(5, 150, 105, 0.4)';
                    }}
                    onMouseLeave={e => {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = '0 4px 12px rgba(5, 150, 105, 0.3)';
                    }}
                >
                    ➕ {t('patients.addRecord')}
                </button>
            </div>

            {/* Medical Information Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '1.5rem',
                marginBottom: '2rem'
            }}>
                {/* Contact Information */}
                <div style={{
                    background: 'rgba(5, 150, 105, 0.05)',
                    borderRadius: '12px',
                    padding: '1rem',
                    border: '1px solid rgba(5, 150, 105, 0.1)'
                }}>
                    <div style={{
                        fontSize: '0.8rem',
                        fontWeight: '600',
                        color: '#6b7280',
                        textTransform: 'uppercase',
                        marginBottom: '0.5rem'
                    }}>
                        {t('patients.contactInformation')}
                    </div>
                    <div style={{ fontSize: '0.9rem', color: '#374151', marginBottom: '0.25rem' }}>
                        📞 {patient.phone}
                    </div>
                    <div style={{ fontSize: '0.9rem', color: '#374151', marginBottom: '0.25rem' }}>
                        ✉️ {patient.email}
                    </div>
                    <div style={{ fontSize: '0.9rem', color: '#374151' }}>
                        📍 {patient.address}
                    </div>
                </div>

                {/* Emergency Contact */}
                {(patient.emergencyContactName || patient.emergencyPhone) && (
                    <div style={{
                        background: 'rgba(239, 68, 68, 0.05)',
                        borderRadius: '12px',
                        padding: '1rem',
                        border: '1px solid rgba(239, 68, 68, 0.1)'
                    }}>
                        <div style={{
                            fontSize: '0.8rem',
                            fontWeight: '600',
                            color: '#6b7280',
                            textTransform: 'uppercase',
                            marginBottom: '0.5rem'
                        }}>
                            {t('patients.emergencyContact')}
                        </div>
                        {patient.emergencyContactName && (
                            <div style={{ fontSize: '0.9rem', color: '#374151', marginBottom: '0.25rem' }}>
                                👤 {patient.emergencyContactName}
                            </div>
                        )}
                        {patient.emergencyContactRelationship && (
                            <div style={{ fontSize: '0.9rem', color: '#374151', marginBottom: '0.25rem' }}>
                                🔗 {patient.emergencyContactRelationship}
                            </div>
                        )}
                        {patient.emergencyPhone && (
                            <div style={{ fontSize: '0.9rem', color: '#374151' }}>
                                📞 {patient.emergencyPhone}
                            </div>
                        )}
                    </div>
                )}

                {/* Physical Measurements */}
                {(patient.height || patient.weight || patient.bmi) && (
                    <div style={{
                        background: 'rgba(99, 102, 241, 0.05)',
                        borderRadius: '12px',
                        padding: '1rem',
                        border: '1px solid rgba(99, 102, 241, 0.1)'
                    }}>
                        <div style={{
                            fontSize: '0.8rem',
                            fontWeight: '600',
                            color: '#6b7280',
                            textTransform: 'uppercase',
                            marginBottom: '0.5rem'
                        }}>
                            {t('patients.physicalMeasurements')}
                        </div>
                        {patient.height && (
                            <div style={{ fontSize: '0.9rem', color: '#374151', marginBottom: '0.25rem' }}>
                                📏 {t('patients.height')}: {patient.height} cm
                            </div>
                        )}
                        {patient.weight && (
                            <div style={{ fontSize: '0.9rem', color: '#374151', marginBottom: '0.25rem' }}>
                                ⚖️ {t('patients.weight')}: {patient.weight} kg
                            </div>
                        )}
                        {patient.bmi && (
                            <div style={{ fontSize: '0.9rem', color: '#374151' }}>
                                📊 {t('patients.bmi')}: {patient.bmi}
                            </div>
                        )}
                    </div>
                )}

                {/* Next Appointment */}
                {patient.nextAppointment && (
                    <div style={{
                        background: 'rgba(59, 130, 246, 0.05)',
                        borderRadius: '12px',
                        padding: '1rem',
                        border: '1px solid rgba(59, 130, 246, 0.1)'
                    }}>
                        <div style={{
                            fontSize: '0.8rem',
                            fontWeight: '600',
                            color: '#6b7280',
                            textTransform: 'uppercase',
                            marginBottom: '0.5rem'
                        }}>
                            {t('patients.nextAppointment')}
                        </div>
                        <div style={{ fontSize: '0.9rem', color: '#374151' }}>
                            📅 {formatDoctorScheduleDateTime(patient.nextAppointment)}
                        </div>
                    </div>
                )}

                {/* Medical Conditions */}
                {patient.conditions && patient.conditions.length > 0 && patient.conditions[0] !== 'None' && (
                    <div style={{
                        background: 'rgba(220, 38, 38, 0.05)',
                        borderRadius: '12px',
                        padding: '1rem',
                        border: '1px solid rgba(220, 38, 38, 0.1)'
                    }}>
                        <div style={{
                            fontSize: '0.8rem',
                            fontWeight: '600',
                            color: '#6b7280',
                            textTransform: 'uppercase',
                            marginBottom: '0.5rem'
                        }}>
                            {t('patients.conditions')}
                        </div>
                        {patient.conditions.map((condition, index) => (
                            <div key={index} style={{
                                fontSize: '0.9rem',
                                color: '#374151',
                                marginBottom: '0.25rem'
                            }}>
                                🏥 {condition === 'Nothing' ? t('patients.nothing') : 
                                    condition === 'None' ? t('patients.nothing') : 
                                    condition}
                            </div>
                        ))}
                    </div>
                )}

                {/* Allergies */}
                {patient.allergies && patient.allergies.length > 0 && patient.allergies[0] !== 'None known' && (
                    <div style={{
                        background: 'rgba(245, 158, 11, 0.05)',
                        borderRadius: '12px',
                        padding: '1rem',
                        border: '1px solid rgba(245, 158, 11, 0.1)'
                    }}>
                        <div style={{
                            fontSize: '0.8rem',
                            fontWeight: '600',
                            color: '#6b7280',
                            textTransform: 'uppercase',
                            marginBottom: '0.5rem'
                        }}>
                            {t('patients.allergies')}
                        </div>
                        {patient.allergies.map((allergy, index) => (
                            <div key={index} style={{
                                fontSize: '0.9rem',
                                color: '#374151',
                                marginBottom: '0.25rem'
                            }}>
                                ⚠️ {allergy === 'No allergies' ? t('patients.noAllergies') : 
                                    allergy === 'None known' ? t('patients.noneKnown') : 
                                    allergy}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Detailed Medical Information */}
            {(patient.chronicConditions || patient.currentMedications || patient.pastSurgeries || patient.familyMedicalHistory) && (
                <div style={{
                    background: 'rgba(255, 255, 255, 0.95)',
                    borderRadius: '16px',
                    padding: '2rem',
                    marginBottom: '2rem',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.05)',
                    border: '1px solid rgba(107, 114, 128, 0.1)'
                }}>
                    <h3 style={{
                        fontSize: '1.3rem',
                        fontWeight: '700',
                        color: '#374151',
                        margin: '0 0 1.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                    }}>
                        🏥 {t('patients.comprehensiveMedicalInformation')}
                    </h3>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '1.5rem'
                    }}>
                        {/* Chronic Conditions */}
                        {patient.chronicConditions && (
                            <div style={{
                                background: '#fef3f2',
                                borderRadius: '12px',
                                padding: '1.5rem',
                                border: '1px solid #fecaca'
                            }}>
                                <div style={{
                                    fontSize: '0.9rem',
                                    fontWeight: '700',
                                    color: '#dc2626',
                                    marginBottom: '0.75rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem'
                                }}>
                                    🩺 {t('patients.chronicConditions')}
                                </div>
                                <div style={{
                                    fontSize: '0.9rem',
                                    color: '#374151',
                                    lineHeight: '1.6',
                                    whiteSpace: 'pre-line'
                                }}>
                                    {patient.chronicConditions}
                                </div>
                            </div>
                        )}

                        {/* Current Medications */}
                        {patient.currentMedications && (
                            <div style={{
                                background: '#f0f9ff',
                                borderRadius: '12px',
                                padding: '1.5rem',
                                border: '1px solid #bae6fd'
                            }}>
                                <div style={{
                                    fontSize: '0.9rem',
                                    fontWeight: '700',
                                    color: '#0369a1',
                                    marginBottom: '0.75rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem'
                                }}>
                                    💊 {t('patients.currentMedications')}
                                </div>
                                <div style={{
                                    fontSize: '0.9rem',
                                    color: '#374151',
                                    lineHeight: '1.6',
                                    whiteSpace: 'pre-line'
                                }}>
                                    {patient.currentMedications}
                                </div>
                            </div>
                        )}

                        {/* Past Surgeries */}
                        {patient.pastSurgeries && (
                            <div style={{
                                background: '#fef7f0',
                                borderRadius: '12px',
                                padding: '1.5rem',
                                border: '1px solid #fed7aa'
                            }}>
                                <div style={{
                                    fontSize: '0.9rem',
                                    fontWeight: '700',
                                    color: '#ea580c',
                                    marginBottom: '0.75rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem'
                                }}>
                                    🔪 {t('patients.pastSurgeries')}
                                </div>
                                <div style={{
                                    fontSize: '0.9rem',
                                    color: '#374151',
                                    lineHeight: '1.6',
                                    whiteSpace: 'pre-line'
                                }}>
                                    {patient.pastSurgeries}
                                </div>
                            </div>
                        )}

                        {/* Family Medical History */}
                        {patient.familyMedicalHistory && (
                            <div style={{
                                background: '#f7f5ff',
                                borderRadius: '12px',
                                padding: '1.5rem',
                                border: '1px solid #d8b4fe'
                            }}>
                                <div style={{
                                    fontSize: '0.9rem',
                                    fontWeight: '700',
                                    color: '#7c3aed',
                                    marginBottom: '0.75rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem'
                                }}>
                                    👨‍👩‍👧‍👦 {t('patients.familyMedicalHistory')}
                                </div>
                                <div style={{
                                    fontSize: '0.9rem',
                                    color: '#374151',
                                    lineHeight: '1.6',
                                    whiteSpace: 'pre-line'
                                }}>
                                    {patient.familyMedicalHistory}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            <div>
                <h3 style={{
                    fontSize: '1.3rem',
                    fontWeight: '700',
                    color: '#374151',
                    margin: '0 0 1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                }}>
                    📋 {t('patients.medicalRecords')} ({patient.medicalRecords?.length || 0})
                </h3>

                {patient.medicalRecords && patient.medicalRecords.length > 0 ? (
                    <div style={{
                        display: 'grid',
                        gap: '1rem'
                    }}>
                        {patient.medicalRecords.map((record) => (
                            <div key={record.id} style={{
                                background: '#f9fafb',
                                borderRadius: '12px',
                                padding: '1.5rem',
                                border: `1px solid ${getRecordTypeColor(record.type)}20`
                            }}>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'flex-start',
                                    marginBottom: '1rem'
                                }}>
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.75rem'
                                    }}>
                                        <span style={{
                                            width: '40px',
                                            height: '40px',
                                            background: `${getRecordTypeColor(record.type)}20`,
                                            borderRadius: '10px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '1.2rem'
                                        }}>
                                            {getRecordTypeIcon(record.type)}
                                        </span>
                                        <div>
                                            <h4 style={{
                                                fontSize: '1rem',
                                                fontWeight: '600',
                                                color: '#374151',
                                                margin: '0 0 0.25rem'
                                            }}>
                                                {record.title}
                                            </h4>
                                            <div style={{
                                                fontSize: '0.8rem',
                                                color: '#6b7280'
                                            }}>
                                                {formatDate(record.date)} • {record.type}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                                    gap: '1rem'
                                }}>
                                    {record.description && (
                                        <div>
                                            <div style={{
                                                fontSize: '0.8rem',
                                                fontWeight: '600',
                                                color: '#6b7280',
                                                marginBottom: '0.25rem'
                                            }}>
                                                {t('patients.description')}
                                            </div>
                                            <div style={{
                                                fontSize: '0.9rem',
                                                color: '#374151'
                                            }}>
                                                {record.description}
                                            </div>
                                        </div>
                                    )}

                                    {record.diagnosis && (
                                        <div>
                                            <div style={{
                                                fontSize: '0.8rem',
                                                fontWeight: '600',
                                                color: '#6b7280',
                                                marginBottom: '0.25rem'
                                            }}>
                                                {t('patients.diagnosis')}
                                            </div>
                                            <div style={{
                                                fontSize: '0.9rem',
                                                color: '#374151'
                                            }}>
                                                {record.diagnosis}
                                            </div>
                                        </div>
                                    )}

                                    {record.treatment && (
                                        <div>
                                            <div style={{
                                                fontSize: '0.8rem',
                                                fontWeight: '600',
                                                color: '#6b7280',
                                                marginBottom: '0.25rem'
                                            }}>
                                                {t('patients.treatment')}
                                            </div>
                                            <div style={{
                                                fontSize: '0.9rem',
                                                color: '#374151'
                                            }}>
                                                {record.treatment}
                                            </div>
                                        </div>
                                    )}

                                    {record.prescription && record.prescription !== 'None' && (
                                        <div>
                                            <div style={{
                                                fontSize: '0.8rem',
                                                fontWeight: '600',
                                                color: '#6b7280',
                                                marginBottom: '0.25rem'
                                            }}>
                                                {t('patients.prescription')}
                                            </div>
                                            <div style={{
                                                fontSize: '0.9rem',
                                                color: '#374151',
                                                background: 'rgba(34, 197, 94, 0.1)',
                                                padding: '0.5rem',
                                                borderRadius: '6px',
                                                border: '1px solid rgba(34, 197, 94, 0.2)'
                                            }}>
                                                💊 {record.prescription}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div style={{
                        textAlign: 'center',
                        padding: '2rem',
                        color: '#6b7280'
                    }}>
                        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📋</div>
                        <div>{t('patients.noMedicalRecordsFound')}</div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PatientDetails;
