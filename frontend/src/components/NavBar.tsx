import * as React from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  Button,
  Container,
  Divider,
  Typography,
  MenuItem,
  Drawer,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';

function NavBar() {
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const handleLogout = async () => {
    try {
      // TODO change this endpoint to /logout, handle response
      await fetch('http://localhost:8000/auth/profile', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });

      localStorage.removeItem('authToken');
      window.location.href = '/';
    } catch (error) {
      console.error('Error fetching users:', error);
      // setError(error);
      localStorage.removeItem('authToken');
    }

  }

  return (
    <div>
      <AppBar
        position="sticky"
        sx={{
          marginBottom: 5,
          boxShadow: 0,
          bgcolor: 'transparent',
          mt: 2,
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            variant="regular"
            sx={(theme) => ({
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexShrink: 0,
              backdropFilter: 'blur(24px)',
              maxHeight: 40,
              borderBottom: '1px solid',
              borderColor: 'divider',
            })}
          >
            <Box
              sx={{
                flexGrow: 1,
                display: 'flex',
                alignItems: 'center',
                ml: '-18px',
                px: 0,
              }}
            >
              <Typography variant="h6" noWrap component="div" sx={{ color: 'primary.main' }}>
                EECFIN Member Manager
              </Typography>
              
              <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                <MenuItem onClick={() => navigate('/')} sx={{ py: '6px', px: '12px' }} >
                  <Typography color="text.primary">
                    Home
                  </Typography>
                </MenuItem>
                <MenuItem onClick={() => navigate('/follow-up')} sx={{ py: '6px', px: '12px' }} >
                  <Typography color="text.primary">
                    Follow ups
                  </Typography>
                </MenuItem>
                <MenuItem onClick={() => navigate('/ministries')} sx={{ py: '6px', px: '12px' }} >
                  <Typography color="text.primary">
                    Ministries
                  </Typography>
                </MenuItem>
                <MenuItem onClick={handleLogout} sx={{ py: '6px', px: '12px', position: 'absolute', right: 0 }} >
                  <Typography color="text.primary">
                    Logout
                  </Typography>
                </MenuItem>
              </Box>
            </Box>
            <Box
              sx={{
                display: { xs: 'none', md: 'flex' },
                gap: 0.5,
                alignItems: 'center',
              }}
            >
            </Box>
            <Box sx={{ display: { sm: '', md: 'none' } }}>
              <Button
                variant="text"
                color="primary"
                aria-label="menu"
                onClick={toggleDrawer(true)}
                sx={{ minWidth: '30px', p: '4px' }}
              >
                <MenuIcon />
              </Button>
              <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
                <Box
                  sx={{
                    minWidth: '60dvw',
                    p: 2,
                    backgroundColor: 'background.paper',
                    flexGrow: 1,
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'end',
                      flexGrow: 1,
                    }}
                  >
                  </Box>
                  <MenuItem onClick={() => navigate('/')}>
                    Home
                  </MenuItem>
                  <MenuItem onClick={() => navigate('/follow-up')}>
                    Members
                  </MenuItem>
                  <MenuItem onClick={() => navigate('/ministries')}>
                    Ministries
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={handleLogout}>
                    Logout
                  </MenuItem>
                </Box>
              </Drawer>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}



export default NavBar;