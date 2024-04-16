import { TableBody, TableCell, TableRow } from '@mui/material/';

import { Member } from '../types/Member';
import { useState } from 'react';
import FollowUpModal from './FollowUpModal';

interface MemberGroupsByTypeProps {
    members: Member[] | undefined;
    weekFrame: string;
}

const MemberGroupsByType: React.FC<MemberGroupsByTypeProps> = ({ members, weekFrame }) => {
    const memberTypes: string[] = ['member', 'regular', 'visitor', 'remote']; // fetch from server
    const [showModal, setShowModal] = useState(false);
    const [selectedMember, setSelectedMember] = useState<Member>();

    const handleClick = (member: Member) => {
        setSelectedMember(member);
        setShowModal(true);
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
            </div>
        );
    }

    // Calculate the maximum number of rows for any member type
    const maxRows = Math.max(...Object.values(groupedMembers).map((members) => members.length));
    // console.log({maxRows});
    console.log({ groupedMembers });

    const groupedMembersByRows = [...Array(maxRows)].map((_, index) => {
        return memberTypes.map((memberType) => {
            return groupedMembers[memberType]?.[index];
        })
    });

    console.log({ groupedMembersByRows });

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
            {showModal && selectedMember && <FollowUpModal member={selectedMember} onClose={() => setShowModal(false)} />}
        </TableBody>
    );
};

export default MemberGroupsByType;