import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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

    
}