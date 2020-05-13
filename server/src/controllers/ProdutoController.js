const connection = require('../database/connection');

module.exports = {
    
    /**
     * Buscar todos os produtos
     * @param  {[Number]} request.body.currentPage página atual
     * @param  {[Number]} request.body.perPage limite de itens por página
     * @return {[JSON]} JSON contendo todos os produtos
     */
    async index(request, response){
        const { currentPage = 1, perPage = 10 } = request.query;
        
        try {
            const produtos = await knex('produto')
                .paginate({ perPage, currentPage });
        
            return response.json(produtos);
        }catch(err){
            return response.status(400).send(err);
        }
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

        const { codigo_do_produto, descricao_do_produto, observacao, tipo } = request.body;

        const produto = {
            codigo_do_produto,
            descricao_do_produto,
            observacao,
            tipo
        };
        
        try {
            const productExist = await connection('produto').where({ codigo_do_produto: codigo_do_produto }).first().select('id');
        
            if(productExist) return response.status(409).send({ error: 'Código de Produto já existente' });
            
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
