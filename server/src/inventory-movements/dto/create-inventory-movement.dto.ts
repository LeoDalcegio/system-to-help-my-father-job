import { ApiProperty } from '@nestjs/swagger';
import {
    IsString,
    IsOptional,
    IsNumber,
    IsDate,
    IsEnum,
    IsISO8601,
} from 'class-validator';
import { InventoryMovementType } from '../../shared/enum/inventory-movement-type.enums';

export class CreateInventoryMovementDto {
    @ApiProperty()
    @IsNumber()
    readonly noteNumber: number;

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    readonly referencedNoteNumber: number;

    @ApiProperty()
    readonly movementDate: Date;

    @ApiProperty()
    @IsNumber()
    readonly quantity: number;

    @ApiProperty()
    @IsString()
    @IsOptional()
    readonly observation: string;

    @ApiProperty()
    @IsEnum(InventoryMovementType)
    readonly type: InventoryMovementType;

    @ApiProperty()
    @IsNumber()
    readonly productId: number;

    @ApiProperty()
    @IsNumber()
    readonly clientId: number;
}
