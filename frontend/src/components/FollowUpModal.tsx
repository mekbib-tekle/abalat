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
  ToggleButtonGroup,
  TextField,
  Grid
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import { Member } from '../utils/types';
import { post } from '../utils/api';
import { decodeToken } from '../utils/token';
import MemberDetailsModal from './MemberDetailsModal';

interface FollowUpModalProps {
  member: Member | null;
  onClose: (flag: boolean) => void;
}

const FollowUpModal: React.FC<FollowUpModalProps> = ({ member, onClose }) => {
  const [contactMethod, setContactMethod] = useState<string>('');
  const [note, setNote] = useState<string>('');
  const [flagged, setFlagged] = useState(false);
  const [openDetailsModal, setOpenDetailsModal] = useState(false);

  const handleContactMethod = (
    event: React.MouseEvent<HTMLElement>,
    newContactMethod: string,
  ) => {
    setContactMethod(newContactMethod);
  };

  const handleNoteChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNote(event.target.value);
  };

  const handleFlagChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFlagged(event.target.checked);
  };

  if (!member) return null;

  function handleSubmit(event: React.MouseEvent<HTMLButtonElement>): void {
    const token = localStorage.getItem('authToken');
    const decodedToken = token ? decodeToken(token) : null;

    post("/members/follow-up", {
      flagged,
      note,
      contactMethod,
      ministerId: decodedToken?.sub,
      memberId: member && member.id
    });
    onClose(false);
  }

  return (
    <Dialog open onClose={onClose}>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6">Member Follow Up</Typography>
        <IconButton onClick={() => onClose(false)}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Grid container xs={12}>
          <Grid item xs={9}>
            <Typography variant="body1" style={{ fontWeight: 'bold' }}>
              {member.firstName} {member.middleName}  {member.lastName}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <IconButton onClick={() => setOpenDetailsModal(true)} color='success'>
              <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                More
              </Typography>
              <ReadMoreIcon />
            </IconButton>
          </Grid>
        </Grid>
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
          control={<Checkbox value={true} checked={flagged} onChange={handleFlagChange} />}
          label={`Flag ${member.firstName} for attention this week`}
        />
        <br />
        <div>
          <TextField
            label="Leave a note"
            variant="outlined"
            multiline
            rows={3}
            value={note}
            onChange={handleNoteChange}
            placeholder="Write your note here... (Don't write personal details)"
            fullWidth
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Save
        </Button>
        <Button variant="outlined" onClick={() => onClose(false)}>
          Close
        </Button>
      </DialogActions>

      {openDetailsModal &&
          <MemberDetailsModal open={openDetailsModal} handleClose={() => setOpenDetailsModal(false)} memberId={member.id} />}
    </Dialog>
  );
};

export default FollowUpModal;