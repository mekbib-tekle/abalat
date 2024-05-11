import { Paper, Table, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import MemberGroupsByType from './MemberGroupsByType';
import { Member } from '../utils/types';

interface FlaggedMembersListProps {
    flaggedMembers: Member[] | undefined;
    setSelectedMember: (member: Member) => void;
    setShowFollowUpModal: (flag: boolean) => void;
}

const FlaggedMembersList: React.FC<FlaggedMembersListProps> = ({flaggedMembers, setSelectedMember, setShowFollowUpModal}) => {
    const memberTypes: string[] = ['member', 'regular', 'visitor', 'remote'];

    return (
        <Container>
            <TableContainer component={Paper} className="flagged-members-table-container">
                <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                        <TableRow>
                            {memberTypes.map((memberType) => (
                                <TableCell key={memberType} className={`${memberType}-type-cell`}>
                                    <Typography variant="body2" fontWeight="fontWeightBold">
                                        {memberType[0].toUpperCase() + memberType.slice(1)}s
                                    </Typography>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <MemberGroupsByType
                        members={flaggedMembers}
                        weekFrame="This Week"
                        setSelectedMember={setSelectedMember}
                        setShowFollowUpModal={setShowFollowUpModal}
                    />
                </Table>
            </TableContainer>
        </Container>
    );
};

export default FlaggedMembersList;