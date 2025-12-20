import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { useTranslation } from 'react-i18next';
import { getBloodTypeDisplay } from '../utils/bloodTypeUtils';
import { formatDoctorScheduleDateTime } from '../utils/appointmentUtils';

const PatientDetails = ({ patient, onAddRecord, onClose, onDeleteRecord }) => {
    const { t, i18n } = useTranslation();
    const [deleteConfirmation, setDeleteConfirmation] = useState({ isOpen: false, record: null });

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

    const getCategoryType = (type) => {
        switch (type?.toLowerCase()) {
            case 'consultation':
            case 'checkup':
            case 'followup':
            case 'visit':
                return 'visits';
            case 'test':
            case 'lab':
            case 'lab_result':
                return 'tests';
            case 'procedure':
            case 'emergency':
            case 'surgery':
                return 'procedures';
            case 'prescription':
            case 'medication':
                return 'prescriptions';
            case 'vaccination':
            case 'vaccine':
                return 'vaccines';
            case 'document':
                return 'documents';
            default:
                return 'visits';
        }
    };

    const getRecordTypeDisplayName = (type, originalType) => {
        const typeToCheck = (originalType || type)?.toLowerCase();
        switch (typeToCheck) {
            case 'consultation':
                return t('medicalHistory.recordType.consultation');
            case 'checkup':
            case 'routine checkup':
                return t('medicalHistory.recordType.checkup');
            case 'followup':
            case 'follow-up visit':
            case 'followup visit':
                return t('medicalHistory.recordType.followup');
            case 'test':
            case 'lab':
            case 'lab_result':
            case 'lab result':
                return t('medicalHistory.recordType.test');
            case 'procedure':
            case 'medical procedure':
                return t('medicalHistory.recordType.procedure');
            case 'emergency':
            case 'emergency visit':
                return t('medicalHistory.recordType.emergency');
            default:
                return t(`medicalHistory.category.${getCategoryType(type)}`);
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

            {}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '1.5rem',
                marginBottom: '2rem'
            }}>
                {}
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
                    <div style={{ fontSize: '0.9rem', color: '#374151', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                        </svg>
                        {patient.phone}
                    </div>
                    <div style={{ fontSize: '0.9rem', color: '#374151', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                            <polyline points="22,6 12,13 2,6"/>
                        </svg>
                        {patient.email}
                    </div>
                    <div style={{ fontSize: '0.9rem', color: '#374151', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                            <circle cx="12" cy="10" r="3"/>
                        </svg>
                        {patient.address}
                    </div>
                </div>

                {}
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
                            <div style={{ fontSize: '0.9rem', color: '#374151', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                                    <circle cx="12" cy="7" r="4"/>
                                </svg>
                                {patient.emergencyContactName}
                            </div>
                        )}
                        {patient.emergencyContactRelationship && (
                            <div style={{ fontSize: '0.9rem', color: '#374151', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                                </svg>
                                {patient.emergencyContactRelationship}
                            </div>
                        )}
                        {patient.emergencyPhone && (
                            <div style={{ fontSize: '0.9rem', color: '#374151', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                                </svg>
                                {patient.emergencyPhone}
                            </div>
                        )}
                    </div>
                )}

                {}
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
                            <div style={{ fontSize: '0.9rem', color: '#374151', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M2 12h20M12 2v20M17 7l-5 5-5-5M7 17l5-5 5 5"/>
                                </svg>
                                {t('patients.height')}: {patient.height} cm
                            </div>
                        )}
                        {patient.weight && (
                            <div style={{ fontSize: '0.9rem', color: '#374151', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10"/>
                                    <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
                                    <line x1="9" y1="9" x2="9.01" y2="9"/>
                                    <line x1="15" y1="9" x2="15.01" y2="9"/>
                                </svg>
                                {t('patients.weight')}: {patient.weight} kg
                            </div>
                        )}
                        {patient.bmi && (
                            <div style={{ fontSize: '0.9rem', color: '#374151', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="18" y1="20" x2="18" y2="10"/>
                                    <line x1="12" y1="20" x2="12" y2="4"/>
                                    <line x1="6" y1="20" x2="6" y2="14"/>
                                </svg>
                                {t('patients.bmi')}: {patient.bmi}
                            </div>
                        )}
                    </div>
                )}

                {}
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
                        <div style={{ fontSize: '0.9rem', color: '#374151', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                                <line x1="16" y1="2" x2="16" y2="6"/>
                                <line x1="8" y1="2" x2="8" y2="6"/>
                                <line x1="3" y1="10" x2="21" y2="10"/>
                            </svg>
                            {formatDoctorScheduleDateTime(patient.nextAppointment)}
                        </div>
                    </div>
                )}

                {}
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
                                marginBottom: '0.25rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                                    <polyline points="9,22 9,12 15,12 15,22"/>
                                </svg>
                                {condition === 'Nothing' ? t('patients.nothing') : 
                                    condition === 'None' ? t('patients.nothing') : 
                                    condition}
                            </div>
                        ))}
                    </div>
                )}

                {}
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
                                marginBottom: '0.25rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                                    <line x1="12" y1="9" x2="12" y2="13"/>
                                    <line x1="12" y1="17" x2="12.01" y2="17"/>
                                </svg>
                                {allergy === 'No allergies' ? t('patients.noAllergies') : 
                                    allergy === 'None known' ? t('patients.noneKnown') : 
                                    allergy}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {}
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
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                            <polyline points="9,22 9,12 15,12 15,22"/>
                        </svg>
                        {t('patients.comprehensiveMedicalInformation')}
                    </h3>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '1.5rem'
                    }}>
                        {}
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
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"/>
                                        <path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4"/>
                                        <circle cx="20" cy="10" r="2"/>
                                    </svg>
                                    {t('patients.chronicConditions')}
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

                        {}
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
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"/>
                                        <path d="m8.5 8.5 7 7"/>
                                    </svg>
                                    {t('patients.currentMedications')}
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

                        {}
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
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="6" cy="19" r="3"/>
                                        <path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15"/>
                                        <circle cx="18" cy="5" r="3"/>
                                    </svg>
                                    {t('patients.pastSurgeries')}
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

                        {}
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
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                                        <circle cx="9" cy="7" r="4"/>
                                        <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
                                        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                                    </svg>
                                    {t('patients.familyMedicalHistory')}
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
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                        <polyline points="14,2 14,8 20,8"/>
                        <line x1="16" y1="13" x2="8" y2="13"/>
                        <line x1="16" y1="17" x2="8" y2="17"/>
                        <polyline points="10,9 9,9 8,9"/>
                    </svg>
                    {t('patients.medicalRecords')} ({patient.medicalRecords?.length || 0})
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
                                                {formatDate(record.date)} • {getRecordTypeDisplayName(record.type, record.originalType)}
                                            </div>
                                        </div>
                                    </div>
                                    {onDeleteRecord && (
                                        <button
                                            onClick={() => setDeleteConfirmation({ isOpen: true, record })}
                                            style={{
                                                background: 'rgba(239, 68, 68, 0.1)',
                                                color: '#dc2626',
                                                border: '1px solid rgba(239, 68, 68, 0.2)',
                                                borderRadius: '8px',
                                                padding: '0.5rem',
                                                cursor: 'pointer',
                                                transition: 'all 0.2s ease',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}
                                            onMouseEnter={e => {
                                                e.target.style.background = 'rgba(239, 68, 68, 0.2)';
                                            }}
                                            onMouseLeave={e => {
                                                e.target.style.background = 'rgba(239, 68, 68, 0.1)';
                                            }}
                                            title={t('medicalHistory.deleteRecord')}
                                        >
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="3,6 5,6 21,6"/>
                                                <path d="M19,6v14a2,2 0 0,1-2,2H7a2,2 0 0,1-2-2V6m3,0V4a2,2 0 0,1,2-2h4a2,2 0 0,1,2,2v2"/>
                                                <line x1="10" y1="11" x2="10" y2="17"/>
                                                <line x1="14" y1="11" x2="14" y2="17"/>
                                            </svg>
                                        </button>
                                    )}
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
                                                border: '1px solid rgba(34, 197, 94, 0.2)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.5rem'
                                            }}>
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"/>
                                                    <path d="m8.5 8.5 7 7"/>
                                                </svg>
                                                {record.prescription}
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
                        <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                                <polyline points="14,2 14,8 20,8"/>
                                <line x1="16" y1="13" x2="8" y2="13"/>
                                <line x1="16" y1="17" x2="8" y2="17"/>
                                <polyline points="10,9 9,9 8,9"/>
                            </svg>
                        </div>
                        <div>{t('patients.noMedicalRecordsFound')}</div>
                    </div>
                )}
            </div>

            {}
            {deleteConfirmation.isOpen && ReactDOM.createPortal(
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    background: 'rgba(0, 0, 0, 0.6)',
                    backdropFilter: 'blur(5px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 9999,
                    padding: '2rem',
                    boxSizing: 'border-box'
                }} onClick={() => setDeleteConfirmation({ isOpen: false, record: null })}>
                    <div style={{
                        background: 'white',
                        borderRadius: '20px',
                        padding: '2rem',
                        maxWidth: '450px',
                        width: '100%',
                        maxHeight: '90vh',
                        overflow: 'auto',
                        boxShadow: '0 25px 50px rgba(0,0,0,0.25)',
                        border: '1px solid rgba(239, 68, 68, 0.2)'
                    }} onClick={e => e.stopPropagation()}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem',
                            marginBottom: '1.5rem'
                        }}>
                            <div style={{
                                width: '50px',
                                height: '50px',
                                background: 'rgba(239, 68, 68, 0.1)',
                                borderRadius: '12px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="3,6 5,6 21,6"/>
                                    <path d="M19,6v14a2,2 0 0,1-2,2H7a2,2 0 0,1-2-2V6m3,0V4a2,2 0 0,1,2-2h4a2,2 0 0,1,2,2v2"/>
                                    <line x1="10" y1="11" x2="10" y2="17"/>
                                    <line x1="14" y1="11" x2="14" y2="17"/>
                                </svg>
                            </div>
                            <div>
                                <h3 style={{
                                    fontSize: '1.3rem',
                                    fontWeight: '700',
                                    color: '#374151',
                                    margin: 0
                                }}>
                                    {t('medicalHistory.deleteRecord')}
                                </h3>
                            </div>
                        </div>

                        <p style={{
                            color: '#6b7280',
                            marginBottom: '1.5rem',
                            lineHeight: '1.6'
                        }}>
                            {t('medicalHistory.confirmDelete')}
                        </p>

                        {deleteConfirmation.record && (
                            <div style={{
                                background: '#f9fafb',
                                borderRadius: '12px',
                                padding: '1rem',
                                marginBottom: '1.5rem',
                                border: '1px solid #e5e7eb'
                            }}>
                                <div style={{ fontWeight: '600', color: '#374151', marginBottom: '0.25rem' }}>
                                    {deleteConfirmation.record.title}
                                </div>
                                <div style={{ fontSize: '0.85rem', color: '#6b7280' }}>
                                    {formatDate(deleteConfirmation.record.date)}
                                </div>
                            </div>
                        )}

                        <div style={{
                            display: 'flex',
                            gap: '1rem',
                            justifyContent: 'flex-end'
                        }}>
                            <button
                                onClick={() => setDeleteConfirmation({ isOpen: false, record: null })}
                                style={{
                                    padding: '0.75rem 1.5rem',
                                    background: 'rgba(107, 114, 128, 0.1)',
                                    color: '#374151',
                                    border: '1px solid rgba(107, 114, 128, 0.2)',
                                    borderRadius: '10px',
                                    cursor: 'pointer',
                                    fontWeight: '600',
                                    transition: 'all 0.2s ease'
                                }}
                            >
                                {t('common.cancel')}
                            </button>
                            <button
                                onClick={() => {
                                    if (onDeleteRecord && deleteConfirmation.record) {
                                        onDeleteRecord(deleteConfirmation.record.id);
                                        setDeleteConfirmation({ isOpen: false, record: null });
                                    }
                                }}
                                style={{
                                    padding: '0.75rem 1.5rem',
                                    background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '10px',
                                    cursor: 'pointer',
                                    fontWeight: '600',
                                    transition: 'all 0.2s ease',
                                    boxShadow: '0 4px 12px rgba(220, 38, 38, 0.3)'
                                }}
                            >
                                {t('common.delete')}
                            </button>
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </div>
    );
};

export default PatientDetails;
