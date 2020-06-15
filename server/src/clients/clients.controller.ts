import {
    Controller,
    Body,
    Post,
    UseGuards,
    Get,
    Param,
    ParseIntPipe,
    Delete,
    Put,
} from '@nestjs/common';
import {
    ApiCreatedResponse,
    ApiBearerAuth,
    ApiOkResponse,
    ApiParam,
    ApiTags,
    ApiQuery,
} from '@nestjs/swagger';
import { CreateClientDto } from './dto/create-client.dto'; // leo
import { AuthGuard } from '@nestjs/passport';
import { Client as ClientEntity } from './client.entity';
import { UpdateClientDto } from './dto/update-client.dto';
import { ClientsService } from './clients.service';
import { Query } from '@nestjs/common';

@Controller('clients')
@ApiTags('clients')
export class ClientsController {
    constructor(private readonly clientsService: ClientsService) {}
    
    @Get()
    @ApiQuery({ name: 'page', required: true })
    @ApiQuery({ name: 'limit', required: true })
    @ApiQuery({ name: 'name', required: false })
    @ApiOkResponse({ type: [ClientEntity] })
    findAll(
        @Query('page', new ParseIntPipe()) page: number,
        @Query('limit', new ParseIntPipe()) limit: number,
        @Query('name') name: string,
    ): Promise<ClientEntity[]> {
        return this.clientsService.findAll(page, limit, name);
    }

    @Get(':id')
    @ApiOkResponse({ type: ClientEntity })
    @ApiParam({ name: 'id', required: true })
    findOne(@Param('id', new ParseIntPipe()) id: number): Promise<ClientEntity> {
        return this.clientsService.findOne(id);
    }

    @Post()
    @ApiCreatedResponse({ type: ClientEntity })
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    create(@Body() createClientDto: CreateClientDto): Promise<ClientEntity> {
        return this.clientsService.create(createClientDto);
    }

    @Put(':id')
    @ApiOkResponse({ type: ClientEntity })
    @ApiParam({ name: 'id', required: true })
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    update(
        @Param('id', new ParseIntPipe()) id: number,
        @Body() updateClientDto: UpdateClientDto,
    ): Promise<ClientEntity> {
        return this.clientsService.update(id, updateClientDto);
    }

    @Delete(':id')
    @ApiOkResponse({ type: ClientEntity })
    @ApiParam({ name: 'id', required: true })
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    delete(@Param('id', new ParseIntPipe()) id: number): Promise<ClientEntity> {
        return this.clientsService.delete(id);
    }
}
