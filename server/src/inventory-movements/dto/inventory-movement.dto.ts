import { ApiProperty } from '@nestjs/swagger';
import { InventoryMovement } from '../inventory-movement.entity';
import { InventoryMovementType } from '../../shared/enum/inventory-movement-type.enums';
import { IsISO8601, IsDate } from 'class-validator';

export class InventoryMovementDto {
    @ApiProperty()
    readonly id: number;

    @ApiProperty()
    readonly noteNumber: number;

    @ApiProperty()
    readonly referencedNoteNumber: number;

    @ApiProperty()
    readonly movementDate: Date;

    @ApiProperty()
    readonly quantity: number;

    @ApiProperty()
    readonly type: InventoryMovementType;

    @ApiProperty()
    readonly observation: string;

    @ApiProperty()
    readonly productCode: string;

    @ApiProperty()
    readonly productDescription: string;

    @ApiProperty()
    readonly client: string;

    @ApiProperty()
    readonly createdAt: Date;

    @ApiProperty()
    readonly updatedAt: Date;

    constructor(inventoryMovement: InventoryMovement) {
        this.id = inventoryMovement.id;
        this.noteNumber = inventoryMovement.noteNumber;
        this.referencedNoteNumber = inventoryMovement.referencedNoteNumber;
        this.movementDate = inventoryMovement.movementDate;
        this.quantity = inventoryMovement.quantity;
        this.type = inventoryMovement.type;
        this.productCode = inventoryMovement.product.productCode;
        this.productDescription = inventoryMovement.product.productDescription;
        this.client = inventoryMovement.client.name;
        this.observation = inventoryMovement.observation;
        this.createdAt = inventoryMovement.createdAt;
        this.updatedAt = inventoryMovement.updatedAt;
    };
}