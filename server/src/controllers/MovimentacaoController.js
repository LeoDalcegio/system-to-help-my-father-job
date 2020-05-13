const connection = require('../database/connection');

module.exports = {

    /**
     * Buscar todas as movimentações filtrando o tipo delas
     * @param  {[Number]} request.body.page Página atual
     * @param  {[Number]} request.body.limit Limite de itens por página
     * @param  {[String]} request.body.tipo "S" = saída, "E" = entrada
     * @return {[JSON]} JSON contendo todas as movimentações
     */
    async index(request, response) {
        const { page = 1, limit = 10, tipo } = request.query;
        
        try {
            const movimentacoes = await connection('movimentacao')
                .join('cliente', 'cliente.id', '=', 'movimentacao.cliente_id')
                .join('produto', 'produto.id', '=', 'movimentacao.produto_id')
                .where('movimentacao.tipo', tipo)
                .limit(limit)
                .offset((page - 1) * 5)
                .select(
                    'movimentacao.*', 
                    'cliente.nome', 
                    'produto.codigo_do_produto', 
                    'produto.descricao_do_produto'
                );

            return response.json(movimentacoes);
        } catch (err) {
            return response.status(400).send(err);
        }
    },

    /**
     * Buscar uma movimentação
     * @param  {[Number]} request.params.id Id da movimentação a ser retornado
     * @return {[JSON]} JSON contendo a movimentação
     */
    async show(request, response) {
        const { id } = request.params;

        try {
            const movimentacao = await connection('movimentacao')
                .join('cliente', 'cliente.id', '=', 'movimentacao.cliente_id')
                .join('produto', 'produto.id', '=', 'movimentacao.produto_id')
                .where('movimentacao.id', id)
                .first()
                .select(
                    'movimentacao.*', 
                    'cliente.nome', 
                    'produto.codigo_do_produto', 
                    'produto.descricao_do_produto'
                );

            return response.json(movimentacao);
        } catch (err) {
            return response.status(400).send(err);
        }
    },
  
    /**
     * Criar uma movimentação
     * @param  {[Number]} request.body.numero_da_nota Número da nota movimentada
     * @param  {[String]} request.body.tipo "S" = saída, "E" = entrada
     * @param  {[String]} request.body.observacao Observação para a movimentação
     * @param  {[Date]} request.body.data_da_movimentacao Data da movimentação
     * @param  {[Number]} request.body.quantidade Quantidade movimentada
     * @param  {[Number]} request.body.produto_id Produto movimentado
     * @param  {[Number]} request.body.cliente_id Cliente referente a esta movimentação
     * @return {[JSON]} JSON contendo a movimentação criada
     */
    async create(request, response) {
        const { 
            numero_da_nota, 
            tipo, 
            observacao, 
            data_da_movimentacao, 
            quantidade, 
            produto_id, 
            cliente_id 
        } = request.body;

        // criar enum para tipo e verificar se ele é válido

        const movimentacao = {
            numero_da_nota, 
            tipo, 
            observacao, 
            data_da_movimentacao, 
            quantidade, 
            produto_id, 
            cliente_id 
        };

        try {
            await connection('movimentacao').insert(movimentacao);

            return response.json(movimentacao);
        } catch (err) {
            return response.status(400).send(err);
        }
    },

    /**
     * Atualizar uma movimentação
     * @param  {[Number]} request.body.numero_da_nota Número da nota movimentada
     * @param  {[String]} request.body.tipo "S" = saída, "E" = entrada
     * @param  {[String]} request.body.observacao Observação para a movimentação
     * @param  {[Date]} request.body.data_da_movimentacao Data da movimentação
     * @param  {[Number]} request.body.quantidade Quantidade movimentada
     * @param  {[Number]} request.body.produto_id Produto movimentado
     * @param  {[Number]} request.body.cliente_id Cliente referente a esta movimentação
     * @return {[JSON]} JSON contendo a movimentação atualizada
     */
    async update(request, response) {
        
    },

    /**
     * Deletar uma movimentação
     * @param  {[Number]} request.body.nome Id da movimentação a ser excluída
     * @return {[StatusCode]} Status code da operação
     */
    async destroy(request, response) {
        const { id } = request.params;

        try {
            await connection('movimentacao')
                .where('id', id)
                .delete();

            return response.status(204).send();
        } catch (err) {
            return response.status(400).send(err);
        }
    },
}
