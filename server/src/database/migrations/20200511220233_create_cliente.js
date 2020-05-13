
exports.up = function(knex) {
    return knex.schema.createTable('cliente', function (table) {
        table.increments('id');
        table.string('nome', 255).notNullable();
        table.string('observacao', 600);
    });
};
  
exports.down = function(knex) {
    knex.schema.dropTable('cliente');
};
  