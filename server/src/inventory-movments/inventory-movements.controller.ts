import { Controller, Post, Body, Get, Put, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { InventoryMovementEntity } from './inventory-movements.entity';
import { InventoryMovmentsService } from './inventory-movements.service';
import { AuthGuard } from '@nestjs/passport';
import { InventoryMovementsBalanceDto } from './dto/inventory-movements-balance.dto';
import { InventoryMovementType } from 'src/shared/enums/inventory-movements.enums';

@Controller('inventory-movements')
export class InventoryMovementsController {
    constructor(private inventoryMovmentsService: InventoryMovmentsService) {}

    @Post()
    @UseGuards(AuthGuard())  
    async create(@Body() product: InventoryMovementEntity): Promise<InventoryMovementEntity> {
        return await this.inventoryMovmentsService.create(product);
    }

    @Get()
    async findAll(
        @Query('page') page: number): Promise<InventoryMovementEntity[]> {
        return await this.inventoryMovmentsService.findAll(page);
    }

    @Get('balance')
    @UseGuards(AuthGuard())  
    async balance(@Query('page') page: number): Promise<InventoryMovementsBalanceDto[]> {
        return await this.inventoryMovmentsService.balance(page);
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<InventoryMovementEntity> {
        return await this.inventoryMovmentsService.findOne(id);
    }

    @Put(':id')
    @UseGuards(AuthGuard())  
    async update(@Param('id') id: number, @Body() product: InventoryMovementEntity): Promise<any> {
        product.id = Number(id);

        return await this.inventoryMovmentsService.update(product); 
    } 

    @Delete(':id')
    @UseGuards(AuthGuard())  
    async remove(@Param('id') id: number): Promise<any> {
        return await this.inventoryMovmentsService.delete(id);
    }
}
