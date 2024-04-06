import { Grid, Table, TableBody, TableCell, TableRow, Typography } from '@mui/material/';

import { Member } from '../types/Member';

interface MembersUnderMinisterProps {
    members: Member[] | undefined;
}
  
const MembersUnderMinister: React.FC<MembersUnderMinisterProps> = ({ members }) => {
    const memberTypes: string[] = ['member','regular','visitor','remote' ]; // fetch from server

    return (
        <Grid container spacing={2}>
            {memberTypes.map((type) => (
                <Grid item xs={3} key={type}>
                    <Typography fontWeight="bold">{type}</Typography>
                    <Table className="table table-bordered">
                        <TableBody>
                            {members && members.filter((member) => member.memberType === type).map((member) => (
                                <TableRow key={member.firstName}>
                                    <TableCell>{member.firstName}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Grid>
            ))}
        </Grid>
    );
};
  
export default MembersUnderMinister;