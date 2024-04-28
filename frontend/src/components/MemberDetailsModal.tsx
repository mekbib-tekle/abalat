import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, Button, TextField, Select, MenuItem, FormControl, InputLabel, SelectChangeEvent, Grid } from '@mui/material';
import { get } from '../utils/api';
import ContactLog from './ContactLog';

interface MemberModalProps {
    open: boolean;
    handleClose: () => void;
    memberId: number;
}

const MemberModal: React.FC<MemberModalProps> = ({ open, handleClose, memberId }) => {
    const [member, setMember] = useState<any>(null);
    const memberTypes: string[] = ['member', 'regular', 'visitor', 'remote']; // fetch from server

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await get(`members/${memberId}`);
                setMember(response);
            } catch (error) {
                setMember([]);
            }
        };

        if (open && memberId) {
            fetchData();
        }
    }, [open, memberId]);

    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80%',
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setMember({ ...member, [event.target.name]: event.target.value });
    };

    const handleMemberTypeChange = (event: SelectChangeEvent<string>) => {
        setMember({ ...member, memberType: event.target.value });
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (member) {
            //   handleUpdateMember(member); // Pass updated member data to parent
            handleClose();
        }
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            <Box sx={modalStyle}>
                <Typography variant="h6" id="modal-title">
                    Member Details
                </Typography>
                {member ? (
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>

                            <form onSubmit={handleSubmit}>
                                <Grid container spacing={2}>
                                    <Grid item xs={4} sm={4}>
                                        <TextField
                                            label="First Name"
                                            name="firstName"
                                            value={member.firstName}
                                            onChange={handleInputChange}
                                            margin="normal"
                                            fullWidth
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={4} sm={4}>
                                        <TextField
                                            label="Last Name"
                                            name="lastName"
                                            value={member.lastName}
                                            onChange={handleInputChange}
                                            margin="normal"
                                            fullWidth
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={4} sm={4}>
                                        <TextField
                                            label="Middle Name"
                                            name="middleName"
                                            value={member.middleName}
                                            onChange={handleInputChange}
                                            margin="normal"
                                            fullWidth
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2}>
                                    <Grid item xs={6} sm={6}>
                                        <TextField
                                            label="Phone Number"
                                            name="phoneNumber"
                                            value={member.phoneNumber}
                                            onChange={handleInputChange}
                                            margin="normal"
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={6} sm={6}>
                                        <TextField
                                            label="Email"
                                            name="email"
                                            value={member.email}
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
                                    value={member.address}
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
                                            value={member.username || ''} // Handle optional username
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
                                                value={member.memberType}
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

                                <Grid container spacing={2}>
                                    <Grid item xs={6} sm={6}>
                                        <Button variant="contained" type="submit" color="primary">
                                            Save Changes
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} sm={6}>
                                        <Button variant="contained" color="warning" onClick={handleClose}>
                                            Close
                                        </Button>
                                    </Grid>
                                </Grid>
                            </form>
                        </Grid>
                        <Grid item xs={12}  sm={6}>
                            <center>CONTACT LOG</center>
                            <ContactLog memberId={member.id}/>
                        </Grid>
                    </Grid>
                ) : (
                    <>
                        <Typography variant="body2">Loading member details...</Typography>
                        <Button variant="contained" color="warning" onClick={handleClose}>
                            Close
                        </Button>
                    </>
                )}
            </Box>
        </Modal>
    );
};

export default MemberModal;