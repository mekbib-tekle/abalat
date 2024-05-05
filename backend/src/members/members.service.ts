import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EqualOperator, Repository, createQueryBuilder } from 'typeorm';
import { Member } from '../entities/member.entity';
import * as bcrypt from 'bcrypt';
import { UpdateFollowUpDto } from '../dto/UpdateFollowUpDto';
import { ContactLog } from '../entities/contactLog.entity';
import { MemberType } from '../entities/memberType.entity';
import { MembersCustomRepository } from './members.custom-repository';
import { UpdateMemberMinisterMappingDto } from '../dto/UpdateMemberMinisterMappingDto';
import { MemberUnderMinister } from '../entities/memberUnderMinister.entity';

// TODO clean up member service & controller
@Injectable()
export class MembersService {
  constructor(
    @InjectRepository(Member)
    private membersRepository: Repository<Member>,
    @InjectRepository(ContactLog)
    private contactLogRepository: Repository<ContactLog>,
    @InjectRepository(MemberType)
    private memberTypeRepository: Repository<MemberType>,
    @InjectRepository(MembersCustomRepository)
    private membersCustomRepository: MembersCustomRepository,
    @InjectRepository(MemberUnderMinister)
    private memberUnderMinisterRepository: Repository<MemberUnderMinister>,
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

  async update(member: any): Promise<GetMember> {
    const updatedMember = await this.updateMemberType(member.id, member.memberType);

    // delete the string memberType passed from client
    delete member.memberType;

    await this.membersRepository.save({
      ...member,
      updated_at: new Date(),
    });

    return updatedMember;
  }

  async updateMemberType(memberId: number, memberTypeString: string): Promise<Member | undefined> {
    try {
      const member = await this.membersRepository.findOne({
        where: { id: memberId },
        relations: ['memberType']
      });
      if (!member) {
        return undefined;
      }

      const memberType = await this.memberTypeRepository.findOne({
        where: { name: memberTypeString },
      });

      if (!memberType) {
        throw new Error(`Invalid member type: ${memberTypeString}`);
      }

      member.memberType = memberType;
      await this.membersRepository.save({...member});

      return member;
    } catch (error) {
      console.error('Error updating member type:', error);
      throw error;
    }
  }

  async findAll(): Promise<Member[]> {
    return await this.membersRepository.find({
      relations: ['memberType'],
      order: { firstName: 'ASC' }
    });
  }

  async findOne(id: number): Promise<GetMember | null> {
    const user = await this.membersRepository.findOne({
      where: { id },
      relations: ["memberType"]
    });
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

  async getMinisterMemberMapping(): Promise<Member[] | null> {
    const ministryId = 1; // TODO support more ministries in v2
    const members = await this.membersCustomRepository.findMembersByMinistry(ministryId);
    return members;
  }

  async UpdateMemberMinisterMapping(UpdateMemberMinisterMapping: UpdateMemberMinisterMappingDto): Promise<MemberUnderMinister> {
    const { oldMinisterId, newMinisterId, memberId } = UpdateMemberMinisterMapping;

    const memberUnderMinister = await this.memberUnderMinisterRepository.findOne({
      where: { minister: { id: oldMinisterId }, member: { id: memberId } },
    });

    if (!memberUnderMinister) {
      throw new Error('Member under minister mapping not found minister:' + oldMinisterId + ', member: ' + memberId);
    }

    const newMinister = await this.membersRepository.findOneBy({ id: newMinisterId });
    memberUnderMinister.minister = newMinister;

    const result = await this.memberUnderMinisterRepository.save(memberUnderMinister);
    return result;
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

