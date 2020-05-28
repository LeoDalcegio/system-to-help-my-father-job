import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { Client } from './client.entity';
import { ClientDto } from './dto/client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Injectable()
export class ClientsService {
    constructor(
        @Inject('ClientsRepository')
        private readonly clientsRepository: typeof Client,
    ) {}

    async findAll() {
        const clients = await this.clientsRepository.findAll<Client>();

        return clients.map(client => new ClientDto(client)); // verificar se isso é necessário
    }

    async findOne(id: number) {
        const client = await this.clientsRepository.findByPk<Client>(id);

        if (!client) {
            throw new HttpException('Cliente não encontrado', HttpStatus.NOT_FOUND);
        }

        return new ClientDto(client);
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

        client.observation = updateClientDto.observation || client.observation;
        client.name = updateClientDto.name || client.name;

        try {
            const data = await client.save();

            return new ClientDto(data);
        } catch (err) {
            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async delete(id: number) {
        const client = await this.clientsRepository.findByPk<Client>(id);

        await client.destroy();

        return new ClientDto(client);
    }
}
