/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.alterTable("payment", (table) => {
    table
      .integer("registration_id")
      .unsigned()
      .index()
      .references("id")
      .inTable("registration")
      .nullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.alterTable("payment", (table) => {
    table.dropColumn("registration_id");
  });
};
