/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.alterTable("user_information", (table) => {
    table
      .integer("student_id")
      .unsigned()
      .index()
      .references("id")
      .inTable("student");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable("user_information", (table) => {
    table.dropColumn("student_id");
  });
};
