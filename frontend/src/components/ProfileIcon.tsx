import * as React from 'react';
import { IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { handleLogout } from '../utils/api';
import { useNavigate } from 'react-router-dom';

interface ProfileIconProps {}

const ProfileIcon: React.FC<ProfileIconProps> = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Tooltip title="Account">
        <IconButton
          size="small"
          aria-label="account of current user"
          aria-controls={open ? 'user-menu' : undefined}
          aria-haspopup="true"
          onClick={handleClick}
          color="inherit"
        >
          <AccountCircleIcon />
          <ExpandMoreIcon />
        </IconButton>
      </Tooltip>
      <Menu
        id="user-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{ 'aria-labelledby': 'user-menu-button' }}
      >
        <MenuItem onClick={() => navigate('/profile')}>My Profile</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
};

export default ProfileIcon;
