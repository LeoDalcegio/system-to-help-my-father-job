import { Injectable } from '@nestjs/common';
import { Repository, createQueryBuilder } from 'typeorm';
import { InventoryMovementEntity } from './inventory-movements.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateResult, DeleteResult } from  'typeorm';
import { InventoryMovementsBalanceDto } from './dto/inventory-movements-balance.dto';
import { InventoryMovementType } from 'src/shared/enums/inventory-movements.enums';

@Injectable()
export class InventoryMovmentsService {
  
    constructor(
        @InjectRepository(InventoryMovementEntity) 
        private inventoryRepository: Repository<InventoryMovementEntity>
    ) { }
    
    async findAll(page: number = 1): Promise<InventoryMovementEntity[]> {
            
        return await this.inventoryRepository.find({      
            relations: ['product','client'],      
            take: 15,
            skip: 15 * (page - 1),           
        });
    }

    async findOne(id: number): Promise<InventoryMovementEntity> {
        return await this.inventoryRepository.findOne(id);
    }

    async create(product: InventoryMovementEntity): Promise<InventoryMovementEntity> {
        return await this.inventoryRepository.save(product);
    }

    async update(product: InventoryMovementEntity): Promise<UpdateResult> {
        return this.inventoryRepository.update(product.id, product);
    }
    
    async delete(id: number): Promise<DeleteResult> {
        return await this.inventoryRepository.delete(id);
    }

    async balance(page: number = 1): Promise<InventoryMovementsBalanceDto[]> {
        let retObject: Array<InventoryMovementsBalanceDto> = [];
        
        const entries: InventoryMovementEntity[] = await this.inventoryRepository.find({
            relations: ['product','client'],  
            take: 15,
            skip: 15 * (page - 1),    
            where: {
                type: InventoryMovementType.ENTRY
            }
        });

        for(const entry of entries){
            const exits: InventoryMovementEntity[] = await this.inventoryRepository.find({
                relations: ['product','client'],      
                where: {
                    type: InventoryMovementType.EXIT,
                    client_id: entry.client_id,
                    note_number: entry.note_number
                }
            });

            retObject.push({
                entry,
                exits: [...exits]
            })
        }

        return retObject;
    }
}