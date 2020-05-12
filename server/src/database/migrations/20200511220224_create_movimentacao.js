
exports.up = function(knex) {
    knex.schema.createTable('movimentacao', (table) => {
        table.increments('id');
        table.integer('numero_da_nota', 50).notNullable();
        table.string('tipo', 1).notNullable();
        table.string('observacao', 600);
        table.date('data_da_movimentacao', 600).notNullable();
        table.decimal('quantidade', 600).notNullable();

        table.string('produto_id').notNullable();
        table.string('cliente_id').notNullable();

        table.foreign('produto_id').references('id').inTable('produto');
        table.foreign('cliente_id').references('id').inTable('cliente');
    });
};
  
exports.down = function(knex) {
    knex.schema.dropTable('movimentacao');
};
  