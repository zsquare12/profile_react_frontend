import { useState, useEffect } from 'react';
import axios from 'axios';

function useFetchData(apiUrl) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            axios.get(apiUrl, {
                headers: {
                    'Authorization': `Token ${token}`,
                },
            }).then((response) => {
                setData(response.data);
                setLoading(false);
                setIsLoggedIn(true);
            }).catch((error) => {
                setError(error);
                setLoading(false);
                const token = localStorage.getItem('token');
                if (token) {
                    localStorage.removeItem('token');
                }
            });
        } else {
            setLoading(false);
        }
    }, [apiUrl]);

    return { data, loading, error, isLoggedIn };
}

export default useFetchData;