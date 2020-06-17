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
import { CreateInventoryMovementDto } from './dto/create-inventory-movement.dto'; // leo
import { AuthGuard } from '@nestjs/passport';
import { InventoryMovement as InventoryMovementEntity } from './inventory-movement.entity';
import { InventoryMovementsService } from './inventory-movements.service';
import { UpdateInventoryMovementDto } from './dto/update-inventory-movement.dto';
import { BalanceInventoryMovementDto } from './dto/balance-inventory-movement.dto';
import { Query } from '@nestjs/common';
import { InventoryMovementDto } from './dto/inventory-movement.dto';

@Controller('inventory-movements')
@ApiTags('inventory-movements')
export class InventoryMovementsController {
    constructor(private readonly inventoryMovementsService: InventoryMovementsService) {}

    @Get()
    @ApiOkResponse({ type: [InventoryMovementDto] })
    @ApiQuery({ name: 'page', required: true })
    @ApiQuery({ name: 'limit', required: true })
    @ApiQuery({ name: 'productId', required: false })
    @ApiQuery({ name: 'clientId', required: false })
    @ApiQuery({ name: 'noteNumber', required: false })
    @ApiQuery({ name: 'referencedNoteNumber', required: false })
    @ApiQuery({ name: 'type', required: false })
    @ApiQuery({ name: 'initialMovementDate', required: false })
    @ApiQuery({ name: 'finalMovementDate', required: false })
    findAll(
        @Query('page', new ParseIntPipe()) page: number,
        @Query('limit', new ParseIntPipe()) limit: number,
        @Query('clientId', new ParseIntPipe()) clientId?: number,
        @Query('productId', new ParseIntPipe()) productId?: number,
        @Query('noteNumber', new ParseIntPipe()) noteNumber?: number,
        @Query('referencedNoteNumber', new ParseIntPipe()) referencedNoteNumber?: number,
        @Query('type') type?: string,
        @Query('initialMovementDate') initialMovementDate?: Date,
        @Query('finalMovementDate') finalMovementDate?: Date,
    ): Promise<InventoryMovementDto[]> {
        
        return this.inventoryMovementsService.findAll(page, limit, productId, clientId, noteNumber, referencedNoteNumber, type, initialMovementDate, finalMovementDate);
    }

    @Get('balance')
    @ApiQuery({ name: 'page', required: true })
    @ApiQuery({ name: 'limit', required: true })
    @ApiQuery({ name: 'productId', required: false })
    @ApiQuery({ name: 'clientId', required: false })
    @ApiQuery({ name: 'noteNumber', required: false })
    @ApiQuery({ name: 'referencedNoteNumber', required: false })
    @ApiOkResponse({ type: [BalanceInventoryMovementDto] })
    balance(
        @Query('page', new ParseIntPipe()) page: number,
        @Query('limit', new ParseIntPipe()) limit: number,
        @Query('clientId', new ParseIntPipe()) clientId?: number,
        @Query('productId', new ParseIntPipe()) productId?: number,
        @Query('noteNumber', new ParseIntPipe()) noteNumber?: number,
        @Query('referencedNoteNumber', new ParseIntPipe()) referencedNoteNumber?: number,
    ): Promise<BalanceInventoryMovementDto[]> {
        return this.inventoryMovementsService.balance(page, limit, productId, clientId, noteNumber, referencedNoteNumber);
    }

    @Get(':id')
    @ApiOkResponse({ type: InventoryMovementEntity })
    @ApiParam({ name: 'id', required: true })
    findOne(@Param('id', new ParseIntPipe()) id: number): Promise<InventoryMovementEntity> {
        return this.inventoryMovementsService.findOne(id);
    }

    @Post()
    @ApiCreatedResponse({ type: InventoryMovementEntity })
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    create(@Body() createInventoryMovementDto: CreateInventoryMovementDto): Promise<InventoryMovementEntity> {
        return this.inventoryMovementsService.create(createInventoryMovementDto);
    }

    @Put(':id')
    @ApiOkResponse({ type: InventoryMovementEntity })
    @ApiParam({ name: 'id', required: true })
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    update(
        @Param('id', new ParseIntPipe()) id: number,
        @Body() updateInventoryMovementDto: UpdateInventoryMovementDto,
    ): Promise<InventoryMovementEntity> {
        return this.inventoryMovementsService.update(id, updateInventoryMovementDto);
    }

    @Delete(':id')
    @ApiOkResponse({ type: InventoryMovementEntity })
    @ApiParam({ name: 'id', required: true })
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    delete(@Param('id', new ParseIntPipe()) id: number): Promise<InventoryMovementEntity> {
        return this.inventoryMovementsService.delete(id);
    }
}
