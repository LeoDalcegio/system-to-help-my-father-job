import { IsNotEmpty, IsEmail } from 'class-validator';
import { InventoryMovmentEntity } from '../inventory-movements.entity';

export class InventoryMovementsBalanceDto {  
    entry: InventoryMovmentEntity;

    exits: Array<InventoryMovmentEntity>;
}

