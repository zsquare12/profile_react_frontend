import React, { useEffect, useState } from 'react';
import axios from 'axios';

import {
	Link
} from 'react-router-dom';

function SignIn() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [message, setMessage] = useState('');

	useEffect(() => {
		// check if user is logged in
		const token = localStorage.getItem('token');
		if (token) {
			window.location.href = '/'; //redirect to root URL
		}
	}, []);

	const handleLogin = () => {
		const apiUrl = 'https://sharktodo.smileplease.life/api/login/';
		// const apiUrl = 'https://sharktodo.smileplease.life/api/login/';

		axios.post(apiUrl, {
			username,
			password
		}).then(
			response => {
				const token = response.data.token;
				localStorage.setItem('token', token);
				setMessage('Login successful!')
				window.location.reload();
			}
		).catch(error => {
			console.log(error);
			setMessage(JSON.stringify(error.response.data))
		})

	};

	return (
		<div className='login'>
			<h1>SignIn</h1>
			<div>
				<label>Username</label>
				<input
					type="text"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					className='form-control'
				/>
				<label className='pass-label'>
					<li>password</li>
					<li><Link to='/reset-password'>Forget-password</Link></li>
				</label>
				
				<input
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					className='form-control'
				/>
				<button onClick={handleLogin} className='btn btn-primary'>Submit</button>
				<p>{message}</p>
			</div>
		</div>
	)
}

export default SignIn;