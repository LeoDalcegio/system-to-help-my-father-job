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
            const entradas = await connection('movimentacao')
                .join('cliente', 'cliente.id', '=', 'movimentacao.cliente_id')
                .join('produto', 'produto.id', '=', 'movimentacao.produto_id')
                .where('movimentacao.tipo', "E") // colocar do ENUM
                .limit(limit)
                .offset((page - 1) * 5)
                .select(
                    'movimentacao.*', 
                    'cliente.nome', 
                    'produto.codigo_do_produto', 
                    'produto.descricao_do_produto'
                );

            entradas.forEach(async (entrada) =>  {
                // fazer sql em cima da entradas, 
                // colocar resultado do sql dentro dum array
                
                // retObject.push(entrada, array)

                const saidas = await connection('movimentacao')
                    .join('cliente', 'cliente.id', '=', 'movimentacao.cliente_id')
                    .join('produto', 'produto.id', '=', 'movimentacao.produto_id')
                    .where('movimentacao.tipo', "S") // colocar do ENUM
                    .where('movimentacao.numero_da_nota', entrada.numero_da_nota)
                    .select(
                        'movimentacao.*', 
                        'cliente.nome', 
                        'produto.codigo_do_produto', 
                        'produto.descricao_do_produto'
                    );
                
                if(saidas){
                    retObject.push({
                        entrada,
                        saidas: [...saidas]
                    })
                }
            });

            return response.json(retObject);
        } catch (err) {
            return response.status(400).send(err);
        }
    },
}