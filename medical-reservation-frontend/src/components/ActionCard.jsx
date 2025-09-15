const ActionCard = ({ 
    title, 
    description, 
    icon, 
    buttonText, 
    buttonIcon, 
    onClick, 
    color = '#22c55e',
    colorSecondary = '#16a34a'
}) => {
    return (
        <div style={{
            background: 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(20px)',
            borderRadius: '24px',
            padding: '2.5rem',
            boxShadow: `0 12px 32px ${color}1A`,
            border: `1px solid ${color}26`,
            transition: 'all 0.4s ease',
            cursor: 'pointer',
            position: 'relative',
            overflow: 'hidden'
        }}
        onClick={onClick}
        onMouseEnter={e => {
            e.currentTarget.style.transform = 'translateY(-8px)';
            e.currentTarget.style.boxShadow = `0 20px 48px ${color}33`;
        }}
        onMouseLeave={e => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = `0 12px 32px ${color}1A`;
        }}>
            <div style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                width: '100px',
                height: '100px',
                background: `radial-gradient(circle, ${color}1A 0%, transparent 70%)`,
                borderRadius: '50%'
            }} />
            
            <div style={{
                width: '72px',
                height: '72px',
                background: `linear-gradient(135deg, ${color} 0%, ${colorSecondary} 100%)`,
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '2rem',
                boxShadow: `0 12px 32px ${color}4D`,
                position: 'relative'
            }}>
                <span style={{ fontSize: '2.2rem', color: 'white' }}>{icon}</span>
                <div style={{
                    position: 'absolute',
                    inset: '-2px',
                    background: 'linear-gradient(45deg, transparent, rgba(255,255,255,0.2), transparent)',
                    borderRadius: '22px',
                    zIndex: -1
                }} />
            </div>
            
            <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                color: '#374151',
                margin: '0 0 1rem',
                letterSpacing: '-0.025em'
            }}>
                {title}
            </h3>
            
            <p style={{
                color: '#6b7280',
                margin: '0 0 2rem',
                lineHeight: '1.6',
                fontSize: '1rem'
            }}>
                {description}
            </p>
            
            <button style={{
                background: `linear-gradient(135deg, ${color} 0%, ${colorSecondary} 100%)`,
                color: 'white',
                border: 'none',
                padding: '1rem 2rem',
                borderRadius: '14px',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '1rem',
                transition: 'all 0.3s ease',
                boxShadow: `0 6px 20px ${color}40`,
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
            }}>
                <span>{buttonIcon}</span>
                {buttonText}
            </button>
        </div>
    );
};

export default ActionCard;
