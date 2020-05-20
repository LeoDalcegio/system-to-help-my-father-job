import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ProductEntity } from 'src/products/products.entity';
import { ClientEntity } from 'src/clients/clients.entity';
import { InventoryMovementType } from 'src/shared/enums/inventory-movements.enums';
import { IsEnum } from 'class-validator';

@Entity('inventory_movement')
export class InventoryMovementEntity {
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
    
    @ManyToOne(() => ProductEntity, product => product.id)
    @JoinColumn({ name: 'product_id' })
    product: ProductEntity;

    @Column({  type: 'int', nullable: false })
    product_id: number;
    
    @ManyToOne(() => ClientEntity, client => client.id)
    @JoinColumn({ name: 'client_id' })
    client: ClientEntity;

    @Column({  type: 'int', nullable: false })
    client_id: number;
}