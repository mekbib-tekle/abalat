import {
  Entity,
  Column,
  OneToMany,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { MemberMinistry } from './memberMinistry.entity';

@Entity('ministries')
export class Ministry {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    name: 'display_name',
  })
  displayName: string;

  @OneToMany(() => MemberMinistry, (memberMinistry) => memberMinistry.ministry)
  members: MemberMinistry[];

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