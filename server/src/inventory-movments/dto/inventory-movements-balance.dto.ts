import { IsNotEmpty, IsEmail } from 'class-validator';
import { InventoryMovementEntity } from '../inventory-movements.entity';

export class InventoryMovementsBalanceDto {  
    entry: InventoryMovementEntity;

    exits: Array<InventoryMovementEntity>;
}

