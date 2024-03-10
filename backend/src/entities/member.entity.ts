import {
    Entity,
    Column,
    OneToOne,
    JoinColumn,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn
  } from 'typeorm';
import { MemberType } from './memberType.entity';
import { Ministry } from './ministry.entity';
  
  export enum MaritalStatus {
    Married,
    Single,
    Divorced,
    Widowed
  }

  export enum Gender {
    Male,
    Female,
  }

  @Entity()
  export class Member {
    @PrimaryGeneratedColumn()
    id: number;
  
    @OneToOne(() => MemberType)
    @JoinColumn({ name: 'member_type_id' })
    memberType: MemberType;

    @OneToOne(() => Ministry)
    @JoinColumn({ name: 'ministry_id' })
    ministry: Ministry;

    @Column({
      name: 'first_name',
    })
    firstName: string;

    @Column({
      name: 'middle_name',
      nullable: true,
    })
    middleName: string;
  
    @Column({
      name: 'last_name',
    })
    lastName: string;
  
    @Column({
      name: 'phone_number',
    })
    phoneNmber: string;

    @Column({ nullable: true })
    email: string;

    @Column({ nullable: true })
    address: string;

    @Column({
      name: 'previous_church',
      nullable: true,
    })
    previousChurch: string;

    @Column({
      name: 'role_in_previous_church',
      nullable: true,
    })
    roleInPreviousChurch: string;

    @Column({ name: 'is_baptised' })
    isBaptised: string;

    @Column({
      name: 'spouse_name',
      nullable: true,
    })
    spouseName: string;

    @Column({
      name: 'children_names',
      nullable: true,
    })
    childrenNames: string;

    @Column({
      name: 'emergency_contact',
      nullable: true,
    })
    emergencyContact: string;

    @Column({
      name: 'marital_status',
      type: 'enum',
      enum: MaritalStatus,
    })
    maritalStatus: MaritalStatus;

    @Column({
      name: 'has_letter_from_prev_church',
      nullable: true,
    })
    hasLetterFromPrevChurch: boolean;

    @Column({
      name: 'notes',
      nullable: true,
    })
    notes: string;

    @Column({
      nullable: true,
      type: 'enum',
      enum: Gender,
    })
    gender: Gender;
    
    @Column({ nullable: true })
    image_url: string;
  

    @Column({ nullable: true })
    password: string;

    @Column({
      name: 'is_active',
      default: true,
    })
    isActive: boolean;
  
    @CreateDateColumn()
    created: Date;
  
    @UpdateDateColumn()
    modified: Date;

    @DeleteDateColumn()
    deleted: Date;
  }