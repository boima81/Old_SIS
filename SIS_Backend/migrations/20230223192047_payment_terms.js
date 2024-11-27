/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("payment_term", (table) => {
    table.increments("id").primary();
    table.string("term_name");
    
      table.integer("term");
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
  return knex.schema.dropTableIfExists("payment_term");
};
