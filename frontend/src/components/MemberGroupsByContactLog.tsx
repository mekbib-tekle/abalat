import Container from '@mui/material/Container';
import { Member } from '../types/Member';
import { WeekFrame } from '../utils/date';
import MemberGroupsByType from './MemberGroupsByType';
import { Typography } from '@mui/material';


interface MemberGroupsByContactLogProps {
    members: Member[] | undefined;
}

const MemberGroupsByContactLog: React.FC<MemberGroupsByContactLogProps> = ({ members }) => {
    if (!members) return (<Container>No members</Container>)

    const groupedMembers = members.reduce((acc: { [key: string]: Member[] }, member: Member) => {
        if (!member.latestContact) {
            member.latestContact = WeekFrame.overFourWeeksAgo;
        }

        if (!acc[member.latestContact]) {
            acc[member.latestContact] = [];
        }

        acc[member.latestContact].push(member);
        return acc;
    }, {});

    console.log({groupedMembers});

  return (
      <>
          {Object.keys(WeekFrame).map((latestContact) => {
            return (
                <div className='member-groups-by-contact-log'>
                    <Typography key={latestContact} className="week-frame-header">
                        {WeekFrame[latestContact] === WeekFrame.thisWeek &&  'Members contacted '}
                        {WeekFrame[latestContact] === WeekFrame.lastWeek &&  'Contacted '}
                        {WeekFrame[latestContact]}
                    </Typography>
                    <MemberGroupsByType 
                        members={groupedMembers[WeekFrame[latestContact]]}
                        weekFrame={WeekFrame[latestContact]}
                    />
                </div>
            )
          })}
      </>
  );
};
  
  export default MemberGroupsByContactLog;