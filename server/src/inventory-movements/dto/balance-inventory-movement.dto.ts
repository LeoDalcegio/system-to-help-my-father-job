import { InventoryMovementDto } from './inventory-movement.dto';

export class BalanceInventoryMovementDto {
    entry: InventoryMovementDto;

    exits: InventoryMovementDto[];
}

