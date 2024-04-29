import { TableBody, TableCell, TableRow } from '@mui/material/';
import { Member } from '../utils/types';
import PriorityHighOutlinedIcon from '@mui/icons-material/PriorityHighOutlined';

interface MemberGroupsByTypeProps {
    members: Member[] | undefined;
    weekFrame: string;
    setSelectedMember: (member: Member) => void;
    setShowFollowUpModal: (flag: boolean) => void;
}

const MemberGroupsByType: React.FC<MemberGroupsByTypeProps> = ({ members, weekFrame, setSelectedMember, setShowFollowUpModal }) => {
    const memberTypes: string[] = ['member', 'regular', 'visitor', 'remote']; // fetch from server

    const handleClick = (member: Member) => {
        setSelectedMember(member);
        setShowFollowUpModal(true);
    };

    if (!members) {
        return (
            <TableRow>
                <TableCell colSpan={4}>No members contacted {weekFrame}</TableCell>
            </TableRow>
        )
    }

    const groupedMembers = members.reduce((acc: { [key: string]: Member[] }, member: Member) => {
        if (!acc[member.memberType]) {
            acc[member.memberType] = [];
        }
        acc[member.memberType].push(member);
        return acc;
    }, {});

    const printMember = (member: Member) => {
        const { firstName, middleName, lastName } = member;

        return (
            <div onClick={() => handleClick(member)} style={{ cursor: 'pointer' }}>
                {firstName} {middleName} {lastName}
                {member.isFlagged && (member) && <PriorityHighOutlinedIcon color='error'/>}
            </div>
        );
    }

    // Calculate the maximum number of rows for any member type
    const maxRows = Math.max(...Object.values(groupedMembers).map((members) => members.length));

    const groupedMembersByRows = [...Array(maxRows)].map((_, index) => {
        return memberTypes.map((memberType) => {
            return groupedMembers[memberType]?.[index];
        })
    });

    return (
        <TableBody>
            {groupedMembersByRows.map((memberGroups) => (
                <TableRow>
                    {memberGroups.map((member, index) => (
                        <TableCell key={index} className={`member-cell ${member && member.memberType}-type-cell member-type-${index+1}-cell`}>
                            {member && printMember(member)}
                        </TableCell>
                    ))}
                </TableRow>
            ))}
        </TableBody>
    );
};

export default MemberGroupsByType;