import { Body, Controller, Get, Post } from '@nestjs/common';
import { MembersService } from './members.service';
import { Member } from '../entities/member.entity';

@Controller()
export class MembersController {
  constructor(private readonly memberService: MembersService) {}

  @Get('/members/:id')
  getMember(id: number): Promise<Member> {
    return this.memberService.findOne(id);
  }

  @Post('/members')
  create(@Body() data: Omit<Member, 'id'>): Promise<Member> {
    return this.memberService.create(data);
  }
}
