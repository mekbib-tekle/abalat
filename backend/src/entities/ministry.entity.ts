import {
  Entity,
  Column,
  ManyToMany,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Member } from './member.entity';

@Entity()
export class Ministry {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    name: 'display_name',
  })
  displayName: string;

  @ManyToMany(() => Member, member => member.ministries)
  members: Member[];

  @Column({
      name: 'is_active',
      default: true,
  })
  isActive: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}