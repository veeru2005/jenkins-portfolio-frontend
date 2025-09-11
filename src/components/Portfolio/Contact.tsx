import React, { useState } from 'react';
import {
  Box,
  Typography,
  Container,
  Card,
  CardContent,
  TextField,
  Button,
  IconButton,
  Alert,
  Snackbar,
  CircularProgress // <-- NEW: Import CircularProgress
} from '@mui/material';
import {
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  LinkedIn as LinkedInIcon,
  GitHub as GitHubIcon,
  Send as SendIcon
} from '@mui/icons-material';

// Interface for the form's state
interface IFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<IFormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [errorAlert, setErrorAlert] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false); // <-- NEW: Add loading state

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true); // <-- NEW: Set loading to true
    
    try {
      // We are now ONLY calling your backend to send the email.
      const API_BASE_URL = import.meta.env.VITE_API_URL;

      const response = await fetch(`${API_BASE_URL}/api/contact/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      

      if (!response.ok) {
        const errorBody = await response.text();
        console.error(`Backend returned an error: ${response.status} ${response.statusText}`);
        console.error("Error details:", errorBody);
        // This will trigger the catch block and show the error alert.
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // If the email sends successfully:
      setShowAlert(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      
    } catch (error) {
      // This will catch network errors, CORS errors, or the error thrown above.
      console.error("Failed to send message:", error);
      setErrorAlert(true);
    } finally {
      setIsLoading(false); // <-- NEW: Set loading to false after try/catch
    }
  };

  const contactInfo = [
    {
      icon: <EmailIcon sx={{ fontSize: 30, color: '#1976d2' }} />,
      title: 'Email',
      value: 'sunkavalli.veerendra1973@gmail.com',
      link: '#'
    },
    {
      icon: <PhoneIcon sx={{ fontSize: 30, color: '#1976d2' }} />,
      title: 'Phone',
      value: '+91 7995762616',
      link: '#'
    },
    {
      icon: <LocationIcon sx={{ fontSize: 30, color: '#1976d2' }} />,
      title: 'Location',
      value: 'Rajahmundry, Andhra Pradesh, India',
      link: '#'
    }
  ];

  const socialLinks = [
    { icon: <LinkedInIcon />, url: 'https://www.linkedin.com/in/veerendra-chowdary-sunkavalli-513b58309/', label: 'LinkedIn' },
    { icon: <GitHubIcon />, url: 'https://github.com/veeru2005', label: 'GitHub' },
  ];

  return (
    <Box id="contact" sx={{ py: 10, bgcolor: '#f8f9fa' }}>
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          component="h2"
          align="center"
          sx={{
            fontWeight: 'bold',
            mb: 2,
            color: '#1976d2'
          }}
        >
          Get In Touch
        </Typography>
        
        <Typography
          variant="body1"
          align="center"
          sx={{
            color: '#666',
            mb: 8,
            fontSize: '1.1rem',
            maxWidth: '600px',
            mx: 'auto'
          }}
        >
          Have a project in mind or want to collaborate? I'd love to hear from you. Let's create something amazing together!
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 6 }}>
          <Box sx={{ flex: 1 }}>
            <Card sx={{ height: '100%', borderRadius: 2, boxShadow: '0 8px 24px rgba(0,0,0,0.2)', border: '1px solid #e0e0e0', borderColor: '#1976d2' }}>
              <CardContent sx={{ p: 4 }}>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: 'bold', mb: 3, color: '#1976d2' }}
                >
                  Contact Information
                </Typography>
                
                {contactInfo.map((info, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      mb: 3,
                      p: 2,
                      borderRadius: 2,
                      transition: 'background-color 0.3s ease',
                      '&:hover': { bgcolor: '#e3f2fd' }
                    }}
                  >
                    <Box sx={{ mr: 3 }}>{info.icon}</Box>
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#333' }}>
                        {info.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: '#666',
                          cursor: info.link !== '#' ? 'pointer' : 'default'
                        }}
                        onClick={() => info.link !== '#' && window.open(info.link, '_blank')}
                      >
                        {info.value}
                      </Typography>
                    </Box>
                  </Box>
                ))}

                <Box sx={{ mt: 4 }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: '#1976d2' }}>
                    Follow Me
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    {socialLinks.map((social, index) => (
                      <IconButton
                        key={index}
                        href={social.url}
                        target="_blank"
                        sx={{
                          bgcolor: '#e3f2fd',
                          color: '#1976d2',
                          '&:hover': {
                            bgcolor: '#1976d2',
                            color: 'white',
                            transform: 'translateY(-2px)'
                          }
                        }}
                      >
                        {social.icon}
                      </IconButton>
                    ))}
                  </Box>
                </Box>

                <Box
                  sx={{
                    mt: 4,
                    p: 3,
                    background: 'linear-gradient(135deg, #3156c4ff 100%)',
                    borderRadius: 2,
                    textAlign: 'center'
                  }}
                >
                  <Typography variant="h6" sx={{ color: 'white', mb: 1 }}>
                    Let's Build Something Great!
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.9)' }}>
                    I'm always open to discussing new opportunities and exciting projects.
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Box>

          <Box sx={{ flex: 1 }}>
            <Card sx={{ height: '100%', borderRadius:2, boxShadow: '0 8px 24px rgba(0,0,0,0.2)', border: '1px solid #e0e0e0', borderColor: '#1976d2'}}>
              <CardContent sx={{ p: 4 }}>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: 'bold', mb: 3, color: '#1976d2' }}
                >
                  Send Message
                </Typography>
                
                <Box component="form" onSubmit={handleSubmit}>
                  <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 3, mb: 3 }}>
                    <TextField
                      fullWidth
                      label="Your Name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                    <TextField
                      fullWidth
                      label="Your Email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </Box>
                  <TextField
                    fullWidth
                    label="Subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    sx={{ mb: 3 }}
                  />
                  <TextField
                    fullWidth
                    label="Your Message"
                    name="message"
                    multiline
                    rows={12}
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    sx={{ mb: 3 }}
                  />
                  {/* -- NEW: Updated Button -- */}
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    disabled={isLoading} // <-- NEW: Disable button when loading
                    startIcon={isLoading ? null : <SendIcon />} // <-- NEW: Hide icon when loading
                    sx={{
                      bgcolor: '#1976d2',
                      px: 4,
                      py: 1.5,
                      fontWeight: 'bold',
                      minWidth: '180px', // <-- NEW: Prevents size change on load
                      minHeight: '52.5px', // <-- NEW: Prevents size change on load
                      '&:hover': {
                        bgcolor: '#1565c0',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 6px 20px rgba(25,118,210,0.4)'
                      }
                    }}
                  >
                    {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Send Message'}
                  </Button>
                   {/* -- End of Updated Button -- */}
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Box>

        <Snackbar
          open={showAlert}
          autoHideDuration={2500}
          onClose={() => setShowAlert(false)}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert severity="success" onClose={() => setShowAlert(false)} sx={{ width: '100%' }}>
            Thank you for your message! It has been sent.
          </Alert>
        </Snackbar>

        <Snackbar
          open={errorAlert}
          autoHideDuration={2500}
          onClose={() => setErrorAlert(false)}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert severity="error" onClose={() => setErrorAlert(false)} sx={{ width: '100%' }}>
            Failed to send message. Please try again later.
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default Contact;