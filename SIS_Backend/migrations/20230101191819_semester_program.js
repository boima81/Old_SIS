/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("program_semester", (table) => {
    table.increments("id").primary();
    table
      .integer("semester_id")
      .unsigned()
      .index()
      .references("id")
      .inTable("semester");
    table
      .integer("program_id")
      .unsigned()
      .index()
      .references("id")
      .inTable("program");
    table.dateTime("createdAt").notNullable().defaultTo(knex.fn.now());
    table.dateTime("updatedAt").notNullable().defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("program_semester");
};
