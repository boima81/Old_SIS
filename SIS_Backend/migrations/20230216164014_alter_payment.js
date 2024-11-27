/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.alterTable("payment", (table) => {
    table.string("admin_payment_status").defaultTo("pending");
    table.string("comment");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.alterTable("payment", (table) => {
    table.dropColumn("admin_payment_status");
    table.dropColumn("comment");
  });
};
