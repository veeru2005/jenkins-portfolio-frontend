import React from 'react';
import {
  Box, AppBar, Toolbar, Button, IconButton, Drawer, List, ListItem, ListItemButton, ListItemText, Typography
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate, Link as RouterLink } from 'react-router-dom';

const drawerWidth = 240;

interface AdminNavbarProps {
  children: React.ReactNode;
}

const AdminNavbar: React.FC<AdminNavbarProps> = ({ children }) => {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  React.useEffect(() => {
    const auth = localStorage.getItem('adminAuthenticated');
    if (auth !== 'true') {
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuthenticated');
    localStorage.removeItem('adminName');
    navigate('/admin/login');
  };

  const adminName = localStorage.getItem('adminName') || 'Admin';

  // --- DRAWER MODIFIED: LOGOUT BUTTON REMOVED ---
  const drawer = (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', bgcolor: 'primary.main', color: 'white' }}>
      <Box sx={{ p: 1, display: 'flex', justifyContent: 'flex-end' }}>
          <IconButton onClick={handleDrawerToggle} sx={{ color: 'white' }}>
              <CloseIcon />
          </IconButton>
      </Box>
      <List sx={{ px: 1 }}>
        <ListItem disablePadding>
          <ListItemButton component={RouterLink} to="/admin" onClick={handleDrawerToggle}>
            <ListItemText primary="Dashboard" sx={{ pl: 2 }} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={RouterLink} to="/admin/projects" onClick={handleDrawerToggle}>
            <ListItemText primary="Manage Projects" sx={{ pl: 2 }} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={RouterLink} to="/admin/certifications" onClick={handleDrawerToggle}>
            <ListItemText primary="Manage Certifications" sx={{ pl: 2 }} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f4f6f8' }}>
      <AppBar component="nav" position="fixed">
        {/* --- TOOLBAR MODIFIED: Swapped logout icon for a full button on mobile --- */}
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 1, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          
          <Typography
            variant="h6"
            component={RouterLink}
            to="/admin"
            sx={{ color: 'inherit', textDecoration: 'none', flexGrow: 1 }}
          >
            My Dashboard
          </Typography>

          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
            <Button sx={{ color: '#fff' }} component={RouterLink} to="/admin">
              Dashboard
            </Button>
            <Button sx={{ color: '#fff' }} component={RouterLink} to="/admin/projects">
              Manage Projects
            </Button>
            <Button sx={{ color: '#fff' }} component={RouterLink} to="/admin/certifications">
              Manage Certifications
            </Button>
          </Box>
          
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex'} }} />

          {/* Right Side Logout Button - DESKTOP */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
             <Button 
                variant="contained"
                color="error"
                onClick={handleLogout} 
                startIcon={<LogoutIcon />}
             >
               Logout
             </Button>
          </Box>
          
          {/* Right Side Logout Button - MOBILE */}
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <Button
              variant="contained"
              color="error"
              onClick={handleLogout}
              size="small"
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      
      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{ display: { xs: 'block', md: 'none' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth } }}
        >
          {drawer}
        </Drawer>
      </Box>

      <Box component="main" sx={{ flexGrow: 1, width: '100%' }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default AdminNavbar;