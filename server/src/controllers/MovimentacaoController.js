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
        
    },

    /**
     * Buscar uma movimentação
     * @param  {[Number]} request.params.id Id da movimentação a ser retornado
     * @return {[JSON]} JSON contendo a movimentação
     */
    async show(request, response) {
        
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
        
    },
}
