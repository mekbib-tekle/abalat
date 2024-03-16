import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MembersModule } from '../members/members.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppJwtConfig } from '../config/configuration';

@Module({
  imports: [
    MembersModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const { secret, expiresIn } = configService.get<AppJwtConfig>('jwt');

        return { secret, signOptions: { expiresIn } };
      },

      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
