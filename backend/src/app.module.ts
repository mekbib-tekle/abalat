import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration, { DatabaseConfig } from './config/configuration';
import { MemberHttpModule } from './members/members-http.module';
import entities from './entities';
import { AuthModule } from './auth/auth.module';
import { SeederService } from './seed/seeder.service';

@Module({
  imports: [
    MemberHttpModule,
    // TypeOrmModule.forFeature([Member]),
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
        entities,
        synchronize: true,
      }),

      inject: [ConfigService],
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, SeederService],
})
export class AppModule {}
