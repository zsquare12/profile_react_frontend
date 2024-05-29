import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const PasswordReset = () => {
    const [username, setUsername] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [step, setStep] = useState(1); // Step 1: OTP verification, Step 2: Reset password
    const [otpSent, setOtpSent] = useState(false);
    const [canResend, setCanResend] = useState(true);


    const handleUsernameChange = (e) => setUsername(e.target.value);
    const handleOtpChange = (e) => setOtp(e.target.value);
    const handleNewPasswordChange = (e) => setNewPassword(e.target.value);
    const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

    const handleSendOtp = () => {
        // Simulate sending OTP
        setOtpSent(true);
        alert('OTP sent');
    };

    const handleOtpSubmit = (e) => {
        e.preventDefault();
        // Simulate OTP verification
        if (otp === '123456') {
            setStep(2);
        } else {
            alert('Invalid OTP');
        }
    };

    const handlePasswordResetSubmit = (e) => {
        e.preventDefault();
        if (newPassword === confirmPassword) {
            // Simulate password reset
            alert('Password has been reset successfully');
            // Reset state
            setUsername('');
            setOtp('');
            setNewPassword('');
            setConfirmPassword('');
            setStep(1);
            setOtpSent(false);
        } else {
            alert('Passwords do not match');
        }
    };

    const otppage_jsx = (<>
        <div className="row justify-content-center">
            <div className="col-md-6">
                <h3 className="text-center">OTP Verification</h3>
                <form onSubmit={handleOtpSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Enter Username</label>
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            value={username}
                            onChange={handleUsernameChange}
                            required
                        />
                    </div>
                    <button type="button" className="btn btn-primary btn-block m-2" onClick={handleSendOtp} disabled={false}>
                        {otpSent ? "re-send OTP" : "send OTP"}
                    </button>
                    <hr></hr>
                    <div className="form-group">
                        <label htmlFor="otp">Enter OTP</label>
                        <input
                            type="text"
                            className="form-control"
                            id="otp"
                            value={otp}
                            onChange={handleOtpChange}
                            required
                            disabled={!otpSent}
                        />
                    </div>
                    <button type="submit" className="btn btn-success btn-block m-2" disabled={!otpSent}>
                        Verify OTP
                    </button>
                </form>
            </div>
        </div>
    </>)

    const resetpage_jsx = (<>

        <div className="row justify-content-center">
            <div className="col-md-6">
                <h3 className="text-center">Reset Password</h3>
                <form onSubmit={handlePasswordResetSubmit}>
                    <div className="form-group">
                        <label htmlFor="newPassword">New Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="newPassword"
                            value={newPassword}
                            onChange={handleNewPasswordChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm New Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary btn-block m-2">
                        Reset Password
                    </button>
                </form>
            </div>
        </div>
    </>)

    return (
        <div className="container">
            {step === 1 ? (otppage_jsx) : (resetpage_jsx)}
        </div>
    );
};

export default PasswordReset;
