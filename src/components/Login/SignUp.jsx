import axios from 'axios';
import React, { useEffect, useState } from 'react';

function SignUp() {
	const [username, setUsername] = useState('');
	const [useremail, setUseremail] = useState('')
	const [password, setPassword] = useState('');
	const [repassword, setRepassword] = useState('');
	const [message, setMessage] = useState('');

	useEffect(() => {
		// check if user is logged in
		const token = localStorage.getItem('token');
		if (token) {
			window.location.href = '/'; //redirect to root URL
		}
	})

	const handleLogin = () => {
		const apiUrl = 'http://localhost:8000/api/profiles/';
		if (password == repassword) {
			axios.post(apiUrl, {
				username: username,
				email: useremail,
				password: password
			}).then(
				Response => {
					setMessage('Registration Successful :) ')
					window.location.href = '/signin';
				}
			).catch(error => {
				setMessage(String(error));
			})
		} else {
			setMessage('passwords not match');
		}
	};

	return (
		<div className='login'>
			<h1>SignUp</h1>
			<div>

				<label>Username</label>
				<input
					type="text"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					className='form-control'
				/>

				<label>Email</label>
				<input
					type="email"
					value={useremail}
					onChange={(e) => setUseremail(e.target.value)}
					className='form-control'
				/>

				<label>password</label>
				<input
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					className='form-control'
				/>

				<label>re-password</label>
				<input
					type="password"
					value={repassword}
					onChange={(e) => setRepassword(e.target.value)}
					className='form-control'
				/>

				<button onClick={handleLogin} className='btn btn-primary'>Submit</button>
				<p>{message}</p>
			</div>
		</div>
	)
}

export default SignUp;