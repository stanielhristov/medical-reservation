import React from 'react';

const LandingHeader = ({ onLogin, onRegister }) => {
    return (
        <header style={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            padding: '1.5rem 2rem',
            boxShadow: '0 8px 32px rgba(34, 197, 94, 0.1)',
            border: '1px solid rgba(34, 197, 94, 0.1)',
            position: 'relative',
            zIndex: 10
        }}>
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{
                        width: '50px',
                        height: '50px',
                        background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 8px 20px rgba(34, 197, 94, 0.3)'
                    }}>
                        <span style={{ fontSize: '1.5rem', color: 'white' }}>🏥</span>
                    </div>
                    <h1 style={{
                        fontSize: '1.8rem',
                        fontWeight: '800',
                        color: '#374151',
                        margin: 0,
                        letterSpacing: '-0.02em'
                    }}>
                        MedReserve
                    </h1>
                </div>

                <nav style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '2rem'
                }}>
                    <a 
                        href="#features" 
                        style={{
                            color: '#6b7280',
                            textDecoration: 'none',
                            fontWeight: '600',
                            fontSize: '1rem',
                            transition: 'all 0.3s ease',
                            padding: '0.5rem 1rem',
                            borderRadius: '8px'
                        }}
                        onMouseEnter={e => {
                            e.target.style.color = '#22c55e';
                            e.target.style.background = 'rgba(34, 197, 94, 0.1)';
                        }}
                        onMouseLeave={e => {
                            e.target.style.color = '#6b7280';
                            e.target.style.background = 'transparent';
                        }}
                    >
                        Features
                    </a>
                    <a 
                        href="#about" 
                        style={{
                            color: '#6b7280',
                            textDecoration: 'none',
                            fontWeight: '600',
                            fontSize: '1rem',
                            transition: 'all 0.3s ease',
                            padding: '0.5rem 1rem',
                            borderRadius: '8px'
                        }}
                        onMouseEnter={e => {
                            e.target.style.color = '#22c55e';
                            e.target.style.background = 'rgba(34, 197, 94, 0.1)';
                        }}
                        onMouseLeave={e => {
                            e.target.style.color = '#6b7280';
                            e.target.style.background = 'transparent';
                        }}
                    >
                        About
                    </a>
                    <a 
                        href="#contact" 
                        style={{
                            color: '#6b7280',
                            textDecoration: 'none',
                            fontWeight: '600',
                            fontSize: '1rem',
                            transition: 'all 0.3s ease',
                            padding: '0.5rem 1rem',
                            borderRadius: '8px'
                        }}
                        onMouseEnter={e => {
                            e.target.style.color = '#22c55e';
                            e.target.style.background = 'rgba(34, 197, 94, 0.1)';
                        }}
                        onMouseLeave={e => {
                            e.target.style.color = '#6b7280';
                            e.target.style.background = 'transparent';
                        }}
                    >
                        Contact
                    </a>
                </nav>

                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button 
                        onClick={onLogin}
                        style={{
                            padding: '0.75rem 1.5rem',
                            background: 'transparent',
                            color: '#374151',
                            border: '2px solid rgba(34, 197, 94, 0.2)',
                            borderRadius: '12px',
                            cursor: 'pointer',
                            fontWeight: '600',
                            fontSize: '1rem',
                            transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={e => {
                            e.target.style.background = 'rgba(34, 197, 94, 0.1)';
                            e.target.style.borderColor = 'rgba(34, 197, 94, 0.3)';
                        }}
                        onMouseLeave={e => {
                            e.target.style.background = 'transparent';
                            e.target.style.borderColor = 'rgba(34, 197, 94, 0.2)';
                        }}
                    >
                        Sign In
                    </button>
                    <button 
                        onClick={onRegister}
                        style={{
                            padding: '0.75rem 1.5rem',
                            background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '12px',
                            cursor: 'pointer',
                            fontWeight: '600',
                            fontSize: '1rem',
                            transition: 'all 0.3s ease',
                            boxShadow: '0 4px 12px rgba(34, 197, 94, 0.3)'
                        }}
                        onMouseEnter={e => {
                            e.target.style.transform = 'translateY(-2px)';
                            e.target.style.boxShadow = '0 6px 20px rgba(34, 197, 94, 0.4)';
                        }}
                        onMouseLeave={e => {
                            e.target.style.transform = 'translateY(0)';
                            e.target.style.boxShadow = '0 4px 12px rgba(34, 197, 94, 0.3)';
                        }}
                    >
                        Get Started
                    </button>
                </div>
            </div>
        </header>
    );
};

export default LandingHeader;
