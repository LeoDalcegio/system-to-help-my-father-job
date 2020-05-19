import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ProductEntity } from 'src/products/products.entity';
import { ClientEntity } from 'src/clients/clients.entity';

@Entity('inventory_movment')
export class InventoryMovmentEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('int', { nullable: false })
    note_number: number;

    @Column('varchar', { length: 1, nullable: false })
    type: string;
    
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