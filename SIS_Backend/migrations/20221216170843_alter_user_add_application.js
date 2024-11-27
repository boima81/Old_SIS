/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.alterTable("user", (table) => {
    table
      .integer("application_id")
      .unsigned()
      .index()
      .references("id")
      .inTable("application");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.alterTable("user", (table) => {
    table.dropColumn("application_id");
  });
};
