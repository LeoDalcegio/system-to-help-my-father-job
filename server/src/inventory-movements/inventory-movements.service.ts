import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { CreateInventoryMovementDto } from './dto/create-inventory-movement.dto';
import { UpdateInventoryMovementDto } from './dto/update-inventory-movement.dto';
import { InventoryMovement } from './inventory-movement.entity';
import { BalanceInventoryMovementDto } from './dto/balance-inventory-movement.dto';
import { InventoryMovementType } from '../shared/enum/inventory-movement-type.enums';
import { Client } from '../clients/client.entity';
import { Product } from '../products/product.entity';
import { InventoryMovementDto } from './dto/inventory-movement.dto';

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
        let where = { };

        page++;

        const inventoryMovements: InventoryMovement[] = await this.inventoryMovementsRepository.findAll({
            include: [Product, Client],
            order: ['id'],
            limit,
            offset: (limit * page) - limit,
        });

        return inventoryMovements.map(inventoryMovement => new InventoryMovementDto(inventoryMovement));
    }

    async findOne(id: number) {
        let where = { };

        where['id'] = id;

        const inventoryMovement: InventoryMovement = await this.inventoryMovementsRepository.findOne({
            include: [Product, Client],
            where
        });

        if (!inventoryMovement) {
            throw new HttpException('Movimentação de estoque não encontrada', HttpStatus.NOT_FOUND);
        }

        return inventoryMovement;
    }

    async balance(
        page: number,
        limit: number = 15,
    ): Promise<BalanceInventoryMovementDto[]> {
        const retObject: BalanceInventoryMovementDto[] = [];

        page++;

        const entries: InventoryMovement[] = await this.inventoryMovementsRepository.findAll({
            include: [Product, Client],
            where: {
                type: InventoryMovementType.ENTRY
            },
            order: ['id'],
            limit,
            offset: (limit * page) - limit,
        });

        for(const entry of entries){
            const exits: InventoryMovement[] = await this.inventoryMovementsRepository.findAll({
                include: [Product, Client],
                where: {
                    type: InventoryMovementType.EXIT,
                    clientId: entry.clientId,
                    referencedNoteNumber: entry.noteNumber
                }
            });

            const entryToSend = new InventoryMovementDto(entry);

            retObject.push({
                entry: entryToSend,
                exits: [...exits.map(inventoryMovement => new InventoryMovementDto(inventoryMovement))]
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
        inventoryMovement.referencedNoteNumber = createInventoryMovementDto.referencedNoteNumber;
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
        inventoryMovement.referencedNoteNumber = updateInventoryMovementDto.referencedNoteNumber;
        inventoryMovement.observation = updateInventoryMovementDto.observation;
        inventoryMovement.productId = updateInventoryMovementDto.productId;
        inventoryMovement.quantity = updateInventoryMovementDto.quantity;
        inventoryMovement.type = updateInventoryMovementDto.type;

        try {
            const data = await inventoryMovement.save();

            return data;
        } catch (err) {
            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async delete(id: number) {
        const inventoryMovement = await this.inventoryMovementsRepository.findByPk<InventoryMovement>(id);
        
        await inventoryMovement.destroy();

        return inventoryMovement;
    }
}
