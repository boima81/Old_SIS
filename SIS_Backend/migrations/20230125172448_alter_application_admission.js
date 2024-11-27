/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.alterTable("application", (table) => {
    table
      .integer("created_by_admin")
      .unsigned()
      .index()
      .references("id")
      .inTable("user");
    table
      .integer("updated_by_admin")
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
    table.dropColumn("created_by_admin");
    table.dropColumn("updated_by_admin");
  });
};
