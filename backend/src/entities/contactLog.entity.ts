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
  export class ContactLog {
    @PrimaryGeneratedColumn()
    id: number;
  
    @ManyToOne(() => Member, (minister) => minister.members) // source (member who contacts)
    @JoinColumn({ name: 'minister_id' })
    minister: Member;

    @ManyToOne(() => Member, (member) => member.ministers) // target (member being contacted)
    @JoinColumn({ name: 'member_id' })
    member: Member;

    @Column({
      name: 'contactMethod',
      nullable: true,
    })
    contactMethod: string;

    @Column({
      name: 'note',
      nullable: true,
    })
    note: string;

    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
  }
