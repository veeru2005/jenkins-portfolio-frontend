import React, { useState, useEffect } from 'react';
import {
  Box, Container, Typography, Button, Card, CardMedia, CardContent, CardActions,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField, Divider, CircularProgress
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import AdminNavbar from './AdminNavbar';

const API_URL = 'http://localhost:9097/api/portfolio';

const getAuthToken = () => localStorage.getItem('jwtToken') || '';

// Certification interface
interface Certification {
  id: number;
  name: string;
  issuer: string;
  year: string;
  description: string;
  imageUrl: string;
}

// Form state interface
interface CertFormState {
  id: number | null;
  name: string;
  issuer: string;
  year: string;
  description: string;
  imageFile: File | null;
  imageUrl: string;
}

const AdminCertifications: React.FC = () => {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCertDialogOpen, setIsCertDialogOpen] = useState(false);
  const [certForm, setCertForm] = useState<CertFormState>({
    id: null,
    name: '',
    issuer: '',
    year: '',
    description: '',
    imageFile: null,
    imageUrl: '/placeholder.svg'
  });
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [certToDeleteId, setCertToDeleteId] = useState<number | null>(null);

  const fetchCertifications = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/certifications`);
      if (!response.ok) throw new Error('Failed to fetch certifications');
      const data: Certification[] = await response.json();
      setCertifications(data);
    } catch (err) {
      console.error('Error fetching certifications:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCertifications();
  }, []);

  const openCertDialog = (cert?: Certification) => {
    if (cert) {
      setCertForm({
        id: cert.id,
        name: cert.name,
        issuer: cert.issuer,
        year: cert.year,
        description: cert.description,
        imageFile: null,
        imageUrl: cert.imageUrl
      });
    } else {
      setCertForm({
        id: null,
        name: '',
        issuer: '',
        year: '',
        description: '',
        imageFile: null,
        imageUrl: '/placeholder.svg'
      });
    }
    setIsCertDialogOpen(true);
  };

  const closeCertDialog = () => setIsCertDialogOpen(false);

  const handleCertImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCertForm(prev => ({
        ...prev,
        imageFile: file,
        imageUrl: URL.createObjectURL(file)
      }));
    }
  };

  const saveCertFromForm = async () => {
    if (!certForm.name.trim()) return alert('Certification name is required');

    const formData = new FormData();
    formData.append('name', certForm.name);
    formData.append('issuer', certForm.issuer);
    formData.append('year', certForm.year);
    formData.append('description', certForm.description);
    if (certForm.imageFile) formData.append('image', certForm.imageFile);

    try {
      const token = getAuthToken();
      const isEdit = !!certForm.id;
      const url = isEdit
        ? `${API_URL}/admin/certifications/${certForm.id}`
        : `${API_URL}/admin/certifications`;
      const method = isEdit ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      });

      if (!response.ok) {
        const text = await response.text();
        console.error('Server error response:', text);
        throw new Error(`Server returned ${response.status}: ${text}`);
      }

      closeCertDialog();
      fetchCertifications();
    } catch (err) {
      console.error('Failed to save certification:', err);
      alert('Failed to save certification. See console for details.');
    }
  };

  const deleteCertification = async (id: number) => {
    try {
      const token = getAuthToken();
      const response = await fetch(`${API_URL}/admin/certifications/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!response.ok) throw new Error('Failed to delete certification');
      setCertifications(prev => prev.filter(c => c.id !== id));
    } catch (err) {
      console.error('Error deleting certification:', err);
      alert('Failed to delete certification.');
    }
  };

  const handleOpenConfirmDialog = (id: number) => {
    setCertToDeleteId(id);
    setIsConfirmDialogOpen(true);
  };

  const handleCloseConfirmDialog = () => {
    setCertToDeleteId(null);
    setIsConfirmDialogOpen(false);
  };

  const handleConfirmDelete = () => {
    if (certToDeleteId) deleteCertification(certToDeleteId);
    handleCloseConfirmDialog();
  };

  if (loading) {
    return (
      <AdminNavbar>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
          <CircularProgress />
        </Box>
      </AdminNavbar>
    );
  }

  return (
    <AdminNavbar>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, flexWrap: 'wrap', gap: 2 }}>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>Manage Certifications</Typography>
          <Button variant="contained" onClick={() => openCertDialog()}>Add Certification</Button>
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, gap: 3 }}>
          {certifications.map(c => (
            <Card key={c.id} sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderRadius: 2, transition: 'box-shadow 0.3s', '&:hover': { boxShadow: 6 } }}>
              <CardMedia component="img" image={c.imageUrl || '/placeholder.svg'} alt={c.name} sx={{ height: 300, objectFit: 'cover' }} />
              <CardContent sx={{ flexGrow: 1, p:3}}>
                <Typography gutterBottom variant="h5" sx={{ fontWeight: 'bold' }}>{c.name}</Typography>
                <Typography variant="subtitle1"  sx={{ color: '#1976d2', mb: 1 }}>{c.issuer} • {c.year}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>{c.description}</Typography>
              </CardContent>
              <Divider />
              <CardActions sx={{ justifyContent: 'space-between' }}>
                <Button size="medium" startIcon={<EditIcon />} onClick={() => openCertDialog(c)}>Edit</Button>
                <Button size="medium" color="error" startIcon={<DeleteIcon />} onClick={() => handleOpenConfirmDialog(c.id)}>Delete</Button>
              </CardActions>
            </Card>
          ))}
        </Box>

        <Dialog open={isCertDialogOpen} onClose={closeCertDialog} fullWidth maxWidth="sm">
          <DialogTitle>{certForm.id ? 'Edit Certification' : 'Add Certification'}</DialogTitle>
          <DialogContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
              <TextField label="Name" value={certForm.name} onChange={e => setCertForm({ ...certForm, name: e.target.value })} autoFocus />
              <TextField label="Issuer" value={certForm.issuer} onChange={e => setCertForm({ ...certForm, issuer: e.target.value })} />
              <TextField label="Year" value={certForm.year} onChange={e => setCertForm({ ...certForm, year: e.target.value })} />
              <Button variant="outlined" component="label">
                Upload Certificate Image
                <input accept="image/*" type="file" hidden onChange={handleCertImageFileChange} />
              </Button>
              <Box component="img" src={certForm.imageUrl} alt="preview" sx={{ width: '100%', my: 1, maxHeight: 300, objectFit: 'cover', border: '1px solid #ddd' }} />
              <TextField label="Description" value={certForm.description} onChange={e => setCertForm({ ...certForm, description: e.target.value })} multiline rows={3} />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeCertDialog}>Cancel</Button>
            <Button variant="contained" onClick={saveCertFromForm}>Save</Button>
          </DialogActions>
        </Dialog>

        <Dialog open={isConfirmDialogOpen} onClose={handleCloseConfirmDialog}>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogContent>
            <Typography>Are you sure you want to delete this certification?</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseConfirmDialog}>Cancel</Button>
            <Button onClick={handleConfirmDelete} color="error" variant="contained">Delete</Button>
          </DialogActions>
        </Dialog>
      </Container>
    </AdminNavbar>
  );
};

export default AdminCertifications;

