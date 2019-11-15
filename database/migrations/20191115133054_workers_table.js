
exports.up = function(knex) {
  return knex.schema.createTable('workers', tbl => {
      tbl.increments();

      tbl.string('name', 128)
          .unique()
          .notNullable();
      tbl.string('industry', 128).notNullable();
      tbl.string('position', 128).notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('workers');
};
