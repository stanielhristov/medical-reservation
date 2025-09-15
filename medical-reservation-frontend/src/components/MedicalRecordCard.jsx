import React from 'react';
import { getRecordTypeColor } from '../utils/medicalHistoryUtils';

const MedicalRecordCard = ({ record, getStatusColor, getTypeIcon, formatDate, onRecordClick }) => {
    const statusColors = getStatusColor(record.status);
    const typeColors = getRecordTypeColor(record.type);

    return (
        <div
            style={{
                background: 'rgba(255, 255, 255, 0.98)',
                backdropFilter: 'blur(20px)',
                borderRadius: '20px',
                padding: '1.5rem',
                boxShadow: '0 12px 30px rgba(16, 185, 129, 0.1), 0 6px 20px rgba(0, 0, 0, 0.05)',
                border: '1px solid rgba(16, 185, 129, 0.15)',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden'
            }}
            onMouseEnter={e => {
                e.target.style.transform = 'translateY(-4px)';
                e.target.style.boxShadow = '0 20px 40px rgba(16, 185, 129, 0.15), 0 10px 30px rgba(0, 0, 0, 0.08)';
            }}
            onMouseLeave={e => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 12px 30px rgba(16, 185, 129, 0.1), 0 6px 20px rgba(0, 0, 0, 0.05)';
            }}
            onClick={() => onRecordClick(record)}
        >
            <div style={{
                position: 'absolute',
                top: '-20px',
                right: '-20px',
                width: '80px',
                height: '80px',
                background: typeColors.secondary,
                borderRadius: '50%',
                zIndex: 0
            }} />
            
            <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '1rem'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{
                            width: '50px',
                            height: '50px',
                            background: `linear-gradient(135deg, ${typeColors.primary} 0%, ${typeColors.primary}CC 100%)`,
                            borderRadius: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '1.5rem',
                            boxShadow: `0 6px 15px ${typeColors.primary}40`
                        }}>
                            {getTypeIcon(record.type)}
                        </div>
                        
                        <div>
                            <h4 style={{
                                fontSize: '1.1rem',
                                fontWeight: '700',
                                color: '#374151',
                                margin: '0 0 0.25rem',
                                lineHeight: '1.3'
                            }}>
                                {record.title}
                            </h4>
                            <p style={{
                                fontSize: '0.85rem',
                                color: '#6b7280',
                                margin: 0,
                                fontWeight: '500'
                            }}>
                                {record.doctor}
                            </p>
                        </div>
                    </div>
                    
                    <div style={{
                        background: statusColors.bg,
                        color: statusColors.color,
                        padding: '0.4rem 0.8rem',
                        borderRadius: '12px',
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        border: `1px solid ${statusColors.border}`,
                        textTransform: 'capitalize'
                    }}>
                        {record.status}
                    </div>
                </div>

                <div style={{
                    background: 'rgba(243, 244, 246, 0.7)',
                    borderRadius: '12px',
                    padding: '1rem',
                    marginBottom: '1rem',
                    border: '1px solid rgba(209, 213, 219, 0.5)'
                }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '0.75rem'
                    }}>
                        <span style={{
                            fontSize: '0.8rem',
                            color: '#9ca3af',
                            fontWeight: '600',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em'
                        }}>
                            Date
                        </span>
                        <span style={{
                            fontSize: '0.9rem',
                            color: '#374151',
                            fontWeight: '600'
                        }}>
                            {formatDate(record.date)}
                        </span>
                    </div>
                    
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <span style={{
                            fontSize: '0.8rem',
                            color: '#9ca3af',
                            fontWeight: '600',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em'
                        }}>
                            Category
                        </span>
                        <span style={{
                            fontSize: '0.9rem',
                            color: typeColors.primary,
                            fontWeight: '600'
                        }}>
                            {record.category}
                        </span>
                    </div>
                </div>

                <p style={{
                    fontSize: '0.9rem',
                    color: '#4b5563',
                    margin: '0 0 1rem',
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
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        fontSize: '0.8rem',
                        color: '#6b7280'
                    }}>
                        <span>📎</span>
                        <span>{record.attachments?.length || 0} attachments</span>
                    </div>
                    
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        color: typeColors.primary,
                        fontSize: '0.85rem',
                        fontWeight: '600'
                    }}>
                        <span>View Details</span>
                        <span style={{ fontSize: '0.7rem' }}>→</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MedicalRecordCard;
