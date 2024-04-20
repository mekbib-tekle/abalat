import Container from '@mui/material/Container';
import { useEffect, useState } from 'react';
import { Minister } from '../types/Member';
import { get } from '../utils/api';
import { Grid } from '@mui/material';
import MemberGroupsByContactLog from './MemberGroupsByContactLog';
import { mapResponse } from './FollowUp';

const FollowUp = () => {
    const [ministers, setMinisters] = useState<Minister[]>();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            const ministerId = 1; // Todo pass loggedin user's id
            try {
                const response = await get(`members/follow-ups?minister_id=${ministerId}`);
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
            <Grid container spacing={2}>
                {ministers && ministers.map((minister) => {
                    return (
                        <Container key={minister.id}>
                            <MemberGroupsByContactLog members={minister.members} />
                        </Container>
                    );
                })}
            </Grid>
        </Container>
    );
  };
  
  export default FollowUp;


