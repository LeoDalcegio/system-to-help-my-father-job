import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ClientEntity } from './clients.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateResult, DeleteResult } from  'typeorm';

@Injectable()
export class ClientsService {
  
    constructor(
        @InjectRepository(ClientEntity) 
        private clientRepository: Repository<ClientEntity>
    ) { }
    
    async findAll(): Promise<ClientEntity[]> {
        return await this.clientRepository.find();
    }

    async findOne(id: number): Promise<ClientEntity> {
        return await this.clientRepository.findOne(id);
    }

    async create(product: ClientEntity): Promise<ClientEntity> {
        return await this.clientRepository.save(product);
    }

    async update(product: ClientEntity): Promise<UpdateResult> {
        return this.clientRepository.update(product.id, product);
    }
    
    async delete(id: number): Promise<DeleteResult> {
        return await this.clientRepository.delete(id);
    }
}
