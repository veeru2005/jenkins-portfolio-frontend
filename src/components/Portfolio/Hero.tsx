import React from 'react';
import {
  Box,
  Typography,
  Button,
  Container,
  Avatar,
  Chip
} from '@mui/material';
import {
  Download as DownloadIcon,
  Email as EmailIcon,
  LinkedIn as LinkedInIcon,
  GitHub as GitHubIcon
} from '@mui/icons-material';

const Hero = () => {
  const skills = ['React', 'JavaScript / TypeScript', 'SpringBoot', 'MySQL', 'Node.js', 'MongoDB'];

  return (
    <Box
      id="home"
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #000000ff 0%, #3156c4ff 100%)',
        pt: 11,
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background decoration */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background:
            'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.1\'%3E%3Ccircle cx=\'30\' cy=\'30\' r=\'2\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          opacity: 0.3
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            gap: 2
          }}
        >
          {/* Avatar for mobile view */}
          <Box
            sx={{
              display: { xs: 'flex', md: 'none' },
              justifyContent: 'center',
              mb: 2,
              order: { xs: 1, md: 2 }
            }}
          >
            <Avatar
              sx={{
                width: { xs: 120, sm: 150 },
                height: { xs: 120, sm: 150 },
                border: '4px solid rgba(255,255,255,0.3)',
                boxShadow: '0 15px 30px rgba(0,0,0,0.3)'
              }}
              src="We.jpg"
              alt="Sunkavalli Veerendra Chowdary"
            />
          </Box>

          <Box sx={{ flex: 1, textAlign: { xs: 'center', md: 'left' }, order: { xs: 2, md: 1 } }}>
            <Typography
              variant="h6"
              sx={{
                color: 'rgba(255,255,255,0.9)',
                mb: 2,
                fontWeight: 'medium'
              }}
            >
              Hello, I'm
            </Typography>

            {/* Name layout for mobile - First name and middle name */}
            <Typography
              variant="h2"
              component="h1"
              sx={{
                fontWeight: 'bold',
                color: 'white',
                mb: { xs: 1, md: 2 },
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3.5rem' },
                lineHeight: { xs: 1.1, md: 1.2 },
                wordBreak: 'break-word',
                overflowWrap: 'break-word'
              }}
            >
              Sunkavalli Veerendra
            </Typography>

            {/* Last name on separate line for mobile */}
            <Typography
              variant="h2"
              component="h1"
              sx={{
                fontWeight: 'bold',
                color: 'white',
                mb: { xs: 2, md: 2 },
                fontSize: { xs: '1.8rem', sm: '2.2rem', md: '3.5rem' },
                lineHeight: { xs: 1.1, md: 1.2 },
                wordBreak: 'break-word',
                overflowWrap: 'break-word'
              }}
            >
              Chowdary
            </Typography>

            <Typography
              variant="h5"
              sx={{
                color: '#ffeb3b',
                mb: 3,
                fontWeight: 'medium',
                fontSize: { xs: '1.1rem', md: '1.5rem' }
              }}
            >
              Graphic Designer & Full Stack Developer
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: 'rgba(255,255,255,0.9)',
                mb: 4,
                fontSize: { xs: '1rem', md: '1.1rem' },
                lineHeight: 1.7,
                maxWidth: '500px',
                mx: { xs: 'auto', md: 0 }
              }}
            >
              As a passionate Graphic Designer, I specialize in photo and video editing, creating visually stunning content that captures attention. I channel this creative expertise into my work as a Full Stack Developer, where I build responsive and user-friendly web applications.
            </Typography>

            <Box sx={{ mb: 4 }}>
              <Typography variant="body2" sx={{ color: 'white', mb: 2 }}>
                Tech Stack:
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: { xs: 'center', md: 'flex-start' } }}>
                {skills.map((skill) => (
                  <Chip
                    key={skill}
                    label={skill}
                    sx={{
                      bgcolor: 'rgba(255,255,255,0.2)',
                      color: 'white',
                      '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' }
                    }}
                  />
                ))}
              </Box>
            </Box>

            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: { xs: 'center', md: 'flex-start' } }}>
              <Button
                variant="contained"
                component="a" // Render as a link
                href="/Veerendra_CV.pdf" // Path to the file
                download="Veerendra_CV.pdf" // Tell the browser to download it
                startIcon={<DownloadIcon />}
                sx={{
                  color: '#1976d2',
                  bgcolor: '#ffeb3b',
                  fontWeight: 'bold',
                  px: 3,
                  py: 1.5,
                  '&:hover': {
                    bgcolor: '#fff59d',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 20px rgba(255,235,59,0.4)'
                  }
                }}
              >
                Download CV
              </Button>

              <Button
                variant="outlined"
                // Remove the href and add this onClick function
                onClick={() => {
                  const element = document.getElementById('contact');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                startIcon={<EmailIcon />}
                sx={{
                  borderColor: 'white',
                  color: 'white',
                  px: 3,
                  py: 1.5,
                  '&:hover': {
                    borderColor: '#ffeb3b',
                    color: '#ffeb3b',
                    transform: 'translateY(-2px)'
                  }
                }}
              >
                Contact Me
              </Button>
            </Box>

            <Box sx={{ display: 'flex', gap: 2, mt: 3, mb: 5, justifyContent: { xs: 'center', md: 'flex-start' } }}>
              <Button
                sx={{ color: 'white', minWidth: 'auto', p: 1 }}
                href="https://www.linkedin.com/in/veerendra-chowdary-sunkavalli-513b58309"
                target="_blank"
              >
                <LinkedInIcon />
              </Button>
              <Button
                sx={{ color: 'white', minWidth: 'auto', p: 1 }}
                href="https://github.com/veeru2005"
                target="_blank"
              >
                <GitHubIcon />
              </Button>
            </Box>
          </Box>

          {/* Avatar for desktop view */}
          <Box sx={{ flex: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center', order: { xs: 1, md: 2 } }}>
            <Avatar
              sx={{
                width: 350,
                height: 350,
                border: '5px solid rgba(255,255,255,0.3)',
                boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
              }}
              src="We.jpg"
              alt="Sunkavalli Veerendra Chowdary"
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Hero;