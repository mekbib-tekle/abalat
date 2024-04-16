import { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TextField,
    Container,
    Grid,
    Button,
} from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';

import { Member } from '../types/Member';
import { get } from '../utils/api';
import AddMemberModal from './AddMemberModal';
import MemberDetailsModal from './MemberDetailsModal';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#607d8b",
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const Members = () => {
    const [filter, setFilter] = useState<string>('');
    const [members, setMembers] = useState<Member[]>();
    const [loading, setLoading] = useState(false);
    const [openAddMemberModal, setOpenAddMemberModal] = useState(false);
    const [openDetailsModal, setOpenDetailsModal] = useState(false);
    const [selectedMemberId, setSelectedMemberId] = useState<number | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await get('members');
                setMembers(response);
                setLoading(false);
            } catch (error) {
                setMembers([]);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const filteredMembers = members && members.length && members.filter(member =>{
        const filterText = filter.toLowerCase();
        return (
          member.firstName.toLowerCase().includes(filterText) ||
          (member.middleName && member.middleName.toLowerCase().includes(filterText)) ||
          member.lastName.toLowerCase().includes(filterText)
        );
      });

    if (loading) return (<Container>Loading members...</Container>);

    if (!members || !members.length) return (<Container>No members found.</Container>);

    const handleClickOpen = () => {
        setOpenAddMemberModal(true);
    };

    const handleAddMemberClose = () => {
        setOpenAddMemberModal(false);
    };

    const handleMemberSubmit = (name: string, email: string) => {
        // onCreateMember(name, email);
        handleAddMemberClose();
    };

    const handleOpenDetailsModal = (memberId: number) => {
        setSelectedMemberId(memberId);
        setOpenDetailsModal(true);
    };

    const handleCloseDetailsModal = () => {
        setSelectedMemberId(null);
        setOpenDetailsModal(false);
    };

    return (
        <Container>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={8}>
                    <h3>Members</h3>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Button variant="outlined" color="primary" onClick={handleClickOpen} >
                        Add Member
                    </Button>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <TextField
                        label="Filter by name"
                        variant="outlined"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        size="small"
                    />
                </Grid>
            </Grid>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Name</StyledTableCell>
                            <StyledTableCell>phoneNumber</StyledTableCell>
                            <StyledTableCell>Email</StyledTableCell>
                            <StyledTableCell>Address</StyledTableCell>
                            <StyledTableCell>Action</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredMembers && filteredMembers.map(member => (
                            <StyledTableRow key={member.id}>
                                <StyledTableCell>{member.firstName} {member.middleName} {member.lastName}</StyledTableCell>
                                <StyledTableCell>{member.phoneNumber}</StyledTableCell>
                                <StyledTableCell>{member.email}</StyledTableCell>
                                <StyledTableCell>{member.address}</StyledTableCell>
                                <StyledTableCell>
                                    <Button variant="text" onClick={() => handleOpenDetailsModal(member.id)}>Details</Button>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {selectedMemberId &&
                <MemberDetailsModal open={openDetailsModal} handleClose={handleCloseDetailsModal} memberId={selectedMemberId} />}
            <AddMemberModal open={openAddMemberModal} onClose={handleAddMemberClose} onSubmit={handleMemberSubmit} />
        </Container>
    );
};

export default Members;
