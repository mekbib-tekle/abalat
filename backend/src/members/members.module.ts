import { Module } from '@nestjs/common';
import { MembersService } from './members.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from '../entities/member.entity';
import { ContactLog } from '../entities/contactLog.entity';
import { MemberType } from '../entities/memberType.entity';
import { MembersCustomRepository } from './members.custom-repository';
import { MemberUnderMinister } from '../entities/memberUnderMinister.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Member, ContactLog, MemberType, MembersCustomRepository, MemberUnderMinister])],
  providers: [MembersService, MembersCustomRepository],
  exports: [MembersService],
})
export class MembersModule {}
