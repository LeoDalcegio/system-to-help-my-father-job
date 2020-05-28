import { ApiProperty } from '@nestjs/swagger';
import { ProductType } from '../../shared/enum/product-type.enums';
import { Product } from '../product.entity';

export class ProductDto {
    @ApiProperty()
    readonly id: number;

    @ApiProperty()
    readonly productCode: string;

    @ApiProperty()
    readonly productDescription: string;

    @ApiProperty()
    readonly observation: string;

    @ApiProperty()
    readonly type: ProductType;

    @ApiProperty()
    readonly createdAt: Date;

    @ApiProperty()
    readonly updatedAt: Date;

    constructor(product: Product) {
        this.id = product.id;
        this.observation = product.observation;
        this.productCode = product.productCode;
        this.productDescription = product.productDescription;
        this.type = product.type;
        this.createdAt = product.createdAt;
        this.updatedAt = product.updatedAt;
    }
}
