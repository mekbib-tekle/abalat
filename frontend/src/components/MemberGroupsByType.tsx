import { Grid, Typography } from '@mui/material/';

import { Member } from '../types/Member';
import { useState } from 'react';
import MemberModal from './MemberModal';

interface MemberGroupsByTypeProps {
    members: Member[] | undefined;
    weekFrame: string;
}
  
const MemberGroupsByType: React.FC<MemberGroupsByTypeProps> = ({ members, weekFrame }) => {
    const memberTypes: string[] = ['member','regular','visitor','remote' ]; // fetch from server
    const [showModal, setShowModal] = useState(false);
    const [selectedMember, setSelectedMember] = useState<Member>();

    const handleClick = (member: Member) => {
      setSelectedMember(member);
      setShowModal(true);
    };

    if (!members) {
        return (
            <Grid className="member-grid">
                <Grid className="member-cell">No members contacted {weekFrame}</Grid>
            </Grid>
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
            <Typography onClick={() => handleClick(member)} style={{ cursor: 'pointer' }}>
                {firstName} {middleName} {lastName}
            </Typography>
        );
    }

    // Calculate the maximum number of rows for any member type
    const maxRows = Math.max(...Object.values(groupedMembers).map((members) => members.length));

    return (
        <Grid container spacing={3}>
            {memberTypes.map((memberType) => (
                <Grid item xs={12} sm={6} md={3} key={memberType} className="member-grid">
                    {[...Array(maxRows)].map((_, index) => (
                        <div key={index} className="member-cell">
                            {groupedMembers[memberType] && groupedMembers[memberType][index] &&
                                printMember(groupedMembers[memberType][index])}
                        </div>
                    ))}
                </Grid>
            ))}

            {showModal && selectedMember && <MemberModal member={selectedMember} onClose={() => setShowModal(false)} />}
        </Grid>
    );
};
  
export default MemberGroupsByType;