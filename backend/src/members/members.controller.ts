import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { GetMember, MembersService, PostMember } from './members.service';
import { UpdateFollowUpDto } from '../dto/UpdateFollowUpDto'
import { ContactLog } from '../entities/contactLog.entity';
@Controller('members')
export class MembersController {
  constructor(private readonly memberService: MembersService) { }

  @UseGuards(AuthGuard)
  @Get('follow-ups')
  async getFollowUps(@Query() query: Record<string, any>): Promise<GetMember[]> {
    const filter = query.filter;
    const ministerId = query.minister_id;
    const members = await this.memberService.followUps(ministerId, filter);
    return members.map((member) => this.memberService.mapMemberToMemberDto(member));
  }

  @UseGuards(AuthGuard)
  @Get('contact-log/:id')
  async getContactLog(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<ContactLog[]> {
    const log = await this.memberService.getContactLog(id);
    if (!log) {
      throw new NotFoundException();
    }
    return log;
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

  @Post('follow-up')
  async postFollowUp(
    @Body() updateFollowUp: UpdateFollowUpDto
  ): Promise<ContactLog> {
    return await this.memberService.updateFollowUp(updateFollowUp);
  }

  @Post('create')
  create(@Body() data: PostMember): Promise<GetMember> {
    return this.memberService.create(data);
  }
}
