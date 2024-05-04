import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { Member } from '../entities/member.entity';

@Injectable()
export class MembersCustomRepository extends Repository<Member> {
    constructor(private dataSource: DataSource) {
      super(Member, dataSource.createEntityManager());
    }

    async findMembersByMinistry(ministryId: number): Promise<Member[]> {
        const qb = this.createQueryBuilder('member')
            .leftJoinAndSelect('member.ministries', 'memberMinistries')
            .leftJoinAndSelect('member.members', 'memberUnderMinister')
            .leftJoinAndSelect('memberUnderMinister.member', 'memum')
            .leftJoinAndSelect('memum.memberType', 'mt')
            // .select([
            //     'member.id',
            //     'member.firstName',
            //     'member.lastName',
            //     'memum.id AS memberId',
            //     'memum.firstName AS memberFN',
            //     'memum.lastName AS memberLN',
            //     'mt.name AS memberType',
            // ])
            .where('memberMinistries.ministry_id = :ministryId', { ministryId });
        
        // TODO check why the select doesn't return selected columns only though the generated query is correct
        // console.log(qb.getSql());
        const results = await qb.getMany();

        return results;
    }
}