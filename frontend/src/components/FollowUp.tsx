import Container from '@mui/material/Container';
import { useEffect, useState } from 'react';
import { MinisterResponse, Member, MemberObj, Minister} from '../types/Member';
import MembersUnderMinister from './MembersUnderMinister';
import { getWeekMap } from '../utils/date';

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
            lastName: minister.lastName,
            members: membersUnderMinister
        }
    })

    console.log({minsiterData});

    return minsiterData;
};

const FollowUp = () => {
    const [ministers, setMinisters] = useState<Minister[]>();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8000/members', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                    },
                });
                const data = await response.json();
                setMinisters(mapResponse(data));
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
            {ministers && ministers.map((minister) => {
                return (
                    <div key={minister.id}>
                        <p>{minister.firstName} {minister.middleName} {minister.lastName}</p>
                        <MembersUnderMinister members={minister.members} />
                    </div>
                );
            })}
        </Container>
    );
  };
  
  export default FollowUp;