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
import ProfileIcon from './ProfileIcon';
import { handleLogout } from '../utils/api';

function NavBar() {
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

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
              backgroundColor: '#083D77',
              minHeight: '55px!important',
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
              <Typography variant="h5" noWrap component="div" className='logo-text'>
                EECFIN Member Manager
              </Typography>

              <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                <MenuItem onClick={() => navigate('/')} sx={{ py: '8px', px: '12px' }} className='menu-item'>
                  <Typography color="text.primary">
                    HOME
                  </Typography>
                </MenuItem>
                <MenuItem onClick={() => navigate('/follow-up')} sx={{ py: '6px', px: '12px' }} className='menu-item'>
                  <Typography color="text.primary">
                    FOLLOW UPs
                  </Typography>
                </MenuItem>
                <MenuItem onClick={() => navigate('/members')} sx={{ py: '6px', px: '12px' }} className='menu-item'>
                  <Typography color="text.primary">
                    MEMBERS
                  </Typography>
                </MenuItem>
                <MenuItem onClick={() => navigate('/admin')} sx={{ py: '6px', px: '12px' }} className='menu-item'>
                  <Typography color="text.primary">
                    ADMIN
                  </Typography>
                </MenuItem>
                <MenuItem sx={{ py: '6px', px: '12px', position: 'absolute', right: 0 }}>
                  <ProfileIcon />
                </MenuItem>
              </Box>
              <Box>
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
                    HOME
                  </MenuItem>
                  <MenuItem onClick={() => navigate('/follow-up')}>
                    FOLLOW UPs
                  </MenuItem>
                  <MenuItem onClick={() => navigate('/members')}>
                    MEMBERS
                  </MenuItem>
                  <MenuItem onClick={() => navigate('/admin')}>
                    ADMIN
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={() => navigate('/profile')}>
                    MY PROFILE
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    LOGOUT
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