import { Controller, Post, Body, Get, Put, Param, Delete } from '@nestjs/common';
import { Product } from './product.entity';
import { ProductsService } from './product.service';

@Controller('products')
export class ProductsController {
    constructor(private productsService: ProductsService) {}

    @Post()
    async create(@Body() product: Product): Promise<Product> {
        return this.productsService.create(product);
    }

    @Get()
    async findAll(): Promise<Product[]> {
        return this.productsService.findAll();
    }

    @Get(':id')
    async getById(@Param('id') id: string): Promise<Product> {
        return this.productsService.getById(id);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() product: Product): Promise<any> {
        product.id = Number(id);
        return this.productsService.update(product);    
    } 

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<any> {
        return this.productsService.delete(id);
    }
}
