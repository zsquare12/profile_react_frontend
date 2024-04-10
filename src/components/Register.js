import React, { useState } from 'react';

function Register() {
    const [username, setUsername] = useState('');
    const [useremail, setUseremail] = useState('')
    const [password, setPassword] = useState('');
    const [repassword, setRepassword] = useState('');
    const [message, setMessage] = useState('msg');

    const handleLogin = () => {
        if (username === 'admin' && password === 'password') {
            setMessage('Login successful!');
        } else {
            setMessage('Invalid Username and password')
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <div style={{ display: 'flex', flexDirection: 'column', width: '500px', }}>

                <label>Username</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <label>Email</label>
                <input
                    type="email"
                    value={useremail}
                    onChange={(e) => setUseremail(e.target.value)}
                />

                <label>password</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <label>re-password</label>
                <input
                    type="password"
                    value={repassword}
                    onChange={(e) => setRepassword(e.target.value)}
                />

                <button onClick={handleLogin}>Submit</button>
                <p>{message}</p>
            </div>
        </div>
    )
}

export default Register;