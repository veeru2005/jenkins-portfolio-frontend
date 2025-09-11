import React from 'react';
import { Box, Container, TextField, Button, Typography, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AdminResetPassword: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [otpRequested, setOtpRequested] = React.useState(false);
  const [otpVerified, setOtpVerified] = React.useState(false);
  const [otp, setOtp] = React.useState('');
  const [error, setError] = React.useState('');
  const [info, setInfo] = React.useState('');

  const handleRequestOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
   
    const generated = Math.floor(100000 + Math.random() * 900000).toString();
    localStorage.setItem(`adminResetOtp_${email}`, generated);
    setOtpRequested(true);
    setInfo(`OTP sent to ${email}. For demo use ${generated}.`);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const expected = localStorage.getItem(`adminResetOtp_${email}`);
    if (!expected) {
      setError('No OTP requested for this email');
      return;
    }
    if (otp === expected) {
      setOtpVerified(true);
      setInfo('OTP verified. Please set your new password.');
      localStorage.removeItem(`adminResetOtp_${email}`);
    } else {
      setError('Invalid OTP');
    }
  };

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!otpVerified) {
      setError('Please verify OTP first');
      return;
    }
    if (!newPassword) {
      setError('Please enter a new password');
      return;
    }
    if (!confirmPassword) {
      setError('Please confirm your new password');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    // Demo: store a flag in localStorage to indicate password reset using email key
    localStorage.setItem(`adminPasswordFor_${email}`, newPassword);
    setInfo('Password reset successful. Redirecting to login...');
    setTimeout(() => navigate('/admin/login'), 1000);
  };

  return (
    <Box className="admin-root" sx={{ py: 8 }}>
      <Container maxWidth="sm">
        <Paper sx={{ p: 4 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>Reset Password</Typography>
          <form onSubmit={otpRequested ? (otpVerified ? handleReset : handleVerifyOtp) : handleRequestOtp}>
            {!otpVerified && (
              <TextField
                label="Email"
                type="email"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ mb: 2 }}
                inputProps={{ readOnly: otpRequested }}
              />
            )}

            {otpRequested && !otpVerified && (
              <>
                <Typography variant="body2" sx={{ mb: 2 }}>{info}</Typography>
                <TextField
                  label="OTP"
                  fullWidth
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  sx={{ mb: 2 }}
                />
              </>
            )}

            {otpVerified && (
              <>
                <TextField
                  label="New Password"
                  type="password"
                  fullWidth
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Confirm New Password"
                  type="password"
                  fullWidth
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  sx={{ mb: 2 }}
                />
              </>
            )}

            {error && (
              <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>
            )}

            <Button type="submit" variant="contained">
              {otpRequested ? (otpVerified ? 'Reset Password' : 'Verify OTP') : 'Request OTP'}
            </Button>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default AdminResetPassword;
