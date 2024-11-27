/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.alterTable("registration", (table) => {
    table.string("registration_status").defaultTo("pending");
    table.string("comment");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.alterTable("registration", (table) => {
    table.dropColumn("registration_status");
    table.dropColumn("comment");
  });
};
