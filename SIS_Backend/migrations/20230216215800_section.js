/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("section", (table) => {
    table.increments("id").primary();
    table.integer("section_number");
    table.integer("section_limits");
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
  return knex.schema.dropTableIfExists("section");
};
