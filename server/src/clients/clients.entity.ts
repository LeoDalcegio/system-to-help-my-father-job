import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('client')
export class ClientEntity {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column('varchar', {length: 255, nullable: false})
    name: string;
    
    @Column('varchar', {length: 500, nullable: true})
    observation: string;
}