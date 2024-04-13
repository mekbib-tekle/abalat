import * as React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Grid, FormControl, InputLabel, Select, SelectChangeEvent, MenuItem } from '@mui/material';
import { useState } from 'react';

interface AddMemberModalProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (name: string, email: string) => void;
}

const AddMemberModal: React.FC<AddMemberModalProps> = ({ open, onClose, onSubmit }) => {
    const [firstName, setFirstName] = useState('');
    const [email, setEmail] = useState('');

    const memberTypes: string[] = ['member', 'regular', 'visitor', 'remote']; // fetch from server

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFirstName(event.target.value);
    };

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };


    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        // setMember({ ...member, [event.target.name]: event.target.value });
    };

    const handleMemberTypeChange = (event: SelectChangeEvent<string>) => {
        // setMember({ ...member, memberType: event.target.value });
    };

    const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        onSubmit(firstName, email);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Add New Member</DialogTitle>
            <DialogContent>
                <form>
                    <Grid container spacing={2}>
                        <Grid item xs={4} sm={4}>
                            <TextField
                                autoFocus
                                label="First Name"
                                fullWidth
                                value={firstName}
                                onChange={handleNameChange}
                                margin="normal"
                            />
                        </Grid>
                        <Grid item xs={4} sm={4}>
                            <TextField
                                label="Middle Name"
                                name="middleName"
                                value={firstName}
                                onChange={handleInputChange}
                                margin="normal"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={4} sm={4}>
                            <TextField
                                label="Last Name"
                                name="lastName"
                                value={firstName}
                                onChange={handleInputChange}
                                margin="normal"
                                fullWidth
                                required
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={6} sm={6}>
                            <TextField
                                label="Phone Number"
                                name="phoneNumber"
                                value={firstName}
                                onChange={handleInputChange}
                                margin="normal"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={6} sm={6}>
                            <TextField
                                label="Email"
                                name="email"
                                value={firstName}
                                onChange={handleInputChange}
                                margin="normal"
                                fullWidth
                                required
                            />
                        </Grid>
                    </Grid>
                    <TextField
                        label="Address"
                        name="address"
                        value={firstName}
                        onChange={handleInputChange}
                        margin="normal"
                        fullWidth
                        multiline
                    />
                    <Grid container spacing={2}>
                        <Grid item xs={6} sm={6}>
                            <TextField
                                label="Username"
                                name="username"
                                value={firstName || ''} // Handle optional username
                                onChange={handleInputChange}
                                margin="normal"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={6} sm={6}>
                            <FormControl fullWidth margin="normal">
                                <InputLabel id="memberType-label">Member Type</InputLabel>
                                <Select
                                    labelId="memberType-label"
                                    id="memberType"
                                    value={firstName}
                                    label="Member Type"
                                    onChange={handleMemberTypeChange}
                                >
                                    {memberTypes.map((type) => (
                                        <MenuItem key={type} value={type}>
                                            {type}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>

                </form>
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