/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.alterTable("user", (table) => {
    table
      .integer("avatar_file_id")
      .unsigned()
      .index()
      .references("id")
      .inTable("file_upload");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.alterTable("user", (table) => {
    table.dropColumn("avatar_file_id");
  });
};
