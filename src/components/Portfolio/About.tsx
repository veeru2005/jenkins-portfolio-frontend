import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import {
  Code as CodeIcon,
  Brush as DesignIcon,
  Speed as SpeedIcon,
  Psychology as PsychologyIcon,
  Cloud as CloudIcon,
  DataObject as ReactIcon,
  CodeOff as PythonIcon
} from '@mui/icons-material';

const About: React.FC = () => {
  const technicalSkills = [
    { name: 'React', icon: <img src="/react.svg" alt="Docker" style={{ width: 48, height: 48 }} /> },
    { name: 'TypeScript', icon:<img src="/typescript.svg" alt="TypeScript" style={{ width: 48, height: 48 }} /> },
    { name: 'JavaScript', icon: <img src="/javascript.svg" alt="JavaScript" style={{ width: 48, height: 48 }} /> },
    { name: 'SpringBoot', icon: <img src="/springboot.svg" alt="SpringBoot" style={{ width: 48, height: 48 }} /> },
    { name: 'MySQL', icon: <img src="/mysql.svg" alt="MongoDB" style={{ width: 48, height: 48 }} /> },
    { name: 'MongoDB', icon: <img src="/mongodb.svg" alt="MongoDB" style={{ width: 48, height: 48 }} /> },
    { name: 'AWS/Cloud', icon: <img src="/aws.svg" alt="AWS/Cloud" style={{ width: 48, height: 48 }} /> },
    { name: 'Docker', icon: <img src="/docker.svg" alt="AWS/Cloud" style={{ width: 48, height: 48 }} /> },



  ];

  const editingSkills = [
    { name: 'Photoshop', icon: <img src="/photoshop.svg" alt="Photoshop" style={{ width: 48, height: 48 }} /> },
    { name: 'Premiere Pro', icon: <img src="/premiere-pro.svg" alt="Premiere Pro" style={{ width: 48, height: 48 }} /> },
    { name: 'Photopea', icon: <img src="/photopea.svg" alt="Photopea" style={{ width: 48, height: 48 }} /> },
    { name: 'DaVinci Resolve', icon: <img src="/davinci.svg" alt="DaVinci Resolve" style={{ width: 48, height: 48 }} /> },
    { name: 'Canva', icon: <img src="/canva.svg" alt="Canva" style={{ width: 48, height: 48 }} /> },
    { name: 'CapCut', icon: <img src="/capcut.svg" alt="CapCut" style={{ width: 48, height: 48 }} /> },
  ];

  const services = [
    {
      icon: <Box component="span" fontSize={42}>💻</Box>,
      title: 'Web Development',
      description: 'Building responsive and modern web applications using latest technologies and best practices.'
    },
    {
      icon: <Box component="span" fontSize={42}>🎨</Box>,
      title: 'Graphic Design',
      description: 'Creating intuitive and beautiful user interfaces that provide excellent user experience.'
    },
    {
      icon: <Box component="span" fontSize={42}>⚡</Box>,
      title: 'Performance',
      description: 'Optimizing applications for speed, performance, and scalability across all devices.'
    },
    {
      icon: <Box component="span" fontSize={42}>🧠</Box>,
      title: 'Problem Solving',
      description: 'Analyzing complex problems and implementing efficient, scalable solutions.'
    }
  ];
  const renderSkillBox = (item: { name: string; icon: JSX.Element }) => (
    <Box
      key={item.name}
      sx={{
        p: 4,
        bgcolor: '#f8f9fa',
        borderRadius: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        flex: 1,
        gap: 1.5,
        textAlign: 'center',
        border: '1px solid #e0e0e0',
        borderColor: '#1976d2',
        transition: 'transform 0.25s ease',
        '&:hover': {
          transform: 'translateY(-6px)',
          boxShadow: '0 8px 16px rgba(25,118,210,0.1)'
          
        }
      }}
    >
      {/* Directly render icon without blue circle */}
      <Box sx={{ mb: 1 }}>{item.icon}</Box>
      <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#0d47a1' }}>
        {item.name}
      </Typography>
    </Box>
  );
    
      

  return (
    <Box id="about" sx={{ py: 8, bgcolor: 'white' }}>
      <Container maxWidth="lg">
        {/* My Story */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 3, color: '#1976d2' }}>
            My Story
          </Typography>
        <Box sx={{ maxWidth: '1000px', mx: 'auto', textAlign: 'center' }}>
  <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.8, color: '#555', fontSize: '1.05rem' }}>
    I'm a developer with the eye of a designer. My journey into the tech world wasn't a straight line—it was a creative path that started with a passion for graphic design. At KL University, I immersed myself in the world of visuals, taking on leadership roles as the Designing Head and later the Co-Lead for the VYUHA club (KL SAC), and also serving as the Director of Designing for the VIDHURA club (AIDS). These experiences taught me how to lead creative projects and master tools for photo editing and design.
  </Typography>
  <Typography variant="body1" sx={{ lineHeight: 1.8, color: '#555', fontSize: '1.05rem' }}>
    This ambition to build experiences from the ground up led me to full-stack development, where I had the privilege of being mentored by Murali Mohan Vutukuru Sir. With his guidance, I built a strong foundation in backend and frontend technologies, specializing in creating powerful web applications with Spring Boot, React, and MySQL. My unique background allows me to not only write clean, maintainable code but to also ensure the final product is intuitive, beautiful, and provides an exceptional user experience.
  </Typography>
</Box>
        </Box>

        {/* What I Do */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 5, color: '#1976d2', textAlign: 'center' }}>
            What I Do
          </Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(4, 1fr)' }, gap: 2 }}>
            {services.map((service, index) => (
              <Box
                key={index}
                sx={{
                  p: 2,
                  bgcolor: '#f8f9fa',
                  borderRadius: 2,
                  textAlign: 'center',
                  border: '1px solid #e0e0e0',
                  borderColor: '#1976d2',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-6px)',
                    boxShadow: '0 8px 16px rgba(25,118,210,0.1)'
                  }
                }}
              >
                <Box sx={{ mb: 1 }}>{service.icon}</Box>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1, color: '#0d47a1' }}>
                  {service.title}
                </Typography>
                <Typography variant="body2" sx={{ color: '#666', lineHeight: 1.6 }}>
                  {service.description}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Skills Section */}
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 6 }}>
          {/* Technical Skills */}
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 4, color: '#1976d2', textAlign: { xs: 'center' } }}>
              Technical Skills
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.5, gridAutoRows: '1fr' }}>
              {technicalSkills.map(renderSkillBox)}
            </Box>
          </Box>

          {/* Editing Skills */}
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 4, color: '#1976d2', textAlign: { xs: 'center' } }}>
              Editing Skills
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.5, gridAutoRows: '1fr' }}>
              {editingSkills.map(renderSkillBox)}
            </Box>
          </Box>

          <Box sx={{ gridColumn: '1 / -1', textAlign: 'center', p: 4 }}>
            <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 3, color: '#1976d2' }}>
              Experience
            </Typography>
            <Typography variant="h1" sx={{ fontWeight: 'bold', color: '#1976d2', lineHeight: 1 }}>
              1+
            </Typography>
            <Typography variant="h6" sx={{ color: '#666' }}>
              Year of Professional Experience
            </Typography>
          </Box>

        </Box>
      </Container>
    </Box>
  );
};

export default About;