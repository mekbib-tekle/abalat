import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration, { DatabaseConfig } from './config/configuration';
import { MemberHttpModule } from './members/members-http.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MemberHttpModule,
    TypeOrmModule.forRootAsync({
      imports: [
        ConfigModule.forRoot({
          load: [configuration],
        }),
      ],

      useFactory: (configService: ConfigService) => ({
        ...configService.get<DatabaseConfig>('database'),
        type: 'mysql',
        autoLoadEntities: true,
        synchronize: true,
      }),

      inject: [ConfigService],
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
