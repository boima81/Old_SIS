/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("grade", (table) => {
    table.increments("id").primary();
    table.integer("grade_number").notNullable();
    table.string("grade_name").notNullable();
    table.float("grade_point", 3, 2).notNullable();
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
    table
      .integer("user_id")
      .unsigned()
      .index()
      .references("id")
      .inTable("user");

    table
      .integer("review_by_id")
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
  return knex.schema.dropTableIfExists("grade");
};
