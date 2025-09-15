const AppHeader = ({ user, onLogout }) => {
    return (
        <header style={{
            background: 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(20px)',
            padding: '1.5rem 2rem',
            boxShadow: '0 8px 32px rgba(34, 197, 94, 0.12), 0 4px 16px rgba(0, 0, 0, 0.04)',
            position: 'relative',
            zIndex: 1,
            width: '100%',
            boxSizing: 'border-box',
            borderBottom: '1px solid rgba(34, 197, 94, 0.15)'
        }}>
            <div style={{
                maxWidth: '1400px',
                margin: '0 auto',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                    <div style={{
                        width: '56px',
                        height: '56px',
                        background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                        borderRadius: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 8px 24px rgba(34, 197, 94, 0.3)',
                        position: 'relative'
                    }}>
                        <span style={{ fontSize: '1.75rem', color: 'white' }}>🩺</span>
                        <div style={{
                            position: 'absolute',
                            top: '-2px',
                            right: '-2px',
                            width: '16px',
                            height: '16px',
                            background: '#10b981',
                            borderRadius: '50%',
                            border: '2px solid white'
                        }} />
                    </div>
                    <div>
                        <h1 style={{
                            fontSize: '1.6rem',
                            fontWeight: '700',
                            color: '#374151',
                            margin: '0 0 0.25rem',
                            letterSpacing: '-0.025em'
                        }}>
                            Healthcare Portal
                        </h1>
                        <p style={{
                            fontSize: '0.85rem',
                            color: '#6b7280',
                            margin: 0,
                            fontWeight: '500'
                        }}>
                            Healthcare Management System
                        </p>
                    </div>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        background: 'rgba(34, 197, 94, 0.05)',
                        padding: '0.75rem 1.25rem',
                        borderRadius: '12px',
                        border: '1px solid rgba(34, 197, 94, 0.1)'
                    }}>
                        <div style={{
                            width: '36px',
                            height: '36px',
                            background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                            borderRadius: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 4px 12px rgba(34, 197, 94, 0.2)'
                        }}>
                            <span style={{ fontSize: '1.2rem', color: 'white' }}>👤</span>
                        </div>
                        <div>
                            <span style={{ 
                                color: '#374151', 
                                fontSize: '0.95rem',
                                fontWeight: '600',
                                display: 'block'
                            }}>
                                {user.fullName || user.email || 'User'}
                            </span>
                            <span style={{ 
                                color: '#22c55e', 
                                fontSize: '0.8rem',
                                fontWeight: '500',
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em'
                            }}>
                                {user.role || 'USER'}
                            </span>
                        </div>
                    </div>
                    
                    <button 
                        onClick={onLogout}
                        style={{
                            padding: '0.875rem 1.5rem',
                            background: 'rgba(248, 113, 113, 0.1)',
                            color: '#dc2626',
                            border: '1px solid rgba(248, 113, 113, 0.2)',
                            borderRadius: '12px',
                            cursor: 'pointer',
                            fontWeight: '600',
                            fontSize: '0.9rem',
                            transition: 'all 0.3s ease',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}
                        onMouseEnter={e => {
                            e.target.style.background = 'rgba(248, 113, 113, 0.15)';
                            e.target.style.transform = 'translateY(-2px)';
                            e.target.style.boxShadow = '0 6px 20px rgba(248, 113, 113, 0.15)';
                        }}
                        onMouseLeave={e => {
                            e.target.style.background = 'rgba(248, 113, 113, 0.1)';
                            e.target.style.transform = 'translateY(0)';
                            e.target.style.boxShadow = 'none';
                        }}
                    >
                        <span>🚪</span>
                        Logout
                    </button>
                </div>
            </div>
        </header>
    );
};

export default AppHeader;
