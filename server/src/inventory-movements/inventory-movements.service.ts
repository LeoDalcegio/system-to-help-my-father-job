import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { CreateInventoryMovementDto } from './dto/create-inventory-movement.dto';
import { InventoryMovementDto } from './dto/inventory-movement.dto';
import { UpdateInventoryMovementDto } from './dto/update-inventory-movement.dto';
import { InventoryMovement } from './inventory-movement.entity';
import { BalanceInventoryMovementDto } from './dto/balance-inventory-movement.dto';
import { InventoryMovementType } from '../shared/enum/inventory-movement-type.enums';
import { Client } from '../clients/client.entity';
import { Product } from '../products/product.entity';

@Injectable()
export class InventoryMovementsService {
    constructor(
        @Inject('InventoryMovementsRepository')
        private readonly inventoryMovementsRepository: typeof InventoryMovement,
    ) {}

    async findAll(
        page: number,
        limit: number = 15,
    ) {
        const inventoryMovements = await this.inventoryMovementsRepository.findAndCountAll<InventoryMovement>({
            order: ['id'],
            limit: limit,
            offset: page,
        });

        return inventoryMovements.rows.map(inventoryMovement => new InventoryMovementDto(inventoryMovement)); // verificar se isso é necessário
    }

    async findOne(id: number) {
        const inventoryMovement = await this.inventoryMovementsRepository.findByPk<InventoryMovement>(id);

        if (!inventoryMovement) {
            throw new HttpException('Movimentação de estoque não encontrada', HttpStatus.NOT_FOUND);
        }

        return new InventoryMovementDto(inventoryMovement);
    }

    async balance(
        page: number,
        limit: number = 15,
    ): Promise<BalanceInventoryMovementDto[]> {
        const retObject: BalanceInventoryMovementDto[] = [];

        const entries: InventoryMovementDto[] = await this.inventoryMovementsRepository.findAll({
            include: [Product, Client],
            where: {
                type: InventoryMovementType.ENTRY
            },
            order: ['id'],
            limit: limit,
            offset: page,
        });

        for(const entry of entries){
            const exits: InventoryMovementDto[] = await this.inventoryMovementsRepository.findAll({
                include: [Product, Client],
                where: {
                    type: InventoryMovementType.EXIT,
                    clientId: entry.clientId,
                    noteNumber: entry.noteNumber
                }
            });

            retObject.push({
                entry,
                exits: [...exits]
            })
        }

        return retObject;
    }

    async create(createInventoryMovementDto: CreateInventoryMovementDto) {
        const inventoryMovement = new InventoryMovement();

        inventoryMovement.observation = createInventoryMovementDto.observation;
        inventoryMovement.clientId = createInventoryMovementDto.clientId;
        inventoryMovement.movementDate = createInventoryMovementDto.movementDate;
        inventoryMovement.noteNumber = createInventoryMovementDto.noteNumber;
        inventoryMovement.productId = createInventoryMovementDto.productId;
        inventoryMovement.quantity = createInventoryMovementDto.quantity;
        inventoryMovement.type = createInventoryMovementDto.type;

        return inventoryMovement.save();
    }

    async update(id: number, updateInventoryMovementDto: UpdateInventoryMovementDto) {
        const inventoryMovement = await this.inventoryMovementsRepository.findByPk<InventoryMovement>(id);

        if (!inventoryMovement) {
            throw new HttpException('Movimentação de estoque não encontrada.', HttpStatus.NOT_FOUND);
        }

        inventoryMovement.clientId = updateInventoryMovementDto.clientId;
        inventoryMovement.movementDate = updateInventoryMovementDto.movementDate;
        inventoryMovement.noteNumber = updateInventoryMovementDto.noteNumber;
        inventoryMovement.observation = updateInventoryMovementDto.observation;
        inventoryMovement.productId = updateInventoryMovementDto.productId;
        inventoryMovement.quantity = updateInventoryMovementDto.quantity;
        inventoryMovement.type = updateInventoryMovementDto.type;

        try {
            const data = await inventoryMovement.save();

            return new InventoryMovementDto(data);
        } catch (err) {
            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async delete(id: number) {
        const inventoryMovement = await this.inventoryMovementsRepository.findByPk<InventoryMovement>(id);

        await inventoryMovement.destroy();

        return new InventoryMovementDto(inventoryMovement);
    }
}
