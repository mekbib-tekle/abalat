import Container from '@mui/material/Container';
import { useEffect, useState } from 'react';
import { MinisterResponse, Member, MemberObj, Minister } from '../utils/types';
import { getWeekMap } from '../utils/date';
import { get } from '../utils/api';
import { Grid, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import MemberGroupsByContactLog from './MemberGroupsByContactLog';
import FollowUpModal from './FollowUpModal';

// convert the data from the server to a more structured format
export const mapResponse = (data: MinisterResponse[]): Minister[] => {
    const minsiterData = data && data.map((minister: MinisterResponse): Minister => {
        const members = minister.members;
        const membersUnderMinister = members.map((member: MemberObj): Member => {
            const memberData = member.member;
            const memberType = memberData.memberType.name;
            const contactLog = memberData.contactingMinisters;
            let latestContact = contactLog && contactLog.length ? contactLog[0].created_at : '';
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
    const [contactSource, setContactSource] = useState('own');
    const [showFollowUpModal, setShowFollowUpModal] = useState(false);
    const [selectedMember, setSelectedMember] = useState<Member>();

    const handleChange = (
        event: React.MouseEvent<HTMLElement>,
        source: string,
    ) => {
        setContactSource(source);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await get(`members/follow-ups?filter=${contactSource}`);
                setMinisters(mapResponse(response));
                setLoading(false);
            } catch (error) {
                setMinisters([]);
                setLoading(false);
            }
        };
        fetchData();
    }, [contactSource, showFollowUpModal]);

    if (loading) return (<Container>Loading members...</Container>);

    if (!ministers || !ministers.length) return (<Container>No ministers found.</Container>);

    return (
        <Container>
            <h1>Follow up</h1>
            <Grid container spacing={2}>
                <Grid item xs={12} alignContent={'right'} textAlign={'right'}>
                    <Typography>Show members contacted by &nbsp;&nbsp;</Typography>
                    <ToggleButtonGroup
                        color="primary"
                        value={contactSource}
                        exclusive
                        onChange={handleChange}
                    >
                        <ToggleButton size='small' value="own">Own ministers only</ToggleButton>
                        <ToggleButton size='small' value="all">All ministers</ToggleButton>
                    </ToggleButtonGroup>
                </Grid>
                {ministers && ministers.map((minister) => {
                    return (
                        <Container key={minister.id}>
                            <Typography className='minister-header'>
                                {minister.firstName} {minister.middleName} {minister.lastName}
                            </Typography>

                            <MemberGroupsByContactLog
                                members={minister.members}
                                setSelectedMember={setSelectedMember}
                                setShowFollowUpModal={setShowFollowUpModal}
                            />
                        </Container>
                    );
                })}
            </Grid>

            {showFollowUpModal && selectedMember && <FollowUpModal member={selectedMember} onClose={() => setShowFollowUpModal(false)} />}
        </Container>
    );
};

export default FollowUp;


