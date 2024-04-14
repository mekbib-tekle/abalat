import React, { useState } from 'react';
import { 
  Button,
  Checkbox,
  FormControlLabel,
  ToggleButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  ToggleButtonGroup
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Member } from '../types/Member';

interface FollowUpModalProps {
  member: Member | null;
  onClose: () => void;
}

const FollowUpModal: React.FC<FollowUpModalProps> = ({ member, onClose }) => {
  const [contactMethod, setContactMethod] = useState<string>('');
  
  const handleContactMethod = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string,
  ) => {
    setContactMethod(newAlignment);
  };
  
  if (!member) return null;

  return (
    <Dialog open onClose={onClose}>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6">Member Follow Up</Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Typography variant="body1" style={{ fontWeight: 'bold' }}>
          {member.firstName} {member.middleName}  {member.lastName}
        </Typography>
        <Typography variant="body2">{member.phoneNumber}</Typography>
        <Typography variant="body2">{member.email}</Typography>
        <Typography variant="body2">{member.address}</Typography>
        <br />
        <Typography variant="body1">Did you contact {member.firstName}?</Typography>
        <ToggleButtonGroup
          value={contactMethod}
          exclusive
          onChange={handleContactMethod}
          aria-label="contact-method"
        >
          <ToggleButton value="faceToFace" aria-label="face to face">
            Face to Face
          </ToggleButton>
          <ToggleButton value="phone" aria-label="phone">
            Phone
          </ToggleButton>
          <ToggleButton value="text" aria-label="text">
            Text
          </ToggleButton>
        </ToggleButtonGroup>

        <br />
        <br />
        <FormControlLabel
          control={<Checkbox value={true} />}
          label={`Flag ${member.firstName} for attention this week`}
        />
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="primary">
          Save
        </Button>
        <Button variant="outlined" onClick={onClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FollowUpModal;