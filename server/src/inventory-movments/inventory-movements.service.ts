import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InventoryMovmentEntity } from './inventory-movements.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateResult, DeleteResult } from  'typeorm';

@Injectable()
export class InventoryMovmentsService {
  
    constructor(
        @InjectRepository(InventoryMovmentEntity) 
        private inventoryRepository: Repository<InventoryMovmentEntity>
    ) { }
    
    async findAll(): Promise<InventoryMovmentEntity[]> {
        return await this.inventoryRepository.find();
    }

    async findOne(id: number): Promise<InventoryMovmentEntity> {
        return await this.inventoryRepository.findOne(id);
    }

    async create(product: InventoryMovmentEntity): Promise<InventoryMovmentEntity> {
        return await this.inventoryRepository.save(product);
    }

    async update(product: InventoryMovmentEntity): Promise<UpdateResult> {
        return this.inventoryRepository.update(product.id, product);
    }
    
    async delete(id: number): Promise<DeleteResult> {
        return await this.inventoryRepository.delete(id);
    }

    async balance(): Promise<InventoryMovmentEntity[]> {
        return null;
    }
}
