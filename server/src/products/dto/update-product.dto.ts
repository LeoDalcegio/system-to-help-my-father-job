import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';
import { ProductType } from 'src/shared/enum/product-type.enums';

export class UpdateProductDto {
    @ApiProperty()
    @IsString()
    readonly productCode: string;

    @ApiProperty()
    @IsString()
    readonly productDescription: string;

    @ApiProperty()
    readonly type: ProductType;

    @ApiProperty()
    @IsString()
    @IsOptional()
    readonly observation: string;
}
