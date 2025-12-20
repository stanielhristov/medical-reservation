import React, { useState, useEffect } from 'react';
import { useBlockedSlots } from '../hooks/useBlockedSlots';

const BlockedSlotsManager = ({ doctorId, onClose }) => {
    const {
        blockedSlots,
        loading,
        error,
        fetchBlockedSlots,
        createBlockedSlot,
        updateBlockedSlot,
        removeBlockedSlot
    } = useBlockedSlots(doctorId);

    const [showAddForm, setShowAddForm] = useState(false);
    const [editingSlot, setEditingSlot] = useState(null);
    const [formData, setFormData] = useState({
        startTime: '',
        endTime: '',
        reason: ''
    });

    const [deleteConfirmation, setDeleteConfirmation] = useState({
        isOpen: false,
        slotId: null,
        slotInfo: ''
    });

    const [notification, setNotification] = useState({
        isOpen: false,
        title: '',
        message: '',
        type: 'error'
    });

    useEffect(() => {
        if (doctorId) {
            fetchBlockedSlots();
        }
    }, [doctorId, fetchBlockedSlots]);

    const showNotification = (title, message, type = 'error') => {
        setNotification({
            isOpen: true,
            title,
            message,
            type
        });
    };

    const resetForm = () => {
        setFormData({
            startTime: '',
            endTime: '',
            reason: ''
        });
        setEditingSlot(null);
        setShowAddForm(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            
            if (!formData.startTime || !formData.endTime || !formData.reason.trim()) {
                showNotification('Validation Error', 'Please fill in all fields', 'error');
                return;
            }

            if (new Date(formData.startTime) >= new Date(formData.endTime)) {
                showNotification('Validation Error', 'End time must be after start time', 'error');
                return;
            }

            const blockedSlotData = {
                startTime: formData.startTime,
                endTime: formData.endTime,
                reason: formData.reason.trim()
            };

            if (editingSlot) {
                await updateBlockedSlot(editingSlot.id, blockedSlotData);
            } else {
                await createBlockedSlot(blockedSlotData);
            }

            resetForm();
        } catch (err) {
            showNotification('Save Error', err.message || 'Failed to save blocked slot', 'error');
        }
    };

    const handleEdit = (slot) => {
        setEditingSlot(slot);
        setFormData({
            startTime: new Date(slot.startTime).toISOString().slice(0, 16),
            endTime: new Date(slot.endTime).toISOString().slice(0, 16),
            reason: slot.reason
        });
        setShowAddForm(true);
    };

    const handleDelete = (slotId) => {
        const slot = blockedSlots.find(s => s.id === slotId);
        const slotInfo = slot ? `${formatDateTime(slot.startTime)} - ${formatDateTime(slot.endTime)}` : 'this blocked period';
        
        setDeleteConfirmation({
            isOpen: true,
            slotId: slotId,
            slotInfo: slotInfo
        });
    };

    const handleDeleteConfirm = async () => {
        try {
            await removeBlockedSlot(deleteConfirmation.slotId);
            setDeleteConfirmation({ isOpen: false, slotId: null, slotInfo: '' });
        } catch (err) {
            showNotification('Delete Error', err.message || 'Failed to delete blocked slot', 'error');
            setDeleteConfirmation({ isOpen: false, slotId: null, slotInfo: '' });
        }
    };

    const handleDeleteCancel = () => {
        setDeleteConfirmation({ isOpen: false, slotId: null, slotInfo: '' });
    };

    const formatDateTime = (dateTimeStr) => {
        const date = new Date(dateTimeStr);
        return date.toLocaleString('en-US', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getDuration = (startTime, endTime) => {
        const start = new Date(startTime);
        const end = new Date(endTime);
        const diffInMinutes = (end - start) / (1000 * 60);
        const hours = Math.floor(diffInMinutes / 60);
        const minutes = diffInMinutes % 60;
        
        if (diffInMinutes < 60) {
            return `${minutes}m`;
        } else if (diffInMinutes < 1440) { 
            if (minutes > 0) {
                return `${hours}h ${minutes}m`;
            } else {
                return `${hours}h`;
            }
        } else {
            const days = Math.floor(diffInMinutes / 1440);
            const remainingHours = Math.floor((diffInMinutes % 1440) / 60);
            const remainingMinutes = diffInMinutes % 60;
            
            let result = `${days} day${days > 1 ? 's' : ''}`;
            if (remainingHours > 0) {
                result += ` ${remainingHours}h`;
            }
            if (remainingMinutes > 0) {
                result += ` ${remainingMinutes}m`;
            }
            return result;
        }
    };

    const getMinDateTime = () => {
        const now = new Date();
        return now.toISOString().slice(0, 16);
    };

    if (loading) {
        return (
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 1000
            }}>
                <div style={{
                    background: 'white',
                    borderRadius: '12px',
                    padding: '2rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem'
                }}>
                    <div style={{
                        width: '24px',
                        height: '24px',
                        border: '3px solid #f3f3f3',
                        borderTop: '3px solid #15803d',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite'
                    }} />
                    <span>Loading blocked slots...</span>
                </div>
            </div>
        );
    }

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
            padding: '1rem'
        }}>
            <div style={{
                background: 'white',
                borderRadius: '16px',
                padding: '2rem',
                maxWidth: '900px',
                width: '100%',
                maxHeight: '90vh',
                overflow: 'hidden',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
                display: 'flex',
                flexDirection: 'column'
            }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '2rem',
                    borderBottom: '2px solid #f0f0f0',
                    paddingBottom: '1rem'
                }}>
                    <h2 style={{
                        margin: 0,
                        color: '#15803d',
                        fontSize: '1.5rem',
                        fontWeight: '600'
                    }}>
                        🚫 Manage Blocked Periods
                    </h2>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <button
                            onClick={() => setShowAddForm(true)}
                            style={{
                                background: '#15803d',
                                border: 'none',
                                borderRadius: '8px',
                                color: 'white',
                                padding: '0.5rem 1rem',
                                cursor: 'pointer',
                                fontSize: '0.9rem',
                                fontWeight: '500'
                            }}
                        >
                            ➕ Add Blocked Period
                        </button>
                        <button
                            onClick={onClose}
                            style={{
                                background: 'none',
                                border: 'none',
                                fontSize: '1.5rem',
                                cursor: 'pointer',
                                color: '#666',
                                padding: '0.5rem'
                            }}
                        >
                            ✕
                        </button>
                    </div>
                </div>

                {error && (
                    <div style={{
                        background: '#fef2f2',
                        border: '1px solid #fecaca',
                        color: '#dc2626',
                        padding: '1rem',
                        borderRadius: '8px',
                        marginBottom: '1rem'
                    }}>
                        {error}
                    </div>
                )}

                {showAddForm && (
                    <div style={{
                        background: '#f8fafc',
                        border: '1px solid #e2e8f0',
                        borderRadius: '12px',
                        padding: '1.5rem',
                        marginBottom: '2rem'
                    }}>
                        <h3 style={{
                            margin: '0 0 1rem 0',
                            color: '#374151',
                            fontSize: '1.1rem'
                        }}>
                            {editingSlot ? 'Edit Blocked Period' : 'Add New Blocked Period'}
                        </h3>
                        
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div>
                                    <label style={{
                                        display: 'block',
                                        marginBottom: '0.5rem',
                                        fontSize: '0.9rem',
                                        color: '#374151',
                                        fontWeight: '500'
                                    }}>
                                        Start Date & Time
                                    </label>
                                    <input
                                        type="datetime-local"
                                        value={formData.startTime}
                                        min={getMinDateTime()}
                                        onChange={(e) => setFormData(prev => ({ ...prev, startTime: e.target.value }))}
                                        required
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem',
                                            border: '1px solid #d1d5db',
                                            borderRadius: '6px',
                                            fontSize: '1rem'
                                        }}
                                    />
                                </div>

                                <div>
                                    <label style={{
                                        display: 'block',
                                        marginBottom: '0.5rem',
                                        fontSize: '0.9rem',
                                        color: '#374151',
                                        fontWeight: '500'
                                    }}>
                                        End Date & Time
                                    </label>
                                    <input
                                        type="datetime-local"
                                        value={formData.endTime}
                                        min={formData.startTime || getMinDateTime()}
                                        onChange={(e) => setFormData(prev => ({ ...prev, endTime: e.target.value }))}
                                        required
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem',
                                            border: '1px solid #d1d5db',
                                            borderRadius: '6px',
                                            fontSize: '1rem'
                                        }}
                                    />
                                </div>
                            </div>

                            <div>
                                <label style={{
                                    display: 'block',
                                    marginBottom: '0.5rem',
                                    fontSize: '0.9rem',
                                    color: '#374151',
                                    fontWeight: '500'
                                }}>
                                    Reason for blocking
                                </label>
                                <textarea
                                    value={formData.reason}
                                    onChange={(e) => setFormData(prev => ({ ...prev, reason: e.target.value }))}
                                    placeholder="e.g., Vacation, Conference, Personal time off..."
                                    required
                                    rows={3}
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem',
                                        border: '1px solid #d1d5db',
                                        borderRadius: '6px',
                                        fontSize: '1rem',
                                        resize: 'vertical'
                                    }}
                                />
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    style={{
                                        padding: '0.75rem 1rem',
                                        border: '1px solid #d1d5db',
                                        borderRadius: '6px',
                                        background: 'white',
                                        color: '#374151',
                                        cursor: 'pointer',
                                        fontSize: '0.9rem'
                                    }}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    style={{
                                        padding: '0.75rem 1rem',
                                        border: 'none',
                                        borderRadius: '6px',
                                        background: '#15803d',
                                        color: 'white',
                                        cursor: 'pointer',
                                        fontSize: '0.9rem',
                                        fontWeight: '500'
                                    }}
                                >
                                    {editingSlot ? 'Update' : 'Add'} Blocked Period
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                <div style={{ flex: 1, overflow: 'auto' }}>
                    {blockedSlots.length === 0 ? (
                        <div style={{
                            textAlign: 'center',
                            padding: '3rem 1rem',
                            color: '#9ca3af'
                        }}>
                            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📅</div>
                            <h3 style={{ margin: '0 0 0.5rem 0', color: '#6b7280' }}>No blocked periods</h3>
                            <p style={{ margin: 0 }}>Add blocked periods for vacation, conferences, or personal time off.</p>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {blockedSlots.map(slot => (
                                <div key={slot.id} style={{
                                    border: '1px solid #fbbf24',
                                    borderRadius: '12px',
                                    padding: '1rem',
                                    background: '#fffbeb',
                                    position: 'relative'
                                }}>
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'flex-start',
                                        gap: '1rem'
                                    }}>
                                        <div style={{ flex: 1 }}>
                                            <div style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.5rem',
                                                marginBottom: '0.5rem'
                                            }}>
                                                <span style={{
                                                    background: '#fbbf24',
                                                    color: 'white',
                                                    padding: '0.25rem 0.5rem',
                                                    borderRadius: '4px',
                                                    fontSize: '0.8rem',
                                                    fontWeight: '500'
                                                }}>
                                                    BLOCKED
                                                </span>
                                                <span style={{
                                                    color: '#92400e',
                                                    fontSize: '0.9rem',
                                                    fontWeight: '500'
                                                }}>
                                                    {getDuration(slot.startTime, slot.endTime)}
                                                </span>
                                            </div>
                                            
                                            <div style={{
                                                fontSize: '1rem',
                                                color: '#374151',
                                                marginBottom: '0.5rem'
                                            }}>
                                                <strong>From:</strong> {formatDateTime(slot.startTime)}
                                                <br />
                                                <strong>To:</strong> {formatDateTime(slot.endTime)}
                                            </div>
                                            
                                            <div style={{
                                                fontSize: '0.9rem',
                                                color: '#6b7280',
                                                fontStyle: 'italic'
                                            }}>
                                                <strong>Reason:</strong> {slot.reason}
                                            </div>
                                        </div>
                                        
                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            <button
                                                onClick={() => handleEdit(slot)}
                                                style={{
                                                    background: '#3b82f6',
                                                    border: 'none',
                                                    borderRadius: '6px',
                                                    color: 'white',
                                                    padding: '0.5rem',
                                                    cursor: 'pointer',
                                                    fontSize: '0.8rem'
                                                }}
                                                title="Edit"
                                            >
                                                ✏️
                                            </button>
                                            <button
                                                onClick={() => handleDelete(slot.id)}
                                                style={{
                                                    background: '#dc2626',
                                                    border: 'none',
                                                    borderRadius: '6px',
                                                    color: 'white',
                                                    padding: '0.5rem',
                                                    cursor: 'pointer',
                                                    fontSize: '0.8rem'
                                                }}
                                                title="Delete"
                                            >
                                                🗑️
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {}
            {deleteConfirmation.isOpen && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 10000
                }}>
                    <div style={{
                        background: 'white',
                        borderRadius: '16px',
                        padding: '2rem',
                        maxWidth: '400px',
                        width: '90%',
                        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
                        textAlign: 'center'
                    }}>
                        <div style={{
                            fontSize: '3rem',
                            marginBottom: '1rem'
                        }}>
                            🗑️
                        </div>
                        
                        <h3 style={{
                            margin: '0 0 1rem 0',
                            color: '#dc2626',
                            fontSize: '1.25rem',
                            fontWeight: '600'
                        }}>
                            Delete Blocked Period
                        </h3>
                        
                        <p style={{
                            margin: '0 0 2rem 0',
                            color: '#374151',
                            lineHeight: '1.5'
                        }}>
                            Are you sure you want to delete the blocked period for <strong>{deleteConfirmation.slotInfo}</strong>? 
                            This action cannot be undone.
                        </p>
                        
                        <div style={{
                            display: 'flex',
                            gap: '1rem',
                            justifyContent: 'center'
                        }}>
                            <button
                                onClick={handleDeleteCancel}
                                style={{
                                    padding: '0.75rem 1.5rem',
                                    border: '1px solid #d1d5db',
                                    borderRadius: '8px',
                                    background: 'white',
                                    color: '#374151',
                                    cursor: 'pointer',
                                    fontSize: '1rem',
                                    fontWeight: '500'
                                }}
                            >
                                Cancel
                            </button>
                            
                            <button
                                onClick={handleDeleteConfirm}
                                style={{
                                    padding: '0.75rem 1.5rem',
                                    border: 'none',
                                    borderRadius: '8px',
                                    background: '#dc2626',
                                    color: 'white',
                                    cursor: 'pointer',
                                    fontSize: '1rem',
                                    fontWeight: '500'
                                }}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {}
            {notification.isOpen && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 10001
                }}>
                    <div style={{
                        background: 'white',
                        borderRadius: '16px',
                        padding: '2rem',
                        maxWidth: '400px',
                        width: '90%',
                        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
                        textAlign: 'center'
                    }}>
                        <div style={{
                            fontSize: '3rem',
                            marginBottom: '1rem'
                        }}>
                            {notification.type === 'error' ? '❌' : '✅'}
                        </div>
                        
                        <h3 style={{
                            margin: '0 0 1rem 0',
                            color: notification.type === 'error' ? '#dc2626' : '#15803d',
                            fontSize: '1.25rem',
                            fontWeight: '600'
                        }}>
                            {notification.title}
                        </h3>
                        
                        <p style={{
                            margin: '0 0 2rem 0',
                            color: '#374151',
                            lineHeight: '1.5'
                        }}>
                            {notification.message}
                        </p>
                        
                        <button
                            onClick={() => setNotification({ ...notification, isOpen: false })}
                            style={{
                                padding: '0.75rem 1.5rem',
                                border: 'none',
                                borderRadius: '8px',
                                background: notification.type === 'error' ? '#dc2626' : '#15803d',
                                color: 'white',
                                cursor: 'pointer',
                                fontSize: '1rem',
                                fontWeight: '500'
                            }}
                        >
                            OK
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

export default BlockedSlotsManager;
