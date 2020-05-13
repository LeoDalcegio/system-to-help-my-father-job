const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');
const AuthController = require('./controllers/AuthController')

const routes = express.Router();

routes.post('/register', celebrate({[Segments.BODY]: Joi.object({
    nome: Joi.string()
        .required(),
    email: Joi.string()
        .required()                 
        .email(),
    senha: Joi.string()
        .required(),
    }),}), 
    AuthController.register
);

routes.post('/login', celebrate({[Segments.BODY]: Joi.object({
    email: Joi.string()
        .required() 
        .email(),
    senha: Joi.string()  
        .required(),
    }),}),
    AuthController.login
);

module.exports = routes;