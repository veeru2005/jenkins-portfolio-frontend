import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Container, Typography, Stack } from '@mui/material';
import AdminNavbar from './AdminNavbar';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';

const AdminPanel: React.FC = () => {
  const navigate = useNavigate();

  // --- THIS IS THE FIX ---
  // This code runs as soon as the component tries to load.
  // It checks for the login token. If it's not there, it immediately
  // redirects to the login page. This method is more robust than a wrapper.
  useEffect(() => {
    const token = localStorage.getItem('adminAuthToken');
    if (!token) {
      navigate('/admin/login', { replace: true });
    }
  }, [navigate]);

  return (
    <AdminNavbar>
      <Container
        maxWidth="lg"
        sx={{
          py: { xs: 3, md: 4 },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          flex: 1,
        }}
      >
        <Box sx={{ mb: { xs: 3, md: 2 } }}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 'bold',
              color: 'primary.main',
              fontSize: { xs: '1.75rem', md: '3rem' }
            }}
          >
            Welcome to Your Dashboard
          </Typography>
        </Box>

        <Box sx={{ my: { xs: 3, md: 0 } }}>
          <div dangerouslySetInnerHTML={{ __html: `<lottie-player src="/Admin.json" background="transparent" speed="1" style="width:100%;max-width:625px;height:auto;" loop autoplay></lottie-player>` }} />
        </Box>

        <Box sx={{ mt: { xs: 2, md: 2 } }}>
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={2}
          >
            <Box sx={{ mt: 2, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Box sx={{ mt: { xs: 2, md: 2 } }}>
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                  <Box
                    sx={{
                      flex: 1, p: 2, border: '1px solid',
                      borderColor: 'divider', borderRadius: 2, bgcolor: 'background.paper',
                      display: 'flex', alignItems: 'center', gap: 1.5
                    }}
                  >
                    <WorkOutlineIcon color="primary" fontSize="large" />
                    <Typography variant="h6" color="text.secondary" fontSize="medium">
                      Easily manage your projects by adding new ones, updating existing entries, and showcasing your latest accomplishments.
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      flex: 1, p: 2, border: '1px solid',
                      borderColor: 'divider', borderRadius: 2, bgcolor: 'background.paper',
                      display: 'flex', alignItems: 'center', gap: 1.5
                    }}
                  >
                    <WorkspacePremiumIcon color="primary" fontSize="large" />
                    <Typography variant="h6" color="text.secondary" fontSize="medium">
                      Easily organize and update your certifications to reflect your latest skills and achievements.
                    </Typography>
                  </Box>
                </Stack>
              </Box>
            </Box>
          </Stack>
        </Box>
      </Container>
    </AdminNavbar>
  );
};

export default AdminPanel;