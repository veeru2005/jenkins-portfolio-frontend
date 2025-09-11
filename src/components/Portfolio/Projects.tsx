import React, { useState, useEffect } from 'react';
import { Box, Typography, Container, Card, CardMedia, CardContent, CardActions, Button, Chip, IconButton } from '@mui/material';
import { Launch as LaunchIcon, GitHub as GitHubIcon } from '@mui/icons-material';

const API_BASE_URL = 'http://localhost:9097';

interface Project {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  technologies: string;
  liveUrl: string;
  githubUrl: string;
}

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  const fetchProjects = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/portfolio/projects`);
      if (response.ok) {
        const data = await response.json();
        setProjects(data);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <Box id="projects" sx={{ py: 10, bgcolor: 'white' }}>
      <Container maxWidth="lg">
        <Typography variant="h3" align="center" fontWeight="bold" color="primary" sx={{ mb: 2 }}>
          My Projects
        </Typography>
        <Typography align="center" color="text.secondary" sx={{ mb: 8, maxWidth: 600, mx: 'auto' }}>
          Here are some of my recent projects that showcase my skills and experience.
        </Typography>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: '1fr 1fr 1fr' }, gap: 4 }}>
          {projects.map(project => (
            <Card key={project.id} sx={{ display: 'flex', flexDirection: 'column', borderRadius: 2,  boxShadow: '0 6px 18px rgba(0,0,0,0.06)', border: '1px solid #e0e0e0', borderColor: '#1976d2', transition: 'all 0.3s ease', '&:hover': { transform: 'translateY(-6px)', boxShadow: '0 12px 24px rgba(0,0,0,0.12)' } }}>
              <CardMedia component="img" height="200" image={project.imageUrl} alt={project.title} onError={e => { e.currentTarget.src = '/placeholder.svg'; }} />
              <CardContent sx={{ flexGrow: 1, p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#0d47a1', mb: 1 }}>{project.title}</Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2.5, lineHeight: 1.6 }}>{project.description}</Typography>
                <Box>
                  {project.technologies.split(',').map(tech => tech.trim() && <Chip key={tech} label={tech.trim()} size="small" sx={{ mr: 0.5, mb: 0.5, bgcolor: '#e3f2fd', color: '#1976d2', fontWeight: 500 }} />)}
                </Box>
              </CardContent>
              <CardActions sx={{ px: 3, pb: 3 }}>
                <Button variant="contained" startIcon={<LaunchIcon />} href={project.liveUrl} target="_blank" sx={{ mr: 1, bgcolor: '#1976d2', '&:hover': { bgcolor: '#1565c0' } }}>Live Demo</Button>
                <IconButton href={project.githubUrl} target="_blank" sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}><GitHubIcon /></IconButton>
              </CardActions>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default Projects;
