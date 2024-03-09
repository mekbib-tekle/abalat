import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Member {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({
    unique: true,
    nullable: false,
  })
  username: string;

  @Column({ nullable: false })
  password: string;

  @Column({ default: true, nullable: true })
  isActive: boolean;

  @Column({ nullable: true })
  created: Date;

  @Column({ nullable: true })
  modified: Date;
}
