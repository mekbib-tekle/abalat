import {
  Body,
  Controller,
  Get,
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
  getMember(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<GetMember | null> {
    return this.memberService.findOne(id);
  }

  @Post('create')
  create(@Body() data: PostMember): Promise<GetMember> {
    return this.memberService.create(data);
  }
}
