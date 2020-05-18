import { Module } from '@nestjs/common';
import { InventoryMovmentsService } from './inventory-movements.service';
import { InventoryMovementsController } from './inventory-movements.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoryMovmentEntity } from './inventory-movements.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([InventoryMovmentEntity]),
        AuthModule,
    ],
    providers: [InventoryMovmentsService],
    controllers: [InventoryMovementsController]
})
export class InventoryMovmentsModule {}
