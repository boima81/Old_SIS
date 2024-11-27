/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("application_setting", (table) => {
    table.increments("id").primary();
    table.text("president_message", 2000);
    table.string("course_prefix");
    table.string("application_name");
    table.string("application_color");
    table
      .integer("logo")
      .unsigned()
      .index()
      .references("id")
      .inTable("file_upload");

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
  return knex.schema.dropTableIfExists("application_setting");
};
