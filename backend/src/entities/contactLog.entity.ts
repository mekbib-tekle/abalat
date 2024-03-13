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


export enum ContactType {
textMessage = 'Text Message',
faceToFace = 'Fact to Face',
}

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
    name: 'contact_type',
    type: 'enum',
    enum: ContactType,
  })
  contactType: ContactType;

  @Column({
    name: 'notes',
    nullable: true,
  })
  notes: string;

  @Column({
    name: 'flagged',
    default: true,
  })
  flagged: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
