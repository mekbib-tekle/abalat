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
import { AuthGuard } from 'src/auth/auth.guard';
import { GetMember, MembersService, PostMember } from './members.service';

@Controller('members')
export class MembersController {
  constructor(private readonly memberService: MembersService) {}

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
