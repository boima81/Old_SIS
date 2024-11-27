/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.alterTable("registration", (table) => {
     table
       .integer("invoice_id")
       .unsigned()
       .index()
       .references("id")
       .inTable("invoice");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.alterTable("registration", (table) => {
    table.dropColumn("invoice_id");
  });
};
