import { useEffect, useState } from 'react';

import {
    BrowserRouter as Router,
    Route,
    Routes,
    Link
} from 'react-router-dom';

import useFetchData from './useFetchData';

function Header() {
    const apiUrl = 'http://localhost:8000/api/profiles'
    const { data, loading, error, isLoggedIn } = useFetchData(apiUrl);
    const [loginshow, setLoginshow] = useState('')

    useEffect(() => {
        if (loading) { setLoginshow("Loading..."); }
        if (error) { setLoginshow(`Error: ${error.message}`); }
        if (isLoggedIn) { setLoginshow('user is logged in'); }

    }, [loading, error, isLoggedIn]);

    var link_to_show = null

    const logoutHandle = () => {
        localStorage.removeItem('token');
        window.location.reload();
    }

    if (isLoggedIn) {
        link_to_show = <>
            <li>Hello  user {JSON.stringify(data, null, 2)}</li>
            <li><button onClick={logoutHandle}>Logout</button></li>
        </>
    } else {
        link_to_show = <>
            <li><Link to='/login'>Login</Link></li>
            <li><Link to='/register'>Register</Link></li>
        </>
    }


    return <>
        <h3>this is the Header | {loginshow}</h3>
        <nav>
            <ul>
                <li><Link to='/'>Home</Link></li>
                {link_to_show}
            </ul>
        </nav>

    </>
}

export default Header;