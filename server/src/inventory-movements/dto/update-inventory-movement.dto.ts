import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber, IsDate, IsEnum, IsISO8601 } from 'class-validator';
import { InventoryMovementType } from '../../shared/enum/inventory-movement-type.enums';

export class UpdateInventoryMovementDto {
    @ApiProperty()
    @IsNumber()
    readonly noteNumber: number;

    @ApiProperty()
    @IsDate()
    @IsISO8601()
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
