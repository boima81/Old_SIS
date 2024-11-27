/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.alterTable("user", (table) => {
    table.boolean("is_agency").defaultTo(0);
    table
      .integer("agency_id")
      .unsigned()
      .index()
      .references("id")
      .inTable("agency");
    table.string("agency_name");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.alterTable("user", (table) => {
    table.dropColumn("is_agency");
    table.dropColumn("agency_id");
    table.dropColumn("agency_name");
  });
};
