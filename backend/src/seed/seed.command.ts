import { Injectable } from '@nestjs/common';
import { ICommandHandler, ICommand, CommandBus } from '@nestjs/cqrs'; // Changed 'Command' to 'ICommand'
import { SeederService } from './seeder.service';

@Injectable()
export class SeedCommand implements ICommand {} // Interface for the command

@Injectable()
export class SeedCommandHandler implements ICommandHandler<SeedCommand> {
    constructor(private readonly seederService: SeederService) {}

    async execute(command: SeedCommand) {
        await this.seederService.seed();
    }
}

@Injectable()
export class SeedingModule {
    constructor(private readonly commandBus: CommandBus) {}

    async seed() {
        await this.commandBus.execute(new SeedCommand());
    }
}