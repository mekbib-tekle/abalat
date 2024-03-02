import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Member } from './member.entity';

@Injectable()
export class MembersService {
  constructor(
    @InjectRepository(Member)
    private membersRepository: Repository<Member>,
  ) {}

  findAll(): Promise<Member[]> {
    return this.membersRepository.find();
  }

  create(member: Omit<Member, 'id'>): Promise<Member> {
    return this.membersRepository.save(member);
  }

  findOne(id: number): Promise<Member | null> {
    return this.membersRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.membersRepository.delete(id);
  }
}
