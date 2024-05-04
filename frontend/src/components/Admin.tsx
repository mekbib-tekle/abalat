import React, { useEffect, useState } from 'react';
import { DndProvider, useDrag, useDrop, DragSourceMonitor } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { get } from '../utils/api';
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

      setMembers(updateMembers);
    }
  };

  return (
    <Grid item ref={drop} style={{ border: '1px solid black', padding: '1rem', margin: '1rem' }}>
      <h2>{minister.name}</h2>
      {minister.members.map((member) => (
        <MemberCard key={member.id} member={member} />
      ))}
    </Grid>
  );
};

const MemberCard: React.FC<{ member: Member }> = ({ member }) => {
  // Inside the component:
  const [{ isDragging }, drag] = useDrag<DragItem, unknown, { isDragging: boolean }>({
    type: ItemTypes.MEMBER,
    item: { type: ItemTypes.MEMBER, member },
    collect: (monitor: DragSourceMonitor<DragItem, unknown>) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1, cursor: 'move' }} className="member-card">
      {member.name}
    </div>
  );
};

// Define App component
const App: React.FC = () => {
  const [members, setMembers] = useState<Minister[]>([]);

  const mapResponse = (response: any): Minister[] => {
    return response.map((minister: any) => {
      const members = minister.members.map((member: any) => {
        const mem = member.member;
        return {
          id: mem.id,
          name: mem.firstName + " " + mem.middleName + " " + mem.lastName,
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

export default App;
