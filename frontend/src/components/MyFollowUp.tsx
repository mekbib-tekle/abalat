import Container from '@mui/material/Container';
import { useEffect, useState } from 'react';
import { Member, Minister } from '../utils/types';
import { get } from '../utils/api';
import { Grid } from '@mui/material';
import MemberGroupsByContactLog from './MemberGroupsByContactLog';
import { mapResponse } from './FollowUp';
import FollowUpModal from './FollowUpModal';
import { decodeToken } from '../utils/token';

const FollowUp = () => {
    const [ministers, setMinisters] = useState<Minister[]>();
    const [loading, setLoading] = useState(false);
    const [showFollowUpModal, setShowFollowUpModal] = useState(false);
    const [selectedMember, setSelectedMember] = useState<Member>();

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('authToken');
            const decodedToken = token ? decodeToken(token) : null;

            try {
                const response = await get(`members/follow-ups?minister_id=${decodedToken?.sub}`);
                setMinisters(mapResponse(response));
                setLoading(false);
            } catch (error) {
                setMinisters([]);
                setLoading(false);
            }
        };
        fetchData();
    }, [showFollowUpModal]);

    if (loading) return (<Container>Loading members...</Container>);

    if (!ministers || !ministers.length) return (<Container>No members found.</Container>);

    return (
        <Container>
            <Grid container spacing={2}>
                {ministers && ministers.map((minister) => {
                    return (
                        <Container key={minister.id}>
                            <MemberGroupsByContactLog
                                members={minister.members}
                                setSelectedMember={setSelectedMember}
                                setShowFollowUpModal={setShowFollowUpModal}
                            />
                        </Container>
                    );
                })}
            </Grid>

            {showFollowUpModal && selectedMember && <FollowUpModal member={selectedMember} onClose={setShowFollowUpModal} />}
        </Container>
    );
  };
  
  export default FollowUp;


