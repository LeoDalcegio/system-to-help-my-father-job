const connection = require('../database/connection');

module.exports = {
    async produtoExiste(codigo_do_produto){
        const produto = await connection('produto')
            .where({ codigo_do_produto: codigo_do_produto })
            .first()
            .select('id');
        
        if(produto.length() > 0) return true;
        
        return false;
    }
}