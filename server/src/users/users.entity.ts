import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity('user')
export class UserEntity {  
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', nullable: false, unique: true }) 
    username: string;

    @Column({ type: 'varchar', nullable: false }) 
    password: string;  
    
    @Column({ type: 'varchar', nullable: false }) 
    email: string;

    @BeforeInsert()  async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);  
    }
}