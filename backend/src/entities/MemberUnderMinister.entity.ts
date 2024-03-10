import {
    Entity,
    Column,
    ManyToOne
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
    minister: Member;

    @Column({ nullable: false })
    ministerId: number;

    @ManyToOne(() => Member, (member) => member.ministers) // target
    member: Member;

    @Column({ nullable: false })
    memberId: number;
  
    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
  }
  