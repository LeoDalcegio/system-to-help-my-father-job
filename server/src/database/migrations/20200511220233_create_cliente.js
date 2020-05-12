
exports.up = function(knex) {
    knex.schema.createTable('cliente', (table) => {
        table.increments('id');
        table.string('nome', 255).notNullable();
        table.string('observacao', 600);
    });
};
  
exports.down = function(knex) {
    knex.schema.dropTable('cliente');
};
  