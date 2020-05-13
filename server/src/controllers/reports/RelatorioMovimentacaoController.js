const connection = require('../../database/connection');

module.exports = {

    /**
     * Buscar o total de movimentações, ou seja, a diferença da movimentação de entrada com as de saída para uma mesma nota
     * @param  {[Number]} request.query.page Página atual
     * @param  {[Number]} request.query.limit Limite de itens por página
     * @return {[JSON]} JSON contendo todas as movimentações
     */
    async index(request, response) {
        const { page = 1, limit = 10 } = request.query;

        const retObject = [{
            entrada: '',
            saidas: []
        }];
                  
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
}