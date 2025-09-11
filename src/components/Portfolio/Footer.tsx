import React from 'react';
import {
  Box,
  Typography,
  Container,
  IconButton,
  Divider
} from '@mui/material';
import {
  LinkedIn as LinkedInIcon,
  GitHub as GitHubIcon,
  Twitter as TwitterIcon,
  Email as EmailIcon,
  Favorite as FavoriteIcon
} from '@mui/icons-material';

const Footer = () => {
  const socialLinks = [
    { icon: <LinkedInIcon />, url: 'https://www.linkedin.com/in/veerendra-chowdary-sunkavalli-513b58309/', label: 'LinkedIn' },
    { icon: <GitHubIcon />, url: 'https://github.com/veeru2005', label: 'GitHub' },
    { icon: <EmailIcon />, url: 'mailto:sunkavalli.veerendra1973@gmail.com', label: 'Email' }
  ];

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId.replace('#', ''));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: '#1976d2',
        color: 'white',
        py: 6
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 'bold',
                mb: 2,
                background: 'linear-gradient(45deg, #fff, #e3f2fd)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Sunkavalli Veerendra Chowdary
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: 'rgba(255,255,255,0.8)',
                mb: 3,
                lineHeight: 1.6
              }}
            >
              Full Stack Developer passionate about creating innovative web solutions 
              and building exceptional digital experiences that make a difference.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              {socialLinks.map((social, index) => (
                <IconButton
                  key={index}
                  href={social.url}
                  target="_blank"
                  sx={{
                    color: 'rgba(255,255,255,0.8)',
                    bgcolor: 'rgba(255,255,255,0.1)',
                    '&:hover': {
                      color: '#ffeb3b',
                      bgcolor: 'rgba(255,235,59,0.1)',
                      transform: 'translateY(-2px)'
                    }
                  }}
                >
                  {social.icon}
                </IconButton>
              ))}
            </Box>
          </Box>

          <Box sx={{ flex: 1 }}>
            <Typography
              variant="h6"
              sx={{ fontWeight: 'bold', mb: 2 }}
            >
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {quickLinks.map((link, index) => (
                <Typography
                  key={index}
                  variant="body2"
                  sx={{
                    color: 'rgba(255,255,255,0.8)',
                    cursor: 'pointer',
                    transition: 'color 0.3s ease',
                    '&:hover': {
                      color: '#ffeb3b'
                    }
                  }}
                  onClick={() => scrollToSection(link.href)}
                >
                  {link.name}
                </Typography>
              ))}
            </Box>
          </Box>

          <Box sx={{ flex: 1 }}>
            <Typography
              variant="h6"
              sx={{ fontWeight: 'bold', mb: 2 }}
            >
              Get In Touch
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: 'rgba(255,255,255,0.8)',
                mb: 2,
                lineHeight: 1.6
              }}
            >
              Have a project in mind? Let's work together to bring your ideas to life.
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: 'rgba(255,255,255,0.8)',
                mb: 1
              }}
            >
              📧 sunkavalli.veerendra1973@email.com
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: 'rgba(255,255,255,0.8)',
                mb: 1
              }}
            >
              📱 +91 7995762616
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: 'rgba(255,255,255,0.8)'
              }}
            >
              📍 Rajahmundry, Andhra Pradesh, India
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 4, bgcolor: 'rgba(255,255,255,0.2)' }} />

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            textAlign: { xs: 'center', sm: 'left' }
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: 'rgba(255,255,255,0.8)',
              mb: { xs: 2, sm: 0 }
            }}
          >
            © {new Date().getFullYear()} Sunkavalli Veerendra Chowdary. All rights reserved.
          </Typography>
          
          <Typography
            variant="body2"
            sx={{
              color: 'rgba(255,255,255,0.8)',
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              cursor: 'pointer'
            }}
            onClick={() => { window.location.href = '/admin/login'; }}
          >
            Admin: Veerendra
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;