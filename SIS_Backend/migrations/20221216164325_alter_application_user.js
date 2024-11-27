/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.alterTable("application", (table) => {
    table
      .integer("created_by")
      .unsigned()
      .index()
      .references("id")
      .inTable("user");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.alterTable("application", (table) => {
    table.dropColumn("created_by");
  });
};
