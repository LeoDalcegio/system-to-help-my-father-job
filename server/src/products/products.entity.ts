import { Entity, Column, PrimaryGeneratedColumn, Unique, ManyToOne } from 'typeorm';
import { ProductType } from 'src/shared/enums/products.enums';
import { IsEnum } from 'class-validator';

@Entity('product')
@Unique(['product_code'])
export class ProductEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', {length: 50, nullable: false, })
    product_code: string;

    @Column('varchar', {length: 255, nullable: false})
    product_description: string;

    @IsEnum(ProductType)
    @Column('character', {length: 1, nullable: false}) // criar enum
    type: ProductType;
    
    @Column('varchar', {length: 500, nullable: true})
    observation: string;
}