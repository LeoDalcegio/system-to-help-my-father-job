import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity('product')
@Unique(['product_code'])
export class ProductEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', {length: 50, nullable: false, })
    product_code: string;

    @Column('varchar', {length: 255, nullable: false})
    product_description: string;

    @Column('character', {length: 1, nullable: false}) // criar enum
    type: string;
    
    @Column('varchar', {length: 500, nullable: true})
    observation: string;
}