import { Dialect } from 'sequelize/types';

export const config = {
    database: {
        dialect: 'postgres' as Dialect,
        host: 'ec2-18-210-214-86.compute-1.amazonaws.com',
        port: 5432,
        username: 'gqtjxczsygmzdl',
        password: 'c7676aa249318a88c76d8ffad12b7ade59aec52673f7af4e7739cf6406b650d5',
        database: 'dfvdoaqo719rvq',
        logging: false,
    },
    jwtPrivateKey: 'jwtPrivateKey',
};
