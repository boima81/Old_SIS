/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("application_courses", (table) => {
    table.increments("id").primary();
    table
      .integer("application_id")
      .unsigned()
      .index()
      .references("id")
      .inTable("application");
    table
      .integer("course_id")
      .unsigned()
      .index()
      .references("id")
      .inTable("course");
    table.dateTime("createdAt").notNullable().defaultTo(knex.fn.now());
    table.dateTime("updatedAt").notNullable().defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("application_courses");
};
