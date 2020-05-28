import { DatabaseModule } from './../database/database.module';
import { Module } from '@nestjs/common';
import { InventoryMovementsController } from './inventory-movements.controller';
import { InventoryMovementsService } from './inventory-movements.service';
import { inventoryMovementsProviders } from './inventory-movements.providers';

@Module({
    imports: [DatabaseModule],
    controllers: [InventoryMovementsController],
    providers: [InventoryMovementsService, ...inventoryMovementsProviders],
    exports: [],
})
export class InventoryMovementsModule {}
