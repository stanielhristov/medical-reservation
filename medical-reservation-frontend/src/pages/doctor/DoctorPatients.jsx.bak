import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

const DoctorPatients = () => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('all');
    const [patients, setPatients] = useState([]);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [showAddRecord, setShowAddRecord] = useState(false);
    const [newRecord, setNewRecord] = useState({
        type: '',
        title: '',
        description: '',
        diagnosis: '',
        treatment: '',
        prescription: ''
    });

    const filters = [
        { id: 'all', name: 'All Patients', icon: '👥', color: '#059669' },
        { id: 'recent', name: 'Recent Visits', icon: '⏰', color: '#3b82f6' },
        { id: 'chronic', name: 'Chronic Conditions', icon: '🏥', color: '#dc2626' },
        { id: 'followup', name: 'Follow-up Required', icon: '📋', color: '#f59e0b' }
    ];

    useEffect(() => {
        fetchPatients();
    }, []);

    const fetchPatients = async () => {
        try {
            // Mock data - replace with actual API call
            setPatients([
                {
                    id: 1,
                    name: "John Smith",
                    age: 45,
                    gender: "Male",
                    phone: "(555) 123-4567",
                    email: "john.smith@email.com",
                    address: "123 Main St, City, State 12345",
                    bloodType: "O+",
                    allergies: ["Penicillin", "Shellfish"],
                    conditions: ["Hypertension", "Type 2 Diabetes"],
                    lastVisit: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
                    nextAppointment: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
                    visitCount: 12,
                    status: "active",
                    medicalRecords: [
                        {
                            id: 1,
                            date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
                            type: "consultation",
                            title: "Blood Pressure Check",
                            description: "Routine follow-up for hypertension management",
                            diagnosis: "Hypertension - well controlled",
                            treatment: "Continue current medication regimen",
                            prescription: "Lisinopril 10mg daily"
                        },
                        {
                            id: 2,
                            date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
                            type: "test",
                            title: "HbA1c Test",
                            description: "Quarterly diabetes monitoring",
                            diagnosis: "Type 2 Diabetes - good control",
                            treatment: "Continue current treatment plan",
                            prescription: "Metformin 500mg twice daily"
                        }
                    ]
                },
                {
                    id: 2,
                    name: "Sarah Johnson",
                    age: 32,
                    gender: "Female",
                    phone: "(555) 234-5678",
                    email: "sarah.johnson@email.com",
                    address: "456 Oak Ave, City, State 12345",
                    bloodType: "A-",
                    allergies: ["None known"],
                    conditions: ["Anxiety", "Migraine"],
                    lastVisit: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
                    nextAppointment: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
                    visitCount: 8,
                    status: "active",
                    medicalRecords: [
                        {
                            id: 1,
                            date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
                            type: "consultation",
                            title: "Chest Pain Evaluation",
                            description: "Patient reported chest pain during exercise",
                            diagnosis: "Anxiety-related chest pain, rule out cardiac causes",
                            treatment: "EKG normal, stress test recommended",
                            prescription: "Lorazepam 0.5mg as needed for anxiety"
                        }
                    ]
                },
                {
                    id: 3,
                    name: "Michael Davis",
                    age: 28,
                    gender: "Male",
                    phone: "(555) 345-6789",
                    email: "michael.davis@email.com",
                    address: "789 Pine St, City, State 12345",
                    bloodType: "B+",
                    allergies: ["Penicillin"],
                    conditions: ["None"],
                    lastVisit: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000),
                    nextAppointment: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                    visitCount: 3,
                    status: "active",
                    medicalRecords: [
                        {
                            id: 1,
                            date: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000),
                            type: "checkup",
                            title: "Annual Physical",
                            description: "Routine annual physical examination",
                            diagnosis: "Healthy individual",
                            treatment: "No treatment required",
                            prescription: "None"
                        }
                    ]
                },
                {
                    id: 4,
                    name: "Emily Wilson",
                    age: 55,
                    gender: "Female",
                    phone: "(555) 456-7890",
                    email: "emily.wilson@email.com",
                    address: "321 Elm St, City, State 12345",
                    bloodType: "AB+",
                    allergies: ["Latex", "Sulfa drugs"],
                    conditions: ["Coronary Artery Disease", "Hypertension", "High Cholesterol"],
                    lastVisit: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
                    nextAppointment: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
                    visitCount: 25,
                    status: "chronic",
                    medicalRecords: [
                        {
                            id: 1,
                            date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
                            type: "procedure",
                            title: "Cardiac Catheterization Follow-up",
                            description: "Post-procedure evaluation and recovery assessment",
                            diagnosis: "Post-catheterization - excellent recovery",
                            treatment: "Continue cardiac medications, activity as tolerated",
                            prescription: "Atorvastatin 40mg daily, Metoprolol 50mg twice daily"
                        }
                    ]
                }
            ]);
        } catch (error) {
            console.error('Error fetching patients:', error);
        } finally {
            setLoading(false);
        }
    };

    const getFilteredPatients = () => {
        let filtered = patients;

        // Apply search filter
        if (searchTerm) {
            filtered = filtered.filter(patient =>
                patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                patient.conditions.some(condition => 
                    condition.toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
        }

        // Apply category filter
        const now = new Date();
        const recentThreshold = 30 * 24 * 60 * 60 * 1000; // 30 days

        switch (selectedFilter) {
            case 'recent':
                return filtered.filter(patient => 
                    now - patient.lastVisit < recentThreshold
                );
            case 'chronic':
                return filtered.filter(patient => 
                    patient.conditions.length > 1 || patient.status === 'chronic'
                );
            case 'followup':
                return filtered.filter(patient => 
                    patient.nextAppointment && patient.nextAppointment < new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000)
                );
            default:
                return filtered;
        }
    };

    const addMedicalRecord = () => {
        if (selectedPatient && newRecord.title && newRecord.description) {
            const record = {
                id: selectedPatient.medicalRecords.length + 1,
                date: new Date(),
                ...newRecord
            };

            setPatients(prev =>
                prev.map(patient =>
                    patient.id === selectedPatient.id
                        ? { ...patient, medicalRecords: [record, ...patient.medicalRecords] }
                        : patient
                )
            );

            setNewRecord({
                type: '',
                title: '',
                description: '',
                diagnosis: '',
                treatment: '',
                prescription: ''
            });
            setShowAddRecord(false);
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
                    <p style={{ color: '#6b7280', margin: 0, fontSize: '1rem', fontWeight: '500' }}>Loading patients...</p>
                </div>
            </div>
        );
    }

    return (
        <div style={{
            position: 'relative'
        }}>
            {/* Background decorations */}
            <div style={{
                position: 'absolute',
                top: '5%',
                right: '8%',
                width: '300px',
                height: '300px',
                background: 'radial-gradient(circle, rgba(5, 150, 105, 0.1) 0%, rgba(5, 150, 105, 0.05) 50%, transparent 100%)',
                borderRadius: '50%',
                zIndex: 0
            }} />
            
            <div style={{
                position: 'absolute',
                bottom: '10%',
                left: '5%',
                width: '250px',
                height: '250px',
                background: 'radial-gradient(circle, rgba(4, 120, 87, 0.08) 0%, rgba(4, 120, 87, 0.03) 50%, transparent 100%)',
                borderRadius: '50%',
                zIndex: 0
            }} />

            {/* Main Content */}
            <main style={{
                padding: '2.5rem 0',
                position: 'relative',
                zIndex: 1
            }}>
                {/* Header Section */}
                <section style={{
                    background: 'rgba(255, 255, 255, 0.98)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '32px',
                    padding: '3rem',
                    marginBottom: '3rem',
                    boxShadow: '0 32px 64px rgba(5, 150, 105, 0.12), 0 16px 32px rgba(0, 0, 0, 0.06)',
                    border: '1px solid rgba(5, 150, 105, 0.15)',
                    textAlign: 'center'
                }}>
                    <div style={{
                        width: '100px',
                        height: '100px',
                        background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                        borderRadius: '20px',
                        margin: '0 auto 2rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 16px 40px rgba(5, 150, 105, 0.3)'
                    }}>
                        <span style={{ fontSize: '3rem', color: 'white' }}>👥</span>
                    </div>
                    
                    <h1 style={{
                        fontSize: '2.5rem',
                        fontWeight: '800',
                        color: '#374151',
                        margin: '0 0 1rem',
                        letterSpacing: '-0.025em'
                    }}>
                        Patient Records Management
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
                        Access comprehensive patient records, medical history, and add new medical documentation
                    </p>
                </section>

                {/* Statistics Cards */}
                <section style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '1.5rem',
                    marginBottom: '3rem'
                }}>
                    {filters.map(filter => {
                        let count = 0;
                        const now = new Date();
                        const recentThreshold = 30 * 24 * 60 * 60 * 1000;

                        switch (filter.id) {
                            case 'all':
                                count = patients.length;
                                break;
                            case 'recent':
                                count = patients.filter(patient => 
                                    now - patient.lastVisit < recentThreshold
                                ).length;
                                break;
                            case 'chronic':
                                count = patients.filter(patient => 
                                    patient.conditions.length > 1 || patient.status === 'chronic'
                                ).length;
                                break;
                            case 'followup':
                                count = patients.filter(patient => 
                                    patient.nextAppointment && patient.nextAppointment < new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000)
                                ).length;
                                break;
                        }
                        
                        return (
                            <div key={filter.id} style={{
                                background: 'rgba(255, 255, 255, 0.98)',
                                backdropFilter: 'blur(20px)',
                                borderRadius: '20px',
                                padding: '1.5rem',
                                boxShadow: '0 8px 24px rgba(5, 150, 105, 0.1)',
                                border: `1px solid ${filter.color}20`,
                                textAlign: 'center',
                                transition: 'all 0.3s ease',
                                cursor: 'pointer'
                            }}
                            onClick={() => setSelectedFilter(filter.id)}
                            onMouseEnter={e => {
                                e.currentTarget.style.transform = 'translateY(-4px)';
                                e.currentTarget.style.boxShadow = `0 12px 32px ${filter.color}30`;
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 8px 24px rgba(5, 150, 105, 0.1)';
                            }}>
                                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{filter.icon}</div>
                                <div style={{ color: '#374151', fontWeight: '700', fontSize: '1.5rem' }}>{count}</div>
                                <div style={{ color: '#6b7280', fontSize: '0.9rem' }}>{filter.name}</div>
                            </div>
                        );
                    })}
                </section>

                {/* Search and Filter Section */}
                <section style={{
                    background: 'rgba(255, 255, 255, 0.98)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '24px',
                    padding: '2rem',
                    marginBottom: '3rem',
                    boxShadow: '0 12px 32px rgba(5, 150, 105, 0.1)',
                    border: '1px solid rgba(5, 150, 105, 0.15)'
                }}>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '1.5rem',
                        alignItems: 'end',
                        marginBottom: '1.5rem'
                    }}>
                        <div>
                            <label style={{
                                display: 'block',
                                marginBottom: '0.5rem',
                                fontWeight: '600',
                                color: '#374151'
                            }}>
                                Search Patients
                            </label>
                            <input
                                type="text"
                                placeholder="Search by name, email, or condition..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '1rem',
                                    border: '2px solid rgba(5, 150, 105, 0.2)',
                                    borderRadius: '12px',
                                    fontSize: '1rem',
                                    background: 'rgba(255, 255, 255, 0.8)',
                                    backdropFilter: 'blur(10px)',
                                    outline: 'none',
                                    transition: 'all 0.3s ease'
                                }}
                                onFocus={(e) => {
                                    e.target.style.borderColor = '#059669';
                                    e.target.style.boxShadow = '0 0 0 3px rgba(5, 150, 105, 0.1)';
                                }}
                                onBlur={(e) => {
                                    e.target.style.borderColor = 'rgba(5, 150, 105, 0.2)';
                                    e.target.style.boxShadow = 'none';
                                }}
                            />
                        </div>
                    </div>
                    
                    <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '0.75rem'
                    }}>
                        {filters.map(filter => (
                            <button
                                key={filter.id}
                                onClick={() => setSelectedFilter(filter.id)}
                                style={{
                                    padding: '0.75rem 1.25rem',
                                    background: selectedFilter === filter.id 
                                        ? 'linear-gradient(135deg, #059669 0%, #047857 100%)' 
                                        : 'rgba(5, 150, 105, 0.1)',
                                    color: selectedFilter === filter.id ? 'white' : '#047857',
                                    border: selectedFilter === filter.id 
                                        ? 'none' 
                                        : '1px solid rgba(5, 150, 105, 0.2)',
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
                                <span>{filter.icon}</span>
                                {filter.name}
                            </button>
                        ))}
                    </div>
                </section>

                {/* Patients List */}
                <section>
                    <div style={{
                        display: 'grid',
                        gap: '1.5rem'
                    }}>
                        {getFilteredPatients().length > 0 ? (
                            getFilteredPatients().map((patient) => (
                                <div
                                    key={patient.id}
                                    style={{
                                        background: 'rgba(255, 255, 255, 0.98)',
                                        backdropFilter: 'blur(20px)',
                                        borderRadius: '24px',
                                        padding: '2rem',
                                        boxShadow: '0 12px 32px rgba(5, 150, 105, 0.1)',
                                        border: patient.status === 'chronic' 
                                            ? '2px solid rgba(220, 38, 38, 0.2)' 
                                            : '1px solid rgba(5, 150, 105, 0.15)',
                                        transition: 'all 0.4s ease',
                                        position: 'relative',
                                        overflow: 'hidden'
                                    }}
                                    onMouseEnter={e => {
                                        e.currentTarget.style.transform = 'translateY(-4px)';
                                        e.currentTarget.style.boxShadow = '0 20px 48px rgba(5, 150, 105, 0.2)';
                                    }}
                                    onMouseLeave={e => {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = '0 12px 32px rgba(5, 150, 105, 0.1)';
                                    }}
                                >
                                    <div style={{
                                        position: 'absolute',
                                        top: '10px',
                                        right: '10px',
                                        width: '80px',
                                        height: '80px',
                                        background: 'radial-gradient(circle, rgba(5, 150, 105, 0.1) 0%, transparent 70%)',
                                        borderRadius: '50%'
                                    }} />
                                    
                                    {/* Patient Header */}
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'flex-start',
                                        gap: '1rem',
                                        marginBottom: '1.5rem'
                                    }}>
                                        <div style={{
                                            width: '60px',
                                            height: '60px',
                                            background: patient.status === 'chronic'
                                                ? 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)'
                                                : 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                                            borderRadius: '16px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '1.8rem',
                                            boxShadow: patient.status === 'chronic'
                                                ? '0 8px 24px rgba(220, 38, 38, 0.3)'
                                                : '0 8px 24px rgba(5, 150, 105, 0.3)',
                                            flexShrink: 0
                                        }}>
                                            {patient.gender === 'Male' ? '👨' : '👩'}
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
                                                    {patient.name}
                                                    {patient.status === 'chronic' && (
                                                        <span style={{
                                                            marginLeft: '0.5rem',
                                                            padding: '0.25rem 0.5rem',
                                                            background: 'rgba(220, 38, 38, 0.1)',
                                                            color: '#dc2626',
                                                            borderRadius: '6px',
                                                            fontSize: '0.7rem',
                                                            fontWeight: '600'
                                                        }}>
                                                            CHRONIC
                                                        </span>
                                                    )}
                                                </h3>
                                                <span style={{
                                                    padding: '0.5rem 1rem',
                                                    fontSize: '0.8rem',
                                                    fontWeight: '600',
                                                    borderRadius: '20px',
                                                    background: 'rgba(5, 150, 105, 0.1)',
                                                    color: '#047857',
                                                    border: '1px solid rgba(5, 150, 105, 0.2)'
                                                }}>
                                                    {patient.visitCount} visits
                                                </span>
                                            </div>
                                            
                                            <div style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '1rem',
                                                marginBottom: '0.5rem',
                                                fontSize: '0.9rem',
                                                color: '#6b7280',
                                                flexWrap: 'wrap'
                                            }}>
                                                <span>👤 {patient.age} years old</span>
                                                <span>🩸 {patient.bloodType}</span>
                                                <span>📞 {patient.phone}</span>
                                                <span>📧 {patient.email}</span>
                                            </div>
                                            
                                            <div style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '1rem',
                                                fontSize: '0.9rem',
                                                color: '#6b7280',
                                                flexWrap: 'wrap'
                                            }}>
                                                <span>📅 Last visit: {patient.lastVisit.toLocaleDateString()}</span>
                                                <span>⏰ Next: {patient.nextAppointment ? patient.nextAppointment.toLocaleDateString() : 'Not scheduled'}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Patient Details */}
                                    <div style={{
                                        background: 'rgba(5, 150, 105, 0.05)',
                                        borderRadius: '12px',
                                        padding: '1rem',
                                        marginBottom: '1.5rem'
                                    }}>
                                        <div style={{
                                            display: 'grid',
                                            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                                            gap: '1rem',
                                            fontSize: '0.9rem'
                                        }}>
                                            <div>
                                                <span style={{ color: '#6b7280', fontWeight: '600' }}>🏠 Address:</span>
                                                <div style={{ color: '#374151', marginTop: '0.25rem' }}>{patient.address}</div>
                                            </div>

                                            <div>
                                                <span style={{ color: '#6b7280', fontWeight: '600' }}>⚠️ Allergies:</span>
                                                <div style={{ color: '#374151', marginTop: '0.25rem' }}>
                                                    {patient.allergies.join(', ')}
                                                </div>
                                            </div>
                                            <div>
                                                <span style={{ color: '#6b7280', fontWeight: '600' }}>🏥 Conditions:</span>
                                                <div style={{ color: '#374151', marginTop: '0.25rem' }}>
                                                    {patient.conditions.length > 0 ? patient.conditions.join(', ') : 'None'}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Recent Records */}
                                    <div style={{
                                        background: 'rgba(5, 150, 105, 0.03)',
                                        borderRadius: '12px',
                                        padding: '1rem',
                                        marginBottom: '1.5rem'
                                    }}>
                                        <div style={{
                                            fontSize: '0.9rem',
                                            color: '#6b7280',
                                            fontWeight: '600',
                                            marginBottom: '0.5rem'
                                        }}>
                                            📋 Recent Medical Records ({patient.medicalRecords.length}):
                                        </div>
                                        {patient.medicalRecords.slice(0, 2).map(record => (
                                            <div key={record.id} style={{
                                                background: 'white',
                                                borderRadius: '8px',
                                                padding: '0.75rem',
                                                marginBottom: '0.5rem',
                                                border: '1px solid rgba(5, 150, 105, 0.1)'
                                            }}>
                                                <div style={{
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center',
                                                    marginBottom: '0.25rem'
                                                }}>
                                                    <span style={{ fontWeight: '600', color: '#374151' }}>{record.title}</span>
                                                    <span style={{ fontSize: '0.8rem', color: '#6b7280' }}>
                                                        {record.date.toLocaleDateString()}
                                                    </span>
                                                </div>
                                                <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>
                                                    {record.description}
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Action Buttons */}
                                    <div style={{
                                        display: 'flex',
                                        gap: '1rem',
                                        flexWrap: 'wrap'
                                    }}>
                                        <button
                                            onClick={() => setSelectedPatient(patient)}
                                            style={{
                                                padding: '0.75rem 1.5rem',
                                                background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                                                color: 'white',
                                                border: 'none',
                                                borderRadius: '12px',
                                                fontSize: '0.9rem',
                                                fontWeight: '600',
                                                cursor: 'pointer',
                                                transition: 'all 0.3s ease',
                                                boxShadow: '0 4px 12px rgba(5, 150, 105, 0.3)'
                                            }}
                                        >
                                            📋 View Full Records
                                        </button>
                                        <button
                                            onClick={() => {
                                                setSelectedPatient(patient);
                                                setShowAddRecord(true);
                                            }}
                                            style={{
                                                padding: '0.75rem 1.5rem',
                                                background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                                                color: 'white',
                                                border: 'none',
                                                borderRadius: '12px',
                                                fontSize: '0.9rem',
                                                fontWeight: '600',
                                                cursor: 'pointer',
                                                transition: 'all 0.3s ease',
                                                boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)'
                                            }}
                                        >
                                            ➕ Add Record
                                        </button>
                                        <button
                                            style={{
                                                padding: '0.75rem 1.5rem',
                                                background: 'rgba(5, 150, 105, 0.1)',
                                                color: '#047857',
                                                border: '1px solid rgba(5, 150, 105, 0.2)',
                                                borderRadius: '12px',
                                                fontSize: '0.9rem',
                                                fontWeight: '600',
                                                cursor: 'pointer',
                                                transition: 'all 0.3s ease'
                                            }}
                                        >
                                            📧 Contact Patient
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div style={{
                                background: 'rgba(255, 255, 255, 0.98)',
                                backdropFilter: 'blur(20px)',
                                borderRadius: '24px',
                                padding: '3rem',
                                textAlign: 'center',
                                boxShadow: '0 12px 32px rgba(5, 150, 105, 0.1)',
                                border: '1px solid rgba(5, 150, 105, 0.15)'
                            }}>
                                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>👥</div>
                                <h3 style={{
                                    fontSize: '1.5rem',
                                    fontWeight: '600',
                                    color: '#374151',
                                    margin: '0 0 0.5rem'
                                }}>
                                    No patients found
                                </h3>
                                <p style={{ color: '#6b7280', margin: 0 }}>
                                    No patients match your current search and filter criteria
                                </p>
                            </div>
                        )}
                    </div>
                </section>
            </main>

            {/* Add Record Modal */}
            {showAddRecord && selectedPatient && (
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
                        maxWidth: '700px',
                        width: '100%',
                        maxHeight: '80vh',
                        overflowY: 'auto',
                        boxShadow: '0 32px 64px rgba(0, 0, 0, 0.2)',
                        position: 'relative'
                    }}>
                        <button
                            onClick={() => {
                                setShowAddRecord(false);
                                setSelectedPatient(null);
                                setNewRecord({
                                    type: '',
                                    title: '',
                                    description: '',
                                    diagnosis: '',
                                    treatment: '',
                                    prescription: ''
                                });
                            }}
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
                                background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                                borderRadius: '16px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '2rem',
                                margin: '0 auto 1rem'
                            }}>
                                📝
                            </div>
                            <h3 style={{
                                fontSize: '1.5rem',
                                fontWeight: '700',
                                color: '#374151',
                                margin: '0 0 0.5rem'
                            }}>
                                Add Medical Record
                            </h3>
                            <p style={{ color: '#6b7280', margin: 0 }}>
                                {selectedPatient.name} - {selectedPatient.age} years old
                            </p>
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                                gap: '1rem',
                                marginBottom: '1rem'
                            }}>
                                <div>
                                    <label style={{
                                        display: 'block',
                                        marginBottom: '0.5rem',
                                        fontWeight: '600',
                                        color: '#374151'
                                    }}>
                                        Record Type
                                    </label>
                                    <select
                                        value={newRecord.type}
                                        onChange={(e) => setNewRecord(prev => ({ ...prev, type: e.target.value }))}
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem',
                                            border: '2px solid rgba(5, 150, 105, 0.2)',
                                            borderRadius: '8px',
                                            fontSize: '1rem',
                                            outline: 'none'
                                        }}
                                    >
                                        <option value="">Select type</option>
                                        <option value="consultation">Consultation</option>
                                        <option value="test">Test/Lab</option>
                                        <option value="procedure">Procedure</option>
                                        <option value="checkup">Checkup</option>
                                        <option value="emergency">Emergency</option>
                                    </select>
                                </div>
                                <div>
                                    <label style={{
                                        display: 'block',
                                        marginBottom: '0.5rem',
                                        fontWeight: '600',
                                        color: '#374151'
                                    }}>
                                        Title
                                    </label>
                                    <input
                                        type="text"
                                        value={newRecord.title}
                                        onChange={(e) => setNewRecord(prev => ({ ...prev, title: e.target.value }))}
                                        placeholder="Record title"
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem',
                                            border: '2px solid rgba(5, 150, 105, 0.2)',
                                            borderRadius: '8px',
                                            fontSize: '1rem',
                                            outline: 'none'
                                        }}
                                    />
                                </div>
                            </div>

                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{
                                    display: 'block',
                                    marginBottom: '0.5rem',
                                    fontWeight: '600',
                                    color: '#374151'
                                }}>
                                    Description
                                </label>
                                <textarea
                                    value={newRecord.description}
                                    onChange={(e) => setNewRecord(prev => ({ ...prev, description: e.target.value }))}
                                    placeholder="Detailed description of the visit/procedure"
                                    rows={3}
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem',
                                        border: '2px solid rgba(5, 150, 105, 0.2)',
                                        borderRadius: '8px',
                                        fontSize: '1rem',
                                        outline: 'none',
                                        resize: 'vertical',
                                        fontFamily: 'inherit'
                                    }}
                                />
                            </div>

                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{
                                    display: 'block',
                                    marginBottom: '0.5rem',
                                    fontWeight: '600',
                                    color: '#374151'
                                }}>
                                    Diagnosis
                                </label>
                                <textarea
                                    value={newRecord.diagnosis}
                                    onChange={(e) => setNewRecord(prev => ({ ...prev, diagnosis: e.target.value }))}
                                    placeholder="Medical diagnosis and findings"
                                    rows={2}
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem',
                                        border: '2px solid rgba(5, 150, 105, 0.2)',
                                        borderRadius: '8px',
                                        fontSize: '1rem',
                                        outline: 'none',
                                        resize: 'vertical',
                                        fontFamily: 'inherit'
                                    }}
                                />
                            </div>

                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                                gap: '1rem'
                            }}>
                                <div>
                                    <label style={{
                                        display: 'block',
                                        marginBottom: '0.5rem',
                                        fontWeight: '600',
                                        color: '#374151'
                                    }}>
                                        Treatment Plan
                                    </label>
                                    <textarea
                                        value={newRecord.treatment}
                                        onChange={(e) => setNewRecord(prev => ({ ...prev, treatment: e.target.value }))}
                                        placeholder="Recommended treatment and care plan"
                                        rows={2}
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem',
                                            border: '2px solid rgba(5, 150, 105, 0.2)',
                                            borderRadius: '8px',
                                            fontSize: '1rem',
                                            outline: 'none',
                                            resize: 'vertical',
                                            fontFamily: 'inherit'
                                        }}
                                    />
                                </div>
                                <div>
                                    <label style={{
                                        display: 'block',
                                        marginBottom: '0.5rem',
                                        fontWeight: '600',
                                        color: '#374151'
                                    }}>
                                        Prescription
                                    </label>
                                    <textarea
                                        value={newRecord.prescription}
                                        onChange={(e) => setNewRecord(prev => ({ ...prev, prescription: e.target.value }))}
                                        placeholder="Medications and dosage"
                                        rows={2}
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem',
                                            border: '2px solid rgba(5, 150, 105, 0.2)',
                                            borderRadius: '8px',
                                            fontSize: '1rem',
                                            outline: 'none',
                                            resize: 'vertical',
                                            fontFamily: 'inherit'
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                        <div style={{
                            display: 'flex',
                            gap: '1rem'
                        }}>
                            <button
                                onClick={() => {
                                    setShowAddRecord(false);
                                    setSelectedPatient(null);
                                    setNewRecord({
                                        type: '',
                                        title: '',
                                        description: '',
                                        diagnosis: '',
                                        treatment: '',
                                        prescription: ''
                                    });
                                }}
                                style={{
                                    flex: 1,
                                    padding: '1rem',
                                    background: 'rgba(107, 114, 128, 0.1)',
                                    color: '#374151',
                                    border: '1px solid rgba(107, 114, 128, 0.2)',
                                    borderRadius: '12px',
                                    fontSize: '1rem',
                                    fontWeight: '600',
                                    cursor: 'pointer'
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={addMedicalRecord}
                                disabled={!newRecord.title || !newRecord.description}
                                style={{
                                    flex: 1,
                                    padding: '1rem',
                                    background: newRecord.title && newRecord.description
                                        ? 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)' 
                                        : 'rgba(107, 114, 128, 0.3)',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '12px',
                                    fontSize: '1rem',
                                    fontWeight: '600',
                                    cursor: newRecord.title && newRecord.description ? 'pointer' : 'not-allowed'
                                }}
                            >
                                Save Record
                            </button>
                        </div>
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

export default DoctorPatients;
