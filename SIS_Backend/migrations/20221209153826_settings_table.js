/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("setting", (table) => {
    table.increments("id").primary();
    table.integer("extra_fees").notNullable().defaultTo(0);
    table
      .integer("created_by")
      .unsigned()
      .index()
      .references("id")
      .inTable("user");
    table
      .integer("updated_by")
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
  return knex.schema.dropTableIfExists("setting");
};
