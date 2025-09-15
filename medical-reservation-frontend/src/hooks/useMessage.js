import { useState, useEffect, useCallback } from 'react';

export const useMessage = () => {
    const [message, setMessage] = useState({ type: '', text: '' });
    const [messageTimeout, setMessageTimeout] = useState(null);

    const setMessageWithAutoFade = useCallback((type, text, duration = 3000) => {
        if (messageTimeout) {
            clearTimeout(messageTimeout);
        }

        setMessage({ type, text, fadeOut: false });

        if (type === 'success') {
            const timeout = setTimeout(() => {
                setMessage(prev => ({ ...prev, fadeOut: true }));

                setTimeout(() => {
                    setMessage({ type: '', text: '' });
                    setMessageTimeout(null);
                }, 500);
            }, duration);
            setMessageTimeout(timeout);
        }
    }, [messageTimeout]);

    useEffect(() => {
        return () => {
            if (messageTimeout) {
                clearTimeout(messageTimeout);
            }
        };
    }, [messageTimeout]);

    return {
        message,
        setMessage,
        setMessageWithAutoFade
    };
};
