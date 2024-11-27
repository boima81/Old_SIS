/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("registration_courses", (table) => {
    table.increments("id").primary();
    table
      .integer("registration_id")
      .unsigned()
      .index()
      .references("id")
      .inTable("registration");
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
  return knex.schema.dropTableIfExists("registration_courses");
};
