import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ProductEntity } from 'src/products/products.entity';
import { ClientEntity } from 'src/clients/clients.entity';
import { InventoryMovementType } from 'src/shared/enums/inventory-movements.enums';
import { IsEnum } from 'class-validator';

@Entity('inventory_movment')
export class InventoryMovmentEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('int', { nullable: false })
    note_number: number;
    
    @IsEnum(InventoryMovementType)
    @Column('varchar', { length: 1, nullable: false })
    type: InventoryMovementType;
    
    @Column('date', { nullable: false }) 
    movement_date: Date;

    @Column({ type: 'decimal', precision: 12, scale: 3, default: 0, })
    quantity: number;

    @Column('varchar', {length: 500, nullable: true})
    observation: string;
    
    @OneToMany(() => ProductEntity, product => product.id)
    product_id: ProductEntity;
    
    @OneToMany(() => ClientEntity, client => client.id)
    client_id: ClientEntity;
}