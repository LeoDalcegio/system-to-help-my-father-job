import {
    Table,
    Column,
    Model,
    Unique,
    PrimaryKey,
    AutoIncrement,
    DataType,
    CreatedAt,
    UpdatedAt,
    HasMany,
    AllowNull,
} from 'sequelize-typescript';
import { ProductType } from '../shared/enum/product-type.enums';
import { InventoryMovement } from '../inventory-movements/inventory-movement.entity';
import { ApiProperty } from '@nestjs/swagger';

@Table({
    tableName: 'product',
})
export class Product extends Model<Product> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.BIGINT)
    @ApiProperty()
    id: number;

    @Unique
    @Column({ field: 'product_code' })
    @ApiProperty()
    productCode: string;

    @Column({ field: 'product_description' })
    @ApiProperty()
    productDescription: string;

    @AllowNull
    @Column
    @ApiProperty()
    observation: string;

    @Column({ type: DataType.ENUM(ProductType.FIO, ProductType.MALHA) })
    @ApiProperty()
    type: ProductType;

    @HasMany(() => InventoryMovement)
    inventoryMovement: InventoryMovement[];

    @CreatedAt
    @ApiProperty()
    @Column({ field: 'created_at' })
    createdAt: Date;

    @UpdatedAt
    @ApiProperty()
    @Column({ field: 'updated_at' })
    updatedAt: Date;
}
