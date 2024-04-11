import React from 'react';
import useFetchData from './useFetchData';

function Home() {
    const apiUrl = 'http://localhost:8000/api/task/';
    const { data, loading, error, isLoggedIn } = useFetchData(apiUrl);

    let dataElements = null;

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    if (isLoggedIn) {
        dataElements = data.map((task, index) => (
            <li key={index}>{task.title}</li>
        ));
    } else {
        dataElements = <li>"Please LoginIn first"</li>;
    }

    return (
        <div>
            <h1>Tasks</h1>
            <ul>
                {dataElements}
            </ul>
        </div>
    );
}

export default Home;
