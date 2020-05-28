import {
    Table,
    Column,
    Model,
    DataType,
    CreatedAt,
    UpdatedAt,
    DeletedAt,
    AutoIncrement,
    PrimaryKey,
    BelongsTo,
    ForeignKey,
} from 'sequelize-typescript';
import { InventoryMovementType } from 'src/shared/enum/inventory-movement-type.enums';
import { Client } from 'src/clients/client.entity';
import { Product } from 'src/products/product.entity';

@Table({
    tableName: 'inventory_movement',
})
export class InventoryMovement extends Model<InventoryMovement> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.BIGINT)
    id: number;

    @Column({ field: 'note_number' })
    noteNumber: number;

    @Column({ field: 'movement_date' })
    movementDate: Date;

    @Column
    quantity: number;

    @Column
    observation: string;

    @Column({ type: DataType.ENUM(InventoryMovementType.ENTRY, InventoryMovementType.EXIT) })
    type: InventoryMovementType;

    @Column
    @ForeignKey(() => Product)
    productId: number;

    @BelongsTo(() => Product)
    product: Product;

    @Column
    @ForeignKey(() => Client)
    clientId: number;

    @BelongsTo(() => Client)
    client: Client;

    @CreatedAt
    @Column({ field: 'created_at' })
    createdAt: Date;

    @UpdatedAt
    @Column({ field: 'updated_at' })
    updatedAt: Date;
}
