import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import { useMedicalHistory } from '../../hooks/useMedicalHistory';
import LoadingSpinner from '../../components/LoadingSpinner';
import MedicalHistoryHeader from '../../components/MedicalHistoryHeader';
import MedicalRecordFilters from '../../components/MedicalRecordFilters';
import MedicalRecordCard from '../../components/MedicalRecordCard';

const PatientMedicalHistory = () => {
    const { t } = useTranslation();
    const { user } = useAuth();
    const {
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
        formatDate
    } = useMedicalHistory();

    if (loading) {
        return <LoadingSpinner message={t('loading.loadingMedicalHistory')} />;
    }

    return (
        <div style={{ position: 'relative' }}>
            <div style={{
                position: 'absolute',
                top: '5%',
                right: '8%',
                width: '300px',
                height: '300px',
                background: 'radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, rgba(16, 185, 129, 0.05) 50%, transparent 100%)',
                borderRadius: '50%',
                zIndex: 0
            }} />
            
            <div style={{
                position: 'absolute',
                bottom: '10%',
                left: '5%',
                width: '250px',
                height: '250px',
                background: 'radial-gradient(circle, rgba(5, 150, 105, 0.08) 0%, rgba(5, 150, 105, 0.03) 50%, transparent 100%)',
                borderRadius: '50%',
                zIndex: 0
            }} />

            <main style={{
                padding: '2.5rem 0',
                position: 'relative',
                zIndex: 1
            }}>
                <MedicalHistoryHeader onUploadClick={() => setShowUploadModal(true)} />

                <MedicalRecordFilters
                    selectedCategory={selectedCategory}
                    onCategoryChange={setSelectedCategory}
                    medicalRecords={medicalRecords}
                />

                <section style={{
                    background: 'rgba(255, 255, 255, 0.98)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '24px',
                    padding: '2.5rem',
                    boxShadow: '0 20px 40px rgba(16, 185, 129, 0.12), 0 16px 32px rgba(0, 0, 0, 0.06)',
                    border: '1px solid rgba(16, 185, 129, 0.15)'
                }}>
                    {filteredRecords.length === 0 ? (
                        <div style={{
                            textAlign: 'center',
                            padding: '4rem 2rem',
                            color: '#6b7280'
                        }}>
                            <div style={{
                                fontSize: '4rem',
                                marginBottom: '1rem',
                                opacity: 0.5
                            }}>
                                📋
                            </div>
                            <h3 style={{
                                fontSize: '1.5rem',
                                fontWeight: '600',
                                margin: '0 0 0.5rem',
                                color: '#374151'
                            }}>
                                {t('medicalHistory.noRecordsFound')}
                            </h3>
                            <p style={{
                                fontSize: '1rem',
                                margin: 0,
                                maxWidth: '400px',
                                marginLeft: 'auto',
                                marginRight: 'auto',
                                lineHeight: '1.5'
                            }}>
                                {selectedCategory === 'all' 
                                    ? t('medicalHistory.noRecordsYet')
                                    : t('medicalHistory.noRecordsInCategory')}
                            </p>
                        </div>
                    ) : (
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
                            gap: '1.5rem'
                        }}>
                            {filteredRecords.map(record => (
                                <MedicalRecordCard
                                    key={record.id}
                                    record={record}
                                    getStatusColor={getStatusColor}
                                    getTypeIcon={getTypeIcon}
                                    formatDate={formatDate}
                                    onRecordClick={setSelectedRecord}
                                />
                            ))}
                        </div>
                    )}
                </section>

                {selectedRecord && (
                    <div style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'rgba(0, 0, 0, 0.6)',
                        backdropFilter: 'blur(5px)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 1000,
                        padding: '2rem'
                    }} onClick={() => setSelectedRecord(null)}>
                        <div style={{
                            background: 'white',
                            borderRadius: '24px',
                            padding: '2.5rem',
                            maxWidth: '800px',
                            width: '100%',
                            maxHeight: '90vh',
                            overflow: 'auto',
                            boxShadow: '0 25px 50px rgba(0,0,0,0.25)',
                            position: 'relative',
                            animation: 'fadeInUp 0.3s ease-out',
                            border: '1px solid rgba(16, 185, 129, 0.2)'
                        }} onClick={e => e.stopPropagation()}>
                            <button
                                onClick={() => setSelectedRecord(null)}
                                style={{
                                    position: 'absolute',
                                    top: '1.5rem',
                                    right: '1.5rem',
                                    background: 'none',
                                    border: 'none',
                                    fontSize: '1.5rem',
                                    cursor: 'pointer',
                                    color: '#9ca3af',
                                    padding: '0.5rem',
                                    borderRadius: '8px',
                                    transition: 'all 0.3s ease'
                                }}
                                onMouseEnter={e => {
                                    e.target.style.background = 'rgba(239, 68, 68, 0.1)';
                                    e.target.style.color = '#ef4444';
                                }}
                                onMouseLeave={e => {
                                    e.target.style.background = 'none';
                                    e.target.style.color = '#9ca3af';
                                }}
                            >
                                ✕
                            </button>

                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1.5rem',
                                marginBottom: '2rem',
                                paddingRight: '3rem'
                            }}>
                                <div style={{
                                    width: '80px',
                                    height: '80px',
                                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                                    borderRadius: '20px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '2.5rem',
                                    boxShadow: '0 12px 25px rgba(16, 185, 129, 0.3)'
                                }}>
                                    {getTypeIcon(selectedRecord.type)}
                                </div>
                                <div>
                                    <h2 style={{
                                        fontSize: '2rem',
                                        fontWeight: '700',
                                        color: '#374151',
                                        margin: '0 0 0.5rem'
                                    }}>
                                        {selectedRecord.title}
                                    </h2>
                                    <p style={{
                                        fontSize: '1.1rem',
                                        color: '#6b7280',
                                        margin: 0,
                                        fontWeight: '500'
                                    }}>
                                        {selectedRecord.doctor} • {formatDate(selectedRecord.date)}
                                    </p>
                                </div>
                            </div>

                            <div style={{
                                background: 'rgba(220, 252, 231, 0.7)',
                                borderRadius: '16px',
                                padding: '1.5rem',
                                marginBottom: '1.5rem',
                                border: '1px solid rgba(16, 185, 129, 0.3)'
                            }}>
                                <h4 style={{
                                    fontSize: '1.1rem',
                                    fontWeight: '600',
                                    color: '#374151',
                                    margin: '0 0 1rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem'
                                }}>
                                    📝 Summary
                                </h4>
                                <p style={{
                                    color: '#374151',
                                    margin: 0,
                                    lineHeight: '1.5'
                                }}>
                                    {selectedRecord.summary}
                                </p>
                            </div>

                            <div style={{
                                background: 'rgba(243, 244, 246, 0.7)',
                                borderRadius: '16px',
                                padding: '1.5rem',
                                marginBottom: '1.5rem',
                                border: '1px solid rgba(209, 213, 219, 0.5)'
                            }}>
                                <h4 style={{
                                    fontSize: '1.1rem',
                                    fontWeight: '600',
                                    color: '#374151',
                                    margin: '0 0 1rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem'
                                }}>
                                    🔍 Detailed Information
                                </h4>
                                <p style={{
                                    color: '#374151',
                                    margin: 0,
                                    lineHeight: '1.6'
                                }}>
                                    {selectedRecord.details}
                                </p>
                            </div>

                            {selectedRecord.attachments && selectedRecord.attachments.length > 0 && (
                                <div style={{
                                    background: 'rgba(254, 249, 195, 0.7)',
                                    borderRadius: '16px',
                                    padding: '1.5rem',
                                    marginBottom: '1.5rem',
                                    border: '1px solid rgba(251, 191, 36, 0.3)'
                                }}>
                                    <h4 style={{
                                        fontSize: '1.1rem',
                                        fontWeight: '600',
                                        color: '#374151',
                                        margin: '0 0 1rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem'
                                    }}>
                                        📎 Attachments ({selectedRecord.attachments.length})
                                    </h4>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                                        {selectedRecord.attachments.map((attachment, index) => (
                                            <span
                                                key={index}
                                                style={{
                                                    background: 'rgba(251, 191, 36, 0.2)',
                                                    color: '#92400e',
                                                    padding: '0.5rem 1rem',
                                                    borderRadius: '12px',
                                                    fontSize: '0.9rem',
                                                    fontWeight: '600',
                                                    border: '1px solid rgba(251, 191, 36, 0.3)',
                                                    cursor: 'pointer',
                                                    transition: 'all 0.3s ease'
                                                }}
                                                onMouseEnter={e => {
                                                    e.target.style.background = 'rgba(251, 191, 36, 0.3)';
                                                }}
                                                onMouseLeave={e => {
                                                    e.target.style.background = 'rgba(251, 191, 36, 0.2)';
                                                }}
                                            >
                                                📄 {attachment}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div style={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                gap: '1rem',
                                paddingTop: '1rem',
                                borderTop: '1px solid rgba(229, 231, 235, 0.8)'
                            }}>
                                <button
                                    onClick={() => setSelectedRecord(null)}
                                    style={{
                                        padding: '0.8rem 1.5rem',
                                        background: 'rgba(107, 114, 128, 0.1)',
                                        color: '#374151',
                                        border: '2px solid rgba(107, 114, 128, 0.2)',
                                        borderRadius: '12px',
                                        cursor: 'pointer',
                                        fontSize: '1rem',
                                        fontWeight: '600',
                                        transition: 'all 0.3s ease'
                                    }}
                                    onMouseEnter={e => {
                                        e.target.style.background = 'rgba(107, 114, 128, 0.2)';
                                        e.target.style.transform = 'translateY(-2px)';
                                    }}
                                    onMouseLeave={e => {
                                        e.target.style.background = 'rgba(107, 114, 128, 0.1)';
                                        e.target.style.transform = 'translateY(0)';
                                    }}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {showUploadModal && (
                    <div style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'rgba(0, 0, 0, 0.6)',
                        backdropFilter: 'blur(5px)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 1001,
                        padding: '2rem'
                    }} onClick={() => setShowUploadModal(false)}>
                        <div style={{
                            background: 'white',
                            borderRadius: '20px',
                            padding: '2.5rem',
                            maxWidth: '600px',
                            width: '100%',
                            boxShadow: '0 25px 50px rgba(0,0,0,0.25)',
                            position: 'relative',
                            animation: 'fadeInUp 0.3s ease-out',
                            border: '1px solid rgba(16, 185, 129, 0.2)'
                        }} onClick={e => e.stopPropagation()}>
                            <button
                                onClick={() => setShowUploadModal(false)}
                                style={{
                                    position: 'absolute',
                                    top: '1rem',
                                    right: '1rem',
                                    background: 'none',
                                    border: 'none',
                                    fontSize: '1.5rem',
                                    cursor: 'pointer',
                                    color: '#9ca3af',
                                    padding: '0.5rem',
                                    borderRadius: '8px'
                                }}
                            >
                                ✕
                            </button>

                            <h3 style={{
                                fontSize: '1.8rem',
                                fontWeight: '700',
                                color: '#374151',
                                margin: '0 0 1.5rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem'
                            }}>
                                📤 Upload Medical Record
                            </h3>

                            <p style={{
                                color: '#6b7280',
                                margin: '0 0 1.5rem',
                                lineHeight: '1.5'
                            }}>
                                Upload medical documents, test results, prescriptions, or other health-related files to your medical history.
                            </p>

                            <div style={{
                                border: '2px dashed rgba(16, 185, 129, 0.3)',
                                borderRadius: '12px',
                                padding: '3rem 2rem',
                                textAlign: 'center',
                                marginBottom: '1.5rem',
                                background: 'rgba(16, 185, 129, 0.05)'
                            }}>
                                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📁</div>
                                <p style={{ color: '#374151', margin: '0 0 0.5rem', fontWeight: '600' }}>
                                    Drag & drop files here or click to browse
                                </p>
                                <p style={{ color: '#6b7280', margin: 0, fontSize: '0.9rem' }}>
                                    Supported formats: PDF, JPG, PNG, DOC (Max 10MB per file)
                                </p>
                            </div>

                            <div style={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                gap: '1rem'
                            }}>
                                <button
                                    onClick={() => setShowUploadModal(false)}
                                    style={{
                                        padding: '0.8rem 1.5rem',
                                        background: 'rgba(107, 114, 128, 0.1)',
                                        color: '#374151',
                                        border: '2px solid rgba(107, 114, 128, 0.2)',
                                        borderRadius: '12px',
                                        cursor: 'pointer',
                                        fontSize: '1rem',
                                        fontWeight: '600',
                                        transition: 'all 0.3s ease'
                                    }}
                                >
                                    Cancel
                                </button>
                                <button
                                    style={{
                                        padding: '0.8rem 1.5rem',
                                        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '12px',
                                        cursor: 'pointer',
                                        fontSize: '1rem',
                                        fontWeight: '600',
                                        transition: 'all 0.3s ease',
                                        boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)'
                                    }}
                                >
                                    Upload Files
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default PatientMedicalHistory;
