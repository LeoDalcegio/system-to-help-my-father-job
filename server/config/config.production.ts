import { Dialect } from 'sequelize/types';

export const config = {
    database: process.env.DATABASE,
    jwtPrivateKey: process.env.JWT_PRIVATE_KEY,
};
