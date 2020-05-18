import { Controller, Post, Body, Get, Put, Param, Delete, UseGuards } from '@nestjs/common';
import { ProductEntity } from './products.entity';
import { ProductsService } from './products.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('products')
export class ProductsController {
    constructor(private productsService: ProductsService) {}

    @Post()
    @UseGuards(AuthGuard())  
    async create(@Body() product: ProductEntity): Promise<ProductEntity> {
        let createdProduct: ProductEntity;

        try {
            createdProduct = await this.productsService.create(product);
        } catch (err) {
            return err.message;
        }

        return createdProduct;
    }

    @Get()
    async findAll(): Promise<ProductEntity[]> {
        return await this.productsService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<ProductEntity> {
        return await this.productsService.findOne(id);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() product: ProductEntity): Promise<any> {
        product.id = Number(id);
        
        try {
            return await this.productsService.update(product); 
        } catch (err) {
            return err.message;
        }
    } 

    @Delete(':id')
    async remove(@Param('id') id: number): Promise<any> {
        return await this.productsService.delete(id);
    }
}
