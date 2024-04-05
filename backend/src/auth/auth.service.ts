import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { MembersService } from '../members/members.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly memberService: MembersService,
    private readonly jwtService: JwtService,
  ) {}

  async validate(
    username: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    const user = await this.memberService.findOneByUsername(username);
    const isValid = await bcrypt.compare(pass, user.password);

    if (isValid && user.isActive) {
      const payload = { sub: user.id, username: user.username };
      const access_token = await this.jwtService.signAsync(payload);
      return { access_token };
    } else {
      return Promise.reject(new UnauthorizedException());
    }
  }
}
