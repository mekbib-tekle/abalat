import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Logger } from '@nestjs/common';

import MemberFactory from './member.factory';
import { Member } from '../entities/member.entity';
import { MemberType } from '../entities/memberType.entity';
import * as dotenv from 'dotenv';
import { MembersService } from '../members/members.service';

dotenv.config(); 
@Injectable()
export class SeederService {
    constructor(
        // private readonly memberService: MembersService,
        @InjectRepository(Member)
        private readonly memberRepository: Repository<Member>,
        // @InjectRepository(MemberType)
        // private readonly memberTypeRepository: Repository<MemberType>,
        private readonly memberFactory: any, // Add more factories as needed
        private readonly logger: Logger
    ) {}

    async seed() {
        try {
            const memberCount = 10; // Adjust the number of entities to seed
            // const memberType = await this.memberService.findOneMemberType(1);
            // const memberType = await this.memberTypeRepository.findBy({id: 1});
    
            for (let i = 0; i < memberCount; i++) {
                const member = await this.memberFactory();
                member.memberType = 1;
                // await this.memberService.create(member)
                await this.memberRepository.save(member);
            }
    
            console.log(`Seeded ${memberCount} members.`);
            // Add similar logic for other entities using their factories
        } catch (error) {
            this.logger.error('Error seeding database:', error);
        }
    }
}