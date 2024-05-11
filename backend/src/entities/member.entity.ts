import {
  Entity,
  Column,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinColumn,
  JoinTable,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  QueryBuilder,
} from 'typeorm';
import { MemberType } from './memberType.entity';
import { ContactLog } from './contactLog.entity';
import { MemberUnderMinister } from './memberUnderMinister.entity';
import { MemberMinistry } from './memberMinistry.entity';

export enum MaritalStatus {
  Married = 'Married',
  Single = 'Single',
  Divorced = 'Divorced',
  Widowed = 'Widowed',
}

export enum Gender {
  Male = 'Male',
  Female = 'Female',
}

@Entity()
export class Member {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => MemberType, (memberType) => memberType.members)
  @JoinColumn({ name: 'member_type_id' })
  memberType: MemberType;

  @OneToMany(() => MemberMinistry, (memberMinistry) => memberMinistry.member)
  ministries: MemberMinistry[];

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
    unique: true,
    nullable: false,
  })
  username: string;

  @Column({
    name: 'phone_number',
  })
  phoneNumber: string;

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

  @Column({
    name: 'is_baptised',
    nullable: true,
  })
  isBaptised: boolean;

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

  /*
    // usage
    const minister = await memberRepository.findOne({id: id}, { relations: ['members']})
    minister.members // returns members that are under this minister
  */
  @OneToMany(() => MemberUnderMinister, (flock) => flock.minister)
  members: MemberUnderMinister[];

  /*
  const member = await memberRepository.findOne({id: id}, { relations: ['ministers']})
  member.ministers // returns ministers the member is followed by
   */
  @OneToMany(() => MemberUnderMinister, (flock) => flock.member)
  ministers: MemberUnderMinister[];

  /*
  const minister = await memberRepository.findOne({id: id}, { relations: ['contactedMembers']})
  minister.contactedMembers // returns members the minister contacted
   */
  @OneToMany(() => ContactLog, (log) => log.minister)
  contactedMembers: ContactLog[];

  /*
  const member = await memberRepository.findOne({id: id}, { relations: ['contactingMinisters']})
  member.contactingMinisters // returns ministers the member is contacted by
   */
  @OneToMany(() => ContactLog, (log) => log.member)
  contactingMinisters: ContactLog[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  // util for returning user without password
  // TODO: separate password from user entity
  withNoPassword() {
    const { password: _, ...rest } = this;
    return rest;
  }
}