import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, Button, TextField, Select, MenuItem, FormControl, InputLabel, SelectChangeEvent, Grid, FormControlLabel, Checkbox } from '@mui/material';
import { get, post } from '../utils/api';
import ContactLog from './ContactLog';

interface MemberModalProps {
    open: boolean;
    handleClose: () => void;
    memberId: number;
}

const MemberModal: React.FC<MemberModalProps> = ({ open, handleClose, memberId }) => {
    const [member, setMember] = useState<any>(null);
    const memberTypes: string[] = ['member', 'regular', 'visitor', 'remote']; // fetch from server
    const maritalStatuses: string[] = ['Single', 'Married', 'Divorced', 'Widowed'];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await get(`members/${memberId}`);
                console.log({ response })
                setMember({...response, memberType: response.memberType?.name});
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

    const handleMaritalStatusChange = (event: SelectChangeEvent<string>) => {
        setMember({ ...member, maritalStatus: event.target.value });
    };

    const handleGenderChange = (event: SelectChangeEvent<string>) => {
        setMember({ ...member, gender: event.target.value });
    };

    const handleCheckBoxChange = (checked: boolean, target: string) => {
        setMember({ ...member, [target]: checked });
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (member) {
            console.log({member})
            post('members/update', member);
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
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2}>
                                    <Grid item xs={6} sm={6}>
                                        <TextField
                                            label="Address"
                                            name="address"
                                            value={member.address}
                                            onChange={handleInputChange}
                                            margin="normal"
                                            fullWidth
                                            multiline
                                        />
                                    </Grid>
                                    <Grid item xs={6} sm={6}>
                                        <TextField
                                            label="Emergency Contact"
                                            name="emergencyContact"
                                            value={member.emergencyContact || ''}
                                            onChange={handleInputChange}
                                            margin="normal"
                                            fullWidth
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2}>
                                    <Grid item xs={4} sm={4}>
                                        <TextField
                                            label="Username"
                                            name="username"
                                            value={member.username || ''}
                                            onChange={handleInputChange}
                                            margin="normal"
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={4} sm={4}>
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
                                    <Grid item xs={4} sm={4}>
                                        <FormControl fullWidth margin="normal">
                                            <InputLabel id="maritalStatus-label">Marital Status</InputLabel>
                                            <Select
                                                labelId="maritalStatus-label"
                                                id="maritalStatus"
                                                value={member.maritalStatus}
                                                label="Marital Status"
                                                onChange={handleMaritalStatusChange}
                                            >
                                                {maritalStatuses.map((type) => (
                                                    <MenuItem key={type} value={type}>
                                                        {type}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </Grid>

                                <Grid container spacing={2}>
                                    <Grid item xs={4} sm={4}>
                                        <TextField
                                            label="previous church"
                                            name="previousChurch"
                                            value={member.previousChurch}
                                            onChange={handleInputChange}
                                            margin="normal"
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={4} sm={4}>
                                        <TextField
                                            label="Role in previous church"
                                            name="roleInPreviousChurch"
                                            value={member.roleInPreviousChurch}
                                            onChange={handleInputChange}
                                            margin="normal"
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={4} sm={4} style={{ paddingTop: "30px" }}>
                                        <FormControlLabel
                                            control={<Checkbox
                                                checked={member.hasLetterFromPrevChurch}
                                                onChange={
                                                    (event) => handleCheckBoxChange(event.target.checked, "hasLetterFromPrevChurch")
                                                }
                                            />}
                                            label="Has letter from Prev church?"
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2}>
                                    <Grid item xs={6} sm={6}>
                                        <TextField
                                            label="Spouse name"
                                            name="spouseName"
                                            value={member.spouseName}
                                            onChange={handleInputChange}
                                            margin="normal"
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={6} sm={6}>
                                        <TextField
                                            label="Children names"
                                            name="childrenNames"
                                            value={member.childrenNames}
                                            onChange={handleInputChange}
                                            margin="normal"
                                            fullWidth
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2}>
                                    <Grid item xs={4} sm={4}>
                                        <FormControl fullWidth margin="normal">
                                            <InputLabel id="gender-label">Gender</InputLabel>
                                            <Select
                                                labelId="gender-label"
                                                id="gender"
                                                value={member.gender}
                                                label="Gender"
                                                onChange={handleGenderChange}
                                            >
                                                {["Male", "Female"].map((type) => (
                                                    <MenuItem key={type} value={type}>
                                                        {type}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>

                                    </Grid>
                                    <Grid item xs={4} sm={4} style={{ paddingTop: "40px" }}>
                                        <FormControlLabel
                                            control={<Checkbox
                                                checked={member.isActive}
                                                onChange={
                                                    (event) => handleCheckBoxChange(event.target.checked, "isActive")
                                                }
                                            />}
                                            label="Is Active"
                                        />
                                    </Grid>
                                    <Grid item xs={4} sm={4} style={{ paddingTop: "40px" }}>
                                        <FormControlLabel
                                            control={<Checkbox
                                                checked={member.isBaptised}
                                                onChange={
                                                    (event) => handleCheckBoxChange(event.target.checked, "isBaptised")
                                                }
                                            />}
                                            label="Is Baptised"
                                        />
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
                        <Grid item xs={12} sm={6}>
                            <center>CONTACT LOG</center>
                            <ContactLog memberId={member.id} />
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