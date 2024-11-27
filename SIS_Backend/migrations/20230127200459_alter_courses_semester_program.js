/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.alterTable("course", (table) => {
    table
      .integer("program_id")
      .unsigned()
      .index()
      .references("id")
      .inTable("program");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.alterTable("course", (table) => {
    table.dropColumn("program");
  });
};
