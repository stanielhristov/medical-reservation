import React from 'react';
import { createPortal } from 'react-dom';

const DeleteConfirmationDialog = ({ 
    isOpen, 
    onConfirm, 
    onCancel, 
    title = "Delete Confirmation",
    message = "Are you sure you want to delete this item?",
    confirmText = "Yes",
    cancelText = "No",
    icon = "🗑️"
}) => {
    if (!isOpen) return null;

    const content = (
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
                    {icon}
                </div>
                
                <h3 style={{
                    margin: '0 0 1rem 0',
                    color: '#dc2626',
                    fontSize: '1.25rem',
                    fontWeight: '600'
                }}>
                    {title}
                </h3>
                
                <p style={{
                    margin: '0 0 2rem 0',
                    color: '#374151',
                    lineHeight: '1.5'
                }}>
                    {message}
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
                            border: '1px solid #d1d5db',
                            borderRadius: '8px',
                            background: 'white',
                            color: '#374151',
                            cursor: 'pointer',
                            fontSize: '1rem',
                            fontWeight: '500',
                            transition: 'all 0.2s ease'
                        }}
                        onMouseOver={(e) => {
                            e.target.style.background = '#f9fafb';
                        }}
                        onMouseOut={(e) => {
                            e.target.style.background = 'white';
                        }}
                    >
                        {cancelText}
                    </button>
                    
                    <button
                        onClick={onConfirm}
                        style={{
                            padding: '0.75rem 1.5rem',
                            border: 'none',
                            borderRadius: '8px',
                            background: '#dc2626',
                            color: 'white',
                            cursor: 'pointer',
                            fontSize: '1rem',
                            fontWeight: '500',
                            transition: 'all 0.2s ease'
                        }}
                        onMouseOver={(e) => {
                            e.target.style.background = '#b91c1c';
                        }}
                        onMouseOut={(e) => {
                            e.target.style.background = '#dc2626';
                        }}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );

    return createPortal(content, document.body);
};

export default DeleteConfirmationDialog;
