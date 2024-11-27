/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.alterTable("course", (table) => {
    table.dropColumn("instructor_id");
    table
      .integer("instructor_user_id")
      .unsigned()
      .index()
      .references("id")
      .inTable("user");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.alterTable("course", (table) => {
    table
      .integer("instructor_id")
      .unsigned()
      .index()
      .references("id")
      .inTable("instructor");
    table.dropColumn("instructor_user_id");
  });
};
