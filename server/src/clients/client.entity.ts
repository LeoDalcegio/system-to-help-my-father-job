import {
    Table,
    Column,
    Model,
    DataType,
    CreatedAt,
    UpdatedAt,
    DeletedAt,
    HasMany,
    AutoIncrement,
    PrimaryKey,
} from 'sequelize-typescript';
import { InventoryMovement } from 'src/inventory-movements/inventory-movement.entity';

@Table({
    tableName: 'client',
})
export class Client extends Model<Client> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.BIGINT)
    id: number;

    @Column
    name: string;

    @Column
    observation: string;

    @HasMany(() => InventoryMovement)
    inventoryMovement: InventoryMovement[];

    @CreatedAt
    @Column({ field: 'created_at' })
    createdAt: Date;

    @UpdatedAt
    @Column({ field: 'updated_at' })
    updatedAt: Date;

    @DeletedAt
    @Column({ field: 'deleted_at' })
    deletedAt: Date;
}
