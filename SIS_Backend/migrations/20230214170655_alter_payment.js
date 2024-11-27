/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.alterTable("payment", (table) => {
    table
      .integer("user_id")
      .unsigned()
      .index()
      .references("id")
      .inTable("user")
      .nullable();
    table
      .integer("review_by")
      .unsigned()
      .index()
      .references("id")
      .inTable("user")
      .nullable();
    table.string("module_type", 20).notNullable();
    table.boolean("approve_payment").nullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.alterTable("payment", (table) => {
    table.dropColumn("user_id");
    table.dropColumn("module_type");
    table.dropColumn("approve_payment");
  });
};
