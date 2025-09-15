import React from 'react';

const BackgroundDecorations = () => {
    return (
        <>
            <div style={{
                position: 'absolute',
                top: '5%',
                right: '5%',
                width: '300px',
                height: '300px',
                background: 'rgba(34, 197, 94, 0.05)',
                borderRadius: '50%',
                zIndex: 0
            }} />
            
            <div style={{
                position: 'absolute',
                bottom: '10%',
                left: '0%',
                width: '250px',
                height: '250px',
                background: 'rgba(22, 163, 74, 0.04)',
                borderRadius: '50%',
                zIndex: 0
            }} />

            <div style={{
                position: 'absolute',
                top: '40%',
                left: '80%',
                width: '150px',
                height: '150px',
                background: 'rgba(16, 185, 129, 0.03)',
                borderRadius: '50%',
                zIndex: 0
            }} />
        </>
    );
};

export default BackgroundDecorations;
