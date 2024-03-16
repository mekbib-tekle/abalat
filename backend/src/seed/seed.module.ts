import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeederService } from './seeder.service';
import { Member } from 'src/entities/member.entity';

@Module({
//   imports: [TypeOrmModule.forFeature([Member])],
  providers: [SeederService],
  exports: [SeederService],
})
export class SeedModule {}
