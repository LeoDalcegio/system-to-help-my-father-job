import { Controller, Post, Body, Get, Put, Param, Delete, UseGuards } from '@nestjs/common';
import { Product } from './product.entity';
import { ProductsService } from './product.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('products')
export class ProductsController {
    constructor(private productsService: ProductsService) {}

    @Post()
    @UseGuards(AuthGuard())  
    async create(@Body() product: Product): Promise<Product> {
        let createdProduct: Product;

        try {
            createdProduct = await this.productsService.create(product);
        } catch (err) {
            return err.message;
        }

        return createdProduct;
    }

    @Get()
    async findAll(): Promise<Product[]> {
        return await this.productsService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Product> {
        return await this.productsService.findOne(id);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() product: Product): Promise<any> {
        product.id = Number(id);
        
        try {
            return await this.productsService.update(product); 
        } catch (err) {
            return err.message;
        }
    } 

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<any> {
        return await this.productsService.delete(id);
    }
}
