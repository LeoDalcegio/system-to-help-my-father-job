import { Dialect } from 'sequelize/types';

export const config = {
    database: {
        dialect: 'postgres' as Dialect,
        host: 'localhost',
        port: 56537,
        username: 'postgres',
        password: 'postgres',
        database: 'tecelagem',
        logging: false,
    },
    jwtPrivateKey: 'jwtPrivateKey',
};
