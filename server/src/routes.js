const express = require('express');

const routes = express.Router();

routes.get('/users', (request, response) => {
    return response.send({
        Hello: 'World'
    })
})

module.exports = routes;