import { ApiProperty } from '@nestjs/swagger';
import { Client } from '../client.entity';

export class ClientDto {
    @ApiProperty()
    readonly id: number;

    @ApiProperty()
    readonly name: string;

    @ApiProperty()
    readonly observation: string;

    @ApiProperty()
    readonly createdAt: Date;

    @ApiProperty()
    readonly updatedAt: Date;

    constructor(client: Client) {
        this.id = client.id;
        this.name = client.name;
        this.observation = client.observation;
        this.createdAt = client.createdAt;
        this.updatedAt = client.updatedAt;
    }
}
