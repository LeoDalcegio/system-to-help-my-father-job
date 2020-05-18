import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
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
    movmentat_date: Date;

    @Column({ type: 'decimal', precision: 12, scale: 3, default: 0, })
    quantity: number;

    @OneToOne(type => ProductEntity)
    @JoinColumn()
    product_id: ProductEntity;

    @OneToOne(type => ClientEntity)
    @JoinColumn()
    client_id: ClientEntity;
}