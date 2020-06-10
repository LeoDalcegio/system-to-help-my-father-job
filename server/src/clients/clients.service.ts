import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { Client } from './client.entity';
import { UpdateClientDto } from './dto/update-client.dto';

@Injectable()
export class ClientsService {
    constructor(
        @Inject('ClientsRepository')
        private readonly clientsRepository: typeof Client,
    ) {}

    async findAll(
        page: number,
        limit: number = 15,
        name?: string
    ) {
        let where = { };

        if (name) {
            where['name'] = name
        }

        page++;

        const clients = await this.clientsRepository.findAll<Client>({
            where,
            order: ['id'],
            limit,
            offset: (limit * page) - limit,
        });

        return clients;
    }

    async findOne(id: number) {
        const client = await this.clientsRepository.findByPk<Client>(id);

        if (!client) {
            throw new HttpException('Cliente não encontrado', HttpStatus.NOT_FOUND);
        }

        return client;
    }

    async create(createClientDto: CreateClientDto) {
        const client = new Client();

        client.observation = createClientDto.observation;
        client.name = createClientDto.name;

        return client.save();
    }

    async update(id: number, updateClientDto: UpdateClientDto) {
        const client = await this.clientsRepository.findByPk<Client>(id);

        if (!client) {
            throw new HttpException('Cliente não encontrado.', HttpStatus.NOT_FOUND);
        }

        client.observation = updateClientDto.observation;
        client.name = updateClientDto.name;

        try {
            const data = await client.save();

            return data;
        } catch (err) {
            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async delete(id: number) {
        const client = await this.clientsRepository.findByPk<Client>(id);

        await client.destroy();

        return client;
    }
}
