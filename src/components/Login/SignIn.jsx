import React, { useEffect, useState } from 'react';
import axios from 'axios';

function SignIn() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [message, setMessage] = useState('msg');

	useEffect(() => {
		// check if user is logged in
		const token = localStorage.getItem('token');
		if (token) {
			window.location.href = '/'; //redirect to root URL
		}
	}, []);

	const handleLogin = () => {
		const apiUrl = 'http://localhost:8000/api/login/';

		axios.post(apiUrl, { username, password }).then(
			response => {
				const token = response.data.token;
				localStorage.setItem('token', token);
				setMessage('Login successful!')
				window.location.reload();
			}
		).catch(error => {
			setMessage("Invalid username and password")
		})

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
				<label>password</label>
				<input
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button onClick={handleLogin}>Submit</button>
				<p>{message}</p>
			</div>
		</div>
	)
}

export default SignIn;