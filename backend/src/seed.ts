import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { SeederService } from './seed/seeder.service';

dotenv.config();

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // Get instance of SeederService (assuming it's exported in SeedingModule)
    const seederService = app.get(SeederService);

    // Call the seed method from SeederService
    await seederService.seed();

    console.log('Database seeded successfully!');
    await app.close();
}

bootstrap();
