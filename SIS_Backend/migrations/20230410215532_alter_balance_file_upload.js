/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.alterTable("application_file", (table) => {
    table
      .integer("balance_fee_id")
      .unsigned()
      .index()
      .references("id")
      .inTable("balance_fee");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.alterTable("application_file", (table) => {
    table.dropColumn("balance_fee_id");
  });
};
