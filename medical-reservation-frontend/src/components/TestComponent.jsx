import { useEffect, useState } from 'react';
import axios from '../api/axios.jsx';

export default function TestComponent() {
    const [message, setMessage] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('/test')
            .then(res => setMessage(res.data))
            .catch(err => setError('Error: ' + (err.response?.data || err.message)));
    }, []);

    if (error) return <div style={{color: 'red'}}>{error}</div>;

    return (
        <div>
            <h1>Message from backend:</h1>
            <p>{message || 'Loading...'}</p>
        </div>
    );
}
