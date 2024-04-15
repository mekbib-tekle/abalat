import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany,
    CreateDateColumn,
    UpdateDateColumn,
  } from 'typeorm';
import { MemberMinistry } from './memberMinistry.entity';
  
  @Entity('roles')
  export class Role {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;
  
    @Column({
      name: 'display_name',
    })
    displayName: string;
  
    @Column({
        name: 'is_visible',
        default: true,
    })
    isVisible: boolean;

    @OneToMany(() => MemberMinistry, (memberMinistry) => memberMinistry.role)
    memberMinistries: MemberMinistry[];

    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
  }