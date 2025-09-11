import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { Menu as MenuIcon, Close as CloseIcon } from '@mui/icons-material';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [isAdmin, setIsAdmin] = useState(() => {
    try {
      return localStorage.getItem('adminAuthenticated') === 'true';
    } catch (e) {
      return false;
    }
  });

  const menuItems = ['Home', 'About', 'Projects', 'Contact'];

  React.useEffect(() => {
    const onLocal = () => setIsAdmin(localStorage.getItem('adminAuthenticated') === 'true');
    window.addEventListener('localDataUpdated', onLocal as EventListener);
    window.addEventListener('storage', onLocal as EventListener);
    return () => {
      window.removeEventListener('localDataUpdated', onLocal as EventListener);
      window.removeEventListener('storage', onLocal as EventListener);
    };
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId.toLowerCase());
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileOpen(false);
  };

  const drawer = (
    <Box sx={{ width: 250, height: '100%', bgcolor: 'primary.main' }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
        <IconButton onClick={handleDrawerToggle} sx={{ color: 'white' }}>
          <CloseIcon />
        </IconButton>
      </Box>
      <List>
        {menuItems.map((item) => (
          <ListItem
            key={item}
            onClick={() => scrollToSection(item)}
            sx={{
              cursor: 'pointer',
              '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' }
            }}
          >
            <ListItemText
              primary={item}
              sx={{ color: 'white', pl: 4 }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          bgcolor: 'rgba(25, 118, 210, 0.95)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          overflowX: 'hidden',
          width: '100%'
        }}
      >
        <Toolbar>
          {isMobile && (
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 1 }}
            >
              <MenuIcon />
            </IconButton>
          )}

          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              fontWeight: 'bold',
              background: 'linear-gradient(45deg, #fff, #e3f2fd)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Veerendra's Portfolio
          </Typography>

          {!isMobile && (
            <Box sx={{ display: 'flex', gap: 2 }}>
              {menuItems.map((item) => (
                <Button
                  key={item}
                  color="inherit"
                  onClick={() => scrollToSection(item)}
                  sx={{
                    fontWeight: 'medium',
                    '&:hover': {
                      bgcolor: 'rgba(255,255,255,0.1)',
                      transform: 'translateY(-2px)',
                      transition: 'all 0.3s ease'
                    }
                  }}
                >
                  {item}
                </Button>
              ))}
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 250 }
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Navbar;