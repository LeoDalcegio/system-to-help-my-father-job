import { DatabaseModule } from './../database/database.module';
import { Module } from '@nestjs/common';
import { ClientsController } from './clients.controller';
import { ClientsService } from './clients.service';
import { clientsProviders } from './products.providers';

@Module({
    imports: [DatabaseModule],
    controllers: [ClientsController],
    providers: [ClientsService, ...clientsProviders],
    exports: [],
})
export class ClientsModule {}
