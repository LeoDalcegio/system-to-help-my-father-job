import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InventoryMovmentEntity } from './inventory-movements.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateResult, DeleteResult } from  'typeorm';

@Injectable()
export class InventoryMovmentsService {
  
    constructor(
        @InjectRepository(InventoryMovmentEntity) 
        private clientRepository: Repository<InventoryMovmentEntity>
    ) { }
    
    async findAll(): Promise<InventoryMovmentEntity[]> {
        return await this.clientRepository.find();
    }

    async findOne(id: number): Promise<InventoryMovmentEntity> {
        return await this.clientRepository.findOne(id);
    }

    async create(product: InventoryMovmentEntity): Promise<InventoryMovmentEntity> {
        return await this.clientRepository.save(product);
    }

    async update(product: InventoryMovmentEntity): Promise<UpdateResult> {
        return this.clientRepository.update(product.id, product);
    }
    
    async delete(id: number): Promise<DeleteResult> {
        return await this.clientRepository.delete(id);
    }
}
