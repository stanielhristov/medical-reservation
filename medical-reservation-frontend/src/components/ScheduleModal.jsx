const ScheduleModal = ({ 
    isOpen, 
    onClose, 
    onSave, 
    schedule = null, 
    title = "Add New Time Slot" 
}) => {
    const isEditing = !!schedule;
    
    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const scheduleData = {
            startTime: formData.get('startTime'),
            endTime: formData.get('endTime'),
            available: formData.get('available') === 'true'
        };
        
        if (isEditing) {
            scheduleData.id = schedule.id;
        }
        
        onSave(scheduleData);
    };

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
                borderRadius: '20px',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
                maxWidth: '500px',
                width: '100%',
                maxHeight: '90vh',
                overflowY: 'auto',
                position: 'relative'
            }}>
                <div style={{ padding: '2rem' }}>
                    <button
                        onClick={onClose}
                        style={{
                            position: 'absolute',
                            top: '1rem',
                            right: '1rem',
                            background: 'none',
                            border: 'none',
                            fontSize: '1.5rem',
                            cursor: 'pointer',
                            color: '#6b7280',
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'background 0.2s ease'
                        }}
                        onMouseEnter={e => {
                            e.target.style.background = 'rgba(107, 114, 128, 0.1)';
                        }}
                        onMouseLeave={e => {
                            e.target.style.background = 'none';
                        }}
                    >
                        ✕
                    </button>

                    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                        <div style={{
                            width: '80px',
                            height: '80px',
                            background: 'linear-gradient(135deg, #15803d 0%, #14532d 100%)',
                            borderRadius: '16px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '2rem',
                            margin: '0 auto 1rem',
                            color: 'white'
                        }}>
                            {isEditing ? '✏️' : '➕'}
                        </div>
                        <h3 style={{
                            fontSize: '1.5rem',
                            fontWeight: '700',
                            color: '#374151',
                            margin: '0 0 0.5rem'
                        }}>
                            {title}
                        </h3>
                        <p style={{ color: '#6b7280', margin: 0 }}>
                            {isEditing 
                                ? 'Update the time slot details'
                                : 'Create a new available time slot for patient appointments'
                            }
                        </p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                            gap: '1rem',
                            marginBottom: '1.5rem'
                        }}>
                            <div>
                                <label style={{
                                    display: 'block',
                                    marginBottom: '0.5rem',
                                    fontWeight: '600',
                                    color: '#374151',
                                    fontSize: '0.9rem'
                                }}>
                                    Start Time <span style={{ color: '#dc2626' }}>*</span>
                                </label>
                                <input
                                    type="datetime-local"
                                    name="startTime"
                                    defaultValue={schedule?.startTime ? 
                                        new Date(schedule.startTime).toISOString().slice(0, 16) : ''
                                    }
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem',
                                        border: '2px solid rgba(21, 128, 61, 0.2)',
                                        borderRadius: '8px',
                                        fontSize: '1rem',
                                        outline: 'none',
                                        boxSizing: 'border-box',
                                        transition: 'border-color 0.2s ease'
                                    }}
                                    onFocus={e => {
                                        e.target.style.borderColor = '#15803d';
                                    }}
                                    onBlur={e => {
                                        e.target.style.borderColor = 'rgba(21, 128, 61, 0.2)';
                                    }}
                                />
                            </div>
                            
                            <div>
                                <label style={{
                                    display: 'block',
                                    marginBottom: '0.5rem',
                                    fontWeight: '600',
                                    color: '#374151',
                                    fontSize: '0.9rem'
                                }}>
                                    End Time <span style={{ color: '#dc2626' }}>*</span>
                                </label>
                                <input
                                    type="datetime-local"
                                    name="endTime"
                                    defaultValue={schedule?.endTime ? 
                                        new Date(schedule.endTime).toISOString().slice(0, 16) : ''
                                    }
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem',
                                        border: '2px solid rgba(21, 128, 61, 0.2)',
                                        borderRadius: '8px',
                                        fontSize: '1rem',
                                        outline: 'none',
                                        boxSizing: 'border-box',
                                        transition: 'border-color 0.2s ease'
                                    }}
                                    onFocus={e => {
                                        e.target.style.borderColor = '#15803d';
                                    }}
                                    onBlur={e => {
                                        e.target.style.borderColor = 'rgba(21, 128, 61, 0.2)';
                                    }}
                                />
                            </div>
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <label style={{
                                display: 'block',
                                marginBottom: '0.5rem',
                                fontWeight: '600',
                                color: '#374151',
                                fontSize: '0.9rem'
                            }}>
                                Availability Status
                            </label>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <label style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    padding: '0.75rem 1rem',
                                    border: '2px solid rgba(34, 197, 94, 0.2)',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    backgroundColor: 'rgba(34, 197, 94, 0.05)',
                                    flex: 1,
                                    justifyContent: 'center'
                                }}>
                                    <input
                                        type="radio"
                                        name="available"
                                        value="true"
                                        defaultChecked={schedule?.available !== false}
                                        style={{ margin: 0 }}
                                    />
                                    <span>✅ Available</span>
                                </label>
                                
                                <label style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    padding: '0.75rem 1rem',
                                    border: '2px solid rgba(239, 68, 68, 0.2)',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    backgroundColor: 'rgba(239, 68, 68, 0.05)',
                                    flex: 1,
                                    justifyContent: 'center'
                                }}>
                                    <input
                                        type="radio"
                                        name="available"
                                        value="false"
                                        defaultChecked={schedule?.available === false}
                                        style={{ margin: 0 }}
                                    />
                                    <span>❌ Unavailable</span>
                                </label>
                            </div>
                        </div>

                        <div style={{ 
                            display: 'flex', 
                            gap: '1rem',
                            justifyContent: 'flex-end'
                        }}>
                            <button
                                type="button"
                                onClick={onClose}
                                style={{
                                    padding: '0.75rem 1.5rem',
                                    background: 'rgba(107, 114, 128, 0.1)',
                                    color: '#6b7280',
                                    border: '1px solid rgba(107, 114, 128, 0.2)',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    fontWeight: '500',
                                    fontSize: '1rem',
                                    transition: 'all 0.2s ease'
                                }}
                                onMouseEnter={e => {
                                    e.target.style.background = 'rgba(107, 114, 128, 0.15)';
                                }}
                                onMouseLeave={e => {
                                    e.target.style.background = 'rgba(107, 114, 128, 0.1)';
                                }}
                            >
                                Cancel
                            </button>
                            
                            <button
                                type="submit"
                                style={{
                                    padding: '0.75rem 1.5rem',
                                    background: 'linear-gradient(135deg, #15803d 0%, #14532d 100%)',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    fontWeight: '600',
                                    fontSize: '1rem',
                                    transition: 'all 0.2s ease',
                                    boxShadow: '0 4px 12px rgba(21, 128, 61, 0.3)'
                                }}
                                onMouseEnter={e => {
                                    e.target.style.transform = 'translateY(-1px)';
                                    e.target.style.boxShadow = '0 6px 16px rgba(21, 128, 61, 0.4)';
                                }}
                                onMouseLeave={e => {
                                    e.target.style.transform = 'translateY(0)';
                                    e.target.style.boxShadow = '0 4px 12px rgba(21, 128, 61, 0.3)';
                                }}
                            >
                                {isEditing ? 'Update Schedule' : 'Create Schedule'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ScheduleModal;
