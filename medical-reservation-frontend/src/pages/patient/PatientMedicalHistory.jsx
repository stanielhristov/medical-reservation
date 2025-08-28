import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

const PatientMedicalHistory = () => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [medicalRecords, setMedicalRecords] = useState([]);
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null);

    const categories = [
        { id: 'all', name: 'All Records', icon: '📋' },
        { id: 'visits', name: 'Doctor Visits', icon: '🩺' },
        { id: 'tests', name: 'Lab Tests', icon: '🧪' },
        { id: 'prescriptions', name: 'Prescriptions', icon: '💊' },
        { id: 'procedures', name: 'Procedures', icon: '🏥' },
        { id: 'vaccines', name: 'Vaccinations', icon: '💉' },
        { id: 'documents', name: 'Documents', icon: '📄' }
    ];

    useEffect(() => {
        fetchMedicalHistory();
    }, []);

    const fetchMedicalHistory = async () => {
        try {
            // Mock data - replace with actual API call
            setMedicalRecords([
                {
                    id: 1,
                    type: 'visits',
                    title: 'Annual Physical Examination',
                    doctor: 'Dr. Sarah Johnson',
                    date: new Date(2024, 0, 15),
                    summary: 'Routine annual checkup. Patient in good health overall. Blood pressure slightly elevated.',
                    details: 'Comprehensive physical examination including cardiovascular, respiratory, and neurological assessments. Blood pressure: 135/85. Weight: 165 lbs. Height: 5\'8". All other vital signs within normal range.',
                    attachments: ['Blood_work_results.pdf', 'EKG_reading.pdf'],
                    category: 'General Medicine',
                    status: 'completed'
                },
                {
                    id: 2,
                    type: 'tests',
                    title: 'Complete Blood Count (CBC)',
                    doctor: 'Dr. Michael Chen',
                    date: new Date(2024, 0, 20),
                    summary: 'Blood work ordered during annual physical. All values within normal range.',
                    details: 'White Blood Cells: 7,200/μL (Normal), Red Blood Cells: 4.8 million/μL (Normal), Hemoglobin: 14.2 g/dL (Normal), Platelet Count: 280,000/μL (Normal)',
                    attachments: ['CBC_detailed_report.pdf'],
                    category: 'Laboratory',
                    status: 'completed'
                },
                {
                    id: 3,
                    type: 'prescriptions',
                    title: 'Lisinopril 10mg - Blood Pressure Management',
                    doctor: 'Dr. Sarah Johnson',
                    date: new Date(2024, 1, 1),
                    summary: 'Prescribed for mild hypertension following annual physical examination.',
                    details: 'Medication: Lisinopril 10mg, Once daily in the morning. Duration: 90 days with 2 refills. Instructions: Take with or without food. Monitor blood pressure weekly.',
                    attachments: ['Prescription_copy.pdf'],
                    category: 'Cardiology',
                    status: 'active'
                },
                {
                    id: 4,
                    type: 'procedures',
                    title: 'Dermatology Consultation - Skin Check',
                    doctor: 'Dr. Emily Rodriguez',
                    date: new Date(2023, 11, 10),
                    summary: 'Routine skin cancer screening. Two small moles removed for biopsy.',
                    details: 'Full body skin examination performed. Two suspicious moles identified on back and removed via excision. Samples sent for histopathological analysis. Results: Benign nevus.',
                    attachments: ['Biopsy_results.pdf', 'Post_procedure_care.pdf'],
                    category: 'Dermatology',
                    status: 'completed'
                },
                {
                    id: 5,
                    type: 'vaccines',
                    title: 'Annual Flu Vaccination',
                    doctor: 'Dr. Lisa Martinez',
                    date: new Date(2023, 9, 15),
                    summary: 'Seasonal influenza vaccine administered. No adverse reactions observed.',
                    details: 'Vaccine: Quadrivalent Influenza Vaccine (2023-2024 season). Lot number: FLU2023-456. Administration site: Left deltoid muscle. Patient monitored for 15 minutes post-vaccination.',
                    attachments: ['Vaccination_record.pdf'],
                    category: 'Preventive Care',
                    status: 'completed'
                },
                {
                    id: 6,
                    type: 'documents',
                    title: 'Insurance Card & Medical ID',
                    doctor: 'Patient Upload',
                    date: new Date(2024, 1, 5),
                    summary: 'Personal medical documents and insurance information.',
                    details: 'Health insurance card, medical ID bracelet information, and emergency contact details.',
                    attachments: ['Insurance_card_front.jpg', 'Insurance_card_back.jpg', 'Medical_ID_info.pdf'],
                    category: 'Personal Documents',
                    status: 'active'
                }
            ]);
        } catch (error) {
            console.error('Error fetching medical history:', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredRecords = medicalRecords.filter(record => 
        selectedCategory === 'all' || record.type === selectedCategory
    );

    const getStatusColor = (status) => {
        switch (status) {
            case 'active':
                return { bg: 'rgba(34, 197, 94, 0.1)', color: '#16a34a', border: 'rgba(34, 197, 94, 0.2)' };
            case 'completed':
                return { bg: 'rgba(59, 130, 246, 0.1)', color: '#2563eb', border: 'rgba(59, 130, 246, 0.2)' };
            default:
                return { bg: 'rgba(107, 114, 128, 0.1)', color: '#374151', border: 'rgba(107, 114, 128, 0.2)' };
        }
    };

    const getTypeIcon = (type) => {
        switch (type) {
            case 'visits': return '🩺';
            case 'tests': return '🧪';
            case 'prescriptions': return '💊';
            case 'procedures': return '🏥';
            case 'vaccines': return '💉';
            case 'documents': return '📄';
            default: return '📋';
        }
    };

    if (loading) {
        return (
            <div style={{
                minHeight: '100vh',
                width: '100vw',
                background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 50%, #bbf7d0 100%)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                boxSizing: 'border-box'
            }}>
                <div style={{
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '24px',
                    padding: '3rem',
                    textAlign: 'center',
                    boxShadow: '0 20px 40px rgba(34, 197, 94, 0.1), 0 8px 32px rgba(0, 0, 0, 0.05)',
                    border: '1px solid rgba(34, 197, 94, 0.1)'
                }}>
                    <div style={{
                        width: '60px',
                        height: '60px',
                        border: '4px solid rgba(34, 197, 94, 0.2)',
                        borderTop: '4px solid #22c55e',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite',
                        margin: '0 auto 1.5rem'
                    }} />
                    <p style={{ color: '#6b7280', margin: 0, fontSize: '1rem', fontWeight: '500' }}>Loading medical history...</p>
                </div>
            </div>
        );
    }

    return (
        <div style={{
            minHeight: '100vh',
            width: '100vw',
            background: 'linear-gradient(135deg, #fdf4ff 0%, #f3e8ff 30%, #e9d5ff 70%, #ddd6fe 100%)',
            position: 'relative',
            overflow: 'hidden',
            boxSizing: 'border-box'
        }}>
            {/* Background decorations */}
            <div style={{
                position: 'absolute',
                top: '5%',
                right: '8%',
                width: '300px',
                height: '300px',
                background: 'radial-gradient(circle, rgba(147, 51, 234, 0.1) 0%, rgba(147, 51, 234, 0.05) 50%, transparent 100%)',
                borderRadius: '50%',
                zIndex: 0
            }} />
            
            <div style={{
                position: 'absolute',
                bottom: '10%',
                left: '5%',
                width: '250px',
                height: '250px',
                background: 'radial-gradient(circle, rgba(124, 58, 237, 0.08) 0%, rgba(124, 58, 237, 0.03) 50%, transparent 100%)',
                borderRadius: '50%',
                zIndex: 0
            }} />

            {/* Main Content */}
            <main style={{
                maxWidth: '1400px',
                margin: '0 auto',
                padding: '2.5rem 2rem',
                position: 'relative',
                zIndex: 1,
                width: '100%',
                boxSizing: 'border-box'
            }}>
                {/* Header Section */}
                <section style={{
                    background: 'rgba(255, 255, 255, 0.98)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '32px',
                    padding: '3rem',
                    marginBottom: '3rem',
                    boxShadow: '0 32px 64px rgba(147, 51, 234, 0.12), 0 16px 32px rgba(0, 0, 0, 0.06)',
                    border: '1px solid rgba(147, 51, 234, 0.15)',
                    textAlign: 'center'
                }}>
                    <div style={{
                        width: '100px',
                        height: '100px',
                        background: 'linear-gradient(135deg, #9333ea 0%, #7c3aed 100%)',
                        borderRadius: '20px',
                        margin: '0 auto 2rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 16px 40px rgba(147, 51, 234, 0.3)'
                    }}>
                        <span style={{ fontSize: '3rem', color: 'white' }}>📊</span>
                    </div>
                    
                    <h1 style={{
                        fontSize: '2.5rem',
                        fontWeight: '800',
                        color: '#374151',
                        margin: '0 0 1rem',
                        letterSpacing: '-0.025em'
                    }}>
                        Medical History & Records
                    </h1>
                    
                    <p style={{
                        fontSize: '1.2rem',
                        color: '#6b7280',
                        margin: 0,
                        maxWidth: '600px',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        lineHeight: '1.6'
                    }}>
                        Complete overview of your medical records, test results, prescriptions, and health timeline
                    </p>
                </section>

                {/* Statistics Cards */}
                <section style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '1.5rem',
                    marginBottom: '3rem'
                }}>
                    {categories.slice(1).map(category => {
                        const count = medicalRecords.filter(record => record.type === category.id).length;
                        return (
                            <div key={category.id} style={{
                                background: 'rgba(255, 255, 255, 0.98)',
                                backdropFilter: 'blur(20px)',
                                borderRadius: '20px',
                                padding: '1.5rem',
                                boxShadow: '0 8px 24px rgba(147, 51, 234, 0.1)',
                                border: '1px solid rgba(147, 51, 234, 0.15)',
                                textAlign: 'center',
                                transition: 'all 0.3s ease',
                                cursor: 'pointer'
                            }}
                            onClick={() => setSelectedCategory(category.id)}
                            onMouseEnter={e => {
                                e.currentTarget.style.transform = 'translateY(-4px)';
                                e.currentTarget.style.boxShadow = '0 12px 32px rgba(147, 51, 234, 0.15)';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 8px 24px rgba(147, 51, 234, 0.1)';
                            }}>
                                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{category.icon}</div>
                                <div style={{ color: '#374151', fontWeight: '700', fontSize: '1.5rem' }}>{count}</div>
                                <div style={{ color: '#6b7280', fontSize: '0.9rem' }}>{category.name}</div>
                            </div>
                        );
                    })}
                </section>

                {/* Category Filter */}
                <section style={{
                    background: 'rgba(255, 255, 255, 0.98)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '24px',
                    padding: '2rem',
                    marginBottom: '3rem',
                    boxShadow: '0 12px 32px rgba(147, 51, 234, 0.1)',
                    border: '1px solid rgba(147, 51, 234, 0.15)'
                }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '1.5rem',
                        flexWrap: 'wrap',
                        gap: '1rem'
                    }}>
                        <h2 style={{
                            fontSize: '1.5rem',
                            fontWeight: '700',
                            color: '#374151',
                            margin: 0
                        }}>
                            Filter Records
                        </h2>
                        <button
                            onClick={() => setShowUploadModal(true)}
                            style={{
                                padding: '0.75rem 1.5rem',
                                background: 'linear-gradient(135deg, #9333ea 0%, #7c3aed 100%)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '12px',
                                fontSize: '0.9rem',
                                fontWeight: '600',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                boxShadow: '0 4px 12px rgba(147, 51, 234, 0.3)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}
                        >
                            <span>📤</span>
                            Upload Document
                        </button>
                    </div>
                    
                    <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '0.75rem'
                    }}>
                        {categories.map(category => (
                            <button
                                key={category.id}
                                onClick={() => setSelectedCategory(category.id)}
                                style={{
                                    padding: '0.75rem 1.25rem',
                                    background: selectedCategory === category.id 
                                        ? 'linear-gradient(135deg, #9333ea 0%, #7c3aed 100%)' 
                                        : 'rgba(147, 51, 234, 0.1)',
                                    color: selectedCategory === category.id ? 'white' : '#7c3aed',
                                    border: selectedCategory === category.id 
                                        ? 'none' 
                                        : '1px solid rgba(147, 51, 234, 0.2)',
                                    borderRadius: '20px',
                                    fontSize: '0.9rem',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem'
                                }}
                            >
                                <span>{category.icon}</span>
                                {category.name}
                            </button>
                        ))}
                    </div>
                </section>

                {/* Medical Records Timeline */}
                <section>
                    <div style={{
                        display: 'grid',
                        gap: '1.5rem'
                    }}>
                        {filteredRecords.length > 0 ? (
                            filteredRecords.map((record, index) => {
                                const statusColors = getStatusColor(record.status);
                                return (
                                    <div
                                        key={record.id}
                                        style={{
                                            background: 'rgba(255, 255, 255, 0.98)',
                                            backdropFilter: 'blur(20px)',
                                            borderRadius: '24px',
                                            padding: '2rem',
                                            boxShadow: '0 12px 32px rgba(147, 51, 234, 0.1)',
                                            border: '1px solid rgba(147, 51, 234, 0.15)',
                                            transition: 'all 0.4s ease',
                                            cursor: 'pointer',
                                            position: 'relative',
                                            overflow: 'hidden'
                                        }}
                                        onClick={() => setSelectedRecord(record)}
                                        onMouseEnter={e => {
                                            e.currentTarget.style.transform = 'translateY(-4px)';
                                            e.currentTarget.style.boxShadow = '0 20px 48px rgba(147, 51, 234, 0.2)';
                                        }}
                                        onMouseLeave={e => {
                                            e.currentTarget.style.transform = 'translateY(0)';
                                            e.currentTarget.style.boxShadow = '0 12px 32px rgba(147, 51, 234, 0.1)';
                                        }}
                                    >
                                        <div style={{
                                            position: 'absolute',
                                            top: '10px',
                                            right: '10px',
                                            width: '80px',
                                            height: '80px',
                                            background: 'radial-gradient(circle, rgba(147, 51, 234, 0.1) 0%, transparent 70%)',
                                            borderRadius: '50%'
                                        }} />
                                        
                                        {/* Record Header */}
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'flex-start',
                                            gap: '1rem',
                                            marginBottom: '1.5rem'
                                        }}>
                                            <div style={{
                                                width: '60px',
                                                height: '60px',
                                                background: 'linear-gradient(135deg, #9333ea 0%, #7c3aed 100%)',
                                                borderRadius: '16px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontSize: '1.8rem',
                                                boxShadow: '0 8px 24px rgba(147, 51, 234, 0.3)',
                                                flexShrink: 0
                                            }}>
                                                {getTypeIcon(record.type)}
                                            </div>
                                            
                                            <div style={{ flex: 1 }}>
                                                <div style={{
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'flex-start',
                                                    marginBottom: '0.5rem',
                                                    flexWrap: 'wrap',
                                                    gap: '0.5rem'
                                                }}>
                                                    <h3 style={{
                                                        fontSize: '1.3rem',
                                                        fontWeight: '700',
                                                        color: '#374151',
                                                        margin: 0
                                                    }}>
                                                        {record.title}
                                                    </h3>
                                                    <span style={{
                                                        padding: '0.5rem 1rem',
                                                        fontSize: '0.8rem',
                                                        fontWeight: '600',
                                                        borderRadius: '20px',
                                                        background: statusColors.bg,
                                                        color: statusColors.color,
                                                        border: `1px solid ${statusColors.border}`
                                                    }}>
                                                        {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                                                    </span>
                                                </div>
                                                
                                                <div style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '1rem',
                                                    marginBottom: '0.5rem',
                                                    fontSize: '0.9rem',
                                                    color: '#6b7280'
                                                }}>
                                                    <span>👨‍⚕️ {record.doctor}</span>
                                                    <span>📅 {record.date.toLocaleDateString()}</span>
                                                    <span>🏷️ {record.category}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Record Summary */}
                                        <p style={{
                                            color: '#6b7280',
                                            fontSize: '1rem',
                                            lineHeight: '1.6',
                                            marginBottom: '1.5rem'
                                        }}>
                                            {record.summary}
                                        </p>

                                        {/* Attachments */}
                                        {record.attachments && record.attachments.length > 0 && (
                                            <div style={{
                                                background: 'rgba(147, 51, 234, 0.05)',
                                                borderRadius: '12px',
                                                padding: '1rem',
                                                marginBottom: '1rem'
                                            }}>
                                                <div style={{
                                                    fontSize: '0.9rem',
                                                    color: '#6b7280',
                                                    marginBottom: '0.5rem',
                                                    fontWeight: '600'
                                                }}>
                                                    📎 Attachments ({record.attachments.length})
                                                </div>
                                                <div style={{
                                                    display: 'flex',
                                                    flexWrap: 'wrap',
                                                    gap: '0.5rem'
                                                }}>
                                                    {record.attachments.map((attachment, idx) => (
                                                        <span
                                                            key={idx}
                                                            style={{
                                                                padding: '0.5rem 0.75rem',
                                                                background: 'rgba(147, 51, 234, 0.1)',
                                                                color: '#7c3aed',
                                                                borderRadius: '8px',
                                                                fontSize: '0.8rem',
                                                                fontWeight: '500'
                                                            }}
                                                        >
                                                            📄 {attachment}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* View Details Button */}
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setSelectedRecord(record);
                                            }}
                                            style={{
                                                padding: '0.75rem 1.5rem',
                                                background: 'linear-gradient(135deg, #9333ea 0%, #7c3aed 100%)',
                                                color: 'white',
                                                border: 'none',
                                                borderRadius: '12px',
                                                fontSize: '0.9rem',
                                                fontWeight: '600',
                                                cursor: 'pointer',
                                                transition: 'all 0.3s ease',
                                                boxShadow: '0 4px 12px rgba(147, 51, 234, 0.3)'
                                            }}
                                        >
                                            View Details
                                        </button>
                                    </div>
                                );
                            })
                        ) : (
                            <div style={{
                                background: 'rgba(255, 255, 255, 0.98)',
                                backdropFilter: 'blur(20px)',
                                borderRadius: '24px',
                                padding: '3rem',
                                textAlign: 'center',
                                boxShadow: '0 12px 32px rgba(147, 51, 234, 0.1)',
                                border: '1px solid rgba(147, 51, 234, 0.15)'
                            }}>
                                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
                                <h3 style={{
                                    fontSize: '1.5rem',
                                    fontWeight: '600',
                                    color: '#374151',
                                    margin: '0 0 0.5rem'
                                }}>
                                    No records found
                                </h3>
                                <p style={{ color: '#6b7280', margin: 0 }}>
                                    No medical records found for the selected category
                                </p>
                            </div>
                        )}
                    </div>
                </section>
            </main>

            {/* Record Details Modal */}
            {selectedRecord && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0, 0, 0, 0.7)',
                    backdropFilter: 'blur(10px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000,
                    padding: '2rem'
                }}>
                    <div style={{
                        background: 'white',
                        borderRadius: '24px',
                        padding: '2.5rem',
                        maxWidth: '600px',
                        width: '100%',
                        maxHeight: '80vh',
                        overflowY: 'auto',
                        boxShadow: '0 32px 64px rgba(0, 0, 0, 0.2)',
                        position: 'relative'
                    }}>
                        <button
                            onClick={() => setSelectedRecord(null)}
                            style={{
                                position: 'absolute',
                                top: '1rem',
                                right: '1rem',
                                background: 'none',
                                border: 'none',
                                fontSize: '1.5rem',
                                cursor: 'pointer',
                                color: '#6b7280'
                            }}
                        >
                            ✕
                        </button>

                        <div style={{ marginBottom: '2rem' }}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem',
                                marginBottom: '1rem'
                            }}>
                                <div style={{
                                    width: '60px',
                                    height: '60px',
                                    background: 'linear-gradient(135deg, #9333ea 0%, #7c3aed 100%)',
                                    borderRadius: '16px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '1.8rem'
                                }}>
                                    {getTypeIcon(selectedRecord.type)}
                                </div>
                                <div>
                                    <h3 style={{
                                        fontSize: '1.5rem',
                                        fontWeight: '700',
                                        color: '#374151',
                                        margin: '0 0 0.25rem'
                                    }}>
                                        {selectedRecord.title}
                                    </h3>
                                    <p style={{ color: '#6b7280', margin: 0 }}>
                                        {selectedRecord.doctor} • {selectedRecord.date.toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div style={{
                            background: 'rgba(147, 51, 234, 0.1)',
                            borderRadius: '12px',
                            padding: '1.5rem',
                            marginBottom: '2rem'
                        }}>
                            <h4 style={{
                                fontSize: '1.1rem',
                                fontWeight: '600',
                                color: '#374151',
                                margin: '0 0 1rem'
                            }}>
                                Detailed Information
                            </h4>
                            <p style={{
                                color: '#374151',
                                lineHeight: '1.6',
                                margin: 0
                            }}>
                                {selectedRecord.details}
                            </p>
                        </div>

                        {selectedRecord.attachments && selectedRecord.attachments.length > 0 && (
                            <div style={{
                                background: 'rgba(147, 51, 234, 0.05)',
                                borderRadius: '12px',
                                padding: '1.5rem'
                            }}>
                                <h4 style={{
                                    fontSize: '1.1rem',
                                    fontWeight: '600',
                                    color: '#374151',
                                    margin: '0 0 1rem'
                                }}>
                                    Attachments
                                </h4>
                                <div style={{
                                    display: 'grid',
                                    gap: '0.75rem'
                                }}>
                                    {selectedRecord.attachments.map((attachment, idx) => (
                                        <div
                                            key={idx}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                padding: '1rem',
                                                background: 'white',
                                                borderRadius: '8px',
                                                border: '1px solid rgba(147, 51, 234, 0.1)'
                                            }}
                                        >
                                            <span style={{
                                                color: '#374151',
                                                fontWeight: '500'
                                            }}>
                                                📄 {attachment}
                                            </span>
                                            <button style={{
                                                padding: '0.5rem 1rem',
                                                background: 'linear-gradient(135deg, #9333ea 0%, #7c3aed 100%)',
                                                color: 'white',
                                                border: 'none',
                                                borderRadius: '8px',
                                                fontSize: '0.8rem',
                                                fontWeight: '600',
                                                cursor: 'pointer'
                                            }}>
                                                Download
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Upload Modal */}
            {showUploadModal && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0, 0, 0, 0.7)',
                    backdropFilter: 'blur(10px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000,
                    padding: '2rem'
                }}>
                    <div style={{
                        background: 'white',
                        borderRadius: '24px',
                        padding: '2.5rem',
                        maxWidth: '500px',
                        width: '100%',
                        boxShadow: '0 32px 64px rgba(0, 0, 0, 0.2)',
                        position: 'relative'
                    }}>
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
                                color: '#6b7280'
                            }}
                        >
                            ✕
                        </button>

                        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                            <div style={{
                                width: '80px',
                                height: '80px',
                                background: 'linear-gradient(135deg, #9333ea 0%, #7c3aed 100%)',
                                borderRadius: '16px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '2rem',
                                margin: '0 auto 1rem'
                            }}>
                                📤
                            </div>
                            <h3 style={{
                                fontSize: '1.5rem',
                                fontWeight: '700',
                                color: '#374151',
                                margin: '0 0 0.5rem'
                            }}>
                                Upload Medical Document
                            </h3>
                            <p style={{ color: '#6b7280', margin: 0 }}>
                                Add a new document to your medical history
                            </p>
                        </div>

                        <div style={{
                            background: 'rgba(147, 51, 234, 0.1)',
                            borderRadius: '12px',
                            padding: '1.5rem',
                            textAlign: 'center',
                            marginBottom: '2rem'
                        }}>
                            <p style={{
                                color: '#7c3aed',
                                fontWeight: '600',
                                margin: 0,
                                fontSize: '1.1rem'
                            }}>
                                📋 Document upload functionality will be integrated!
                            </p>
                            <p style={{
                                color: '#9333ea',
                                margin: '0.5rem 0 0',
                                fontSize: '0.9rem'
                            }}>
                                This will allow secure upload and storage of medical documents.
                            </p>
                        </div>

                        <button
                            onClick={() => setShowUploadModal(false)}
                            style={{
                                width: '100%',
                                padding: '1rem',
                                background: 'linear-gradient(135deg, #9333ea 0%, #7c3aed 100%)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '12px',
                                fontSize: '1rem',
                                fontWeight: '600',
                                cursor: 'pointer'
                            }}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            <style jsx>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
};

export default PatientMedicalHistory;
