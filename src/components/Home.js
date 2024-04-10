import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Home() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        //Define the Django API endpoint
        const apiUrl = 'http://localhost:8000/api/profiles/'

        //fetch data from Django API using axios
        axios.get(apiUrl).then(
            (response) => {
                setData(response.data);
                setLoading(false);
            }
        ).catch(
            (error) => {
                setError(error);
                setLoading(false);
            }
        )

    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>

    const data_element = data.map((user) => <li>{ user.username }</li>)
    return (
        <div>
            <ul>
                {data_element}
            </ul>
        </div>
    )
}

export default Home;