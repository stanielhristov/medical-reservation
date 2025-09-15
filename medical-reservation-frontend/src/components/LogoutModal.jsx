const LogoutModal = ({ isOpen, onConfirm, onCancel }) => {
    if (!isOpen) return null;

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
                borderRadius: '16px',
                padding: '2rem',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
                maxWidth: '400px',
                width: '90%',
                textAlign: 'center'
            }}>
                <div style={{
                    width: '60px',
                    height: '60px',
                    background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1rem',
                    boxShadow: '0 8px 24px rgba(34, 197, 94, 0.3)'
                }}>
                    <div style={{
                        width: '24px',
                        height: '24px',
                        position: 'relative'
                    }}>
                        <div style={{
                            position: 'absolute',
                            top: '4px',
                            left: '2px',
                            width: '12px',
                            height: '16px',
                            border: '3px solid white',
                            borderRight: 'none',
                            borderRadius: '6px 0 0 6px'
                        }} />
                        <div style={{
                            position: 'absolute',
                            top: '10px',
                            left: '12px',
                            width: '6px',
                            height: '3px',
                            background: 'white',
                            borderRadius: '2px'
                        }} />
                        <div style={{
                            position: 'absolute',
                            top: '8px',
                            left: '16px',
                            width: '3px',
                            height: '3px',
                            borderTop: '3px solid white',
                            borderRight: '3px solid white',
                            transform: 'rotate(-45deg)'
                        }} />
                    </div>
                </div>
                
                <h3 style={{
                    fontSize: '1.5rem',
                    fontWeight: '600',
                    color: '#374151',
                    margin: '0 0 1rem'
                }}>
                    Confirm Logout
                </h3>
                
                <p style={{
                    color: '#6b7280',
                    margin: '0 0 2rem',
                    lineHeight: '1.6'
                }}>
                    Are you sure you want to logout from your profile?
                </p>
                
                <div style={{
                    display: 'flex',
                    gap: '1rem',
                    justifyContent: 'center'
                }}>
                    <button
                        onClick={onCancel}
                        style={{
                            padding: '0.75rem 1.5rem',
                            background: 'rgba(107, 114, 128, 0.1)',
                            color: '#6b7280',
                            border: '1px solid rgba(107, 114, 128, 0.2)',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontWeight: '500',
                            transition: 'all 0.3s ease'
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
                        onClick={onConfirm}
                        style={{
                            padding: '0.75rem 1.5rem',
                            background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontWeight: '500',
                            transition: 'all 0.3s ease',
                            boxShadow: '0 4px 12px rgba(220, 38, 38, 0.25)'
                        }}
                        onMouseEnter={e => {
                            e.target.style.transform = 'translateY(-1px)';
                            e.target.style.boxShadow = '0 6px 16px rgba(220, 38, 38, 0.3)';
                        }}
                        onMouseLeave={e => {
                            e.target.style.transform = 'translateY(0)';
                            e.target.style.boxShadow = '0 4px 12px rgba(220, 38, 38, 0.25)';
                        }}
                    >
                        Yes, Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LogoutModal;
