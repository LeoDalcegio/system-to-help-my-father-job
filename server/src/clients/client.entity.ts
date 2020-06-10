import {
    Table,
    Column,
    Model,
    DataType,
    CreatedAt,
    UpdatedAt,
    HasMany,
    AutoIncrement,
    PrimaryKey,
} from 'sequelize-typescript';
import { InventoryMovement } from '../inventory-movements/inventory-movement.entity';
import { ApiProperty } from '@nestjs/swagger';

@Table({
    tableName: 'client',
})
export class Client extends Model<Client> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.BIGINT)
    @ApiProperty()
    id: number;

    @Column
    @ApiProperty()
    name: string;

    @Column
    @ApiProperty()
    observation: string;

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
