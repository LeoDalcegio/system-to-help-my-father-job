import { InventoryMovement } from '../inventory-movement.entity';

export class BalanceInventoryMovementDto {
    entry: InventoryMovement;

    exits: InventoryMovement[];
}

