/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("user_role", (table) => {
    table.increments("id").primary();
    table
      .integer("user_id")
      .unsigned()
      .index()
      .references("id")
      .inTable("user");
    table
      .integer("role_id")
      .unsigned()
      .index()
      .references("id")
      .inTable("role");
    table.dateTime("createdAt").notNullable().defaultTo(knex.fn.now());
    table.dateTime("updatedAt").notNullable().defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("user_role");
};
