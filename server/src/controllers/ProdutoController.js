const connection = require('../database/connection');

module.exports = {
    
    async index(request, response){

    },

    async show(request, response){
        
    },

    /**
     * Criar um produto
     * @param  {[String]} request.body.codigo_do_produto nome do usuário
     * @param  {[String]} request.body.descricao_do_produto email do usuário
     * @param  {[String]} request.body.observacao senha do usuário
     * @param  {[String]} request.body.tipo senha do usuário
     * @return {[JSON]} JSON contendo o produto criado
     */
    async create(request, response){
        const produto = {
            codigo_do_produto: request.body.codigo_do_produto,
            descricao_do_produto: request.body.descricao_do_produto,
            observacao: request.body.observacao,
            tipo: request.body.tipo
        };
        
        try {
            await connection('produto').insert(produto);

            return response.json(produto);
        }catch(err){
            return response.status(400).send(err);
        }
        
    },

    async update(request, response){
       
    },

    async destroy(request, response){
        
    },
}
