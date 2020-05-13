
exports.up = function(knex) {
    return knex.schema.createTable('produto', function (table) {
        table.increments('id');
        table.string('codigo_do_produto', 255).notNullable();
        table.string('descricao_do_produto', 255).notNullable();
        table.string('observacao', 600);
        table.string('tipo', 1).notNullable();
    });
};

exports.down = function(knex) {
    knex.schema.dropTable('produto');
};
