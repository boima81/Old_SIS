/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.alterTable("invoice", (table) => {
    table.string("receipt_number");
    table.integer("amount_paid");
    table.dateTime("pay_date");
    table
      .integer("paid_by")
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
  return knex.schema.alterTable("invoice", (table) => {
    table.dropColumn("receipt_number");
    table.dropColumn("amount_paid");
    table.dropColumn("pay_date");
    table.dropColumn("paid_by");
  });
};
