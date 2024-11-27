/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("balance_fee", (table) => {
    table.increments("id").primary();
    table.float("balance_pay", 8, 2);
    table
      .integer("created_by")
      .unsigned()
      .index()
      .references("id")
      .inTable("user");
    table
      .integer("review_by")
      .unsigned()
      .index()
      .references("id")
      .inTable("user");
    table
      .integer("registration_id")
      .unsigned()
      .index()
      .references("id")
      .inTable("registration");
    table
      .integer("application_id")
      .unsigned()
      .index()
      .references("id")
      .inTable("application");
    table.string("payment_type");
    table.string("transaction_id");

    table.string("balance_fees_status");
    table.boolean("approved_payment");
    table.dateTime("createdAt").notNullable().defaultTo(knex.fn.now());
    table.dateTime("updatedAt").notNullable().defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("balance_fee");
};
