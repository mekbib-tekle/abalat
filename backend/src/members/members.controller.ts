import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { GetMember, MembersService, PostMember } from './members.service';

@Controller('members')
export class MembersController {
  constructor(private readonly memberService: MembersService) {}

  @UseGuards(AuthGuard)
  @Get('follow-ups')
  async getMembersFollowUp(): Promise<GetMember[]> {
    const members = await this.memberService.followUps();
    return members.map((member) => this.memberService.mapMemberToMemberDto(member));
  }

  @UseGuards(AuthGuard)
  @Get()
  async getMembers(): Promise<GetMember[]> {
    const members = await this.memberService.findAll();
    return members.map((member) => this.memberService.mapMemberToMemberDto(member));
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async getMember(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<GetMember> {
    const member = await this.memberService.findOne(id);
    if (!member) {
      throw new NotFoundException();
    }
    return member;
  }

  @Post('create')
  create(@Body() data: PostMember): Promise<GetMember> {
    return this.memberService.create(data);
  }
}
