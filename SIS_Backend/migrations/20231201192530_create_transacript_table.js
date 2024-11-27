/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("transcript", (table) => {
    table.increments("id").primary();
    table
      .integer("student_id")
      .unsigned()
      .index()
      .references("id")
      .inTable("student")
      .nullable();
    table.dateTime("generated_date");
    table.text("file_link");
    table.dateTime("createdAt").notNullable().defaultTo(knex.fn.now());
    table.dateTime("updatedAt").notNullable().defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("transcript");
};
