import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
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

    async findOne(id): Promise<Product> {
        return await this.productRepository.findOne(id);
    }

    async create(product: Product): Promise<Product> {
        const productExist: Product = await this.productRepository.findOne({ product_code: product.product_code });
        
        if(productExist){
            throw new HttpException('Código de produto já existente', HttpStatus.BAD_REQUEST);
        }

        return await this.productRepository.save(product);
    }

    async update(product: Product): Promise<UpdateResult> {
        return this.productRepository.update(product.id, product);
    }
    
    async delete(id): Promise<DeleteResult> {
        return await this.productRepository.delete(id);
    }
}
