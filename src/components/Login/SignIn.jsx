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

	const handleLogin = (e) => {
		e.preventDefault();
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
			<form onSubmit={handleLogin}>
				<label>Username</label>
				<input
					type="text"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					className='form-control'
					required
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
				<button type='submit' className='btn btn-primary mt-2'>Submit</button>
				<p>{message}</p>
			</form>
			<div>
				<Link to='/signup'>Create an account</Link>
			</div>
		</div>
	)
}

export default SignIn;