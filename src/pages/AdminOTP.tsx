import React from 'react';
import {
  Avatar, Box, TextField, Button, Typography, Paper, Grid, CircularProgress, Snackbar, Alert
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBack from '@mui/icons-material/ArrowBack';
import MarkEmailRead from '@mui/icons-material/MarkEmailRead';

const API_BASE_URL = import.meta.env.VITE_API_URL;

const AdminOTP: React.FC = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = React.useState('');
  const [error, setError] = React.useState('');
  const [pendingEmail, setPendingEmail] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  // State to manage the Snackbar alert
  const [alert, setAlert] = React.useState<{ message: string; severity: 'success' | 'error' } | null>(null);

  React.useEffect(() => {
    const email = localStorage.getItem('adminPendingEmail');
    if (email) {
      setPendingEmail(email);
    } else {
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (otp.length !== 6 || !/^\d{6}$/.test(otp)) {
      setError('Please enter a valid 6-digit OTP.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: pendingEmail, otp }),
      });

      const data = await response.json();

      if (response.ok && data.token) {
        localStorage.setItem('adminAuthToken', data.token);
        localStorage.setItem('adminAuthenticated', 'true');
        if (data.name) {
          localStorage.setItem('adminName', data.name);
        }
        localStorage.removeItem('adminPendingEmail');

        // Set the success alert state instead of calling toast
        setAlert({ message: 'OTP verified successfully', severity: 'success' });
        
        setTimeout(() => {
          navigate('/admin');
        }, 1000); // Increased delay slightly to allow user to see the message
      }
      else {
        const errorMessage = data.message || 'The OTP you entered is incorrect or expired.';
        setError(errorMessage);
        // Set the error alert state
        setAlert({ message: errorMessage, severity: 'error' });
      }
    } catch (err) {
      console.error('OTP verification error:', err);
      const errorMessage = 'Failed to connect to the server. Please try again.';
      setError(errorMessage);
       // Set the error alert state
      setAlert({ message: errorMessage, severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseAlert = () => {
    setAlert(null);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(to top right, #f0f4f8, #ffffff)',
        p: 2,
        pt: { xs: 12, md: 2 }
      }}
    >
      {/* Snackbar component for showing alerts */}
      <Snackbar
        open={!!alert}
        autoHideDuration={3000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseAlert}
          severity={alert?.severity || 'info'}
          sx={{ width: '100%' }}
        >
          {alert?.message}
        </Alert>
      </Snackbar>

      <Button
        startIcon={<ArrowBack />}
        onClick={() => navigate('/admin/login')}
        sx={{
          position: 'absolute',
          top: { xs: 16, sm: 24 },
          left: { xs: 16, sm: 24 },
          textTransform: 'none',
          color: 'black',
          fontWeight: 600,
          '&:hover': {
            backgroundColor: 'action.hover'
          }
        }}
      >
        Back
      </Button>

      <Grid container spacing={6} alignItems="center" justifyContent="center" sx={{ maxWidth: '1000px' }}>
        <Grid item xs={12} md={7} sx={{ display: 'flex', justifyContent: 'center', order: { xs: 2, md: 1 } }}>
          <div dangerouslySetInnerHTML={{
            __html: `<lottie-player src="/Login.json" background="transparent" speed="1" style="width:100%; max-width:500px;" loop autoplay></lottie-player>`
          }} />
        </Grid>

        <Grid item xs={12} md={5} sx={{ order: { xs: 1, md: 2 } }}>
          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, sm: 4 },
              borderRadius: '20px',
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
              border: '1px solid rgba(255, 255, 255, 0.18)',
              maxWidth: '400px',
              mx: 'auto'
            }}
          >
            <Box component="form" onSubmit={handleVerify}>
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: 'primary.main', width: 75, height: 75 }}>
                  <MarkEmailRead sx={{ fontSize: '3.35rem' }} />
                </Avatar>
              </Box>

              <Typography variant="h5" component="h1" fontWeight="600" textAlign="center" sx={{ mb: 2 }}>
                Check your email
              </Typography>
              <Typography variant="body1" color="text.secondary" textAlign="center" sx={{ mb: 3 }}>
                We've sent a 6-digit code to <strong>{pendingEmail}</strong>
              </Typography>
              <TextField
                label="6-Digit Code"
                fullWidth
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                sx={{
                  mb: 2,
                  '& .MuiOutlinedInput-root': { borderRadius: '12px' }
                }}
                inputProps={{
                  maxLength: 6,
                  style: {
                    textAlign: 'center',
                    fontSize: '1.2rem',
                    letterSpacing: '0.5rem'
                  }
                }}
              />
              {error && (
                <Typography color="error" sx={{ mb: 2, textAlign: 'center' }}>
                  {error}
                </Typography>
              )}
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={loading || otp.length !== 6}
                sx={{
                  mt: 1,
                  py: 1.5,
                  borderRadius: '12px',
                  textTransform: 'none',
                  fontSize: '1rem'
                }}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Verify OTP'}
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminOTP;