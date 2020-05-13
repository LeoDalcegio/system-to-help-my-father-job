const connection = require('../database/connection');

module.exports = {
    
    /**
     * Buscar todos os clientes
     * @param  {[Number]} request.body.currentPage página atual
     * @param  {[Number]} request.body.perPage limite de itens por página
     * @return {[JSON]} JSON contendo todos os clientes
     */
    async index(request, response){
        const { currentPage = 1, perPage = 10 } = request.query;
        
        const clientes = await knex('cliente')
                .paginate({ perPage, currentPage });
        
        return response.json(clientes);
    },

    async show(request, response){
        
    },

    async create(request, response){
       
    },

    async update(request, response){
       
    },

    async destroy(request, response){
        
    },
}
