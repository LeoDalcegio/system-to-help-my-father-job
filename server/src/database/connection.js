const knex = require('knex');
const configuration = require('../../knexfile');
const { attachPaginate } = require('knex-paginate');

const connection = knex(configuration.development);
attachPaginate();

module.exports = connection;