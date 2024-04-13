import * as React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';

interface AddMemberModalProps {
  open: boolean; // Open state for the modal
  onClose: () => void; // Function to close the modal
  onSubmit: (name: string, email: string) => void; // Function to handle form submission
}

const AddMemberModal: React.FC<AddMemberModalProps> = ({ open, onClose, onSubmit }) => {
  const [firstName, setFirstName] = React.useState('');
  const [email, setEmail] = React.useState('');

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    onSubmit(firstName, email); // Call the provided onSubmit function with form data
    onClose(); // Close the modal after submission
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Member</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="First Name"
          type="text"
          fullWidth
          value={firstName}
          onChange={handleNameChange}
          variant="outlined"
        />
        <TextField
          margin="dense"
          label="Email"
          type="email"
          fullWidth
          value={email}
          onChange={handleEmailChange}
          variant="outlined"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Add Member
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddMemberModal;