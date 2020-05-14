const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');
const verify = require('./middlewares/verifyToken');

const AuthController = require('./controllers/AuthController');
const ProdutoController = require('./controllers/ProdutoController');
const ClienteController = require('./controllers/ClienteController');
const MovimentacaoController = require('./controllers/MovimentacaoController');

const RelatorioMovimentacaoController = require('./controllers/reports/RelatorioMovimentacaoController');

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
        limit: Joi.number(),
        page: Joi.number(),
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

routes.put('/produto/:id', celebrate({
    [Segments.PARAMS]: Joi.object({
        id: Joi.number().required(),
    }),
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
    ProdutoController.update
);

routes.delete('/produto/:id', celebrate({
    [Segments.PARAMS]: Joi.object({
        id: Joi.number().required(),
    }),
}),
    verify,
    ProdutoController.destroy
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
        limit: Joi.number(),
        page: Joi.number(),
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

routes.put('/cliente/:id', celebrate({
    [Segments.PARAMS]: Joi.object({
        id: Joi.number().required(),
    }),
    [Segments.BODY]: Joi.object({
        nome: Joi.string()
            .required(),
        observacao: Joi.string(),
    }),
}),
    verify,
    ClienteController.update
);

routes.delete('/cliente/:id', celebrate({
    [Segments.PARAMS]: Joi.object({
        id: Joi.number().required(),
    }),
}),
    verify,
    ClienteController.destroy
);

routes.post('/movimentacao', celebrate({
    [Segments.BODY]: Joi.object({
        numero_da_nota: Joi.number()
            .required(),
        tipo: Joi.string()
            .required(),
        observacao: Joi.string(),
        data_da_movimentacao: Joi.date()
            .required(),
        quantidade: Joi.number()
            .required(),
        produto_id: Joi.number()
            .required(),
        cliente_id: Joi.number()
            .required(),    
    }),
}),
    verify,
    MovimentacaoController.create
);

routes.get('/movimentacao', celebrate({
    [Segments.QUERY]: Joi.object({
        limit: Joi.number(),
        page: Joi.number(),
        tipo: Joi.string().required(),
    }),
}),
    verify,
    MovimentacaoController.index
);

routes.get('/movimentacao/:id', celebrate({
    [Segments.PARAMS]: Joi.object({
        id: Joi.number().required(),
    }),
}),
    verify,
    MovimentacaoController.show
);

routes.put('/movimentacao/:id', celebrate({
    [Segments.PARAMS]: Joi.object({
        id: Joi.number().required(),
    }),
    [Segments.BODY]: Joi.object({
        numero_da_nota: Joi.number()
            .required(),
        tipo: Joi.string()
            .required(),
        observacao: Joi.string(),
        data_da_movimentacao: Joi.date()
            .required(),
        quantidade: Joi.number()
            .required(),
        produto_id: Joi.number()
            .required(),
        cliente_id: Joi.number()
            .required(),    
    }),
}),
    verify,
    MovimentacaoController.update
);

routes.delete('/movimentacao/:id', celebrate({
    [Segments.PARAMS]: Joi.object({
        id: Joi.number().required(),
    }),
}),
    verify,
    MovimentacaoController.destroy
);

routes.get('/movimentacao', celebrate({
    [Segments.QUERY]: Joi.object({
        limit: Joi.number(),
        page: Joi.number(),
    }),
}),
    verify,
    RelatorioMovimentacaoController.index
);


module.exports = routes;