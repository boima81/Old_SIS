/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("invoice", (table) => {
    table.increments("id").primary();
    table.integer('total_amount')
    table.string("invoice_number");  
    table
      .integer("created_by")
      .unsigned()
      .index()
      .references("id")
      .inTable("user")
      .nullable();
    table.dateTime("createdAt").notNullable().defaultTo(knex.fn.now());
    table.dateTime("updatedAt").notNullable().defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("invoice");
};
