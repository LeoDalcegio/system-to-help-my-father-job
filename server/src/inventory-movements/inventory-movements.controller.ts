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
} from '@nestjs/swagger';
import { CreateInventoryMovementDto } from './dto/create-inventory-movement.dto'; // leo
import { AuthGuard } from '@nestjs/passport';
import { InventoryMovement as InventoryMovementEntity } from './inventory-movement.entity';
import { InventoryMovementDto } from './dto/inventory-movement.dto';
import { InventoryMovementsService } from './inventory-movements.service';
import { UpdateInventoryMovementDto } from './dto/update-inventory-movement.dto';
import { BalanceInventoryMovementDto } from './dto/balance-inventory-movement.dto';

@Controller('inventory-movements')
@ApiTags('inventory-movements')
export class InventoryMovementsController {
    constructor(private readonly inventoryMovementsService: InventoryMovementsService) {}

    @Get()
    @ApiOkResponse({ type: [InventoryMovementDto] })
    findAll(): Promise<InventoryMovementDto[]> {
        return this.inventoryMovementsService.findAll();
    }

    @Get('balance')
    @ApiOkResponse({ type: [BalanceInventoryMovementDto] })
    balance(): Promise<BalanceInventoryMovementDto[]> {
        return this.inventoryMovementsService.balance();
    }

    @Get(':id')
    @ApiOkResponse({ type: InventoryMovementDto })
    @ApiParam({ name: 'id', required: true })
    findOne(@Param('id', new ParseIntPipe()) id: number): Promise<InventoryMovementDto> {
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
    @ApiOkResponse({ type: InventoryMovementDto })
    @ApiParam({ name: 'id', required: true })
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    update(
        @Param('id', new ParseIntPipe()) id: number,
        @Body() updateInventoryMovementDto: UpdateInventoryMovementDto,
    ): Promise<InventoryMovementDto> {
        return this.inventoryMovementsService.update(id, updateInventoryMovementDto);
    }

    @Delete(':id')
    @ApiOkResponse({ type: InventoryMovementDto })
    @ApiParam({ name: 'id', required: true })
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    delete(@Param('id', new ParseIntPipe()) id: number): Promise<InventoryMovementDto> {
        return this.inventoryMovementsService.delete(id);
    }
}
