/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.alterTable("application", (table) => {
    table
      .integer("application_fee_id")
      .unsigned()
      .index()
      .references("id")
      .inTable("application_fee");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.alterTable("application", (table) => {
    table.dropColumn("application_fee_id");
  });
};
