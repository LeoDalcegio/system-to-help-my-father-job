import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateResult, DeleteResult } from  'typeorm';

@Injectable()
export class ProductsService {
  
    constructor(
        @InjectRepository(Product) 
        private productRepository: Repository<Product>
    ) { }
    
    async findAll(): Promise<Product[]> {
        return await this.productRepository.find();
    }

    async getById(id): Promise<Product> {
        return await this.productRepository.findOne(id);
    }

    async create(product: Product): Promise<Product> {
        return await this.productRepository.save(product);
    }

    async update(product: Product): Promise<UpdateResult> {
        return this.productRepository.update(product.id, product);
    }
    
    async delete(id): Promise<DeleteResult> {
        return await this.productRepository.delete(id);
    }
}
