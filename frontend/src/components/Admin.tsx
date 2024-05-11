import React, { useEffect, useState } from 'react';
import { DndProvider, useDrag, useDrop, DragSourceMonitor } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { get, post } from '../utils/api';
import { Container, Grid } from '@mui/material';

interface DragItem {
  type: string;
  member: Member;
}

interface Minister {
  id: string;
  name: string;
  members: Member[];
}

interface Member {
  id: string;
  name: string;
  memberType: string;
}

// Define drag item types
const ItemTypes = {
  MEMBER: 'member',
};

interface MemberItem {
  type: string;
  member: Member;
}

const MinisterColumn: React.FC<{ minister: Minister, members: Minister[], setMembers: (members: Minister[]) => void }> = ({ minister, members, setMembers }) => {
  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.MEMBER,
    drop: (item: MemberItem) => handleDrop(item, minister),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const handleDrop = (member: MemberItem, targetMinister: Minister) => {
    const sourceMinister = members.find((minister) => minister.members.some((u) => u.id === member.member.id));

    if (sourceMinister && sourceMinister !== targetMinister) {
      const updatedSourceMinister = {
        ...sourceMinister,
        members: sourceMinister.members.filter((u) => u.id !== member.member.id),
      };

      const updatedTargetMinister = {
        ...targetMinister,
        members: [...targetMinister.members, member.member],
      };

      const updateMembers = members.map((minister) => {
        if (minister.id === updatedSourceMinister.id) {
          return updatedSourceMinister;
        } else if (minister.id === updatedTargetMinister.id) {
          return updatedTargetMinister;
        }
        return minister;
      });

      post('members/update-mapping', {
        oldMinisterId: sourceMinister.id,
        newMinisterId: targetMinister.id,
        memberId: member.member.id
      });

      setMembers(updateMembers);
    }
  };

  const membersCount = minister.members.filter(m => m.memberType === "member").length;
  const regularsCount = minister.members.filter(m => m.memberType === "regular").length;
  const visitorsCount = minister.members.filter(m => m.memberType === "visitor").length;
  const remotesCount = minister.members.filter(m => m.memberType === "remote").length;

  return (
    <Grid item ref={drop} xs={3}>
      <Grid className="minister-card">
        <div className="minister-card-heading">
          <h4>{minister.name}</h4>
          <p>
            <span className="member-type-cell">{membersCount} Members</span>,&nbsp;
            <span className="regular-type-cell">{regularsCount} Regulars</span><br />
            <span className="remote-type-cell">{remotesCount} Remote</span>,&nbsp;
            <span className="visitor-type-cell">{visitorsCount} Visitors</span>
          </p>
        </div>
        {minister.members.sort((a, b) => { // Sort alphabetically by memberType
          if (a.memberType < b.memberType) return -1;
          if (a.memberType > b.memberType) return 1;
          return 0;
        }).map((member) => (
          <MemberCard key={member.id} member={member} />
        ))}
      </Grid>
    </Grid>
  );
};

const MemberCard: React.FC<{ member: Member }> = ({ member }) => {
  const [{ isDragging }, drag] = useDrag<DragItem, unknown, { isDragging: boolean }>({
    type: ItemTypes.MEMBER,
    item: { type: ItemTypes.MEMBER, member },
    collect: (monitor: DragSourceMonitor<DragItem, unknown>) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1, cursor: 'move' }} className={`member-card ${member.memberType}-type-cell`}>
      {member.name}
    </div>
  );
};

const Admin: React.FC = () => {
  const [members, setMembers] = useState<Minister[]>([]);

  const mapResponse = (response: any): Minister[] => {
    return response.map((minister: any) => {
      const members = minister.members.map((member: any) => {
        const mem = member.member;
        return {
          id: mem.id,
          name: mem.firstName + " " + mem.middleName + " " + mem.lastName,
          memberType: mem.memberType.name
        }
      })

      return {
        id: minister.id,
        name: minister.firstName + " " + minister.lastName,
        members: members
      }
    })
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await get(`members/mapping`);
        setMembers(mapResponse(response));
      } catch (error) {
        setMembers([]);
      }
    };
    fetchData();
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <Container>
        <Grid container spacing={1}>
          {members.map((minister) => (
            <MinisterColumn key={minister.id} minister={minister} members={members} setMembers={setMembers} />
          ))}
        </Grid>
      </Container>
    </DndProvider>
  );
};

export default Admin;
