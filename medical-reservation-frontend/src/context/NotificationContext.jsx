import React, { createContext, useContext, useState, useEffect } from 'react';

const NotificationContext = createContext();

export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotification must be used within a NotificationProvider');
    }
    return context;
};

export const NotificationProvider = ({ children }) => {
    const [notification, setNotification] = useState({
        isOpen: false,
        title: '',
        message: '',
        type: 'info'
    });

    useEffect(() => {
        
        const originalAlert = window.alert;
        window.alert = (message) => {
            console.log('🚨 Alert intercepted globally:', message);
            showNotification('System Notice', String(message), 'warning');
        };

        const originalConfirm = window.confirm;
        window.confirm = (message) => {
            console.log('🚨 Confirm intercepted globally:', message);

            showNotification('Confirmation', String(message), 'warning');
            return true; 
        };

        return () => {
            window.alert = originalAlert;
            window.confirm = originalConfirm;
        };
    }, []);

    const showNotification = (title, message, type = 'info') => {
        setNotification({
            isOpen: true,
            title,
            message,
            type
        });
    };

    const hideNotification = () => {
        setNotification({
            isOpen: false,
            title: '',
            message: '',
            type: 'info'
        });
    };

    const value = {
        showNotification,
        hideNotification
    };

    return (
        <NotificationContext.Provider value={value}>
            {children}

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
                    zIndex: 10002
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
                            {notification.type === 'error' ? '❌' : 
                             notification.type === 'warning' ? '⚠️' : 
                             notification.type === 'success' ? '✅' : 'ℹ️'}
                        </div>
                        
                        <h3 style={{
                            margin: '0 0 1rem 0',
                            color: notification.type === 'error' ? '#dc2626' : 
                                   notification.type === 'warning' ? '#d97706' :
                                   notification.type === 'success' ? '#15803d' : '#2563eb',
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
                            onClick={hideNotification}
                            style={{
                                padding: '0.75rem 1.5rem',
                                border: 'none',
                                borderRadius: '8px',
                                background: notification.type === 'error' ? '#dc2626' : 
                                           notification.type === 'warning' ? '#d97706' :
                                           notification.type === 'success' ? '#15803d' : '#2563eb',
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

        </NotificationContext.Provider>
    );
};
