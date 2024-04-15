import {
    Entity,
    ManyToOne,
    JoinColumn,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
  } from 'typeorm';
import { Member } from './member.entity';
  
@Entity('members_under_minister')
export class MemberUnderMinister {
  @PrimaryGeneratedColumn()
  id: number;

  // https://github.com/typeorm/typeorm/issues/4190
  // @ManyToOne('Member', 'members') // source
  @ManyToOne(() => Member, (minister) => minister.members) // source
  @JoinColumn({ name: 'minister_id' })
  minister: Member;

  // @ManyToOne('Member', 'ministers') // source
  @ManyToOne(() => Member, (member) => member.ministers) // target
  @JoinColumn({ name: 'member_id' })
  member: Member;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
