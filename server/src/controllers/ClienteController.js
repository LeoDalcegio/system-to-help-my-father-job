const connection = require('../database/connection');

module.exports = {
    
    /**
     * Buscar todos os clientes
     * @param  {[Number]} request.body.page Página atual
     * @param  {[Number]} request.body.limit Limite de itens por página
     * @return {[JSON]} JSON contendo todos os clientes
     */
    async index(request, response){
        const { page = 1, limit = 10 } = request.query;
        
        const clientes = await knex('cliente')
                .limit(limit)
                .offset((page - 1) * 5)
                .select("*");
        
        return response.json(clientes);
    },

    /**
     * Buscar um cliente com base no id informado
     * @param  {[Number]} request.params.id Id do cliente a ser retornado
     * @return {[JSON]} JSON contendo o cliente
     */
    async show(request, response){
        const { id } = request.params;
        
        try {
            const cliente = await connection('cliente')
                .where('id', id)
                .first()
                .select("*");

            return response.json(cliente);
        }catch(err){
            return response.status(400).send(err);
        }
    },

    /**
     * Criar um cliente
     * @param  {[String]} request.body.nome Nome do cliente
     * @param  {[String]} request.body.observacao Observação para o cliente
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

    /**
     * Atualizar um cliente
     * @param  {[String]} request.params.id Id do cliente a ser atualizado
     * @param  {[String]} request.body.nome Nome do cliente
     * @param  {[String]} request.body.observacao Observação para o cliente
     * @return {[JSON]} JSON contendo o cliente atualizado
     */
    async update(request, response){
        const { id } = request.params;

        const { nome, observacao } = request.body;
        
        const cliente = {
            nome,
            observacao
        };

        try {
            await connection('cliente')
                .where('id', id)
                .update(
                    cliente
                );

            return response.json(cliente);
        } catch (err) {
            return response.status(400).send(err);
        }
    },

    /**
     * Deletar um cliente
     * @param  {[Number]} request.params.id Id do cliente a ser excluído
     * @return {[StatusCode]} Status code da operação
     */
    async destroy(request, response){
        const { id } = request.params;

        try {
            await connection('cliente')
                .where('id', id)
                .delete();

            return response.status(204).send();
        }catch(err){
            return response.status(400).send(err);
        }
    },
}
