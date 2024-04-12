import Container from '@mui/material/Container';
import { useEffect, useState } from 'react';
import { MinisterResponse, Member, MemberObj, Minister } from '../types/Member';
import { getWeekMap } from '../utils/date';
import { get } from '../utils/api';
import { Grid, Typography } from '@mui/material';
import MemberGroupsByContactLog from './MemberGroupsByContactLog';

// convert the data from the server to a more structured format
const mapResponse = (data: MinisterResponse[]): Minister[] => {
    const minsiterData = data && data.map((minister: MinisterResponse): Minister => {
        const members = minister.members;
        const membersUnderMinister = members.map((member: MemberObj): Member => {
            const memberData = member.member;
            const memberType = memberData.memberType.name;
            const contactLog = memberData.contactingMinisters;
            let latestContact = contactLog && contactLog.length ? contactLog[0].created_at: '';
            contactLog.forEach((log: any) => {
                if (!latestContact || (new Date(log.created_at)).getTime() > (new Date(latestContact)).getTime()) {
                    latestContact = log.created_at;
                }
            });

            return {
                id: memberData.id,
                firstName: memberData.firstName,
                middleName: memberData.middleName,
                lastName: memberData.lastName,
                phoneNumber: memberData.phoneNumber,
                email: memberData.email,
                address: memberData.address,
                memberType,
                latestContact: getWeekMap(latestContact),
                created_at: memberData.created_at,
            }
        });

        return {
            id: minister.id,
            firstName: minister.firstName,
            middleName: minister.middleName,
            phoneNumber: minister.phoneNumber,
            email: minister.email,
            address: minister.address,
            lastName: minister.lastName,
            members: membersUnderMinister
        }
    })

    return minsiterData;
};

const FollowUp = () => {
    const [ministers, setMinisters] = useState<Minister[]>();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await get('members');
                setMinisters(mapResponse(response));
                setLoading(false);
            } catch (error) {
                setMinisters([]);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return (<Container>Loading members...</Container>);

    if (!ministers || !ministers.length) return (<Container>No ministers found.</Container>);

    return (
        <Container>
            <h1>Follow up</h1>
            <Grid container spacing={2}>
                {ministers && ministers.map((minister) => {
                    return (
                        <Container key={minister.id}>
                            <Typography fontWeight="bold" color="primary" style={{ marginTop: '40px' }}>
                                {minister.firstName} {minister.middleName} {minister.lastName}
                            </Typography>

                            <MemberGroupsByContactLog members={minister.members} />
                        </Container>
                    );
                })}
            </Grid>
        </Container>
    );
  };
  
  export default FollowUp;


