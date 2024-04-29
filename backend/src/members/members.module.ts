import { Module } from '@nestjs/common';
import { MembersService } from './members.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from '../entities/member.entity';
import { ContactLog } from '../entities/contactLog.entity';
import { MemberType } from '../entities/memberType.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Member, ContactLog, MemberType])],
  providers: [MembersService],
  exports: [MembersService],
})
export class MembersModule {}
