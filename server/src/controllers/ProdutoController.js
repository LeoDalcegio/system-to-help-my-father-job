const connection = require('../database/connection');
const produtoUtils = require('../utils/produtoUtils')

module.exports = {

    /**
     * Buscar todos os produtos
     * @param  {[Number]} request.query.page Página atual
     * @param  {[Number]} request.query.limit Limite de itens por página
     * @return {[JSON]} JSON contendo todos os produtos
     */
    async index(request, response) {
        const { page = 1, limit = 10 } = request.query;

        try {
            const produtos = await connection('produto')
                .limit(limit)
                .offset((page - 1) * 5)
                .select("*");

            return response.json(produtos);
        } catch (err) {
            return response.status(400).send({ error: err.message });
        }
    },

    /**
     * Buscar um produto com base no id informado
     * @param  {[Number]} request.params.id Id do produto a ser retornado
     * @return {[JSON]} JSON contendo o produto
     */
    async show(request, response) {
        const { id } = request.params;

        try {
            const produto = await connection('produto')
                .where('id', id)
                .first()
                .select("*");

            return response.json(produto);
        } catch (err) {
            return response.status(400).send({ error: err.message });
        }
    },

    /**
     * Criar um produto
     * @param  {[String]} request.body.codigo_do_produto Código do produto
     * @param  {[String]} request.body.descricao_do_produto Descrição do produto
     * @param  {[String]} request.body.observacao Observação para o produto
     * @param  {[String]} request.body.tipo Tipo do produto
     * @return {[JSON]} JSON contendo o produto criado
     */
    async create(request, response) {
        const { codigo_do_produto, descricao_do_produto, observacao, tipo } = request.body;

        let produto = {
            codigo_do_produto,
            descricao_do_produto,
            observacao,
            tipo
        };

        try {
            if (await produtoUtils.produtoExiste(codigo_do_produto)) {
                return response.status(409).send({ error: 'Código de Produto já existente' });
            }

            await connection('produto')
                .insert(produto)
                .then((id) => {
                    produto.id = id[0];
                });

            return response.json(produto);
        } catch (err) {
            return response.status(400).send({ error: err.message });
        }
    },

    /**
     * Atualiza um produto
     * @param  {[String]} request.params.id Id do produto a ser atualizado
     * @param  {[String]} request.body.codigo_do_produto Código do produto
     * @param  {[String]} request.body.descricao_do_produto Descrição do produto
     * @param  {[String]} request.body.observacao Observação para o produto
     * @param  {[String]} request.body.tipo Tipo do produto
     * @return {[JSON]} JSON contendo o produto atualizado
     */
    async update(request, response) {
        const { id } = request.params;

        const { codigo_do_produto, descricao_do_produto, observacao, tipo } = request.body;
        
        const produto = {
            codigo_do_produto,
            descricao_do_produto,
            observacao,
            tipo
        };

        try {
            if (await produtoUtils.produtoExiste(codigo_do_produto)) {
                return response.status(409).send({ error: 'Código de Produto já existente' });
            }

            await connection('produto')
                .where('id', id)
                .update(
                    produto
                );

            return response.json(produto);
        } catch (err) {
            return response.status(400).send({ error: err.message });
        }
    },

    /**
     * Deletar um produto
     * @param  {[Number]} request.body.nome Id do produto a ser excluído
     * @return {[StatusCode]} Status code da operação
     */
    async destroy(request, response) {
        const { id } = request.params;

        try {
            await connection('produto')
                .where('id', id)
                .delete();

            return response.status(204).send();
        } catch (err) {
            return response.status(400).send({ error: err.message });
        }
    },
}
