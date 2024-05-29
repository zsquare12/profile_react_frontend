import axios from 'axios';
import React, { useEffect, useState } from 'react';
import EmailVerifyOTP from './EmailVerifyOTP'

function SignUp() {
	const [username, setUsername] = useState('');
	const [useremail, setUseremail] = useState('')
	const [password, setPassword] = useState('');
	const [repassword, setRepassword] = useState('');
	const [message, setMessage] = useState('');
	const [showOtpPage, setShowOtpPage] = useState(false);


	// check if user is logged in
	const token = localStorage.getItem('token');
	if (token) {
		window.location.href = '/'; //redirect to root URL
	}

	const sendOtp = () => {
		axios.post(
			'https://sharktodo.smileplease.life/api/sign-up/send-otp/',
			{ username: username }
		).then(Response => {
			setMessage('OTP send successfully :) to your email');
			// window.location.href = '/signup/verify-otp';
			setShowOtpPage(true);
		}).catch(error => {
			setMessage(JSON.stringify(error.response.data));
		})
	}

	const handleLogin = (e) => {
		e.preventDefault();
		const apiUrl = 'https://sharktodo.smileplease.life/api/profiles/';
		if (password == repassword) {
			axios.post(apiUrl, {
				username: username,
				email: useremail,
				password: password
			}).then(Response => {
				setMessage('Registration Successful :) ')
				sendOtp();
			}
			).catch(error => {
				setMessage(JSON.stringify(error.response.data));
				console.log(error.response.data);
			})
		} else {
			setMessage('passwords not match');
		}
	};

	const signUpForm = (
		<div className='login'>
			<h1>SignUp</h1>
			<form onSubmit={handleLogin}>

				<label>Username</label>
				<input
					type="text"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					className='form-control'
					required
				/>

				<label>Email</label>
				<input
					type="email"
					value={useremail}
					onChange={(e) => setUseremail(e.target.value)}
					className='form-control'
					required
				/>

				<label>password</label>
				<input
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					className='form-control'
					required
				/>

				<label>re-password</label>
				<input
					type="password"
					value={repassword}
					onChange={(e) => setRepassword(e.target.value)}
					className='form-control'
					required
				/>

				<button type='submit' className='btn btn-primary mt-2'>Submit</button>
				<p>{message}</p>
			</form>
		</div>
	)


	return (
		<>
			{showOtpPage ? <EmailVerifyOTP username={username} useremail={useremail} onSendOtp={sendOtp} /> : signUpForm}
		</>
	)
}

export default SignUp;