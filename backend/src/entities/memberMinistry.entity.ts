import {
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
  } from 'typeorm';
import { Member } from './member.entity';
import { Ministry } from './ministry.entity';
import { Role } from './role.entity';

@Entity('member_ministries')
export class MemberMinistry {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Member, (member) => member.ministries)
  @JoinColumn({ name: 'member_id' })
  member: Member;

  @ManyToOne(() => Ministry, (ministry) => ministry.members)
  @JoinColumn({ name: 'ministry_id' })
  ministry: Ministry;

  @ManyToOne(() => Role, (role) => role.memberMinistries)
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}