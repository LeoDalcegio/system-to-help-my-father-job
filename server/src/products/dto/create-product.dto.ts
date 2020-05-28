import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsEnum } from 'class-validator';
import { ProductType } from '../../shared/enum/product-type.enums';

export class CreateProductDto {
    @ApiProperty()
    @IsString()
    readonly productCode: string;

    @ApiProperty()
    @IsString()
    readonly productDescription: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    readonly observation: string;

    @ApiProperty()
    @IsEnum(ProductType)
    readonly type: ProductType;
}
