import { Sequelize } from 'sequelize-typescript';
import { User } from './../users/user.entity';
import { Product } from './../products/product.entity';
import { Client } from './../clients/client.entity';
import { InventoryMovement } from './../inventory-movements/inventory-movement.entity';
import { ConfigService } from './../shared/config/config.service';

export const databaseProviders = [
    {
        provide: 'SEQUELIZE',
        useFactory: async (configService: ConfigService) => {
            //const sequelize = new Sequelize(configService.sequelizeOrmConfig);
            const sequelize = new Sequelize('nsnppava', 'nsnppava', 'p20opkKQZMaodEYfYTuwncJxHnC5K46g', {
                host: 'tuffi.db.elephantsql.com',
                dialect: 'postgres'
            });

            sequelize.addModels([User, Product, Client, InventoryMovement]);

            await sequelize.sync();

            return sequelize;
        },
        inject: [ConfigService],
    },
];
