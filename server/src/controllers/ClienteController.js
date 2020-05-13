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

    /**
     * Criar um cliente
     * @param  {[String]} request.body.nome nome do cliente
     * @param  {[String]} request.body.observacao observação para o cliente
     * @return {[JSON]} JSON contendo o cliente criado
     */
    async create(request, response){

        const { nome, observacao } = request.body;

        const cliente = {
            nome,
            observacao,
        };
        
        try {
            await connection('cliente').insert(cliente);

            return response.json(cliente);
        }catch(err){
            return response.status(400).send(err);
        }
    },

    async update(request, response){
       
    },

    async destroy(request, response){
        
    },
}
