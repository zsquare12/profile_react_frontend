import axios from 'axios';
import React, { useEffect, useState } from 'react';

function EmailVerifyOTP(props) {
    const [otp, setOtp] = useState('');
    const [message, setMessage] = useState('');

    const handleOtpVerification = () => {
        const apiUrl = 'https://sharktodo.smileplease.life/api/sign-up/verify-otp/';
        // axios.post(apiUrl, {'username'})
        setMessage(`verifying the OTP! wait... ${props.username}`)
        axios.post(
            apiUrl,
            { 'username': props.username, 'otp': otp }
        ).then(Response => {
            setMessage('Email Verified successfully :) ')
            window.location.href = '/signin';
        }).catch(error => {
            setMessage(JSON.stringify(error.response.data));
            console.log(error);
        })
    };

    const handleOtpReset = () => {
        props.onSendOtp();
        setMessage('otp resent successfully ✔️');
    }

    return (
        <div className='login'>
            <h1>OTP Verification</h1>
            <p>check your Registered email "{props.useremail}" inbox for the OTP</p>
            <div>
                <label>OTP</label>
                <input
                    type="number"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className='form-control'
                />

                <button onClick={handleOtpReset} className='btn btn-primary'>re-sent</button>
                <hr></hr>
                <button onClick={handleOtpVerification} className='btn btn-success'>Verify</button>
                <p>{message}</p>
            </div>
        </div>
    )
}

export default EmailVerifyOTP;