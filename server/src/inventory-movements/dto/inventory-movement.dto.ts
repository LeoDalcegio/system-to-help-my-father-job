import { ApiProperty } from '@nestjs/swagger';
import { InventoryMovement } from '../inventory-movement.entity';
import { InventoryMovementType } from 'src/shared/enum/inventory-movement-type.enums';
import { IsISO8601, IsDate } from 'class-validator';

export class InventoryMovementDto {
    @ApiProperty()
    readonly id: number;

    @ApiProperty()
    readonly noteNumber: number;

    @ApiProperty()
    @IsISO8601()
    @IsDate()
    readonly movementDate: Date;

    @ApiProperty()
    readonly quantity: number;

    @ApiProperty()
    readonly type: InventoryMovementType;

    @ApiProperty()
    readonly observation: string;

    @ApiProperty()
    readonly productId: number;

    @ApiProperty()
    readonly clientId: number;

    @ApiProperty()
    readonly createdAt: Date;

    @ApiProperty()
    readonly updatedAt: Date;

    constructor(inventoryMovement: InventoryMovement) {
        this.id = inventoryMovement.id;
        this.noteNumber = inventoryMovement.noteNumber;
        this.movementDate = inventoryMovement.movementDate;
        this.quantity = inventoryMovement.quantity;
        this.type = inventoryMovement.type;
        this.productId = inventoryMovement.productId;
        this.clientId = inventoryMovement.clientId;
        this.observation = inventoryMovement.observation;
        this.createdAt = inventoryMovement.createdAt;
        this.updatedAt = inventoryMovement.updatedAt;
    };
}
