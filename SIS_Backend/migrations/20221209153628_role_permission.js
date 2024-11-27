/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("role_permission", (table) => {
    table.increments("id").primary();
    table
      .integer("role_id")
      .unsigned()
      .index()
      .references("id")
      .inTable("role");
    table
      .integer("permission_id")
      .unsigned()
      .index()
      .references("id")
      .inTable("permission");
    table.dateTime("createdAt").notNullable().defaultTo(knex.fn.now());
    table.dateTime("updatedAt").notNullable().defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("role_permission");
};
