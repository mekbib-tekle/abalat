import Container from '@mui/material/Container';
import { Grid, Typography } from '@mui/material/';

import { Member } from '../types/Member';

interface MembersUnderMinisterProps {
    members: Member[] | undefined;
}
  
const MembersUnderMinister: React.FC<MembersUnderMinisterProps> = ({ members }) => {
    return (
        <Container>
            {members && members.map(member => {
                return (
                    <Grid container spacing={2}  key={member.id}>
                        <Grid item xs={4}>
                            <Typography variant="body2">
                                {member.firstName} {member.middleName}  {member.lastName}
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant="body2">
                                {member.memberType}
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant="body2">
                                {member.latestContact}
                            </Typography>
                        </Grid>
                    </Grid>
                )
            })}
        </Container>
    );
};
  
export default MembersUnderMinister;