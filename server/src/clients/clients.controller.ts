import { Controller, Post, Body, Get, Put, Param, Delete, UseGuards } from '@nestjs/common';
import { ClientEntity } from './clients.entity';
import { ClientsService } from './clients.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('clients')
export class ClientsController {
    constructor(private clientsService: ClientsService) {}

    @Post()
    @UseGuards(AuthGuard())  
    async create(@Body() product: ClientEntity): Promise<ClientEntity> {
        return await this.clientsService.create(product);
    }

    @Get()
    async findAll(): Promise<ClientEntity[]> {
        return await this.clientsService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<ClientEntity> {
        return await this.clientsService.findOne(id);
    }

    @Put(':id')
    @UseGuards(AuthGuard())  
    async update(@Param('id') id: number, @Body() product: ClientEntity): Promise<any> {
        product.id = Number(id);

        return await this.clientsService.update(product); 
    } 

    @Delete(':id')
    @UseGuards(AuthGuard())  
    async remove(@Param('id') id: number): Promise<any> {
        return await this.clientsService.delete(id);
    }
}
