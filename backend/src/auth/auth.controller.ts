import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { MembersService } from '../members/members.service';

type SignIn = {
  username: string;
  password: string;
};

@Controller('api/v1/auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private readonly memberService: MembersService
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() { username, password }: SignIn) {
    return this.authService.validate(username, password);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  async getProfile(@Request() req: any) {
    const username = req.user?.username;
    const member = await this.memberService.findOneByUsername(username);
    return member;
  }
}
