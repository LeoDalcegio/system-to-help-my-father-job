import { Controller, Post, Body, Get, Put, Param, Delete, UseGuards } from '@nestjs/common';
import { InventoryMovmentEntity } from './inventory-movements.entity';
import { InventoryMovmentsService } from './inventory-movements.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('clients')
export class InventoryMovementController {
    constructor(private inventoryMovmentsService: InventoryMovmentsService) {}

    @Post()
    @UseGuards(AuthGuard())  
    async create(@Body() product: InventoryMovmentEntity): Promise<InventoryMovmentEntity> {
        return await this.inventoryMovmentsService.create(product);
    }

    @Get()
    async findAll(): Promise<InventoryMovmentEntity[]> {
        return await this.inventoryMovmentsService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<InventoryMovmentEntity> {
        return await this.inventoryMovmentsService.findOne(id);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() product: InventoryMovmentEntity): Promise<any> {
        product.id = Number(id);

        return await this.inventoryMovmentsService.update(product); 
    } 

    @Delete(':id')
    async remove(@Param('id') id: number): Promise<any> {
        return await this.inventoryMovmentsService.delete(id);
    }
}
