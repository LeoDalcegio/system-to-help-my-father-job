import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ProductEntity } from './products.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateResult, DeleteResult } from  'typeorm';

@Injectable()
export class ProductsService {
  
    constructor(
        @InjectRepository(ProductEntity) 
        private productRepository: Repository<ProductEntity>
    ) { }
    
    async findAll(): Promise<ProductEntity[]> {
        return await this.productRepository.find();
    }

    async findOne(id: number): Promise<ProductEntity> {
        return await this.productRepository.findOne(id);
    }

    async create(product: ProductEntity): Promise<ProductEntity> {
        const productExist: ProductEntity = await this.productRepository.findOne({ product_code: product.product_code });
        
        if(productExist){
            throw new HttpException('Código de produto já existente', HttpStatus.BAD_REQUEST);
        }

        return await this.productRepository.save(product);
    }

    async update(product: ProductEntity): Promise<UpdateResult> {
        return this.productRepository.update(product.id, product);
    }
    
    async delete(id: number): Promise<DeleteResult> {
        return await this.productRepository.delete(id);
    }
}
