import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from '../entities/member.entity';
import { MembersController } from './members.controller';
import { MembersService } from './members.service';
import { ContactLog } from '../entities/contactLog.entity';
import { MemberType } from '../entities/memberType.entity';
import { MembersCustomRepository } from './members.custom-repository';

@Module({
  imports: [TypeOrmModule.forFeature([Member, ContactLog, MemberType, MembersCustomRepository])],
  providers: [MembersService, JwtService, ConfigService, MembersCustomRepository],
  controllers: [MembersController],
})
export class MemberHttpModule {}
