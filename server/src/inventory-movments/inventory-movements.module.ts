import { Module } from '@nestjs/common';
import { InventoryMovmentsService } from './inventory-movements.service';
import { InventoryMovmentsController } from './inventory-movements.controller';

@Module({
  providers: [InventoryMovmentsService],
  controllers: [InventoryMovmentsController]
})
export class InventoryMovmentsModule {}
