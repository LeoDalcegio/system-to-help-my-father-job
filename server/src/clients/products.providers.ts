import { Client } from './client.entity';

export const clientsProviders = [{ provide: 'ClientsRepository', useValue: Client }];
