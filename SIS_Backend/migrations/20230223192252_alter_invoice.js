/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.alterTable("invoice", (table) => {
    table.integer("total_terms");
    table
      .integer("payment_term_id")
      .unsigned()
      .index()
      .references("id")
      .inTable("payment_term");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.alterTable("invoice", (table) => {
    table.dropColumn("total_terms");
    table.dropColumn("payment_term_id");
  });
};
