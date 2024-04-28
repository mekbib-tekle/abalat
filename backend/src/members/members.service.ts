import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EqualOperator, Repository, createQueryBuilder } from 'typeorm';
import { Member } from '../entities/member.entity';
import * as bcrypt from 'bcrypt';
import { UpdateFollowUpDto } from '../dto/UpdateFollowUpDto';
import { ContactLog } from '../entities/contactLog.entity';

@Injectable()
export class MembersService {
  constructor(
    @InjectRepository(Member)
    private membersRepository: Repository<Member>,
    @InjectRepository(ContactLog)
    private contactLogRepository: Repository<ContactLog>,
  ) { }


  // get all elders
  // get all members under each elder
  // for each member find their last contacted date & their member type
  // TODO select specific fields using .addSelect
  async followUps(ministerId: number, filter: string): Promise<Member[]> {
    // TODO replace ministryId with dynamic value
    const ministryId = 1;

    const queryBuilder = this.membersRepository.createQueryBuilder('member');

    queryBuilder.leftJoinAndSelect('member.memberType', 'memberType');
    queryBuilder.leftJoinAndSelect('member.ministries', 'memberMinistry');
    queryBuilder.leftJoinAndSelect('member.members', 'membersUnderMinister');
    queryBuilder.leftJoinAndSelect('membersUnderMinister.member', 'memberUM');
    queryBuilder.leftJoinAndSelect('memberUM.memberType', 'memberUMT');

    if (filter === "all") {
      // how long ago a member was contacted regardless of the minister under whose care he/she is
      queryBuilder.leftJoinAndSelect('memberUM.contactingMinisters', 'contactLog', 'contactLog.member_id = memberUM.id');
    } else {
      // how long ago this minister contacted the member under his care
      queryBuilder.leftJoinAndSelect('memberUM.contactingMinisters', 'contactLog', 'contactLog.minister_id = member.id');
    }

    queryBuilder.where('memberMinistry.ministry_id = :ministryId', { ministryId });

    if (ministerId) {
      queryBuilder.where('member.id = :ministerId', { ministerId });
    }

    return await queryBuilder.getMany();
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

  async findAll(): Promise<Member[]> {
    return await this.membersRepository.find({
      order: { firstName: 'ASC' }
    });
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

  async updateFollowUp(updateFollowUp: UpdateFollowUpDto): Promise<ContactLog | null> {
    const member = await this.membersRepository.findOneBy({ id: updateFollowUp.memberId });
    const minister = await this.membersRepository.findOneBy({ id: updateFollowUp.ministerId });

    const contactLog = await this.contactLogRepository.save({
      member,
      minister,
      contactMethod: updateFollowUp.contactMethod,
      note: updateFollowUp.note,
      flagged: updateFollowUp.flagged,
    });

    return contactLog;
  }

  async getContactLog(memberId: number): Promise<ContactLog[] | null> {
    const contactLog = await this.contactLogRepository.find({
      where: {
        member: new EqualOperator<number>(memberId)
      },
      relations: ['minister'],
      order: { created_at: 'DESC' },
    });

    return contactLog;
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
