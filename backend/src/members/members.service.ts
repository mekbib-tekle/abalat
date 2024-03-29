import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Member } from '../entities/member.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class MembersService {
  constructor(
    @InjectRepository(Member)
    private membersRepository: Repository<Member>,
  ) {}

  async findAll(): Promise<Member[]> {
    return await this.membersRepository.find();
  }

  async create(member: PostMember): Promise<GetMember> {
    const hash = await MembersService.passwordHash(member.password);
    const { password: _, ...rest } = await this.membersRepository.save({
      ...member,
      password: hash,
      created: new Date(),
      modified: new Date(),
    });

    return rest;
  }

  async findOne(id: number): Promise<GetMember | null> {
    const user = await this.membersRepository.findOneBy({ id });
    return user ? user.withNoPassword() : null;
  }

  findOneByUsername(username: string): Promise<Member | null> {
    return this.membersRepository.findOneBy({ username });
  }

  async remove(id: number): Promise<void> {
    await this.membersRepository.delete(id);
  }

  // util
  private static async passwordHash(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  mapMemberToMemberDto(member: Member): GetMember {
    const { password, ...memberWithoutPassword } = member;
    return memberWithoutPassword;
  }
}

// types
export type GetMember = Omit<Member, 'password' | 'withNoPassword'>;
export type PostMember = Omit<Member, 'id' | 'created' | 'modified'>;
