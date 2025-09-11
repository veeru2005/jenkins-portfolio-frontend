import React, { useState, useEffect } from 'react';
import AdminNavbar from './AdminNavbar';
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Divider,
  IconButton
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  OpenInNew as OpenInNewIcon,
  GitHub as GitHubIcon
} from '@mui/icons-material';

const API_BASE_URL = import.meta.env.VITE_API_URL;

interface Project {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  technologies: string;
  liveUrl: string;
  githubUrl: string;
}

interface ProjectForm {
  id: number | null;
  title: string;
  description: string;
  imageUrl: string;
  imageFile: File | null;
  technologies: string;
  liveUrl: string;
  githubUrl: string;
}

const AdminProjects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isProjectDialogOpen, setIsProjectDialogOpen] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [projectToDeleteId, setProjectToDeleteId] = useState<number | null>(null);

  const [projectForm, setProjectForm] = useState<ProjectForm>({
    id: null,
    title: '',
    description: '',
    imageUrl: '/placeholder.svg',
    imageFile: null,
    technologies: '',
    liveUrl: '',
    githubUrl: ''
  });

  const fetchProjects = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/portfolio/projects`);
      if (response.ok) {
        const data: Project[] = await response.json();
        setProjects(data);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const openProjectDialog = (proj?: Project) => {
    if (proj) {
      setProjectForm({
        id: proj.id,
        title: proj.title,
        description: proj.description,
        imageUrl: proj.imageUrl,
        imageFile: null,
        technologies: proj.technologies,
        liveUrl: proj.liveUrl,
        githubUrl: proj.githubUrl
      });
    } else {
      setProjectForm({
        id: null,
        title: '',
        description: '',
        imageUrl: '/placeholder.svg',
        imageFile: null,
        technologies: '',
        liveUrl: '',
        githubUrl: ''
      });
    }
    setIsProjectDialogOpen(true);
  };

  const closeProjectDialog = () => setIsProjectDialogOpen(false);

  const handleProjectImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProjectForm(prev => ({ ...prev, imageUrl: reader.result as string, imageFile: file }));
      };
      reader.readAsDataURL(file);
    }
  };

  const saveProjectFromForm = async () => {
    if (!projectForm.title.trim()) {
      alert('Title is required.');
      return;
    }

    const formData = new FormData();
    formData.append('title', projectForm.title);
    formData.append('description', projectForm.description);
    formData.append('technologies', projectForm.technologies);
    formData.append('liveUrl', projectForm.liveUrl);
    formData.append('githubUrl', projectForm.githubUrl);
    if (projectForm.imageFile) formData.append('image', projectForm.imageFile);

    const token = localStorage.getItem('jwtToken');

    try {
      const method = projectForm.id ? 'PUT' : 'POST';
      const url = projectForm.id
        ? `${API_BASE_URL}/api/portfolio/admin/projects/${projectForm.id}`
        : `${API_BASE_URL}/api/portfolio/admin/projects`;

      const response = await fetch(url, {
        method,
        headers: { Authorization: `Bearer ${token || ''}` },
        body: formData
      });

      if (response.ok) {
        await fetchProjects();
        closeProjectDialog();
      } else {
        const errText = await response.text();
        alert(`Failed to save project: ${errText}`);
      }
    } catch (error) {
      console.error('Error saving project:', error);
    }
  };

  const deleteProject = async (id: number) => {
    const token = localStorage.getItem('jwtToken');
    try {
      const response = await fetch(`${API_BASE_URL}/api/portfolio/admin/projects/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token || ''}` }
      });
      if (response.ok) fetchProjects();
      else alert('Failed to delete project.');
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  const handleConfirmDelete = () => {
    if (projectToDeleteId) deleteProject(projectToDeleteId);
    setIsConfirmDialogOpen(false);
  };

  return (
    <AdminNavbar>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, flexWrap: 'wrap', gap: 2 }}>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>Manage Projects</Typography>
          <Button variant="contained" onClick={() => openProjectDialog()} sx={{ bgcolor: '#1976d2', '&:hover': { bgcolor: '#1565c0' } }}>Add Project</Button>
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: '1fr 1fr 1fr' }, gap: 4 }}>
          {projects.map(project => (
            <Card key={project.id} sx={{ display: 'flex', flexDirection: 'column', borderRadius: 2, transition: 'transform 0.3s ease, box-shadow 0.3s ease', '&:hover': { boxShadow: 6 } }}>
              <CardMedia component="img" height="200" image={project.imageUrl} alt={project.title} onError={e => { e.currentTarget.src = '/placeholder.svg'; }} />
              <CardContent sx={{ flexGrow: 1, p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#0d47a1', mb: 1 }}>{project.title}</Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2.5, lineHeight: 1.6 }}>{project.description}</Typography>
                <Box>
                  {project.technologies.split(',').map(tech => tech.trim() && <Chip key={tech} label={tech.trim()} size="small" sx={{ mr: 0.5, mb: 0.5, bgcolor: '#e3f2fd', color: '#1976d2', fontWeight: 500 }} />)}
                </Box>
              </CardContent>
              <CardActions sx={{ p: 3, py: 2 }}>
                <Button variant="contained" startIcon={<OpenInNewIcon />} href={project.liveUrl} target="_blank" sx={{ mr: 1, bgcolor: '#1976d2', '&:hover': { bgcolor: '#1565c0' } }}>Live Demo</Button>
                <IconButton href={project.githubUrl} target="_blank" sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}><GitHubIcon /></IconButton>
              </CardActions>
              <Divider />
              <CardActions sx={{ justifyContent: 'space-between', bgcolor: 'grey.50', px: 2 }}>
                <Button startIcon={<EditIcon />} onClick={() => openProjectDialog(project)} color="primary">Edit</Button>
                <Button startIcon={<DeleteIcon />} onClick={() => { setProjectToDeleteId(project.id); setIsConfirmDialogOpen(true); }} color="error">Delete</Button>
              </CardActions>
            </Card>
          ))}
        </Box>

        <Dialog open={isProjectDialogOpen} onClose={closeProjectDialog} fullWidth maxWidth="sm">
          <DialogTitle>{projectForm.id ? 'Edit Project' : 'Add Project'}</DialogTitle>
          <DialogContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
              <TextField label="Title" value={projectForm.title} onChange={e => setProjectForm({ ...projectForm, title: e.target.value })} fullWidth />
              <TextField label="Description" value={projectForm.description} onChange={e => setProjectForm({ ...projectForm, description: e.target.value })} fullWidth multiline rows={3} />
              <Button variant="outlined" component="label">Upload Image<input accept="image/*" type="file" hidden onChange={handleProjectImageFileChange} /></Button>
              {projectForm.imageUrl && <Box component="img" src={projectForm.imageUrl} alt="preview" sx={{ maxHeight: 200, objectFit: 'contain', border: '1px solid #ddd', borderRadius: 1 }} />}
              <TextField label="Technologies (comma-separated)" value={projectForm.technologies} onChange={e => setProjectForm({ ...projectForm, technologies: e.target.value })} fullWidth />
              <TextField label="Live URL" value={projectForm.liveUrl} onChange={e => setProjectForm({ ...projectForm, liveUrl: e.target.value })} fullWidth />
              <TextField label="GitHub URL" value={projectForm.githubUrl} onChange={e => setProjectForm({ ...projectForm, githubUrl: e.target.value })} fullWidth />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeProjectDialog}>Cancel</Button>
            <Button variant="contained" onClick={saveProjectFromForm} sx={{ bgcolor: '#1976d2' }}>Save</Button>
          </DialogActions>
        </Dialog>

        <Dialog open={isConfirmDialogOpen} onClose={() => setIsConfirmDialogOpen(false)}>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogContent><Typography>Are you sure you want to delete this project?</Typography></DialogContent>
          <DialogActions>
            <Button onClick={() => setIsConfirmDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleConfirmDelete} color="error" variant="contained">Delete</Button>
          </DialogActions>
        </Dialog>
      </Container>
    </AdminNavbar>
  );
};

export default AdminProjects;
