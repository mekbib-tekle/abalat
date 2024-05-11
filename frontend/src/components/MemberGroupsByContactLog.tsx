import { Member } from '../utils/types';
import { WeekFrame } from '../utils/date';
import MemberGroupsByType from './MemberGroupsByType';
import { Container, Paper, Table, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

interface MemberGroupsByContactLogProps {
    members: Member[] | undefined;
    setSelectedMember: (member: Member) => void;
    setShowFollowUpModal: (flag: boolean) => void;
}

const MemberGroupsByContactLog: React.FC<MemberGroupsByContactLogProps> = ({ members, setSelectedMember, setShowFollowUpModal }) => {
    if (!members) return (<Container>No members</Container>)

    const memberTypes: string[] = ['member','regular','visitor','remote' ]; // fetch from server

    const groupedMembers = members.reduce((acc: { [key: string]: Member[] }, member: Member) => {
        if (!member.latestContact) {
            member.latestContact = WeekFrame.overFourWeeksAgo;
        }

        if (!acc[member.latestContact]) {
            acc[member.latestContact] = [];
        }

        acc[member.latestContact].push(member);
        return acc;
    }, {});

    return (
        <>
        {Object.keys(WeekFrame).map((latestContact) => {
            return (
                <>
                    <TableContainer component={Paper} className="week-table-container">
                        <Table sx={{ minWidth: 650 }}>
                            <TableHead  key={latestContact} >
                                <TableRow>
                                    <TableCell align="center" colSpan={4}>
                                        <Typography variant="body2" fontWeight="fontWeightBold">
                                            {WeekFrame[latestContact] === WeekFrame.thisWeek &&  'Contacted '}
                                            {WeekFrame[latestContact] === WeekFrame.lastWeek &&  'Contacted '}
                                            {WeekFrame[latestContact]}
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            </TableHead>

                            {WeekFrame[latestContact] === WeekFrame.thisWeek && (
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
                            )}

                        <MemberGroupsByType
                            members={groupedMembers[WeekFrame[latestContact]]}
                            weekFrame={WeekFrame[latestContact]}
                            setSelectedMember={setSelectedMember}
                            setShowFollowUpModal={setShowFollowUpModal}
                        />
                    </Table>
                </TableContainer>
            </>)
        })}
    </>
    );
};
  
  export default MemberGroupsByContactLog;