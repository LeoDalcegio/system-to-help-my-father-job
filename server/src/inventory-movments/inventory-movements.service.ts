import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InventoryMovmentEntity } from './inventory-movements.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateResult, DeleteResult } from  'typeorm';
import { InventoryMovementsBalanceDto } from './dto/inventory-movements-balance.dto';
import { InventoryMovementType } from 'src/shared/enums/inventory-movements.enums';

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

    async balance(): Promise<InventoryMovementsBalanceDto[]> {
        let retObject: Array<InventoryMovementsBalanceDto>;
        
        const entries: InventoryMovmentEntity[] = await this.inventoryRepository.find({
            where: {
                type: InventoryMovementType.ENTRY
            }
        });

        entries.forEach(async (entry: InventoryMovmentEntity) => {
            const exits: InventoryMovmentEntity[] = await this.inventoryRepository.find({
                where: {
                    type: InventoryMovementType.EXIT,
                    client_id: entry.client_id,
                    note_number: entry.note_number
                }
            });

            if(exits){
                retObject.push({
                    entry,
                    exits: [...exits]
                })
            }else{
                retObject.push({
                    entry,
                    exits: null
                })
            }
        })
        console.log(retObject)
        return retObject;
    }
}