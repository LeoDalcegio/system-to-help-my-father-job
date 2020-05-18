import { Module } from '@nestjs/common';
import { ClientsController } from './clients.controller';
import { ClientsService } from './clients.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientEntity } from './clients.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([ClientEntity]),
        AuthModule,
    ],
    controllers: [ClientsController],
    providers: [ClientsService]
})
export class ClientModule {}
