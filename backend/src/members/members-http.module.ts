import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from '../entities/member.entity';
import { MembersController } from './members.controller';
import { MembersService } from './members.service';
import { ContactLog } from '../entities/contactLog.entity';
import { MemberType } from '../entities/memberType.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Member, ContactLog, MemberType])],
  providers: [MembersService, JwtService, ConfigService],
  controllers: [MembersController],
})
export class MemberHttpModule {}
