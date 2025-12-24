import React from 'react';
import { useTranslation } from 'react-i18next';
import { getRecordTypeColor } from '../utils/medicalHistoryUtils';

const MedicalRecordCard = ({ record, getStatusColor, getTypeIcon, formatDate, onRecordClick }) => {
    const { t } = useTranslation();
    const statusColors = getStatusColor(record.status);
    const typeColors = getRecordTypeColor(record.type);

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
            case 'prescription':
            case 'prescriptions':
                return t('medicalHistory.recordType.prescription');
            default:
                return t(`medicalHistory.category.${type}`);
        }
    };

    const getStatusTranslation = (status) => {
        const statusLower = status?.toLowerCase();
        switch (statusLower) {
            case 'completed':
                return t('appointments.completed');
            case 'cancelled':
                return t('appointments.cancelled');
            case 'active':
                return t('patients.active');
            case 'pending':
                return t('appointments.pending');
            case 'confirmed':
                return t('appointments.confirmed');
            default:
                return status;
        }
    };

    return (
        <div
            style={{
                background: 'rgba(255, 255, 255, 0.98)',
                borderRadius: '16px',
                padding: '1.25rem 1.5rem',
                boxShadow: '0 4px 12px rgba(34, 197, 94, 0.08), 0 2px 6px rgba(0, 0, 0, 0.04)',
                border: '1px solid rgba(34, 197, 94, 0.12)',
                transition: 'all 0.2s ease',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden'
            }}
            onMouseEnter={e => {
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(34, 197, 94, 0.12), 0 4px 12px rgba(0, 0, 0, 0.06)';
                e.currentTarget.style.borderColor = 'rgba(34, 197, 94, 0.25)';
            }}
            onMouseLeave={e => {
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(34, 197, 94, 0.08), 0 2px 6px rgba(0, 0, 0, 0.04)';
                e.currentTarget.style.borderColor = 'rgba(34, 197, 94, 0.12)';
            }}
            onClick={() => onRecordClick(record)}
        >
            
            <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '1rem'
            }}>
                <div style={{
                    width: '44px',
                    height: '44px',
                    background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.25rem',
                    flexShrink: 0,
                    boxShadow: '0 4px 10px rgba(34, 197, 94, 0.3)'
                }}>
                    {getTypeIcon(record.type, record.doctorGender)}
                </div>
                
                <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        gap: '1rem',
                        marginBottom: '0.5rem'
                    }}>
                        <div style={{ flex: 1, minWidth: 0 }}>
                            <h4 style={{
                                fontSize: '1rem',
                                fontWeight: '600',
                                color: '#374151',
                                margin: '0 0 0.25rem',
                                lineHeight: '1.3'
                            }}>
                                {record.title}
                            </h4>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem',
                                flexWrap: 'wrap'
                            }}>
                                <span style={{
                                    fontSize: '0.8rem',
                                    color: '#6b7280',
                                    fontWeight: '500'
                                }}>
                                    {record.doctor}
                                </span>
                                <span style={{ color: '#d1d5db' }}>•</span>
                                <span style={{
                                    fontSize: '0.8rem',
                                    color: '#22c55e',
                                    fontWeight: '600'
                                }}>
                                    {formatDate(record.date)}
                                </span>
                                <span style={{ color: '#d1d5db' }}>•</span>
                                <span style={{
                                    fontSize: '0.75rem',
                                    color: '#6b7280',
                                    fontWeight: '500',
                                    background: 'rgba(34, 197, 94, 0.08)',
                                    padding: '0.2rem 0.5rem',
                                    borderRadius: '6px'
                                }}>
                                    {getRecordTypeDisplayName(record.type, record.originalType)}
                                </span>
                            </div>
                        </div>
                        
                        <div style={{
                            background: statusColors.bg,
                            color: statusColors.color,
                            padding: '0.3rem 0.6rem',
                            borderRadius: '8px',
                            fontSize: '0.7rem',
                            fontWeight: '600',
                            border: `1px solid ${statusColors.border}`,
                            textTransform: 'capitalize',
                            flexShrink: 0
                        }}>
                            {getStatusTranslation(record.status)}
                        </div>
                    </div>

                    <p style={{
                        fontSize: '0.85rem',
                        color: '#6b7280',
                        margin: '0.5rem 0 0',
                        lineHeight: '1.5',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                    }}>
                        {record.summary}
                    </p>

                    <div style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        marginTop: '0.75rem'
                    }}>
                        <span style={{
                            color: '#22c55e',
                            fontSize: '0.8rem',
                            fontWeight: '600',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.25rem'
                        }}>
                            {t('appointments.viewDetails')} →
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MedicalRecordCard;
