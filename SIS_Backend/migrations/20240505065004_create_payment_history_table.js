/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("payment_history", (table) => {
    table.increments("id").primary();
    table.decimal("amount", 10, 2).defaultTo(0);
    table
      .integer("registration_id")
      .unsigned()
      .index()
      .references("id")
      .inTable("registration");
    table
      .integer("semester_id")
      .unsigned()
      .index()
      .references("id")
      .inTable("semester");
    table.text("receipt_file").nullable();
    table
      .integer("added_by")
      .unsigned()
      .index()
      .references("id")
      .inTable("user");

    table.dateTime("createdAt").notNullable().defaultTo(knex.fn.now());
    table.dateTime("updatedAt").notNullable().defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("payment_history");
};
