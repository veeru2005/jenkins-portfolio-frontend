import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Card, CardContent, CardMedia, CircularProgress } from '@mui/material';

const API_BASE_URL = import.meta.env.VITE_API_URL;

// --- Interface updated to match the final backend entity ---
interface Certification {
  id: number;
  name: string;
  issuer: string;
  year: string;
  description: string;
  imageUrl: string;
}

const EducationCertifications = () => {
  const defaultEducations = [
    {
      institution: 'Bhashyam Ramasethu Campus',
      degree: 'SSC (10th)',
      year: '2020 - 2021',
      location: 'Guntur, Andhra Pradesh, India',
      description: 'Finished high school with a primary focus on foundational courses in mathematics, sciences and languages',
      image: '/brc.png'
    },
    {
      institution: 'Bhashyam Titanic Campus',
      degree: 'Intermediate (11th and 12th)',
      year: '2021 - 2023',
      location: 'Guntur, Andhra Pradesh, India',
      description: 'Focused on Mathematics, Physics, and Chemistry with consistent academic performance.',
      image: '/btc.png'
    },
    {
      institution: 'KL University',
      degree: 'B.Tech in Computer Science & Engineering (Ongoing)',
      year: '2023 - Present',
      location: 'Vijayawada, Andhra Pradesh, India',
      description: 'Currently pursuing B.Tech with interests in software engineering, algorithms, web development and specialising in Cloud Native Software Engineering.',
      image: '/klu.png'
    }
  ];

  const [educationsState, setEducationsState] = React.useState(() => {
    try {
      const s = localStorage.getItem('educations');
      return s ? JSON.parse(s) : defaultEducations;
    } catch (e) {
      return defaultEducations;
    }
  });

  const [certificationsState, setCertificationsState] = useState<Certification[]>([]);
  const [loadingCerts, setLoadingCerts] = useState(true);

  useEffect(() => {
    const fetchCertifications = async () => {
      setLoadingCerts(true);
      try {
        const response = await fetch(`${API_BASE_URL}/api/portfolio/certifications`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data: Certification[] = await response.json();
        setCertificationsState(data);
      } catch (error) {
        console.error("Error fetching certifications:", error);
        setCertificationsState([]);
      } finally {
        setLoadingCerts(false);
      }
    };
    fetchCertifications();
  }, []);

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === 'educations' && e.newValue) {
        setEducationsState(JSON.parse(e.newValue));
      }
    };
    const onLocalUpdate = () => {
      try {
        const s = localStorage.getItem('educations');
        if (s) setEducationsState(JSON.parse(s));
      } catch (err) { /* ignore */ }
    };
    window.addEventListener('storage', onStorage);
    window.addEventListener('localDataUpdated', onLocalUpdate as EventListener);
    return () => {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener('localDataUpdated', onLocalUpdate as EventListener);
    };
  }, []);

  return (
    <Box id="education" sx={{ py: 10, bgcolor: '#f8f9fa' }}>
      <Container maxWidth="lg">
        <Typography variant="h3" component="h2" align="center" sx={{ fontWeight: 'bold', mb: 2, color: '#1976d2' }}>
          Education & Certifications
        </Typography>

        <Box sx={{ mt: 6 }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3, color: '#1976d2' }}>
            Education
          </Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 3 }}>
            {educationsState.map((edu, idx) => (
              <Box key={idx}>
                <Card sx={{ height: '100%', borderRadius: 2,  boxShadow: '0 6px 18px rgba(0,0,0,0.06)', border: '1px solid #e0e0e0', borderColor: '#1976d2', transition: 'all 0.3s ease', '&:hover': { transform: 'translateY(-6px)', boxShadow: '0 12px 24px rgba(0,0,0,0.12)'} }}>
                  {edu.image && <CardMedia component="img" image={edu.image} alt={`${edu.institution} image`} sx={{ height: 300, objectFit: 'cover' }} />}
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#0d47a1' }}>{edu.institution}</Typography>
                    <Typography variant="subtitle1" sx={{ color: '#424242', fontWeight: 500, mb: 0.5 }}>{edu.degree} • {edu.year}</Typography>
                    {edu.location && <Typography variant="caption" sx={{ color: '#6b6b6b', display: 'block', mb: 1 }}>{edu.location}</Typography>}
                    <Typography variant="body2" sx={{ color: '#555' }}>{edu.description}</Typography>
                  </CardContent>
                </Card>
              </Box>
            ))}
          </Box>

          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3, mt: 6, color: '#1976d2' }}>
            Certifications
          </Typography>

          {loadingCerts ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
              <CircularProgress />
            </Box>
          ) : (
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(3, 1fr)' }, gap: 3 }}>
              {certificationsState.map((cert) => (
                <Box key={cert.id}>
                  <Card sx={{ height: '100%', borderRadius: 2, boxShadow: '0 6px 18px rgba(0,0,0,0.06)', border: '1px solid #e0e0e0', borderColor: '#1976d2', transition: 'all 0.3s ease', '&:hover': { transform: 'translateY(-8px)', boxShadow: '0 12px 24px rgba(0,0,0,0.15)'} }}>
                    {cert.imageUrl && (
                      <CardMedia component="img" image={cert.imageUrl} alt={`${cert.name} certificate`} sx={{ height: 300, objectFit: 'cover' }} />
                    )}
                    <CardContent>
                      <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#0d47a1' }}>
                        {cert.name}
                      </Typography>
                      <Typography variant="subtitle2" sx={{ color: '#1976d2', mb: 1 }}>
                        {cert.issuer} • {cert.year}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#555' }}>
                        {cert.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Box>
              ))}
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default EducationCertifications;