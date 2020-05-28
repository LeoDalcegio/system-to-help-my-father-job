import { Dialect } from 'sequelize/types';

export const config = {
    database: {
        dialect: 'postgres' as Dialect,
        host: '127.0.0.1',
        port: 56537,
        username: 'postgres',
        password: 'postgres',
        database: 'tecelagem',
        logging: false,
    },
    jwtPrivateKey: 'jwtPrivateKey',
};
