/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.alterTable("application_setting", (table) => {
    table.boolean("registration_started");
    table
      .integer("semester_id")
      .unsigned()
      .index()
      .references("id")
      .inTable("semester");
    table.date("registration_start_date");
    table.date("registration_end_date");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.alterTable("application_setting", (table) => {
    table.dropColumn("semester_id");
    table.dropColumn("registration_start_date");
    table.dropColumn("registration_end_date");
  });
};
