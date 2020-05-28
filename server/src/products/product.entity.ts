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

@Table({
    tableName: 'product',
})
export class Product extends Model<Product> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.BIGINT)
    id: number;

    @Unique
    @Column({ field: 'product_code' })
    productCode: string;

    @Column({ field: 'product_description' })
    productDescription: string;

    @AllowNull
    @Column
    observation: string;

    @Column({ type: DataType.ENUM(ProductType.FIO, ProductType.MALHA) })
    type: ProductType;

    @HasMany(() => InventoryMovement)
    inventoryMovement: InventoryMovement[];

    @CreatedAt
    @Column({ field: 'created_at' })
    createdAt: Date;

    @UpdatedAt
    @Column({ field: 'updated_at' })
    updatedAt: Date;
}
