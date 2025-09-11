import React, { useState } from 'react';
import {
  Avatar,
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Grid,
  InputAdornment,
  IconButton,
  CircularProgress
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import ArrowBack from '@mui/icons-material/ArrowBack';
import Person from '@mui/icons-material/Person';
import Email from '@mui/icons-material/Email';
import Lock from '@mui/icons-material/Lock';

const API_URL = 'http://localhost:9097/api';

const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Please enter both Email ID and Password.');
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        localStorage.setItem('adminPendingEmail', email);
        navigate('/admin/otp');
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Invalid email or password.');
      }
    } catch (err) {
      setError('Failed to connect to the server. Please check if the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleTogglePasswordVisibility = () => setShowPassword(!showPassword);

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
        pt: { xs: 12, md: 2 },
      }}
    >
      <Button
        startIcon={<ArrowBack />}
        onClick={() => navigate('/')}
        sx={{
          position: 'absolute',
          top: { xs: 16, sm: 24 },
          left: { xs: 16, sm: 24 },
          textTransform: 'none',
          color: 'black',
          fontWeight: 600,
          '&:hover': { backgroundColor: 'action.hover' },
        }}
      >
        Back to Home
      </Button>

      <Grid container spacing={6} alignItems="center" justifyContent="center" sx={{ maxWidth: '1000px' }}>
        <Grid xs={12} md={7} sx={{ display: 'flex', justifyContent: 'center', order: { xs: 2, md: 1 } }}>
          <div
            dangerouslySetInnerHTML={{
              __html: `<lottie-player src="/Login.json" background="transparent" speed="1" style="width:100%; max-width:500px;" loop autoplay></lottie-player>`,
            }}
          />
        </Grid>

        <Grid xs={12} md={5} sx={{ order: { xs: 1, md: 2 } }}>
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
              mx: 'auto',
            }}
          >
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: 'primary.main', width: 75, height: 75 }}>
                  <Person sx={{ fontSize: '3.35rem' }} />
                </Avatar>
              </Box>

              <Typography variant="h4" component="h1" fontWeight="600" textAlign="center">
                Welcome Back
              </Typography>
              <Typography variant="body1" color="text.secondary" textAlign="center" sx={{ mb: 4 }}>
                Sign in to access your admin dashboard
              </Typography>

              <TextField
                label="Email ID"
                placeholder="Enter Your Email ID"
                fullWidth
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                variant="outlined"
                type="email"
                InputProps={{ startAdornment: (<InputAdornment position="start"><Email /></InputAdornment>) }}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
              />

              <TextField
                label="Password"
                placeholder="Enter Your Password"
                type={showPassword ? 'text' : 'password'}
                fullWidth
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                variant="outlined"
                InputProps={{
                  startAdornment: (<InputAdornment position="start"><Lock /></InputAdornment>),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
              />

              {error && (
                <Typography color="error" sx={{ mt: 2, textAlign: 'center' }}>
                  {error}
                </Typography>
              )}

              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={loading}
                sx={{ mt: 3, py: 1.5, borderRadius: '12px', textTransform: 'none', fontSize: '1rem' }}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminLogin;
