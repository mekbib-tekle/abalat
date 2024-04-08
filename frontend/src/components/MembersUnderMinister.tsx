import { Container, Grid, Typography } from '@mui/material/';

import { Member } from '../types/Member';

interface MembersUnderMinisterProps {
    members: Member[] | undefined;
}

const printMember = (member: Member) => {
    const { firstName, middleName, lastName } = member;

    return (
        <Typography>
            {firstName} {middleName} {lastName}
        </Typography>
    );
}
  
const MembersUnderMinister: React.FC<MembersUnderMinisterProps> = ({ members }) => {
    const memberTypes: string[] = ['member','regular','visitor','remote' ]; // fetch from server

    if (!members) return (<Container>No members</Container>)

    const groupedMembers = members.reduce((acc: { [key: string]: Member[] }, member: Member) => {
        if (!acc[member.memberType]) {
            acc[member.memberType] = [];
        }
        acc[member.memberType].push(member);
        return acc;
    }, {});

    // Calculate the maximum number of rows for any member type
    const maxRows = Math.max(...Object.values(groupedMembers).map((members) => members.length));

    return (
        <Grid container spacing={3}>
            {memberTypes.map((memberType) => (
                <Grid item xs={12} sm={6} md={3} key={memberType} className="member-grid">
                    <Typography fontWeight="bold">
                        {memberType[0].toUpperCase() + memberType.slice(1)}
                    </Typography>
                    {[...Array(maxRows)].map((_, index) => (
                        <div key={index} className="member-cell">
                            {groupedMembers[memberType] && groupedMembers[memberType][index] &&
                                printMember(groupedMembers[memberType][index])}
                        </div>
                    ))}
                </Grid>
            ))}
        </Grid>
    );
};
  
export default MembersUnderMinister;