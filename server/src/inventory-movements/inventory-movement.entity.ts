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
import { InventoryMovementType } from '../shared/enum/inventory-movement-type.enums';
import { Client } from '../clients/client.entity';
import { Product } from '../products/product.entity';
import { ApiProperty } from '@nestjs/swagger';

@Table({
    tableName: 'inventory_movement',
})
export class InventoryMovement extends Model<InventoryMovement> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.BIGINT)
    @ApiProperty()
    id: number;

    @Column({ field: 'note_number' })
    @ApiProperty()
    noteNumber: number;

    @Column({ field: 'movement_date' })
    @ApiProperty()
    movementDate: Date;

    @Column
    @ApiProperty()
    quantity: number;

    @Column
    @ApiProperty()
    observation: string;

    @Column({ type: DataType.ENUM(InventoryMovementType.ENTRY, InventoryMovementType.EXIT) })
    @ApiProperty()
    type: InventoryMovementType;

    @Column
    @ApiProperty()
    @ForeignKey(() => Product)
    productId: number;

    @BelongsTo(() => Product)
    product: Product;

    @Column
    @ApiProperty()
    @ForeignKey(() => Client)
    clientId: number;

    @BelongsTo(() => Client)
    client: Client;

    @CreatedAt
    @ApiProperty()
    @Column({ field: 'created_at' })
    createdAt: Date;

    @UpdatedAt
    @ApiProperty()
    @Column({ field: 'updated_at' })
    updatedAt: Date;
}
