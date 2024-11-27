/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("registration_fees", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.decimal("amount", 10, 2).notNullable();
    table
      .integer("created_by")
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
  return knex.schema.dropTableIfExists("registration_fees");
};
