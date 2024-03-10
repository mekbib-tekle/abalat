import {
    Entity,
    Column,
    ManyToOne,
    JoinColumn,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
  } from 'typeorm';
import { Member } from './member.entity';
  
@Entity()
export class MemberUnderMinister {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Member, (minister) => minister.members) // source
  @JoinColumn({ name: 'minister_id' })
  minister: Member;

  @ManyToOne(() => Member, (member) => member.ministers) // target
  @JoinColumn({ name: 'member_id' })
  member: Member;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
