/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("payment", (table) => {
    table.increments("id").primary();
    table
      .integer("application_id")
      .unsigned()
      .index()
      .references("id")
      .inTable("application");
    table.decimal("amount", 10, 2).notNullable();
    table.string("transaction_id", 200).notNullable();
    table.string("payment_type", 100).notNullable();
    table.string("payment_status", 20).notNullable();
    table.dateTime("createdAt").notNullable().defaultTo(knex.fn.now());
    table.dateTime("updatedAt").notNullable().defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("payment");
};
