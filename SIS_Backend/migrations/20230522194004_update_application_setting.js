/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.alterTable("application_setting", (table) => {
    table
      .integer("favicon")
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
  return knex.schema.alterTable("application_setting", (table) => {
    table.dropColumn("favicon");
  });
};
