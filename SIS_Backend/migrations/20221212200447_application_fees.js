/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("application_fee", (table) => {
    table.increments("id").primary();
    table.string("full_name", 100).notNullable();
    table.string("card_number", 100).notNullable();
    table.date("expire_date").notNullable();
    table.integer("cvv").notNullable();
    table.dateTime("createdAt").notNullable().defaultTo(knex.fn.now());
    table.dateTime("updatedAt").notNullable().defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("application_fee");
};
