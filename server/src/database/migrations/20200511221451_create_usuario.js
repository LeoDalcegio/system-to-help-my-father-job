
exports.up = function(knex) {
    return knex.schema.createTable('usuario', function (table) {
        table.increments('id');
        table.string('nome', 255).notNullable();
        table.string('email', 255);
        table.string('senha', 255);
    });
};
  
exports.down = function(knex) {
    knex.schema.dropTable('usuario');
};
  