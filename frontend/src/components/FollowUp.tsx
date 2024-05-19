import Container from '@mui/material/Container';
import { useEffect, useState } from 'react';
import { MinisterResponse, Member, MemberObj, Minister } from '../utils/types';
import { getWeekMap, isLessThan7DaysAgo } from '../utils/date';
import { get } from '../utils/api';
import { Grid, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import MemberGroupsByContactLog from './MemberGroupsByContactLog';
import FollowUpModal from './FollowUpModal';
import FlaggedMembersList from './FlaggedMembersList';

// convert the data from the server to a more structured format
export const mapResponse = (data: MinisterResponse[]): Minister[] => {
    const minsiterData = data && data.map((minister: MinisterResponse): Minister => {
        const members = minister.members;
        const membersUnderMinister = members.map((member: MemberObj): Member => {
            const memberData = member.member;
            const memberType = memberData.memberType.name;
            const contactLog = memberData.contactingMinisters;
            let latestContact = contactLog && contactLog.length ? contactLog[0].created_at : '';
            let isFlagged = false;
            contactLog.forEach((log: any) => {
                if (!latestContact || (new Date(log.created_at)).getTime() > (new Date(latestContact)).getTime()) {
                    latestContact = log.created_at;
                }
                if (isLessThan7DaysAgo(log.created_at) && log.flagged) {
                    isFlagged = true;
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
                isFlagged,
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
    const [showFlaggedOnly, setShowFlaggedOnly] = useState<boolean>(false);
    const [flaggedMembers, setFlaggedMembers] = useState<Member[]>();

    const handleChange = (
        event: React.MouseEvent<HTMLElement>,
        source: string,
    ) => {
        setContactSource(source);
    };

    const handleFlaggedChange = (event: React.MouseEvent<HTMLElement>, showFlagged: boolean) => {
        setShowFlaggedOnly(showFlagged);
    }

    useEffect(() => {
        const fetchData = async (uri: string) => {
            try {
                const response = await get(uri);
                setMinisters(mapResponse(response));
                setLoading(false);
            } catch (error) {
                setMinisters([]);
                setLoading(false);
            }
        };

        fetchData(`/members/follow-ups?filter=${contactSource}`);
    }, [contactSource, showFollowUpModal]);

    useEffect(() => {
        const fetchData = async (uri: string) => {
            try {
                const response = await get(uri);
                const _ministers = mapResponse(response);


                const members = _ministers && _ministers.reduce((acc: Member[], minister: Minister) => {
                    const allMembers = minister.members;
                    const flaggedMembers = allMembers.filter(member => member.isFlagged)
                    return [...acc, ...flaggedMembers];
                }, []);

                setFlaggedMembers(members);
                setLoading(false);
            } catch (error) {
                setFlaggedMembers([]);
                setLoading(false);
            }
        }

        if (showFlaggedOnly) {
            fetchData('/members/follow-ups?filter=all');
        }
    }, [showFlaggedOnly]);

    if (loading) return (<Container>Loading members...</Container>);

    if (!ministers || !ministers.length) return (<Container>No ministers found.</Container>);



    return (
        <Container>
            <h1>Follow up</h1>
            <Grid container spacing={2}>
                <Grid item xs={6} alignContent={'left'} textAlign={'left'}>
                    <Typography> &nbsp;&nbsp;</Typography>
                    <ToggleButtonGroup
                        color="primary"
                        value={showFlaggedOnly}
                        exclusive
                        onChange={handleFlaggedChange}
                    >
                        <ToggleButton size='small' value={false}>All Members</ToggleButton>
                        <ToggleButton size='small' value={true}>Flagged Members Only</ToggleButton>
                    </ToggleButtonGroup>
                </Grid>
                <Grid item xs={6} alignContent={'right'} textAlign={'right'}>
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
                {!showFlaggedOnly && ministers && ministers.map((minister) => {
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

                {showFlaggedOnly && flaggedMembers && flaggedMembers.length ? (
                    <FlaggedMembersList
                        flaggedMembers={flaggedMembers}
                        setSelectedMember={setSelectedMember}
                        setShowFollowUpModal={setShowFollowUpModal}
                    />
                ) : (<Grid item xs={12}>
                    <div className="no-members-found">
                        <p>No flagged members found!</p>
                        <span className="error-icon">
                            <i className="fas fa-exclamation-circle"></i>
                        </span>
                    </div>
                </Grid>)}
            </Grid>

            {showFollowUpModal && selectedMember && <FollowUpModal member={selectedMember} onClose={() => setShowFollowUpModal(false)} />}
        </Container>
    );
};

export default FollowUp;


