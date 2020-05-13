const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');
const verify = require('./middlewares/verifyToken');

const AuthController = require('./controllers/AuthController');
const ProdutoController = require('./controllers/ProdutoController');
const ClienteController = require('./controllers/ClienteController');

const routes = express.Router();

routes.post('/register', celebrate({
    [Segments.BODY]: Joi.object({
        nome: Joi.string()
            .required(),
        email: Joi.string()
            .required()
            .email(),
        senha: Joi.string()
            .required(),
    }),
}),
    AuthController.register
);

routes.post('/login', celebrate({
    [Segments.BODY]: Joi.object({
        email: Joi.string()
            .required()
            .email(),
        senha: Joi.string()
            .required(),
    }),
}),
    AuthController.login
);

routes.post('/produto', celebrate({
    [Segments.BODY]: Joi.object({
        codigo_do_produto: Joi.string()
            .required(),
        descricao_do_produto: Joi.string()
            .required(),
        observacao: Joi.string(),
        tipo: Joi.string()
            .required(),
    }),
}),
    verify,
    ProdutoController.create
);

routes.get('/produto', celebrate({
    [Segments.QUERY]: Joi.object({
        perPage: Joi.number(),
        currentPage: Joi.number(),
    }),
}),
    verify,
    ProdutoController.index
);

routes.get('/produto/:id', celebrate({
    [Segments.PARAMS]: Joi.object({
        id: Joi.number().required(),
    }),
}),
    verify,
    ProdutoController.show
);

routes.post('/cliente', celebrate({
    [Segments.BODY]: Joi.object({
        nome: Joi.string()
            .required(),
        observacao: Joi.string(),
    }),
}),
    verify,
    ClienteController.create
);

routes.get('/cliente', celebrate({
    [Segments.QUERY]: Joi.object({
        perPage: Joi.number(),
        currentPage: Joi.number(),
    }),
}),
    verify,
    ClienteController.index
);

routes.get('/cliente/:id', celebrate({
    [Segments.PARAMS]: Joi.object({
        id: Joi.number().required(),
    }),
}),
    verify,
    ClienteController.show
);

module.exports = routes;